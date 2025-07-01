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
let requiresRestart = false;
const backendRestartRequired = (v) => {
	requiresRestart = v;
};
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
//#region plugins/dorion-settings/pages/PerformancePage.tsx.scss
const classes$12 = {
	"tophead": "ZN8ggW_tophead",
	"pbuttons": "ZN8ggW_pbuttons",
	"stext": "ZN8ggW_stext",
	"shead": "ZN8ggW_shead"
};
const css$12 = `.ZN8ggW_tophead {
  margin-bottom: 16px;
}

.ZN8ggW_shead {
  margin-top: 16px;
  margin-bottom: 8px;
  font-weight: bold;
}

.ZN8ggW_stext {
  margin: 12px 0;
  font-size: 14px;
  color: var(--header-secondary) !important;
}

.ZN8ggW_pbuttons {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-top: 16px;
  display: flex;
}
`;

//#endregion
//#region components/Dropdown.tsx.scss
const classes$11 = {
	"ddown": "sqVpyW_ddown",
	"dcontainer": "sqVpyW_dcontainer",
	"dsarrow": "sqVpyW_dsarrow",
	"ddownplaceholder": "sqVpyW_ddownplaceholder"
};
const css$11 = `.sqVpyW_ddown {
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
var import_web$103 = __toESM(require_web(), 1);
var import_web$104 = __toESM(require_web(), 1);
var import_web$105 = __toESM(require_web(), 1);
var import_web$106 = __toESM(require_web(), 1);
const _tmpl$$14 = /*#__PURE__*/ (0, import_web$103.template)(`<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>`, 4);
const SelectArrow = (props) => (() => {
	const _el$ = (0, import_web$106.getNextElement)(_tmpl$$14);
	(0, import_web$105.effect)(() => (0, import_web$104.setAttribute)(_el$, "class", props.class));
	return _el$;
})();

//#endregion
//#region components/Dropdown.tsx
var import_web$93 = __toESM(require_web(), 1);
var import_web$94 = __toESM(require_web(), 1);
var import_web$95 = __toESM(require_web(), 1);
var import_web$96 = __toESM(require_web(), 1);
var import_web$97 = __toESM(require_web(), 1);
var import_web$98 = __toESM(require_web(), 1);
var import_web$99 = __toESM(require_web(), 1);
var import_web$100 = __toESM(require_web(), 1);
var import_web$101 = __toESM(require_web(), 1);
var import_web$102 = __toESM(require_web(), 1);
const _tmpl$$13 = /*#__PURE__*/ (0, import_web$93.template)(`<div><select><!#><!/><!#><!/></select><!#><!/></div>`, 10), _tmpl$2$6 = /*#__PURE__*/ (0, import_web$93.template)(`<option value=""></option>`, 2), _tmpl$3$5 = /*#__PURE__*/ (0, import_web$93.template)(`<option></option>`, 2);
const { ui: { injectCss: injectCss$13 } } = shelter;
let injectedCss$13 = false;
const Dropdown = (props) => {
	if (!injectedCss$13) {
		injectedCss$13 = true;
		injectCss$13(css$11);
	}
	return (() => {
		const _el$ = (0, import_web$98.getNextElement)(_tmpl$$13), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, [_el$4, _co$] = (0, import_web$100.getNextMarker)(_el$3.nextSibling), _el$5 = _el$4.nextSibling, [_el$6, _co$2] = (0, import_web$100.getNextMarker)(_el$5.nextSibling), _el$7 = _el$2.nextSibling, [_el$8, _co$3] = (0, import_web$100.getNextMarker)(_el$7.nextSibling);
		_el$2.addEventListener("change", (e) => {
			props.onChange(e);
			if (props.immutable) {
				e.preventDefault();
				e.stopPropagation();
				e.target.value = props.value;
			}
		});
		(0, import_web$101.insert)(_el$2, (() => {
			const _c$ = (0, import_web$102.memo)(() => !!props.placeholder);
			return () => _c$() && (() => {
				const _el$9 = (0, import_web$98.getNextElement)(_tmpl$2$6);
				(0, import_web$101.insert)(_el$9, () => props.placeholder);
				(0, import_web$97.effect)((_p$) => {
					const _v$8 = classes$11.ddownplaceholder, _v$9 = props.value === "";
					_v$8 !== _p$._v$8 && (0, import_web$96.className)(_el$9, _p$._v$8 = _v$8);
					_v$9 !== _p$._v$9 && (_el$9.selected = _p$._v$9 = _v$9);
					return _p$;
				}, {
					_v$8: undefined,
					_v$9: undefined
				});
				return _el$9;
			})();
		})(), _el$4, _co$);
		(0, import_web$101.insert)(_el$2, () => props.options?.map((o) => (() => {
			const _el$0 = (0, import_web$98.getNextElement)(_tmpl$3$5);
			(0, import_web$101.insert)(_el$0, () => o.label);
			(0, import_web$97.effect)(() => _el$0.selected = o.value === props.value);
			(0, import_web$97.effect)(() => _el$0.value = o.value);
			return _el$0;
		})()), _el$6, _co$2);
		(0, import_web$101.insert)(_el$, (0, import_web$99.createComponent)(SelectArrow, { get ["class"]() {
			return classes$11.dsarrow;
		} }), _el$8, _co$3);
		(0, import_web$97.effect)((_p$) => {
			const _v$ = classes$11.dcontainer, _v$2 = props.style, _v$3 = classes$11.ddown + " " + (props.placeholder && props.value === "" ? classes$11.ddownplaceholder : ""), _v$4 = props.placeholder, _v$5 = props.id, _v$6 = props["aria-label"], _v$7 = props.disabled;
			_v$ !== _p$._v$ && (0, import_web$96.className)(_el$, _p$._v$ = _v$);
			_p$._v$2 = (0, import_web$95.style)(_el$, _v$2, _p$._v$2);
			_v$3 !== _p$._v$3 && (0, import_web$96.className)(_el$2, _p$._v$3 = _v$3);
			_v$4 !== _p$._v$4 && (0, import_web$94.setAttribute)(_el$2, "placeholder", _p$._v$4 = _v$4);
			_v$5 !== _p$._v$5 && (0, import_web$94.setAttribute)(_el$2, "id", _p$._v$5 = _v$5);
			_v$6 !== _p$._v$6 && (0, import_web$94.setAttribute)(_el$2, "aria-label", _p$._v$6 = _v$6);
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
//#region components/Card.tsx.scss
const classes$10 = { "card": "iitjua_card" };
const css$10 = `.iitjua_card {
  border: 1px solid var(--background-tertiary);
  border-radius: 4px;
}
`;

//#endregion
//#region components/Card.tsx
var import_web$87 = __toESM(require_web(), 1);
var import_web$88 = __toESM(require_web(), 1);
var import_web$89 = __toESM(require_web(), 1);
var import_web$90 = __toESM(require_web(), 1);
var import_web$91 = __toESM(require_web(), 1);
var import_web$92 = __toESM(require_web(), 1);
const _tmpl$$12 = /*#__PURE__*/ (0, import_web$87.template)(`<div></div>`, 2);
const { ui: { injectCss: injectCss$12 } } = shelter;
let injectedCss$12 = false;
const Card = (props) => {
	if (!injectedCss$12) {
		injectedCss$12 = true;
		injectCss$12(css$10);
	}
	return (() => {
		const _el$ = (0, import_web$91.getNextElement)(_tmpl$$12);
		(0, import_web$92.insert)(_el$, () => props.children);
		(0, import_web$90.effect)((_p$) => {
			const _v$ = classes$10.card + ` ${props.class}`, _v$2 = props.style;
			_v$ !== _p$._v$ && (0, import_web$89.className)(_el$, _p$._v$ = _v$);
			_p$._v$2 = (0, import_web$88.style)(_el$, _v$2, _p$._v$2);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined
		});
		return _el$;
	})();
};

//#endregion
//#region plugins/dorion-settings/components/WarningCard.tsx.scss
const classes$9 = {
	"restartCard": "_3UjfSq_restartCard",
	"restartButton": "_3UjfSq_restartButton"
};
const css$9 = `._3UjfSq_restartCard {
  background-color: var(--info-warning-background);
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 16px;
  display: flex;
  border: 1px solid var(--status-warning) !important;
}

._3UjfSq_restartButton {
  margin-top: 8px;
  background-color: var(--status-warning) !important;
  width: 100% !important;
}
`;

//#endregion
//#region plugins/dorion-settings/components/WarningCard.tsx
var import_web$86 = __toESM(require_web(), 1);
const { ui: { injectCss: injectCss$11, Text: Text$6, Button: Button$6 } } = shelter;
let injectedCss$11 = false;
function WarningCard() {
	if (!injectedCss$11) {
		injectedCss$11 = true;
		injectCss$11(css$9);
	}
	return (0, import_web$86.createComponent)(Card, {
		style: { marginTop: "1rem" },
		get ["class"]() {
			return classes$9.restartCard;
		},
		get children() {
			return [(0, import_web$86.createComponent)(Text$6, { children: "One or more settings have been changed that require a restart to take effect." }), (0, import_web$86.createComponent)(Button$6, {
				onClick: () => process.relaunch(),
				get ["class"]() {
					return classes$9.restartButton;
				},
				grow: true,
				children: "Restart"
			})];
		}
	});
}

//#endregion
//#region plugins/dorion-settings/util/settings.ts
const defaultConfig = {
	theme: "none",
	themes: [],
	zoom: "1.0",
	client_type: "default",
	sys_tray: false,
	push_to_talk: false,
	push_to_talk_keys: ["RControl"],
	cache_css: false,
	use_native_titlebar: false,
	start_maximized: false,
	profile: "default",
	streamer_mode_detection: false,
	rpc_server: false,
	open_on_startup: false,
	startup_minimized: false,
	autoupdate: false,
	update_notify: true,
	desktop_notifications: false,
	auto_clear_cache: false,
	multi_instance: false,
	disable_hardware_accel: false,
	blur: "none",
	blur_css: true,
	client_mods: ["Shelter"],
	unread_badge: true
};

//#endregion
//#region plugins/dorion-settings/pages/PerformancePage.tsx
var import_web$78 = __toESM(require_web(), 1);
var import_web$79 = __toESM(require_web(), 1);
var import_web$80 = __toESM(require_web(), 1);
var import_web$81 = __toESM(require_web(), 1);
var import_web$82 = __toESM(require_web(), 1);
var import_web$83 = __toESM(require_web(), 1);
var import_web$84 = __toESM(require_web(), 1);
var import_web$85 = __toESM(require_web(), 1);
const _tmpl$$11 = /*#__PURE__*/ (0, import_web$78.template)(`<div>The blurring effect can be unreliable, semi-broken, and extremely slow, depending on what OS and version you are on. For more context, see <a href="https://github.com/tauri-apps/window-vibrancy#available-functions" target="_blank">the window-vibrancy crate</a>.</div>`, 4), _tmpl$2$5 = /*#__PURE__*/ (0, import_web$78.template)(`<div><!#><!/><!#><!/></div>`, 6), _tmpl$3$4 = /*#__PURE__*/ (0, import_web$78.template)(`<b>Requires the integrated RPC server and RPC process scanning to be enabled (found in the Rich Presence tab).</b>`, 2), _tmpl$4$2 = /*#__PURE__*/ (0, import_web$78.template)(`<p>I know the big bold <b>"DON'T DISABLE THIS"</b> text makes it really tempting to disable, but you shouldn't. <!#><!/> will have several vital systems removed, such as the <i>entire settings menu</i>.<br><br>This option is intended only for debugging, development, and for running old versions of <!#><!/> functionality on old versions of <!#><!/>. If you're not doing that, don't touch this.</p>`, 14), _tmpl$5$2 = /*#__PURE__*/ (0, import_web$78.template)(`<b>DO NOT DISABLE THIS OPTION.</b>`, 2);
const { ui: { injectCss: injectCss$10, openConfirmationModal, SwitchItem: SwitchItem$2, Button: Button$5, Header: Header$6, HeaderTags: HeaderTags$6, showToast: showToast$2 }, solid: { createSignal: createSignal$9, createEffect: createEffect$5 } } = shelter;
let injectedCss$10 = false;
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
function PerformancePage() {
	const [state, setState] = createSignal$9(defaultConfig);
	const [platform, setPlatform] = createSignal$9("");
	const [blurOptions, setBlurOptions] = createSignal$9([]);
	const [restartRequired, setRestartRequired] = createSignal$9(false);
	if (!injectedCss$10) {
		injectedCss$10 = true;
		injectCss$10(css$12);
	}
	const setSettings = (fn, requiresRestart$1) => {
		setState(fn(state()));
		invoke("write_config_file", { contents: JSON.stringify(fn(state())) });
		if (requiresRestart$1) {
			setRestartRequired(true);
			backendRestartRequired(true);
		}
	};
	createEffect$5(async () => {
		const settings = await invoke("read_config_file");
		const defaultConf = await invoke("default_config");
		try {
			const availableBlurs = await invoke("available_blurs");
			setBlurOptions(availableBlurs);
		} catch (e) {}
		try {
			const platform$1 = await invoke("get_platform");
			setPlatform(platform$1);
		} catch (e) {}
		try {
			setState(JSON.parse(settings));
		} catch (e) {
			setState(JSON.parse(defaultConf));
		}
		setRestartRequired(window?.__DORION_RESTART__ === true);
	});
	const clearCSSCache = async () => {
		await invoke("clear_css_cache");
		showToast$2({
			title: "CSS Cache Cleared",
			duration: 3e3
		});
	};
	const clearWebCache = () => {
		openConfirmationModal({
			body: () => `
      Clearing web cache will log you out and reset your settings, but can often help solve permission-based issues.
      \n\n
      Do you want to proceed?
      `,
			header: () => "Are you sure?",
			type: "neutral",
			confirmText: "Confirm"
		}).then(() => invoke("set_clear_cache"), () => {});
	};
	return [
		(0, import_web$85.createComponent)(Header$6, {
			get tag() {
				return HeaderTags$6.H1;
			},
			get ["class"]() {
				return classes$12.tophead;
			},
			children: "Performance Settings"
		}),
		(0, import_web$84.memo)((() => {
			const _c$ = (0, import_web$84.memo)(() => !!restartRequired());
			return () => _c$() && (0, import_web$85.createComponent)(WarningCard, {});
		})()),
		(0, import_web$85.createComponent)(Header$6, {
			get ["class"]() {
				return classes$12.shead;
			},
			children: "Cache"
		}),
		(0, import_web$85.createComponent)(SwitchItem$2, {
			get value() {
				return state().cache_css;
			},
			onChange: (v) => setSettings((settings) => ({
				...settings,
				cache_css: v
			}), true),
			note: "Save CSS to disk that would otherwise be loaded from the web, decreasing load times.",
			children: "Cache CSS"
		}),
		(0, import_web$85.createComponent)(SwitchItem$2, {
			get value() {
				return state().auto_clear_cache;
			},
			onChange: (v) => setSettings((settings) => ({
				...settings,
				auto_clear_cache: v
			}), true),
			get disabled() {
				return platform() !== "windows";
			},
			get tooltipNote() {
				return platform() !== "windows" && "This is only supported on Windows right now.";
			},
			note: `Clean out the web-based cache every time you close ${appName}. This is usually cached images, scripts, and other data, and it can build up!`,
			children: "Auto Clear Cache"
		}),
		(0, import_web$85.createComponent)(Header$6, {
			get ["class"]() {
				return classes$12.shead;
			},
			children: "Optional Features"
		}),
		(0, import_web$85.createComponent)(SwitchItem$2, {
			get value() {
				return state().win7_style_notifications;
			},
			onChange: (v) => setSettings((settings) => ({
				...settings,
				win7_style_notifications: v
			}), true),
			note: "Use the alternative notification style used on Windows 7. This is only supported on Windows.",
			get disabled() {
				return platform() !== "windows";
			},
			children: "Alternative Notification Style"
		}),
		(0, import_web$85.createComponent)(SwitchItem$2, {
			get value() {
				return state().streamer_mode_detection;
			},
			onChange: (v) => setSettings((settings) => ({
				...settings,
				streamer_mode_detection: v
			}), false),
			get note() {
				return ["Detect OBS and Streamlabs OBS and automatically enable streamer mode when they are running. ", (0, import_web$83.getNextElement)(_tmpl$3$4)];
			},
			get disabled() {
				return !state().rpc_server;
			},
			children: "Streamer Mode detection"
		}),
		(0, import_web$85.createComponent)(SwitchItem$2, {
			get value() {
				return state().disable_hardware_accel;
			},
			onChange: (v) => setSettings((settings) => ({
				...settings,
				disable_hardware_accel: v
			}), true),
			note: "Disable hardware acceleration, which may cause issues on some systems. Disabling this can also cause performance issues on some systems. Unsupported on macOS.",
			get disabled() {
				return platform() === "macos";
			},
			children: "Disable Hardware Acceleration"
		}),
		(0, import_web$85.createComponent)(SwitchItem$2, {
			get value() {
				return state().client_plugins || state().client_plugins === null || state().client_plugins === undefined;
			},
			onChange: (v) => {
				if (!state().client_plugins && v) {
					setSettings((settings) => ({
						...settings,
						client_plugins: v
					}), true);
					return;
				}
				openConfirmationModal({
					body: () => (() => {
						const _el$8 = (0, import_web$83.getNextElement)(_tmpl$4$2), _el$9 = _el$8.firstChild, _el$0 = _el$9.nextSibling, _el$1 = _el$0.nextSibling, _el$18 = _el$1.nextSibling, [_el$19, _co$3] = (0, import_web$79.getNextMarker)(_el$18.nextSibling), _el$10 = _el$19.nextSibling, _el$11 = _el$10.nextSibling, _el$12 = _el$11.nextSibling, _el$13 = _el$12.nextSibling, _el$14 = _el$13.nextSibling, _el$15 = _el$14.nextSibling, _el$20 = _el$15.nextSibling, [_el$21, _co$4] = (0, import_web$79.getNextMarker)(_el$20.nextSibling), _el$16 = _el$21.nextSibling, _el$22 = _el$16.nextSibling, [_el$23, _co$5] = (0, import_web$79.getNextMarker)(_el$22.nextSibling), _el$17 = _el$23.nextSibling;
						(0, import_web$80.insert)(_el$8, appName, _el$19, _co$3);
						(0, import_web$80.insert)(_el$8, appName, _el$21, _co$4);
						(0, import_web$80.insert)(_el$8, appName, _el$23, _co$5);
						return _el$8;
					})(),
					header: () => "Are you ABSOLUTELY sure?",
					type: "neutral",
					confirmText: "Confirm"
				}).then(() => setSettings((settings) => ({
					...settings,
					client_plugins: v
				}), true), () => {});
			},
			get note() {
				return [(0, import_web$83.getNextElement)(_tmpl$5$2), " If you do, vital functionality will be lost. Only touch this if you know what you're doing."];
			},
			children: "Enable Dorion Plugins"
		}),
		(0, import_web$85.createComponent)(Header$6, {
			get ["class"]() {
				return classes$12.shead;
			},
			children: "Blur"
		}),
		(0, import_web$85.createComponent)(Dropdown, {
			get value() {
				return state().blur;
			},
			get selected() {
				return state().blur;
			},
			onChange: (e) => setSettings((settings) => ({
				...settings,
				blur: e.target.value
			}), true),
			get options() {
				return blurOptions().map((b) => ({
					label: capitalize(b),
					value: b
				}));
			},
			get disabled() {
				return platform() === "linux";
			}
		}),
		(() => {
			const _el$ = (0, import_web$83.getNextElement)(_tmpl$$11);
			(0, import_web$82.effect)(() => (0, import_web$81.className)(_el$, classes$12.stext));
			return _el$;
		})(),
		(0, import_web$85.createComponent)(SwitchItem$2, {
			get value() {
				return state().blur_css;
			},
			onChange: (v) => setSettings((settings) => ({
				...settings,
				blur_css: v
			}), true),
			note: "Enable this if you are not using a theme designed to take advantage of transparent windows.",
			get disabled() {
				return platform() === "linux" || state().blur === "none";
			},
			children: "Enable builtin background transparency CSS"
		}),
		(() => {
			const _el$2 = (0, import_web$83.getNextElement)(_tmpl$2$5), _el$3 = _el$2.firstChild, [_el$4, _co$] = (0, import_web$79.getNextMarker)(_el$3.nextSibling), _el$5 = _el$4.nextSibling, [_el$6, _co$2] = (0, import_web$79.getNextMarker)(_el$5.nextSibling);
			(0, import_web$80.insert)(_el$2, (0, import_web$85.createComponent)(Button$5, {
				onClick: clearWebCache,
				style: {
					width: "100%",
					padding: "18px"
				},
				grow: true,
				children: "Wipe all web-based data"
			}), _el$4, _co$);
			(0, import_web$80.insert)(_el$2, (0, import_web$85.createComponent)(Button$5, {
				onClick: clearCSSCache,
				style: {
					width: "100%",
					padding: "18px"
				},
				grow: true,
				children: "Clear CSS Cache"
			}), _el$6, _co$2);
			(0, import_web$82.effect)(() => (0, import_web$81.className)(_el$2, classes$12.pbuttons));
			return _el$2;
		})()
	];
}

//#endregion
//#region plugins/dorion-settings/pages/ProfilesPage.tsx.scss
const classes$8 = {
	"pbuttons": "_2nPZKq_pbuttons",
	"sbutton": "_2nPZKq_sbutton",
	"shead": "_2nPZKq_shead",
	"splitbutton": "_2nPZKq_splitbutton",
	"tophead": "_2nPZKq_tophead"
};
const css$8 = `._2nPZKq_tophead {
  margin-bottom: 16px;
}

._2nPZKq_shead {
  margin-top: 16px;
  margin-bottom: 8px;
  font-weight: bold;
}

._2nPZKq_sbutton {
  width: 100%;
  margin-top: 16px;
  padding: 18px;
}

._2nPZKq_splitbutton {
  width: 100%;
}

._2nPZKq_pbuttons {
  gap: 16px;
  margin-top: 16px;
  display: flex;
}

._2nPZKq_pbuttons button {
  width: 100% !important;
}
`;

//#endregion
//#region plugins/dorion-settings/pages/ProfilesPage.tsx
var import_web$71 = __toESM(require_web(), 1);
var import_web$72 = __toESM(require_web(), 1);
var import_web$73 = __toESM(require_web(), 1);
var import_web$74 = __toESM(require_web(), 1);
var import_web$75 = __toESM(require_web(), 1);
var import_web$76 = __toESM(require_web(), 1);
var import_web$77 = __toESM(require_web(), 1);
const _tmpl$$10 = /*#__PURE__*/ (0, import_web$71.template)(`<div><!#><!/><!#><!/></div>`, 6);
const { ui: { Header: Header$5, Button: Button$4, HeaderTags: HeaderTags$5, TextBox: TextBox$1, injectCss: injectCss$9, Divider: Divider$1, ButtonColors: ButtonColors$1, ButtonSizes: ButtonSizes$3 }, solid: { createSignal: createSignal$8, createEffect: createEffect$4 } } = shelter;
let injectedCss$9 = false;
function ProfilesPage() {
	const [profileList, setProfileList] = createSignal$8([]);
	const [profile, setProfile] = createSignal$8("");
	const [internalProfile, setInternalProfile] = createSignal$8("");
	const [newProfile, setNewProfile] = createSignal$8("");
	if (!injectedCss$9) {
		injectedCss$9 = true;
		injectCss$9(css$8);
	}
	createEffect$4(async () => {
		const profiles = await invoke("get_profile_list");
		setProfileList(profiles);
		const config = JSON.parse(await invoke("read_config_file"));
		setProfile(config.profile || "default");
		setInternalProfile(config.profile || "default");
	});
	const saveProfile = async () => {
		const config = JSON.parse(await invoke("read_config_file"));
		config.profile = profile();
		await invoke("write_config_file", { contents: JSON.stringify(config) });
		process.relaunch();
	};
	const deleteProfile = async () => {
		await invoke("delete_profile", { name: profile() });
		setProfileList(profileList().filter((p) => p !== profile()));
		setProfile(internalProfile());
	};
	const createProfile = async () => {
		await invoke("create_profile", { name: newProfile() });
		if (!profileList().includes(newProfile())) setProfileList([...profileList(), newProfile()]);
		setProfile(newProfile());
	};
	const handleNewProfileChange = (value) => {
		setNewProfile(value);
	};
	return [
		(0, import_web$77.createComponent)(Header$5, {
			get tag() {
				return HeaderTags$5.H1;
			},
			get ["class"]() {
				return classes$8.tophead;
			},
			children: "Profiles"
		}),
		(0, import_web$77.createComponent)(Dropdown, {
			get options() {
				return profileList().map((p) => {
					return {
						label: p,
						value: p
					};
				});
			},
			placeholder: "Select profile...",
			maxVisibleItems: 5,
			closeOnSelect: true,
			onChange: (e) => setProfile(e.target.value),
			get selected() {
				return profile();
			}
		}),
		(0, import_web$77.createComponent)(Header$5, {
			get ["class"]() {
				return classes$8.shead;
			},
			children: "Create Profile"
		}),
		(0, import_web$77.createComponent)(TextBox$1, {
			type: "text",
			get value() {
				return newProfile();
			},
			onInput: handleNewProfileChange,
			placeholder: "Enter a name for the new profile..."
		}),
		(0, import_web$77.createComponent)(Button$4, {
			onClick: createProfile,
			get ["class"]() {
				return classes$8.sbutton;
			},
			get disabled() {
				return newProfile() === "" || profileList().includes(newProfile());
			},
			children: "Create Profile"
		}),
		(0, import_web$77.createComponent)(Divider$1, {
			mt: 16,
			mb: 16
		}),
		(() => {
			const _el$ = (0, import_web$74.getNextElement)(_tmpl$$10), _el$2 = _el$.firstChild, [_el$3, _co$] = (0, import_web$75.getNextMarker)(_el$2.nextSibling), _el$4 = _el$3.nextSibling, [_el$5, _co$2] = (0, import_web$75.getNextMarker)(_el$4.nextSibling);
			(0, import_web$76.insert)(_el$, (0, import_web$77.createComponent)(Button$4, {
				onClick: saveProfile,
				get size() {
					return ButtonSizes$3.MEDIUM;
				},
				children: "Save and Restart"
			}), _el$3, _co$);
			(0, import_web$76.insert)(_el$, (0, import_web$77.createComponent)(Button$4, {
				onClick: deleteProfile,
				get disabled() {
					return profile() === "default" || internalProfile() === profile;
				},
				get color() {
					return ButtonColors$1.RED;
				},
				get size() {
					return ButtonSizes$3.MEDIUM;
				},
				children: "Delete Selected Profile"
			}), _el$5, _co$2);
			(0, import_web$73.effect)(() => (0, import_web$72.className)(_el$, classes$8.pbuttons));
			return _el$;
		})()
	];
}

//#endregion
//#region plugins/dorion-settings/pages/SettingsPage.tsx.scss
const classes$7 = {
	"tophead": "akYvUa_tophead",
	"shead": "akYvUa_shead",
	"left16": "akYvUa_left16"
};
const css$7 = `.akYvUa_tophead {
  margin-bottom: 16px;
}

.akYvUa_shead {
  margin-top: 16px;
  margin-bottom: 8px;
  font-weight: bold;
}

.akYvUa_left16 {
  margin-left: 16px;
}
`;

//#endregion
//#region components/Radio.tsx.scss
const classes$6 = {
	"selected": "Ch7osa_selected",
	"radioButton": "Ch7osa_radioButton",
	"radio": "Ch7osa_radio",
	"radioButtonInner": "Ch7osa_radioButtonInner"
};
const css$6 = `.Ch7osa_radio {
  color: var(--interactive-normal);
  box-sizing: border-box;
  grid-gap: 8px;
  background: var(--background-secondary);
  cursor: pointer;
  border-radius: 4px;
  grid-template-columns: auto 1fr;
  align-items: center;
  padding: 8px;
  display: grid;
}

.Ch7osa_radio:not(:last-child) {
  margin-bottom: 8px;
}

.Ch7osa_radio .Ch7osa_radioButton {
  border: 2px solid var(--interactive-normal);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin: 4px;
  position: relative;
}

.Ch7osa_radio .Ch7osa_radioButton .Ch7osa_radioButtonInner {
  background: var(--interactive-normal);
  border-radius: 50%;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.Ch7osa_radio:hover {
  background-color: var(--background-modifier-hover);
}

.Ch7osa_radio.Ch7osa_selected {
  color: var(--interactive-active);
  background-color: var(--background-modifier-selected);
}

.Ch7osa_radio.Ch7osa_selected .Ch7osa_radioButton {
  border-color: var(--interactive-active);
}

.Ch7osa_radio.Ch7osa_selected .Ch7osa_radioButton .Ch7osa_radioButtonInner {
  background: var(--interactive-active);
}
`;

//#endregion
//#region components/Radio.tsx
var import_web$61 = __toESM(require_web(), 1);
var import_web$62 = __toESM(require_web(), 1);
var import_web$63 = __toESM(require_web(), 1);
var import_web$64 = __toESM(require_web(), 1);
var import_web$65 = __toESM(require_web(), 1);
var import_web$66 = __toESM(require_web(), 1);
var import_web$67 = __toESM(require_web(), 1);
var import_web$68 = __toESM(require_web(), 1);
var import_web$69 = __toESM(require_web(), 1);
var import_web$70 = __toESM(require_web(), 1);
const _tmpl$$9 = /*#__PURE__*/ (0, import_web$61.template)(`<div><div></div><!#><!/></div>`, 6), _tmpl$2$4 = /*#__PURE__*/ (0, import_web$61.template)(`<div></div>`, 2);
const { ui: { injectCss: injectCss$8, Text: Text$5 } } = shelter;
let injectedCss$8 = false;
const Radio = (props) => {
	if (!injectedCss$8) {
		injectedCss$8 = true;
		injectCss$8(css$6);
	}
	const onRadioClick = () => {
		props.onClick(props.value);
	};
	return (() => {
		const _el$ = (0, import_web$65.getNextElement)(_tmpl$$9), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, [_el$4, _co$] = (0, import_web$67.getNextMarker)(_el$3.nextSibling);
		_el$.$$click = onRadioClick;
		(0, import_web$69.insert)(_el$2, (() => {
			const _c$ = (0, import_web$70.memo)(() => !!props.selected);
			return () => _c$() && (() => {
				const _el$5 = (0, import_web$65.getNextElement)(_tmpl$2$4);
				(0, import_web$64.effect)(() => (0, import_web$63.className)(_el$5, classes$6.radioButtonInner));
				return _el$5;
			})();
		})());
		(0, import_web$69.insert)(_el$, (0, import_web$68.createComponent)(Text$5, { get children() {
			return props.label;
		} }), _el$4, _co$);
		(0, import_web$64.effect)((_p$) => {
			const _v$ = classes$6.radio + (props.selected ? ` ${classes$6.selected}` : ""), _v$2 = classes$6.radioButton;
			_v$ !== _p$._v$ && (0, import_web$63.className)(_el$, _p$._v$ = _v$);
			_v$2 !== _p$._v$2 && (0, import_web$63.className)(_el$2, _p$._v$2 = _v$2);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined
		});
		(0, import_web$66.runHydrationEvents)();
		return _el$;
	})();
};
(0, import_web$62.delegateEvents)(["click"]);

//#endregion
//#region components/RadioGroup.tsx
var import_web$57 = __toESM(require_web(), 1);
var import_web$58 = __toESM(require_web(), 1);
var import_web$59 = __toESM(require_web(), 1);
var import_web$60 = __toESM(require_web(), 1);
const _tmpl$$8 = /*#__PURE__*/ (0, import_web$57.template)(`<div></div>`, 2);
const { ui: { injectCss: injectCss$7 } } = shelter;
let injectedCss$7 = false;
const RadioGroup = (props) => {
	if (!injectedCss$7) {
		injectedCss$7 = true;
		injectCss$7(css$6);
	}
	return (() => {
		const _el$ = (0, import_web$59.getNextElement)(_tmpl$$8);
		(0, import_web$60.insert)(_el$, () => props.options.map((o) => (0, import_web$58.createComponent)(Radio, {
			get ["class"]() {
				return classes$6.radioGroupItem;
			},
			get label() {
				return o.label;
			},
			get value() {
				return o.value;
			},
			get onClick() {
				return props.onChange;
			},
			get selected() {
				return props.selected === o.value;
			}
		})));
		return _el$;
	})();
};

//#endregion
//#region plugins/dorion-settings/pages/SettingsPage.tsx
var import_web$53 = __toESM(require_web(), 1);
var import_web$54 = __toESM(require_web(), 1);
var import_web$55 = __toESM(require_web(), 1);
var import_web$56 = __toESM(require_web(), 1);
const _tmpl$$7 = /*#__PURE__*/ (0, import_web$53.template)(`<a href="https://github.com/SpikeHD/shelter-plugins" target="_blank">SpikeHD/shelter-plugins</a>`, 2);
const { ui: { SwitchItem: SwitchItem$1, Header: Header$4, HeaderTags: HeaderTags$4, Slider, injectCss: injectCss$6 }, solid: { createSignal: createSignal$7, createEffect: createEffect$3 } } = shelter;
let injectedCss$6 = false;
function SettingsPage() {
	const [settings, setSettingsState] = createSignal$7(defaultConfig);
	const [restartRequired, setRestartRequired] = createSignal$7(false);
	if (!injectedCss$6) {
		injectedCss$6 = true;
		injectCss$6(css$7);
	}
	createEffect$3(async () => {
		setSettingsState(JSON.parse(await invoke("read_config_file")));
		setRestartRequired(window?.__DORION_RESTART__ === true);
	});
	const setSettings = (fn, requiresRestart$1) => {
		setSettingsState(fn(settings()));
		invoke("write_config_file", { contents: JSON.stringify(fn(settings())) });
		if (requiresRestart$1) {
			setRestartRequired(true);
			backendRestartRequired(true);
		}
	};
	return [
		(0, import_web$56.createComponent)(Header$4, {
			get tag() {
				return HeaderTags$4.H1;
			},
			get ["class"]() {
				return classes$7.tophead;
			},
			get children() {
				return [appName, " Settings"];
			}
		}),
		(0, import_web$55.memo)((() => {
			const _c$ = (0, import_web$55.memo)(() => !!restartRequired());
			return () => _c$() && (0, import_web$56.createComponent)(WarningCard, {});
		})()),
		(0, import_web$56.createComponent)(Header$4, {
			get ["class"]() {
				return classes$7.shead;
			},
			children: "Client Type"
		}),
		(0, import_web$56.createComponent)(RadioGroup, {
			options: [
				{
					label: "Default",
					value: "default"
				},
				{
					label: "PTB",
					value: "ptb"
				},
				{
					label: "Canary",
					value: "canary"
				}
			],
			onChange: (e) => {
				setSettings((p) => {
					return {
						...p,
						client_type: e
					};
				}, true);
			},
			get selected() {
				return settings().client_type;
			}
		}),
		(0, import_web$56.createComponent)(Header$4, {
			get ["class"]() {
				return classes$7.shead;
			},
			children: "Window"
		}),
		(0, import_web$56.createComponent)(Slider, {
			min: 50,
			max: 125,
			get steps() {
				return Array.from(Array(16).keys()).map((i) => i * 5 + 50 + "%");
			},
			step: 5,
			get value() {
				return parseFloat(settings().zoom) * 100;
			},
			onInput: (v) => {
				setSettings((p) => {
					return {
						...p,
						zoom: (parseFloat(v) / 100).toString()
					};
				});
				invoke("window_zoom_level", { value: parseFloat(v) / 100 });
			}
		}),
		(0, import_web$56.createComponent)(SwitchItem$1, {
			get value() {
				return settings().sys_tray;
			},
			onChange: (v) => {
				setSettings((p) => {
					return {
						...p,
						sys_tray: v
					};
				}, true);
			},
			note: `Instead of closing, ${appName} will run in the background and will be accessible via the system tray.`,
			children: "Minimize to System Tray"
		}),
		(0, import_web$56.createComponent)(SwitchItem$1, {
			get value() {
				return settings().start_maximized;
			},
			onChange: (v) => {
				setSettings((p) => {
					return {
						...p,
						start_maximized: v
					};
				});
			},
			children: "Start Maximized"
		}),
		(0, import_web$56.createComponent)(Header$4, {
			get ["class"]() {
				return classes$7.shead;
			},
			children: "Startup"
		}),
		(0, import_web$56.createComponent)(SwitchItem$1, {
			get value() {
				return settings().open_on_startup;
			},
			onChange: (v) => {
				setSettings((p) => {
					return {
						...p,
						open_on_startup: v,
						startup_minimized: v ? p.startup_minimized : false
					};
				});
			},
			note: `Open ${appName} when your system starts.`,
			children: "Open on Startup"
		}),
		(0, import_web$56.createComponent)(SwitchItem$1, {
			get value() {
				return settings().startup_minimized;
			},
			get disabled() {
				return !settings().open_on_startup;
			},
			onChange: (v) => {
				setSettings((p) => {
					return {
						...p,
						startup_minimized: v
					};
				});
			},
			note: "Open in the background when your system starts.",
			children: "Start Minimized"
		}),
		(0, import_web$56.createComponent)(Header$4, {
			get ["class"]() {
				return classes$7.shead;
			},
			children: "Misc."
		}),
		(0, import_web$56.createComponent)(SwitchItem$1, {
			get value() {
				return settings().multi_instance;
			},
			onChange: (v) => {
				setSettings((p) => {
					return {
						...p,
						multi_instance: v
					};
				}, true);
			},
			note: `Allow multiple instances of ${appName} to be running at the same time.`,
			children: "Allow Multiple Instances"
		}),
		(0, import_web$56.createComponent)(SwitchItem$1, {
			get value() {
				return settings().use_native_titlebar;
			},
			onChange: (v) => {
				setSettings((p) => {
					return {
						...p,
						use_native_titlebar: v
					};
				}, true);
			},
			note: "Disable the custom titlebar and use your systems native one instead.",
			children: "Use Native Titlebar"
		}),
		(0, import_web$56.createComponent)(Header$4, {
			get ["class"]() {
				return classes$7.shead;
			},
			children: "Updates"
		}),
		(0, import_web$56.createComponent)(SwitchItem$1, {
			get value() {
				return settings().autoupdate;
			},
			onChange: (v) => {
				setSettings((p) => {
					return {
						...p,
						autoupdate: v,
						update_notify: v ? p.update_notify : false
					};
				});
			},
			get note() {
				return [
					"Automatically update various ",
					appName,
					" components, such as",
					" ",
					(0, import_web$54.getNextElement)(_tmpl$$7),
					"."
				];
			},
			children: "Autoupdate"
		}),
		(0, import_web$56.createComponent)(SwitchItem$1, {
			get value() {
				return settings().update_notify === undefined || settings().update_notify;
			},
			onChange: (v) => {
				setSettings((p) => {
					return {
						...p,
						update_notify: v
					};
				});
			},
			get disabled() {
				return settings().autoupdate;
			},
			children: "Notify me of updates"
		})
	];
}

//#endregion
//#region plugins/dorion-settings/pages/ChangelogPage.tsx.scss
const classes$5 = {
	"badges": "yPVoxW_badges",
	"card": "yPVoxW_card",
	"tophead": "yPVoxW_tophead",
	"contents": "yPVoxW_contents",
	"spinner": "yPVoxW_spinner",
	"badge": "yPVoxW_badge",
	"title": "yPVoxW_title",
	"refresh": "yPVoxW_refresh",
	"spin": "yPVoxW_spin"
};
const css$5 = `.yPVoxW_tophead {
  margin-bottom: 16px;
}

.yPVoxW_refresh {
  position: absolute;
  top: 52px;
  right: 40px;
}

.yPVoxW_card {
  color: var(--text-primary);
  background: var(--background-secondary);
  border-radius: 8px;
  min-height: 82px;
  padding: 16px;
  position: relative;
}

.yPVoxW_card:not(:last-child) {
  margin-bottom: 16px;
}

.yPVoxW_card button {
  width: 100%;
  margin-top: 16px;
}

.yPVoxW_card .yPVoxW_title {
  margin-bottom: 8px;
  font-size: 1.5rem;
  font-weight: 500;
}

.yPVoxW_card .yPVoxW_badges {
  flex-direction: row;
  gap: 8px;
  display: flex;
  position: absolute;
  top: 16px;
  right: 16px;
}

.yPVoxW_card .yPVoxW_badges .yPVoxW_badge {
  background-color: var(--status-positive-background);
  border-radius: 3px;
  padding: 0 8px;
  font-size: .75rem;
}

.yPVoxW_card .yPVoxW_spinner, .yPVoxW_card .yPVoxW_contents img[src^="http"]:before, .yPVoxW_card .yPVoxW_contents img[src^="https"]:before {
  box-sizing: border-box;
  content: "";
  border: 10px solid #0000;
  border-top-color: var(--text-secondary);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: 1s linear infinite yPVoxW_spin;
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
}

.yPVoxW_card .yPVoxW_contents {
  margin-top: 16px;
}

.yPVoxW_card .yPVoxW_contents h1, .yPVoxW_card .yPVoxW_contents h2 {
  color: var(--header-primary);
  margin-bottom: 8px;
  font-weight: 500;
}

.yPVoxW_card .yPVoxW_contents h1:not(:first-child), .yPVoxW_card .yPVoxW_contents h2:not(:first-child) {
  margin-top: 24px;
}

.yPVoxW_card .yPVoxW_contents h1 {
  font-size: 1.25rem;
}

.yPVoxW_card .yPVoxW_contents h2 {
  font-size: 1rem;
}

.yPVoxW_card .yPVoxW_contents img {
  max-width: 100%;
  margin: 0 auto;
  display: block;
}

.yPVoxW_card .yPVoxW_contents img[src^="http"], .yPVoxW_card .yPVoxW_contents img[src^="https"] {
  color: var(--text-secondary);
  background: var(--background-tertiary);
  border-radius: 8px;
  height: 82px;
  margin-top: 8px;
  padding: 16px;
  font-size: .75rem;
  display: block;
  position: relative;
}

.yPVoxW_card .yPVoxW_contents p, .yPVoxW_card .yPVoxW_contents ul, .yPVoxW_card .yPVoxW_contents ol, .yPVoxW_card .yPVoxW_contents summary, .yPVoxW_card .yPVoxW_contents img {
  font-size: .875rem;
  line-height: 1.25rem;
}

.yPVoxW_card .yPVoxW_contents p:not(:last-child), .yPVoxW_card .yPVoxW_contents ul:not(:last-child), .yPVoxW_card .yPVoxW_contents ol:not(:last-child), .yPVoxW_card .yPVoxW_contents summary:not(:last-child), .yPVoxW_card .yPVoxW_contents img:not(:last-child) {
  margin-bottom: 6px;
}

.yPVoxW_card .yPVoxW_contents ul, .yPVoxW_card .yPVoxW_contents ol {
  padding-left: 32px;
}

.yPVoxW_card .yPVoxW_contents ul li, .yPVoxW_card .yPVoxW_contents ol li {
  list-style-type: initial;
}

@keyframes yPVoxW_spin {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
`;

//#endregion
//#region node_modules/.pnpm/marked@11.2.0/node_modules/marked/lib/marked.esm.js
/**
* marked v11.2.0 - a markdown parser
* Copyright (c) 2011-2024, Christopher Jeffrey. (MIT Licensed)
* https://github.com/markedjs/marked
*/
/**
* DO NOT EDIT THIS FILE
* The code in this file is generated from files in ./src/
*/
/**
* Gets the original marked default options.
*/
function _getDefaults() {
	return {
		async: false,
		breaks: false,
		extensions: null,
		gfm: true,
		hooks: null,
		pedantic: false,
		renderer: null,
		silent: false,
		tokenizer: null,
		walkTokens: null
	};
}
let _defaults = _getDefaults();
function changeDefaults(newDefaults) {
	_defaults = newDefaults;
}
/**
* Helpers
*/
const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, "g");
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
const escapeReplacements = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape$1(html$1, encode) {
	if (encode) {
		if (escapeTest.test(html$1)) return html$1.replace(escapeReplace, getEscapeReplacement);
	} else if (escapeTestNoEncode.test(html$1)) return html$1.replace(escapeReplaceNoEncode, getEscapeReplacement);
	return html$1;
}
const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
function unescape(html$1) {
	return html$1.replace(unescapeTest, (_, n) => {
		n = n.toLowerCase();
		if (n === "colon") return ":";
		if (n.charAt(0) === "#") return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
		return "";
	});
}
const caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
	let source = typeof regex === "string" ? regex : regex.source;
	opt = opt || "";
	const obj = {
		replace: (name, val) => {
			let valSource = typeof val === "string" ? val : val.source;
			valSource = valSource.replace(caret, "$1");
			source = source.replace(name, valSource);
			return obj;
		},
		getRegex: () => {
			return new RegExp(source, opt);
		}
	};
	return obj;
}
function cleanUrl(href) {
	try {
		href = encodeURI(href).replace(/%25/g, "%");
	} catch (e) {
		return null;
	}
	return href;
}
const noopTest = { exec: () => null };
function splitCells(tableRow, count) {
	const row = tableRow.replace(/\|/g, (match, offset, str) => {
		let escaped = false;
		let curr = offset;
		while (--curr >= 0 && str[curr] === "\\") escaped = !escaped;
		if (escaped) return "|";
else return " |";
	}), cells = row.split(/ \|/);
	let i = 0;
	if (!cells[0].trim()) cells.shift();
	if (cells.length > 0 && !cells[cells.length - 1].trim()) cells.pop();
	if (count) if (cells.length > count) cells.splice(count);
else while (cells.length < count) cells.push("");
	for (; i < cells.length; i++) cells[i] = cells[i].trim().replace(/\\\|/g, "|");
	return cells;
}
/**
* Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
* /c*$/ is vulnerable to REDOS.
*
* @param str
* @param c
* @param invert Remove suffix of non-c chars instead. Default falsey.
*/
function rtrim(str, c, invert) {
	const l = str.length;
	if (l === 0) return "";
	let suffLen = 0;
	while (suffLen < l) {
		const currChar = str.charAt(l - suffLen - 1);
		if (currChar === c && !invert) suffLen++;
else if (currChar !== c && invert) suffLen++;
else break;
	}
	return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
	if (str.indexOf(b[1]) === -1) return -1;
	let level = 0;
	for (let i = 0; i < str.length; i++) if (str[i] === "\\") i++;
else if (str[i] === b[0]) level++;
else if (str[i] === b[1]) {
		level--;
		if (level < 0) return i;
	}
	return -1;
}
function outputLink(cap, link$1, raw, lexer$1) {
	const href = link$1.href;
	const title = link$1.title ? escape$1(link$1.title) : null;
	const text = cap[1].replace(/\\([\[\]])/g, "$1");
	if (cap[0].charAt(0) !== "!") {
		lexer$1.state.inLink = true;
		const token = {
			type: "link",
			raw,
			href,
			title,
			text,
			tokens: lexer$1.inlineTokens(text)
		};
		lexer$1.state.inLink = false;
		return token;
	}
	return {
		type: "image",
		raw,
		href,
		title,
		text: escape$1(text)
	};
}
function indentCodeCompensation(raw, text) {
	const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
	if (matchIndentToCode === null) return text;
	const indentToCode = matchIndentToCode[1];
	return text.split("\n").map((node) => {
		const matchIndentInNode = node.match(/^\s+/);
		if (matchIndentInNode === null) return node;
		const [indentInNode] = matchIndentInNode;
		if (indentInNode.length >= indentToCode.length) return node.slice(indentToCode.length);
		return node;
	}).join("\n");
}
var _Tokenizer = class {
	options;
	rules;
	lexer;
	constructor(options$1) {
		this.options = options$1 || _defaults;
	}
	space(src) {
		const cap = this.rules.block.newline.exec(src);
		if (cap && cap[0].length > 0) return {
			type: "space",
			raw: cap[0]
		};
	}
	code(src) {
		const cap = this.rules.block.code.exec(src);
		if (cap) {
			const text = cap[0].replace(/^ {1,4}/gm, "");
			return {
				type: "code",
				raw: cap[0],
				codeBlockStyle: "indented",
				text: !this.options.pedantic ? rtrim(text, "\n") : text
			};
		}
	}
	fences(src) {
		const cap = this.rules.block.fences.exec(src);
		if (cap) {
			const raw = cap[0];
			const text = indentCodeCompensation(raw, cap[3] || "");
			return {
				type: "code",
				raw,
				lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
				text
			};
		}
	}
	heading(src) {
		const cap = this.rules.block.heading.exec(src);
		if (cap) {
			let text = cap[2].trim();
			if (/#$/.test(text)) {
				const trimmed = rtrim(text, "#");
				if (this.options.pedantic) text = trimmed.trim();
else if (!trimmed || / $/.test(trimmed)) text = trimmed.trim();
			}
			return {
				type: "heading",
				raw: cap[0],
				depth: cap[1].length,
				text,
				tokens: this.lexer.inline(text)
			};
		}
	}
	hr(src) {
		const cap = this.rules.block.hr.exec(src);
		if (cap) return {
			type: "hr",
			raw: cap[0]
		};
	}
	blockquote(src) {
		const cap = this.rules.block.blockquote.exec(src);
		if (cap) {
			const text = rtrim(cap[0].replace(/^ *>[ \t]?/gm, ""), "\n");
			const top = this.lexer.state.top;
			this.lexer.state.top = true;
			const tokens = this.lexer.blockTokens(text);
			this.lexer.state.top = top;
			return {
				type: "blockquote",
				raw: cap[0],
				tokens,
				text
			};
		}
	}
	list(src) {
		let cap = this.rules.block.list.exec(src);
		if (cap) {
			let bull = cap[1].trim();
			const isordered = bull.length > 1;
			const list$1 = {
				type: "list",
				raw: "",
				ordered: isordered,
				start: isordered ? +bull.slice(0, -1) : "",
				loose: false,
				items: []
			};
			bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
			if (this.options.pedantic) bull = isordered ? bull : "[*+-]";
			const itemRegex = new RegExp(`^( {0,3}${bull})((?:[\t ][^\\n]*)?(?:\\n|$))`);
			let raw = "";
			let itemContents = "";
			let endsWithBlankLine = false;
			while (src) {
				let endEarly = false;
				if (!(cap = itemRegex.exec(src))) break;
				if (this.rules.block.hr.test(src)) break;
				raw = cap[0];
				src = src.substring(raw.length);
				let line = cap[2].split("\n", 1)[0].replace(/^\t+/, (t) => " ".repeat(3 * t.length));
				let nextLine = src.split("\n", 1)[0];
				let indent = 0;
				if (this.options.pedantic) {
					indent = 2;
					itemContents = line.trimStart();
				} else {
					indent = cap[2].search(/[^ ]/);
					indent = indent > 4 ? 1 : indent;
					itemContents = line.slice(indent);
					indent += cap[1].length;
				}
				let blankLine = false;
				if (!line && /^ *$/.test(nextLine)) {
					raw += nextLine + "\n";
					src = src.substring(nextLine.length + 1);
					endEarly = true;
				}
				if (!endEarly) {
					const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`);
					const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
					const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
					const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
					while (src) {
						const rawLine = src.split("\n", 1)[0];
						nextLine = rawLine;
						if (this.options.pedantic) nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
						if (fencesBeginRegex.test(nextLine)) break;
						if (headingBeginRegex.test(nextLine)) break;
						if (nextBulletRegex.test(nextLine)) break;
						if (hrRegex.test(src)) break;
						if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) itemContents += "\n" + nextLine.slice(indent);
else {
							if (blankLine) break;
							if (line.search(/[^ ]/) >= 4) break;
							if (fencesBeginRegex.test(line)) break;
							if (headingBeginRegex.test(line)) break;
							if (hrRegex.test(line)) break;
							itemContents += "\n" + nextLine;
						}
						if (!blankLine && !nextLine.trim()) blankLine = true;
						raw += rawLine + "\n";
						src = src.substring(rawLine.length + 1);
						line = nextLine.slice(indent);
					}
				}
				if (!list$1.loose) {
					if (endsWithBlankLine) list$1.loose = true;
else if (/\n *\n *$/.test(raw)) endsWithBlankLine = true;
				}
				let istask = null;
				let ischecked;
				if (this.options.gfm) {
					istask = /^\[[ xX]\] /.exec(itemContents);
					if (istask) {
						ischecked = istask[0] !== "[ ] ";
						itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
					}
				}
				list$1.items.push({
					type: "list_item",
					raw,
					task: !!istask,
					checked: ischecked,
					loose: false,
					text: itemContents,
					tokens: []
				});
				list$1.raw += raw;
			}
			list$1.items[list$1.items.length - 1].raw = raw.trimEnd();
			list$1.items[list$1.items.length - 1].text = itemContents.trimEnd();
			list$1.raw = list$1.raw.trimEnd();
			for (let i = 0; i < list$1.items.length; i++) {
				this.lexer.state.top = false;
				list$1.items[i].tokens = this.lexer.blockTokens(list$1.items[i].text, []);
				if (!list$1.loose) {
					const spacers = list$1.items[i].tokens.filter((t) => t.type === "space");
					const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t) => /\n.*\n/.test(t.raw));
					list$1.loose = hasMultipleLineBreaks;
				}
			}
			if (list$1.loose) for (let i = 0; i < list$1.items.length; i++) list$1.items[i].loose = true;
			return list$1;
		}
	}
	html(src) {
		const cap = this.rules.block.html.exec(src);
		if (cap) {
			const token = {
				type: "html",
				block: true,
				raw: cap[0],
				pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
				text: cap[0]
			};
			return token;
		}
	}
	def(src) {
		const cap = this.rules.block.def.exec(src);
		if (cap) {
			const tag$1 = cap[1].toLowerCase().replace(/\s+/g, " ");
			const href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
			const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
			return {
				type: "def",
				tag: tag$1,
				raw: cap[0],
				href,
				title
			};
		}
	}
	table(src) {
		const cap = this.rules.block.table.exec(src);
		if (!cap) return;
		if (!/[:|]/.test(cap[2])) return;
		const headers = splitCells(cap[1]);
		const aligns = cap[2].replace(/^\||\| *$/g, "").split("|");
		const rows = cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : [];
		const item = {
			type: "table",
			raw: cap[0],
			header: [],
			align: [],
			rows: []
		};
		if (headers.length !== aligns.length) return;
		for (const align of aligns) if (/^ *-+: *$/.test(align)) item.align.push("right");
else if (/^ *:-+: *$/.test(align)) item.align.push("center");
else if (/^ *:-+ *$/.test(align)) item.align.push("left");
else item.align.push(null);
		for (const header of headers) item.header.push({
			text: header,
			tokens: this.lexer.inline(header)
		});
		for (const row of rows) item.rows.push(splitCells(row, item.header.length).map((cell) => {
			return {
				text: cell,
				tokens: this.lexer.inline(cell)
			};
		}));
		return item;
	}
	lheading(src) {
		const cap = this.rules.block.lheading.exec(src);
		if (cap) return {
			type: "heading",
			raw: cap[0],
			depth: cap[2].charAt(0) === "=" ? 1 : 2,
			text: cap[1],
			tokens: this.lexer.inline(cap[1])
		};
	}
	paragraph(src) {
		const cap = this.rules.block.paragraph.exec(src);
		if (cap) {
			const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
			return {
				type: "paragraph",
				raw: cap[0],
				text,
				tokens: this.lexer.inline(text)
			};
		}
	}
	text(src) {
		const cap = this.rules.block.text.exec(src);
		if (cap) return {
			type: "text",
			raw: cap[0],
			text: cap[0],
			tokens: this.lexer.inline(cap[0])
		};
	}
	escape(src) {
		const cap = this.rules.inline.escape.exec(src);
		if (cap) return {
			type: "escape",
			raw: cap[0],
			text: escape$1(cap[1])
		};
	}
	tag(src) {
		const cap = this.rules.inline.tag.exec(src);
		if (cap) {
			if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) this.lexer.state.inLink = true;
else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) this.lexer.state.inLink = false;
			if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) this.lexer.state.inRawBlock = true;
else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) this.lexer.state.inRawBlock = false;
			return {
				type: "html",
				raw: cap[0],
				inLink: this.lexer.state.inLink,
				inRawBlock: this.lexer.state.inRawBlock,
				block: false,
				text: cap[0]
			};
		}
	}
	link(src) {
		const cap = this.rules.inline.link.exec(src);
		if (cap) {
			const trimmedUrl = cap[2].trim();
			if (!this.options.pedantic && /^</.test(trimmedUrl)) {
				if (!/>$/.test(trimmedUrl)) return;
				const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
				if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) return;
			} else {
				const lastParenIndex = findClosingBracket(cap[2], "()");
				if (lastParenIndex > -1) {
					const start = cap[0].indexOf("!") === 0 ? 5 : 4;
					const linkLen = start + cap[1].length + lastParenIndex;
					cap[2] = cap[2].substring(0, lastParenIndex);
					cap[0] = cap[0].substring(0, linkLen).trim();
					cap[3] = "";
				}
			}
			let href = cap[2];
			let title = "";
			if (this.options.pedantic) {
				const link$1 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
				if (link$1) {
					href = link$1[1];
					title = link$1[3];
				}
			} else title = cap[3] ? cap[3].slice(1, -1) : "";
			href = href.trim();
			if (/^</.test(href)) if (this.options.pedantic && !/>$/.test(trimmedUrl)) href = href.slice(1);
else href = href.slice(1, -1);
			return outputLink(cap, {
				href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
				title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
			}, cap[0], this.lexer);
		}
	}
	reflink(src, links) {
		let cap;
		if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
			const linkString = (cap[2] || cap[1]).replace(/\s+/g, " ");
			const link$1 = links[linkString.toLowerCase()];
			if (!link$1) {
				const text = cap[0].charAt(0);
				return {
					type: "text",
					raw: text,
					text
				};
			}
			return outputLink(cap, link$1, cap[0], this.lexer);
		}
	}
	emStrong(src, maskedSrc, prevChar = "") {
		let match = this.rules.inline.emStrongLDelim.exec(src);
		if (!match) return;
		if (match[3] && prevChar.match(/[\p{L}\p{N}]/u)) return;
		const nextChar = match[1] || match[2] || "";
		if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
			const lLength = [...match[0]].length - 1;
			let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
			const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
			endReg.lastIndex = 0;
			maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
			while ((match = endReg.exec(maskedSrc)) != null) {
				rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
				if (!rDelim) continue;
				rLength = [...rDelim].length;
				if (match[3] || match[4]) {
					delimTotal += rLength;
					continue;
				} else if (match[5] || match[6]) {
					if (lLength % 3 && !((lLength + rLength) % 3)) {
						midDelimTotal += rLength;
						continue;
					}
				}
				delimTotal -= rLength;
				if (delimTotal > 0) continue;
				rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
				const lastCharLength = [...match[0]][0].length;
				const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
				if (Math.min(lLength, rLength) % 2) {
					const text$1 = raw.slice(1, -1);
					return {
						type: "em",
						raw,
						text: text$1,
						tokens: this.lexer.inlineTokens(text$1)
					};
				}
				const text = raw.slice(2, -2);
				return {
					type: "strong",
					raw,
					text,
					tokens: this.lexer.inlineTokens(text)
				};
			}
		}
	}
	codespan(src) {
		const cap = this.rules.inline.code.exec(src);
		if (cap) {
			let text = cap[2].replace(/\n/g, " ");
			const hasNonSpaceChars = /[^ ]/.test(text);
			const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
			if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) text = text.substring(1, text.length - 1);
			text = escape$1(text, true);
			return {
				type: "codespan",
				raw: cap[0],
				text
			};
		}
	}
	br(src) {
		const cap = this.rules.inline.br.exec(src);
		if (cap) return {
			type: "br",
			raw: cap[0]
		};
	}
	del(src) {
		const cap = this.rules.inline.del.exec(src);
		if (cap) return {
			type: "del",
			raw: cap[0],
			text: cap[2],
			tokens: this.lexer.inlineTokens(cap[2])
		};
	}
	autolink(src) {
		const cap = this.rules.inline.autolink.exec(src);
		if (cap) {
			let text, href;
			if (cap[2] === "@") {
				text = escape$1(cap[1]);
				href = "mailto:" + text;
			} else {
				text = escape$1(cap[1]);
				href = text;
			}
			return {
				type: "link",
				raw: cap[0],
				text,
				href,
				tokens: [{
					type: "text",
					raw: text,
					text
				}]
			};
		}
	}
	url(src) {
		let cap;
		if (cap = this.rules.inline.url.exec(src)) {
			let text, href;
			if (cap[2] === "@") {
				text = escape$1(cap[0]);
				href = "mailto:" + text;
			} else {
				let prevCapZero;
				do {
					prevCapZero = cap[0];
					cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? "";
				} while (prevCapZero !== cap[0]);
				text = escape$1(cap[0]);
				if (cap[1] === "www.") href = "http://" + cap[0];
else href = cap[0];
			}
			return {
				type: "link",
				raw: cap[0],
				text,
				href,
				tokens: [{
					type: "text",
					raw: text,
					text
				}]
			};
		}
	}
	inlineText(src) {
		const cap = this.rules.inline.text.exec(src);
		if (cap) {
			let text;
			if (this.lexer.state.inRawBlock) text = cap[0];
else text = escape$1(cap[0]);
			return {
				type: "text",
				raw: cap[0],
				text
			};
		}
	}
};
/**
* Block-Level Grammar
*/
const newline = /^(?: *(?:\n|$))+/;
const blockCode = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/;
const fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
const hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
const heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
const bullet = /(?:[*+-]|\d{1,9}[.)])/;
const lheading = edit(/^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, bullet).getRegex();
const _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
const blockText = /^[^\n]+/;
const _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
const def = edit(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
const list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
const _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
const _comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
const html = edit("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
const paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
const blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
/**
* Normal Block Grammar
*/
const blockNormal = {
	blockquote,
	code: blockCode,
	def,
	fences,
	heading,
	hr,
	html,
	lheading,
	list,
	newline,
	paragraph,
	table: noopTest,
	text: blockText
};
/**
* GFM Block Grammar
*/
const gfmTable = edit("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
const blockGfm = {
	...blockNormal,
	table: gfmTable,
	paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
};
/**
* Pedantic grammar (original John Gruber's loose markdown specification)
*/
const blockPedantic = {
	...blockNormal,
	html: edit("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: noopTest,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
};
/**
* Inline-Level Grammar
*/
const escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
const inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
const br = /^( {2,}|\\)\n(?!\s*$)/;
const inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
const _punctuation = "\\p{P}$+<=>`^|~";
const punctuation = edit(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, _punctuation).getRegex();
const blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
const emStrongLDelim = edit(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, _punctuation).getRegex();
const emStrongRDelimAst = edit("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, _punctuation).getRegex();
const emStrongRDelimUnd = edit("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, _punctuation).getRegex();
const anyPunctuation = edit(/\\([punct])/, "gu").replace(/punct/g, _punctuation).getRegex();
const autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
const _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
const tag = edit("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
const _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
const link = edit(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
const reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
const nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
const reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
/**
* Normal Inline Grammar
*/
const inlineNormal = {
	_backpedal: noopTest,
	anyPunctuation,
	autolink,
	blockSkip,
	br,
	code: inlineCode,
	del: noopTest,
	emStrongLDelim,
	emStrongRDelimAst,
	emStrongRDelimUnd,
	escape,
	link,
	nolink,
	punctuation,
	reflink,
	reflinkSearch,
	tag,
	text: inlineText,
	url: noopTest
};
/**
* Pedantic Inline Grammar
*/
const inlinePedantic = {
	...inlineNormal,
	link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
	reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
};
/**
* GFM Inline Grammar
*/
const inlineGfm = {
	...inlineNormal,
	escape: edit(escape).replace("])", "~|])").getRegex(),
	url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
	text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
/**
* GFM + Line Breaks Inline Grammar
*/
const inlineBreaks = {
	...inlineGfm,
	br: edit(br).replace("{2,}", "*").getRegex(),
	text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
/**
* exports
*/
const block = {
	normal: blockNormal,
	gfm: blockGfm,
	pedantic: blockPedantic
};
const inline = {
	normal: inlineNormal,
	gfm: inlineGfm,
	breaks: inlineBreaks,
	pedantic: inlinePedantic
};
var _Lexer = class _Lexer {
	tokens;
	options;
	state;
	tokenizer;
	inlineQueue;
	constructor(options$1) {
		this.tokens = [];
		this.tokens.links = Object.create(null);
		this.options = options$1 || _defaults;
		this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
		this.tokenizer = this.options.tokenizer;
		this.tokenizer.options = this.options;
		this.tokenizer.lexer = this;
		this.inlineQueue = [];
		this.state = {
			inLink: false,
			inRawBlock: false,
			top: true
		};
		const rules = {
			block: block.normal,
			inline: inline.normal
		};
		if (this.options.pedantic) {
			rules.block = block.pedantic;
			rules.inline = inline.pedantic;
		} else if (this.options.gfm) {
			rules.block = block.gfm;
			if (this.options.breaks) rules.inline = inline.breaks;
else rules.inline = inline.gfm;
		}
		this.tokenizer.rules = rules;
	}
	/**
	* Expose Rules
	*/
	static get rules() {
		return {
			block,
			inline
		};
	}
	/**
	* Static Lex Method
	*/
	static lex(src, options$1) {
		const lexer$1 = new _Lexer(options$1);
		return lexer$1.lex(src);
	}
	/**
	* Static Lex Inline Method
	*/
	static lexInline(src, options$1) {
		const lexer$1 = new _Lexer(options$1);
		return lexer$1.inlineTokens(src);
	}
	/**
	* Preprocessing
	*/
	lex(src) {
		src = src.replace(/\r\n|\r/g, "\n");
		this.blockTokens(src, this.tokens);
		for (let i = 0; i < this.inlineQueue.length; i++) {
			const next = this.inlineQueue[i];
			this.inlineTokens(next.src, next.tokens);
		}
		this.inlineQueue = [];
		return this.tokens;
	}
	blockTokens(src, tokens = []) {
		if (this.options.pedantic) src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
else src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
			return leading + "    ".repeat(tabs.length);
		});
		let token;
		let lastToken;
		let cutSrc;
		let lastParagraphClipped;
		while (src) {
			if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
				if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
					src = src.substring(token.raw.length);
					tokens.push(token);
					return true;
				}
				return false;
			})) continue;
			if (token = this.tokenizer.space(src)) {
				src = src.substring(token.raw.length);
				if (token.raw.length === 1 && tokens.length > 0) tokens[tokens.length - 1].raw += "\n";
else tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.code(src)) {
				src = src.substring(token.raw.length);
				lastToken = tokens[tokens.length - 1];
				if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
					lastToken.raw += "\n" + token.raw;
					lastToken.text += "\n" + token.text;
					this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
				} else tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.fences(src)) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.heading(src)) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.hr(src)) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.blockquote(src)) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.list(src)) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.html(src)) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.def(src)) {
				src = src.substring(token.raw.length);
				lastToken = tokens[tokens.length - 1];
				if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
					lastToken.raw += "\n" + token.raw;
					lastToken.text += "\n" + token.raw;
					this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
				} else if (!this.tokens.links[token.tag]) this.tokens.links[token.tag] = {
					href: token.href,
					title: token.title
				};
				continue;
			}
			if (token = this.tokenizer.table(src)) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.lheading(src)) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			cutSrc = src;
			if (this.options.extensions && this.options.extensions.startBlock) {
				let startIndex = Infinity;
				const tempSrc = src.slice(1);
				let tempStart;
				this.options.extensions.startBlock.forEach((getStartIndex) => {
					tempStart = getStartIndex.call({ lexer: this }, tempSrc);
					if (typeof tempStart === "number" && tempStart >= 0) startIndex = Math.min(startIndex, tempStart);
				});
				if (startIndex < Infinity && startIndex >= 0) cutSrc = src.substring(0, startIndex + 1);
			}
			if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
				lastToken = tokens[tokens.length - 1];
				if (lastParagraphClipped && lastToken.type === "paragraph") {
					lastToken.raw += "\n" + token.raw;
					lastToken.text += "\n" + token.text;
					this.inlineQueue.pop();
					this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
				} else tokens.push(token);
				lastParagraphClipped = cutSrc.length !== src.length;
				src = src.substring(token.raw.length);
				continue;
			}
			if (token = this.tokenizer.text(src)) {
				src = src.substring(token.raw.length);
				lastToken = tokens[tokens.length - 1];
				if (lastToken && lastToken.type === "text") {
					lastToken.raw += "\n" + token.raw;
					lastToken.text += "\n" + token.text;
					this.inlineQueue.pop();
					this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
				} else tokens.push(token);
				continue;
			}
			if (src) {
				const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
				if (this.options.silent) {
					console.error(errMsg);
					break;
				} else throw new Error(errMsg);
			}
		}
		this.state.top = true;
		return tokens;
	}
	inline(src, tokens = []) {
		this.inlineQueue.push({
			src,
			tokens
		});
		return tokens;
	}
	/**
	* Lexing/Compiling
	*/
	inlineTokens(src, tokens = []) {
		let token, lastToken, cutSrc;
		let maskedSrc = src;
		let match;
		let keepPrevChar, prevChar;
		if (this.tokens.links) {
			const links = Object.keys(this.tokens.links);
			if (links.length > 0) {
				while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
			}
		}
		while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
		while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
		while (src) {
			if (!keepPrevChar) prevChar = "";
			keepPrevChar = false;
			if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
				if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
					src = src.substring(token.raw.length);
					tokens.push(token);
					return true;
				}
				return false;
			})) continue;
			if (token = this.tokenizer.escape(src)) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.tag(src)) {
				src = src.substring(token.raw.length);
				lastToken = tokens[tokens.length - 1];
				if (lastToken && token.type === "text" && lastToken.type === "text") {
					lastToken.raw += token.raw;
					lastToken.text += token.text;
				} else tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.link(src)) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.reflink(src, this.tokens.links)) {
				src = src.substring(token.raw.length);
				lastToken = tokens[tokens.length - 1];
				if (lastToken && token.type === "text" && lastToken.type === "text") {
					lastToken.raw += token.raw;
					lastToken.text += token.text;
				} else tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.codespan(src)) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.br(src)) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.del(src)) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if (token = this.tokenizer.autolink(src)) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			if (!this.state.inLink && (token = this.tokenizer.url(src))) {
				src = src.substring(token.raw.length);
				tokens.push(token);
				continue;
			}
			cutSrc = src;
			if (this.options.extensions && this.options.extensions.startInline) {
				let startIndex = Infinity;
				const tempSrc = src.slice(1);
				let tempStart;
				this.options.extensions.startInline.forEach((getStartIndex) => {
					tempStart = getStartIndex.call({ lexer: this }, tempSrc);
					if (typeof tempStart === "number" && tempStart >= 0) startIndex = Math.min(startIndex, tempStart);
				});
				if (startIndex < Infinity && startIndex >= 0) cutSrc = src.substring(0, startIndex + 1);
			}
			if (token = this.tokenizer.inlineText(cutSrc)) {
				src = src.substring(token.raw.length);
				if (token.raw.slice(-1) !== "_") prevChar = token.raw.slice(-1);
				keepPrevChar = true;
				lastToken = tokens[tokens.length - 1];
				if (lastToken && lastToken.type === "text") {
					lastToken.raw += token.raw;
					lastToken.text += token.text;
				} else tokens.push(token);
				continue;
			}
			if (src) {
				const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
				if (this.options.silent) {
					console.error(errMsg);
					break;
				} else throw new Error(errMsg);
			}
		}
		return tokens;
	}
};
var _Renderer = class {
	options;
	constructor(options$1) {
		this.options = options$1 || _defaults;
	}
	code(code, infostring, escaped) {
		const lang = (infostring || "").match(/^\S*/)?.[0];
		code = code.replace(/\n$/, "") + "\n";
		if (!lang) return "<pre><code>" + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
		return "<pre><code class=\"language-" + escape$1(lang) + "\">" + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
	}
	blockquote(quote) {
		return `<blockquote>\n${quote}</blockquote>\n`;
	}
	html(html$1, block$1) {
		return html$1;
	}
	heading(text, level, raw) {
		return `<h${level}>${text}</h${level}>\n`;
	}
	hr() {
		return "<hr>\n";
	}
	list(body, ordered, start) {
		const type = ordered ? "ol" : "ul";
		const startatt = ordered && start !== 1 ? " start=\"" + start + "\"" : "";
		return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
	}
	listitem(text, task, checked) {
		return `<li>${text}</li>\n`;
	}
	checkbox(checked) {
		return "<input " + (checked ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\">";
	}
	paragraph(text) {
		return `<p>${text}</p>\n`;
	}
	table(header, body) {
		if (body) body = `<tbody>${body}</tbody>`;
		return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
	}
	tablerow(content) {
		return `<tr>\n${content}</tr>\n`;
	}
	tablecell(content, flags) {
		const type = flags.header ? "th" : "td";
		const tag$1 = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
		return tag$1 + content + `</${type}>\n`;
	}
	/**
	* span level renderer
	*/
	strong(text) {
		return `<strong>${text}</strong>`;
	}
	em(text) {
		return `<em>${text}</em>`;
	}
	codespan(text) {
		return `<code>${text}</code>`;
	}
	br() {
		return "<br>";
	}
	del(text) {
		return `<del>${text}</del>`;
	}
	link(href, title, text) {
		const cleanHref = cleanUrl(href);
		if (cleanHref === null) return text;
		href = cleanHref;
		let out = "<a href=\"" + href + "\"";
		if (title) out += " title=\"" + title + "\"";
		out += ">" + text + "</a>";
		return out;
	}
	image(href, title, text) {
		const cleanHref = cleanUrl(href);
		if (cleanHref === null) return text;
		href = cleanHref;
		let out = `<img src="${href}" alt="${text}"`;
		if (title) out += ` title="${title}"`;
		out += ">";
		return out;
	}
	text(text) {
		return text;
	}
};
var _TextRenderer = class {
	strong(text) {
		return text;
	}
	em(text) {
		return text;
	}
	codespan(text) {
		return text;
	}
	del(text) {
		return text;
	}
	html(text) {
		return text;
	}
	text(text) {
		return text;
	}
	link(href, title, text) {
		return "" + text;
	}
	image(href, title, text) {
		return "" + text;
	}
	br() {
		return "";
	}
};
var _Parser = class _Parser {
	options;
	renderer;
	textRenderer;
	constructor(options$1) {
		this.options = options$1 || _defaults;
		this.options.renderer = this.options.renderer || new _Renderer();
		this.renderer = this.options.renderer;
		this.renderer.options = this.options;
		this.textRenderer = new _TextRenderer();
	}
	/**
	* Static Parse Method
	*/
	static parse(tokens, options$1) {
		const parser$1 = new _Parser(options$1);
		return parser$1.parse(tokens);
	}
	/**
	* Static Parse Inline Method
	*/
	static parseInline(tokens, options$1) {
		const parser$1 = new _Parser(options$1);
		return parser$1.parseInline(tokens);
	}
	/**
	* Parse Loop
	*/
	parse(tokens, top = true) {
		let out = "";
		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];
			if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
				const genericToken = token;
				const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
				if (ret !== false || ![
					"space",
					"hr",
					"heading",
					"code",
					"table",
					"blockquote",
					"list",
					"html",
					"paragraph",
					"text"
				].includes(genericToken.type)) {
					out += ret || "";
					continue;
				}
			}
			switch (token.type) {
				case "space": continue;
				case "hr": {
					out += this.renderer.hr();
					continue;
				}
				case "heading": {
					const headingToken = token;
					out += this.renderer.heading(this.parseInline(headingToken.tokens), headingToken.depth, unescape(this.parseInline(headingToken.tokens, this.textRenderer)));
					continue;
				}
				case "code": {
					const codeToken = token;
					out += this.renderer.code(codeToken.text, codeToken.lang, !!codeToken.escaped);
					continue;
				}
				case "table": {
					const tableToken = token;
					let header = "";
					let cell = "";
					for (let j = 0; j < tableToken.header.length; j++) cell += this.renderer.tablecell(this.parseInline(tableToken.header[j].tokens), {
						header: true,
						align: tableToken.align[j]
					});
					header += this.renderer.tablerow(cell);
					let body = "";
					for (let j = 0; j < tableToken.rows.length; j++) {
						const row = tableToken.rows[j];
						cell = "";
						for (let k = 0; k < row.length; k++) cell += this.renderer.tablecell(this.parseInline(row[k].tokens), {
							header: false,
							align: tableToken.align[k]
						});
						body += this.renderer.tablerow(cell);
					}
					out += this.renderer.table(header, body);
					continue;
				}
				case "blockquote": {
					const blockquoteToken = token;
					const body = this.parse(blockquoteToken.tokens);
					out += this.renderer.blockquote(body);
					continue;
				}
				case "list": {
					const listToken = token;
					const ordered = listToken.ordered;
					const start = listToken.start;
					const loose = listToken.loose;
					let body = "";
					for (let j = 0; j < listToken.items.length; j++) {
						const item = listToken.items[j];
						const checked = item.checked;
						const task = item.task;
						let itemBody = "";
						if (item.task) {
							const checkbox = this.renderer.checkbox(!!checked);
							if (loose) if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
								item.tokens[0].text = checkbox + " " + item.tokens[0].text;
								if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
							} else item.tokens.unshift({
								type: "text",
								text: checkbox + " "
							});
else itemBody += checkbox + " ";
						}
						itemBody += this.parse(item.tokens, loose);
						body += this.renderer.listitem(itemBody, task, !!checked);
					}
					out += this.renderer.list(body, ordered, start);
					continue;
				}
				case "html": {
					const htmlToken = token;
					out += this.renderer.html(htmlToken.text, htmlToken.block);
					continue;
				}
				case "paragraph": {
					const paragraphToken = token;
					out += this.renderer.paragraph(this.parseInline(paragraphToken.tokens));
					continue;
				}
				case "text": {
					let textToken = token;
					let body = textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text;
					while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
						textToken = tokens[++i];
						body += "\n" + (textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text);
					}
					out += top ? this.renderer.paragraph(body) : body;
					continue;
				}
				default: {
					const errMsg = "Token with \"" + token.type + "\" type was not found.";
					if (this.options.silent) {
						console.error(errMsg);
						return "";
					} else throw new Error(errMsg);
				}
			}
		}
		return out;
	}
	/**
	* Parse Inline Tokens
	*/
	parseInline(tokens, renderer) {
		renderer = renderer || this.renderer;
		let out = "";
		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];
			if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
				const ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
				if (ret !== false || ![
					"escape",
					"html",
					"link",
					"image",
					"strong",
					"em",
					"codespan",
					"br",
					"del",
					"text"
				].includes(token.type)) {
					out += ret || "";
					continue;
				}
			}
			switch (token.type) {
				case "escape": {
					const escapeToken = token;
					out += renderer.text(escapeToken.text);
					break;
				}
				case "html": {
					const tagToken = token;
					out += renderer.html(tagToken.text);
					break;
				}
				case "link": {
					const linkToken = token;
					out += renderer.link(linkToken.href, linkToken.title, this.parseInline(linkToken.tokens, renderer));
					break;
				}
				case "image": {
					const imageToken = token;
					out += renderer.image(imageToken.href, imageToken.title, imageToken.text);
					break;
				}
				case "strong": {
					const strongToken = token;
					out += renderer.strong(this.parseInline(strongToken.tokens, renderer));
					break;
				}
				case "em": {
					const emToken = token;
					out += renderer.em(this.parseInline(emToken.tokens, renderer));
					break;
				}
				case "codespan": {
					const codespanToken = token;
					out += renderer.codespan(codespanToken.text);
					break;
				}
				case "br": {
					out += renderer.br();
					break;
				}
				case "del": {
					const delToken = token;
					out += renderer.del(this.parseInline(delToken.tokens, renderer));
					break;
				}
				case "text": {
					const textToken = token;
					out += renderer.text(textToken.text);
					break;
				}
				default: {
					const errMsg = "Token with \"" + token.type + "\" type was not found.";
					if (this.options.silent) {
						console.error(errMsg);
						return "";
					} else throw new Error(errMsg);
				}
			}
		}
		return out;
	}
};
var _Hooks = class {
	options;
	constructor(options$1) {
		this.options = options$1 || _defaults;
	}
	static passThroughHooks = new Set([
		"preprocess",
		"postprocess",
		"processAllTokens"
	]);
	/**
	* Process markdown before marked
	*/
	preprocess(markdown) {
		return markdown;
	}
	/**
	* Process HTML after marked is finished
	*/
	postprocess(html$1) {
		return html$1;
	}
	/**
	* Process all tokens before walk tokens
	*/
	processAllTokens(tokens) {
		return tokens;
	}
};
var Marked = class {
	defaults = _getDefaults();
	options = this.setOptions;
	parse = this.#parseMarkdown(_Lexer.lex, _Parser.parse);
	parseInline = this.#parseMarkdown(_Lexer.lexInline, _Parser.parseInline);
	Parser = _Parser;
	Renderer = _Renderer;
	TextRenderer = _TextRenderer;
	Lexer = _Lexer;
	Tokenizer = _Tokenizer;
	Hooks = _Hooks;
	constructor(...args) {
		this.use(...args);
	}
	/**
	* Run callback for every token
	*/
	walkTokens(tokens, callback) {
		let values = [];
		for (const token of tokens) {
			values = values.concat(callback.call(this, token));
			switch (token.type) {
				case "table": {
					const tableToken = token;
					for (const cell of tableToken.header) values = values.concat(this.walkTokens(cell.tokens, callback));
					for (const row of tableToken.rows) for (const cell of row) values = values.concat(this.walkTokens(cell.tokens, callback));
					break;
				}
				case "list": {
					const listToken = token;
					values = values.concat(this.walkTokens(listToken.items, callback));
					break;
				}
				default: {
					const genericToken = token;
					if (this.defaults.extensions?.childTokens?.[genericToken.type]) this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
						const tokens$1 = genericToken[childTokens].flat(Infinity);
						values = values.concat(this.walkTokens(tokens$1, callback));
					});
else if (genericToken.tokens) values = values.concat(this.walkTokens(genericToken.tokens, callback));
				}
			}
		}
		return values;
	}
	use(...args) {
		const extensions = this.defaults.extensions || {
			renderers: {},
			childTokens: {}
		};
		args.forEach((pack) => {
			const opts = { ...pack };
			opts.async = this.defaults.async || opts.async || false;
			if (pack.extensions) {
				pack.extensions.forEach((ext) => {
					if (!ext.name) throw new Error("extension name required");
					if ("renderer" in ext) {
						const prevRenderer = extensions.renderers[ext.name];
						if (prevRenderer) extensions.renderers[ext.name] = function(...args$1) {
							let ret = ext.renderer.apply(this, args$1);
							if (ret === false) ret = prevRenderer.apply(this, args$1);
							return ret;
						};
else extensions.renderers[ext.name] = ext.renderer;
					}
					if ("tokenizer" in ext) {
						if (!ext.level || ext.level !== "block" && ext.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
						const extLevel = extensions[ext.level];
						if (extLevel) extLevel.unshift(ext.tokenizer);
else extensions[ext.level] = [ext.tokenizer];
						if (ext.start) {
							if (ext.level === "block") if (extensions.startBlock) extensions.startBlock.push(ext.start);
else extensions.startBlock = [ext.start];
else if (ext.level === "inline") if (extensions.startInline) extensions.startInline.push(ext.start);
else extensions.startInline = [ext.start];
						}
					}
					if ("childTokens" in ext && ext.childTokens) extensions.childTokens[ext.name] = ext.childTokens;
				});
				opts.extensions = extensions;
			}
			if (pack.renderer) {
				const renderer = this.defaults.renderer || new _Renderer(this.defaults);
				for (const prop in pack.renderer) {
					if (!(prop in renderer)) throw new Error(`renderer '${prop}' does not exist`);
					if (prop === "options") continue;
					const rendererProp = prop;
					const rendererFunc = pack.renderer[rendererProp];
					const prevRenderer = renderer[rendererProp];
					renderer[rendererProp] = (...args$1) => {
						let ret = rendererFunc.apply(renderer, args$1);
						if (ret === false) ret = prevRenderer.apply(renderer, args$1);
						return ret || "";
					};
				}
				opts.renderer = renderer;
			}
			if (pack.tokenizer) {
				const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
				for (const prop in pack.tokenizer) {
					if (!(prop in tokenizer)) throw new Error(`tokenizer '${prop}' does not exist`);
					if ([
						"options",
						"rules",
						"lexer"
					].includes(prop)) continue;
					const tokenizerProp = prop;
					const tokenizerFunc = pack.tokenizer[tokenizerProp];
					const prevTokenizer = tokenizer[tokenizerProp];
					tokenizer[tokenizerProp] = (...args$1) => {
						let ret = tokenizerFunc.apply(tokenizer, args$1);
						if (ret === false) ret = prevTokenizer.apply(tokenizer, args$1);
						return ret;
					};
				}
				opts.tokenizer = tokenizer;
			}
			if (pack.hooks) {
				const hooks = this.defaults.hooks || new _Hooks();
				for (const prop in pack.hooks) {
					if (!(prop in hooks)) throw new Error(`hook '${prop}' does not exist`);
					if (prop === "options") continue;
					const hooksProp = prop;
					const hooksFunc = pack.hooks[hooksProp];
					const prevHook = hooks[hooksProp];
					if (_Hooks.passThroughHooks.has(prop)) hooks[hooksProp] = (arg) => {
						if (this.defaults.async) return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret$1) => {
							return prevHook.call(hooks, ret$1);
						});
						const ret = hooksFunc.call(hooks, arg);
						return prevHook.call(hooks, ret);
					};
else hooks[hooksProp] = (...args$1) => {
						let ret = hooksFunc.apply(hooks, args$1);
						if (ret === false) ret = prevHook.apply(hooks, args$1);
						return ret;
					};
				}
				opts.hooks = hooks;
			}
			if (pack.walkTokens) {
				const walkTokens$1 = this.defaults.walkTokens;
				const packWalktokens = pack.walkTokens;
				opts.walkTokens = function(token) {
					let values = [];
					values.push(packWalktokens.call(this, token));
					if (walkTokens$1) values = values.concat(walkTokens$1.call(this, token));
					return values;
				};
			}
			this.defaults = {
				...this.defaults,
				...opts
			};
		});
		return this;
	}
	setOptions(opt) {
		this.defaults = {
			...this.defaults,
			...opt
		};
		return this;
	}
	lexer(src, options$1) {
		return _Lexer.lex(src, options$1 ?? this.defaults);
	}
	parser(tokens, options$1) {
		return _Parser.parse(tokens, options$1 ?? this.defaults);
	}
	#parseMarkdown(lexer$1, parser$1) {
		return (src, options$1) => {
			const origOpt = { ...options$1 };
			const opt = {
				...this.defaults,
				...origOpt
			};
			if (this.defaults.async === true && origOpt.async === false) {
				if (!opt.silent) console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.");
				opt.async = true;
			}
			const throwError = this.#onError(!!opt.silent, !!opt.async);
			if (typeof src === "undefined" || src === null) return throwError(new Error("marked(): input parameter is undefined or null"));
			if (typeof src !== "string") return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
			if (opt.hooks) opt.hooks.options = opt;
			if (opt.async) return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src$1) => lexer$1(src$1, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser$1(tokens, opt)).then((html$1) => opt.hooks ? opt.hooks.postprocess(html$1) : html$1).catch(throwError);
			try {
				if (opt.hooks) src = opt.hooks.preprocess(src);
				let tokens = lexer$1(src, opt);
				if (opt.hooks) tokens = opt.hooks.processAllTokens(tokens);
				if (opt.walkTokens) this.walkTokens(tokens, opt.walkTokens);
				let html$1 = parser$1(tokens, opt);
				if (opt.hooks) html$1 = opt.hooks.postprocess(html$1);
				return html$1;
			} catch (e) {
				return throwError(e);
			}
		};
	}
	#onError(silent, async) {
		return (e) => {
			e.message += "\nPlease report this to https://github.com/markedjs/marked.";
			if (silent) {
				const msg = "<p>An error occurred:</p><pre>" + escape$1(e.message + "", true) + "</pre>";
				if (async) return Promise.resolve(msg);
				return msg;
			}
			if (async) return Promise.reject(e);
			throw e;
		};
	}
};
const markedInstance = new Marked();
function marked(src, opt) {
	return markedInstance.parse(src, opt);
}
/**
* Sets the default options.
*
* @param options Hash of options
*/
marked.options = marked.setOptions = function(options$1) {
	markedInstance.setOptions(options$1);
	marked.defaults = markedInstance.defaults;
	changeDefaults(marked.defaults);
	return marked;
};
/**
* Gets the original marked default options.
*/
marked.getDefaults = _getDefaults;
marked.defaults = _defaults;
/**
* Use Extension
*/
marked.use = function(...args) {
	markedInstance.use(...args);
	marked.defaults = markedInstance.defaults;
	changeDefaults(marked.defaults);
	return marked;
};
/**
* Run callback for every token
*/
marked.walkTokens = function(tokens, callback) {
	return markedInstance.walkTokens(tokens, callback);
};
/**
* Compiles markdown to HTML without enclosing `p` tag.
*
* @param src String of markdown source to be compiled
* @param options Hash of options
* @return String of compiled HTML
*/
marked.parseInline = markedInstance.parseInline;
/**
* Expose
*/
marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Hooks = _Hooks;
marked.parse = marked;
const options = marked.options;
const setOptions = marked.setOptions;
const use = marked.use;
const walkTokens = marked.walkTokens;
const parseInline = marked.parseInline;
const parser = _Parser.parse;
const lexer = _Lexer.lex;

