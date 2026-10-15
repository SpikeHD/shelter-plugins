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
//#region util/i18n.tsx
function t(key, replace) {
	const lang = window.__DORION_LANG ?? "en";
	const translations = window.__DORION_TRANSLATIONS;
	let value = translations?.[lang];
	for (const k of key.split(".")) {
		value = value?.[k];
		if (value == null) return key;
	}
	if (!replace) return value;
	const parts = [];
	const regex = /\{\{\s*(\w+)\s*\}\}/g;
	let lastIndex = 0;
	let hasNode = false;
	for (const match of value.matchAll(regex)) {
		const [raw, name] = match;
		const index = match.index;
		if (index > lastIndex) parts.push(value.slice(lastIndex, index));
		const replacement = replace[name];
		if (replacement !== undefined) {
			parts.push(replacement);
			if (typeof replacement !== "string") hasNode = true;
		} else parts.push(raw);
		lastIndex = index + raw.length;
	}
	if (lastIndex < value.length) parts.push(value.slice(lastIndex));
	return hasNode ? parts : parts.join("");
}

//#endregion
//#region plugins/dorion-notifications/index.tsx
const { flux: { dispatcher: FluxDispatcher }, solid: { createSignal } } = shelter;
const [settings, setSettings] = createSignal(null);
const saveSettings = async (patch) => {
	try {
		const cfg = JSON.parse(await invoke("read_config_file"));
		if (Object.keys(patch).every((k) => cfg[k] === patch[k])) return false;
		const next = {
			...cfg,
			...patch
		};
		await invoke("write_config_file", { contents: JSON.stringify(next) });
		setSettings(next);
		return true;
	} catch (e) {
		console.error("[Dorion Notifications] Failed to save settings", e);
		return false;
	}
};
const desktopTypeHandler = async (payload) => {
	const enabled = payload.desktopType !== "NEVER";
	if (!await saveSettings({ desktop_notifications: enabled })) return;
	FluxDispatcher.dispatch({
		type: "NOTIFICATIONS_SET_PERMISSION_STATE",
		enabled: enabled ? "ENABLED" : "DISABLED"
	});
	if (enabled) invoke("send_notification", {
		title: t("dorion_notifications.desktop_notifications_enabled_title"),
		body: t("dorion_notifications.desktop_notifications_enabled_body"),
		icon: ""
	});
};
const unreadBadgeHandler = async (payload) => {
	const enabled = !payload.disableUnreadBadge;
	if (!await saveSettings({ unread_badge: enabled })) return;
	api.shouldShowUnreadBadge = enabled;
	if (!enabled) invoke("notif_count", { amount: 0 });
else api.util.applyNotificationCount();
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
FluxDispatcher.subscribe("NOTIFICATIONS_SET_DESKTOP_TYPE", desktopTypeHandler);
FluxDispatcher.subscribe("NOTIFICATIONS_SET_DISABLE_UNREAD_BADGE", unreadBadgeHandler);
FluxDispatcher.subscribe("RPC_NOTIFICATION_CREATE", notifHandler);
const onLoad = async () => {
	const cfg = JSON.parse(await invoke("read_config_file"));
	setSettings(cfg);
	if (cfg.desktop_notifications) Notification.requestPermission();
};
const onUnload = () => {
	FluxDispatcher.unsubscribe("NOTIFICATIONS_SET_DESKTOP_TYPE", desktopTypeHandler);
	FluxDispatcher.unsubscribe("NOTIFICATIONS_SET_DISABLE_UNREAD_BADGE", unreadBadgeHandler);
	FluxDispatcher.unsubscribe("RPC_NOTIFICATION_CREATE", notifHandler);
};

//#endregion
exports.onLoad = onLoad
exports.onUnload = onUnload
return exports;
})({});