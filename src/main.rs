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
use evdev::{
    uinput::{VirtualDevice, VirtualDeviceBuilder},
    AttributeSet, EventType, InputEvent, Key,
};
use tokio::sync::Mutex;

type Kbd = Arc<Mutex<VirtualDevice>>;

#[tokio::main(flavor = "current_thread")]
async fn main() {
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
    let kbd = Arc::new(Mutex::new(kbd));

    let app = Router::new()
        .route("/kbd", get(get_kbd_html))
        .route("/kbd.js", get(get_kbd_js))
        .route("/ws", get(ws_handler))
        .with_state(kbd)
        .into_make_service_with_connect_info::<SocketAddr>();

    let srv = Server::bind(&SocketAddr::from(([0u8; 4], 8080u16))).serve(app);
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
    State(kbd): State<Kbd>,
) -> impl IntoResponse {
    println!("Got ws connection from {addr}");
    ws.on_upgrade(move |sock| handle_socket(sock, addr, kbd))
}

async fn handle_socket(mut socket: WebSocket, addr: SocketAddr, kbd: Kbd) {
    println!("peer {addr} upgraded to ws!");

    while let Some(Ok(msg)) = socket.recv().await {
        match msg {
            Message::Text(s) => println!(">>> [{addr}] sent text: {s}"),
            Message::Binary(b) if b.len() == 2 => {
                let code = b[0];
                let is_down = b[1] == 1;

                let evt = InputEvent::new(EventType::KEY, code as u16, if is_down { 1 } else { 0 });
                if let Err(e) = kbd.lock().await.emit(&[evt]) {
                    println!("!!! Failed to send event: {e:?}");
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