//#endregion
//#region plugins/dorion-settings/util/changelog.ts
const { ui: { showToast: showToast$1 }, plugins: { installedPlugins } } = shelter;
const devModeReservedId = "__DEVMODE_PLUGIN_DO_NOT_USE_OR_YOU_WILL_BE_FIRED";
function isDevMode() {
	return installedPlugins() && devModeReservedId in installedPlugins();
}
async function loadChangelog() {
	if (isDevMode()) {
		console.warn(`[${appName} Changelog] Dev mode is on. Loading changelog from local storage.`);
		return loadChangelogFromLocalStorage();
	}
	try {
		const changelog = await fetchChangelogFromGitHub();
		saveChangelogToLocalStorage(changelog);
		return changelog;
	} catch (e) {
		console.error(e);
		showToast$1({
			title: "Failed to load changelog",
			content: e.message,
			duration: 3e3
		});
		return loadChangelogFromLocalStorage();
	}
}
async function fetchChangelogFromGitHub() {
	const response = await fetch(`https://api.github.com/repos/SpikeHD/${appName}/releases`, { headers: { "User-Agent": appName } });
	if (!response.ok) throw new Error(`Failed to fetch changelog. ${response.status} ${response.statusText}`);
	return await response.json();
}
function loadChangelogFromLocalStorage() {
	const changelog = localStorage.getItem("changelog");
	if (!changelog) return [];
	return JSON.parse(changelog);
}
function saveChangelogToLocalStorage(changelog) {
	localStorage.setItem("changelog", JSON.stringify(changelog));
}
async function processReleaseBodies(releases) {
	const processedReleases = await Promise.all(releases.map(async (release) => {
		release.body = await processReleaseBody(release.body);
		return release;
	}));
	return processedReleases;
}
async function processReleaseBody(body) {
	const parsedBody = await marked.parse(body);
	return parsedBody.replace("\n", "").replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code)).replace(/@([\w-]+)/g, "<a href=\"https://github.com/$1\">@$1</a>").replace(/#(\d+)/g, `<a href="https://github.com/spikehd/${appName}/pull/$1">#$1</a>`).replace(/<a href="([^"]+)">([^<]+)<\/a>/g, "<a href=\"$1\" target=\"_blank\">$2</a>");
}
async function fixImageLinks(scope) {
	if (!scope) return;
	const images = scope.getElementsByTagName("img");
	await Promise.all(Array.from(images).map(async (image) => {
		const url = image.src;
		image.src = await api.util.fetchImage(url);
	}));
}

