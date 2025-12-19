(function(exports) {

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion

//#region solid-js/web
var require_web = __commonJS({ "solid-js/web"(exports, module) {
	module.exports = shelter.solidWeb;
} });

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
//#region plugins/dorion-notifications/index.tsx
var import_web = __toESM(require_web(), 1);
const { ui: { SwitchItem, ReactiveRoot }, flux: { dispatcher: FluxDispatcher }, solid: { createSignal }, observeDom } = shelter;
const [settings, setSettings] = createSignal(null);
let child = null;
const settingsHandler = (payload) => {
	if (payload.section !== "Notifications") {
		if (child) {
			child.remove();
			child = null;
		}
		return;
	}
	const unsub = observeDom("#notifications-tab", () => {
		unsub();
		const notifSelector = "div[class*=\"contentColumn\"] div[class*=\"container\"]";
		const node = document.querySelector(notifSelector);
		if (!node) return;
		node.style.display = "none";
		const next = node.nextElementSibling;
		if (next) next.style.display = "none";
		const NotificationSettings = () => [(0, import_web.createComponent)(SwitchItem, {
			note: "If you're looking for per-channel or per-server notifications, right-click the desired server icon and select Notification Settings.",
			get value() {
				return settings()?.desktop_notifications;
			},
			onChange: (value) => {
				setSettings({
					...settings(),
					desktop_notifications: value
				});
				FluxDispatcher.dispatch({
					type: "NOTIFICATIONS_SET_PERMISSION_STATE",
					enabled: value ? "ENABLED" : "DISABLED"
				});
				invoke("write_config_file", { contents: JSON.stringify(settings()) });
				if (value) invoke("send_notification", {
					title: "Desktop Notifications Enabled",
					body: "You will now receive desktop notifications!",
					icon: ""
				});
			},
			children: "Enable Desktop Notifications"
		}), (0, import_web.createComponent)(SwitchItem, {
			note: "Shows a red badge on the app icon when you have unread messages.",
			get value() {
				return settings()?.unread_badge;
			},
			onChange: async (value) => {
				setSettings({
					...settings(),
					unread_badge: value
				});
				await invoke("write_config_file", { contents: JSON.stringify(settings()) });
				api.shouldShowUnreadBadge = value;
				if (!value) invoke("notif_count", { amount: 0 });
else api.util.applyNotificationCount();
			},
			children: "Enable Unread Message Badge"
		})];
		child = node.parentElement.insertBefore((0, import_web.createComponent)(ReactiveRoot, { get children() {
			return (0, import_web.createComponent)(NotificationSettings, {});
		} }), node.parentElement.firstChild);
	});
};
const notifHandler = (payload) => {
	if (!settings()?.desktop_notifications || !window.Notification?.__IS_STUBBED__) return;
	const { title, body, icon, message } = payload;
	invoke("send_notification", {
		title,
		body,
		icon,
		additionalData: {
			guild_id: message?.guild_id || null,
			channel_id: message?.channel_id || null,
			message_id: message?.id || null
		}
	});
};
FluxDispatcher.subscribe("USER_SETTINGS_MODAL_SET_SECTION", settingsHandler);
FluxDispatcher.subscribe("RPC_NOTIFICATION_CREATE", notifHandler);
const onLoad = async () => {
	const cfg = JSON.parse(await invoke("read_config_file"));
	setSettings(cfg);
	if (cfg.desktop_notifications) Notification.requestPermission();
};
const onUnload = () => {
	FluxDispatcher.unsubscribe("USER_SETTINGS_MODAL_SET_SECTION", settingsHandler);
	FluxDispatcher.unsubscribe("RPC_NOTIFICATION_CREATE", notifHandler);
};

//#endregion
exports.onLoad = onLoad
exports.onUnload = onUnload
return exports;
})({});