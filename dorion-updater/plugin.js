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
//#region plugins/dorion-updater/index.tsx
var import_web = __toESM(require_web(), 1);
const { ui: { openModal, ModalRoot, ModalHeader, ModalBody, ModalConfirmFooter } } = shelter;
const confirmModal = (props) => (0, import_web.createComponent)(ModalRoot, { get children() {
	return [
		(0, import_web.createComponent)(ModalHeader, {
			get close() {
				return props.onCancel;
			},
			get children() {
				return props.header;
			}
		}),
		(0, import_web.createComponent)(ModalBody, { get children() {
			return props.body;
		} }),
		(0, import_web.createComponent)(ModalConfirmFooter, {
			get onConfirm() {
				return props.onConfirm;
			},
			get onCancel() {
				return props.onCancel;
			},
			get confirmText() {
				return props.confirmText;
			},
			get cancelText() {
				return props.cancelText;
			},
			get type() {
				return props.type;
			}
		})
	];
} });
const load = async () => {
	console.log("[Updater] Checking for updates...");
	const config = JSON.parse(await invoke("read_config_file"));
	const updateCheck = await invoke("update_check");
	const doUpdate = () => {
		invoke("do_update", { toUpdate: updateCheck });
	};
	console.log(`[Updater] ${appName} things to update: ${updateCheck}`);
	if (config.update_notify !== undefined && !config.update_notify) return;
	if (updateCheck.includes("dorion")) {
		if (config.autoupdate) {
			openModal((props) => confirmModal({
				header: `${appName} Update`,
				body: `A ${appName} update has been fetched, and ${appName} will restart momentarily.`,
				confirmText: "Got it!",
				type: "neutral",
				onConfirm: () => doUpdate(),
				onCancel: props.close
			}));
			doUpdate();
			return;
		}
		openModal((props) => confirmModal({
			header: "Updates Available!",
			body: `There are ${appName} updates available. Would you like to apply them? This notification can be disabled in ${appName} Settings`,
			confirmText: "Yes please!",
			cancelText: "Nope!",
			type: "neutral",
			onConfirm: () => doUpdate(),
			onCancel: props.close
		}));
	}
	event.once("update_complete", () => {
		openModal((props) => confirmModal({
			header: "Update Complete!",
			body: "The update has been applied! Please restart to apply the changes.",
			confirmText: "Okay!",
			type: "neutral",
			onConfirm: () => process.relaunch(),
			onCancel: props.close
		}));
	});
};
const onUnload = () => {};
load();

//#endregion
exports.onUnload = onUnload
return exports;
})({});