//#endregion
//#region plugins/dorion-settings/pages/ChangelogPage.tsx
var import_web$44 = __toESM(require_web(), 1);
var import_web$45 = __toESM(require_web(), 1);
var import_web$46 = __toESM(require_web(), 1);
var import_web$47 = __toESM(require_web(), 1);
var import_web$48 = __toESM(require_web(), 1);
var import_web$49 = __toESM(require_web(), 1);
var import_web$50 = __toESM(require_web(), 1);
var import_web$51 = __toESM(require_web(), 1);
var import_web$52 = __toESM(require_web(), 1);
const _tmpl$$6 = /*#__PURE__*/ (0, import_web$44.template)(`<div><div></div></div>`, 4), _tmpl$2$3 = /*#__PURE__*/ (0, import_web$44.template)(`<div><!#><!/><!#><!/><!#><!/></div>`, 8), _tmpl$3$3 = /*#__PURE__*/ (0, import_web$44.template)(`<span></span>`, 2), _tmpl$4$1 = /*#__PURE__*/ (0, import_web$44.template)(`<div><!#><!/><!#><!/></div>`, 6), _tmpl$5$1 = /*#__PURE__*/ (0, import_web$44.template)(`<div><!#><!/><!#><!/><div></div></div>`, 8), _tmpl$6 = /*#__PURE__*/ (0, import_web$44.template)(`<span>Current</span>`, 2), _tmpl$7 = /*#__PURE__*/ (0, import_web$44.template)(`<span>Latest</span>`, 2);
const PAGE_ID = `${appName.toLowerCase()}-changelog-tab`;
const { ui: { injectCss: injectCss$5, Header: Header$3, HeaderTags: HeaderTags$3, Button: Button$3, ButtonSizes: ButtonSizes$2, ButtonColors, Text: Text$4, LinkButton }, solid: { createSignal: createSignal$6, createEffect: createEffect$2 } } = shelter;
let injectedCss$5 = false;
function ChangelogPage() {
	if (!injectedCss$5) {
		injectedCss$5 = true;
		injectCss$5(css$5);
	}
	const [loading, setLoading] = createSignal$6(true);
	const [releases, setReleases] = createSignal$6([]);
	const [currentVersion, setCurrentVersion] = createSignal$6("");
	const [latestVersion, setLatestVersion] = createSignal$6("");
	const [updateCheck, setUpdateCheck] = createSignal$6([]);
	createEffect$2(async () => {
		setReleases(await processReleaseBodies(await loadChangelog()));
		setCurrentVersion(`v${await app.getVersion()}`);
		if (releases().length > 0) setLatestVersion(releases()[0].tag_name);
		setUpdateCheck(await invoke("update_check"));
		setLoading(false);
		await fixImageLinks(document.getElementById(PAGE_ID));
	}, []);
	async function doUpdate() {
		invoke("do_update", { toUpdate: updateCheck() });
	}
	async function refresh() {
		setLoading(true);
		setReleases(await processReleaseBodies(await loadChangelog()));
		setLoading(false);
		await fixImageLinks(document.getElementById(PAGE_ID));
	}
	return [
		(0, import_web$52.createComponent)(Header$3, {
			get tag() {
				return HeaderTags$3.H1;
			},
			get ["class"]() {
				return classes$5.tophead;
			},
			children: "Changelog"
		}),
		(0, import_web$52.createComponent)(Button$3, {
			onClick: refresh,
			get disabled() {
				return loading();
			},
			get ["class"]() {
				return classes$5.refresh;
			},
			children: "Refresh"
		}),
		(0, import_web$51.memo)((() => {
			const _c$ = (0, import_web$51.memo)(() => !!loading());
			return () => _c$() ? (() => {
				const _el$ = (0, import_web$50.getNextElement)(_tmpl$$6), _el$2 = _el$.firstChild;
				(0, import_web$49.effect)((_p$) => {
					const _v$ = classes$5.card, _v$2 = classes$5.spinner;
					_v$ !== _p$._v$ && (0, import_web$48.className)(_el$, _p$._v$ = _v$);
					_v$2 !== _p$._v$2 && (0, import_web$48.className)(_el$2, _p$._v$2 = _v$2);
					return _p$;
				}, {
					_v$: undefined,
					_v$2: undefined
				});
				return _el$;
			})() : [(0, import_web$51.memo)((() => {
				const _c$2 = (0, import_web$51.memo)(() => !!updateCheck().includes("dorion"));
				return () => _c$2() && (() => {
					const _el$3 = (0, import_web$50.getNextElement)(_tmpl$2$3), _el$4 = _el$3.firstChild, [_el$5, _co$] = (0, import_web$46.getNextMarker)(_el$4.nextSibling), _el$6 = _el$5.nextSibling, [_el$7, _co$2] = (0, import_web$46.getNextMarker)(_el$6.nextSibling), _el$8 = _el$7.nextSibling, [_el$9, _co$3] = (0, import_web$46.getNextMarker)(_el$8.nextSibling);
					(0, import_web$47.insert)(_el$3, (0, import_web$52.createComponent)(Header$3, {
						get tag() {
							return HeaderTags$3.H1;
						},
						get ["class"]() {
							return classes$5.title;
						},
						children: "Update available!"
					}), _el$5, _co$);
					(0, import_web$47.insert)(_el$3, (0, import_web$52.createComponent)(Text$4, { get children() {
						return ["Your current version is ", (0, import_web$51.memo)(() => currentVersion())];
					} }), _el$7, _co$2);
					(0, import_web$47.insert)(_el$3, (0, import_web$52.createComponent)(Button$3, {
						get size() {
							return ButtonSizes$2.LARGE;
						},
						get color() {
							return ButtonColors.GREEN;
						},
						onClick: doUpdate,
						get children() {
							return ["Update to ", (0, import_web$51.memo)(() => latestVersion())];
						}
					}), _el$9, _co$3);
					(0, import_web$49.effect)(() => (0, import_web$48.className)(_el$3, classes$5.card));
					return _el$3;
				})();
			})()), (0, import_web$51.memo)((() => {
				const _c$3 = (0, import_web$51.memo)(() => !!(releases() != null && releases().length > 0));
				return () => _c$3() && releases().map((release) => (() => {
					const _el$0 = (0, import_web$50.getNextElement)(_tmpl$5$1), _el$16 = _el$0.firstChild, [_el$17, _co$6] = (0, import_web$46.getNextMarker)(_el$16.nextSibling), _el$18 = _el$17.nextSibling, [_el$19, _co$7] = (0, import_web$46.getNextMarker)(_el$18.nextSibling), _el$15 = _el$19.nextSibling;
					(0, import_web$47.insert)(_el$0, (0, import_web$52.createComponent)(Header$3, {
						get tag() {
							return HeaderTags$3.H1;
						},
						get ["class"]() {
							return classes$5.title;
						},
						get children() {
							return [(() => {
								const _el$1 = (0, import_web$50.getNextElement)(_tmpl$3$3);
								(0, import_web$47.insert)(_el$1, () => release.name);
								return _el$1;
							})(), (() => {
								const _el$10 = (0, import_web$50.getNextElement)(_tmpl$4$1), _el$11 = _el$10.firstChild, [_el$12, _co$4] = (0, import_web$46.getNextMarker)(_el$11.nextSibling), _el$13 = _el$12.nextSibling, [_el$14, _co$5] = (0, import_web$46.getNextMarker)(_el$13.nextSibling);
								(0, import_web$47.insert)(_el$10, (() => {
									const _c$4 = (0, import_web$51.memo)(() => currentVersion() == release.tag_name);
									return () => _c$4() && (() => {
										const _el$20 = (0, import_web$50.getNextElement)(_tmpl$6);
										(0, import_web$49.effect)(() => (0, import_web$48.className)(_el$20, classes$5.badge));
										return _el$20;
									})();
								})(), _el$12, _co$4);
								(0, import_web$47.insert)(_el$10, (() => {
									const _c$5 = (0, import_web$51.memo)(() => releases()[0].tag_name == release.tag_name);
									return () => _c$5() && (() => {
										const _el$21 = (0, import_web$50.getNextElement)(_tmpl$7);
										(0, import_web$49.effect)(() => (0, import_web$48.className)(_el$21, classes$5.badge));
										return _el$21;
									})();
								})(), _el$14, _co$5);
								(0, import_web$49.effect)(() => (0, import_web$48.className)(_el$10, classes$5.badges));
								return _el$10;
							})()];
						}
					}), _el$17, _co$6);
					(0, import_web$47.insert)(_el$0, (0, import_web$52.createComponent)(LinkButton, {
						get href() {
							return release.html_url;
						},
						children: "View on GitHub"
					}), _el$19, _co$7);
					(0, import_web$49.effect)((_p$) => {
						const _v$3 = classes$5.card, _v$4 = classes$5.contents, _v$5 = release.body;
						_v$3 !== _p$._v$3 && (0, import_web$48.className)(_el$0, _p$._v$3 = _v$3);
						_v$4 !== _p$._v$4 && (0, import_web$48.className)(_el$15, _p$._v$4 = _v$4);
						_v$5 !== _p$._v$5 && (0, import_web$45.innerHTML)(_el$15, _p$._v$5 = _v$5);
						return _p$;
					}, {
						_v$3: undefined,
						_v$4: undefined,
						_v$5: undefined
					});
					return _el$0;
				})());
			})())];
		})())
	];
}

