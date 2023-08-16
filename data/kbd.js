// Extracted from linux/input-event-codes.h
const KEY_ESC = 1;
const KEY_1 = 2;
const KEY_2 = 3;
const KEY_3 = 4;
const KEY_4 = 5;
const KEY_5 = 6;
const KEY_6 = 7;
const KEY_7 = 8;
const KEY_8 = 9;
const KEY_9 = 10;
const KEY_0 = 11;
const KEY_MINUS = 12;
const KEY_EQUAL = 13;
const KEY_BACKSPACE = 14;
const KEY_TAB = 15;
const KEY_Q = 16;
const KEY_W = 17;
const KEY_E = 18;
const KEY_R = 19;
const KEY_T = 20;
const KEY_Y = 21;
const KEY_U = 22;
const KEY_I = 23;
const KEY_O = 24;
const KEY_P = 25;
const KEY_LEFTBRACE = 26;
const KEY_RIGHTBRACE = 27;
const KEY_ENTER = 28;
const KEY_LEFTCTRL = 29;
const KEY_A = 30;
const KEY_S = 31;
const KEY_D = 32;
const KEY_F = 33;
const KEY_G = 34;
const KEY_H = 35;
const KEY_J = 36;
const KEY_K = 37;
const KEY_L = 38;
const KEY_SEMICOLON = 39;
const KEY_APOSTROPHE = 40;
const KEY_GRAVE = 41;
const KEY_LEFTSHIFT = 42;
const KEY_BACKSLASH = 43;
const KEY_Z = 44;
const KEY_X = 45;
const KEY_C = 46;
const KEY_V = 47;
const KEY_B = 48;
const KEY_N = 49;
const KEY_M = 50;
const KEY_COMMA = 51;
const KEY_DOT = 52;
const KEY_SLASH = 53;
const KEY_RIGHTSHIFT = 54;
const KEY_KPASTERISK = 55;
const KEY_LEFTALT = 56;
const KEY_SPACE = 57;
const KEY_CAPSLOCK = 58;
const KEY_F1 = 59;
const KEY_F2 = 60;
const KEY_F3 = 61;
const KEY_F4 = 62;
const KEY_F5 = 63;
const KEY_F6 = 64;
const KEY_F7 = 65;
const KEY_F8 = 66;
const KEY_F9 = 67;
const KEY_F10 = 68;
const KEY_NUMLOCK = 69;
const KEY_SCROLLLOCK = 70;
const KEY_KP7 = 71;
const KEY_KP8 = 72;
const KEY_KP9 = 73;
const KEY_KPMINUS = 74;
const KEY_KP4 = 75;
const KEY_KP5 = 76;
const KEY_KP6 = 77;
const KEY_KPPLUS = 78;
const KEY_KP1 = 79;
const KEY_KP2 = 80;
const KEY_KP3 = 81;
const KEY_KP0 = 82;
const KEY_KPDOT = 83;
const KEY_102ND = 86;
const KEY_F11 = 87;
const KEY_F12 = 88;
const KEY_RO = 89;
const KEY_KPENTER = 96;
const KEY_RIGHTCTRL = 97;
const KEY_KPSLASH = 98;
const KEY_RIGHTALT = 100;
const KEY_HOME = 102;
const KEY_UP = 103;
const KEY_PAGEUP = 104;
const KEY_LEFT = 105;
const KEY_RIGHT = 106;
const KEY_END = 107;
const KEY_DOWN = 108;
const KEY_PAGEDOWN = 109;
const KEY_INSERT = 110;
const KEY_DELETE = 111;
const KEY_KPEQUAL = 117;
const KEY_PAUSE = 119;
const KEY_KPCOMMA = 121;
const KEY_LEFTMETA = 125;
const KEY_RIGHTMETA = 126;

