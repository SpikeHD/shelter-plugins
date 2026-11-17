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
//#region plugins/invisible-typing/index.scss
const classes = {
	"invisContainer": "KIS_7q_invisContainer",
	"notShowing": "KIS_7q_notShowing"
};
const css = `.KIS_7q_invisContainer {
  width: var(--space-32);
  height: var(--space-32);
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
}

.KIS_7q_invisContainer svg path {
  fill: var(--interactive-normal) !important;
}

.KIS_7q_invisContainer.KIS_7q_notShowing svg path {
  fill: var(--status-danger) !important;
}

.KIS_7q_invisContainer svg {
  width: 100%;
  height: 55%;
}
`;

//#endregion
//#region plugins/invisible-typing/index.tsx
var import_web = __toESM(require_web(), 1);
var import_web$1 = __toESM(require_web(), 1);
var import_web$2 = __toESM(require_web(), 1);
var import_web$3 = __toESM(require_web(), 1);
var import_web$4 = __toESM(require_web(), 1);
var import_web$5 = __toESM(require_web(), 1);
var import_web$6 = __toESM(require_web(), 1);
var import_web$7 = __toESM(require_web(), 1);
var import_web$8 = __toESM(require_web(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web.template)(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm16 64h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm80-176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V144zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zM160 336c0-8.8 7.2-16 16-16H400c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V336zM272 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM256 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM368 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM352 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V240zM464 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM448 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V240zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16z"></path></svg>`, 4), _tmpl$2 = /*#__PURE__*/ (0, import_web.template)(`<div id="invis-icon"></div>`, 2);
const { flux: { intercept }, plugin: { store }, solid: { createSignal }, ui: { injectCss, tooltip }, observeDom } = shelter;
let injectedCss = false;
if (!injectedCss) {
	injectedCss = true;
	injectCss(css);
}
const keyboardSvg = (0, import_web$8.getNextElement)(_tmpl$);
const unintercept = intercept((dispatch) => {
	if (dispatch.type === "TYPING_START_LOCAL") return store.enabled ? false : null;
});
const unobserve = observeDom("[class*=\"channelTextArea\"] [class*=\"buttons\"]", (node) => {
	if (document.querySelector("#invis-icon")) return;
	const [enabled, setEnabled] = createSignal(!!store.enabled);
	const toggleEnabled = () => {
		store.enabled = !enabled();
		setEnabled(!enabled());
	};
	const invisIcon = (() => {
		const _el$2 = (0, import_web$8.getNextElement)(_tmpl$2);
		(0, import_web$7.use)(tooltip, _el$2, () => enabled() ? "Currently hiding" : "Currently not hiding");
		_el$2.$$click = toggleEnabled;
		(0, import_web$6.insert)(_el$2, keyboardSvg);
		(0, import_web$4.effect)((_p$) => {
			const _v$ = classes.invisContainer + (enabled() ? " " + classes.notShowing : ""), _v$2 = node.childElementCount === 0 && { display: "none" };
			_v$ !== _p$._v$ && (0, import_web$3.className)(_el$2, _p$._v$ = _v$);
			_p$._v$2 = (0, import_web$2.style)(_el$2, _v$2, _p$._v$2);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined
		});
		(0, import_web$5.runHydrationEvents)();
		return _el$2;
	})();
	node.prepend(invisIcon);
});
const onUnload = () => {
	unintercept();
	unobserve();
	const invisIcon = document.querySelector("#invis-icon");
	if (invisIcon) invisIcon.remove();
};
(0, import_web$1.delegateEvents)(["click"]);

//#endregion
exports.onUnload = onUnload
return exports;
})({});