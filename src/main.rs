use std::{net::SocketAddr, sync::Arc};

use axum::{
    extract::{
        ws::{Message, WebSocket},
        ConnectInfo, State, WebSocketUpgrade,
    },
    http::header::CONTENT_TYPE,
    response::{Html, IntoResponse},
    routing::get,
    Router, Server,
};
use clap::Parser;
use evdev::{
    uinput::{VirtualDevice, VirtualDeviceBuilder},
    AttributeSet, EventType, InputEvent, Key, RelativeAxisType,
};
use tokio::sync::Mutex;

struct VirtualDevices {
    kbd: VirtualDevice,
    rat: VirtualDevice,
}
type Devs = Arc<Mutex<VirtualDevices>>;

#[derive(Debug, Parser)]
/// kbdsrv is a smol utility to forward you keyboard and mouse inputs through a browser to another
/// computer.
struct Kbdsrv {
    /// Address to bind to
    #[clap(long, default_value = "0.0.0.0:8080")]
    bind: SocketAddr,
    /// Root path to expose forwarder
    #[clap(long, default_value = "/kbd")]
    root: String,
}

#[tokio::main(flavor = "current_thread")]
async fn main() {
    let args = Kbdsrv::parse();

    let mut keys = AttributeSet::<Key>::new();
    // We want to forward the whole keyboard, so let's include all keys.
    for i in 0..0xffu16 {
        keys.insert(Key(i));
    }
    let kbd = VirtualDeviceBuilder::new()
        .unwrap()
        .name("kbdsrv virtual keyboard")
        .with_keys(&keys)
        .unwrap()
        .build()
        .unwrap();

    let rat = VirtualDeviceBuilder::new()
        .unwrap()
        .name("kbdsrv virtual mouse")
        .with_relative_axes(&AttributeSet::from_iter([
            RelativeAxisType::REL_X,
            RelativeAxisType::REL_Y,
        ]))
        .unwrap()
        .build()
        .unwrap();

    let devs = Arc::new(Mutex::new(VirtualDevices { kbd, rat }));

    let app = Router::new()
        .route(&args.root, get(get_kbd_html))
        .route("/kbd.js", get(get_kbd_js))
        .route("/ws", get(ws_handler))
        .with_state(devs)
        .into_make_service_with_connect_info::<SocketAddr>();

    let srv = Server::bind(&args.bind).serve(app);
    println!("Listening on {}", srv.local_addr());
    srv.await.unwrap();
}

async fn get_kbd_html() -> impl IntoResponse {
    println!("GET /kbd");
    Html(include_str!("../data/kbd.html"))
}

async fn get_kbd_js() -> impl IntoResponse {
    println!("GET /kbd.js");
    ([(CONTENT_TYPE, "application/javascript")], include_str!("../data/kbd.js"))
}

async fn ws_handler(
    ws: WebSocketUpgrade,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    State(devs): State<Devs>,
) -> impl IntoResponse {
    println!("Got ws connection from {addr}");
    ws.on_upgrade(move |sock| handle_socket(sock, addr, devs))
}

async fn handle_socket(mut socket: WebSocket, addr: SocketAddr, devs: Devs) {
    println!("peer {addr} upgraded to ws!");

    while let Some(Ok(msg)) = socket.recv().await {
        match msg {
            Message::Text(s) => println!(">>> [{addr}] sent text: {s}"),
            Message::Binary(b) if b.len() == 3 && b[0] == 0 => {
                let code = b[1];
                let is_down = b[2] == 1;

                let evt = InputEvent::new(EventType::KEY, code as u16, if is_down { 1 } else { 0 });
                if let Err(e) = devs.lock().await.kbd.emit(&[evt]) {
                    println!("!!! Failed to send event: {e:?}");
                }
            }
            Message::Binary(b) if b.len() == 3 && b[0] == 1 => {
                let dx = b[1] as i8;
                let dy = b[2] as i8;

                let evts = [
                    InputEvent::new(EventType::RELATIVE, RelativeAxisType::REL_X.0, dx as i32),
                    InputEvent::new(EventType::RELATIVE, RelativeAxisType::REL_Y.0, dy as i32),
                ];
                if let Err(e) = devs.lock().await.rat.emit(&evts) {
                    println!("!!! Failed to send events: {e:?}");
                }
            }
            Message::Binary(b) => println!(">>> [{addr}] sent bytes: {b:02x?}"),
            Message::Ping(_) => println!(">>> [{addr}] ping!"),
            Message::Pong(_) => println!(">>> [{addr}] pong!"),
            Message::Close(_) => {
                println!(">>> [{addr}] close");
                break;
            }
        }
    }

    println!("client {addr} closed connection");
}
