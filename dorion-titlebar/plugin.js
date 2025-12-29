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
//#region plugins/dorion-titlebar/index.scss
const classes = {
	"dorion_topbar": "e6P4KG_dorion_topbar",
	"maximized": "e6P4KG_maximized",
	"topmin": "e6P4KG_topmin",
	"svgmax": "e6P4KG_svgmax",
	"topclose": "e6P4KG_topclose",
	"topright": "e6P4KG_topright",
	"svgunmax": "e6P4KG_svgunmax",
	"topmax": "e6P4KG_topmax"
};
const css = `.e6P4KG_dorion_topbar {
  background-color: var(--background-base-lowest);
  z-index: 9999;
  width: calc(100% - 8px);
  height: 32px;
  color: var(--text-default);
  white-space: nowrap;
  flex-direction: row;
  justify-content: flex-end;
  padding-left: 8px;
  font-family: gg mono, Courier New, monospace;
  font-weight: bolder;
  display: flex;
  position: relative;
  top: 0;
  left: 0;
}

.e6P4KG_topright {
  margin-left: calc(-1 * var(--space-12));
  flex-direction: row;
  align-items: center;
  height: 100%;
  display: flex;
}

.e6P4KG_topclose, .e6P4KG_topmin, .e6P4KG_topmax {
  width: 44px;
  height: 100%;
  color: var(--interactive-text-default);
  justify-content: center;
  align-items: center;
  transition: all .1s ease-in-out;
  display: flex;
}

.e6P4KG_topclose:hover, .e6P4KG_topmin:hover, .e6P4KG_topmax:hover {
  filter: brightness(.8);
  background: var(--background-surface-highest);
}

.e6P4KG_topmax svg {
  display: none;
}

.e6P4KG_topclose svg, .e6P4KG_topmin svg, .e6P4KG_topmax svg {
  width: 10px !important;
  height: 10px !important;
}

.e6P4KG_topmax:not(.e6P4KG_maximized) .e6P4KG_svgmax, .e6P4KG_topmax.e6P4KG_maximized .e6P4KG_svgunmax {
  display: initial;
}

.e6P4KG_topclose:hover {
  background: var(--status-danger);
  color: var(--white);
}
`;

//#endregion
//#region plugins/dorion-titlebar/actions.ts
function close() {
	window.__TAURI__.core.invoke("close");
}
function minimize() {
	window.__TAURI__.core.invoke("minimize");
}
function toggleMaximize() {
	window.__TAURI__.core.invoke("toggle_maximize");
}
async function setMaximizeIcon() {
	if (await window?.__TAURI__?.webviewWindow.getCurrentWebviewWindow().isMaximized()) {
		const topmax = document.querySelector(`.${classes.topmax}`);
		topmax?.classList?.add(classes.maximized);
	} else {
		const topmax = document.querySelector(`.${classes.topmax}`);
		topmax?.classList?.remove(classes.maximized);
	}
}

