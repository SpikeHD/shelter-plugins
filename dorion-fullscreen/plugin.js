(function(exports) {

"use strict";

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
//#region plugins/dorion-fullscreen/index.tsx
const { flux: { dispatcher: FluxDispatcher } } = shelter;
let isPopout = false;
const toggleFullscreen = async (payload) => {
	if (isPopout) return;
	const topbar = document.querySelector("#dorion_topbar");
	if (topbar) topbar.style.display = payload?.isElementFullscreen ? "none" : "initial";
	apiWindow.appWindow?.setFullscreen(payload?.isElementFullscreen);
};
const toggleIsPopout = (toggle) => {
	isPopout = toggle;
};
const popoutOff = () => {
	toggleIsPopout(false);
};
const popoutOn = () => {
	toggleIsPopout(true);
};
FluxDispatcher.subscribe("WINDOW_FULLSCREEN_CHANGE", toggleFullscreen);
FluxDispatcher.subscribe("POPOUT_WINDOW_OPEN", popoutOn);
FluxDispatcher.subscribe("WINDOW_UNLOAD", popoutOff);
const onUnload = () => {
	FluxDispatcher.unsubscribe("WINDOW_FULLSCREEN_CHANGE", toggleFullscreen);
	FluxDispatcher.unsubscribe("POPOUT_WINDOW_OPEN", popoutOn);
	FluxDispatcher.unsubscribe("WINDOW_UNLOAD", popoutOff);
};

//#endregion
exports.onUnload = onUnload
return exports;
})({});