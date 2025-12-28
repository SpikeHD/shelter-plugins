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
var import_web$2 = __toESM(require_web(), 1);
var import_web$3 = __toESM(require_web(), 1);
var import_web$4 = __toESM(require_web(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web.template)(`<div></div>`, 2);
const { plugin: { store }, ui: { SwitchItem } } = shelter;
const components = [
	{
		name: "Nitro usernames",
		description: "Removes the fancy username effects from users that have them enabled",
		rules: `
      div:has(> span[data-username-with-effects]) { all: unset !important; }
      span[data-username-with-effects] { all: unset !important; }
      span[class*=dnsFont] { all: unset !important; }
    `
	},
	{
		name: "Nitro avatar decorations",
		description: "Removes the member list and profile card avatar decoration from users that have them enabled",
		rules: `
      svg[class*=avatarDecoration] { display: none !important; }
    `
	},
	{
		name: "Nitro member backgrounds",
		description: "Removes the member list background effects from users that have them enabled",
		rules: `
      div[class*=nameplated] > div[class*=container] { display: none !important; }
    `
	},
	{
		name: "Nitro profile effects",
		description: "Removes the profile card effects from users that have them enabled",
		rules: `
      div[class*=profileEffects] { display: none !important; }
    `
	},
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
		name: "Quests tab",
		description: "Removes the \"Quests\" tab from the home page",
		rules: `
      a[href="/quest-home"] { display: none; }
    `
	},
	{
		name: "Apps button",
		description: "Removes the Apps button from the text area",
		rules: `
      div[class*="app-launcher-entrypoint"] { display: none; }
    `
	},
	{
		name: "Gift button",
		description: "Removes the gift button in the chat bar",
		rules: `
      div[class*="sansAttachButton"] > div[class*="buttons"] > div[class*="-container"] {
        display: none;
      }
    `
	},
	{
		name: "Server boost bar",
		description: "Removes the server boost bar",
		rules: `
      div[data-list-item-id^="channels___skill-"] ~ div { display: none; }
      div[class*="containerWithMargin"][role="button"] { display: none; }
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
if (Object.keys(store).length === 0) {
	components.forEach((c) => {
		store[c.name] = true;
	});
	setStyle();
	shelter.ui.showToast({
		title: "Declutter",
		content: "All component removals have been enabled. Click the settings icon to disable them selectively.",
		duration: 5e3
	});
}
const settings = () => {
	return (() => {
		const _el$ = (0, import_web$3.getNextElement)(_tmpl$);
		_el$.style.setProperty("height", "50vh");
		_el$.style.setProperty("overflow", "auto");
		(0, import_web$4.insert)(_el$, () => components.map((c) => (0, import_web$1.createComponent)(SwitchItem, {
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
				return ["Remove ", (0, import_web$2.memo)(() => c.name)];
			}
		})));
		return _el$;
	})();
};
const onUnload = () => {
	styleElm.remove();
};

//#endregion
exports.onUnload = onUnload
exports.settings = settings
return exports;
})({});