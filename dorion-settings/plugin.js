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
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
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

  // plugins/dorion-settings/index.tsx
  var dorion_settings_exports = {};
  __export(dorion_settings_exports, {
    onUnload: () => onUnload
  });

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
  var requiresRestart = false;
  var backendRestartRequired = (v) => {
    requiresRestart = v;
  };
  var appName = backendObj.name;
  var invoke = backendObj.invoke;
  var event = backendObj.event;
  var app = backendObj.app;
  var process = backendObj.process;
  var apiWindow = backendObj.apiWindow;

  // plugins/dorion-settings/pages/PerformancePage.tsx
  var import_web18 = __toESM(require_web(), 1);
  var import_web19 = __toESM(require_web(), 1);
  var import_web20 = __toESM(require_web(), 1);
  var import_web21 = __toESM(require_web(), 1);
  var import_web22 = __toESM(require_web(), 1);
  var import_web23 = __toESM(require_web(), 1);

  // plugins/dorion-settings/pages/PerformancePage.tsx.scss
  var css = `._tophead_1k6ld_1{margin-bottom:16px}._shead_1k6ld_1{margin-top:16px;margin-bottom:8px}._stext_1k6ld_1{color:var(--header-secondary) !important;font-size:14px;margin:12px 0}._pbuttons_1k6ld_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;gap:16px;width:100%;margin-top:16px}`;
  var classes = {
    "tophead": "_tophead_1k6ld_1",
    "shead": "_shead_1k6ld_1",
    "stext": "_stext_1k6ld_1",
    "pbuttons": "_pbuttons_1k6ld_1"
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
  var css2 = `._ddown_1njos_1{box-sizing:border-box;font-size:16px;width:100%;border-radius:4px;color:var(--text-normal);background-color:var(--input-background);border:none;transition:border-color .2s ease-in-out;padding:10px;appearance:none;cursor:pointer}._dcontainer_1njos_1{position:relative;width:100%}._dsarrow_1njos_1{position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none}._dsarrow_1njos_1 path{fill:var(--header-secondary)}`;
  var classes2 = {
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
      injectCss(css2);
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
          return classes2.dsarrow;
        }
      }), null);
      (0, import_web11.effect)((_p$) => {
        const _v$ = classes2.dcontainer, _v$2 = props.style, _v$3 = classes2.ddown, _v$4 = props.placeholder, _v$5 = props.id, _v$6 = props["aria-label"], _v$7 = props.disabled;
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

  // plugins/dorion-settings/components/WarningCard.tsx
  var import_web17 = __toESM(require_web(), 1);

  // components/Card.tsx
  var import_web12 = __toESM(require_web(), 1);
  var import_web13 = __toESM(require_web(), 1);
  var import_web14 = __toESM(require_web(), 1);
  var import_web15 = __toESM(require_web(), 1);
  var import_web16 = __toESM(require_web(), 1);

  // components/Card.tsx.scss
  var css3 = `._card_1uk2u_1{border:1px solid var(--background-tertiary);border-radius:4px}`;
  var classes3 = {
    "card": "_card_1uk2u_1"
  };

  // components/Card.tsx
  var _tmpl$3 = /* @__PURE__ */ (0, import_web12.template)(`<div></div>`, 2);
  var {
    ui: {
      injectCss: injectCss2
    }
  } = shelter;
  var injectedCss2 = false;
  var Card = (props) => {
    if (!injectedCss2) {
      injectedCss2 = true;
      injectCss2(css3);
    }
    return (() => {
      const _el$ = _tmpl$3.cloneNode(true);
      (0, import_web16.insert)(_el$, () => props.children);
      (0, import_web15.effect)((_p$) => {
        const _v$ = classes3.card + ` ${props.class}`, _v$2 = props.style;
        _v$ !== _p$._v$ && (0, import_web14.className)(_el$, _p$._v$ = _v$);
        _p$._v$2 = (0, import_web13.style)(_el$, _v$2, _p$._v$2);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0
      });
      return _el$;
    })();
  };

  // plugins/dorion-settings/components/WarningCard.tsx.scss
  var css4 = `._restartCard_1wa83_1{display:flex;flex-direction:column;justify-content:space-around;align-items:center;border:1px solid var(--status-warning) !important;background-color:var(--info-warning-background);padding:16px}._restartButton_1wa83_1{width:100% !important;background-color:var(--status-warning) !important;margin-top:8px}`;
  var classes4 = {
    "restartCard": "_restartCard_1wa83_1",
    "restartButton": "_restartButton_1wa83_1"
  };

  // plugins/dorion-settings/components/WarningCard.tsx
  var {
    ui: {
      injectCss: injectCss3,
      Text,
      Button
    }
  } = shelter;
  var injectedCss3 = false;
  function WarningCard() {
    if (!injectedCss3) {
      injectedCss3 = true;
      injectCss3(css4);
    }
    return (0, import_web17.createComponent)(Card, {
      style: {
        marginTop: "1rem"
      },
      get ["class"]() {
        return classes4.restartCard;
      },
      get children() {
        return [(0, import_web17.createComponent)(Text, {
          children: "One or more settings have been changed that require a restart to take effect."
        }), (0, import_web17.createComponent)(Button, {
          onClick: () => process.relaunch(),
          get ["class"]() {
            return classes4.restartButton;
          },
          grow: true,
          children: "Restart"
        })];
      }
    });
  }

  // plugins/dorion-settings/util/settings.ts
  var defaultConfig = {
    theme: "none",
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

  // plugins/dorion-settings/pages/PerformancePage.tsx
  var _tmpl$4 = /* @__PURE__ */ (0, import_web18.template)(`<div>The blurring effect can be unreliable, semi-broken, and extremely slow, depending on what OS and version you are on. For more context, see <a href="https://github.com/tauri-apps/window-vibrancy#available-functions" target="_blank">the window-vibrancy crate</a>.</div>`, 4);
  var _tmpl$23 = /* @__PURE__ */ (0, import_web18.template)(`<div></div>`, 2);
  var _tmpl$32 = /* @__PURE__ */ (0, import_web18.template)(`<p>I know the big bold <b>"DON'T DISABLE THIS"</b> text makes it really tempting to disable, but you shouldn't. <!> will have several vital systems removed, such as the <i>entire settings menu</i>.<br><br>This option is intended only for debugging, development, and for running old versions of <!> functionality on old versions of <!>. If you're not doing that, don't touch this.</p>`, 11);
  var _tmpl$42 = /* @__PURE__ */ (0, import_web18.template)(`<b>DO NOT DISABLE THIS OPTION.</b>`, 2);
  var {
    ui: {
      injectCss: injectCss4,
      openConfirmationModal,
      SwitchItem,
      Button: Button2,
      Header,
      HeaderTags,
      showToast
    },
    solid: {
      createSignal,
      createEffect
    }
  } = shelter;
  var injectedCss4 = false;
  var capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  function PerformancePage() {
    const [state, setState] = createSignal(defaultConfig);
    const [platform, setPlatform] = createSignal("");
    const [blurOptions, setBlurOptions] = createSignal([]);
    const [restartRequired, setRestartRequired] = createSignal(false);
    if (!injectedCss4) {
      injectedCss4 = true;
      injectCss4(css);
    }
    const setSettings = (fn, requiresRestart2) => {
      setState(fn(state()));
      invoke("write_config_file", {
        contents: JSON.stringify(fn(state()))
      });
      if (requiresRestart2) {
        setRestartRequired(true);
        backendRestartRequired(true);
      }
    };
    createEffect(() => __async(this, null, function* () {
      const settings = yield invoke("read_config_file");
      const defaultConf = yield invoke("default_config");
      try {
        const availableBlurs = yield invoke("available_blurs");
        setBlurOptions(availableBlurs);
      } catch (e) {
      }
      try {
        const platform2 = yield invoke("get_platform");
        setPlatform(platform2);
      } catch (e) {
      }
      try {
        setState(JSON.parse(settings));
      } catch (e) {
        setState(JSON.parse(defaultConf));
      }
      setRestartRequired((window == null ? void 0 : window.__DORION_RESTART__) === true);
    }));
    const clearCSSCache = () => __async(this, null, function* () {
      yield invoke("clear_css_cache");
      showToast({
        title: "CSS Cache Cleared",
        duration: 3e3
      });
    });
    const clearWebCache = () => {
      openConfirmationModal({
        body: () => `
      Clearing web cache will log you out and reset your settings, but can often help solve permission-based issues.
      


      Do you want to proceed?
      `,
        header: () => "Are you sure?",
        type: "neutral",
        confirmText: "Confirm"
      }).then(() => invoke("set_clear_cache"), () => {
      });
    };
    return [(0, import_web23.createComponent)(Header, {
      get tag() {
        return HeaderTags.H1;
      },
      get ["class"]() {
        return classes.tophead;
      },
      children: "Performance Settings"
    }), (0, import_web22.memo)((() => {
      const _c$ = (0, import_web22.memo)(() => !!restartRequired());
      return () => _c$() && (0, import_web23.createComponent)(WarningCard, {});
    })()), (0, import_web23.createComponent)(Header, {
      get ["class"]() {
        return classes.shead;
      },
      children: "Cache"
    }), (0, import_web23.createComponent)(SwitchItem, {
      get value() {
        return state().cache_css;
      },
      onChange: (v) => setSettings((settings) => __spreadProps(__spreadValues({}, settings), {
        cache_css: v
      }), true),
      note: "Save CSS to disk that would otherwise be loaded from the web, decreasing load times.",
      children: "Cache CSS"
    }), (0, import_web23.createComponent)(SwitchItem, {
      get value() {
        return state().auto_clear_cache;
      },
      onChange: (v) => setSettings((settings) => __spreadProps(__spreadValues({}, settings), {
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
    }), (0, import_web23.createComponent)(Header, {
      get ["class"]() {
        return classes.shead;
      },
      children: "Optional Features"
    }), (0, import_web23.createComponent)(SwitchItem, {
      get value() {
        return state().streamer_mode_detection;
      },
      onChange: (v) => setSettings((settings) => __spreadProps(__spreadValues({}, settings), {
        streamer_mode_detection: v
      }), true),
      note: "Detect OBS and Streamlabs OBS and automatically enable streamer mode when they are running.",
      children: "Streamer Mode detection"
    }), (0, import_web23.createComponent)(SwitchItem, {
      get value() {
        return state().rpc_server;
      },
      onChange: (v) => setSettings((settings) => __spreadProps(__spreadValues({}, settings), {
        rpc_server: v
      }), true),
      tooltipNote: "This is a work in progress, and won't do EVERYTHING arRPC does quite yet.",
      note: "Enable the integrated RPC server, eliminating the need for a separate arRPC server running. Remember to enable the shelteRPC/arRPC plugin!",
      children: "Integrated rich presence server"
    }), (0, import_web23.createComponent)(SwitchItem, {
      get value() {
        return state().disable_hardware_accel;
      },
      onChange: (v) => setSettings((settings) => __spreadProps(__spreadValues({}, settings), {
        disable_hardware_accel: v
      }), true),
      note: "Disable hardware acceleration, which may cause issues on some systems. Disabling this can also cause performance issues on some systems. Unsupported on macOS.",
      get disabled() {
        return platform() === "macos";
      },
      children: "Disable Hardware Acceleration"
    }), (0, import_web23.createComponent)(SwitchItem, {
      get value() {
        return state().client_plugins || state().client_plugins === null || state().client_plugins === void 0;
      },
      onChange: (v) => {
        if (!state().client_plugins && v) {
          setSettings((settings) => __spreadProps(__spreadValues({}, settings), {
            client_plugins: v
          }), true);
          return;
        }
        openConfirmationModal({
          body: () => (() => {
            const _el$3 = _tmpl$32.cloneNode(true), _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling, _el$6 = _el$5.nextSibling, _el$15 = _el$6.nextSibling, _el$7 = _el$15.nextSibling, _el$8 = _el$7.nextSibling, _el$9 = _el$8.nextSibling, _el$10 = _el$9.nextSibling, _el$11 = _el$10.nextSibling, _el$12 = _el$11.nextSibling, _el$16 = _el$12.nextSibling, _el$13 = _el$16.nextSibling, _el$17 = _el$13.nextSibling, _el$14 = _el$17.nextSibling;
            (0, import_web19.insert)(_el$3, appName, _el$15);
            (0, import_web19.insert)(_el$3, appName, _el$16);
            (0, import_web19.insert)(_el$3, appName, _el$17);
            return _el$3;
          })(),
          header: () => "Are you ABSOLUTELY sure?",
          type: "neutral",
          confirmText: "Confirm"
        }).then(() => setSettings((settings) => __spreadProps(__spreadValues({}, settings), {
          client_plugins: v
        }), true), () => {
        });
      },
      get note() {
        return [_tmpl$42.cloneNode(true), " If you do, vital functionality will be lost. Only touch this if you know what you're doing."];
      },
      children: "Enable Dorion Plugins"
    }), (0, import_web23.createComponent)(Header, {
      get ["class"]() {
        return classes.shead;
      },
      children: "Blur"
    }), (0, import_web23.createComponent)(Dropdown, {
      get value() {
        return state().blur;
      },
      get selected() {
        return state().blur;
      },
      onChange: (e) => setSettings((settings) => __spreadProps(__spreadValues({}, settings), {
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
    }), (() => {
      const _el$ = _tmpl$4.cloneNode(true);
      (0, import_web21.effect)(() => (0, import_web20.className)(_el$, classes.stext));
      return _el$;
    })(), (0, import_web23.createComponent)(SwitchItem, {
      get value() {
        return state().blur_css;
      },
      onChange: (v) => setSettings((settings) => __spreadProps(__spreadValues({}, settings), {
        blur_css: v
      }), true),
      note: "Enable this if you are not using a theme designed to take advantage of transparent windows.",
      get disabled() {
        return platform() === "linux" || state().blur === "none";
      },
      children: "Enable builtin background transparency CSS"
    }), (() => {
      const _el$2 = _tmpl$23.cloneNode(true);
      (0, import_web19.insert)(_el$2, (0, import_web23.createComponent)(Button2, {
        onClick: clearWebCache,
        style: {
          width: "100%",
          padding: "18px"
        },
        grow: true,
        children: "Wipe all web-based data"
      }), null);
      (0, import_web19.insert)(_el$2, (0, import_web23.createComponent)(Button2, {
        onClick: clearCSSCache,
        style: {
          width: "100%",
          padding: "18px"
        },
        grow: true,
        children: "Clear CSS Cache"
      }), null);
      (0, import_web21.effect)(() => (0, import_web20.className)(_el$2, classes.pbuttons));
      return _el$2;
    })()];
  }

  // plugins/dorion-settings/pages/ProfilesPage.tsx
  var import_web24 = __toESM(require_web(), 1);
  var import_web25 = __toESM(require_web(), 1);
  var import_web26 = __toESM(require_web(), 1);
  var import_web27 = __toESM(require_web(), 1);
  var import_web28 = __toESM(require_web(), 1);
  var import_web29 = __toESM(require_web(), 1);

  // plugins/dorion-settings/pages/ProfilesPage.tsx.scss
  var css5 = `._tophead_1fheu_1{margin-bottom:16px}._shead_1fheu_1{margin-top:16px;margin-bottom:8px}._sbutton_1fheu_1{margin-top:16px;padding:18px;width:100%}._splitbutton_1fheu_1{width:100%}._pbuttons_1fheu_1{display:flex;gap:16px;margin-top:16px}._pbuttons_1fheu_1 button{width:100% !important}`;
  var classes5 = {
    "tophead": "_tophead_1fheu_1",
    "shead": "_shead_1fheu_1",
    "sbutton": "_sbutton_1fheu_1",
    "splitbutton": "_splitbutton_1fheu_1",
    "pbuttons": "_pbuttons_1fheu_1"
  };

  // plugins/dorion-settings/pages/ProfilesPage.tsx
  var _tmpl$5 = /* @__PURE__ */ (0, import_web24.template)(`<div></div>`, 2);
  var {
    ui: {
      Header: Header2,
      Button: Button3,
      HeaderTags: HeaderTags2,
      TextBox,
      injectCss: injectCss5,
      Divider,
      ButtonColors,
      ButtonSizes
    },
    solid: {
      createSignal: createSignal2,
      createEffect: createEffect2
    }
  } = shelter;
  var injectedCss5 = false;
  function ProfilesPage() {
    const [profileList, setProfileList] = createSignal2([]);
    const [profile, setProfile] = createSignal2("");
    const [internalProfile, setInternalProfile] = createSignal2("");
    const [newProfile, setNewProfile] = createSignal2("");
    if (!injectedCss5) {
      injectedCss5 = true;
      injectCss5(css5);
    }
    createEffect2(() => __async(this, null, function* () {
      const profiles = yield invoke("get_profile_list");
      setProfileList(profiles);
      const config = JSON.parse(yield invoke("read_config_file"));
      setProfile(config.profile || "default");
      setInternalProfile(config.profile || "default");
    }));
    const saveProfile = () => __async(this, null, function* () {
      const config = JSON.parse(yield invoke("read_config_file"));
      config.profile = profile();
      yield invoke("write_config_file", {
        contents: JSON.stringify(config)
      });
      process.relaunch();
    });
    const deleteProfile = () => __async(this, null, function* () {
      yield invoke("delete_profile", {
        name: profile()
      });
      setProfileList(profileList().filter((p) => p !== profile()));
      setProfile(internalProfile());
    });
    const createProfile = () => __async(this, null, function* () {
      yield invoke("create_profile", {
        name: newProfile()
      });
      if (!profileList().includes(newProfile())) {
        setProfileList([...profileList(), newProfile()]);
      }
      setProfile(newProfile());
    });
    const handleNewProfileChange = (value) => {
      setNewProfile(value);
    };
    return [(0, import_web29.createComponent)(Header2, {
      get tag() {
        return HeaderTags2.H1;
      },
      get ["class"]() {
        return classes5.tophead;
      },
      children: "Profiles"
    }), (0, import_web29.createComponent)(Dropdown, {
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
    }), (0, import_web29.createComponent)(Header2, {
      get ["class"]() {
        return classes5.shead;
      },
      children: "Create Profile"
    }), (0, import_web29.createComponent)(TextBox, {
      type: "text",
      get value() {
        return newProfile();
      },
      onInput: handleNewProfileChange,
      placeholder: "Enter a name for the new profile..."
    }), (0, import_web29.createComponent)(Button3, {
      onClick: createProfile,
      get ["class"]() {
        return classes5.sbutton;
      },
      get disabled() {
        return newProfile() === "" || profileList().includes(newProfile());
      },
      children: "Create Profile"
    }), (0, import_web29.createComponent)(Divider, {
      mt: 16,
      mb: 16
    }), (() => {
      const _el$ = _tmpl$5.cloneNode(true);
      (0, import_web27.insert)(_el$, (0, import_web29.createComponent)(Button3, {
        onClick: saveProfile,
        get size() {
          return ButtonSizes.MEDIUM;
        },
        children: "Save and Restart"
      }), null);
      (0, import_web27.insert)(_el$, (0, import_web29.createComponent)(Button3, {
        onClick: deleteProfile,
        get disabled() {
          return profile() === "default" || internalProfile() === profile;
        },
        get color() {
          return ButtonColors.RED;
        },
        get size() {
          return ButtonSizes.MEDIUM;
        },
        children: "Delete Selected Profile"
      }), null);
      (0, import_web26.effect)(() => (0, import_web25.className)(_el$, classes5.pbuttons));
      return _el$;
    })()];
  }

  // plugins/dorion-settings/pages/SettingsPage.tsx
  var import_web40 = __toESM(require_web(), 1);
  var import_web41 = __toESM(require_web(), 1);
  var import_web42 = __toESM(require_web(), 1);

  // plugins/dorion-settings/pages/SettingsPage.tsx.scss
  var css6 = `._tophead_1mnth_1{margin-bottom:16px}._shead_1mnth_1{margin-top:16px;margin-bottom:8px}._fcard_1mnth_1{display:flex;flex-direction:row;justify-content:space-between;align-items:center;color:var(--text-primary);padding:8px}._pcard_1mnth_1{display:flex}._left16_1mnth_1{margin-left:16px}._themeRow_1mnth_1{display:flex;flex-direction:row;justify-content:space-between;align-items:center;height:42px}`;
  var classes6 = {
    "tophead": "_tophead_1mnth_1",
    "shead": "_shead_1mnth_1",
    "fcard": "_fcard_1mnth_1",
    "pcard": "_pcard_1mnth_1",
    "left16": "_left16_1mnth_1",
    "themeRow": "_themeRow_1mnth_1"
  };

  // components/RadioGroup.tsx
  var import_web37 = __toESM(require_web(), 1);
  var import_web38 = __toESM(require_web(), 1);
  var import_web39 = __toESM(require_web(), 1);

  // components/Radio.tsx
  var import_web30 = __toESM(require_web(), 1);
  var import_web31 = __toESM(require_web(), 1);
  var import_web32 = __toESM(require_web(), 1);
  var import_web33 = __toESM(require_web(), 1);
  var import_web34 = __toESM(require_web(), 1);
  var import_web35 = __toESM(require_web(), 1);
  var import_web36 = __toESM(require_web(), 1);

  // components/Radio.tsx.scss
  var css7 = `._radio_1qi40_1{color:var(--interactive-normal);grid-template-columns:auto 1fr;box-sizing:border-box;border-radius:4px;display:grid;grid-gap:8px;align-items:center;padding:8px;background:var(--background-secondary);cursor:pointer}._radio_1qi40_1:not(:last-child){margin-bottom:8px}._radio_1qi40_1 ._radioButton_1qi40_1{height:20px;width:20px;border-radius:50%;border:2px solid var(--interactive-normal);margin:4px;position:relative}._radio_1qi40_1 ._radioButton_1qi40_1 ._radioButtonInner_1qi40_1{position:absolute;height:10px;width:10px;top:50%;left:50%;transform:translate(-50%, -50%);border-radius:50%;background:var(--interactive-normal)}._radio_1qi40_1:hover{background-color:var(--background-modifier-hover)}._radio_1qi40_1._selected_1qi40_1{color:var(--interactive-active);background-color:var(--background-modifier-selected)}._radio_1qi40_1._selected_1qi40_1 ._radioButton_1qi40_1{border-color:var(--interactive-active)}._radio_1qi40_1._selected_1qi40_1 ._radioButton_1qi40_1 ._radioButtonInner_1qi40_1{background:var(--interactive-active)}`;
  var classes7 = {
    "radio": "_radio_1qi40_1",
    "radioButton": "_radioButton_1qi40_1",
    "radioButtonInner": "_radioButtonInner_1qi40_1",
    "selected": "_selected_1qi40_1"
  };

  // components/Radio.tsx
  var _tmpl$6 = /* @__PURE__ */ (0, import_web30.template)(`<div><div></div></div>`, 4);
  var _tmpl$24 = /* @__PURE__ */ (0, import_web30.template)(`<div></div>`, 2);
  var {
    ui: {
      injectCss: injectCss6,
      Text: Text2
    }
  } = shelter;
  var injectedCss6 = false;
  var Radio = (props) => {
    if (!injectedCss6) {
      injectedCss6 = true;
      injectCss6(css7);
    }
    const onRadioClick = () => {
      props.onClick(props.value);
    };
    return (() => {
      const _el$ = _tmpl$6.cloneNode(true), _el$2 = _el$.firstChild;
      _el$.$$click = onRadioClick;
      (0, import_web35.insert)(_el$2, (() => {
        const _c$ = (0, import_web36.memo)(() => !!props.selected);
        return () => _c$() && (() => {
          const _el$3 = _tmpl$24.cloneNode(true);
          (0, import_web33.effect)(() => (0, import_web32.className)(_el$3, classes7.radioButtonInner));
          return _el$3;
        })();
      })());
      (0, import_web35.insert)(_el$, (0, import_web34.createComponent)(Text2, {
        get children() {
          return props.label;
        }
      }), null);
      (0, import_web33.effect)((_p$) => {
        const _v$ = classes7.radio + (props.selected ? ` ${classes7.selected}` : ""), _v$2 = classes7.radioButton;
        _v$ !== _p$._v$ && (0, import_web32.className)(_el$, _p$._v$ = _v$);
        _v$2 !== _p$._v$2 && (0, import_web32.className)(_el$2, _p$._v$2 = _v$2);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0
      });
      return _el$;
    })();
  };
  (0, import_web31.delegateEvents)(["click"]);

  // components/RadioGroup.tsx
  var _tmpl$7 = /* @__PURE__ */ (0, import_web37.template)(`<div></div>`, 2);
  var {
    ui: {
      injectCss: injectCss7
    }
  } = shelter;
  var injectedCss7 = false;
  var RadioGroup = (props) => {
    if (!injectedCss7) {
      injectedCss7 = true;
      injectCss7(css7);
    }
    return (() => {
      const _el$ = _tmpl$7.cloneNode(true);
      (0, import_web39.insert)(_el$, () => props.options.map((o) => (0, import_web38.createComponent)(Radio, {
        get ["class"]() {
          return classes7.radioGroupItem;
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

  // plugins/dorion-settings/pages/SettingsPage.tsx
  var _tmpl$8 = /* @__PURE__ */ (0, import_web40.template)(`<a href="https://github.com/SpikeHD/shelter-plugins" target="_blank">SpikeHD/shelter-plugins</a>`, 2);
  var {
    ui: {
      SwitchItem: SwitchItem2,
      Header: Header3,
      HeaderTags: HeaderTags3,
      Slider,
      injectCss: injectCss8
    },
    solid: {
      createSignal: createSignal3,
      createEffect: createEffect3
    }
  } = shelter;
  var injectedCss8 = false;
  function SettingsPage() {
    const [settings, setSettingsState] = createSignal3(defaultConfig);
    const [restartRequired, setRestartRequired] = createSignal3(false);
    if (!injectedCss8) {
      injectedCss8 = true;
      injectCss8(css6);
    }
    createEffect3(() => __async(this, null, function* () {
      setSettingsState(JSON.parse(yield invoke("read_config_file")));
      setRestartRequired((window == null ? void 0 : window.__DORION_RESTART__) === true);
    }));
    const setSettings = (fn, requiresRestart2) => {
      setSettingsState(fn(settings()));
      invoke("write_config_file", {
        contents: JSON.stringify(fn(settings()))
      });
      if (requiresRestart2) {
        setRestartRequired(true);
        backendRestartRequired;
      }
    };
    return [(0, import_web42.createComponent)(Header3, {
      get tag() {
        return HeaderTags3.H1;
      },
      get ["class"]() {
        return classes6.tophead;
      },
      get children() {
        return [appName, " Settings"];
      }
    }), (0, import_web41.memo)((() => {
      const _c$ = (0, import_web41.memo)(() => !!restartRequired());
      return () => _c$() && (0, import_web42.createComponent)(WarningCard, {});
    })()), (0, import_web42.createComponent)(Header3, {
      get ["class"]() {
        return classes6.shead;
      },
      children: "Client Type"
    }), (0, import_web42.createComponent)(RadioGroup, {
      options: [{
        label: "Default",
        value: "default"
      }, {
        label: "PTB",
        value: "ptb"
      }, {
        label: "Canary",
        value: "canary"
      }],
      onChange: (e) => {
        setSettings((p) => {
          return __spreadProps(__spreadValues({}, p), {
            client_type: e
          });
        }, true);
      },
      get selected() {
        return settings().client_type;
      }
    }), (0, import_web42.createComponent)(Header3, {
      get ["class"]() {
        return classes6.shead;
      },
      children: "Window"
    }), (0, import_web42.createComponent)(Slider, {
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
          return __spreadProps(__spreadValues({}, p), {
            zoom: (parseFloat(v) / 100).toString()
          });
        });
        invoke("window_zoom_level", {
          value: parseFloat(v) / 100
        });
      }
    }), (0, import_web42.createComponent)(SwitchItem2, {
      get value() {
        return settings().sys_tray;
      },
      onChange: (v) => {
        setSettings((p) => {
          return __spreadProps(__spreadValues({}, p), {
            sys_tray: v
          });
        }, true);
      },
      note: `Instead of closing, ${appName} will run in the background and will be accessible via the system tray.`,
      children: "Minimize to System Tray"
    }), (0, import_web42.createComponent)(SwitchItem2, {
      get value() {
        return settings().start_maximized;
      },
      onChange: (v) => {
        setSettings((p) => {
          return __spreadProps(__spreadValues({}, p), {
            start_maximized: v
          });
        });
      },
      children: "Start Maximized"
    }), (0, import_web42.createComponent)(Header3, {
      get ["class"]() {
        return classes6.shead;
      },
      children: "Startup"
    }), (0, import_web42.createComponent)(SwitchItem2, {
      get value() {
        return settings().open_on_startup;
      },
      onChange: (v) => {
        setSettings((p) => {
          return __spreadProps(__spreadValues({}, p), {
            open_on_startup: v,
            startup_minimized: v ? p.startup_minimized : false
          });
        });
      },
      note: `Open ${appName} when your system starts.`,
      children: "Open on Startup"
    }), (0, import_web42.createComponent)(SwitchItem2, {
      get value() {
        return settings().startup_minimized;
      },
      get disabled() {
        return !settings().open_on_startup;
      },
      onChange: (v) => {
        setSettings((p) => {
          return __spreadProps(__spreadValues({}, p), {
            startup_minimized: v
          });
        });
      },
      note: "Open in the background when your system starts.",
      children: "Start Minimized"
    }), (0, import_web42.createComponent)(Header3, {
      get ["class"]() {
        return classes6.shead;
      },
      children: "Misc."
    }), (0, import_web42.createComponent)(SwitchItem2, {
      get value() {
        return settings().multi_instance;
      },
      onChange: (v) => {
        setSettings((p) => {
          return __spreadProps(__spreadValues({}, p), {
            multi_instance: v
          });
        }, true);
      },
      note: `Allow multiple instances of ${appName} to be running at the same time.`,
      children: "Allow Multiple Instances"
    }), (0, import_web42.createComponent)(SwitchItem2, {
      get value() {
        return settings().use_native_titlebar;
      },
      onChange: (v) => {
        setSettings((p) => {
          return __spreadProps(__spreadValues({}, p), {
            use_native_titlebar: v
          });
        }, true);
      },
      note: "Disable the custom titlebar and use your systems native one instead.",
      children: "Use Native Titlebar"
    }), (0, import_web42.createComponent)(Header3, {
      get ["class"]() {
        return classes6.shead;
      },
      children: "Updates"
    }), (0, import_web42.createComponent)(SwitchItem2, {
      get value() {
        return settings().autoupdate;
      },
      onChange: (v) => {
        setSettings((p) => {
          return __spreadProps(__spreadValues({}, p), {
            autoupdate: v,
            update_notify: v ? p.update_notify : false
          });
        });
      },
      get note() {
        return ["Automatically update various ", appName, " components, such as", " ", _tmpl$8.cloneNode(true), "."];
      },
      children: "Autoupdate"
    }), (0, import_web42.createComponent)(SwitchItem2, {
      get value() {
        return settings().update_notify === void 0 || settings().update_notify;
      },
      onChange: (v) => {
        setSettings((p) => {
          return __spreadProps(__spreadValues({}, p), {
            update_notify: v
          });
        });
      },
      get disabled() {
        return settings().autoupdate;
      },
      children: "Notify me of updates"
    })];
  }

  // plugins/dorion-settings/pages/ChangelogPage.tsx
  var import_web43 = __toESM(require_web(), 1);
  var import_web44 = __toESM(require_web(), 1);
  var import_web45 = __toESM(require_web(), 1);
  var import_web46 = __toESM(require_web(), 1);
  var import_web47 = __toESM(require_web(), 1);
  var import_web48 = __toESM(require_web(), 1);

  // plugins/dorion-settings/pages/ChangelogPage.tsx.scss
  var css8 = `._tophead_1d3gd_1{margin-bottom:16px}._refresh_1d3gd_1{position:absolute;top:52px;right:40px}._card_1d3gd_1{padding:16px;border-radius:8px;color:var(--text-primary);background:var(--background-secondary);position:relative;min-height:82px}._card_1d3gd_1:not(:last-child){margin-bottom:16px}._card_1d3gd_1 button{margin-top:16px;width:100%}._card_1d3gd_1 ._title_1d3gd_1{margin-bottom:8px;font-size:1.5rem;font-weight:500}._card_1d3gd_1 ._badges_1d3gd_1{position:absolute;top:16px;right:16px;display:flex;flex-direction:row;gap:8px}._card_1d3gd_1 ._badges_1d3gd_1 ._badge_1d3gd_1{padding:0 8px;font-size:.75rem;border-radius:3px;background-color:var(--status-positive-background)}._card_1d3gd_1 ._spinner_1d3gd_1,._card_1d3gd_1 ._contents_1d3gd_1 img[src^=http]::before,._card_1d3gd_1 ._contents_1d3gd_1 img[src^=https]::before{box-sizing:border-box;content:"";position:absolute;top:calc(50% - 25px);left:calc(50% - 25px);width:50px;height:50px;border:10px solid rgba(0,0,0,0);border-top-color:var(--text-secondary);border-radius:50%;animation:_spin_1d3gd_1 1s linear infinite}._card_1d3gd_1 ._contents_1d3gd_1{margin-top:16px}._card_1d3gd_1 ._contents_1d3gd_1 h1,._card_1d3gd_1 ._contents_1d3gd_1 h2{color:var(--header-primary);font-weight:500;margin-bottom:8px}._card_1d3gd_1 ._contents_1d3gd_1 h1:not(:first-child),._card_1d3gd_1 ._contents_1d3gd_1 h2:not(:first-child){margin-top:24px}._card_1d3gd_1 ._contents_1d3gd_1 h1{font-size:1.25rem}._card_1d3gd_1 ._contents_1d3gd_1 h2{font-size:1rem}._card_1d3gd_1 ._contents_1d3gd_1 img{display:block;max-width:100%;margin:0 auto}._card_1d3gd_1 ._contents_1d3gd_1 img[src^=http],._card_1d3gd_1 ._contents_1d3gd_1 img[src^=https]{display:block;font-size:.75rem;margin-top:8px;color:var(--text-secondary);background:var(--background-tertiary);position:relative;border-radius:8px;padding:16px;height:82px}._card_1d3gd_1 ._contents_1d3gd_1 p,._card_1d3gd_1 ._contents_1d3gd_1 ul,._card_1d3gd_1 ._contents_1d3gd_1 ol,._card_1d3gd_1 ._contents_1d3gd_1 summary,._card_1d3gd_1 ._contents_1d3gd_1 img{font-size:.875rem;line-height:1.25rem}._card_1d3gd_1 ._contents_1d3gd_1 p:not(:last-child),._card_1d3gd_1 ._contents_1d3gd_1 ul:not(:last-child),._card_1d3gd_1 ._contents_1d3gd_1 ol:not(:last-child),._card_1d3gd_1 ._contents_1d3gd_1 summary:not(:last-child),._card_1d3gd_1 ._contents_1d3gd_1 img:not(:last-child){margin-bottom:6px}._card_1d3gd_1 ._contents_1d3gd_1 ul,._card_1d3gd_1 ._contents_1d3gd_1 ol{padding-left:32px}._card_1d3gd_1 ._contents_1d3gd_1 ul li,._card_1d3gd_1 ._contents_1d3gd_1 ol li{list-style-type:initial}@keyframes _spin_1d3gd_1{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`;
  var classes8 = {
    "tophead": "_tophead_1d3gd_1",
    "refresh": "_refresh_1d3gd_1",
    "card": "_card_1d3gd_1",
    "title": "_title_1d3gd_1",
    "badges": "_badges_1d3gd_1",
    "badge": "_badge_1d3gd_1",
    "spinner": "_spinner_1d3gd_1",
    "contents": "_contents_1d3gd_1",
    "spin": "_spin_1d3gd_1"
  };

  // node_modules/.pnpm/marked@11.2.0/node_modules/marked/lib/marked.esm.js
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
  var _defaults = _getDefaults();
  function changeDefaults(newDefaults) {
    _defaults = newDefaults;
  }
  var escapeTest = /[&<>"']/;
  var escapeReplace = new RegExp(escapeTest.source, "g");
  var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
  var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
  var escapeReplacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  var getEscapeReplacement = (ch) => escapeReplacements[ch];
  function escape$1(html2, encode) {
    if (encode) {
      if (escapeTest.test(html2)) {
        return html2.replace(escapeReplace, getEscapeReplacement);
      }
    } else {
      if (escapeTestNoEncode.test(html2)) {
        return html2.replace(escapeReplaceNoEncode, getEscapeReplacement);
      }
    }
    return html2;
  }
  var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
  function unescape(html2) {
    return html2.replace(unescapeTest, (_, n) => {
      n = n.toLowerCase();
      if (n === "colon")
        return ":";
      if (n.charAt(0) === "#") {
        return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
      }
      return "";
    });
  }
  var caret = /(^|[^\[])\^/g;
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
  var noopTest = { exec: () => null };
  function splitCells(tableRow, count) {
    const row = tableRow.replace(/\|/g, (match, offset, str) => {
      let escaped = false;
      let curr = offset;
      while (--curr >= 0 && str[curr] === "\\")
        escaped = !escaped;
      if (escaped) {
        return "|";
      } else {
        return " |";
      }
    }), cells = row.split(/ \|/);
    let i = 0;
    if (!cells[0].trim()) {
      cells.shift();
    }
    if (cells.length > 0 && !cells[cells.length - 1].trim()) {
      cells.pop();
    }
    if (count) {
      if (cells.length > count) {
        cells.splice(count);
      } else {
        while (cells.length < count)
          cells.push("");
      }
    }
    for (; i < cells.length; i++) {
      cells[i] = cells[i].trim().replace(/\\\|/g, "|");
    }
    return cells;
  }
  function rtrim(str, c, invert) {
    const l = str.length;
    if (l === 0) {
      return "";
    }
    let suffLen = 0;
    while (suffLen < l) {
      const currChar = str.charAt(l - suffLen - 1);
      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }
    return str.slice(0, l - suffLen);
  }
  function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
      return -1;
    }
    let level = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "\\") {
        i++;
      } else if (str[i] === b[0]) {
        level++;
      } else if (str[i] === b[1]) {
        level--;
        if (level < 0) {
          return i;
        }
      }
    }
    return -1;
  }
  function outputLink(cap, link2, raw, lexer2) {
    const href = link2.href;
    const title = link2.title ? escape$1(link2.title) : null;
    const text = cap[1].replace(/\\([\[\]])/g, "$1");
    if (cap[0].charAt(0) !== "!") {
      lexer2.state.inLink = true;
      const token = {
        type: "link",
        raw,
        href,
        title,
        text,
        tokens: lexer2.inlineTokens(text)
      };
      lexer2.state.inLink = false;
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
    if (matchIndentToCode === null) {
      return text;
    }
    const indentToCode = matchIndentToCode[1];
    return text.split("\n").map((node) => {
      const matchIndentInNode = node.match(/^\s+/);
      if (matchIndentInNode === null) {
        return node;
      }
      const [indentInNode] = matchIndentInNode;
      if (indentInNode.length >= indentToCode.length) {
        return node.slice(indentToCode.length);
      }
      return node;
    }).join("\n");
  }
  var _Tokenizer = class {
    options;
    rules;
    // set by the lexer
    lexer;
    // set by the lexer
    constructor(options2) {
      this.options = options2 || _defaults;
    }
    space(src) {
      const cap = this.rules.block.newline.exec(src);
      if (cap && cap[0].length > 0) {
        return {
          type: "space",
          raw: cap[0]
        };
      }
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
          if (this.options.pedantic) {
            text = trimmed.trim();
          } else if (!trimmed || / $/.test(trimmed)) {
            text = trimmed.trim();
          }
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
      if (cap) {
        return {
          type: "hr",
          raw: cap[0]
        };
      }
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
        const list2 = {
          type: "list",
          raw: "",
          ordered: isordered,
          start: isordered ? +bull.slice(0, -1) : "",
          loose: false,
          items: []
        };
        bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
        if (this.options.pedantic) {
          bull = isordered ? bull : "[*+-]";
        }
        const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
        let raw = "";
        let itemContents = "";
        let endsWithBlankLine = false;
        while (src) {
          let endEarly = false;
          if (!(cap = itemRegex.exec(src))) {
            break;
          }
          if (this.rules.block.hr.test(src)) {
            break;
          }
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
            const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`);
            const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
            const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
            const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
            while (src) {
              const rawLine = src.split("\n", 1)[0];
              nextLine = rawLine;
              if (this.options.pedantic) {
                nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
              }
              if (fencesBeginRegex.test(nextLine)) {
                break;
              }
              if (headingBeginRegex.test(nextLine)) {
                break;
              }
              if (nextBulletRegex.test(nextLine)) {
                break;
              }
              if (hrRegex.test(src)) {
                break;
              }
              if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
                itemContents += "\n" + nextLine.slice(indent);
              } else {
                if (blankLine) {
                  break;
                }
                if (line.search(/[^ ]/) >= 4) {
                  break;
                }
                if (fencesBeginRegex.test(line)) {
                  break;
                }
                if (headingBeginRegex.test(line)) {
                  break;
                }
                if (hrRegex.test(line)) {
                  break;
                }
                itemContents += "\n" + nextLine;
              }
              if (!blankLine && !nextLine.trim()) {
                blankLine = true;
              }
              raw += rawLine + "\n";
              src = src.substring(rawLine.length + 1);
              line = nextLine.slice(indent);
            }
          }
          if (!list2.loose) {
            if (endsWithBlankLine) {
              list2.loose = true;
            } else if (/\n *\n *$/.test(raw)) {
              endsWithBlankLine = true;
            }
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
          list2.items.push({
            type: "list_item",
            raw,
            task: !!istask,
            checked: ischecked,
            loose: false,
            text: itemContents,
            tokens: []
          });
          list2.raw += raw;
        }
        list2.items[list2.items.length - 1].raw = raw.trimEnd();
        list2.items[list2.items.length - 1].text = itemContents.trimEnd();
        list2.raw = list2.raw.trimEnd();
        for (let i = 0; i < list2.items.length; i++) {
          this.lexer.state.top = false;
          list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
          if (!list2.loose) {
            const spacers = list2.items[i].tokens.filter((t) => t.type === "space");
            const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t) => /\n.*\n/.test(t.raw));
            list2.loose = hasMultipleLineBreaks;
          }
        }
        if (list2.loose) {
          for (let i = 0; i < list2.items.length; i++) {
            list2.items[i].loose = true;
          }
        }
        return list2;
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
        const tag2 = cap[1].toLowerCase().replace(/\s+/g, " ");
        const href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
        const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
        return {
          type: "def",
          tag: tag2,
          raw: cap[0],
          href,
          title
        };
      }
    }
    table(src) {
      const cap = this.rules.block.table.exec(src);
      if (!cap) {
        return;
      }
      if (!/[:|]/.test(cap[2])) {
        return;
      }
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
      if (headers.length !== aligns.length) {
        return;
      }
      for (const align of aligns) {
        if (/^ *-+: *$/.test(align)) {
          item.align.push("right");
        } else if (/^ *:-+: *$/.test(align)) {
          item.align.push("center");
        } else if (/^ *:-+ *$/.test(align)) {
          item.align.push("left");
        } else {
          item.align.push(null);
        }
      }
      for (const header of headers) {
        item.header.push({
          text: header,
          tokens: this.lexer.inline(header)
        });
      }
      for (const row of rows) {
        item.rows.push(splitCells(row, item.header.length).map((cell) => {
          return {
            text: cell,
            tokens: this.lexer.inline(cell)
          };
        }));
      }
      return item;
    }
    lheading(src) {
      const cap = this.rules.block.lheading.exec(src);
      if (cap) {
        return {
          type: "heading",
          raw: cap[0],
          depth: cap[2].charAt(0) === "=" ? 1 : 2,
          text: cap[1],
          tokens: this.lexer.inline(cap[1])
        };
      }
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
      if (cap) {
        return {
          type: "text",
          raw: cap[0],
          text: cap[0],
          tokens: this.lexer.inline(cap[0])
        };
      }
    }
    escape(src) {
      const cap = this.rules.inline.escape.exec(src);
      if (cap) {
        return {
          type: "escape",
          raw: cap[0],
          text: escape$1(cap[1])
        };
      }
    }
    tag(src) {
      const cap = this.rules.inline.tag.exec(src);
      if (cap) {
        if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
          this.lexer.state.inLink = true;
        } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
          this.lexer.state.inLink = false;
        }
        if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.lexer.state.inRawBlock = true;
        } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.lexer.state.inRawBlock = false;
        }
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
          if (!/>$/.test(trimmedUrl)) {
            return;
          }
          const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
          if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
            return;
          }
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
          const link2 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
          if (link2) {
            href = link2[1];
            title = link2[3];
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : "";
        }
        href = href.trim();
        if (/^</.test(href)) {
          if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
            href = href.slice(1);
          } else {
            href = href.slice(1, -1);
          }
        }
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
        const link2 = links[linkString.toLowerCase()];
        if (!link2) {
          const text = cap[0].charAt(0);
          return {
            type: "text",
            raw: text,
            text
          };
        }
        return outputLink(cap, link2, cap[0], this.lexer);
      }
    }
    emStrong(src, maskedSrc, prevChar = "") {
      let match = this.rules.inline.emStrongLDelim.exec(src);
      if (!match)
        return;
      if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
        return;
      const nextChar = match[1] || match[2] || "";
      if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
        const lLength = [...match[0]].length - 1;
        let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
        const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
        endReg.lastIndex = 0;
        maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
        while ((match = endReg.exec(maskedSrc)) != null) {
          rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
          if (!rDelim)
            continue;
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
          if (delimTotal > 0)
            continue;
          rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
          const lastCharLength = [...match[0]][0].length;
          const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
          if (Math.min(lLength, rLength) % 2) {
            const text2 = raw.slice(1, -1);
            return {
              type: "em",
              raw,
              text: text2,
              tokens: this.lexer.inlineTokens(text2)
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
        if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
          text = text.substring(1, text.length - 1);
        }
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
      if (cap) {
        return {
          type: "br",
          raw: cap[0]
        };
      }
    }
    del(src) {
      const cap = this.rules.inline.del.exec(src);
      if (cap) {
        return {
          type: "del",
          raw: cap[0],
          text: cap[2],
          tokens: this.lexer.inlineTokens(cap[2])
        };
      }
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
          tokens: [
            {
              type: "text",
              raw: text,
              text
            }
          ]
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
          if (cap[1] === "www.") {
            href = "http://" + cap[0];
          } else {
            href = cap[0];
          }
        }
        return {
          type: "link",
          raw: cap[0],
          text,
          href,
          tokens: [
            {
              type: "text",
              raw: text,
              text
            }
          ]
        };
      }
    }
    inlineText(src) {
      const cap = this.rules.inline.text.exec(src);
      if (cap) {
        let text;
        if (this.lexer.state.inRawBlock) {
          text = cap[0];
        } else {
          text = escape$1(cap[0]);
        }
        return {
          type: "text",
          raw: cap[0],
          text
        };
      }
    }
  };
  var newline = /^(?: *(?:\n|$))+/;
  var blockCode = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/;
  var fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
  var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
  var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
  var bullet = /(?:[*+-]|\d{1,9}[.)])/;
  var lheading = edit(/^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, bullet).getRegex();
  var _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
  var blockText = /^[^\n]+/;
  var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
  var def = edit(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
  var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
  var _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  var _comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
  var html = edit("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  var paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
  var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
  var blockNormal = {
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
  var gfmTable = edit("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
  var blockGfm = {
    ...blockNormal,
    table: gfmTable,
    paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
  };
  var blockPedantic = {
    ...blockNormal,
    html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: noopTest,
    // fences not supported
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
  };
  var escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
  var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
  var br = /^( {2,}|\\)\n(?!\s*$)/;
  var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
  var _punctuation = "\\p{P}$+<=>`^|~";
  var punctuation = edit(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, _punctuation).getRegex();
  var blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
  var emStrongLDelim = edit(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, _punctuation).getRegex();
  var emStrongRDelimAst = edit("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, _punctuation).getRegex();
  var emStrongRDelimUnd = edit("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, _punctuation).getRegex();
  var anyPunctuation = edit(/\\([punct])/, "gu").replace(/punct/g, _punctuation).getRegex();
  var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
  var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
  var tag = edit("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
  var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  var link = edit(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
  var reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
  var nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
  var reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
  var inlineNormal = {
    _backpedal: noopTest,
    // only used for GFM url
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
  var inlinePedantic = {
    ...inlineNormal,
    link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
  };
  var inlineGfm = {
    ...inlineNormal,
    escape: edit(escape).replace("])", "~|])").getRegex(),
    url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
  };
  var inlineBreaks = {
    ...inlineGfm,
    br: edit(br).replace("{2,}", "*").getRegex(),
    text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
  };
  var block = {
    normal: blockNormal,
    gfm: blockGfm,
    pedantic: blockPedantic
  };
  var inline = {
    normal: inlineNormal,
    gfm: inlineGfm,
    breaks: inlineBreaks,
    pedantic: inlinePedantic
  };
  var _Lexer = class {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(options2) {
      this.tokens = [];
      this.tokens.links = /* @__PURE__ */ Object.create(null);
      this.options = options2 || _defaults;
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
        if (this.options.breaks) {
          rules.inline = inline.breaks;
        } else {
          rules.inline = inline.gfm;
        }
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
    static lex(src, options2) {
      const lexer2 = new _Lexer(options2);
      return lexer2.lex(src);
    }
    /**
     * Static Lex Inline Method
     */
    static lexInline(src, options2) {
      const lexer2 = new _Lexer(options2);
      return lexer2.inlineTokens(src);
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
      if (this.options.pedantic) {
        src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
      } else {
        src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
          return leading + "    ".repeat(tabs.length);
        });
      }
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
        })) {
          continue;
        }
        if (token = this.tokenizer.space(src)) {
          src = src.substring(token.raw.length);
          if (token.raw.length === 1 && tokens.length > 0) {
            tokens[tokens.length - 1].raw += "\n";
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.code(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
          } else {
            tokens.push(token);
          }
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
          } else if (!this.tokens.links[token.tag]) {
            this.tokens.links[token.tag] = {
              href: token.href,
              title: token.title
            };
          }
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
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
          lastToken = tokens[tokens.length - 1];
          if (lastParagraphClipped && lastToken.type === "paragraph") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.pop();
            this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
          } else {
            tokens.push(token);
          }
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
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      this.state.top = true;
      return tokens;
    }
    inline(src, tokens = []) {
      this.inlineQueue.push({ src, tokens });
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
          while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
            if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
              maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
            }
          }
        }
      }
      while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      }
      while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      }
      while (src) {
        if (!keepPrevChar) {
          prevChar = "";
        }
        keepPrevChar = false;
        if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          continue;
        }
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
          } else {
            tokens.push(token);
          }
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
          } else {
            tokens.push(token);
          }
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
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (token = this.tokenizer.inlineText(cutSrc)) {
          src = src.substring(token.raw.length);
          if (token.raw.slice(-1) !== "_") {
            prevChar = token.raw.slice(-1);
          }
          keepPrevChar = true;
          lastToken = tokens[tokens.length - 1];
          if (lastToken && lastToken.type === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      return tokens;
    }
  };
  var _Renderer = class {
    options;
    constructor(options2) {
      this.options = options2 || _defaults;
    }
    code(code, infostring, escaped) {
      const lang = (infostring || "").match(/^\S*/)?.[0];
      code = code.replace(/\n$/, "") + "\n";
      if (!lang) {
        return "<pre><code>" + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
      }
      return '<pre><code class="language-' + escape$1(lang) + '">' + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
    }
    blockquote(quote) {
      return `<blockquote>
${quote}</blockquote>
`;
    }
    html(html2, block2) {
      return html2;
    }
    heading(text, level, raw) {
      return `<h${level}>${text}</h${level}>
`;
    }
    hr() {
      return "<hr>\n";
    }
    list(body, ordered, start) {
      const type = ordered ? "ol" : "ul";
      const startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
      return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
    }
    listitem(text, task, checked) {
      return `<li>${text}</li>
`;
    }
    checkbox(checked) {
      return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
    }
    paragraph(text) {
      return `<p>${text}</p>
`;
    }
    table(header, body) {
      if (body)
        body = `<tbody>${body}</tbody>`;
      return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
    }
    tablerow(content) {
      return `<tr>
${content}</tr>
`;
    }
    tablecell(content, flags) {
      const type = flags.header ? "th" : "td";
      const tag2 = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
      return tag2 + content + `</${type}>
`;
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
      if (cleanHref === null) {
        return text;
      }
      href = cleanHref;
      let out = '<a href="' + href + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += ">" + text + "</a>";
      return out;
    }
    image(href, title, text) {
      const cleanHref = cleanUrl(href);
      if (cleanHref === null) {
        return text;
      }
      href = cleanHref;
      let out = `<img src="${href}" alt="${text}"`;
      if (title) {
        out += ` title="${title}"`;
      }
      out += ">";
      return out;
    }
    text(text) {
      return text;
    }
  };
  var _TextRenderer = class {
    // no need for block level renderers
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
  var _Parser = class {
    options;
    renderer;
    textRenderer;
    constructor(options2) {
      this.options = options2 || _defaults;
      this.options.renderer = this.options.renderer || new _Renderer();
      this.renderer = this.options.renderer;
      this.renderer.options = this.options;
      this.textRenderer = new _TextRenderer();
    }
    /**
     * Static Parse Method
     */
    static parse(tokens, options2) {
      const parser2 = new _Parser(options2);
      return parser2.parse(tokens);
    }
    /**
     * Static Parse Inline Method
     */
    static parseInline(tokens, options2) {
      const parser2 = new _Parser(options2);
      return parser2.parseInline(tokens);
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
          if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
            out += ret || "";
            continue;
          }
        }
        switch (token.type) {
          case "space": {
            continue;
          }
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
            for (let j = 0; j < tableToken.header.length; j++) {
              cell += this.renderer.tablecell(this.parseInline(tableToken.header[j].tokens), { header: true, align: tableToken.align[j] });
            }
            header += this.renderer.tablerow(cell);
            let body = "";
            for (let j = 0; j < tableToken.rows.length; j++) {
              const row = tableToken.rows[j];
              cell = "";
              for (let k = 0; k < row.length; k++) {
                cell += this.renderer.tablecell(this.parseInline(row[k].tokens), { header: false, align: tableToken.align[k] });
              }
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
                if (loose) {
                  if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                    item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                    if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                      item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                    }
                  } else {
                    item.tokens.unshift({
                      type: "text",
                      text: checkbox + " "
                    });
                  }
                } else {
                  itemBody += checkbox + " ";
                }
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
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return "";
            } else {
              throw new Error(errMsg);
            }
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
          if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
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
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return "";
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
  };
  var _Hooks = class {
    options;
    constructor(options2) {
      this.options = options2 || _defaults;
    }
    /**
     * Process markdown before marked
     */
    preprocess(markdown) {
      return markdown;
    }
    /**
     * Process HTML after marked is finished
     */
    postprocess(html2) {
      return html2;
    }
    /**
     * Process all tokens before walk tokens
     */
    processAllTokens(tokens) {
      return tokens;
    }
  };
  __publicField(_Hooks, "passThroughHooks", /* @__PURE__ */ new Set([
    "preprocess",
    "postprocess",
    "processAllTokens"
  ]));
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
            for (const cell of tableToken.header) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
            for (const row of tableToken.rows) {
              for (const cell of row) {
                values = values.concat(this.walkTokens(cell.tokens, callback));
              }
            }
            break;
          }
          case "list": {
            const listToken = token;
            values = values.concat(this.walkTokens(listToken.items, callback));
            break;
          }
          default: {
            const genericToken = token;
            if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
              this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
                const tokens2 = genericToken[childTokens].flat(Infinity);
                values = values.concat(this.walkTokens(tokens2, callback));
              });
            } else if (genericToken.tokens) {
              values = values.concat(this.walkTokens(genericToken.tokens, callback));
            }
          }
        }
      }
      return values;
    }
    use(...args) {
      const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
      args.forEach((pack) => {
        const opts = { ...pack };
        opts.async = this.defaults.async || opts.async || false;
        if (pack.extensions) {
          pack.extensions.forEach((ext) => {
            if (!ext.name) {
              throw new Error("extension name required");
            }
            if ("renderer" in ext) {
              const prevRenderer = extensions.renderers[ext.name];
              if (prevRenderer) {
                extensions.renderers[ext.name] = function(...args2) {
                  let ret = ext.renderer.apply(this, args2);
                  if (ret === false) {
                    ret = prevRenderer.apply(this, args2);
                  }
                  return ret;
                };
              } else {
                extensions.renderers[ext.name] = ext.renderer;
              }
            }
            if ("tokenizer" in ext) {
              if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
                throw new Error("extension level must be 'block' or 'inline'");
              }
              const extLevel = extensions[ext.level];
              if (extLevel) {
                extLevel.unshift(ext.tokenizer);
              } else {
                extensions[ext.level] = [ext.tokenizer];
              }
              if (ext.start) {
                if (ext.level === "block") {
                  if (extensions.startBlock) {
                    extensions.startBlock.push(ext.start);
                  } else {
                    extensions.startBlock = [ext.start];
                  }
                } else if (ext.level === "inline") {
                  if (extensions.startInline) {
                    extensions.startInline.push(ext.start);
                  } else {
                    extensions.startInline = [ext.start];
                  }
                }
              }
            }
            if ("childTokens" in ext && ext.childTokens) {
              extensions.childTokens[ext.name] = ext.childTokens;
            }
          });
          opts.extensions = extensions;
        }
        if (pack.renderer) {
          const renderer = this.defaults.renderer || new _Renderer(this.defaults);
          for (const prop in pack.renderer) {
            if (!(prop in renderer)) {
              throw new Error(`renderer '${prop}' does not exist`);
            }
            if (prop === "options") {
              continue;
            }
            const rendererProp = prop;
            const rendererFunc = pack.renderer[rendererProp];
            const prevRenderer = renderer[rendererProp];
            renderer[rendererProp] = (...args2) => {
              let ret = rendererFunc.apply(renderer, args2);
              if (ret === false) {
                ret = prevRenderer.apply(renderer, args2);
              }
              return ret || "";
            };
          }
          opts.renderer = renderer;
        }
        if (pack.tokenizer) {
          const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
          for (const prop in pack.tokenizer) {
            if (!(prop in tokenizer)) {
              throw new Error(`tokenizer '${prop}' does not exist`);
            }
            if (["options", "rules", "lexer"].includes(prop)) {
              continue;
            }
            const tokenizerProp = prop;
            const tokenizerFunc = pack.tokenizer[tokenizerProp];
            const prevTokenizer = tokenizer[tokenizerProp];
            tokenizer[tokenizerProp] = (...args2) => {
              let ret = tokenizerFunc.apply(tokenizer, args2);
              if (ret === false) {
                ret = prevTokenizer.apply(tokenizer, args2);
              }
              return ret;
            };
          }
          opts.tokenizer = tokenizer;
        }
        if (pack.hooks) {
          const hooks = this.defaults.hooks || new _Hooks();
          for (const prop in pack.hooks) {
            if (!(prop in hooks)) {
              throw new Error(`hook '${prop}' does not exist`);
            }
            if (prop === "options") {
              continue;
            }
            const hooksProp = prop;
            const hooksFunc = pack.hooks[hooksProp];
            const prevHook = hooks[hooksProp];
            if (_Hooks.passThroughHooks.has(prop)) {
              hooks[hooksProp] = (arg) => {
                if (this.defaults.async) {
                  return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                    return prevHook.call(hooks, ret2);
                  });
                }
                const ret = hooksFunc.call(hooks, arg);
                return prevHook.call(hooks, ret);
              };
            } else {
              hooks[hooksProp] = (...args2) => {
                let ret = hooksFunc.apply(hooks, args2);
                if (ret === false) {
                  ret = prevHook.apply(hooks, args2);
                }
                return ret;
              };
            }
          }
          opts.hooks = hooks;
        }
        if (pack.walkTokens) {
          const walkTokens2 = this.defaults.walkTokens;
          const packWalktokens = pack.walkTokens;
          opts.walkTokens = function(token) {
            let values = [];
            values.push(packWalktokens.call(this, token));
            if (walkTokens2) {
              values = values.concat(walkTokens2.call(this, token));
            }
            return values;
          };
        }
        this.defaults = { ...this.defaults, ...opts };
      });
      return this;
    }
    setOptions(opt) {
      this.defaults = { ...this.defaults, ...opt };
      return this;
    }
    lexer(src, options2) {
      return _Lexer.lex(src, options2 ?? this.defaults);
    }
    parser(tokens, options2) {
      return _Parser.parse(tokens, options2 ?? this.defaults);
    }
    #parseMarkdown(lexer2, parser2) {
      return (src, options2) => {
        const origOpt = { ...options2 };
        const opt = { ...this.defaults, ...origOpt };
        if (this.defaults.async === true && origOpt.async === false) {
          if (!opt.silent) {
            console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.");
          }
          opt.async = true;
        }
        const throwError = this.#onError(!!opt.silent, !!opt.async);
        if (typeof src === "undefined" || src === null) {
          return throwError(new Error("marked(): input parameter is undefined or null"));
        }
        if (typeof src !== "string") {
          return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
        }
        if (opt.hooks) {
          opt.hooks.options = opt;
        }
        if (opt.async) {
          return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html2) => opt.hooks ? opt.hooks.postprocess(html2) : html2).catch(throwError);
        }
        try {
          if (opt.hooks) {
            src = opt.hooks.preprocess(src);
          }
          let tokens = lexer2(src, opt);
          if (opt.hooks) {
            tokens = opt.hooks.processAllTokens(tokens);
          }
          if (opt.walkTokens) {
            this.walkTokens(tokens, opt.walkTokens);
          }
          let html2 = parser2(tokens, opt);
          if (opt.hooks) {
            html2 = opt.hooks.postprocess(html2);
          }
          return html2;
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
          if (async) {
            return Promise.resolve(msg);
          }
          return msg;
        }
        if (async) {
          return Promise.reject(e);
        }
        throw e;
      };
    }
  };
  var markedInstance = new Marked();
  function marked(src, opt) {
    return markedInstance.parse(src, opt);
  }
  marked.options = marked.setOptions = function(options2) {
    markedInstance.setOptions(options2);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.getDefaults = _getDefaults;
  marked.defaults = _defaults;
  marked.use = function(...args) {
    markedInstance.use(...args);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.walkTokens = function(tokens, callback) {
    return markedInstance.walkTokens(tokens, callback);
  };
  marked.parseInline = markedInstance.parseInline;
  marked.Parser = _Parser;
  marked.parser = _Parser.parse;
  marked.Renderer = _Renderer;
  marked.TextRenderer = _TextRenderer;
  marked.Lexer = _Lexer;
  marked.lexer = _Lexer.lex;
  marked.Tokenizer = _Tokenizer;
  marked.Hooks = _Hooks;
  marked.parse = marked;
  var options = marked.options;
  var setOptions = marked.setOptions;
  var use = marked.use;
  var walkTokens = marked.walkTokens;
  var parseInline = marked.parseInline;
  var parser = _Parser.parse;
  var lexer = _Lexer.lex;

  // plugins/dorion-settings/util/changelog.ts
  var {
    ui: { showToast: showToast2 },
    plugins: { installedPlugins }
  } = shelter;
  var devModeReservedId = "__DEVMODE_PLUGIN_DO_NOT_USE_OR_YOU_WILL_BE_FIRED";
  function isDevMode() {
    return installedPlugins() && devModeReservedId in installedPlugins();
  }
  function loadChangelog() {
    return __async(this, null, function* () {
      if (isDevMode()) {
        console.warn(`[${appName} Changelog] Dev mode is on. Loading changelog from local storage.`);
        return loadChangelogFromLocalStorage();
      }
      try {
        const changelog = yield fetchChangelogFromGitHub();
        saveChangelogToLocalStorage(changelog);
        return changelog;
      } catch (e) {
        console.error(e);
        showToast2({
          title: "Failed to load changelog",
          content: e.message,
          duration: 3e3
        });
        return loadChangelogFromLocalStorage();
      }
    });
  }
  function fetchChangelogFromGitHub() {
    return __async(this, null, function* () {
      const response = yield fetch(`https://api.github.com/repos/SpikeHD/${appName}/releases`, {
        headers: {
          "User-Agent": appName
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch changelog. ${response.status} ${response.statusText}`);
      }
      return yield response.json();
    });
  }
  function loadChangelogFromLocalStorage() {
    const changelog = localStorage.getItem("changelog");
    if (!changelog)
      return [];
    return JSON.parse(changelog);
  }
  function saveChangelogToLocalStorage(changelog) {
    localStorage.setItem("changelog", JSON.stringify(changelog));
  }
  function processReleaseBodies(releases) {
    return __async(this, null, function* () {
      const processedReleases = yield Promise.all(releases.map((release) => __async(this, null, function* () {
        release.body = yield processReleaseBody(release.body);
        return release;
      })));
      return processedReleases;
    });
  }
  function processReleaseBody(body) {
    return __async(this, null, function* () {
      const parsedBody = yield marked.parse(body);
      return parsedBody.replace("\n", "").replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code)).replace(/@([\w-]+)/g, '<a href="https://github.com/$1">@$1</a>').replace(/#(\d+)/g, `<a href="https://github.com/spikehd/${appName}/pull/$1">#$1</a>`).replace(/<a href="([^"]+)">([^<]+)<\/a>/g, '<a href="$1" target="_blank">$2</a>');
    });
  }
  function fixImageLinks(scope) {
    return __async(this, null, function* () {
      if (!scope)
        return;
      const images = scope.getElementsByTagName("img");
      yield Promise.all(Array.from(images).map((image) => __async(this, null, function* () {
        const url = image.src;
        image.src = yield api.util.fetchImage(url);
      })));
    });
  }

  // plugins/dorion-settings/pages/ChangelogPage.tsx
  var _tmpl$9 = /* @__PURE__ */ (0, import_web43.template)(`<div><div></div></div>`, 4);
  var _tmpl$25 = /* @__PURE__ */ (0, import_web43.template)(`<div></div>`, 2);
  var _tmpl$33 = /* @__PURE__ */ (0, import_web43.template)(`<span></span>`, 2);
  var _tmpl$43 = /* @__PURE__ */ (0, import_web43.template)(`<span>Current</span>`, 2);
  var _tmpl$52 = /* @__PURE__ */ (0, import_web43.template)(`<span>Latest</span>`, 2);
  var PAGE_ID = `${appName.toLowerCase()}-changelog-tab`;
  var {
    ui: {
      injectCss: injectCss9,
      Header: Header4,
      HeaderTags: HeaderTags4,
      Button: Button4,
      ButtonSizes: ButtonSizes2,
      ButtonColors: ButtonColors2,
      Text: Text3,
      LinkButton
    },
    solid: {
      createSignal: createSignal4,
      createEffect: createEffect4
    }
  } = shelter;
  var injectedCss9 = false;
  function ChangelogPage() {
    if (!injectedCss9) {
      injectedCss9 = true;
      injectCss9(css8);
    }
    const [loading, setLoading] = createSignal4(true);
    const [releases, setReleases] = createSignal4([]);
    const [currentVersion, setCurrentVersion] = createSignal4("");
    const [latestVersion, setLatestVersion] = createSignal4("");
    const [updateCheck, setUpdateCheck] = createSignal4([]);
    createEffect4(() => __async(this, null, function* () {
      setReleases(yield processReleaseBodies(yield loadChangelog()));
      setCurrentVersion(`v${yield app.getVersion()}`);
      if (releases().length > 0) {
        setLatestVersion(releases()[0].tag_name);
      }
      setUpdateCheck(yield invoke("update_check"));
      setLoading(false);
      yield fixImageLinks(document.getElementById(PAGE_ID));
    }), []);
    function doUpdate() {
      return __async(this, null, function* () {
        invoke("do_update", {
          toUpdate: updateCheck()
        });
      });
    }
    function refresh() {
      return __async(this, null, function* () {
        setLoading(true);
        setReleases(yield processReleaseBodies(yield loadChangelog()));
        setLoading(false);
        yield fixImageLinks(document.getElementById(PAGE_ID));
      });
    }
    return [(0, import_web48.createComponent)(Header4, {
      get tag() {
        return HeaderTags4.H1;
      },
      get ["class"]() {
        return classes8.tophead;
      },
      children: "Changelog"
    }), (0, import_web48.createComponent)(Button4, {
      onClick: refresh,
      get disabled() {
        return loading();
      },
      get ["class"]() {
        return classes8.refresh;
      },
      children: "Refresh"
    }), (0, import_web47.memo)((() => {
      const _c$ = (0, import_web47.memo)(() => !!loading());
      return () => _c$() ? (() => {
        const _el$ = _tmpl$9.cloneNode(true), _el$2 = _el$.firstChild;
        (0, import_web46.effect)((_p$) => {
          const _v$ = classes8.card, _v$2 = classes8.spinner;
          _v$ !== _p$._v$ && (0, import_web45.className)(_el$, _p$._v$ = _v$);
          _v$2 !== _p$._v$2 && (0, import_web45.className)(_el$2, _p$._v$2 = _v$2);
          return _p$;
        }, {
          _v$: void 0,
          _v$2: void 0
        });
        return _el$;
      })() : [(0, import_web47.memo)((() => {
        const _c$2 = (0, import_web47.memo)(() => !!updateCheck().includes("dorion"));
        return () => _c$2() && (() => {
          const _el$3 = _tmpl$25.cloneNode(true);
          (0, import_web44.insert)(_el$3, (0, import_web48.createComponent)(Header4, {
            get tag() {
              return HeaderTags4.H1;
            },
            get ["class"]() {
              return classes8.title;
            },
            children: "Update available!"
          }), null);
          (0, import_web44.insert)(_el$3, (0, import_web48.createComponent)(Text3, {
            get children() {
              return ["Your current version is ", (0, import_web47.memo)(() => currentVersion())];
            }
          }), null);
          (0, import_web44.insert)(_el$3, (0, import_web48.createComponent)(Button4, {
            get size() {
              return ButtonSizes2.LARGE;
            },
            get color() {
              return ButtonColors2.GREEN;
            },
            onClick: doUpdate,
            get children() {
              return ["Update to ", (0, import_web47.memo)(() => latestVersion())];
            }
          }), null);
          (0, import_web46.effect)(() => (0, import_web45.className)(_el$3, classes8.card));
          return _el$3;
        })();
      })()), (0, import_web47.memo)((() => {
        const _c$3 = (0, import_web47.memo)(() => !!(releases() != null && releases().length > 0));
        return () => _c$3() && releases().map((release) => (() => {
          const _el$4 = _tmpl$9.cloneNode(true), _el$7 = _el$4.firstChild;
          (0, import_web44.insert)(_el$4, (0, import_web48.createComponent)(Header4, {
            get tag() {
              return HeaderTags4.H1;
            },
            get ["class"]() {
              return classes8.title;
            },
            get children() {
              return [(() => {
                const _el$5 = _tmpl$33.cloneNode(true);
                (0, import_web44.insert)(_el$5, () => release.name);
                return _el$5;
              })(), (() => {
                const _el$6 = _tmpl$25.cloneNode(true);
                (0, import_web44.insert)(_el$6, (() => {
                  const _c$4 = (0, import_web47.memo)(() => currentVersion() == release.tag_name);
                  return () => _c$4() && (() => {
                    const _el$8 = _tmpl$43.cloneNode(true);
                    (0, import_web46.effect)(() => (0, import_web45.className)(_el$8, classes8.badge));
                    return _el$8;
                  })();
                })(), null);
                (0, import_web44.insert)(_el$6, (() => {
                  const _c$5 = (0, import_web47.memo)(() => releases()[0].tag_name == release.tag_name);
                  return () => _c$5() && (() => {
                    const _el$9 = _tmpl$52.cloneNode(true);
                    (0, import_web46.effect)(() => (0, import_web45.className)(_el$9, classes8.badge));
                    return _el$9;
                  })();
                })(), null);
                (0, import_web46.effect)(() => (0, import_web45.className)(_el$6, classes8.badges));
                return _el$6;
              })()];
            }
          }), _el$7);
          (0, import_web44.insert)(_el$4, (0, import_web48.createComponent)(LinkButton, {
            get href() {
              return release.html_url;
            },
            children: "View on GitHub"
          }), _el$7);
          (0, import_web46.effect)((_p$) => {
            const _v$3 = classes8.card, _v$4 = classes8.contents, _v$5 = release.body;
            _v$3 !== _p$._v$3 && (0, import_web45.className)(_el$4, _p$._v$3 = _v$3);
            _v$4 !== _p$._v$4 && (0, import_web45.className)(_el$7, _p$._v$4 = _v$4);
            _v$5 !== _p$._v$5 && (_el$7.innerHTML = _p$._v$5 = _v$5);
            return _p$;
          }, {
            _v$3: void 0,
            _v$4: void 0,
            _v$5: void 0
          });
          return _el$4;
        })());
      })())];
    })())];
  }

  // plugins/dorion-settings/pages/PluginsPage.tsx
  var import_web63 = __toESM(require_web(), 1);
  var import_web64 = __toESM(require_web(), 1);

  // plugins/dorion-settings/components/ClientModList.tsx
  var import_web49 = __toESM(require_web(), 1);
  var import_web50 = __toESM(require_web(), 1);
  var import_web51 = __toESM(require_web(), 1);
  var import_web52 = __toESM(require_web(), 1);
  var import_web53 = __toESM(require_web(), 1);
  var import_web54 = __toESM(require_web(), 1);
  var import_web55 = __toESM(require_web(), 1);

  // plugins/dorion-settings/components/ClientModList.tsx.scss
  var css9 = `._shead_mh3lt_1{margin-top:16px;margin-bottom:8px}._plist_mh3lt_1{display:flex;flex-direction:column;align-items:center;justify-content:space-between;font-size:16px}._pheader_mh3lt_1{border-bottom:1px solid var(--background-tertiary);font-weight:bold;padding-bottom:16px}._pbuttons_mh3lt_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;margin-top:16px}._pbuttons_mh3lt_1 button{width:30%;padding:18px}._sbutton_mh3lt_1{margin-top:16px;padding:18px;width:100%}._plistrow_mh3lt_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;padding:16px}._plistrow_mh3lt_1 ._scell_mh3lt_1{display:flex;align-items:center;justify-content:center;width:30%}._plistrow_mh3lt_1 ._mcell_mh3lt_1{display:flex;align-items:center;justify-content:flex-start;width:50%}._left16_mh3lt_1{margin-left:16px}._top16_mh3lt_1{margin-top:16px}._top32_mh3lt_1{margin-top:32px}`;
  var classes9 = {
    "shead": "_shead_mh3lt_1",
    "plist": "_plist_mh3lt_1",
    "pheader": "_pheader_mh3lt_1",
    "pbuttons": "_pbuttons_mh3lt_1",
    "sbutton": "_sbutton_mh3lt_1",
    "plistrow": "_plistrow_mh3lt_1",
    "scell": "_scell_mh3lt_1",
    "mcell": "_mcell_mh3lt_1",
    "left16": "_left16_mh3lt_1",
    "top16": "_top16_mh3lt_1",
    "top32": "_top32_mh3lt_1"
  };

  // plugins/dorion-settings/components/ClientModList.tsx
  var _tmpl$10 = /* @__PURE__ */ (0, import_web49.template)(`<div><div><div></div><div></div></div></div>`, 8);
  var _tmpl$26 = /* @__PURE__ */ (0, import_web49.template)(`<div></div>`, 2);
  var _tmpl$34 = /* @__PURE__ */ (0, import_web49.template)(`<div><div></div><div></div></div>`, 6);
  var {
    ui: {
      Switch,
      Text: Text4,
      injectCss: injectCss10
    },
    solid: {
      createSignal: createSignal5
    }
  } = shelter;
  var injectedCss10 = false;
  var getClientMods = () => __async(void 0, null, function* () {
    try {
      return yield invoke("available_mods");
    } catch (e) {
    }
  });
  function ClientModList(props) {
    if (!injectedCss10) {
      injectedCss10 = true;
      injectCss10(css9);
    }
    const [settings, setSettingsState] = createSignal5({
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
    const [clientMods, setClientMods] = createSignal5([]);
    (() => __async(this, null, function* () {
      setSettingsState(JSON.parse(yield invoke("read_config_file")));
      setClientMods(yield getClientMods());
      console.log(settings());
    }))();
    function onClientModToggle(modName) {
      const newClientMods = [...settings().client_mods];
      if (newClientMods.includes(modName)) {
        newClientMods.splice(newClientMods.indexOf(modName), 1);
      } else {
        newClientMods.push(modName);
      }
      setSettings((s) => __spreadProps(__spreadValues({}, s), {
        client_mods: newClientMods
      }));
      props.onChange();
    }
    const setSettings = (fn) => {
      setSettingsState(fn(settings()));
      invoke("write_config_file", {
        contents: JSON.stringify(fn(settings()))
      });
    };
    return (0, import_web55.createComponent)(Card, {
      style: {
        marginTop: "1rem"
      },
      get children() {
        const _el$ = _tmpl$10.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling;
        (0, import_web54.insert)(_el$3, (0, import_web55.createComponent)(Text4, {
          get ["class"]() {
            return classes9.left16;
          },
          children: "Client Mod Name"
        }));
        (0, import_web54.insert)(_el$4, (0, import_web55.createComponent)(Text4, {
          get ["class"]() {
            return classes9.left16;
          },
          children: "Enabled"
        }));
        (0, import_web54.insert)(_el$, (() => {
          const _c$ = (0, import_web53.memo)(() => clientMods().length === 0);
          return () => _c$() && (() => {
            const _el$5 = _tmpl$26.cloneNode(true);
            (0, import_web54.insert)(_el$5, (0, import_web55.createComponent)(Text4, {
              get ["class"]() {
                return classes9.left16;
              },
              children: "Client mods not available. Please update"
            }));
            (0, import_web52.effect)(() => (0, import_web51.className)(_el$5, classes9.plistrow));
            return _el$5;
          })();
        })(), null);
        (0, import_web54.insert)(_el$, () => clientMods().map((modName) => (() => {
          const _el$6 = _tmpl$34.cloneNode(true), _el$7 = _el$6.firstChild, _el$8 = _el$7.nextSibling;
          (0, import_web50.setAttribute)(_el$6, "key", modName);
          (0, import_web54.insert)(_el$7, (0, import_web55.createComponent)(Text4, {
            get ["class"]() {
              return classes9.left16;
            },
            children: modName
          }));
          (0, import_web54.insert)(_el$8, (0, import_web55.createComponent)(Switch, {
            disabled: modName === "Shelter",
            get checked() {
              var _a;
              return ((_a = settings().client_mods) == null ? void 0 : _a.includes(modName)) || false;
            },
            onChange: () => onClientModToggle(modName)
          }));
          (0, import_web52.effect)((_p$) => {
            const _v$5 = classes9.plistrow, _v$6 = classes9.mcell, _v$7 = classes9.scell;
            _v$5 !== _p$._v$5 && (0, import_web51.className)(_el$6, _p$._v$5 = _v$5);
            _v$6 !== _p$._v$6 && (0, import_web51.className)(_el$7, _p$._v$6 = _v$6);
            _v$7 !== _p$._v$7 && (0, import_web51.className)(_el$8, _p$._v$7 = _v$7);
            return _p$;
          }, {
            _v$5: void 0,
            _v$6: void 0,
            _v$7: void 0
          });
          return _el$6;
        })()), null);
        (0, import_web52.effect)((_p$) => {
          const _v$ = classes9.plist, _v$2 = classes9.pheader + " " + classes9.plistrow, _v$3 = classes9.mcell, _v$4 = classes9.scell;
          _v$ !== _p$._v$ && (0, import_web51.className)(_el$, _p$._v$ = _v$);
          _v$2 !== _p$._v$2 && (0, import_web51.className)(_el$2, _p$._v$2 = _v$2);
          _v$3 !== _p$._v$3 && (0, import_web51.className)(_el$3, _p$._v$3 = _v$3);
          _v$4 !== _p$._v$4 && (0, import_web51.className)(_el$4, _p$._v$4 = _v$4);
          return _p$;
        }, {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0,
          _v$4: void 0
        });
        return _el$;
      }
    });
  }

  // plugins/dorion-settings/components/PluginList.tsx
  var import_web56 = __toESM(require_web(), 1);
  var import_web57 = __toESM(require_web(), 1);
  var import_web58 = __toESM(require_web(), 1);
  var import_web59 = __toESM(require_web(), 1);
  var import_web60 = __toESM(require_web(), 1);
  var import_web61 = __toESM(require_web(), 1);
  var import_web62 = __toESM(require_web(), 1);

  // plugins/dorion-settings/components/PluginList.tsx.scss
  var css10 = `._plist_1n17i_1{display:flex;flex-direction:column;align-items:center;justify-content:space-between;font-size:16px}._pheader_1n17i_1{border-bottom:1px solid var(--background-tertiary);font-weight:bold;padding-bottom:16px}._pbuttons_1n17i_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;margin-top:16px}._pbuttons_1n17i_1 button{width:30%;padding:18px}._sbutton_1n17i_1{margin-top:16px;padding:18px;width:100%}._plistrow_1n17i_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;padding:16px}._plistrow_1n17i_1 ._scell_1n17i_1{display:flex;align-items:center;justify-content:center;width:30%}._plistrow_1n17i_1 ._mcell_1n17i_1{display:flex;align-items:center;justify-content:flex-start;width:50%}._left16_1n17i_1{margin-left:16px}._top16_1n17i_1{margin-top:16px}._top32_1n17i_1{margin-top:32px}`;
  var classes10 = {
    "plist": "_plist_1n17i_1",
    "pheader": "_pheader_1n17i_1",
    "pbuttons": "_pbuttons_1n17i_1",
    "sbutton": "_sbutton_1n17i_1",
    "plistrow": "_plistrow_1n17i_1",
    "scell": "_scell_1n17i_1",
    "mcell": "_mcell_1n17i_1",
    "left16": "_left16_1n17i_1",
    "top16": "_top16_1n17i_1",
    "top32": "_top32_1n17i_1"
  };

  // plugins/dorion-settings/components/PluginList.tsx
  var _tmpl$11 = /* @__PURE__ */ (0, import_web56.template)(`<div><div><div></div><div></div><div></div></div></div>`, 10);
  var _tmpl$27 = /* @__PURE__ */ (0, import_web56.template)(`<div></div>`, 2);
  var _tmpl$35 = /* @__PURE__ */ (0, import_web56.template)(`<div><div></div><div></div><div></div></div>`, 8);
  var {
    ui: {
      Switch: Switch2,
      Text: Text5,
      injectCss: injectCss11
    },
    solid: {
      createSignal: createSignal6
    }
  } = shelter;
  var injectedCss11 = false;
  var getPlugins = () => __async(void 0, null, function* () {
    const plugins = yield invoke("get_plugin_list");
    return plugins;
  });
  function PluginList(props) {
    if (!injectedCss11) {
      injectedCss11 = true;
      injectCss11(css10);
    }
    const [plugins, setPlugins] = createSignal6({});
    (() => __async(this, null, function* () {
      setPlugins(yield getPlugins());
    }))();
    return (0, import_web62.createComponent)(Card, {
      style: {
        marginTop: "1rem"
      },
      get children() {
        const _el$ = _tmpl$11.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling;
        (0, import_web61.insert)(_el$3, (0, import_web62.createComponent)(Text5, {
          get ["class"]() {
            return classes10.left16;
          },
          children: "Plugin Name"
        }));
        (0, import_web61.insert)(_el$4, (0, import_web62.createComponent)(Text5, {
          get ["class"]() {
            return classes10.left16;
          },
          children: "Enabled"
        }));
        (0, import_web61.insert)(_el$5, (0, import_web62.createComponent)(Text5, {
          get ["class"]() {
            return classes10.left16;
          },
          children: "Preload"
        }));
        (0, import_web61.insert)(_el$, (() => {
          const _c$ = (0, import_web60.memo)(() => Object.entries(plugins()).length === 0);
          return () => _c$() && (() => {
            const _el$6 = _tmpl$27.cloneNode(true);
            (0, import_web61.insert)(_el$6, (0, import_web62.createComponent)(Text5, {
              get ["class"]() {
                return classes10.left16;
              },
              children: "No plugins found"
            }));
            (0, import_web59.effect)(() => (0, import_web58.className)(_el$6, classes10.plistrow));
            return _el$6;
          })();
        })(), null);
        (0, import_web61.insert)(_el$, () => Object.entries(plugins()).map(([filename, plugin]) => (() => {
          const _el$7 = _tmpl$35.cloneNode(true), _el$8 = _el$7.firstChild, _el$9 = _el$8.nextSibling, _el$10 = _el$9.nextSibling;
          (0, import_web57.setAttribute)(_el$7, "key", filename);
          (0, import_web61.insert)(_el$8, (0, import_web62.createComponent)(Text5, {
            get ["class"]() {
              return classes10.left16;
            },
            get children() {
              return plugin.name;
            }
          }));
          (0, import_web61.insert)(_el$9, (0, import_web62.createComponent)(Switch2, {
            get checked() {
              return plugin.enabled;
            },
            onChange: () => {
              props.onChange();
              invoke("toggle_plugin", {
                name: filename
              });
              setPlugins(__spreadProps(__spreadValues({}, plugins()), {
                [filename]: __spreadProps(__spreadValues({}, plugin), {
                  enabled: !plugin.enabled
                })
              }));
            },
            style: {
              flexDirection: "column-reverse"
            }
          }));
          (0, import_web61.insert)(_el$10, (0, import_web62.createComponent)(Switch2, {
            get checked() {
              return plugin.preload;
            },
            onChange: () => {
              props.onChange();
              invoke("toggle_preload", {
                name: filename
              });
              setPlugins(__spreadProps(__spreadValues({}, plugins()), {
                [filename]: __spreadProps(__spreadValues({}, plugin), {
                  preload: !plugin.preload
                })
              }));
            }
          }));
          (0, import_web59.effect)((_p$) => {
            const _v$6 = classes10.plistrow, _v$7 = classes10.mcell, _v$8 = classes10.scell, _v$9 = classes10.scell;
            _v$6 !== _p$._v$6 && (0, import_web58.className)(_el$7, _p$._v$6 = _v$6);
            _v$7 !== _p$._v$7 && (0, import_web58.className)(_el$8, _p$._v$7 = _v$7);
            _v$8 !== _p$._v$8 && (0, import_web58.className)(_el$9, _p$._v$8 = _v$8);
            _v$9 !== _p$._v$9 && (0, import_web58.className)(_el$10, _p$._v$9 = _v$9);
            return _p$;
          }, {
            _v$6: void 0,
            _v$7: void 0,
            _v$8: void 0,
            _v$9: void 0
          });
          return _el$7;
        })()), null);
        (0, import_web59.effect)((_p$) => {
          const _v$ = classes10.plist, _v$2 = classes10.pheader + " " + classes10.plistrow, _v$3 = classes10.mcell, _v$4 = classes10.scell, _v$5 = classes10.scell;
          _v$ !== _p$._v$ && (0, import_web58.className)(_el$, _p$._v$ = _v$);
          _v$2 !== _p$._v$2 && (0, import_web58.className)(_el$2, _p$._v$2 = _v$2);
          _v$3 !== _p$._v$3 && (0, import_web58.className)(_el$3, _p$._v$3 = _v$3);
          _v$4 !== _p$._v$4 && (0, import_web58.className)(_el$4, _p$._v$4 = _v$4);
          _v$5 !== _p$._v$5 && (0, import_web58.className)(_el$5, _p$._v$5 = _v$5);
          return _p$;
        }, {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0,
          _v$4: void 0,
          _v$5: void 0
        });
        return _el$;
      }
    });
  }

  // plugins/dorion-settings/pages/PluginsPage.tsx.scss
  var css11 = `._tophead_143fh_1{margin-bottom:16px}._shead_143fh_1{margin-top:16px;margin-bottom:8px}._card_143fh_1{margin-bottom:16px}._fcard_143fh_1{display:flex;flex-direction:row;justify-content:space-between;align-items:center;color:var(--text-primary);padding:8px}._pcard_143fh_1{display:flex}._left16_143fh_1{margin-left:16px}._themeRow_143fh_1{display:flex;flex-direction:row;justify-content:space-between;align-items:center;height:42px}._openButton_143fh_1{margin-top:16px;width:100% !important}`;
  var classes11 = {
    "tophead": "_tophead_143fh_1",
    "shead": "_shead_143fh_1",
    "card": "_card_143fh_1",
    "fcard": "_fcard_143fh_1",
    "pcard": "_pcard_143fh_1",
    "left16": "_left16_143fh_1",
    "themeRow": "_themeRow_143fh_1",
    "openButton": "_openButton_143fh_1"
  };

  // plugins/dorion-settings/pages/PluginsPage.tsx
  var {
    ui: {
      Header: Header5,
      Button: Button5,
      HeaderTags: HeaderTags5,
      injectCss: injectCss12,
      ButtonSizes: ButtonSizes3
    },
    solid: {
      createSignal: createSignal7
    }
  } = shelter;
  var injectedCss12 = false;
  function PluginsPage() {
    const [restartRequired, setRestartRequired] = createSignal7(false);
    if (!injectedCss12) {
      injectedCss12 = true;
      injectCss12(css11);
    }
    const openPluginsFolder = () => {
      invoke("open_plugins");
    };
    return [(0, import_web64.createComponent)(Header5, {
      get tag() {
        return HeaderTags5.H1;
      },
      get ["class"]() {
        return classes11.tophead;
      },
      children: "Client Mods & Plugins"
    }), (0, import_web63.memo)((() => {
      const _c$ = (0, import_web63.memo)(() => !!restartRequired());
      return () => _c$() && (0, import_web64.createComponent)(WarningCard, {});
    })()), (0, import_web64.createComponent)(Header5, {
      get ["class"]() {
        return classes11.shead;
      },
      children: "Client Mods"
    }), (0, import_web64.createComponent)(ClientModList, {
      onChange: () => {
        setRestartRequired(true);
      }
    }), (0, import_web64.createComponent)(Header5, {
      get ["class"]() {
        return classes11.shead;
      },
      children: "Plugins"
    }), (0, import_web64.createComponent)(PluginList, {
      onChange: () => {
        setRestartRequired(true);
      }
    }), (0, import_web64.createComponent)(Button5, {
      get size() {
        return ButtonSizes3.MEDIUM;
      },
      get ["class"]() {
        return classes11.openButton;
      },
      onClick: openPluginsFolder,
      children: "Open Plugins Folder"
    })];
  }

  // plugins/dorion-settings/pages/ThemesPage.tsx
  var import_web70 = __toESM(require_web(), 1);
  var import_web71 = __toESM(require_web(), 1);
  var import_web72 = __toESM(require_web(), 1);
  var import_web73 = __toESM(require_web(), 1);
  var import_web74 = __toESM(require_web(), 1);

  // plugins/dorion-settings/pages/ThemesPage.tsx.scss
  var css12 = `._tophead_1m9gf_1{margin-bottom:16px}._shead_1m9gf_1{margin-top:16px;margin-bottom:8px}._pbuttons_1m9gf_1{display:flex;gap:16px;margin-top:16px}._pbuttons_1m9gf_1 button{width:100% !important}`;
  var classes12 = {
    "tophead": "_tophead_1m9gf_1",
    "shead": "_shead_1m9gf_1",
    "pbuttons": "_pbuttons_1m9gf_1"
  };

  // plugins/dorion-settings/util/theme.tsx
  var import_web67 = __toESM(require_web(), 1);
  var import_web68 = __toESM(require_web(), 1);
  var import_web69 = __toESM(require_web(), 1);

  // plugins/dorion-settings/util/modal.tsx
  var import_web65 = __toESM(require_web(), 1);
  var import_web66 = __toESM(require_web(), 1);
  var {
    ui: {
      ModalRoot,
      ModalHeader,
      ModalBody,
      ModalConfirmFooter
    }
  } = shelter;
  var confirmModal = (props) => (0, import_web66.createComponent)(ModalRoot, {
    get children() {
      return [(0, import_web66.createComponent)(ModalHeader, {
        get close() {
          return props.onCancel;
        },
        get children() {
          return props.header;
        }
      }), (0, import_web66.createComponent)(ModalBody, {
        get children() {
          return props.body;
        }
      }), (0, import_web66.createComponent)(ModalConfirmFooter, {
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
      })];
    }
  });

  // plugins/dorion-settings/util/theme.tsx
  var _tmpl$12 = /* @__PURE__ */ (0, import_web67.template)(`<div><div></div></div>`, 4);
  var {
    ui: {
      openModal,
      TextBox: TextBox2,
      Text: Text6
    },
    solid: {
      createSignal: createSignal8
    }
  } = shelter;
  var installThemeModal = () => __async(void 0, null, function* () {
    const [link2, setLink] = createSignal8("");
    const [status, setStatus] = createSignal8("");
    openModal((props) => confirmModal({
      header: "Install Theme",
      body: (() => {
        const _el$ = _tmpl$12.cloneNode(true), _el$2 = _el$.firstChild;
        (0, import_web68.insert)(_el$, (0, import_web69.createComponent)(TextBox2, {
          get value() {
            return link2();
          },
          onInput: (v) => setLink(v),
          placeholder: "https://raw.githubusercontent.com/.../theme.css"
        }), _el$2);
        _el$2.style.setProperty("display", "flex");
        _el$2.style.setProperty("justify-content", "center");
        _el$2.style.setProperty("align-items", "center");
        _el$2.style.setProperty("height", "24px");
        (0, import_web68.insert)(_el$2, (0, import_web69.createComponent)(Text6, {
          get children() {
            return status();
          }
        }));
        return _el$;
      })(),
      confirmText: "Install",
      type: "neutral",
      onConfirm: () => {
        installAndLoad(link2(), setStatus).catch((e) => {
          setStatus(e);
        }).then(props.close);
      },
      onCancel: props.close
    }));
  });
  var loadTheme = (theme) => __async(void 0, null, function* () {
    const themeTag = document.getElementById(`${appName.toLowerCase()}-theme`);
    if (theme === "none")
      return themeTag.innerText = "";
    const themeContents = yield invoke("get_theme", {
      name: theme
    });
    const localized = yield invoke("localize_imports", {
      css: themeContents,
      name: theme
    });
    console.log("Got the localized theme!");
    const contents = api.util.cssSanitize(localized);
    console.log("Sanitized!");
    themeTag.innerHTML = contents;
  });
  var installAndLoad = (link2, statusUpdater) => __async(void 0, null, function* () {
    statusUpdater("Fetching...");
    const themeName = yield invoke("theme_from_link", {
      link: link2
    });
    statusUpdater(`Applying ${themeName} ...`);
    yield loadTheme(themeName);
    const config = JSON.parse(yield invoke("read_config_file"));
    config.theme = themeName;
    statusUpdater("Saving...");
    yield invoke("write_config_file", {
      contents: JSON.stringify(config)
    });
    statusUpdater("Done!");
  });

  // plugins/dorion-settings/pages/ThemesPage.tsx
  var _tmpl$13 = /* @__PURE__ */ (0, import_web70.template)(`<div></div>`, 2);
  var {
    ui: {
      Header: Header6,
      Button: Button6,
      HeaderTags: HeaderTags6,
      injectCss: injectCss13,
      Divider: Divider2,
      ButtonSizes: ButtonSizes4
    },
    solid: {
      createSignal: createSignal9,
      createEffect: createEffect5
    }
  } = shelter;
  var injectedCss13 = false;
  function ThemesPage() {
    if (!injectedCss13) {
      injectedCss13 = true;
      injectCss13(css12);
    }
    const [settings, setSettingsState] = createSignal9(defaultConfig);
    const [themes, setThemes] = createSignal9([]);
    const getThemes = () => __async(this, null, function* () {
      const themes2 = yield invoke("get_theme_names");
      return themes2.map((t) => ({
        label: t.replace(/"/g, "").replace(".css", "").replace(".theme", ""),
        value: t.replace(/"/g, "")
      }));
    });
    createEffect5(() => __async(this, null, function* () {
      setSettingsState(JSON.parse(yield invoke("read_config_file")));
      setThemes(yield getThemes());
    }));
    const setSettings = (fn) => {
      setSettingsState(fn(settings()));
      invoke("write_config_file", {
        contents: JSON.stringify(fn(settings()))
      });
    };
    const openThemesFolder = () => {
      invoke("open_themes");
    };
    return [(0, import_web74.createComponent)(Header6, {
      get tag() {
        return HeaderTags6.H1;
      },
      get ["class"]() {
        return classes12.tophead;
      },
      children: "Themes"
    }), (0, import_web74.createComponent)(Header6, {
      get ["class"]() {
        return classes12.shead;
      },
      children: "Theme"
    }), (0, import_web74.createComponent)(Dropdown, {
      get value() {
        return settings().theme;
      },
      onChange: (e) => {
        setSettings((p) => {
          return __spreadProps(__spreadValues({}, p), {
            theme: e.target.value
          });
        });
        loadTheme(e.target.value);
      },
      placeholder: "Select a theme...",
      get options() {
        return [{
          label: "None",
          value: "none"
        }, ...themes()];
      },
      get selected() {
        return settings().theme;
      }
    }), (0, import_web74.createComponent)(Divider2, {
      mt: 16,
      mb: 16
    }), (() => {
      const _el$ = _tmpl$13.cloneNode(true);
      (0, import_web73.insert)(_el$, (0, import_web74.createComponent)(Button6, {
        get size() {
          return ButtonSizes4.MEDIUM;
        },
        onClick: installThemeModal,
        children: "Install Theme From Link"
      }), null);
      (0, import_web73.insert)(_el$, (0, import_web74.createComponent)(Button6, {
        get size() {
          return ButtonSizes4.MEDIUM;
        },
        onClick: openThemesFolder,
        children: "Open Themes Folder"
      }), null);
      (0, import_web72.effect)(() => (0, import_web71.className)(_el$, classes12.pbuttons));
      return _el$;
    })()];
  }

  // plugins/dorion-settings/index.tsx
  var {
    settings: {
      registerSection
    },
    flux: {
      dispatcher
    },
    util: {
      sleep
    }
  } = shelter;
  var settingsUninjects = [registerSection("divider"), registerSection("header", appName), registerSection("section", `${appName}-settings`, `${appName} Settings`, SettingsPage), registerSection("section", `${appName}-plugins`, "Plugins", PluginsPage), registerSection("section", `${appName}-themes`, "Themes", ThemesPage), registerSection("section", `${appName}-performance`, "Performance & Extras", PerformancePage), registerSection("section", `${appName}-profiles`, "Profiles", ProfilesPage)];
  var appendAppVersion = () => __async(void 0, null, function* () {
    let tries = 0;
    const infoBoxSelector = 'div[class*="side_"] div[class*="info_"]';
    while (!document.querySelector(infoBoxSelector)) {
      yield sleep(500);
      tries++;
      if (tries > 5) {
        console.error("Failed to find infoBox");
        return;
      }
    }
    const versionThings = document.querySelector(infoBoxSelector);
    const firstChild = versionThings == null ? void 0 : versionThings.firstElementChild;
    const newVersionThing = document.createElement("span");
    if (!firstChild)
      return;
    newVersionThing.innerHTML = `${appName} v${yield app.getVersion()}`;
    newVersionThing.classList.add(...firstChild.classList);
    newVersionThing.style.color = firstChild.style.color;
    versionThings.appendChild(newVersionThing);
  });
  var checkForUpdates = () => __async(void 0, null, function* () {
    const updateCheck = yield invoke("update_check");
    let needsUpdate = false;
    if (updateCheck.includes("dorion"))
      needsUpdate = true;
    settingsUninjects.push(
      // @ts-expect-error Shelter types are wrong? badgeCount does exist on type
      registerSection("section", `${appName}-changelog`, "Changelog", ChangelogPage, {
        badgeCount: needsUpdate ? 1 : 0
      })
    );
  });
  dispatcher.subscribe("USER_SETTINGS_MODAL_OPEN", appendAppVersion);
  checkForUpdates();
  var onUnload = () => {
    settingsUninjects.forEach((u) => u());
    dispatcher.unsubscribe("USER_SETTINGS_MODAL_OPEN", appendAppVersion);
  };
  return __toCommonJS(dorion_settings_exports);
})();