//#endregion
//#region plugins/dorion-titlebar/Titlebar.tsx
var import_web$1 = __toESM(require_web(), 1);
var import_web$2 = __toESM(require_web(), 1);
var import_web$3 = __toESM(require_web(), 1);
var import_web$4 = __toESM(require_web(), 1);
var import_web$5 = __toESM(require_web(), 1);
var import_web$6 = __toESM(require_web(), 1);
var import_web$7 = __toESM(require_web(), 1);
var import_web$8 = __toESM(require_web(), 1);
var import_web$9 = __toESM(require_web(), 1);
var import_web$10 = __toESM(require_web(), 1);
var import_web$11 = __toESM(require_web(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web$1.template)(`<div data-tauri-drag-region></div>`, 2), _tmpl$2 = /*#__PURE__*/ (0, import_web$1.template)(`<div><div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 256 256" xml:space="preserve"><defs></defs><g style="
          stroke: none;
          stroke-width: 0;
          stroke-dasharray: none;
          stroke-linecap: butt;
          stroke-linejoin: miter;
          stroke-miterlimit: 10;
          fill: none;
          fill-rule: nonzero;
          opacity: 1;
        " transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"><path d="M 86.5 48.5 h -83 C 1.567 48.5 0 46.933 0 45 s 1.567 -3.5 3.5 -3.5 h 83 c 1.933 0 3.5 1.567 3.5 3.5 S 88.433 48.5 86.5 48.5 z" style="
            stroke: none;
            stroke-width: 1;
            stroke-dasharray: none;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-miterlimit: 10;
            fill: currentColor;
            fill-rule: nonzero;
            opacity: 1;
          " transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path><path d="M 86.5 48.5 h -83 C 1.567 48.5 0 46.933 0 45 s 1.567 -3.5 3.5 -3.5 h 83 c 1.933 0 3.5 1.567 3.5 3.5 S 88.433 48.5 86.5 48.5 z" style="
            stroke: none;
            stroke-width: 1;
            stroke-dasharray: none;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-miterlimit: 10;
            fill: currentColor;
            fill-rule: nonzero;
            opacity: 1;
          " transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path></g></svg></div><div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 256 256" xml:space="preserve"><defs></defs><g style="
          stroke: none;
          stroke-width: 0;
          stroke-dasharray: none;
          stroke-linecap: butt;
          stroke-linejoin: miter;
          stroke-miterlimit: 10;
          fill: none;
          fill-rule: nonzero;
          opacity: 1;
        " transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"><path d="M 90 90 H 0 V 0 h 90 V 90 z M 10 80 h 70 V 10 H 10 V 80 z" style="
            stroke: none;
            stroke-width: 1;
            stroke-dasharray: none;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-miterlimit: 10;
            fill: currentColor;
            fill-rule: nonzero;
            opacity: 1;
          " transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path></g></svg><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 256 256" xml:space="preserve"><defs></defs><g style="
          stroke: none;
          stroke-width: 0;
          stroke-dasharray: none;
          stroke-linecap: butt;
          stroke-linejoin: miter;
          stroke-miterlimit: 10;
          fill: none;
          fill-rule: nonzero;
          opacity: 1;
        " transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"><path d="M 70 90 h -70 v -70 h 70 v 70 z M 10 80 h 50 v -50 h -50 v 50 z M 20 0 H 90 V 70 H 80 V 10 H 20 z" style="
            stroke: none;
            stroke-width: 1;
            stroke-dasharray: none;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-miterlimit: 10;
            fill: currentColor;
            fill-rule: nonzero;
            opacity: 1;
          " transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path></g></svg></div><div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 256 256" xml:space="preserve"><defs></defs><g style="
          stroke: none;
          stroke-width: 0;
          stroke-dasharray: none;
          stroke-linecap: butt;
          stroke-linejoin: miter;
          stroke-miterlimit: 10;
          fill: none;
          fill-rule: nonzero;
          opacity: 1;
        " transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"><path d="M 8 90 c -2.047 0 -4.095 -0.781 -5.657 -2.343 c -3.125 -3.125 -3.125 -8.189 0 -11.314 l 74 -74 c 3.125 -3.124 8.189 -3.124 11.314 0 c 3.124 3.124 3.124 8.189 0 11.313 l -74 74 C 12.095 89.219 10.047 90 8 90 z" style="
            stroke: none;
            stroke-width: 1;
            stroke-dasharray: none;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-miterlimit: 10;
            fill: currentColor;
            fill-rule: nonzero;
            opacity: 1;
          " transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path><path d="M 82 90 c -2.048 0 -4.095 -0.781 -5.657 -2.343 l -74 -74 c -3.125 -3.124 -3.125 -8.189 0 -11.313 c 3.124 -3.124 8.189 -3.124 11.313 0 l 74 74 c 3.124 3.125 3.124 8.189 0 11.314 C 86.095 89.219 84.048 90 82 90 z" style="
            stroke: none;
            stroke-width: 1;
            stroke-dasharray: none;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-miterlimit: 10;
            fill: currentColor;
            fill-rule: nonzero;
            opacity: 1;
          " transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path></g></svg></div></div>`, 44);
const Titlebar = () => {
	return (() => {
		const _el$ = (0, import_web$9.getNextElement)(_tmpl$);
		(0, import_web$10.insert)(_el$, (0, import_web$11.createComponent)(Controls, {}));
		(0, import_web$8.effect)(() => (0, import_web$7.className)(_el$, classes.dorion_topbar));
		return _el$;
	})();
};
const Controls = (props) => {
	return (() => {
		const _el$2 = (0, import_web$9.getNextElement)(_tmpl$2), _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.firstChild, _el$6 = _el$5.nextSibling, _el$7 = _el$4.nextSibling;
		(0, import_web$6.addEventListener)(_el$3, "click", minimize, true);
		(0, import_web$6.addEventListener)(_el$4, "click", toggleMaximize, true);
		(0, import_web$6.addEventListener)(_el$7, "click", close, true);
		(0, import_web$8.effect)((_p$) => {
			const _v$ = classes.topright, _v$2 = props.standalone ? "height: 32px; position: relative; left: 12px;" : "", _v$3 = classes.topmin, _v$4 = classes.topmax, _v$5 = classes.svgmax, _v$6 = classes.svgunmax, _v$7 = classes.topclose;
			_v$ !== _p$._v$ && (0, import_web$7.className)(_el$2, _p$._v$ = _v$);
			_p$._v$2 = (0, import_web$4.style)(_el$2, _v$2, _p$._v$2);
			_v$3 !== _p$._v$3 && (0, import_web$7.className)(_el$3, _p$._v$3 = _v$3);
			_v$4 !== _p$._v$4 && (0, import_web$7.className)(_el$4, _p$._v$4 = _v$4);
			_v$5 !== _p$._v$5 && (0, import_web$3.setAttribute)(_el$5, "class", _p$._v$5 = _v$5);
			_v$6 !== _p$._v$6 && (0, import_web$3.setAttribute)(_el$6, "class", _p$._v$6 = _v$6);
			_v$7 !== _p$._v$7 && (0, import_web$7.className)(_el$7, _p$._v$7 = _v$7);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined,
			_v$3: undefined,
			_v$4: undefined,
			_v$5: undefined,
			_v$6: undefined,
			_v$7: undefined
		});
		(0, import_web$5.runHydrationEvents)();
		return _el$2;
	})();
};
(0, import_web$2.delegateEvents)(["click"]);

//#endregion
//#region plugins/dorion-titlebar/waitElm.ts
const { util: { log } } = shelter;
let observer = null;
function disobserve() {
	observer.disconnect();
	observer = null;
}
function observeDom(rootElm, callbackFn, subtree) {
	return new Promise((resolve) => {
		if (observer) disobserve();
		observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) if (mutation.type === "childList") {
				const addedNodes = Array.from(mutation.addedNodes);
				for (const node of addedNodes) if (!callbackFn(node, resolve)) return disobserve();
			}
		});
		observer.observe(rootElm, {
			childList: true,
			subtree
		});
	});
}
const subtreeFind = (p, q) => Array.from(p.children).find((c) => q.some((q$1) => c.matches(q$1)));
const queryFind = (p, query) => {
	for (let q of query) {
		const subtree = q[0] === ">";
		if (subtree) q = q.slice(1);
		const elm = subtree ? subtreeFind(p, [q]) : p.querySelector(q);
		if (elm) return elm;
	}
};
const waitForElm = async (queries, cfg) => {
	let root = cfg.root || document.body;
	const callbackFn = cfg.callbackFn;
	let query;
	let timeout = true;
	const startTimeout = () => setTimeout(() => {
		if (timeout) {
			log([
				"The observer seems stuck at",
				root,
				"looking for",
				query,
				"with remaining queries:",
				queries
			], "warn");
			startTimeout();
		}
	}, 1e4);
	startTimeout();
	if (!Array.isArray(queries)) queries = [queries];
	while (queries.length) {
		const q = queries.shift();
		query = typeof q === "string" ? [q] : q;
		const directChild = query.every((q$1) => q$1[0] === ">");
		if (directChild) query = query.map((q$1) => q$1.slice(1));
		const elm = directChild ? subtreeFind(root, query) : queryFind(root, query);
		if (elm) {
			root = elm;
			if (callbackFn) callbackFn(root);
			continue;
		}
		root = await observeDom(root, (node, res) => {
			if (node.nodeType !== Node.ELEMENT_NODE) return true;
			const e = node;
			for (let q$1 of query) {
				if (!directChild) {
					const s = q$1[0] === ">";
					if (s) q$1 = q$1.slice(1);
				}
				let ret = e.matches(q$1) ? e : null;
				if (!ret) ret = e.querySelector(q$1);
				if (ret) {
					res(e);
					return false;
				}
			}
			return true;
		}, !directChild);
		if (callbackFn) callbackFn(root);
	}
	timeout = false;
	return root;
};

