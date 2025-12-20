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
//#region plugins/dorion-custom-keybinds/components/Keybinds.tsx.scss
const classes$3 = {
	"keybindsButton": "Zz-Z3G_keybindsButton",
	"keybindRestartCard": "Zz-Z3G_keybindRestartCard",
	"keybindSection": "Zz-Z3G_keybindSection",
	"keybindsBanner": "Zz-Z3G_keybindsBanner",
	"keybindsHeader": "Zz-Z3G_keybindsHeader",
	"header": "Zz-Z3G_header",
	"keybindRestartButton": "Zz-Z3G_keybindRestartButton",
	"keybindsSwitch": "Zz-Z3G_keybindsSwitch"
};
const css$3 = `.Zz-Z3G_keybindSection {
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
}

.Zz-Z3G_header {
  margin-bottom: 20px;
}

.Zz-Z3G_keybindsHeader {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  display: flex;
}

.Zz-Z3G_keybindsBanner {
  background-color: var(--info-warning-background);
  border-radius: 4px;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 75%;
  padding: 12px;
  display: flex;
  border: 1px solid var(--status-warning) !important;
}

.Zz-Z3G_keybindsButton {
  height: 100%;
  background-color: var(--brand-500) !important;
  width: 20% !important;
}

.Zz-Z3G_keybindsSwitch {
  width: 100%;
}

.Zz-Z3G_keybindRestartCard {
  background-color: var(--info-warning-background);
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  padding: 16px;
  display: flex;
  border: 1px solid var(--status-warning) !important;
}

.Zz-Z3G_keybindRestartButton {
  margin-top: 8px;
  background-color: var(--status-warning) !important;
  width: 100% !important;
}
`;

//#endregion
//#region plugins/dorion-custom-keybinds/components/KeybindSection.tsx.scss
const classes$2 = {
	"removeButton": "QTLdLq_removeButton",
	"keybindArea": "QTLdLq_keybindArea",
	"actionSection": "QTLdLq_actionSection",
	"keybindSection": "QTLdLq_keybindSection",
	"keybindRoot": "QTLdLq_keybindRoot",
	"note": "QTLdLq_note"
};
const css$2 = `.QTLdLq_keybindRoot {
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
  display: flex;
}

.QTLdLq_keybindSection {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  display: flex;
}

.QTLdLq_actionSection, .QTLdLq_keybindArea {
  flex-direction: column;
  display: flex;
}

.QTLdLq_actionSection {
  width: 50%;
}

.QTLdLq_removeButton {
  opacity: 0;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 20px;
  transition: all .1s ease-in-out;
  display: flex;
}

.QTLdLq_keybindRoot:hover .QTLdLq_removeButton {
  opacity: 1;
}

.QTLdLq_keybindArea {
  width: 50%;
}

.QTLdLq_note {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--header-secondary) !important;
}
`;

