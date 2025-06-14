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
//#region node_modules/.pnpm/@cumjar+websmack@1.2.0/node_modules/@cumjar/websmack/src/raid/webpackChunk.js
var webpackChunk_default = (key) => {
	key ??= Object.keys(window).find((key$1) => key$1.startsWith("webpackChunk"));
	if (!window[key]) return;
	let wpRequire;
	window[key].push([
		[Symbol()],
		{},
		(e) => {
			wpRequire = e;
		}
	]);
	window[key].pop();
	return [wpRequire.c ?? Object.fromEntries(Object.entries(wpRequire.m).map(([k]) => [k, {
		id: k,
		loaded: true,
		exports: wpRequire(k)
	}])), wpRequire];
};

//#endregion
//#region node_modules/.pnpm/@cumjar+websmack@1.2.0/node_modules/@cumjar/websmack/src/api/filters.js
const byProps = (props) => (m) => props.every((p) => m[p] !== undefined);
const byProtos = (protos) => (m) => m.prototype && protos.every((p) => m.prototype[p] !== undefined);
const byDisplayName = (name, defaultExp = true) => (m) => (defaultExp ? m.displayName : m.default?.displayName) === name;
const byKeyword = (strs) => (m) => strs.every((s) => Object.keys(m).some((k) => k.toLowerCase().includes(s.toLowerCase())));
const byDispNameDeep = (name) => (m) => {
	const regex = new RegExp(`(${name}$)|((\\w+\\()+${name}\\))`);
	if (regex.test(m.displayName)) return true;
	if (typeof m.$$typeof !== "symbol") return;
	if (m.Consumer !== undefined) return;
	if (m.type || m.render) {
		while (typeof m.type === "object" || typeof m.render === "object") m = m.type ?? m.render;
		if (regex.test(m.type?.displayName)) return true;
		if (regex.test(m.render?.displayName)) return true;
	}
};
const isKeyable = (m) => typeof m === "object" || typeof m === "function";
const byNestedProps = (props) => (m) => isKeyable(m) && Object.values(m).some((v) => isKeyable(v) && props.some((p) => v?.[p] !== undefined));
const allByCode = (modules, loaders) => (code) => Object.entries(loaders).filter(([, m]) => m.toString().match(code)).map(([id]) => modules[id]?.exports).filter((m) => m);

//#endregion
//#region node_modules/.pnpm/@cumjar+websmack@1.2.0/node_modules/@cumjar/websmack/src/api/batch.js
const batchFilter = (modules, filterList) => {
	const found = [];
	const checkModule = (mod) => filterList.forEach(([filter$1, multi], i) => {
		if (multi && !found[i]) found[i] = [];
		if (filter$1(mod)) {
			if (multi) found[i].push(mod);
else if (!found[i]) found[i] = mod;
		}
	});
	for (const mid in modules) {
		const module$1 = modules[mid].exports;
		if (!module$1 || module$1 === window) continue;
		if (module$1.default && module$1.__esModule) checkModule(module$1.default);
		checkModule(module$1);
	}
	return found;
};
const makeFakeWp = (filterList) => ({
	find: (f) => filterList.push([f, false]),
	findAll: (f) => filterList.push([f, true]),
	findByProps: (...p) => filterList.push([byProps(p), false]),
	findByPropsAll: (...p) => filterList.push([byProps(p), true]),
	findByPrototypes: (...p) => filterList.push([byProtos(p), false]),
	findByPrototypesAll: (...p) => filterList.push([byProtos(p), true]),
	findByNestedProps: (...p) => filterList.push([byNestedProps(p), false]),
	findByNestedPropsAll: (...p) => filterList.push([byNestedProps(p), true]),
	findByDisplayName: (n, d) => filterList.push([byDisplayName(n, d), false]),
	findByDisplayNameAll: (n, d) => filterList.push([byDisplayName(n, d), true]),
	findByDispNameDeep: (n) => filterList.push([byDispNameDeep(n), false]),
	findByDispNameDeepAll: (n) => filterList.push([byDispNameDeep(n), true]),
	findByKeyword: (...s) => filterList.push([byKeyword(s), false]),
	findByKeywordAll: (...s) => filterList.push([byKeyword(s), true])
});
var batch_default = (mods) => (cb) => {
	const fList = [];
	const fakeWp = makeFakeWp(fList);
	cb(fakeWp);
	return batchFilter(mods, fList);
};

