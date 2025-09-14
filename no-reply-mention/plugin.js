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
//#region plugins/no-reply-mention/index.tsx
var import_web = __toESM(require_web(), 1);
const { flux: { intercept, stores: { UserStore } }, ui: { SwitchItem }, plugin: { store } } = shelter;
const unintercept = intercept((dispatch) => {
	if (dispatch.type !== "CREATE_PENDING_REPLY") return;
	const userIsAuthor = dispatch?.message?.author?.id === UserStore.getCurrentUser()?.id;
	dispatch.shouldMention = store.shiftToInvert && !userIsAuthor ? !dispatch.shouldMention : false;
});
const onUnload = () => {
	unintercept();
};
const settings = () => (0, import_web.createComponent)(SwitchItem, {
	get value() {
		return store.shiftToInvert;
	},
	onChange: (v) => {
		store.shiftToInvert = v;
	},
	note: "Enable to make holding shift enable mentions.",
	children: "Inverse Shift Reply"
});

//#endregion
exports.onUnload = onUnload
exports.settings = settings
return exports;
})({});