//#endregion
//#region plugins/dorion-titlebar/index.tsx
var import_web = __toESM(require_web(), 1);
const { ui: { injectCss }, flux: { dispatcher } } = shelter;
let injectedCss = false;
const insertOne = (classNames, callbackFn) => {
	if (!Array.isArray(classNames)) classNames = [classNames];
	classNames.forEach((className) => {
		document.querySelectorAll(`div.${className}`).forEach((e) => {
			e.remove();
		});
	});
	callbackFn();
};
const insertTitleBar = (parent) => {
	insertOne(classes.dorion_topbar, () => parent.prepend((0, import_web.createComponent)(Titlebar, {})));
};
const insertStandaloneControl = (parent) => {
	insertOne([classes.dorion_topbar, classes.topright], () => parent.appendChild((0, import_web.createComponent)(Controls, { standalone: true })));
	setMaximizeIcon();
};
const waitDiscordPanel = (callbackFn) => waitForElm([
	">div#app-mount",
	">div[class*=appAsidePanelWrapper]",
	">div[class*=notAppAsidePanel]"
], { callbackFn });
const injectControls = async () => {
	insertTitleBar(document.body);
	const discordPanel = await waitDiscordPanel((elm) => insertTitleBar(elm));
	const discordBar = await waitForElm([
		"div[data-layer=base]>div[class*=container]",
		">div[class*=base]",
		[">div[class*=bar_]", ">div[class*=-bar]"]
	], { root: discordPanel });
	waitForElm(">div[class*=trailing]", {
		callbackFn: (elm) => {
			insertStandaloneControl(elm);
		},
		root: discordBar
	});
	waitForElm(">div[class*=title]", {
		callbackFn: (elm) => {
			elm.setAttribute("data-tauri-drag-region", "true");
		},
		root: discordBar
	});
};
const handleFullTitlebar = async () => {
	waitDiscordPanel((elm) => insertTitleBar(elm));
};
const handleControlsOnly = async () => {
	const dorionControl = document.querySelector(`div[class*=notAppAsidePanel] div[data-layer=base][class*=baseLayer] div[class*=base]>div[class*=bar]>div[class*=trailing] div.${classes.topright}`);
	if (dorionControl) document.querySelectorAll(`.${classes.dorion_topbar}`)?.forEach((e) => e.remove());
};
const handleFullscreenExit = (dispatch) => {
	if (dispatch.isElementFullscreen) return;
	injectControls();
};
const onLoad = async () => {
	if (window?.__DORION_CONFIG__?.use_native_titlebar || await window?.__TAURI__?.core.invoke("get_platform") === "macos") return;
	if (!injectedCss) {
		injectCss(css);
		injectedCss = true;
	}
	window?.__TAURI__?.event.listen(
		// @ts-expect-error shut up
		window.__TAURI__.event.TauriEvent.WINDOW_RESIZED,
		setMaximizeIcon
);
	window?.__TAURI__?.core.invoke("remove_top_bar");
	injectControls();
	dispatcher.subscribe("LAYER_PUSH", handleFullTitlebar);
	dispatcher.subscribe("LAYER_POP", handleControlsOnly);
	dispatcher.subscribe("LOGIN_SUCCESS", injectControls);
	dispatcher.subscribe("WINDOW_FULLSCREEN_CHANGE", handleFullscreenExit);
};
const onUnload = () => {
	disobserve();
	dispatcher.unsubscribe("LAYER_PUSH", handleFullTitlebar);
	dispatcher.unsubscribe("LAYER_POP", handleControlsOnly);
	dispatcher.unsubscribe("LOGIN_SUCCESS", injectControls);
	dispatcher.unsubscribe("WINDOW_FULLSCREEN_CHANGE", handleFullscreenExit);
};

//#endregion
exports.onLoad = onLoad
exports.onUnload = onUnload
return exports;
})({});