//#endregion
//#region plugins/dorion-settings/components/ClientModList.tsx.scss
const classes$4 = {
	"top32": "XZjauW_top32",
	"pbuttons": "XZjauW_pbuttons",
	"shead": "XZjauW_shead",
	"scell": "XZjauW_scell",
	"mcell": "XZjauW_mcell",
	"plistrow": "XZjauW_plistrow",
	"plist": "XZjauW_plist",
	"left16": "XZjauW_left16",
	"sbutton": "XZjauW_sbutton",
	"top16": "XZjauW_top16",
	"pheader": "XZjauW_pheader"
};
const css$4 = `.XZjauW_shead {
  margin-top: 16px;
  margin-bottom: 8px;
}

.XZjauW_plist {
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  display: flex;
}

.XZjauW_pheader {
  border-bottom: 1px solid var(--background-tertiary);
  padding-bottom: 16px;
  font-weight: bold;
}

.XZjauW_pbuttons {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 16px;
  display: flex;
}

.XZjauW_pbuttons button {
  width: 30%;
  padding: 18px;
}

.XZjauW_sbutton {
  width: 100%;
  margin-top: 16px;
  padding: 18px;
}

.XZjauW_plistrow {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  display: flex;
}

.XZjauW_plistrow .XZjauW_scell {
  justify-content: center;
  align-items: center;
  width: 30%;
  display: flex;
}

.XZjauW_plistrow .XZjauW_mcell {
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  display: flex;
}

.XZjauW_left16 {
  margin-left: 16px;
}

.XZjauW_top16 {
  margin-top: 16px;
}

.XZjauW_top32 {
  margin-top: 32px;
}
`;

