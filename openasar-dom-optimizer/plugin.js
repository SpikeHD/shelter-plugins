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
//#region plugins/openasar-dom-optimizer/index.tsx
var import_web = __toESM(require_web(), 1);
var import_web$1 = __toESM(require_web(), 1);
var import_web$2 = __toESM(require_web(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web.template)(`<a href="https://github.com/GooseMod/OpenAsar/wiki/DOM-Optimizer">the OpenAsar wiki</a>`, 2), _tmpl$2 = /*#__PURE__*/ (0, import_web.template)(`<br>`, 1);
/**
* OpenAsar has this cool little optimization technique that delays some operations when
* switching channels or servers, so that the switch is faster.
*
* https://github.com/GooseMod/OpenAsar/blob/ef4470849624032a8eb7265eabd23158aa5a2356/src/mainWindow.js#L99
* https://github.com/GooseMod/OpenAsar/wiki/DOM-Optimizer
*/
const { plugin: { store }, ui: { SwitchItem, Text } } = shelter;
const _removeChild = Element.prototype.removeChild;
const optimize = (orig) => function(...args) {
	if (typeof args[0].className === "string" && args[0].className.indexOf("activity") !== -1) return setTimeout(() => orig.apply(this, args), 100);
	return orig.apply(this, args);
};
if (store.remove) Element.prototype.removeChild = optimize(Element.prototype.removeChild);
const settings = () => [
	(0, import_web$1.createComponent)(Text, { get children() {
		return [
			"See ",
			(0, import_web$2.getNextElement)(_tmpl$),
			" for more information on how this works!"
		];
	} }),
	(0, import_web$2.getNextElement)(_tmpl$2),
	(0, import_web$2.getNextElement)(_tmpl$2),
	(0, import_web$1.createComponent)(SwitchItem, {
		get value() {
			return store.remove;
		},
		onChange: (v) => {
			store.remove = v;
			if (v) Element.prototype.removeChild = optimize(_removeChild);
else Element.prototype.removeChild = _removeChild;
		},
		children: "Apply to Element.removeChild"
	})
];

//#endregion
exports.settings = settings
return exports;
})({});