(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b ||= {})
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // shltr-res-ns:solid-js/web
  var require_web = __commonJS({
    "shltr-res-ns:solid-js/web"(exports, module) {
      module.exports = shelter.solidWeb;
    }
  });

  // plugins/dorion-custom-keybinds/index.tsx
  var dorion_custom_keybinds_exports = {};
  __export(dorion_custom_keybinds_exports, {
    onUnload: () => onUnload
  });
  var import_web34 = __toESM(require_web());

  // plugins/dorion-custom-keybinds/components/Keybinds.tsx
  var import_web28 = __toESM(require_web());
  var import_web29 = __toESM(require_web());
  var import_web30 = __toESM(require_web());
  var import_web31 = __toESM(require_web());
  var import_web32 = __toESM(require_web());
  var import_web33 = __toESM(require_web());

  // api/dorion.ts
  var dorion_default = {
    name: "Dorion",
    invoke: (name, payload) => {
      var _a;
      if ((_a = window.__TAURI__) == null ? void 0 : _a.invoke) {
        return window.__TAURI__.invoke(name, payload);
      } else {
        return window.__TAURI__.core.invoke(name, payload);
      }
    },
    event: {
      emit: (name, payload) => {
        return window.__TAURI__.event.emit(name, payload);
      },
      listen: (name, callback) => __async(void 0, null, function* () {
        return window.__TAURI__.event.listen(name, callback);
      })
    },
    app: {
      getVersion: () => {
        return window.__TAURI__.app.getVersion();
      }
    },
    process: {
      relaunch: () => {
        return window.__TAURI__.process.relaunch();
      }
    },
    apiWindow: {
      appWindow: {
        setFullscreen: (isFullscreen) => {
          var _a, _b;
          if ((_b = (_a = window.__TAURI__) == null ? void 0 : _a.webviewWindow) == null ? void 0 : _b.getCurrentWebviewWindow) {
            return window.__TAURI__.webviewWindow.getCurrentWebviewWindow().setFullscreen(isFullscreen);
          } else {
            return window.__TAURI__.window.appWindow.setFullscreen(isFullscreen);
          }
        }
      }
    }
  };

  // api/flooed.ts
  var flooed_default = {
    name: "Flooed",
    invoke: (name, payload) => {
      return window.Flooed.invoke(name, payload);
    },
    event: {
      // emit: (name: string, payload: any) => {
      //   return
      // },
      // listen: async (name: string, callback: (payload: any) => void) => {
      //   return
      // }
      emit: () => {
      },
      listen: () => __async(void 0, null, function* () {
      })
    },
    app: {
      getVersion: () => {
        return window.Flooed.version;
      }
    },
    process: {
      relaunch: () => {
        return window.Flooed.invoke("relaunch");
      }
    },
    apiWindow: {
      appWindow: {
        setFullscreen: (isFullscreen) => {
          return window.Flooed.invoke("set_fullscreen", isFullscreen);
        }
      }
    }
  };

  // api/none.ts
  var none_default = {
    name: "Unknown",
    /* stub */
    invoke: () => __async(void 0, null, function* () {
    }),
    event: {
      emit: () => {
      },
      listen: () => __async(void 0, null, function* () {
      })
    },
    app: {
      getVersion: () => "0.0.0"
    },
    process: {
      relaunch: () => {
      }
    },
    apiWindow: {
      appWindow: {
        setFullscreen: () => {
        }
      }
    }
  };

  // api/api.ts
  var backendName = "None";
  if (window.Dorion) {
    backendName = "Dorion";
  } else if (window.Flooed) {
    backendName = "Flooed";
  }
  var backendObj;
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
  var api = window[backendName];
  var appName = backendObj.name;
  var invoke = backendObj.invoke;
  var event = backendObj.event;
  var app = backendObj.app;
  var process = backendObj.process;
  var apiWindow = backendObj.apiWindow;

  // plugins/dorion-custom-keybinds/components/Keybinds.tsx.scss
  var css = `._keybindSection_1rgyd_1{width:100%;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;margin-bottom:20px}._header_1rgyd_1{margin-bottom:20px}._keybindsHeader_1rgyd_1{width:100%;height:40px;margin-bottom:20px;display:flex;flex-direction:row;justify-content:space-between;align-items:center}._keybindsBanner_1rgyd_1{display:flex;flex-direction:column;justify-content:space-around;align-items:flex-start;width:75%;border-radius:4px;border:1px solid var(--status-warning) !important;background-color:var(--info-warning-background);padding:12px}._keybindsButton_1rgyd_1{width:20% !important;height:100%;background-color:var(--brand-500) !important}._keybindsSwitch_1rgyd_1{width:100%}._keybindRestartCard_1rgyd_1{display:flex;flex-direction:column;justify-content:space-around;align-items:center;border:1px solid var(--status-warning) !important;background-color:var(--info-warning-background);padding:16px;width:100%;margin-bottom:20px}._keybindRestartButton_1rgyd_1{width:100% !important;background-color:var(--status-warning) !important;margin-top:8px}`;
  var classes = {
    "keybindSection": "_keybindSection_1rgyd_1",
    "header": "_header_1rgyd_1",
    "keybindsHeader": "_keybindsHeader_1rgyd_1",
    "keybindsBanner": "_keybindsBanner_1rgyd_1",
    "keybindsButton": "_keybindsButton_1rgyd_1",
    "keybindsSwitch": "_keybindsSwitch_1rgyd_1",
    "keybindRestartCard": "_keybindRestartCard_1rgyd_1",
    "keybindRestartButton": "_keybindRestartButton_1rgyd_1"
  };

  // plugins/dorion-custom-keybinds/components/KeybindSection.tsx
  var import_web20 = __toESM(require_web());
  var import_web21 = __toESM(require_web());
  var import_web22 = __toESM(require_web());
  var import_web23 = __toESM(require_web());
  var import_web24 = __toESM(require_web());
  var import_web25 = __toESM(require_web());
  var import_web26 = __toESM(require_web());
  var import_web27 = __toESM(require_web());

  // plugins/dorion-custom-keybinds/components/KeybindSection.tsx.scss
  var css2 = `._keybindRoot_1bqau_1{display:flex;flex-direction:column;width:100%;margin-bottom:16px}._keybindSection_1bqau_1{width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center}._actionSection_1bqau_1,._keybindArea_1bqau_1{display:flex;flex-direction:column}._actionSection_1bqau_1{width:50%}._removeButton_1bqau_1{width:10%;height:20px;display:flex;justify-content:center;align-items:center;opacity:0;transition:all .1s ease-in-out;cursor:pointer}._keybindRoot_1bqau_1:hover ._removeButton_1bqau_1{opacity:1}._keybindArea_1bqau_1{width:50%}._note_1bqau_1{margin-top:8px;color:var(--header-secondary) !important;font-size:14px;line-height:20px;font-weight:400}`;
  var classes2 = {
    "keybindRoot": "_keybindRoot_1bqau_1",
    "keybindSection": "_keybindSection_1bqau_1",
    "actionSection": "_actionSection_1bqau_1",
    "keybindArea": "_keybindArea_1bqau_1",
    "removeButton": "_removeButton_1bqau_1",
    "note": "_note_1bqau_1"
  };

  // components/Dropdown.tsx
  var import_web4 = __toESM(require_web(), 1);
  var import_web5 = __toESM(require_web(), 1);
  var import_web6 = __toESM(require_web(), 1);
  var import_web7 = __toESM(require_web(), 1);
  var import_web8 = __toESM(require_web(), 1);
  var import_web9 = __toESM(require_web(), 1);
  var import_web10 = __toESM(require_web(), 1);
  var import_web11 = __toESM(require_web(), 1);

  // components/Dropdown.tsx.scss
  var css3 = `._ddown_1njos_1{box-sizing:border-box;font-size:16px;width:100%;border-radius:4px;color:var(--text-normal);background-color:var(--input-background);border:none;transition:border-color .2s ease-in-out;padding:10px;appearance:none;cursor:pointer}._dcontainer_1njos_1{position:relative;width:100%}._dsarrow_1njos_1{position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none}._dsarrow_1njos_1 path{fill:var(--header-secondary)}`;
  var classes3 = {
    "ddown": "_ddown_1njos_1",
    "dcontainer": "_dcontainer_1njos_1",
    "dsarrow": "_dsarrow_1njos_1"
  };

  // components/SelectArrow.tsx
  var import_web = __toESM(require_web(), 1);
  var import_web2 = __toESM(require_web(), 1);
  var import_web3 = __toESM(require_web(), 1);
  var _tmpl$ = /* @__PURE__ */ (0, import_web.template)(`<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>`, 4);
  var SelectArrow = (props) => (() => {
    const _el$ = _tmpl$.cloneNode(true);
    (0, import_web3.effect)(() => (0, import_web2.setAttribute)(_el$, "class", props.class));
    return _el$;
  })();

  // components/Dropdown.tsx
  var _tmpl$2 = /* @__PURE__ */ (0, import_web4.template)(`<div><select></select></div>`, 4);
  var _tmpl$22 = /* @__PURE__ */ (0, import_web4.template)(`<option></option>`, 2);
  var {
    ui: {
      injectCss
    }
  } = shelter;
  var injectedCss = false;
  var Dropdown = (props) => {
    if (!injectedCss) {
      injectedCss = true;
      injectCss(css3);
    }
    return (() => {
      const _el$ = _tmpl$2.cloneNode(true), _el$2 = _el$.firstChild;
      (0, import_web10.addEventListener)(_el$2, "change", props.onChange);
      (0, import_web9.insert)(_el$2, () => {
        var _a;
        return (_a = props.options) == null ? void 0 : _a.map((o) => (() => {
          const _el$3 = _tmpl$22.cloneNode(true);
          (0, import_web9.insert)(_el$3, () => o.label);
          (0, import_web11.effect)(() => _el$3.selected = o.value === (props == null ? void 0 : props.selected));
          (0, import_web11.effect)(() => _el$3.value = o.value);
          return _el$3;
        })());
      });
      (0, import_web9.insert)(_el$, (0, import_web8.createComponent)(SelectArrow, {
        get ["class"]() {
          return classes3.dsarrow;
        }
      }), null);
      (0, import_web11.effect)((_p$) => {
        const _v$ = classes3.dcontainer, _v$2 = props.style, _v$3 = classes3.ddown, _v$4 = props.placeholder, _v$5 = props.id, _v$6 = props["aria-label"], _v$7 = props.disabled;
        _v$ !== _p$._v$ && (0, import_web7.className)(_el$, _p$._v$ = _v$);
        _p$._v$2 = (0, import_web6.style)(_el$, _v$2, _p$._v$2);
        _v$3 !== _p$._v$3 && (0, import_web7.className)(_el$2, _p$._v$3 = _v$3);
        _v$4 !== _p$._v$4 && (0, import_web5.setAttribute)(_el$2, "placeholder", _p$._v$4 = _v$4);
        _v$5 !== _p$._v$5 && (0, import_web5.setAttribute)(_el$2, "id", _p$._v$5 = _v$5);
        _v$6 !== _p$._v$6 && (0, import_web5.setAttribute)(_el$2, "aria-label", _p$._v$6 = _v$6);
        _v$7 !== _p$._v$7 && (_el$2.disabled = _p$._v$7 = _v$7);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0,
        _v$3: void 0,
        _v$4: void 0,
        _v$5: void 0,
        _v$6: void 0,
        _v$7: void 0
      });
      (0, import_web11.effect)(() => _el$2.value = props.value);
      return _el$;
    })();
  };

  // components/KeybindInput.tsx
  var import_web12 = __toESM(require_web(), 1);
  var import_web13 = __toESM(require_web(), 1);
  var import_web14 = __toESM(require_web(), 1);
  var import_web15 = __toESM(require_web(), 1);
  var import_web16 = __toESM(require_web(), 1);
  var import_web17 = __toESM(require_web(), 1);
  var import_web18 = __toESM(require_web(), 1);
  var import_web19 = __toESM(require_web(), 1);

  // components/KeybindInput.tsx.scss
  var css4 = `._keybindContainer_z5eo4_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;height:40px;border-radius:4px;background:var(--input-background);color:var(--text-normal);border:1px solid rgba(0,0,0,0);padding:4px;transition:all .2s}._keybindContainer_z5eo4_1:hover{border:1px solid var(--status-danger)}._recording_z5eo4_1{border:1px solid var(--status-danger);animation:_pulse_z5eo4_1 1s infinite}._recording_z5eo4_1 ._keybindButton_z5eo4_1{background:hsl(var(--red-400-hsl)/0.1);color:var(--status-danger)}._recording_z5eo4_1 ._keybindButton_z5eo4_1:hover{background:hsl(var(--red-400-hsl)/0.2)}._keybindInput_z5eo4_1{background:rgba(0,0,0,0);display:flex;align-items:center}._keybindPlaceholder_z5eo4_1{color:var(--text-muted) !important}._keybindButton_z5eo4_1{height:30px;width:50%;margin:0;padding:4px;border-radius:4px;display:flex;align-items:center;background:var(--button-secondary-background);color:var(--white-500);border:1px solid rgba(0,0,0,0);cursor:pointer;transition:all .2s}._keybindButton_z5eo4_1:hover{background:var(--button-secondary-background-hover)}@keyframes _pulse_z5eo4_1{0%{box-shadow:0 0 10px 0px hsl(var(--red-400-hsl)/0.5)}50%{box-shadow:0 0 10px 4px hsl(var(--red-400-hsl)/0.5)}100%{box-shadow:0 0 10px 0px hsl(var(--red-400-hsl)/0.5)}}`;
  var classes4 = {
    "keybindContainer": "_keybindContainer_z5eo4_1",
    "recording": "_recording_z5eo4_1",
    "pulse": "_pulse_z5eo4_1",
    "keybindButton": "_keybindButton_z5eo4_1",
    "keybindInput": "_keybindInput_z5eo4_1",
    "keybindPlaceholder": "_keybindPlaceholder_z5eo4_1"
  };

  // components/KeybindInput.tsx
  var _tmpl$3 = /* @__PURE__ */ (0, import_web12.template)(`<div><div></div><div></div></div>`, 6);
  var {
    solid: {
      createSignal,
      onCleanup
    },
    ui: {
      Text,
      injectCss: injectCss2
    }
  } = shelter;
  var injectedCss2 = false;
  function KeybindInput(props) {
    if (!injectedCss2) {
      injectedCss2 = true;
      injectCss2(css4);
    }
    const [recording, setRecording] = createSignal(false);
    const [keybind, setKeybind] = createSignal(props.initialKeybind || []);
    const [keysPressed, setKeysPressed] = createSignal([]);
    onCleanup(() => {
      window.removeEventListener("keydown", keyDown), window.removeEventListener("keyup", keyUp);
    });
    const keyDown = (e) => {
      const keycode = {
        name: e.key,
        code: e.code
      };
      setKeysPressed([...keysPressed(), keycode]);
      if (keycode.name.length === 1) {
        keycode.name = keycode.name.toUpperCase();
      }
      if (keysPressed().length === 1) {
        setKeybind([keycode]);
        return;
      }
      if (keybind().find((k) => k.code === keycode.code)) {
        return;
      }
      switch (e.key) {
        case "Control":
        case "Alt":
        case "Shift":
        case "Meta":
          setKeybind([keycode, ...keybind()]);
          break;
        default:
          setKeybind([...keybind(), keycode]);
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
        window.removeEventListener("keydown", keyDown), window.removeEventListener("keyup", keyUp);
        props.onKeybindChange(keybind());
        setRecording(false);
        return;
      }
      setKeybind([]);
      window.addEventListener("keydown", keyDown), window.addEventListener("keyup", keyUp);
      setRecording(true);
    };
    return (() => {
      const _el$ = _tmpl$3.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
      (0, import_web17.insert)(_el$2, (0, import_web18.createComponent)(Text, {
        get ["class"]() {
          return !keybind().length ? classes4.keybindPlaceholder : "";
        },
        get children() {
          return (0, import_web19.memo)(() => !!keybind().length)() ? keybind().map((k, i) => {
            return i === keybind().length - 1 ? k.name : k.name + " + ";
          }) : "No Keybind Set";
        }
      }));
      _el$3.$$click = () => {
        if (props.disabled)
          return;
        setRecordingState();
      };
      (0, import_web17.insert)(_el$3, (0, import_web18.createComponent)(Text, {
        get children() {
          return recording() ? "Stop Recording" : "Edit Keybind";
        }
      }));
      (0, import_web16.effect)((_p$) => {
        const _v$ = classes4.keybindContainer + " " + (recording() ? classes4.recording : null), _v$2 = props.style, _v$3 = classes4.keybindInput, _v$4 = classes4.keybindButton + " " + (props.disabled ? classes4.disabled : "");
        _v$ !== _p$._v$ && (0, import_web15.className)(_el$, _p$._v$ = _v$);
        _p$._v$2 = (0, import_web14.style)(_el$, _v$2, _p$._v$2);
        _v$3 !== _p$._v$3 && (0, import_web15.className)(_el$2, _p$._v$3 = _v$3);
        _v$4 !== _p$._v$4 && (0, import_web15.className)(_el$3, _p$._v$4 = _v$4);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0,
        _v$3: void 0,
        _v$4: void 0
      });
      return _el$;
    })();
  }
  (0, import_web13.delegateEvents)(["click"]);

  // plugins/dorion-custom-keybinds/components/KeybindSection.tsx
  var _tmpl$4 = /* @__PURE__ */ (0, import_web20.template)(`<svg width="256" height="256" viewBox="0 0 256 256" style="height: 100%"><g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"><path d="M 11 90 c -2.815 0 -5.63 -1.074 -7.778 -3.222 c -4.295 -4.296 -4.295 -11.261 0 -15.557 l 68 -68 c 4.297 -4.296 11.26 -4.296 15.557 0 c 4.296 4.296 4.296 11.261 0 15.557 l -68 68 C 16.63 88.926 13.815 90 11 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: var(--status-danger); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path><path d="M 79 90 c -2.815 0 -5.63 -1.074 -7.778 -3.222 l -68 -68 c -4.295 -4.296 -4.295 -11.261 0 -15.557 c 4.296 -4.296 11.261 -4.296 15.557 0 l 68 68 c 4.296 4.296 4.296 11.261 0 15.557 C 84.63 88.926 81.815 90 79 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: var(--status-danger); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path></g></svg>`, 8);
  var _tmpl$23 = /* @__PURE__ */ (0, import_web20.template)(`<div><div><div></div><div></div><div></div></div></div>`, 10);
  var {
    ui: {
      Text: Text2,
      HeaderTags,
      Header,
      injectCss: injectCss3
    },
    solid: {
      createSignal: createSignal2
    }
  } = shelter;
  var RemoveIcon = (props) => (() => {
    const _el$ = _tmpl$4.cloneNode(true);
    (0, import_web27.addEventListener)(_el$, "click", props.onClick, true);
    return _el$;
  })();
  var injectedCss3 = false;
  function KeybindSection(props) {
    var _a;
    if (!injectedCss3) {
      injectedCss3 = true;
      injectCss3(css2);
    }
    const [keybindType, setKeybindType] = createSignal2(props.internalName || ((_a = props.keybind) == null ? void 0 : _a.key) || props.keybindActionTypes[0].value);
    const old = props.keybind;
    return (() => {
      const _el$2 = _tmpl$23.cloneNode(true), _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling, _el$6 = _el$5.nextSibling;
      (0, import_web24.insert)(_el$4, (0, import_web26.createComponent)(Header, {
        get size() {
          return HeaderTags.H5;
        },
        children: "Action"
      }), null);
      (0, import_web24.insert)(_el$4, (0, import_web26.createComponent)(Dropdown, {
        get value() {
          var _a2;
          return props.internalName || ((_a2 = props.keybind) == null ? void 0 : _a2.key) || props.keybindActionTypes[0].value;
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
      }), null);
      (0, import_web24.insert)(_el$5, (0, import_web26.createComponent)(Header, {
        get size() {
          return HeaderTags.H5;
        },
        children: "Keybind"
      }), null);
      (0, import_web24.insert)(_el$5, (0, import_web26.createComponent)(KeybindInput, {
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
      }), null);
      (0, import_web24.insert)(_el$6, (0, import_web26.createComponent)(RemoveIcon, {
        onClick: () => props.onKeybindRemove(old)
      }));
      (0, import_web24.insert)(_el$2, (0, import_web26.createComponent)(Text2, {
        get ["class"]() {
          return classes2.note;
        },
        get children() {
          return props.keybindDescriptions[keybindType()];
        }
      }), null);
      (0, import_web23.effect)((_p$) => {
        const _v$ = classes2.keybindRoot, _v$2 = classes2.keybindSection, _v$3 = classes2.actionSection, _v$4 = classes2.keybindArea, _v$5 = classes2.removeButton;
        _v$ !== _p$._v$ && (0, import_web22.className)(_el$2, _p$._v$ = _v$);
        _v$2 !== _p$._v$2 && (0, import_web22.className)(_el$3, _p$._v$2 = _v$2);
        _v$3 !== _p$._v$3 && (0, import_web22.className)(_el$4, _p$._v$3 = _v$3);
        _v$4 !== _p$._v$4 && (0, import_web22.className)(_el$5, _p$._v$4 = _v$4);
        _v$5 !== _p$._v$5 && (0, import_web22.className)(_el$6, _p$._v$5 = _v$5);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0,
        _v$3: void 0,
        _v$4: void 0,
        _v$5: void 0
      });
      return _el$2;
    })();
  }
  (0, import_web21.delegateEvents)(["click"]);

  // plugins/dorion-custom-keybinds/components/Keybinds.tsx
  var _tmpl$5 = /* @__PURE__ */ (0, import_web28.template)(`<div><div><div></div></div><div></div></div>`, 8);
  var _tmpl$24 = /* @__PURE__ */ (0, import_web28.template)(`<div></div>`, 2);
  var {
    ui: {
      Button,
      Text: Text3,
      SwitchItem,
      injectCss: injectCss4
    },
    solid: {
      createSignal: createSignal3,
      createEffect
    }
  } = shelter;
  var injectedCss4 = false;
  function Keybinds(props) {
    if (!injectedCss4) {
      injectedCss4 = true;
      injectCss4(css);
    }
    const [keybindsEnabled, setKeybindsEnabled] = createSignal3(false);
    const [keybindEnabledChanged, setKeybindEnabledChanged] = createSignal3(false);
    const [keybindSections, setKeybindSections] = createSignal3([]);
    createEffect(() => __async(this, null, function* () {
      var _a;
      const keybinds = yield invoke("get_keybinds");
      const config = yield invoke("get_config");
      const sections = Object.keys(keybinds).map((key) => ({
        key,
        keys: keybinds[key]
      }));
      setKeybindSections(sections);
      setKeybindsEnabled((_a = config.keybinds_enabled) != null ? _a : false);
    }), []);
    const updateKeybinds = (keybinds) => {
      setKeybindSections(keybinds);
      event.emit("keybinds_changed", keybinds);
    };
    return (() => {
      const _el$ = _tmpl$5.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$2.nextSibling;
      (0, import_web31.insert)(_el$, (() => {
        const _c$ = (0, import_web33.memo)(() => !!keybindEnabledChanged());
        return () => _c$() && (() => {
          const _el$5 = _tmpl$24.cloneNode(true);
          (0, import_web31.insert)(_el$5, (0, import_web32.createComponent)(Text3, {
            children: "Enabling or disabling global keybinds requires a restart to take effect."
          }), null);
          (0, import_web31.insert)(_el$5, (0, import_web32.createComponent)(Button, {
            get ["class"]() {
              return classes.keybindRestartButton;
            },
            grow: true,
            onClick: () => {
              process.relaunch();
            },
            children: "Restart"
          }), null);
          (0, import_web30.effect)(() => (0, import_web29.className)(_el$5, classes.keybindRestartCard));
          return _el$5;
        })();
      })(), _el$2);
      (0, import_web31.insert)(_el$3, (0, import_web32.createComponent)(Text3, {
        children: "Global keybinds are an experimental feature!"
      }));
      (0, import_web31.insert)(_el$2, (0, import_web32.createComponent)(Button, {
        get ["class"]() {
          return classes.keybindsButton;
        },
        grow: true,
        onClick: () => {
          if (keybindSections().length >= props.keybindActionTypes.length) {
            return;
          }
          updateKeybinds([...keybindSections(), {
            key: "UNASSIGNED",
            keys: []
          }]);
        },
        children: "Add Keybind"
      }), null);
      (0, import_web31.insert)(_el$4, (0, import_web32.createComponent)(SwitchItem, {
        get value() {
          return keybindsEnabled();
        },
        onChange: (value) => __async(this, null, function* () {
          setKeybindsEnabled(value);
          setKeybindEnabledChanged(true);
          invoke("set_config", {
            config: __spreadProps(__spreadValues({}, yield invoke("get_config")), {
              keybinds_enabled: value
            })
          });
        }),
        note: "Enable or disable global keybinds. Requires restart.",
        children: "Enable Global Keybinds"
      }));
      (0, import_web31.insert)(_el$, () => keybindSections().map((section, idx) => (0, import_web32.createComponent)(KeybindSection, {
        key: idx,
        get keybindActionTypes() {
          return (
            // Filter out keybinds that are already set (and it's own key). Always allow UNASSIGNED
            props.keybindActionTypes.filter((type) => {
              if (section.key === "UNASSIGNED" || section.key === type.value)
                return true;
              return !keybindSections().some((keybind) => keybind.key === type.value);
            })
          );
        },
        get keybindDescriptions() {
          return props.keybindDescriptions;
        },
        keybind: section,
        onKeybindChange: (keybind, old) => {
          if (keybind.key === old.key) {
            updateKeybinds(keybindSections().map((bind) => {
              if (bind.key === keybind.key) {
                return keybind;
              }
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
      })), null);
      (0, import_web30.effect)((_p$) => {
        const _v$ = classes.keybindSection, _v$2 = classes.keybindsHeader, _v$3 = classes.keybindsBanner, _v$4 = classes.keybindsSwitch;
        _v$ !== _p$._v$ && (0, import_web29.className)(_el$, _p$._v$ = _v$);
        _v$2 !== _p$._v$2 && (0, import_web29.className)(_el$2, _p$._v$2 = _v$2);
        _v$3 !== _p$._v$3 && (0, import_web29.className)(_el$3, _p$._v$3 = _v$3);
        _v$4 !== _p$._v$4 && (0, import_web29.className)(_el$4, _p$._v$4 = _v$4);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0,
        _v$3: void 0,
        _v$4: void 0
      });
      return _el$;
    })();
  }

  // plugins/dorion-custom-keybinds/util/actionMap.ts
  var {
    flux: {
      stores: {
        UserStore
      }
    }
  } = shelter;
  var keybindActions = {
    "UNASSIGNED": {},
    "TOGGLE_MUTE": {
      press: [{
        type: "AUDIO_TOGGLE_SELF_MUTE",
        context: "default",
        syncRemote: true,
        skipMuteUnmuteSoundEffect: false
      }]
    },
    "TOGGLE_DEAFEN": {
      press: [{
        type: "AUDIO_TOGGLE_SELF_DEAF",
        context: "default",
        syncRemote: true
      }]
    },
    "TOGGLE_STREAMER_MODE": {
      storeValue: {
        store: "StreamerModeStore",
        key: "enabled",
        eventKey: "value",
        modify: (event2, store) => {
          event2["value"] = !store["enabled"];
          return event2;
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
        modify: (event2, store) => {
          event2["mode"] = store["getMode"]() === "PUSH_TO_TALK" ? "VOICE_ACTIVITY" : "PUSH_TO_TALK";
          event2["options"] = store["getModeOptions"]() || {};
          return event2;
        }
      },
      press: [{
        type: "AUDIO_SET_MODE",
        context: "default"
      }]
    },
    // TODO grab the existing push to talk bind and display it in the keybinds section
    "PUSH_TO_TALK": {
      storeValue: {
        store: "UserStore",
        key: "",
        eventKey: "userId",
        modify: (event2, store) => {
          event2["userId"] = store["getCurrentUser"]().id;
          return event2;
        }
      },
      press: [{
        type: "SPEAKING",
        context: "default",
        speakingFlags: 1
      }],
      release: [{
        type: "SPEAKING",
        context: "default",
        speakingFlags: 0
      }]
    },
    "PUSH_TO_TALK_PRIORITY": {
      storeValue: {
        store: "UserStore",
        key: "",
        eventKey: "userId",
        modify: (event2, store) => {
          event2["userId"] = store["getCurrentUser"]().id;
          return event2;
        }
      },
      press: [{
        type: "SPEAKING",
        context: "default",
        speakingFlags: 4
      }],
      release: [{
        type: "SPEAKING",
        context: "default",
        speakingFlags: 0
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

  // plugins/dorion-custom-keybinds/util/events.ts
  var {
    flux: {
      dispatcher: FluxDispatcher
    }
  } = shelter;
  var events = [];
  var register = () => {
    events.push(event.listen("keybind_pressed", (e) => {
      var _a;
      const key = e.payload;
      const action = (_a = keybindActions) == null ? void 0 : _a[key];
      if (!action || !action.press)
        return;
      for (const press of action.press) {
        let e2 = press;
        if (action.storeValue) {
          const { store, modify } = action.storeValue;
          const storeInstance = shelter.flux.stores[store];
          e2 = modify(e2, storeInstance);
        }
        FluxDispatcher.dispatch(
          e2
        );
      }
    }));
    events.push(event.listen("keybind_released", (e) => {
      var _a;
      const key = e.payload;
      const action = (_a = keybindActions) == null ? void 0 : _a[key];
      if (!action || !action.release)
        return;
      for (const release of action.release) {
        let e2 = release;
        if (action.storeValue) {
          const { store, modify } = action.storeValue;
          const storeInstance = shelter.flux.stores[store];
          e2 = modify(e2, storeInstance);
        }
        FluxDispatcher.dispatch(
          release
        );
      }
    }));
  };
  var unregister = () => {
    events.forEach((e) => e());
  };

  // plugins/dorion-custom-keybinds/index.tsx
  var {
    flux: {
      dispatcher: FluxDispatcher2
    },
    observeDom,
    ui: {
      ReactiveRoot
    }
  } = shelter;
  var child = null;
  var viewedKeybindsCallback = (e) => {
    if (e.section !== "Keybinds") {
      if (child) {
        child.remove();
        child = null;
      }
      return;
    }
    const unsub = observeDom("#keybinds-tab", () => {
      unsub();
      const oldElm = document.querySelector('div[class*="browserNotice_"');
      const owner = shelter.util.getFiberOwner(oldElm);
      const keybindsArea = oldElm.parentElement;
      oldElm.style.display = "none";
      const divider = keybindsArea.parentElement.parentElement.querySelector('div[class*="divider_"]');
      divider.style.display = "none";
      const defaultKeybinds = keybindsArea.parentElement.parentElement.querySelector('div[class*="marginTop"]');
      defaultKeybinds.style.marginTop = "0";
      child = keybindsArea.appendChild((0, import_web34.createComponent)(ReactiveRoot, {
        get children() {
          return (0, import_web34.createComponent)(
            Keybinds,
            {
              get keybindActionTypes() {
                return owner.keybindActionTypes.filter((k) => k.value !== "PUSH_TO_TALK");
              },
              get keybindDescriptions() {
                return owner.keybindDescriptions;
              }
            }
          );
        }
      }));
    });
  };
  var subscriptions = [FluxDispatcher2.subscribe("USER_SETTINGS_MODAL_SET_SECTION", viewedKeybindsCallback)];
  register();
  var onUnload = () => {
    for (const unsub of subscriptions) {
      unsub();
    }
    unregister();
  };
  return __toCommonJS(dorion_custom_keybinds_exports);
})();