//#endregion
//#region plugins/dorion-settings/components/ClientModList.tsx
var import_web$35 = __toESM(require_web(), 1);
var import_web$36 = __toESM(require_web(), 1);
var import_web$37 = __toESM(require_web(), 1);
var import_web$38 = __toESM(require_web(), 1);
var import_web$39 = __toESM(require_web(), 1);
var import_web$40 = __toESM(require_web(), 1);
var import_web$41 = __toESM(require_web(), 1);
var import_web$42 = __toESM(require_web(), 1);
var import_web$43 = __toESM(require_web(), 1);
const _tmpl$$5 = /*#__PURE__*/ (0, import_web$35.template)(`<div><div><div></div><div></div></div><!#><!/><!#><!/></div>`, 12), _tmpl$2$2 = /*#__PURE__*/ (0, import_web$35.template)(`<div></div>`, 2), _tmpl$3$2 = /*#__PURE__*/ (0, import_web$35.template)(`<div><div></div><div></div></div>`, 6);
const { ui: { Switch: Switch$1, Text: Text$3, injectCss: injectCss$4 }, solid: { createSignal: createSignal$5 } } = shelter;
let injectedCss$4 = false;
const getClientMods = async () => {
	try {
		return await invoke("available_mods");
	} catch (e) {}
};
function ClientModList(props) {
	if (!injectedCss$4) {
		injectedCss$4 = true;
		injectCss$4(css$4);
	}
	const [settings, setSettingsState] = createSignal$5({
		zoom: "1.0",
		client_type: "default",
		sys_tray: false,
		push_to_talk: false,
		push_to_talk_keys: [],
		theme: "none",
		use_native_titlebar: false,
		start_maximized: false,
		open_on_startup: false,
		startup_minimized: false,
		autoupdate: false,
		update_notify: true,
		multi_instance: false,
		client_mods: []
	});
	const [clientMods, setClientMods] = createSignal$5([]);
	(async () => {
		setSettingsState(JSON.parse(await invoke("read_config_file")));
		setClientMods(await getClientMods());
		console.log(settings());
	})();
	function onClientModToggle(modName) {
		const newClientMods = [...settings().client_mods];
		if (newClientMods.includes(modName)) newClientMods.splice(newClientMods.indexOf(modName), 1);
else newClientMods.push(modName);
		setSettings((s) => ({
			...s,
			client_mods: newClientMods
		}));
		props.onChange();
	}
	const setSettings = (fn) => {
		setSettingsState(fn(settings()));
		invoke("write_config_file", { contents: JSON.stringify(fn(settings())) });
	};
	return (0, import_web$43.createComponent)(Card, {
		style: { marginTop: "1rem" },
		get children() {
			const _el$ = (0, import_web$39.getNextElement)(_tmpl$$5), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$2.nextSibling, [_el$6, _co$] = (0, import_web$40.getNextMarker)(_el$5.nextSibling), _el$7 = _el$6.nextSibling, [_el$8, _co$2] = (0, import_web$40.getNextMarker)(_el$7.nextSibling);
			(0, import_web$42.insert)(_el$3, (0, import_web$43.createComponent)(Text$3, {
				get ["class"]() {
					return classes$4.left16;
				},
				children: "Client Mod Name"
			}));
			(0, import_web$42.insert)(_el$4, (0, import_web$43.createComponent)(Text$3, {
				get ["class"]() {
					return classes$4.left16;
				},
				children: "Enabled"
			}));
			(0, import_web$42.insert)(_el$, (() => {
				const _c$ = (0, import_web$41.memo)(() => clientMods().length === 0);
				return () => _c$() && (() => {
					const _el$9 = (0, import_web$39.getNextElement)(_tmpl$2$2);
					(0, import_web$42.insert)(_el$9, (0, import_web$43.createComponent)(Text$3, {
						get ["class"]() {
							return classes$4.left16;
						},
						children: "Client mods not available. Please update"
					}));
					(0, import_web$38.effect)(() => (0, import_web$37.className)(_el$9, classes$4.plistrow));
					return _el$9;
				})();
			})(), _el$6, _co$);
			(0, import_web$42.insert)(_el$, () => clientMods().map((modName) => (() => {
				const _el$0 = (0, import_web$39.getNextElement)(_tmpl$3$2), _el$1 = _el$0.firstChild, _el$10 = _el$1.nextSibling;
				(0, import_web$36.setAttribute)(_el$0, "key", modName);
				(0, import_web$42.insert)(_el$1, (0, import_web$43.createComponent)(Text$3, {
					get ["class"]() {
						return classes$4.left16;
					},
					children: modName
				}));
				(0, import_web$42.insert)(_el$10, (0, import_web$43.createComponent)(Switch$1, {
					disabled: modName === "Shelter",
					get checked() {
						return settings().client_mods?.includes(modName) || false;
					},
					onChange: () => onClientModToggle(modName)
				}));
				(0, import_web$38.effect)((_p$) => {
					const _v$5 = classes$4.plistrow, _v$6 = classes$4.mcell, _v$7 = classes$4.scell;
					_v$5 !== _p$._v$5 && (0, import_web$37.className)(_el$0, _p$._v$5 = _v$5);
					_v$6 !== _p$._v$6 && (0, import_web$37.className)(_el$1, _p$._v$6 = _v$6);
					_v$7 !== _p$._v$7 && (0, import_web$37.className)(_el$10, _p$._v$7 = _v$7);
					return _p$;
				}, {
					_v$5: undefined,
					_v$6: undefined,
					_v$7: undefined
				});
				return _el$0;
			})()), _el$8, _co$2);
			(0, import_web$38.effect)((_p$) => {
				const _v$ = classes$4.plist, _v$2 = classes$4.pheader + " " + classes$4.plistrow, _v$3 = classes$4.mcell, _v$4 = classes$4.scell;
				_v$ !== _p$._v$ && (0, import_web$37.className)(_el$, _p$._v$ = _v$);
				_v$2 !== _p$._v$2 && (0, import_web$37.className)(_el$2, _p$._v$2 = _v$2);
				_v$3 !== _p$._v$3 && (0, import_web$37.className)(_el$3, _p$._v$3 = _v$3);
				_v$4 !== _p$._v$4 && (0, import_web$37.className)(_el$4, _p$._v$4 = _v$4);
				return _p$;
			}, {
				_v$: undefined,
				_v$2: undefined,
				_v$3: undefined,
				_v$4: undefined
			});
			return _el$;
		}
	});
}