//#endregion
//#region node_modules/.pnpm/@cumjar+websmack@1.2.0/node_modules/@cumjar/websmack/src/api/index.js
const filter = (modules, single = true) => (filterFunc) => {
	const found = [];
	for (const mid in modules) {
		const module$1 = modules[mid].exports;
		if (!module$1 || module$1 === window) continue;
		if (module$1.default && module$1.__esModule && filterFunc(module$1.default)) {
			if (single) return module$1.default;
			found.push(module$1.default);
		}
		if (filterFunc(module$1)) {
			if (single) return module$1;
			found.push(module$1);
		}
	}
	if (!single) return found;
};
var api_default = ([, modules, wpR]) => {
	const find = filter(modules);
	const findAll = filter(modules, false);
	const findByCodeAll = wpR ? allByCode(modules, wpR.m) : () => {
		throw new Error("findByCode does not work with this bundler");
	};
	return {
		batchFind: batch_default(modules),
		find,
		findAll,
		findByProps: (...p) => find(byProps(p)),
		findByPropsAll: (...p) => findAll(byProps(p)),
		findByPrototypes: (...p) => find(byProtos(p)),
		findByPrototypesAll: (...p) => findAll(byProtos(p)),
		findByNestedProps: (...p) => find(byNestedProps(p)),
		findByNestedPropsAll: (...p) => findAll(byNestedProps(p)),
		findByDisplayName: (d, p) => find(byDisplayName(d, p)),
		findByDisplayNameAll: (d, p) => findAll(byDisplayName(d, p)),
		findByDispNameDeep: (d) => find(byDispNameDeep(d)),
		findByDispNameDeepAll: (d) => findAll(byDispNameDeep(d)),
		findByKeyword: (...k) => find(byKeyword(k)),
		findByKeywordAll: (...k) => findAll(byKeyword(k)),
		findByCodeAll,
		findByCode: (c$1) => findByCodeAll(c$1)[0]
	};
};

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
const backend = backendName;
const api = window[backendName];
const appName = backendObj.name;
const invoke = backendObj.invoke;
const event = backendObj.event;
const app = backendObj.app;
const process = backendObj.process;
const apiWindow = backendObj.apiWindow;

//#endregion
//#region plugins/shelteRPC/util.ts
const timestampToRelative = (timestamp) => {
	const now = Date.now();
	const diff = now - timestamp;
	const seconds = Math.floor(diff / 1e3);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
	if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
	if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
	return "Just now";
};

//#endregion
//#region plugins/shelteRPC/components/GameCard.scss
const classes$3 = {
	"gameCard": "zS7Qtq_gameCard",
	"gameCardInfo": "zS7Qtq_gameCardInfo",
	"gameCardIcons": "zS7Qtq_gameCardIcons",
	"cardPlaying": "zS7Qtq_cardPlaying",
	"trash": "zS7Qtq_trash",
	"gameCardName": "zS7Qtq_gameCardName",
	"cardPlayed": "zS7Qtq_cardPlayed",
	"gameCardLastPlayed": "zS7Qtq_gameCardLastPlayed",
	"lastPlayedTimestamp": "zS7Qtq_lastPlayedTimestamp",
	"cardNone": "zS7Qtq_cardNone"
};
const css$3 = `.zS7Qtq_gameCard {
  width: 100%;
  height: 72px;
  color: var(--text-normal);
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  display: flex;
}

.zS7Qtq_gameCard.zS7Qtq_cardNone {
  background-color: var(--background-secondary);
}

.zS7Qtq_gameCard.zS7Qtq_cardPlaying {
  background-color: var(--status-positive-background);
}

.zS7Qtq_gameCard.zS7Qtq_cardPlaying .zS7Qtq_gameCardIcons {
  color: var(--green-230);
}

.zS7Qtq_gameCard.zS7Qtq_cardPlayed {
  border-bottom: 1px solid var(--primary-500);
  background: none;
  border-radius: 0;
}

.zS7Qtq_gameCard.zS7Qtq_cardPlayed .zS7Qtq_gameCardLastPlayed {
  color: var(--text-muted);
}

.zS7Qtq_gameCard.zS7Qtq_cardPlayed .zS7Qtq_lastPlayedTimestamp {
  font-weight: bold;
}

.zS7Qtq_gameCardInfo {
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
  height: 100%;
  padding: 0 20px;
  display: flex;
}

.zS7Qtq_gameCardName {
  font-weight: bold;
}

.zS7Qtq_gameCardIcons {
  height: 100%;
  color: var(--primary-400);
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  display: flex;
}

.zS7Qtq_gameCardIcons span {
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin: 4px;
}

.zS7Qtq_gameCardIcons span:hover {
  color: var(--text-normal);
}

.zS7Qtq_gameCardIcons span svg {
  width: 100%;
  height: 100%;
}

.zS7Qtq_trash:hover {
  color: var(--status-danger) !important;
}
`;

