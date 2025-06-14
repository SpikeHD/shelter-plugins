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
//#region solid-js/web
var require_web = __commonJS({ "solid-js/web"(exports, module) {
	module.exports = shelter.solidWeb;
} });

//#endregion
//#region components/Dropdown.tsx.scss
const classes$2 = {
	"dsarrow": "sqVpyW_dsarrow",
	"dcontainer": "sqVpyW_dcontainer",
	"ddownplaceholder": "sqVpyW_ddownplaceholder",
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
var import_web$27 = __toESM(require_web(), 1);
var import_web$28 = __toESM(require_web(), 1);
var import_web$29 = __toESM(require_web(), 1);
var import_web$30 = __toESM(require_web(), 1);
const _tmpl$$3 = /*#__PURE__*/ (0, import_web$27.template)(`<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>`, 4);
const SelectArrow = (props) => (() => {
	const _el$ = (0, import_web$30.getNextElement)(_tmpl$$3);
	(0, import_web$29.effect)(() => (0, import_web$28.setAttribute)(_el$, "class", props.class));
	return _el$;
})();

//#endregion
//#region components/Dropdown.tsx
var import_web$17 = __toESM(require_web(), 1);
var import_web$18 = __toESM(require_web(), 1);
var import_web$19 = __toESM(require_web(), 1);
var import_web$20 = __toESM(require_web(), 1);
var import_web$21 = __toESM(require_web(), 1);
var import_web$22 = __toESM(require_web(), 1);
var import_web$23 = __toESM(require_web(), 1);
var import_web$24 = __toESM(require_web(), 1);
var import_web$25 = __toESM(require_web(), 1);
var import_web$26 = __toESM(require_web(), 1);
const _tmpl$$2 = /*#__PURE__*/ (0, import_web$17.template)(`<div><select><!#><!/><!#><!/></select><!#><!/></div>`, 10), _tmpl$2$2 = /*#__PURE__*/ (0, import_web$17.template)(`<option value=""></option>`, 2), _tmpl$3$1 = /*#__PURE__*/ (0, import_web$17.template)(`<option></option>`, 2);
const { ui: { injectCss: injectCss$2 } } = shelter;
let injectedCss$2 = false;
const Dropdown = (props) => {
	if (!injectedCss$2) {
		injectedCss$2 = true;
		injectCss$2(css$2);
	}
	return (() => {
		const _el$ = (0, import_web$22.getNextElement)(_tmpl$$2), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, [_el$4, _co$] = (0, import_web$24.getNextMarker)(_el$3.nextSibling), _el$5 = _el$4.nextSibling, [_el$6, _co$2] = (0, import_web$24.getNextMarker)(_el$5.nextSibling), _el$7 = _el$2.nextSibling, [_el$8, _co$3] = (0, import_web$24.getNextMarker)(_el$7.nextSibling);
		_el$2.addEventListener("change", (e) => {
			props.onChange(e);
			if (props.immutable) {
				e.preventDefault();
				e.stopPropagation();
				e.target.value = props.value;
			}
		});
		(0, import_web$25.insert)(_el$2, (() => {
			const _c$ = (0, import_web$26.memo)(() => !!props.placeholder);
			return () => _c$() && (() => {
				const _el$9 = (0, import_web$22.getNextElement)(_tmpl$2$2);
				(0, import_web$25.insert)(_el$9, () => props.placeholder);
				(0, import_web$21.effect)((_p$) => {
					const _v$8 = classes$2.ddownplaceholder, _v$9 = props.value === "";
					_v$8 !== _p$._v$8 && (0, import_web$20.className)(_el$9, _p$._v$8 = _v$8);
					_v$9 !== _p$._v$9 && (_el$9.selected = _p$._v$9 = _v$9);
					return _p$;
				}, {
					_v$8: undefined,
					_v$9: undefined
				});
				return _el$9;
			})();
		})(), _el$4, _co$);
		(0, import_web$25.insert)(_el$2, () => props.options?.map((o) => (() => {
			const _el$0 = (0, import_web$22.getNextElement)(_tmpl$3$1);
			(0, import_web$25.insert)(_el$0, () => o.label);
			(0, import_web$21.effect)(() => _el$0.selected = o.value === props.value);
			(0, import_web$21.effect)(() => _el$0.value = o.value);
			return _el$0;
		})()), _el$6, _co$2);
		(0, import_web$25.insert)(_el$, (0, import_web$23.createComponent)(SelectArrow, { get ["class"]() {
			return classes$2.dsarrow;
		} }), _el$8, _co$3);
		(0, import_web$21.effect)((_p$) => {
			const _v$ = classes$2.dcontainer, _v$2 = props.style, _v$3 = classes$2.ddown + " " + (props.placeholder && props.value === "" ? classes$2.ddownplaceholder : ""), _v$4 = props.placeholder, _v$5 = props.id, _v$6 = props["aria-label"], _v$7 = props.disabled;
			_v$ !== _p$._v$ && (0, import_web$20.className)(_el$, _p$._v$ = _v$);
			_p$._v$2 = (0, import_web$19.style)(_el$, _v$2, _p$._v$2);
			_v$3 !== _p$._v$3 && (0, import_web$20.className)(_el$2, _p$._v$3 = _v$3);
			_v$4 !== _p$._v$4 && (0, import_web$18.setAttribute)(_el$2, "placeholder", _p$._v$4 = _v$4);
			_v$5 !== _p$._v$5 && (0, import_web$18.setAttribute)(_el$2, "id", _p$._v$5 = _v$5);
			_v$6 !== _p$._v$6 && (0, import_web$18.setAttribute)(_el$2, "aria-label", _p$._v$6 = _v$6);
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
//#region util/debounce.ts
const debounce = (fn, delay) => {
	let timer = null;
	return (...args) => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(void 0, args);
		}, delay);
	};
};

//#endregion
//#region plugins/dorion-theme-browser/api.ts
const BASE = "https://betterdiscord.app";
const themeListEndpoint = async (options) => {
	const query = new URLSearchParams(options);
	query.set("type", "theme");
	query.set("pages", "1");
	query.set("sortDirection", "descending");
	query.set("tags", "[]");
	const resp = await fetch(`${BASE}/Addon/GetApprovedAddons?${query}`);
	if (!resp.ok) throw new Error("Failed to fetch themes");
	const parser = new DOMParser();
	const dom = parser.parseFromString(await resp.text(), "text/html");
	const themes = Array.from(dom.querySelectorAll(".card-wrap")).map((e) => ({
		thumbnail: `${BASE}${e.querySelector(".card-image")?.getAttribute("src")}`,
		name: e.querySelector(".card-title")?.textContent?.trim(),
		author: e.querySelector(".author-link")?.textContent?.trim(),
		description: e.querySelector(".card-description")?.textContent?.trim(),
		likes: e.querySelector("#addon-likes")?.textContent?.trim(),
		downloads: e.querySelector("#addon-downloads")?.textContent?.trim()
	}));
	return themes;
};

//#endregion
//#region plugins/dorion-theme-browser/components/ThemeCard.tsx.scss
const classes$1 = {
	"thumbnail": "JQAzuG_thumbnail",
	"contents": "JQAzuG_contents",
	"themeCard": "JQAzuG_themeCard",
	"installButton": "JQAzuG_installButton",
	"name": "JQAzuG_name",
	"info": "JQAzuG_info"
};
const css$1 = `.JQAzuG_themeCard {
  text-align: left;
  color: var(--text-primary);
  background: var(--background-secondary);
  border-radius: 8px;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  margin: 8px;
  padding: 0;
  display: flex;
}

.JQAzuG_themeCard .JQAzuG_thumbnail {
  background-position: center;
  background-size: cover;
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.JQAzuG_themeCard .JQAzuG_info {
  text-overflow: ellipsis;
  flex-direction: column;
  width: 100%;
  margin-top: 6px;
  padding: 16px;
  display: flex;
  overflow: hidden;
}

.JQAzuG_themeCard .JQAzuG_info .JQAzuG_name, .JQAzuG_themeCard .JQAzuG_info .JQAzuG_contents, .JQAzuG_themeCard .JQAzuG_info .JQAzuG_installButton {
  margin-bottom: 8px;
}

.JQAzuG_themeCard .JQAzuG_info .JQAzuG_installButton {
  width: 100%;
  margin-top: 8px;
}
`;

//#endregion
//#region plugins/dorion-theme-browser/components/ThemeCard.tsx
var import_web$9 = __toESM(require_web(), 1);
var import_web$10 = __toESM(require_web(), 1);
var import_web$11 = __toESM(require_web(), 1);
var import_web$12 = __toESM(require_web(), 1);
var import_web$13 = __toESM(require_web(), 1);
var import_web$14 = __toESM(require_web(), 1);
var import_web$15 = __toESM(require_web(), 1);
var import_web$16 = __toESM(require_web(), 1);
const _tmpl$$1 = /*#__PURE__*/ (0, import_web$9.template)(`<b></b>`, 2), _tmpl$2$1 = /*#__PURE__*/ (0, import_web$9.template)(`<div><div></div><div><!#><!/><!#><!/><div></div></div></div>`, 12);
const { ui: { injectCss: injectCss$1, Button, Text }, solid: { createSignal: createSignal$1, createEffect: createEffect$1 } } = shelter;
let injectedCss$1 = false;
function ThemeCard(props) {
	if (!injectedCss$1) {
		injectCss$1(css$1);
		injectedCss$1 = true;
	}
	const installTheme = () => {};
	return (() => {
		const _el$ = (0, import_web$15.getNextElement)(_tmpl$2$1), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$7 = _el$3.firstChild, [_el$8, _co$] = (0, import_web$13.getNextMarker)(_el$7.nextSibling), _el$9 = _el$8.nextSibling, [_el$0, _co$2] = (0, import_web$13.getNextMarker)(_el$9.nextSibling), _el$6 = _el$0.nextSibling;
		(0, import_web$16.insert)(_el$3, (0, import_web$14.createComponent)(Text, {
			get ["class"]() {
				return classes$1.name;
			},
			get children() {
				return [
					(() => {
						const _el$4 = (0, import_web$15.getNextElement)(_tmpl$$1);
						(0, import_web$16.insert)(_el$4, () => props.theme);
						return _el$4;
					})(),
					" by ",
					(() => {
						const _el$5 = (0, import_web$15.getNextElement)(_tmpl$$1);
						(0, import_web$16.insert)(_el$5, () => props.author);
						return _el$5;
					})()
				];
			}
		}), _el$8, _co$);
		(0, import_web$16.insert)(_el$3, (0, import_web$14.createComponent)(Text, {
			get ["class"]() {
				return classes$1.contents;
			},
			get children() {
				return props.description;
			}
		}), _el$0, _co$2);
		(0, import_web$16.insert)(_el$6, (0, import_web$14.createComponent)(Button, {
			get ["class"]() {
				return classes$1.installButton;
			},
			onClick: installTheme,
			children: "Install"
		}));
		(0, import_web$12.effect)((_p$) => {
			const _v$ = classes$1.themeCard, _v$2 = classes$1.thumbnail, _v$3 = `background-image: url(${props.thumbnail})`, _v$4 = classes$1.info, _v$5 = classes$1.buttonContainer;
			_v$ !== _p$._v$ && (0, import_web$11.className)(_el$, _p$._v$ = _v$);
			_v$2 !== _p$._v$2 && (0, import_web$11.className)(_el$2, _p$._v$2 = _v$2);
			_p$._v$3 = (0, import_web$10.style)(_el$2, _v$3, _p$._v$3);
			_v$4 !== _p$._v$4 && (0, import_web$11.className)(_el$3, _p$._v$4 = _v$4);
			_v$5 !== _p$._v$5 && (0, import_web$11.className)(_el$6, _p$._v$5 = _v$5);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined,
			_v$3: undefined,
			_v$4: undefined,
			_v$5: undefined
		});
		return _el$;
	})();
}

//#endregion
//#region plugins/dorion-theme-browser/components/ThemePage.tsx.scss
const classes = {
	"pagesOuter": "gqruia_pagesOuter",
	"sortSection": "gqruia_sortSection",
	"searchBox": "gqruia_searchBox",
	"bot16": "gqruia_bot16",
	"pageBtn": "gqruia_pageBtn",
	"pages": "gqruia_pages",
	"shead": "gqruia_shead",
	"themeCards": "gqruia_themeCards"
};
const css = `.gqruia_shead {
  margin-top: 16px;
  margin-bottom: 8px;
}

.gqruia_bot16 {
  margin-bottom: 16px;
}

.gqruia_themeCards {
  grid-gap: 8px;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  margin-top: 16px;
  display: grid;
}

.gqruia_sortSection {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.gqruia_searchBox {
  width: 50%;
  flex-grow: 0 !important;
}

.gqruia_pagesOuter {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
}

.gqruia_pages {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  margin-top: 16px;
  display: flex;
}

.gqruia_pageBtn {
  color: var(--text-normal);
  cursor: pointer;
}

.gqruia_pageBtn:hover {
  text-decoration: underline;
}

input[type="number"] {
  text-align: center;
  background-color: var(--input-background);
  width: 50px;
  color: var(--text-normal);
  -moz-appearance: textfield;
  appearance: textfield;
  border: none;
  border-radius: 4px;
  margin: 0 8px;
  padding: 4px;
  font-size: 16px;
}

input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
`;

//#endregion
//#region plugins/dorion-theme-browser/components/ThemePage.tsx
var import_web = __toESM(require_web(), 1);
var import_web$1 = __toESM(require_web(), 1);
var import_web$2 = __toESM(require_web(), 1);
var import_web$3 = __toESM(require_web(), 1);
var import_web$4 = __toESM(require_web(), 1);
var import_web$5 = __toESM(require_web(), 1);
var import_web$6 = __toESM(require_web(), 1);
var import_web$7 = __toESM(require_web(), 1);
var import_web$8 = __toESM(require_web(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web.template)(`<div><!#><!/><span></span></div>`, 6), _tmpl$2 = /*#__PURE__*/ (0, import_web.template)(`<div></div>`, 2), _tmpl$3 = /*#__PURE__*/ (0, import_web.template)(`<div><div><div>&lt; Previous</div><input type="number"><div>Next &gt;</div></div></div>`, 9);
const { ui: { injectCss, Divider, Header, HeaderTags, TextBox }, solid: { createSignal, createEffect } } = shelter;
let injectedCss = false;
function ThemePage() {
	if (!injectedCss) {
		injectCss(css);
		injectedCss = true;
	}
	const [themeData, setThemeData] = createSignal([]);
	const [page, setPage] = createSignal(1);
	const [sort, setSort] = createSignal("popular");
	const [search, setSearch] = createSignal("");
	createEffect(async () => {
		await loadThemes();
	});
	const loadThemes = async () => {
		setThemeData(await themeListEndpoint({
			page: page().toString(),
			sort: sort(),
			filter: search()
		}));
	};
	const doSearch = debounce((v) => setSearch(v), 500);
	return [
		(0, import_web$8.createComponent)(Header, {
			get tag() {
				return HeaderTags.H1;
			},
			get ["class"]() {
				return classes.tophead;
			},
			children: "Theme Browser"
		}),
		(() => {
			const _el$ = (0, import_web$5.getNextElement)(_tmpl$), _el$3 = _el$.firstChild, [_el$4, _co$] = (0, import_web$6.getNextMarker)(_el$3.nextSibling), _el$2 = _el$4.nextSibling;
			(0, import_web$7.insert)(_el$, (0, import_web$8.createComponent)(Dropdown, {
				get value() {
					return sort();
				},
				onChange: (e) => {
					setSort(e.target.value);
					loadThemes();
				},
				style: "width: 30%;",
				options: [
					{
						label: "Popular",
						value: "popular"
					},
					{
						label: "Creation Date",
						value: "creationdate"
					},
					{
						label: "Name",
						value: "name"
					},
					{
						label: "Likes",
						value: "likes"
					},
					{
						label: "Downloads",
						value: "downloads"
					},
					{
						label: "Recently Updated",
						value: "recentlyupdated"
					}
				],
				placeholder: "Sort by..."
			}), _el$4, _co$);
			(0, import_web$7.insert)(_el$2, (0, import_web$8.createComponent)(TextBox, {
				get value() {
					return search();
				},
				onInput: (v) => doSearch(v),
				placeholder: "Search..."
			}));
			(0, import_web$4.effect)((_p$) => {
				const _v$ = classes.sortSection, _v$2 = classes.searchBox;
				_v$ !== _p$._v$ && (0, import_web$3.className)(_el$, _p$._v$ = _v$);
				_v$2 !== _p$._v$2 && (0, import_web$3.className)(_el$2, _p$._v$2 = _v$2);
				return _p$;
			}, {
				_v$: undefined,
				_v$2: undefined
			});
			return _el$;
		})(),
		(0, import_web$8.createComponent)(Divider, {
			mt: 16,
			mb: 16
		}),
		(() => {
			const _el$5 = (0, import_web$5.getNextElement)(_tmpl$2);
			(0, import_web$7.insert)(_el$5, () => themeData().map((t) => (0, import_web$8.createComponent)(ThemeCard, {
				get key() {
					return t.name;
				},
				get thumbnail() {
					return t.thumbnail;
				},
				get likes() {
					return t.likes;
				},
				get downloads() {
					return t.downloads;
				},
				get theme() {
					return t.name;
				},
				get description() {
					return t.description;
				},
				get author() {
					return t.author;
				},
				get install_url() {
					return t.install_url;
				}
			})));
			(0, import_web$4.effect)(() => (0, import_web$3.className)(_el$5, classes.themeCards));
			return _el$5;
		})(),
		(() => {
			const _el$6 = (0, import_web$5.getNextElement)(_tmpl$3), _el$7 = _el$6.firstChild, _el$8 = _el$7.firstChild, _el$9 = _el$8.nextSibling, _el$0 = _el$9.nextSibling;
			_el$8.$$click = () => {
				setPage(page() - 1);
				loadThemes();
			};
			_el$9.$$input = (e) => setPage(parseInt(e.target.value));
			_el$0.$$click = () => {
				setPage(page() + 1);
				loadThemes();
			};
			(0, import_web$4.effect)((_p$) => {
				const _v$3 = classes.pagesOuter, _v$4 = classes.pages, _v$5 = classes.pageBtn, _v$6 = classes.pageBtn;
				_v$3 !== _p$._v$3 && (0, import_web$3.className)(_el$6, _p$._v$3 = _v$3);
				_v$4 !== _p$._v$4 && (0, import_web$3.className)(_el$7, _p$._v$4 = _v$4);
				_v$5 !== _p$._v$5 && (0, import_web$3.className)(_el$8, _p$._v$5 = _v$5);
				_v$6 !== _p$._v$6 && (0, import_web$3.className)(_el$0, _p$._v$6 = _v$6);
				return _p$;
			}, {
				_v$3: undefined,
				_v$4: undefined,
				_v$5: undefined,
				_v$6: undefined
			});
			(0, import_web$4.effect)(() => _el$9.value = page());
			(0, import_web$2.runHydrationEvents)();
			return _el$6;
		})()
	];
}
(0, import_web$1.delegateEvents)(["click", "input"]);

//#endregion
//#region plugins/dorion-theme-browser/index.ts
const { settings: { registerSection } } = shelter;
const uninjects = [
	registerSection("divider"),
	registerSection("header", "Theme Browser"),
	registerSection("section", `${appName}-theme-browser`, "Theme Browser", ThemePage)
];
const onUnload = () => {
	uninjects.forEach((u) => u());
};

//#endregion
exports.onUnload = onUnload
return exports;
})({});