//#endregion
//#region plugins/dorion-settings/components/PluginList.tsx.scss
const classes$3 = {
	"plistrow": "V6is4W_plistrow",
	"sbutton": "V6is4W_sbutton",
	"left16": "V6is4W_left16",
	"mcell": "V6is4W_mcell",
	"top32": "V6is4W_top32",
	"scell": "V6is4W_scell",
	"plist": "V6is4W_plist",
	"pheader": "V6is4W_pheader",
	"pbuttons": "V6is4W_pbuttons",
	"top16": "V6is4W_top16"
};
const css$3 = `.V6is4W_plist {
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  display: flex;
}

.V6is4W_pheader {
  border-bottom: 1px solid var(--background-tertiary);
  padding-bottom: 16px;
  font-weight: bold;
}

.V6is4W_pbuttons {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 16px;
  display: flex;
}

.V6is4W_pbuttons button {
  width: 30%;
  padding: 18px;
}

.V6is4W_sbutton {
  width: 100%;
  margin-top: 16px;
  padding: 18px;
}

.V6is4W_plistrow {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  display: flex;
}

.V6is4W_plistrow .V6is4W_scell {
  justify-content: center;
  align-items: center;
  width: 30%;
  display: flex;
}

.V6is4W_plistrow .V6is4W_mcell {
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  display: flex;
}

.V6is4W_left16 {
  margin-left: 16px;
}

.V6is4W_top16 {
  margin-top: 16px;
}

.V6is4W_top32 {
  margin-top: 32px;
}
`;