//#endregion
//#region plugins/shelteRPC/components/GameCard.tsx
var import_web$27 = __toESM(require_web(), 1);
var import_web$28 = __toESM(require_web(), 1);
var import_web$29 = __toESM(require_web(), 1);
var import_web$30 = __toESM(require_web(), 1);
var import_web$31 = __toESM(require_web(), 1);
var import_web$32 = __toESM(require_web(), 1);
var import_web$33 = __toESM(require_web(), 1);
var import_web$34 = __toESM(require_web(), 1);
var import_web$35 = __toESM(require_web(), 1);
const _tmpl$$4 = /*#__PURE__*/ (0, import_web$27.template)(`<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path><path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path></svg>`, 6), _tmpl$2$2 = /*#__PURE__*/ (0, import_web$27.template)(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"></path></svg>`, 4), _tmpl$3$1 = /*#__PURE__*/ (0, import_web$27.template)(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"></path></svg>`, 4), _tmpl$4 = /*#__PURE__*/ (0, import_web$27.template)(`<div><div><span></span><span></span></div><div><!#><!/><!#><!/></div></div>`, 14), _tmpl$5 = /*#__PURE__*/ (0, import_web$27.template)(`<span></span>`, 2);
const { ui: { injectCss: injectCss$3 }, plugin: { store: store$2 }, solid: { createSignal: createSignal$1 } } = shelter;
const trashIcon = () => (0, import_web$35.getNextElement)(_tmpl$$4);
const hideIcon = () => (0, import_web$35.getNextElement)(_tmpl$2$2);
const hideClosed = () => (0, import_web$35.getNextElement)(_tmpl$3$1);
let injectedCss$3 = false;
const deleteGame = (name) => {
	if (backend !== "None") event.emit("remove_detectable", {
		name,
		exe: ""
	});
	const key = Object.keys(store$2.previouslyPlayed).find((k) => store$2.previouslyPlayed[k].name === name);
	delete store$2.previouslyPlayed[key];
	if (store$2.currentlyPlaying === name) store$2.currentlyPlaying = "";
};
var GameCard_default = (props) => {
	if (!injectedCss$3) {
		injectedCss$3 = true;
		injectCss$3(css$3);
	}
	const [hide, setHide] = createSignal$1(props.name ? store$2.previouslyPlayed[props.name]?.hide : false);
	return (() => {
		const _el$4 = (0, import_web$35.getNextElement)(_tmpl$4), _el$5 = _el$4.firstChild, _el$6 = _el$5.firstChild, _el$7 = _el$6.nextSibling, _el$8 = _el$5.nextSibling, _el$9 = _el$8.firstChild, [_el$0, _co$] = (0, import_web$32.getNextMarker)(_el$9.nextSibling), _el$1 = _el$0.nextSibling, [_el$10, _co$2] = (0, import_web$32.getNextMarker)(_el$1.nextSibling);
		(0, import_web$33.insert)(_el$6, () => props.name || "No game detected");
		(0, import_web$33.insert)(_el$7, (() => {
			const _c$ = (0, import_web$34.memo)(() => props.type === "played");
			return () => _c$() ? ["Last played: ", (() => {
				const _el$11 = (0, import_web$35.getNextElement)(_tmpl$5);
				(0, import_web$33.insert)(_el$11, () => timestampToRelative(props.lastPlayed));
				(0, import_web$31.effect)(() => (0, import_web$30.className)(_el$11, classes$3.lastPlayedTimestamp));
				return _el$11;
			})()] : props.type === "playing" && props.name ? "Now playing!" : "What are you playing?";
		})());
		(0, import_web$33.insert)(_el$8, (() => {
			const _c$2 = (0, import_web$34.memo)(() => !!props.local);
			return () => _c$2() && (() => {
				const _el$12 = (0, import_web$35.getNextElement)(_tmpl$5);
				_el$12.$$click = () => {
					deleteGame(props.name || "");
				};
				(0, import_web$33.insert)(_el$12, trashIcon);
				(0, import_web$31.effect)(() => (0, import_web$30.className)(_el$12, classes$3.trash));
				(0, import_web$29.runHydrationEvents)();
				return _el$12;
			})();
		})(), _el$0, _co$);
		(0, import_web$33.insert)(_el$8, (() => {
			const _c$3 = (0, import_web$34.memo)(() => !!(props.name && props.type !== "playing"));
			return () => _c$3() && (() => {
				const _el$13 = (0, import_web$35.getNextElement)(_tmpl$5);
				_el$13.$$click = () => {
					if (!props.name) return;
					const key = Object.keys(store$2.previouslyPlayed).find((k) => store$2.previouslyPlayed[k].name === props.name);
					store$2.previouslyPlayed[key].hide = !hide();
					setHide(!hide());
				};
				(0, import_web$33.insert)(_el$13, (() => {
					const _c$4 = (0, import_web$34.memo)(() => !!hide());
					return () => _c$4() ? hideClosed() : hideIcon();
				})());
				(0, import_web$31.effect)(() => (0, import_web$30.className)(_el$13, classes$3.hide));
				(0, import_web$29.runHydrationEvents)();
				return _el$13;
			})();
		})(), _el$10, _co$2);
		(0, import_web$31.effect)((_p$) => {
			const _v$ = classes$3.gameCard + " " + (props.type === "playing" && props.name ? classes$3.cardPlaying : props.type === "played" ? classes$3.cardPlayed : classes$3.cardNone), _v$2 = classes$3.gameCardInfo, _v$3 = classes$3.gameCardName, _v$4 = classes$3.gameCardLastPlayed, _v$5 = classes$3.gameCardIcons;
			_v$ !== _p$._v$ && (0, import_web$30.className)(_el$4, _p$._v$ = _v$);
			_v$2 !== _p$._v$2 && (0, import_web$30.className)(_el$5, _p$._v$2 = _v$2);
			_v$3 !== _p$._v$3 && (0, import_web$30.className)(_el$6, _p$._v$3 = _v$3);
			_v$4 !== _p$._v$4 && (0, import_web$30.className)(_el$7, _p$._v$4 = _v$4);
			_v$5 !== _p$._v$5 && (0, import_web$30.className)(_el$8, _p$._v$5 = _v$5);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined,
			_v$3: undefined,
			_v$4: undefined,
			_v$5: undefined
		});
		return _el$4;
	})();
};
(0, import_web$28.delegateEvents)(["click"]);

//#endregion
//#region components/Dropdown.tsx.scss
const classes$2 = {
	"ddownplaceholder": "sqVpyW_ddownplaceholder",
	"dcontainer": "sqVpyW_dcontainer",
	"dsarrow": "sqVpyW_dsarrow",
	"ddown": "sqVpyW_ddown"
};
const css$2 = `.sqVpyW_ddown {
  box-sizing: border-box;
  width: 100%;
  color: var(--text-normal);
  background-color: var(--input-background);
  appearance: none;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  transition: border-color .2s ease-in-out;
}

.sqVpyW_ddown option {
  color: var(--text-normal);
  background: #333;
}

.sqVpyW_dcontainer {
  width: 100%;
  position: relative;
}

.sqVpyW_dsarrow {
  pointer-events: none;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

.sqVpyW_dsarrow path {
  fill: var(--header-secondary);
}

.sqVpyW_ddownplaceholder {
  color: var(--header-secondary);
}
`;

//#endregion
//#region components/SelectArrow.tsx
var import_web$23 = __toESM(require_web(), 1);
var import_web$24 = __toESM(require_web(), 1);
var import_web$25 = __toESM(require_web(), 1);
var import_web$26 = __toESM(require_web(), 1);
const _tmpl$$3 = /*#__PURE__*/ (0, import_web$23.template)(`<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>`, 4);
const SelectArrow = (props) => (() => {
	const _el$ = (0, import_web$26.getNextElement)(_tmpl$$3);
	(0, import_web$25.effect)(() => (0, import_web$24.setAttribute)(_el$, "class", props.class));
	return _el$;
})();

//#endregion
//#region components/Dropdown.tsx
var import_web$13 = __toESM(require_web(), 1);
var import_web$14 = __toESM(require_web(), 1);
var import_web$15 = __toESM(require_web(), 1);
var import_web$16 = __toESM(require_web(), 1);
var import_web$17 = __toESM(require_web(), 1);
var import_web$18 = __toESM(require_web(), 1);
var import_web$19 = __toESM(require_web(), 1);
var import_web$20 = __toESM(require_web(), 1);
var import_web$21 = __toESM(require_web(), 1);
var import_web$22 = __toESM(require_web(), 1);
const _tmpl$$2 = /*#__PURE__*/ (0, import_web$13.template)(`<div><select><!#><!/><!#><!/></select><!#><!/></div>`, 10), _tmpl$2$1 = /*#__PURE__*/ (0, import_web$13.template)(`<option value=""></option>`, 2), _tmpl$3 = /*#__PURE__*/ (0, import_web$13.template)(`<option></option>`, 2);
const { ui: { injectCss: injectCss$2 } } = shelter;
let injectedCss$2 = false;
const Dropdown = (props) => {
	if (!injectedCss$2) {
		injectedCss$2 = true;
		injectCss$2(css$2);
	}
	return (() => {
		const _el$ = (0, import_web$18.getNextElement)(_tmpl$$2), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, [_el$4, _co$] = (0, import_web$20.getNextMarker)(_el$3.nextSibling), _el$5 = _el$4.nextSibling, [_el$6, _co$2] = (0, import_web$20.getNextMarker)(_el$5.nextSibling), _el$7 = _el$2.nextSibling, [_el$8, _co$3] = (0, import_web$20.getNextMarker)(_el$7.nextSibling);
		_el$2.addEventListener("change", (e) => {
			props.onChange(e);
			if (props.immutable) {
				e.preventDefault();
				e.stopPropagation();
				e.target.value = props.value;
			}
		});
		(0, import_web$21.insert)(_el$2, (() => {
			const _c$ = (0, import_web$22.memo)(() => !!props.placeholder);
			return () => _c$() && (() => {
				const _el$9 = (0, import_web$18.getNextElement)(_tmpl$2$1);
				(0, import_web$21.insert)(_el$9, () => props.placeholder);
				(0, import_web$17.effect)((_p$) => {
					const _v$8 = classes$2.ddownplaceholder, _v$9 = props.value === "";
					_v$8 !== _p$._v$8 && (0, import_web$16.className)(_el$9, _p$._v$8 = _v$8);
					_v$9 !== _p$._v$9 && (_el$9.selected = _p$._v$9 = _v$9);
					return _p$;
				}, {
					_v$8: undefined,
					_v$9: undefined
				});
				return _el$9;
			})();
		})(), _el$4, _co$);
		(0, import_web$21.insert)(_el$2, () => props.options?.map((o) => (() => {
			const _el$0 = (0, import_web$18.getNextElement)(_tmpl$3);
			(0, import_web$21.insert)(_el$0, () => o.label);
			(0, import_web$17.effect)(() => _el$0.selected = o.value === props.value);
			(0, import_web$17.effect)(() => _el$0.value = o.value);
			return _el$0;
		})()), _el$6, _co$2);
		(0, import_web$21.insert)(_el$, (0, import_web$19.createComponent)(SelectArrow, { get ["class"]() {
			return classes$2.dsarrow;
		} }), _el$8, _co$3);
		(0, import_web$17.effect)((_p$) => {
			const _v$ = classes$2.dcontainer, _v$2 = props.style, _v$3 = classes$2.ddown + " " + (props.placeholder && props.value === "" ? classes$2.ddownplaceholder : ""), _v$4 = props.placeholder, _v$5 = props.id, _v$6 = props["aria-label"], _v$7 = props.disabled;
			_v$ !== _p$._v$ && (0, import_web$16.className)(_el$, _p$._v$ = _v$);
			_p$._v$2 = (0, import_web$15.style)(_el$, _v$2, _p$._v$2);
			_v$3 !== _p$._v$3 && (0, import_web$16.className)(_el$2, _p$._v$3 = _v$3);
			_v$4 !== _p$._v$4 && (0, import_web$14.setAttribute)(_el$2, "placeholder", _p$._v$4 = _v$4);
			_v$5 !== _p$._v$5 && (0, import_web$14.setAttribute)(_el$2, "id", _p$._v$5 = _v$5);
			_v$6 !== _p$._v$6 && (0, import_web$14.setAttribute)(_el$2, "aria-label", _p$._v$6 = _v$6);
			_v$7 !== _p$._v$7 && (_el$2.disabled = _p$._v$7 = _v$7);
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
		return _el$;
	})();
};

//#endregion
//#region plugins/shelteRPC/components/RegisteredGames.scss
const classes$1 = {
	"shead": "yVnOSq_shead",
	"modalhead": "yVnOSq_modalhead",
	"addIt": "yVnOSq_addIt",
	"tophead": "yVnOSq_tophead",
	"description": "yVnOSq_description"
};
const css$1 = `.yVnOSq_description {
  margin-top: 8px;
  margin-bottom: 8px;
}

.yVnOSq_addIt {
  margin-top: 8px;
  margin-bottom: 28px;
}

.yVnOSq_tophead {
  margin-bottom: 12px;
}

.yVnOSq_shead {
  margin-top: 42px;
  margin-bottom: 12px;
  font-weight: bold;
}

.yVnOSq_modalhead {
  margin-top: 12px;
}
`;

//#endregion
//#region plugins/shelteRPC/components/RegisteredGames.tsx
var import_web$7 = __toESM(require_web(), 1);
var import_web$8 = __toESM(require_web(), 1);
var import_web$9 = __toESM(require_web(), 1);
var import_web$10 = __toESM(require_web(), 1);
var import_web$11 = __toESM(require_web(), 1);
var import_web$12 = __toESM(require_web(), 1);
const _tmpl$$1 = /*#__PURE__*/ (0, import_web$7.template)(`<a target="_blank">Add it!</a>`, 2);
const { ui: { Divider, Header: Header$1, HeaderTags: HeaderTags$1, Text: Text$1, TextBox: TextBox$1, injectCss: injectCss$1, openConfirmationModal }, solid: { createSignal, createEffect }, plugin: { store: store$1 } } = shelter;
let injectedCss$1 = false;
var RegisteredGames_default = () => {
	if (!injectedCss$1) {
		injectedCss$1 = true;
		injectCss$1(css$1);
	}
	const [isDorion, setIsDorion] = createSignal(false);
	const [currentlyPlaying, setCurrentlyPlaying] = createSignal("");
	const [previouslyPlayed, setPreviouslyPlayed] = createSignal({});
	const [local, setLocal] = createSignal([]);
	createEffect(async () => {
		setIsDorion(appName === "Dorion");
		setCurrentlyPlaying(store$1.currentlyPlaying || "");
		setPreviouslyPlayed(store$1.previouslyPlayed || {});
		setLocal(isDorion && await invoke("get_local_detectables"));
		const markLocals = () => {
			for (const o of local()) {
				const maybeIdx = Object.values(previouslyPlayed()).findIndex((p) => p.name === o.name);
				if (maybeIdx !== -1) previouslyPlayed()[Object.keys(previouslyPlayed())[maybeIdx]]["local"] = true;
			}
		};
		markLocals();
		setInterval(() => {
			setCurrentlyPlaying(store$1.currentlyPlaying || "");
			setPreviouslyPlayed(store$1.previouslyPlayed || {});
			markLocals();
		}, 2e3);
	});
	return [
		(0, import_web$12.createComponent)(Header$1, {
			get tag() {
				return HeaderTags$1.H1;
			},
			get ["class"]() {
				return classes$1.tophead;
			},
			children: "Registered Games"
		}),
		(0, import_web$12.createComponent)(Text$1, {
			get ["class"]() {
				return classes$1.description;
			},
			children: "ShelteRPC will automatically update your status based on the game you're playing (if detectable). You can also manually add games to this list if it isn't being detected."
		}),
		(0, import_web$12.createComponent)(Divider, {
			mt: 20,
			mb: 20
		}),
		(0, import_web$11.memo)((() => {
			const _c$ = (0, import_web$11.memo)(() => !!currentlyPlaying());
			return () => _c$() ? (0, import_web$12.createComponent)(GameCard_default, {
				get name() {
					return currentlyPlaying();
				},
				type: "playing",
				get local() {
					return Object.values(previouslyPlayed()).find((p) => p.name === currentlyPlaying())?.local || false;
				}
			}) : (0, import_web$12.createComponent)(GameCard_default, { type: "none" });
		})()),
		(0, import_web$12.createComponent)(Text$1, {
			get ["class"]() {
				return classes$1.addIt;
			},
			get children() {
				return ["Not seeing your game? ", (0, import_web$11.memo)(() => (0, import_web$11.memo)(() => !!isDorion())() ? (() => {
					const _el$ = (0, import_web$9.getNextElement)(_tmpl$$1);
					_el$.$$click = addIt;
					(0, import_web$10.runHydrationEvents)();
					return _el$;
				})() : "Adding it is unsupported.")];
			}
		}),
		(0, import_web$12.createComponent)(Header$1, {
			get ["class"]() {
				return classes$1.shead;
			},
			children: "Added Games"
		}),
		(0, import_web$11.memo)(() => Object.values(previouslyPlayed()).map((game) => {
			if (game.name === currentlyPlaying()) return null;
			return (0, import_web$12.createComponent)(GameCard_default, {
				get name() {
					return game.name;
				},
				get lastPlayed() {
					return game.lastPlayed;
				},
				type: "played",
				get local() {
					return game?.local;
				}
			});
		}))
	];
};
function addIt() {
	const [windows, setWindows] = createSignal([]);
	const [selected, setSelected] = createSignal(0);
	const [name, setName] = createSignal("");
	createEffect(async () => {
		const res = await invoke("get_windows");
		setWindows(res);
	});
	openConfirmationModal({
		body: () => (0, import_web$11.memo)((() => {
			const _c$2 = (0, import_web$11.memo)(() => windows().length > 0);
			return () => _c$2() ? [
				(0, import_web$12.createComponent)(Dropdown, {
					get options() {
						return windows().filter((w, i, a) => a.findIndex((w2) => w2.process_name === w.process_name) === i).map((w) => ({
							label: w.process_name,
							value: w.pid
						}));
					},
					placeholder: "Select process...",
					maxVisibleItems: 5,
					closeOnSelect: true,
					onChange: (e) => setSelected(Number(e.target.value))
				}),
				(0, import_web$12.createComponent)(Header$1, {
					get ["class"]() {
						return classes$1.modalhead;
					},
					children: "Name to Display"
				}),
				(0, import_web$12.createComponent)(TextBox$1, {
					get value() {
						return name();
					},
					onInput: (v) => setName(v),
					placeholder: "Enter the name to display..."
				})
			] : (0, import_web$12.createComponent)(Text$1, { children: "Please wait..." });
		})()),
		header: () => "Add a game",
		confirmText: "Add",
		type: "neutral"
	}).then(() => {
		event.emit("add_detectable", {
			exe: windows().find((w) => w.pid === selected())?.process_name,
			name: name()
		});
	}, () => {});
}
(0, import_web$8.delegateEvents)(["click"]);

//#endregion
//#region plugins/shelteRPC/index.scss
const classes = { "container": "GAwW_G_container" };
const css = `.GAwW_G_container {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  display: flex;
}

.GAwW_G_container input[type="number"] {
  flex-grow: 0;
  width: 30%;
}
`;

//#endregion
//#region plugins/shelteRPC/index.tsx
var import_web = __toESM(require_web(), 1);
var import_web$1 = __toESM(require_web(), 1);
var import_web$2 = __toESM(require_web(), 1);
var import_web$3 = __toESM(require_web(), 1);
var import_web$4 = __toESM(require_web(), 1);
var import_web$5 = __toESM(require_web(), 1);
var import_web$6 = __toESM(require_web(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web.template)(`<br>`, 1), _tmpl$2 = /*#__PURE__*/ (0, import_web.template)(`<div><!#><!/><!#><!/></div>`, 6);
const { flux: { dispatcher: FluxDispatcher }, settings: { registerSection }, ui: { Header, HeaderTags, TextBox, Text, showToast, injectCss }, plugin: { store }, http } = shelter;
const chunk = webpackChunk_default();
const wp = chunk && api_default([undefined, ...chunk]);
const c = wp.findByCode("getAssetImage: ");
const fetchAssetIds = async (id, asset) => (await (c ? c.fetchAssetIds(id, [asset, null]) : () => null))[0];
let injectedCss = false;
if (!injectedCss) {
	injectedCss = true;
	injectCss(css);
}
let maybeUnregisterGameSettings = [() => {}];
let ws;
const apps = {};
store.currentlyPlaying = "";
async function lookupApp(appId) {
	return (await http.get(`/oauth2/applications/${appId}/rpc`))?.body || "Unknown";
}
async function handleMessage(e) {
	const data = JSON.parse(e.data);
	const assets = data.activity?.assets;
	if (data.cmd) return handleCmd(data);
	if (assets?.large_image && data.activity?.application_id) assets.large_image = await fetchAssetIds(data.activity.application_id, assets.large_image);
	if (assets?.small_image && data.activity?.application_id) assets.small_image = await fetchAssetIds(data.activity.application_id, assets.small_image);
	if (data.activity) {
		const appId = data.activity.application_id;
		apps[appId] ||= await lookupApp(appId).catch(() => "Unknown");
		const app$1 = apps[appId];
		if (typeof app$1 !== "string") data.activity.name ||= app$1.name;
		store.currentlyPlaying = data.activity.name;
		if (!store.previouslyPlayed) store.previouslyPlayed = {};
		if (!(data.activity.name in store.previouslyPlayed)) store.previouslyPlayed[data.activity.name] = {};
		store.previouslyPlayed[data.activity.name].name = data.activity.name;
		store.previouslyPlayed[data.activity.name].appid = data.activity.application_id;
		store.previouslyPlayed[data.activity.name].lastPlayed = Date.now();
		store.previouslyPlayed[data.activity.name].local = data.activity.application_id === "1337";
	} else store.currentlyPlaying = "";
	if (store?.previouslyPlayed?.[data.activity?.name]?.hide) return;
	FluxDispatcher.dispatch({
		type: "LOCAL_ACTIVITY_UPDATE",
		...data
	});
}
const handleCmd = async (payload) => {
	switch (payload.cmd) {
		case "INVITE_BROWSER": {
			const code = payload.args.code;
			if (code === "") return;
			FluxDispatcher.dispatch({
				type: "INVITE_RESOLVE",
				code
			});
			const resp = await http.get(`/invites/${code}`);
			const invite = resp.body;
			if (resp.status !== 200) {
				FluxDispatcher.dispatch({
					type: "INVITE_RESOLVE_FAILED",
					code,
					...resp.body
				});
				return;
			}
			FluxDispatcher.dispatch({
				type: "INVITE_RESOLVE_SUCCESS",
				code,
				invite
			});
			FluxDispatcher.dispatch({
				type: "INVITE_MODAL_OPEN",
				context: "APP",
				code,
				invite
			});
			if (backend !== "None") invoke("ultrashow");
		}
	}
};
const retry = async (fn, times = 5, wait = 500) => {
	let result;
	for (let i = 0; i < times; i++) {
		result = await fn(i);
		if (result) return result;
		await new Promise((r) => setTimeout(r, wait));
	}
	return result;
};
const onLoad = async () => {
	if (ws && ws?.close) ws.close();
	const connected = await retry(async (curTry) => {
		ws = new WebSocket("ws://" + (store.connAddr || "127.0.0.1:1337"));
		ws.onmessage = handleMessage;
		ws.onerror = (e) => {
			throw e;
		};
		await new Promise((r) => setTimeout(r, 1e3));
		if (ws.readyState !== WebSocket.OPEN) {
			ws?.close?.();
			ws = null;
			showToast({
				title: "ShelteRPC",
				content: `Unable to connect to ShelteRPC server (${curTry})`,
				duration: store.retryWait ?? 3e3
			});
			return false;
		}
		return true;
	}, store.retryCount ?? 3, store.retryWait ?? 3e3);
	maybeUnregisterGameSettings = [
		registerSection("divider"),
		registerSection("header", "shelteRPC"),
		registerSection("section", "shelterpc", "Registered Games", RegisteredGames_default)
	];
	if (!connected) return;
	ws.onclose = () => {
		showToast({
			title: "ShelteRPC",
			content: "ShelteRPC server disconnected",
			duration: 3e3
		});
	};
	showToast({
		title: "ShelteRPC",
		content: "Connected to ShelteRPC server",
		duration: 3e3
	});
};
const onUnload = async () => {
	if (ws?.close) ws.close?.();
	if (maybeUnregisterGameSettings) maybeUnregisterGameSettings.forEach((section) => section());
};
const settings = () => [
	(0, import_web$6.createComponent)(Header, {
		get tag() {
			return HeaderTags.H1;
		},
		children: "Connection"
	}),
	(0, import_web$5.getNextElement)(_tmpl$),
	(() => {
		const _el$2 = (0, import_web$5.getNextElement)(_tmpl$2), _el$3 = _el$2.firstChild, [_el$4, _co$] = (0, import_web$3.getNextMarker)(_el$3.nextSibling), _el$5 = _el$4.nextSibling, [_el$6, _co$2] = (0, import_web$3.getNextMarker)(_el$5.nextSibling);
		(0, import_web$4.insert)(_el$2, (0, import_web$6.createComponent)(Text, { children: "Connection Retry Count" }), _el$4, _co$);
		(0, import_web$4.insert)(_el$2, (0, import_web$6.createComponent)(TextBox, {
			get value() {
				return store.retryCount ?? 3;
			},
			onInput: (v) => store.retryCount = v,
			type: "number"
		}), _el$6, _co$2);
		(0, import_web$2.effect)(() => (0, import_web$1.className)(_el$2, classes.container));
		return _el$2;
	})(),
	(() => {
		const _el$7 = (0, import_web$5.getNextElement)(_tmpl$2), _el$8 = _el$7.firstChild, [_el$9, _co$3] = (0, import_web$3.getNextMarker)(_el$8.nextSibling), _el$0 = _el$9.nextSibling, [_el$1, _co$4] = (0, import_web$3.getNextMarker)(_el$0.nextSibling);
		(0, import_web$4.insert)(_el$7, (0, import_web$6.createComponent)(Text, { children: "Connection Retry Wait (milliseconds)" }), _el$9, _co$3);
		(0, import_web$4.insert)(_el$7, (0, import_web$6.createComponent)(TextBox, {
			get value() {
				return store.retryWait ?? 3e3;
			},
			onInput: (v) => store.retryWait = v,
			type: "number"
		}), _el$1, _co$4);
		(0, import_web$2.effect)(() => (0, import_web$1.className)(_el$7, classes.container));
		return _el$7;
	})(),
	(() => {
		const _el$10 = (0, import_web$5.getNextElement)(_tmpl$2), _el$11 = _el$10.firstChild, [_el$12, _co$5] = (0, import_web$3.getNextMarker)(_el$11.nextSibling), _el$13 = _el$12.nextSibling, [_el$14, _co$6] = (0, import_web$3.getNextMarker)(_el$13.nextSibling);
		(0, import_web$4.insert)(_el$10, (0, import_web$6.createComponent)(Text, { children: "Connection Address" }), _el$12, _co$5);
		(0, import_web$4.insert)(_el$10, (0, import_web$6.createComponent)(TextBox, {
			get value() {
				return store.connAddr ?? "127.0.0.1:1337";
			},
			onInput: (v) => {
				store.connAddr = v;
				onLoad();
			},
			type: "text"
		}), _el$14, _co$6);
		(0, import_web$2.effect)(() => (0, import_web$1.className)(_el$10, classes.container));
		return _el$10;
	})()
];

//#endregion
exports.onLoad = onLoad
exports.onUnload = onUnload
exports.settings = settings
return exports;
})({});