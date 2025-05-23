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
//#region plugins/dorion-tray/index.ts
const { flux: { dispatcher } } = shelter;
const state = {
	video: false,
	streaming: false,
	deafened: false,
	muted: false,
	speaking: false,
	connected: false
};
const handleConnect = async (payload) => {
	const { state: connectionState } = payload;
	if (connectionState.toLowerCase() === "connected" || connectionState.toLowerCase() === "connecting") state.connected = true;
else if (connectionState.toLowerCase() === "disconnected") state.connected = false;
	await handleTrayUpdate();
};
const handleVoiceChannelActions = async (payload) => {
	const loggedInUserId = localStorage.getItem("user_id_cache").replace(/"/g, "");
	const voiceState = payload.voiceStates.find((voiceState$1) => voiceState$1.userId === loggedInUserId);
	if (!voiceState) return;
	const { selfDeaf, selfMute, selfStream, selfVideo } = voiceState;
	state.muted = selfMute;
	state.deafened = selfDeaf;
	state.streaming = selfStream;
	state.video = selfVideo;
	await handleTrayUpdate();
};
const handleSpeakAction = async (payload) => {
	const loggedInUserId = localStorage.getItem("user_id_cache").replace(/"/g, "");
	const { userId, speakingFlags } = payload;
	if (userId !== loggedInUserId) return;
	state.speaking = speakingFlags > 0;
	await handleTrayUpdate();
};
const handleTrayUpdate = async () => {
	const icon = !state.connected && "disconnected" || Object.keys(state).find((k) => state[k]);
	await invoke("set_tray_icon", { event: icon });
};
dispatcher.subscribe("VOICE_STATE_UPDATES", handleVoiceChannelActions);
dispatcher.subscribe("SPEAKING", handleSpeakAction);
dispatcher.subscribe("RTC_CONNECTION_STATE", handleConnect);
const onUnload = () => {
	dispatcher.unsubscribe("VOICE_STATE_UPDATES", handleVoiceChannelActions);
	dispatcher.unsubscribe("SPEAKING", handleSpeakAction);
	dispatcher.unsubscribe("RTC_CONNECTION_STATE", handleConnect);
};

//#endregion
exports.onUnload = onUnload
return exports;
})({});