//#endregion
//#region plugins/dorion-settings/components/PluginList.tsx
var import_web$26 = __toESM(require_web(), 1);
var import_web$27 = __toESM(require_web(), 1);
var import_web$28 = __toESM(require_web(), 1);
var import_web$29 = __toESM(require_web(), 1);
var import_web$30 = __toESM(require_web(), 1);
var import_web$31 = __toESM(require_web(), 1);
var import_web$32 = __toESM(require_web(), 1);
var import_web$33 = __toESM(require_web(), 1);
var import_web$34 = __toESM(require_web(), 1);
const _tmpl$$4 = /*#__PURE__*/ (0, import_web$26.template)(`<div><div><div></div><div></div><div></div></div><!#><!/><!#><!/></div>`, 14), _tmpl$2$1 = /*#__PURE__*/ (0, import_web$26.template)(`<div></div>`, 2), _tmpl$3$1 = /*#__PURE__*/ (0, import_web$26.template)(`<div><div></div><div></div><div></div></div>`, 8);
const { ui: { Switch, Text: Text$2, injectCss: injectCss$3 }, solid: { createSignal: createSignal$4 } } = shelter;
let injectedCss$3 = false;
const getPlugins = async () => {
	const plugins = await invoke("get_plugin_list");
	return plugins;
};
function PluginList(props) {
	if (!injectedCss$3) {
		injectedCss$3 = true;
		injectCss$3(css$3);
	}
	const [plugins, setPlugins] = createSignal$4({});
	(async () => {
		setPlugins(await getPlugins());
	})();
	return (0, import_web$34.createComponent)(Card, {
		style: { marginTop: "1rem" },
		get children() {
			const _el$ = (0, import_web$30.getNextElement)(_tmpl$$4), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling, _el$6 = _el$2.nextSibling, [_el$7, _co$] = (0, import_web$31.getNextMarker)(_el$6.nextSibling), _el$8 = _el$7.nextSibling, [_el$9, _co$2] = (0, import_web$31.getNextMarker)(_el$8.nextSibling);
			(0, import_web$33.insert)(_el$3, (0, import_web$34.createComponent)(Text$2, {
				get ["class"]() {
					return classes$3.left16;
				},
				children: "Plugin Name"
			}));
			(0, import_web$33.insert)(_el$4, (0, import_web$34.createComponent)(Text$2, {
				get ["class"]() {
					return classes$3.left16;
				},
				children: "Enabled"
			}));
			(0, import_web$33.insert)(_el$5, (0, import_web$34.createComponent)(Text$2, {
				get ["class"]() {
					return classes$3.left16;
				},
				children: "Preload"
			}));
			(0, import_web$33.insert)(_el$, (() => {
				const _c$ = (0, import_web$32.memo)(() => Object.entries(plugins()).length === 0);
				return () => _c$() && (() => {
					const _el$0 = (0, import_web$30.getNextElement)(_tmpl$2$1);
					(0, import_web$33.insert)(_el$0, (0, import_web$34.createComponent)(Text$2, {
						get ["class"]() {
							return classes$3.left16;
						},
						children: "No plugins found"
					}));
					(0, import_web$29.effect)(() => (0, import_web$28.className)(_el$0, classes$3.plistrow));
					return _el$0;
				})();
			})(), _el$7, _co$);
			(0, import_web$33.insert)(_el$, () => Object.entries(plugins()).map(([filename, plugin]) => (() => {
				const _el$1 = (0, import_web$30.getNextElement)(_tmpl$3$1), _el$10 = _el$1.firstChild, _el$11 = _el$10.nextSibling, _el$12 = _el$11.nextSibling;
				(0, import_web$27.setAttribute)(_el$1, "key", filename);
				(0, import_web$33.insert)(_el$10, (0, import_web$34.createComponent)(Text$2, {
					get ["class"]() {
						return classes$3.left16;
					},
					get children() {
						return plugin.name;
					}
				}));
				(0, import_web$33.insert)(_el$11, (0, import_web$34.createComponent)(Switch, {
					get checked() {
						return plugin.enabled;
					},
					onChange: () => {
						props.onChange();
						invoke("toggle_plugin", { name: filename });
						setPlugins({
							...plugins(),
							[filename]: {
								...plugin,
								enabled: !plugin.enabled
							}
						});
					},
					style: { flexDirection: "column-reverse" }
				}));
				(0, import_web$33.insert)(_el$12, (0, import_web$34.createComponent)(Switch, {
					get checked() {
						return plugin.preload;
					},
					onChange: () => {
						props.onChange();
						invoke("toggle_preload", { name: filename });
						setPlugins({
							...plugins(),
							[filename]: {
								...plugin,
								preload: !plugin.preload
							}
						});
					}
				}));
				(0, import_web$29.effect)((_p$) => {
					const _v$6 = classes$3.plistrow, _v$7 = classes$3.mcell, _v$8 = classes$3.scell, _v$9 = classes$3.scell;
					_v$6 !== _p$._v$6 && (0, import_web$28.className)(_el$1, _p$._v$6 = _v$6);
					_v$7 !== _p$._v$7 && (0, import_web$28.className)(_el$10, _p$._v$7 = _v$7);
					_v$8 !== _p$._v$8 && (0, import_web$28.className)(_el$11, _p$._v$8 = _v$8);
					_v$9 !== _p$._v$9 && (0, import_web$28.className)(_el$12, _p$._v$9 = _v$9);
					return _p$;
				}, {
					_v$6: undefined,
					_v$7: undefined,
					_v$8: undefined,
					_v$9: undefined
				});
				return _el$1;
			})()), _el$9, _co$2);
			(0, import_web$29.effect)((_p$) => {
				const _v$ = classes$3.plist, _v$2 = classes$3.pheader + " " + classes$3.plistrow, _v$3 = classes$3.mcell, _v$4 = classes$3.scell, _v$5 = classes$3.scell;
				_v$ !== _p$._v$ && (0, import_web$28.className)(_el$, _p$._v$ = _v$);
				_v$2 !== _p$._v$2 && (0, import_web$28.className)(_el$2, _p$._v$2 = _v$2);
				_v$3 !== _p$._v$3 && (0, import_web$28.className)(_el$3, _p$._v$3 = _v$3);
				_v$4 !== _p$._v$4 && (0, import_web$28.className)(_el$4, _p$._v$4 = _v$4);
				_v$5 !== _p$._v$5 && (0, import_web$28.className)(_el$5, _p$._v$5 = _v$5);
				return _p$;
			}, {
				_v$: undefined,
				_v$2: undefined,
				_v$3: undefined,
				_v$4: undefined,
				_v$5: undefined
			});
			return _el$;
		}
	});
}

//#endregion
//#region plugins/dorion-settings/pages/PluginsPage.tsx.scss
const classes$2 = {
	"shead": "X31w8G_shead",
	"card": "X31w8G_card",
	"pbuttons": "X31w8G_pbuttons",
	"left16": "X31w8G_left16",
	"tophead": "X31w8G_tophead",
	"openButton": "X31w8G_openButton"
};
const css$2 = `.X31w8G_tophead {
  margin-bottom: 16px;
}

.X31w8G_shead {
  margin-top: 16px;
  margin-bottom: 8px;
  font-weight: bold;
}

.X31w8G_card {
  margin-bottom: 16px;
}

.X31w8G_left16 {
  margin-left: 16px;
}

.X31w8G_openButton {
  margin-top: 16px;
  width: 100% !important;
}

.X31w8G_pbuttons {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-top: 16px;
  display: flex;
}
`;

//#endregion
//#region plugins/dorion-settings/pages/PluginsPage.tsx
var import_web$18 = __toESM(require_web(), 1);
var import_web$19 = __toESM(require_web(), 1);
var import_web$20 = __toESM(require_web(), 1);
var import_web$21 = __toESM(require_web(), 1);
var import_web$22 = __toESM(require_web(), 1);
var import_web$23 = __toESM(require_web(), 1);
var import_web$24 = __toESM(require_web(), 1);
var import_web$25 = __toESM(require_web(), 1);
const _tmpl$$3 = /*#__PURE__*/ (0, import_web$18.template)(`<div><!#><!/><!#><!/></div>`, 6);
const { ui: { Header: Header$2, Button: Button$2, HeaderTags: HeaderTags$2, injectCss: injectCss$2, ButtonSizes: ButtonSizes$1 }, solid: { createSignal: createSignal$3 } } = shelter;
let injectedCss$2 = false;
function PluginsPage() {
	const [restartRequired, setRestartRequired] = createSignal$3(false);
	if (!injectedCss$2) {
		injectedCss$2 = true;
		injectCss$2(css$2);
	}
	const openPluginsFolder = () => {
		invoke("open_plugins");
	};
	const openExtensionsFolder = () => {
		invoke("open_extensions");
	};
	return [
		(0, import_web$25.createComponent)(Header$2, {
			get tag() {
				return HeaderTags$2.H1;
			},
			get ["class"]() {
				return classes$2.tophead;
			},
			children: "Client Mods & Plugins"
		}),
		(0, import_web$24.memo)((() => {
			const _c$ = (0, import_web$24.memo)(() => !!restartRequired());
			return () => _c$() && (0, import_web$25.createComponent)(WarningCard, {});
		})()),
		(0, import_web$25.createComponent)(Header$2, {
			get ["class"]() {
				return classes$2.shead;
			},
			children: "Client Mods"
		}),
		(0, import_web$25.createComponent)(ClientModList, { onChange: () => {
			setRestartRequired(true);
		} }),
		(0, import_web$25.createComponent)(Header$2, {
			get ["class"]() {
				return classes$2.shead;
			},
			children: "Plugins"
		}),
		(0, import_web$25.createComponent)(PluginList, { onChange: () => {
			setRestartRequired(true);
		} }),
		(() => {
			const _el$ = (0, import_web$21.getNextElement)(_tmpl$$3), _el$2 = _el$.firstChild, [_el$3, _co$] = (0, import_web$22.getNextMarker)(_el$2.nextSibling), _el$4 = _el$3.nextSibling, [_el$5, _co$2] = (0, import_web$22.getNextMarker)(_el$4.nextSibling);
			(0, import_web$23.insert)(_el$, (0, import_web$25.createComponent)(Button$2, {
				get size() {
					return ButtonSizes$1.MEDIUM;
				},
				get ["class"]() {
					return classes$2.openButton;
				},
				style: {
					width: "100%",
					padding: "18px"
				},
				grow: true,
				onClick: openPluginsFolder,
				children: "Open Plugins Folder"
			}), _el$3, _co$);
			(0, import_web$23.insert)(_el$, (0, import_web$25.createComponent)(Button$2, {
				get size() {
					return ButtonSizes$1.MEDIUM;
				},
				get ["class"]() {
					return classes$2.openButton;
				},
				style: {
					width: "100%",
					padding: "18px"
				},
				grow: true,
				onClick: openExtensionsFolder,
				children: "Open Extensions Folder"
			}), _el$5, _co$2);
			(0, import_web$20.effect)(() => (0, import_web$19.className)(_el$, classes$2.pbuttons));
			return _el$;
		})()
	];
}

//#endregion
//#region plugins/dorion-settings/pages/ThemesPage.tsx.scss
const classes$1 = {
	"shead": "oAx4fa_shead",
	"tophead": "oAx4fa_tophead",
	"pbuttons": "oAx4fa_pbuttons"
};
const css$1 = `.oAx4fa_tophead {
  margin-bottom: 16px;
}

.oAx4fa_shead {
  margin-top: 16px;
  margin-bottom: 8px;
  font-weight: bold;
}

.oAx4fa_pbuttons {
  gap: 16px;
  margin-top: 16px;
  display: flex;
}

.oAx4fa_pbuttons button {
  width: 100% !important;
}
`;

//#endregion
//#region plugins/dorion-settings/util/modal.tsx
var import_web$17 = __toESM(require_web(), 1);
const { ui: { ModalRoot, ModalHeader, ModalBody, ModalConfirmFooter } } = shelter;
const confirmModal = (props) => (0, import_web$17.createComponent)(ModalRoot, { get children() {
	return [
		(0, import_web$17.createComponent)(ModalHeader, {
			get close() {
				return props.onCancel;
			},
			get children() {
				return props.header;
			}
		}),
		(0, import_web$17.createComponent)(ModalBody, { get children() {
			return props.body;
		} }),
		(0, import_web$17.createComponent)(ModalConfirmFooter, {
			get onConfirm() {
				return props.onConfirm;
			},
			get onCancel() {
				return props.onCancel;
			},
			get confirmText() {
				return props.confirmText || "Confirm";
			},
			get cancelText() {
				return props.cancelText || "Cancel";
			},
			get type() {
				return props.type;
			}
		})
	];
} });

