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
//#region plugins/clean-home/index.tsx
var import_web = __toESM(require_web(), 1);
var import_web$1 = __toESM(require_web(), 1);
const { plugin: { store }, ui: { SwitchItem } } = shelter;
const components = [
	{
		name: "Active Now section",
		description: "Removes the \"Active Now\" section from the home page",
		rules: `
      div[class*="nowPlayingColumn"] { display: none; }
    `
	},
	{
		name: "Nitro tab",
		description: "Removes the \"Nitro\" tab from the home page",
		rules: `
      a[href="/store"] { display: none; }
    `
	},
	{
		name: "Store tab",
		description: "Removes the \"Store\" tab from the home page",
		rules: `
      a[href="/shop"] { display: none; }
    `
	},
	{
		name: "Apps button",
		description: "Removes the Apps button from the text area",
		rules: `
      div[class*="channelAppLauncher"] { display: none; }
    `
	},
	{
		name: "Quest popout",
		description: "Removes the Nitro quest popup",
		rules: `
      div[class*="questPromoContent"] { display: none; }
    `
	}
];
const style = document.createElement("style");
style.id = "clean-home-style";
const styleElm = document.body.appendChild(style);
const setStyle = () => {
	styleElm.textContent = components.filter((c) => store[c.name]).map((c) => c.rules).join(" ");
};
setStyle();
const settings = () => {
	return components.map((c) => {
		return (0, import_web.createComponent)(SwitchItem, {
			get value() {
				return !!store[c.name];
			},
			onChange: (value) => {
				store[c.name] = value;
				setStyle();
			},
			get note() {
				return c.description;
			},
			get children() {
				return ["Remove ", (0, import_web$1.memo)(() => c.name)];
			}
		});
	});
};
const onUnload = () => {
	styleElm.remove();
};

//#endregion
exports.onUnload = onUnload
exports.settings = settings
return exports;
})({});