//#endregion
//#region components/Dropdown.tsx.scss
const classes$1 = {
	"dcontainer": "sqVpyW_dcontainer",
	"ddown": "sqVpyW_ddown",
	"ddownplaceholder": "sqVpyW_ddownplaceholder",
	"dsarrow": "sqVpyW_dsarrow"
};
const css$1 = `.sqVpyW_ddown {
  box-sizing: border-box;
  width: 100%;
  color: var(--text-default);
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
  color: var(--text-default);
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
var import_web$39 = __toESM(require_web(), 1);
var import_web$40 = __toESM(require_web(), 1);
var import_web$41 = __toESM(require_web(), 1);
var import_web$42 = __toESM(require_web(), 1);
const _tmpl$$4 = /*#__PURE__*/ (0, import_web$39.template)(`<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>`, 4);
const SelectArrow = (props) => (() => {
	const _el$ = (0, import_web$42.getNextElement)(_tmpl$$4);
	(0, import_web$41.effect)(() => (0, import_web$40.setAttribute)(_el$, "class", props.class));
	return _el$;
})();

//#endregion
//#region components/Dropdown.tsx
var import_web$29 = __toESM(require_web(), 1);
var import_web$30 = __toESM(require_web(), 1);
var import_web$31 = __toESM(require_web(), 1);
var import_web$32 = __toESM(require_web(), 1);
var import_web$33 = __toESM(require_web(), 1);
var import_web$34 = __toESM(require_web(), 1);
var import_web$35 = __toESM(require_web(), 1);
var import_web$36 = __toESM(require_web(), 1);
var import_web$37 = __toESM(require_web(), 1);
var import_web$38 = __toESM(require_web(), 1);
const _tmpl$$3 = /*#__PURE__*/ (0, import_web$29.template)(`<div><select><!#><!/><!#><!/></select><!#><!/></div>`, 10), _tmpl$2$2 = /*#__PURE__*/ (0, import_web$29.template)(`<option value=""></option>`, 2), _tmpl$3 = /*#__PURE__*/ (0, import_web$29.template)(`<option></option>`, 2);
const { ui: { injectCss: injectCss$3 } } = shelter;
let injectedCss$3 = false;
const Dropdown = (props) => {
	if (!injectedCss$3) {
		injectedCss$3 = true;
		injectCss$3(css$1);
	}
	return (() => {
		const _el$ = (0, import_web$34.getNextElement)(_tmpl$$3), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, [_el$4, _co$] = (0, import_web$36.getNextMarker)(_el$3.nextSibling), _el$5 = _el$4.nextSibling, [_el$6, _co$2] = (0, import_web$36.getNextMarker)(_el$5.nextSibling), _el$7 = _el$2.nextSibling, [_el$8, _co$3] = (0, import_web$36.getNextMarker)(_el$7.nextSibling);
		_el$2.addEventListener("change", (e) => {
			props.onChange(e);
			if (props.immutable) {
				e.preventDefault();
				e.stopPropagation();
				e.target.value = props.value;
			}
		});
		(0, import_web$37.insert)(_el$2, (() => {
			const _c$ = (0, import_web$38.memo)(() => !!props.placeholder);
			return () => _c$() && (() => {
				const _el$9 = (0, import_web$34.getNextElement)(_tmpl$2$2);
				(0, import_web$37.insert)(_el$9, () => props.placeholder);
				(0, import_web$33.effect)((_p$) => {
					const _v$8 = classes$1.ddownplaceholder, _v$9 = props.value === "";
					_v$8 !== _p$._v$8 && (0, import_web$32.className)(_el$9, _p$._v$8 = _v$8);
					_v$9 !== _p$._v$9 && (_el$9.selected = _p$._v$9 = _v$9);
					return _p$;
				}, {
					_v$8: undefined,
					_v$9: undefined
				});
				return _el$9;
			})();
		})(), _el$4, _co$);
		(0, import_web$37.insert)(_el$2, () => props.options?.map((o) => (() => {
			const _el$0 = (0, import_web$34.getNextElement)(_tmpl$3);
			(0, import_web$37.insert)(_el$0, () => o.label);
			(0, import_web$33.effect)(() => _el$0.selected = o.value === props.value);
			(0, import_web$33.effect)(() => _el$0.value = o.value);
			return _el$0;
		})()), _el$6, _co$2);
		(0, import_web$37.insert)(_el$, (0, import_web$35.createComponent)(SelectArrow, { get ["class"]() {
			return classes$1.dsarrow;
		} }), _el$8, _co$3);
		(0, import_web$33.effect)((_p$) => {
			const _v$ = classes$1.dcontainer, _v$2 = props.style, _v$3 = classes$1.ddown + " " + (props.placeholder && props.value === "" ? classes$1.ddownplaceholder : ""), _v$4 = props.placeholder, _v$5 = props.id, _v$6 = props["aria-label"], _v$7 = props.disabled;
			_v$ !== _p$._v$ && (0, import_web$32.className)(_el$, _p$._v$ = _v$);
			_p$._v$2 = (0, import_web$31.style)(_el$, _v$2, _p$._v$2);
			_v$3 !== _p$._v$3 && (0, import_web$32.className)(_el$2, _p$._v$3 = _v$3);
			_v$4 !== _p$._v$4 && (0, import_web$30.setAttribute)(_el$2, "placeholder", _p$._v$4 = _v$4);
			_v$5 !== _p$._v$5 && (0, import_web$30.setAttribute)(_el$2, "id", _p$._v$5 = _v$5);
			_v$6 !== _p$._v$6 && (0, import_web$30.setAttribute)(_el$2, "aria-label", _p$._v$6 = _v$6);
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
//#region components/KeybindInput.tsx.scss
const classes = {
	"pulse": "N-HDcq_pulse",
	"keybindButton": "N-HDcq_keybindButton",
	"keybindContainer": "N-HDcq_keybindContainer",
	"recording": "N-HDcq_recording",
	"keybindInput": "N-HDcq_keybindInput",
	"keybindPlaceholder": "N-HDcq_keybindPlaceholder"
};
const css = `.N-HDcq_keybindContainer {
  background: var(--input-background);
  width: 100%;
  height: 40px;
  color: var(--text-default);
  border: 1px solid #0000;
  border-radius: 4px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  transition: all .2s;
  display: flex;
}

.N-HDcq_keybindContainer:hover {
  border: 1px solid var(--status-danger);
}

.N-HDcq_recording {
  border: 1px solid var(--status-danger);
  animation: 1s infinite N-HDcq_pulse;
}

.N-HDcq_recording .N-HDcq_keybindButton {
  background: hsl(var(--red-400-hsl) / .1);
  color: var(--status-danger);
}

.N-HDcq_recording .N-HDcq_keybindButton:hover {
  background: hsl(var(--red-400-hsl) / .2);
}

.N-HDcq_keybindInput {
  background: none;
  align-items: center;
  display: flex;
}

.N-HDcq_keybindPlaceholder {
  color: var(--text-muted) !important;
}

.N-HDcq_keybindButton {
  background: var(--button-secondary-background);
  width: 50%;
  height: 30px;
  color: var(--white-500);
  cursor: pointer;
  border: 1px solid #0000;
  border-radius: 4px;
  align-items: center;
  margin: 0;
  padding: 4px;
  transition: all .2s;
  display: flex;
}

.N-HDcq_keybindButton:hover {
  background: var(--button-secondary-background-hover);
}

@keyframes N-HDcq_pulse {
  0% {
    box-shadow: 0 0 10px 0px hsl(var(--red-400-hsl) / .5);
  }

  50% {
    box-shadow: 0 0 10px 4px hsl(var(--red-400-hsl) / .5);
  }

  100% {
    box-shadow: 0 0 10px 0px hsl(var(--red-400-hsl) / .5);
  }
}
`;

//#endregion
//#region components/KeybindInput.tsx
var import_web$19 = __toESM(require_web(), 1);
var import_web$20 = __toESM(require_web(), 1);
var import_web$21 = __toESM(require_web(), 1);
var import_web$22 = __toESM(require_web(), 1);
var import_web$23 = __toESM(require_web(), 1);
var import_web$24 = __toESM(require_web(), 1);
var import_web$25 = __toESM(require_web(), 1);
var import_web$26 = __toESM(require_web(), 1);
var import_web$27 = __toESM(require_web(), 1);
var import_web$28 = __toESM(require_web(), 1);
const _tmpl$$2 = /*#__PURE__*/ (0, import_web$19.template)(`<div><div></div><div></div></div>`, 6);
const { solid: { createSignal: createSignal$2, onCleanup }, ui: { Text: Text$2, injectCss: injectCss$2 } } = shelter;
let injectedCss$2 = false;
function KeybindInput(props) {
	if (!injectedCss$2) {
		injectedCss$2 = true;
		injectCss$2(css);
	}
	const [recording, setRecording] = createSignal$2(false);
	const [keybind, setKeybind] = createSignal$2(props.initialKeybind || []);
	const [keysPressed, setKeysPressed] = createSignal$2([]);
	onCleanup(() => {
		window.removeEventListener("keydown", keyDown);
		window.removeEventListener("keyup", keyUp);
	});
	const keyDown = (e) => {
		const keycode = {
			name: e.key,
			code: e.code
		};
		setKeysPressed([...keysPressed(), keycode]);
		if (keycode.name.length === 1) keycode.name = keycode.name.toUpperCase();
		if (keysPressed().length === 1) {
			setKeybind([keycode]);
			return;
		}
		if (keybind().find((k) => k.code === keycode.code)) return;
		switch (e.key) {
			case "Control":
			case "Alt":
			case "Shift":
			case "Meta":
				setKeybind([keycode, ...keybind()]);
				break;
			default: setKeybind([...keybind(), keycode]);
		}
	};
	const keyUp = (e) => {
		const keycode = {
			name: e.key,
			code: e.code
		};
		setKeysPressed(keysPressed().filter((k) => k.code !== keycode.code));
	};
	const setRecordingState = () => {
		if (recording()) {
			window.removeEventListener("keydown", keyDown);
			window.removeEventListener("keyup", keyUp);
			props.onKeybindChange(keybind());
			setRecording(false);
			return;
		}
		setKeybind([]);
		window.addEventListener("keydown", keyDown);
		window.addEventListener("keyup", keyUp);
		setRecording(true);
	};
	return (() => {
		const _el$ = (0, import_web$24.getNextElement)(_tmpl$$2), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
		(0, import_web$26.insert)(_el$2, (0, import_web$27.createComponent)(Text$2, {
			get ["class"]() {
				return !keybind().length ? classes.keybindPlaceholder : "";
			},
			get children() {
				return (0, import_web$28.memo)(() => !!keybind().length)() ? keybind().map((k, i) => {
					return i === keybind().length - 1 ? k.name : k.name + " + ";
				}) : "No Keybind Set";
			}
		}));
		_el$3.$$click = () => {
			if (props.disabled) return;
			setRecordingState();
		};
		(0, import_web$26.insert)(_el$3, (0, import_web$27.createComponent)(Text$2, { get children() {
			return recording() ? "Stop Recording" : "Edit Keybind";
		} }));
		(0, import_web$23.effect)((_p$) => {
			const _v$ = classes.keybindContainer + " " + (recording() ? classes.recording : null), _v$2 = props.style, _v$3 = classes.keybindInput, _v$4 = classes.keybindButton + " " + (props.disabled ? classes.disabled : "");
			_v$ !== _p$._v$ && (0, import_web$22.className)(_el$, _p$._v$ = _v$);
			_p$._v$2 = (0, import_web$21.style)(_el$, _v$2, _p$._v$2);
			_v$3 !== _p$._v$3 && (0, import_web$22.className)(_el$2, _p$._v$3 = _v$3);
			_v$4 !== _p$._v$4 && (0, import_web$22.className)(_el$3, _p$._v$4 = _v$4);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined,
			_v$3: undefined,
			_v$4: undefined
		});
		(0, import_web$25.runHydrationEvents)();
		return _el$;
	})();
}
(0, import_web$20.delegateEvents)(["click"]);

//#endregion
//#region plugins/dorion-custom-keybinds/components/KeybindSection.tsx
var import_web$9 = __toESM(require_web());
var import_web$10 = __toESM(require_web());
var import_web$11 = __toESM(require_web());
var import_web$12 = __toESM(require_web());
var import_web$13 = __toESM(require_web());
var import_web$14 = __toESM(require_web());
var import_web$15 = __toESM(require_web());
var import_web$16 = __toESM(require_web());
var import_web$17 = __toESM(require_web());
var import_web$18 = __toESM(require_web());
const _tmpl$$1 = /*#__PURE__*/ (0, import_web$9.template)(`<svg width="256" height="256" viewBox="0 0 256 256" style="height: 100%"><g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"><path d="M 11 90 c -2.815 0 -5.63 -1.074 -7.778 -3.222 c -4.295 -4.296 -4.295 -11.261 0 -15.557 l 68 -68 c 4.297 -4.296 11.26 -4.296 15.557 0 c 4.296 4.296 4.296 11.261 0 15.557 l -68 68 C 16.63 88.926 13.815 90 11 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: var(--status-danger); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path><path d="M 79 90 c -2.815 0 -5.63 -1.074 -7.778 -3.222 l -68 -68 c -4.295 -4.296 -4.295 -11.261 0 -15.557 c 4.296 -4.296 11.261 -4.296 15.557 0 l 68 68 c 4.296 4.296 4.296 11.261 0 15.557 C 84.63 88.926 81.815 90 79 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: var(--status-danger); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path></g></svg>`, 8), _tmpl$2$1 = /*#__PURE__*/ (0, import_web$9.template)(`<div><div><div><!#><!/><!#><!/></div><div><!#><!/><!#><!/></div><div></div></div><!#><!/></div>`, 20);
const { ui: { Text: Text$1, HeaderTags, Header, injectCss: injectCss$1 }, solid: { createSignal: createSignal$1 } } = shelter;
const RemoveIcon = (props) => (() => {
	const _el$ = (0, import_web$16.getNextElement)(_tmpl$$1);
	(0, import_web$18.addEventListener)(_el$, "click", props.onClick, true);
	(0, import_web$17.runHydrationEvents)();
	return _el$;
})();
let injectedCss$1 = false;
function KeybindSection(props) {
	if (!injectedCss$1) {
		injectedCss$1 = true;
		injectCss$1(css$2);
	}
	const [keybindType, setKeybindType] = createSignal$1(props.internalName || props.keybind?.key || props.keybindActionTypes[0].value);
	const old = props.keybind;
	return (() => {
		const _el$2 = (0, import_web$16.getNextElement)(_tmpl$2$1), _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$4.firstChild, [_el$6, _co$] = (0, import_web$13.getNextMarker)(_el$5.nextSibling), _el$7 = _el$6.nextSibling, [_el$8, _co$2] = (0, import_web$13.getNextMarker)(_el$7.nextSibling), _el$9 = _el$4.nextSibling, _el$0 = _el$9.firstChild, [_el$1, _co$3] = (0, import_web$13.getNextMarker)(_el$0.nextSibling), _el$10 = _el$1.nextSibling, [_el$11, _co$4] = (0, import_web$13.getNextMarker)(_el$10.nextSibling), _el$12 = _el$9.nextSibling, _el$13 = _el$3.nextSibling, [_el$14, _co$5] = (0, import_web$13.getNextMarker)(_el$13.nextSibling);
		(0, import_web$14.insert)(_el$4, (0, import_web$15.createComponent)(Header, {
			get size() {
				return HeaderTags.H5;
			},
			children: "Action"
		}), _el$6, _co$);
		(0, import_web$14.insert)(_el$4, (0, import_web$15.createComponent)(Dropdown, {
			get value() {
				return props.internalName || props.keybind?.key || props.keybindActionTypes[0].value;
			},
			get options() {
				return props.keybindActionTypes;
			},
			onChange: (e) => {
				setKeybindType(e.target.value);
				props.onKeybindChange({
					keys: props.keybind.keys || [],
					key: e.target.value
				}, old);
			},
			style: "width: 90%"
		}), _el$8, _co$2);
		(0, import_web$14.insert)(_el$9, (0, import_web$15.createComponent)(Header, {
			get size() {
				return HeaderTags.H5;
			},
			children: "Keybind"
		}), _el$1, _co$3);
		(0, import_web$14.insert)(_el$9, (0, import_web$15.createComponent)(KeybindInput, {
			get initialKeybind() {
				return props.keybind.keys || [];
			},
			onKeybindChange: (keybind) => {
				props.onKeybindChange({
					keys: keybind,
					key: keybindType()
				}, old);
			},
			style: "width: 100%"
		}), _el$11, _co$4);
		(0, import_web$14.insert)(_el$12, (0, import_web$15.createComponent)(RemoveIcon, { onClick: () => props.onKeybindRemove(old) }));
		(0, import_web$14.insert)(_el$2, (0, import_web$15.createComponent)(Text$1, {
			get ["class"]() {
				return classes$2.note;
			},
			get children() {
				return props.keybindDescriptions[keybindType()];
			}
		}), _el$14, _co$5);
		(0, import_web$12.effect)((_p$) => {
			const _v$ = classes$2.keybindRoot, _v$2 = classes$2.keybindSection, _v$3 = classes$2.actionSection, _v$4 = classes$2.keybindArea, _v$5 = classes$2.removeButton;
			_v$ !== _p$._v$ && (0, import_web$11.className)(_el$2, _p$._v$ = _v$);
			_v$2 !== _p$._v$2 && (0, import_web$11.className)(_el$3, _p$._v$2 = _v$2);
			_v$3 !== _p$._v$3 && (0, import_web$11.className)(_el$4, _p$._v$3 = _v$3);
			_v$4 !== _p$._v$4 && (0, import_web$11.className)(_el$9, _p$._v$4 = _v$4);
			_v$5 !== _p$._v$5 && (0, import_web$11.className)(_el$12, _p$._v$5 = _v$5);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined,
			_v$3: undefined,
			_v$4: undefined,
			_v$5: undefined
		});
		return _el$2;
	})();
}
(0, import_web$10.delegateEvents)(["click"]);

//#endregion
//#region plugins/dorion-custom-keybinds/components/Keybinds.tsx
var import_web$1 = __toESM(require_web());
var import_web$2 = __toESM(require_web());
var import_web$3 = __toESM(require_web());
var import_web$4 = __toESM(require_web());
var import_web$5 = __toESM(require_web());
var import_web$6 = __toESM(require_web());
var import_web$7 = __toESM(require_web());
var import_web$8 = __toESM(require_web());
const _tmpl$ = /*#__PURE__*/ (0, import_web$1.template)(`<div><!#><!/><div><div></div><!#><!/></div><div></div><!#><!/></div>`, 14), _tmpl$2 = /*#__PURE__*/ (0, import_web$1.template)(`<div><!#><!/><!#><!/></div>`, 6);
const { ui: { Button, Text, SwitchItem, injectCss }, solid: { createSignal, createEffect } } = shelter;
let injectedCss = false;
function Keybinds(props) {
	if (!injectedCss) {
		injectedCss = true;
		injectCss(css$3);
	}
	const [keybindsEnabled, setKeybindsEnabled] = createSignal(false);
	const [keybindEnabledChanged, setKeybindEnabledChanged] = createSignal(false);
	const [keybindSections, setKeybindSections] = createSignal([]);
	createEffect(async () => {
		const keybinds = await invoke("get_keybinds");
		const config = await invoke("get_config");
		const sections = Object.keys(keybinds).map((key) => ({
			key,
			keys: keybinds[key]
		}));
		setKeybindSections(sections);
		setKeybindsEnabled(config.keybinds_enabled ?? false);
	}, []);
	const updateKeybinds = (keybinds) => {
		setKeybindSections(keybinds);
		event.emit("keybinds_changed", keybinds);
	};
	return (() => {
		const _el$ = (0, import_web$4.getNextElement)(_tmpl$), _el$7 = _el$.firstChild, [_el$8, _co$2] = (0, import_web$5.getNextMarker)(_el$7.nextSibling), _el$2 = _el$8.nextSibling, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, [_el$5, _co$] = (0, import_web$5.getNextMarker)(_el$4.nextSibling), _el$6 = _el$2.nextSibling, _el$9 = _el$6.nextSibling, [_el$0, _co$3] = (0, import_web$5.getNextMarker)(_el$9.nextSibling);
		(0, import_web$6.insert)(_el$, (() => {
			const _c$ = (0, import_web$8.memo)(() => !!keybindEnabledChanged());
			return () => _c$() && (() => {
				const _el$1 = (0, import_web$4.getNextElement)(_tmpl$2), _el$10 = _el$1.firstChild, [_el$11, _co$4] = (0, import_web$5.getNextMarker)(_el$10.nextSibling), _el$12 = _el$11.nextSibling, [_el$13, _co$5] = (0, import_web$5.getNextMarker)(_el$12.nextSibling);
				(0, import_web$6.insert)(_el$1, (0, import_web$7.createComponent)(Text, { children: "Enabling or disabling global keybinds requires a restart to take effect." }), _el$11, _co$4);
				(0, import_web$6.insert)(_el$1, (0, import_web$7.createComponent)(Button, {
					get ["class"]() {
						return classes$3.keybindRestartButton;
					},
					grow: true,
					onClick: () => {
						process.relaunch();
					},
					children: "Restart"
				}), _el$13, _co$5);
				(0, import_web$3.effect)(() => (0, import_web$2.className)(_el$1, classes$3.keybindRestartCard));
				return _el$1;
			})();
		})(), _el$8, _co$2);
		(0, import_web$6.insert)(_el$3, (0, import_web$7.createComponent)(Text, { children: "Global keybinds are an experimental feature!" }));
		(0, import_web$6.insert)(_el$2, (0, import_web$7.createComponent)(Button, {
			get ["class"]() {
				return classes$3.keybindsButton;
			},
			grow: true,
			onClick: () => {
				if (keybindSections().length >= props.keybindActionTypes.length) return;
				updateKeybinds([...keybindSections(), {
					key: "UNASSIGNED",
					keys: []
				}]);
			},
			children: "Add Keybind"
		}), _el$5, _co$);
		(0, import_web$6.insert)(_el$6, (0, import_web$7.createComponent)(SwitchItem, {
			get value() {
				return keybindsEnabled();
			},
			onChange: async (value) => {
				setKeybindsEnabled(value);
				setKeybindEnabledChanged(true);
				invoke("set_config", { config: {
					...await invoke("get_config"),
					keybinds_enabled: value
				} });
			},
			note: "Enable or disable global keybinds. Requires restart.",
			children: "Enable Global Keybinds"
		}));
		(0, import_web$6.insert)(_el$, () => keybindSections().map((section, idx) => (0, import_web$7.createComponent)(KeybindSection, {
			key: idx,
			get keybindActionTypes() {
				return props.keybindActionTypes.filter((type) => {
					if (section.key === "UNASSIGNED" || section.key === type.value) return true;
					return !keybindSections().some((keybind) => keybind.key === type.value);
				});
			},
			get keybindDescriptions() {
				return props.keybindDescriptions;
			},
			keybind: section,
			onKeybindChange: (keybind, old) => {
				if (keybind.key === old.key) {
					updateKeybinds(keybindSections().map((bind) => {
						if (bind.key === keybind.key) return keybind;
						return bind;
					}));
					return;
				}
				const newKeybinds = keybindSections().filter((bind) => bind.key !== keybind.key && bind.key !== old.key);
				newKeybinds.push(keybind);
				updateKeybinds(newKeybinds);
			},
			onKeybindRemove: (keybind) => {
				updateKeybinds(keybindSections().filter((bind) => bind.key !== keybind.key));
			}
		})), _el$0, _co$3);
		(0, import_web$3.effect)((_p$) => {
			const _v$ = classes$3.keybindSection, _v$2 = classes$3.keybindsHeader, _v$3 = classes$3.keybindsBanner, _v$4 = classes$3.keybindsSwitch;
			_v$ !== _p$._v$ && (0, import_web$2.className)(_el$, _p$._v$ = _v$);
			_v$2 !== _p$._v$2 && (0, import_web$2.className)(_el$2, _p$._v$2 = _v$2);
			_v$3 !== _p$._v$3 && (0, import_web$2.className)(_el$3, _p$._v$3 = _v$3);
			_v$4 !== _p$._v$4 && (0, import_web$2.className)(_el$6, _p$._v$4 = _v$4);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined,
			_v$3: undefined,
			_v$4: undefined
		});
		return _el$;
	})();
}

//#endregion
//#region plugins/dorion-custom-keybinds/util/actionMap.ts
const { flux: { stores } } = shelter;
const keybindActions = {
	"UNASSIGNED": {},
	"TOGGLE_MUTE": { press: [{
		type: "AUDIO_TOGGLE_SELF_MUTE",
		context: "default",
		syncRemote: true,
		skipMuteUnmuteSoundEffect: false
	}] },
	"TOGGLE_DEAFEN": { press: [{
		type: "AUDIO_TOGGLE_SELF_DEAF",
		context: "default",
		syncRemote: true
	}] },
	"TOGGLE_STREAMER_MODE": {
		storeValue: {
			store: "StreamerModeStore",
			key: "enabled",
			eventKey: "value",
			modify: (event$1, store) => {
				event$1["value"] = !store["enabled"];
				return event$1;
			}
		},
		press: [{
			type: "STREAMER_MODE_UPDATE",
			key: "enabled"
		}]
	},
	"TOGGLE_VOICE_MODE": {
		storeValue: {
			store: "MediaEngineStore",
			key: "getMode",
			eventKey: "mode",
			modify: (event$1, store) => {
				event$1["mode"] = store["getMode"]() === "PUSH_TO_TALK" ? "VOICE_ACTIVITY" : "PUSH_TO_TALK";
				event$1["options"] = store["getModeOptions"]() || {};
				return event$1;
			}
		},
		press: [{
			type: "AUDIO_SET_MODE",
			context: "default"
		}]
	},
	"PUSH_TO_TALK": {
		storeValue: {
			store: "UserStore",
			key: "",
			eventKey: "userId",
			modify: (event$1, store) => {
				if (event$1.type === "SPEAKING") event$1["userId"] = store["getCurrentUser"]().id;
				if (event$1.type === "PUSH_TO_TALK_STATE_CHANGE") stores.MediaEngineStore?.getMediaEngine().eachConnection((c) => c.setForceAudioInput(event$1.isActive, event$1.isPriority, false));
				return event$1;
			}
		},
		press: [{
			type: "SPEAKING",
			context: "default",
			speakingFlags: 1
		}, {
			type: "PUSH_TO_TALK_STATE_CHANGE",
			isActive: true,
			isPriority: false,
			isLatched: true
		}],
		release: [{
			type: "SPEAKING",
			context: "default",
			speakingFlags: 0
		}, {
			type: "PUSH_TO_TALK_STATE_CHANGE",
			isActive: false,
			isPriority: false,
			isLatched: false
		}]
	},
	"PUSH_TO_TALK_PRIORITY": {
		storeValue: {
			store: "UserStore",
			key: "",
			eventKey: "userId",
			modify: (event$1, store) => {
				event$1["userId"] = store["getCurrentUser"]().id;
				return event$1;
			}
		},
		press: [{
			type: "SPEAKING",
			context: "default",
			speakingFlags: 4
		}, {
			type: "PUSH_TO_TALK_STATE_CHANGE",
			isActive: true,
			isPriority: true,
			isLatched: true
		}],
		release: [{
			type: "SPEAKING",
			context: "default",
			speakingFlags: 0
		}, {
			type: "PUSH_TO_TALK_STATE_CHANGE",
			isActive: false,
			isPriority: false,
			isLatched: false
		}]
	},
	"PUSH_TO_MUTE": {
		press: [{
			type: "AUDIO_TOGGLE_SELF_MUTE",
			context: "default",
			syncRemote: true,
			skipMuteUnmuteSoundEffect: true
		}],
		release: [{
			type: "AUDIO_TOGGLE_SELF_MUTE",
			context: "default",
			syncRemote: true,
			skipMuteUnmuteSoundEffect: true
		}]
	}
};

//#endregion
//#region plugins/dorion-custom-keybinds/util/events.ts
const { flux: { dispatcher: FluxDispatcher$1 } } = shelter;
const events = [];
const register = () => {
	events.push(event.listen("keybind_pressed", (e) => {
		const key = e.payload;
		const action = keybindActions?.[key];
		if (!action || !action.press) return;
		for (const press of action.press) {
			let e$1 = press;
			if (action.storeValue) {
				const { store, modify } = action.storeValue;
				const storeInstance = shelter.flux.stores[store];
				e$1 = modify(e$1, storeInstance);
			}
			FluxDispatcher$1.dispatch(e$1);
		}
	}));
	events.push(event.listen("keybind_released", (e) => {
		const key = e.payload;
		const action = keybindActions?.[key];
		if (!action || !action.release) return;
		for (const release of action.release) {
			let e$1 = release;
			if (action.storeValue) {
				const { store, modify } = action.storeValue;
				const storeInstance = shelter.flux.stores[store];
				e$1 = modify(e$1, storeInstance);
			}
			FluxDispatcher$1.dispatch(release);
		}
	}));
};
const unregister = () => {
	events.forEach((e) => e());
};

//#endregion
//#region plugins/dorion-custom-keybinds/index.tsx
var import_web = __toESM(require_web());
const { flux: { dispatcher: FluxDispatcher }, observeDom, ui: { ReactiveRoot } } = shelter;
let child = null;
const viewedKeybindsCallback = (e) => {
	if (e.section !== "Keybinds") {
		if (child) {
			child.remove();
			child = null;
		}
		return;
	}
	const unsub = observeDom("#keybinds-tab", () => {
		unsub();
		const oldElm = document.querySelector("div[class*=\"browserNotice_\"");
		const owner = shelter.util.getFiberOwner(oldElm);
		const keybindsArea = oldElm.parentElement;
		oldElm.style.display = "none";
		const divider = keybindsArea.parentElement.parentElement.querySelector("div[class*=\"divider_\"]");
		if (divider) divider.style.display = "none";
		const defaultKeybinds = keybindsArea.parentElement.parentElement.querySelector("div[class*=\"marginTop\"]");
		if (defaultKeybinds) defaultKeybinds.style.marginTop = "0";
		child = keybindsArea.appendChild((0, import_web.createComponent)(ReactiveRoot, { get children() {
			return (0, import_web.createComponent)(Keybinds, {
				get keybindActionTypes() {
					return owner.keybindActionTypes.filter((k) => k.value !== "PUSH_TO_TALK");
				},
				get keybindDescriptions() {
					return owner.keybindDescriptions;
				}
			});
		} }));
	});
};
const subscriptions = [FluxDispatcher.subscribe("USER_SETTINGS_MODAL_SET_SECTION", viewedKeybindsCallback)];
register();
const onUnload = () => {
	for (const unsub of subscriptions) unsub();
	unregister();
};

//#endregion
exports.onUnload = onUnload
return exports;
})({});