//#endregion
//#region plugins/dorion-settings/util/theme.tsx
var import_web$12 = __toESM(require_web(), 1);
var import_web$13 = __toESM(require_web(), 1);
var import_web$14 = __toESM(require_web(), 1);
var import_web$15 = __toESM(require_web(), 1);
var import_web$16 = __toESM(require_web(), 1);
const _tmpl$$2 = /*#__PURE__*/ (0, import_web$12.template)(`<div><!#><!/><div></div></div>`, 6);
const { ui: { openModal, TextBox, Text: Text$1 }, solid: { createSignal: createSignal$2 } } = shelter;
const installThemeModal = async (addToList) => {
	const [link$1, setLink] = createSignal$2("");
	const [status, setStatus] = createSignal$2("");
	openModal((props) => confirmModal({
		header: "Install Theme",
		body: (() => {
			const _el$ = (0, import_web$13.getNextElement)(_tmpl$$2), _el$3 = _el$.firstChild, [_el$4, _co$] = (0, import_web$14.getNextMarker)(_el$3.nextSibling), _el$2 = _el$4.nextSibling;
			(0, import_web$15.insert)(_el$, (0, import_web$16.createComponent)(TextBox, {
				get value() {
					return link$1();
				},
				onInput: (v) => setLink(v),
				placeholder: "https://raw.githubusercontent.com/.../theme.css"
			}), _el$4, _co$);
			_el$2.style.setProperty("display", "flex");
			_el$2.style.setProperty("justify-content", "center");
			_el$2.style.setProperty("align-items", "center");
			_el$2.style.setProperty("height", "24px");
			(0, import_web$15.insert)(_el$2, (0, import_web$16.createComponent)(Text$1, { get children() {
				return status();
			} }));
			return _el$;
		})(),
		confirmText: "Install",
		type: "neutral",
		onConfirm: async () => {
			const themeName = await installAndLoad(link$1(), setStatus).catch((e) => {
				setStatus(e);
			});
			addToList(themeName);
			props.close();
		},
		onCancel: props.close
	}));
};
const reloadThemes = async () => {
	const themeTag = document.getElementById(`${appName.toLowerCase()}-theme`);
	const themeContents = await invoke("get_themes").catch((e) => console.error(e));
	const themeNames = await invoke("get_enabled_themes").catch((e) => console.error(e)) || [];
	const themeName = themeNames.join("").substring(0, 254);
	if (themeName === "") {
		themeTag.innerHTML = "";
		return;
	}
	const localized = await invoke("localize_imports", {
		css: themeContents,
		name: themeName
	});
	const contents = api.util.cssSanitize(localized);
	themeTag.innerHTML = contents;
};
const installAndLoad = async (link$1, statusUpdater) => {
	statusUpdater("Fetching...");
	const themeName = await invoke("theme_from_link", { link: link$1 });
	statusUpdater(`Applying ${themeName} ...`);
	const config = JSON.parse(await invoke("read_config_file"));
	config?.themes?.push(themeName);
	statusUpdater("Saving...");
	await invoke("write_config_file", { contents: JSON.stringify(config) });
	await reloadThemes();
	statusUpdater("Done!");
	return themeName;
};

//#endregion
//#region plugins/dorion-settings/pages/ThemesPage.tsx
var import_web$4 = __toESM(require_web(), 1);
var import_web$5 = __toESM(require_web(), 1);
var import_web$6 = __toESM(require_web(), 1);
var import_web$7 = __toESM(require_web(), 1);
var import_web$8 = __toESM(require_web(), 1);
var import_web$9 = __toESM(require_web(), 1);
var import_web$10 = __toESM(require_web(), 1);
var import_web$11 = __toESM(require_web(), 1);
const _tmpl$$1 = /*#__PURE__*/ (0, import_web$4.template)(`<div><!#><!/><!#><!/></div>`, 6);
const { ui: { Header: Header$1, Button: Button$1, HeaderTags: HeaderTags$1, injectCss: injectCss$1, Divider, ButtonSizes }, solid: { createSignal: createSignal$1, createEffect: createEffect$1 } } = shelter;
let injectedCss$1 = false;
function ThemesPage() {
	if (!injectedCss$1) {
		injectedCss$1 = true;
		injectCss$1(css$1);
	}
	const [settings, setSettingsState] = createSignal$1(defaultConfig);
	const [themes, setThemes] = createSignal$1([]);
	const getThemes = async () => {
		const themes$1 = await invoke("get_theme_names");
		return themes$1.map((t) => ({
			label: t.replace(/"/g, "").replace(".css", "").replace(".theme", ""),
			value: t.replace(/"/g, "")
		}));
	};
	createEffect$1(async () => {
		const settings$1 = JSON.parse(await invoke("read_config_file"));
		if (!settings$1.themes) settings$1.themes = [];
		setSettingsState(settings$1);
		setThemes(await getThemes());
	});
	const setSettings = (fn) => {
		setSettingsState(fn(settings()));
		invoke("write_config_file", { contents: JSON.stringify(fn(settings())) });
	};
	const openThemesFolder = () => {
		invoke("open_themes");
	};
	const appendTheme = async (last, theme) => {
		if (!theme) return;
		if (theme === "" || theme === "none") {
			setSettings((p) => {
				return {
					...p,
					themes: p.themes.filter((t) => t !== last)
				};
			});
			return;
		}
		setSettings((p) => {
			return {
				...p,
				themes: [...p.themes.filter((t) => t !== last && t !== theme), theme]
			};
		});
	};
	return [
		(0, import_web$11.createComponent)(Header$1, {
			get tag() {
				return HeaderTags$1.H1;
			},
			get ["class"]() {
				return classes$1.tophead;
			},
			children: "Themes"
		}),
		(0, import_web$11.createComponent)(Header$1, {
			get ["class"]() {
				return classes$1.shead;
			},
			children: "Theme"
		}),
		(0, import_web$10.memo)(() => settings().themes.map((theme) => (0, import_web$11.createComponent)(Dropdown, {
			style: "margin-bottom: 8px;",
			key: theme,
			value: theme,
			onChange: (e) => {
				appendTheme(theme, e.target.value);
				reloadThemes();
			},
			get options() {
				return [{
					label: "None",
					value: "none"
				}, ...themes()];
			}
		}))),
		(0, import_web$11.createComponent)(Dropdown, {
			style: "margin-bottom: 8px;",
			value: "",
			onChange: (e) => {
				appendTheme("none", e.target.value);
				reloadThemes();
			},
			placeholder: "Select a theme...",
			get options() {
				return [...themes()];
			},
			immutable: true
		}),
		(0, import_web$11.createComponent)(Divider, {
			mt: 16,
			mb: 16
		}),
		(() => {
			const _el$ = (0, import_web$7.getNextElement)(_tmpl$$1), _el$2 = _el$.firstChild, [_el$3, _co$] = (0, import_web$8.getNextMarker)(_el$2.nextSibling), _el$4 = _el$3.nextSibling, [_el$5, _co$2] = (0, import_web$8.getNextMarker)(_el$4.nextSibling);
			(0, import_web$9.insert)(_el$, (0, import_web$11.createComponent)(Button$1, {
				get size() {
					return ButtonSizes.MEDIUM;
				},
				onClick: () => installThemeModal((theme) => appendTheme("", theme)),
				children: "Install Theme From Link"
			}), _el$3, _co$);
			(0, import_web$9.insert)(_el$, (0, import_web$11.createComponent)(Button$1, {
				get size() {
					return ButtonSizes.MEDIUM;
				},
				onClick: openThemesFolder,
				children: "Open Themes Folder"
			}), _el$5, _co$2);
			(0, import_web$6.effect)(() => (0, import_web$5.className)(_el$, classes$1.pbuttons));
			return _el$;
		})()
	];
}

//#endregion
//#region plugins/dorion-settings/pages/RPC.tsx.scss
const classes = {
	"shead": "ycw7DW_shead",
	"bot16": "ycw7DW_bot16",
	"customNote": "ycw7DW_customNote",
	"customInstallBtn": "ycw7DW_customInstallBtn"
};
const css = `.ycw7DW_shead {
  margin-top: 16px;
  margin-bottom: 8px;
  font-weight: bold;
}

.ycw7DW_bot16 {
  margin-bottom: 16px;
}

.ycw7DW_customInstallBtn {
  width: 100%;
  margin: 20px 0;
  padding: 20px;
}

.ycw7DW_customNote {
  font-size: 14px;
  font-weight: 400;
  color: var(--header-secondary) !important;
}
`;

//#endregion
//#region plugins/dorion-settings/pages/RPC.tsx
var import_web = __toESM(require_web(), 1);
var import_web$1 = __toESM(require_web(), 1);
var import_web$2 = __toESM(require_web(), 1);
var import_web$3 = __toESM(require_web(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web.template)(`<b>You have already installed shelteRPC!</b>`, 2), _tmpl$2 = /*#__PURE__*/ (0, import_web.template)(`<br>`, 1), _tmpl$3 = /*#__PURE__*/ (0, import_web.template)(`<a href="https://github.com/SpikeHD/shelter-plugins?tab=readme-ov-file#shelterpc" target="_blank">shelteRPC</a>`, 2), _tmpl$4 = /*#__PURE__*/ (0, import_web.template)(`<a href="https://github.com/OpenAsar/arRPC" target="_blank">arRPC</a>`, 2), _tmpl$5 = /*#__PURE__*/ (0, import_web.template)(`<a href="https://github.com/LeonardSSH/vscord" target="_blank">VSCord</a>`, 2);
const { ui: { Button, Text, SwitchItem, Header, HeaderTags, injectCss, showToast }, solid: { createSignal, createEffect } } = shelter;
let injectedCss = false;
function RPCPage() {
	const [settings, setSettingsState] = createSignal(defaultConfig);
	const [shelteRPCInstalled, setShelteRPCInstalled] = createSignal(false);
	const [restartRequired, setRestartRequired] = createSignal(false);
	if (!injectedCss) {
		injectedCss = true;
		injectCss(css);
	}
	createEffect(async () => {
		setSettingsState(JSON.parse(await invoke("read_config_file")));
		setShelteRPCInstalled(Object.keys(shelter.plugins.installedPlugins()).includes("shelteRPC"));
		setRestartRequired(window?.__DORION_RESTART__ === true);
	});
	const setSettings = (fn, requiresRestart$1) => {
		setSettingsState(fn(settings()));
		invoke("write_config_file", { contents: JSON.stringify(fn(settings())) });
		if (requiresRestart$1) {
			setRestartRequired(true);
			backendRestartRequired(true);
		}
	};
	const tryInstallShelteRPC = async () => {
		await shelter.plugins.addRemotePlugin("shelteRPC", "https://spikehd.github.io/shelter-plugins/shelteRPC/", true).catch((e) => {
			showToast({
				title: "Dorion RPC",
				content: "Error installing shelteRPC, check the console for more information",
				duration: 3e3
			});
			throw e;
		});
		shelter.plugins.startPlugin("shelteRPC");
		showToast({
			title: "Dorion RPC",
			content: "Successfully installed shelteRPC!",
			duration: 3e3
		});
	};
	return [
		(0, import_web$3.createComponent)(Header, {
			get tag() {
				return HeaderTags.H1;
			},
			get ["class"]() {
				return classes.bot16;
			},
			children: "RPC Settings"
		}),
		(0, import_web$2.memo)((() => {
			const _c$ = (0, import_web$2.memo)(() => !!restartRequired());
			return () => _c$() && (0, import_web$3.createComponent)(WarningCard, {});
		})()),
		(0, import_web$3.createComponent)(Header, {
			get ["class"]() {
				return classes.shead;
			},
			children: "Plugin"
		}),
		(0, import_web$3.createComponent)(Button, {
			onClick: tryInstallShelteRPC,
			get ["class"]() {
				return classes.customInstallBtn;
			},
			get disabled() {
				return shelteRPCInstalled();
			},
			children: "Install the shelteRPC plugin"
		}),
		(0, import_web$3.createComponent)(Text, {
			get ["class"]() {
				return classes.customNote;
			},
			get children() {
				return [(0, import_web$2.memo)(() => (0, import_web$2.memo)(() => !!shelteRPCInstalled())() && [
					(0, import_web$1.getNextElement)(_tmpl$),
					(0, import_web$1.getNextElement)(_tmpl$2),
					(0, import_web$1.getNextElement)(_tmpl$2)
				]), "Installing this is not mandatory, and you may use arRPC plugins (eg. through Vencord) if you'd like, but the shelteRPC plugin has specific extra features that only work in Dorion!"];
			}
		}),
		(0, import_web$3.createComponent)(Header, {
			get ["class"]() {
				return classes.shead;
			},
			children: "Server"
		}),
		(0, import_web$3.createComponent)(SwitchItem, {
			get value() {
				return settings().rpc_server;
			},
			onChange: (v) => setSettings((settings$1) => ({
				...settings$1,
				rpc_server: v
			}), true),
			tooltipNote: "This is a work in progress, and won't do EVERYTHING arRPC does quite yet.",
			get note() {
				return [
					"Enable the integrated RPC server, eliminating the need for a separate arRPC server running. Pairs best with ",
					(0, import_web$1.getNextElement)(_tmpl$3),
					", also works with ",
					(0, import_web$1.getNextElement)(_tmpl$4),
					"."
				];
			},
			children: "Integrated rich presence server"
		}),
		(0, import_web$3.createComponent)(Header, {
			get ["class"]() {
				return classes.shead;
			},
			children: "Advanced Settings"
		}),
		(0, import_web$3.createComponent)(SwitchItem, {
			get value() {
				return settings().rpc_process_scanner;
			},
			onChange: (v) => {
				setSettings((p) => {
					return {
						...p,
						rpc_process_scanner: v
					};
				}, true);
			},
			get disabled() {
				return !settings().rpc_server;
			},
			note: `Enable this if you want ${appName} to scan for running processes. This is the most performance-heavy component of RPC.`,
			children: "Enable Process Scanner"
		}),
		(0, import_web$3.createComponent)(SwitchItem, {
			get value() {
				return settings().rpc_ipc_connector;
			},
			onChange: (v) => {
				setSettings((p) => {
					return {
						...p,
						rpc_ipc_connector: v
					};
				}, true);
			},
			get disabled() {
				return !settings().rpc_server;
			},
			get note() {
				return [
					"Enable this if you want ",
					appName,
					" to connect to local sockets. Things such as the ",
					(0, import_web$1.getNextElement)(_tmpl$5),
					" extension use this method of connection."
				];
			},
			children: "Enable IPC Connector"
		}),
		(0, import_web$3.createComponent)(SwitchItem, {
			get value() {
				return settings().rpc_websocket_connector;
			},
			onChange: (v) => {
				setSettings((p) => {
					return {
						...p,
						rpc_websocket_connector: v
					};
				}, true);
			},
			get disabled() {
				return !settings().rpc_server;
			},
			note: `Enable this if you want ${appName} to accept local websocket connections.`,
			children: "Enable Websocket Connector"
		}),
		(0, import_web$3.createComponent)(SwitchItem, {
			get value() {
				return settings().rpc_secondary_events;
			},
			onChange: (v) => {
				setSettings((p) => {
					return {
						...p,
						rpc_secondary_events: v
					};
				}, true);
			},
			get disabled() {
				return !settings().rpc_server;
			},
			note: `Enable this to allow ${appName} to properly handle server invites opened in the browser. Does not work with arRPC.`,
			children: "Enable secondary events"
		})
	];
}

//#endregion
//#region plugins/dorion-settings/index.tsx
const { settings: { registerSection }, flux: { dispatcher }, util: { sleep } } = shelter;
let settingsUninjects = [];
(async () => {
	const platform = await window.__TAURI__.core.invoke("get_platform");
	settingsUninjects = [
		registerSection("divider"),
		registerSection("header", appName),
		registerSection("section", `${appName}-settings`, `${appName} Settings`, SettingsPage),
		registerSection("section", `${appName}-plugins`, "Plugins", PluginsPage),
		registerSection("section", `${appName}-themes`, "Themes", ThemesPage),
		registerSection("section", `${appName}-performance`, "Performance & Extras", PerformancePage),
		platform !== "macos" && registerSection("section", `${appName}-rpc`, "Rich Presence", RPCPage),
		registerSection("section", `${appName}-profiles`, "Profiles", ProfilesPage)
	];
})();
const appendAppVersion = async () => {
	let tries = 0;
	const infoBoxSelector = "div[class*=\"side_\"] div[class*=\"info_\"]";
	const hash = await invoke("git_hash").catch((e) => console.error(e)) || "";
	while (!document.querySelector(infoBoxSelector)) {
		await sleep(500);
		tries++;
		if (tries > 5) {
			console.error("Failed to find infoBox");
			return;
		}
	}
	const versionThings = document.querySelector(infoBoxSelector);
	const firstChild = versionThings?.firstElementChild;
	const newVersionThing = document.createElement("span");
	if (!firstChild) return;
	newVersionThing.innerHTML = `${appName} v${await app.getVersion()}`;
	if (hash) newVersionThing.innerHTML += ` (${hash.slice(0, 7)})`;
	newVersionThing.classList.add(...firstChild.classList);
	newVersionThing.style.color = firstChild.style.color;
	newVersionThing.style.textTransform = "none";
	versionThings.appendChild(newVersionThing);
};
const checkForUpdates = async () => {
	const updateCheck = await invoke("update_check");
	let needsUpdate = false;
	if (updateCheck.includes("dorion")) needsUpdate = true;
	settingsUninjects.push(registerSection("section", `${appName}-changelog`, "Changelog", ChangelogPage, { badgeCount: needsUpdate ? 1 : 0 }));
};
dispatcher.subscribe("USER_SETTINGS_MODAL_OPEN", appendAppVersion);
checkForUpdates();
const onUnload = () => {
	settingsUninjects.forEach((u) => u && u());
	dispatcher.unsubscribe("USER_SETTINGS_MODAL_OPEN", appendAppVersion);
};

//#endregion
exports.onUnload = onUnload
return exports;
})({});