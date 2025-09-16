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
//#region plugins/web-keybinds/index.tsx
var import_web = __toESM(require_web(), 1);
const { flux: { dispatcher }, ui: { SwitchItem }, plugin: { store } } = shelter;
const isMac = navigator.userAgent.includes("Mac OS X");
if (window?.Vencord?.Plugins?.plugins?.WebKeybinds?.started) throw new Error("Web Keybinds: plugin incompatibility (cannot run Vencord WebKeybinds alongside shelter Web Keybinds)");
if (store.desktopOnlyKeybinds === undefined) {
	const isCustomClient = [window?.Dorion, window?.legcord].some((v) => !!v);
	store.desktopOnlyKeybinds = isCustomClient;
}
const handleKeyDown = (e) => {
	const ctrl = e.ctrlKey || isMac && e.metaKey;
	const key = e.key.toLowerCase();
	if (!ctrl) return;
	switch (key) {
		case "t":
			if (!store.desktopOnlyKeybinds) return;
			e.preventDefault();
			if (e.shiftKey) return;
			dispatcher.dispatch({
				type: "QUICKSWITCHER_SHOW",
				query: "",
				queryMode: null
			});
			break;
		case "tab":
			if (!store.desktopOnlyKeybinds) return;
			e.preventDefault();
			break;
		case ",":
			e.preventDefault();
			dispatcher.dispatch({
				"type": "USER_SETTINGS_MODAL_OPEN",
				"section": "My Account",
				"subsection": null,
				"openWithoutBackstack": false
			});
			dispatcher.dispatch({
				type: "LAYER_PUSH",
				component: "USER_SETTINGS"
			});
			break;
		default: break;
	}
};
document.addEventListener("keydown", handleKeyDown);
const onUnload = () => {
	document.removeEventListener("keydown", handleKeyDown);
};
const settings = () => (0, import_web.createComponent)(SwitchItem, {
	get value() {
		return store.desktopOnlyKeybinds;
	},
	onChange: (v) => {
		store.desktopOnlyKeybinds = v;
	},
	note: "Enable keybinds that would otherwise interfere with browser keybinds. Intended for use in custom clients.",
	children: "Desktop-only Keybinds"
});

//#endregion
exports.onUnload = onUnload
exports.settings = settings
return exports;
})({});