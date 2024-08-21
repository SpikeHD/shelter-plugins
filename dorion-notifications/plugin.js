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

  // plugins/dorion-notifications/index.tsx
  var dorion_notifications_exports = {};
  __export(dorion_notifications_exports, {
    onLoad: () => onLoad,
    onUnload: () => onUnload
  });
  var import_web = __toESM(require_web(), 1);

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

  // plugins/dorion-notifications/index.tsx
  var {
    ui: {
      SwitchItem
    },
    flux: {
      dispatcher: FluxDispatcher
    },
    solid: {
      createSignal
    }
  } = shelter;
  var [settings, setSettings] = createSignal(null);
  var notifSelector = 'div[class*="contentColumn"] div[class*="container"]';
  var isOnNotifSection = false;
  var newSettingInjected = false;
  var settingsHandler = (payload) => __async(void 0, null, function* () {
    if (payload.section !== "Notifications") {
      isOnNotifSection = false;
      newSettingInjected = false;
      return;
    } else if (isOnNotifSection)
      return;
    isOnNotifSection = true;
    yield window.Dorion.util.waitForElm("#notifications-tab");
    const node = document.querySelector(notifSelector);
    node.style.display = "none";
    const next = node.nextElementSibling;
    if (next)
      next.style.display = "none";
    if (newSettingInjected)
      return;
    const newNotifs = [(0, import_web.createComponent)(SwitchItem, {
      note: "Shows a red badge on the app icon when you have unread messages.",
      get value() {
        var _a;
        return (_a = settings()) == null ? void 0 : _a.unread_badge;
      },
      onChange: (value) => __async(void 0, null, function* () {
        setSettings(__spreadProps(__spreadValues({}, settings()), {
          unread_badge: value
        }));
        yield invoke("write_config_file", {
          contents: JSON.stringify(settings())
        });
        api.shouldShowUnreadBadge = value;
        if (!value)
          invoke("notif_count", {
            amount: 0
          });
        else
          api.util.applyNotificationCount();
      }),
      children: "Enable Unread Message Badge"
    }), (0, import_web.createComponent)(SwitchItem, {
      note: "If you're looking for per-channel or per-server notifications, right-click the desired server icon and select Notification Settings.",
      get value() {
        var _a;
        return (_a = settings()) == null ? void 0 : _a.desktop_notifications;
      },
      onChange: (value) => __async(void 0, null, function* () {
        setSettings(__spreadProps(__spreadValues({}, settings()), {
          desktop_notifications: value
        }));
        FluxDispatcher.dispatch({
          type: "NOTIFICATIONS_SET_PERMISSION_STATE",
          enabled: value ? "ENABLED" : "DISABLED"
        });
        yield invoke("write_config_file", {
          contents: JSON.stringify(settings())
        });
      }),
      children: "Enable Desktop Notifications"
    })];
    for (const newNotif of newNotifs) {
      node.parentElement.prepend(newNotif);
    }
    newSettingInjected = true;
  });
  FluxDispatcher.subscribe("USER_SETTINGS_MODAL_SET_SECTION", settingsHandler);
  var onLoad = () => __async(void 0, null, function* () {
    const cfg = JSON.parse(yield invoke("read_config_file"));
    setSettings(cfg);
    if (cfg.desktop_notifications) {
      Notification.requestPermission();
    }
  });
  var onUnload = () => {
    FluxDispatcher.unsubscribe("USER_SETTINGS_MODAL_SET_SECTION", settingsHandler);
  };
  return __toCommonJS(dorion_notifications_exports);
})();