// From https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values
const code_to_at = {
	"AltLeft": KEY_LEFTALT,
	"AltRight": KEY_RIGHTALT,
	"ArrowDown": KEY_DOWN,
	"ArrowLeft": KEY_LEFT,
	"ArrowRight": KEY_RIGHT,
	"ArrowUp": KEY_UP,
	"Backquote": KEY_GRAVE,
	"Backslash": KEY_BACKSLASH,
	"Backspace": KEY_BACKSPACE,
	"BracketLeft": KEY_LEFTBRACE,
	"BracketRight": KEY_RIGHTBRACE,
	"CapsLock": KEY_CAPSLOCK,
	"Comma": KEY_COMMA,
	"ControlLeft": KEY_LEFTCTRL,
	"ControlRight": KEY_RIGHTCTRL,
	"Delete": KEY_DELETE,
	"Digit0": KEY_0,
	"Digit1": KEY_1,
	"Digit2": KEY_2,
	"Digit3": KEY_3,
	"Digit4": KEY_4,
	"Digit5": KEY_5,
	"Digit6": KEY_6,
	"Digit7": KEY_7,
	"Digit8": KEY_8,
	"Digit9": KEY_9,
	"End": KEY_END,
	"Enter": KEY_ENTER,
	"Equal": KEY_EQUAL,
	"Escape": KEY_ESC,
	"F1": KEY_F1,
	"F2": KEY_F2,
	"F3": KEY_F3,
	"F4": KEY_F4,
	"F5": KEY_F5,
	"F6": KEY_F6,
	"F7": KEY_F7,
	"F8": KEY_F8,
	"F9": KEY_F9,
	"F10": KEY_F10,
	"F11": KEY_F11,
	"F12": KEY_F12,
	"Home": KEY_HOME,
	"Insert": KEY_INSERT,
	"IntlBackslash": KEY_102ND,
	"IntlRo": KEY_RO,
	"KeyA": KEY_A,
	"KeyB": KEY_B,
	"KeyC": KEY_C,
	"KeyD": KEY_D,
	"KeyE": KEY_E,
	"KeyF": KEY_F,
	"KeyG": KEY_G,
	"KeyH": KEY_H,
	"KeyI": KEY_I,
	"KeyJ": KEY_J,
	"KeyK": KEY_K,
	"KeyL": KEY_L,
	"KeyM": KEY_M,
	"KeyN": KEY_N,
	"KeyO": KEY_O,
	"KeyP": KEY_P,
	"KeyQ": KEY_Q,
	"KeyR": KEY_R,
	"KeyS": KEY_S,
	"KeyT": KEY_T,
	"KeyU": KEY_U,
	"KeyV": KEY_V,
	"KeyW": KEY_W,
	"KeyX": KEY_X,
	"KeyY": KEY_Y,
	"KeyZ": KEY_Z,
	"MetaLeft": KEY_LEFTMETA,
	"MetaRight": KEY_RIGHTMETA,
	"Minus": KEY_MINUS,
	"NumLock": KEY_NUMLOCK,
	"Numpad0": KEY_KP0,
	"Numpad1": KEY_KP1,
	"Numpad2": KEY_KP2,
	"Numpad3": KEY_KP3,
	"Numpad4": KEY_KP4,
	"Numpad5": KEY_KP5,
	"Numpad6": KEY_KP6,
	"Numpad7": KEY_KP7,
	"Numpad8": KEY_KP8,
	"Numpad9": KEY_KP9,
	"NumpadAdd": KEY_KPPLUS,
	"NumpadComma": KEY_KPCOMMA,
	"NumpadDecimal": KEY_KPDOT,
	"NumpadDivide": KEY_KPSLASH,
	"NumpadEnter": KEY_KPENTER,
	"NumpadEqual": KEY_KPEQUAL,
	"NumpadMultiply": KEY_KPASTERISK,
	"NumpadSubtract": KEY_KPMINUS,
	"OSLeft": KEY_LEFTMETA,
	"OSRight": KEY_RIGHTMETA,
	"PageDown": KEY_PAGEDOWN,
	"PageUp": KEY_PAGEUP,
	"Pause": KEY_PAUSE,
	"Period": KEY_DOT,
	"Quote": KEY_APOSTROPHE,
	"ScrollLock": KEY_SCROLLLOCK,
	"Semicolon": KEY_SEMICOLON,
	"ShiftLeft": KEY_LEFTSHIFT,
	"ShiftRight": KEY_RIGHTSHIFT,
	"Slash": KEY_SLASH,
	"Space": KEY_SPACE,
	"Tab": KEY_TAB,
};

const sock = new WebSocket(`ws://${window.location.host}/ws`);
sock.addEventListener("open", event => {
	console.log("ws connection established");

	var buf = new Int8Array(3);

	function on_key(event, is_down) {
		if (event.defaultPrevented || event.repeat) return;
		if (event.code !== "Tab") event.preventDefault();

		if (!event.code in code_to_at) return;
		const at_code = code_to_at[event.code];

		console.log(`Keyboard Event: is_down=${is_down} key=${event.key} code=${event.code} at=${at_code}`);

		buf[0] = 0;
		buf[1] = at_code;
		buf[2] = is_down ? 1 : 0;
		sock.send(buf);
	}

	function on_mouse_move(event) {
		const dx = event.movementX;
		const dy = event.movementY;

		buf[0] = 1;
		buf[1] = dx;
		buf[2] = dy;
		sock.send(buf);
	}

	window.addEventListener("keydown", event => on_key(event, true), true);
	window.addEventListener("keyup", event => on_key(event, false), true);
	window.addEventListener("mousemove", on_mouse_move, true);

	var body = document.getElementsByTagName("body")[0];
	body.addEventListener("click", async () => await body.requestPointerLock());

	console.log("handlers installed");
});
