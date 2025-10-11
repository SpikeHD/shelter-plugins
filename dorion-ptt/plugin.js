(function(exports) {

"use strict";

//#region util/keyUtil.ts
const Keycode = {
	112: "F1",
	113: "F2",
	114: "F3",
	115: "F4",
	116: "F5",
	117: "F6",
	118: "F7",
	119: "F8",
	120: "F9",
	121: "F10",
	122: "F11",
	123: "F12",
	27: "Escape",
	32: "Space",
	17: "Control",
	16: "Shift",
	18: "Alt",
	91: "Meta",
	13: "Enter",
	38: "Up",
	40: "Down",
	37: "Left",
	39: "Right",
	8: "Backspace",
	20: "CapsLock",
	9: "Tab",
	36: "Home",
	35: "End",
	33: "PageUp",
	34: "PageDown",
	45: "Insert",
	46: "Delete",
	109: "NumpadSubtract",
	107: "NumpadAdd",
	111: "NumpadDivide",
	106: "NumpadMultiply",
	192: "Grave",
	189: "Minus",
	187: "Equal",
	219: "LeftBracket",
	221: "RightBracket",
	220: "BackSlash",
	186: "Semicolon",
	222: "Apostrophe",
	188: "Comma",
	190: "Dot",
	191: "Slash"
};
const keyToStr = (key) => {
	let keyStr = "";
	if (key >= 65 && key <= 90) keyStr = String.fromCharCode(key);
	if (key >= 97 && key <= 122) keyStr = String.fromCharCode(key - 32);
	if (key >= 48 && key <= 57) keyStr = String.fromCharCode(key);
	if (Keycode[key]) keyStr = Keycode[key];
	return keyStr;
};
function strToCode(str) {
	if (str.length === 1) {
		if (str.toLowerCase() >= "a" && str.toLowerCase() <= "z") return "Key" + str.toUpperCase();
		return "Digit" + str;
	}
	let maybeKeycode = "";
	Object.values(Keycode).forEach((v) => {
		console.log("comparing", str, v);
		if (str.includes(v)) {
			console.log("found!");
			maybeKeycode = v;
		}
	});
	console.log(maybeKeycode);
	if (maybeKeycode) return maybeKeycode;
	return "Key" + str;
}

//#endregion
//#region api/dorion.ts
var dorion_default = {
	name: "Dorion",
	invoke: (name, payload) => {
		if (window.__TAURI__?.invoke) return window.__TAURI__.invoke(name, payload);
else return window.__TAURI__.core.invoke(name, payload);
	},
	event: {
		emit: (name, payload) => {
			return window.__TAURI__.event.emit(name, payload);
		},
		listen: async (name, callback) => {
			return window.__TAURI__.event.listen(name, callback);
		}
	},
	app: { getVersion: () => {
		return window.__TAURI__.app.getVersion();
	} },
	process: { relaunch: () => {
		return window.__TAURI__.process.relaunch();
	} },
	apiWindow: { appWindow: { setFullscreen: (isFullscreen) => {
		if (window.__TAURI__?.webviewWindow?.getCurrentWebviewWindow) return window.__TAURI__.webviewWindow.getCurrentWebviewWindow().setFullscreen(isFullscreen);
else return window.__TAURI__.window.appWindow.setFullscreen(isFullscreen);
	} } }
};

//#endregion
//#region api/flooed.ts
var flooed_default = {
	name: "Flooed",
	invoke: (name, payload) => {
		return window.Flooed.invoke(name, payload);
	},
	event: {
		emit: () => {},
		listen: async () => {}
	},
	app: { getVersion: () => {
		return window.Flooed.version;
	} },
	process: { relaunch: () => {
		return window.Flooed.invoke("relaunch");
	} },
	apiWindow: { appWindow: { setFullscreen: (isFullscreen) => {
		return window.Flooed.invoke("set_fullscreen", isFullscreen);
	} } }
};

//#endregion
//#region api/none.ts
var none_default = {
	name: "Unknown",
	invoke: async () => {},
	event: {
		emit: () => {},
		listen: async () => {}
	},
	app: { getVersion: () => "0.0.0" },
	process: { relaunch: () => {} },
	apiWindow: { appWindow: { setFullscreen: () => {} } }
};

//#endregion
//#region api/api.ts
let backendName = "None";
if (window.Dorion) backendName = "Dorion";
else if (window.Flooed) backendName = "Flooed";
let backendObj;
switch (backendName) {
	case "Dorion":
		backendObj = dorion_default;
		break;
	case "Flooed":
		backendObj = flooed_default;
		break;
	default:
		backendObj = none_default;
		break;
}
const api = window[backendName];
const appName = backendObj.name;
const invoke = backendObj.invoke;
const event = backendObj.event;
const app = backendObj.app;
const process = backendObj.process;
const apiWindow = backendObj.apiWindow;

//#endregion
//#region plugins/dorion-ptt/index.ts
const { flux: { dispatcher: FluxDispatcher, stores: { MediaEngineStore } }, observeDom } = shelter;
const events = [];
const subscriptions = [];
const unobserves = [];
const warningSelector = "div[class*=\"warning__\"]";
const radiobarSelector = "div[class*=\"radioBar_\"]";
const popupSelector = "div[class*=\"layerContainer_\"] div[class*=\"layer_\"]";
const unobserveAll = () => unobserves.forEach((unobserve) => unobserve());
const settingsHandler = async (payload) => {
	if (payload.section !== "Voice & Video") {
		unobserveAll();
		return;
	}
	unobserves.push(observeDom(warningSelector, (node) => {
		node.remove();
	}), observeDom(popupSelector, (node) => {
		if (node.id) return;
		node.innerHTML = "";
		const unobserveBackdrop = observeDom("div[class*=\"scrim_\"]", (backdrop) => {
			backdrop.click();
			unobserveBackdrop();
		});
	}), observeDom(radiobarSelector, (node) => {
		const textSelector = "div[class*=\"info_\"] div[class*=\"text\"]";
		const text = node.querySelector(textSelector);
		if (text.textContent.includes("(")) text.textContent = text.textContent.replace(/\(.+?\)/g, "");
	}));
};
const keybindCreationHandler = async (payload) => {
	const { mode, options: { shortcut } } = payload;
	const keys = shortcut.map((k) => k[1]);
	const toKeys = keys.map((k) => ({
		code: strToCode(keyToStr(k)),
		name: keyToStr(k)
	}));
	invoke("set_keybind", {
		action: "PUSH_TO_TALK",
		keys: toKeys
	});
	event.emit("ptt_toggled", { state: mode === "PUSH_TO_TALK" });
};
event.emit("ptt_toggled", { state: MediaEngineStore?.getMode?.() === "PUSH_TO_TALK" });
subscriptions.push(FluxDispatcher.subscribe("USER_SETTINGS_MODAL_SET_SECTION", settingsHandler), FluxDispatcher.subscribe("LAYER_POP", unobserveAll), FluxDispatcher.subscribe("AUDIO_SET_MODE", keybindCreationHandler));
const onUnload = () => {
	unobserveAll();
	events.forEach((e) => e());
	subscriptions.forEach((s) => s());
};

//#endregion
exports.onUnload = onUnload
return exports;
})({});