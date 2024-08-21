(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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

  // plugins/dorion-updater/index.tsx
  var dorion_updater_exports = {};
  __export(dorion_updater_exports, {
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

  // plugins/dorion-updater/index.tsx
  var {
    ui: {
      openModal,
      ModalRoot,
      ModalHeader,
      ModalBody,
      ModalConfirmFooter
    }
  } = shelter;
  var confirmModal = (props) => (0, import_web.createComponent)(ModalRoot, {
    get children() {
      return [(0, import_web.createComponent)(ModalHeader, {
        get close() {
          return props.onCancel;
        },
        get children() {
          return props.header;
        }
      }), (0, import_web.createComponent)(ModalBody, {
        get children() {
          return props.body;
        }
      }), (0, import_web.createComponent)(ModalConfirmFooter, {
        get onConfirm() {
          return props.onConfirm;
        },
        get onCancel() {
          return props.onCancel;
        },
        get confirmText() {
          return props.confirmText;
        },
        get cancelText() {
          return props.cancelText;
        },
        get type() {
          return props.type;
        }
      })];
    }
  });
  var load = () => __async(void 0, null, function* () {
    console.log("[Updater] Checking for updates...");
    const config = JSON.parse(yield invoke("read_config_file"));
    const updateCheck = yield invoke("update_check");
    const doUpdate = () => {
      invoke("do_update", {
        toUpdate: updateCheck
      });
    };
    console.log(`[Updater] ${appName} things to update: ${updateCheck}`);
    if (config.update_notify !== void 0 && !config.update_notify)
      return;
    if (updateCheck.includes("dorion")) {
      if (config.autoupdate) {
        openModal((props) => confirmModal({
          header: `${appName} Update`,
          body: `A ${appName} update has been fetched, and ${appName} will restart momentarily.`,
          confirmText: "Got it!",
          type: "neutral",
          onConfirm: () => doUpdate(),
          onCancel: props.close
        }));
        doUpdate();
        return;
      }
      openModal((props) => confirmModal({
        header: "Updates Available!",
        body: `There are ${appName} updates available. Would you like to apply them? This notification can be disabled in ${appName} Settings`,
        confirmText: "Yes please!",
        cancelText: "Nope!",
        type: "neutral",
        onConfirm: () => doUpdate(),
        onCancel: props.close
      }));
    }
    event.once("update_complete", () => {
      openModal((props) => confirmModal({
        header: "Update Complete!",
        body: "The update has been applied! Please restart to apply the changes.",
        confirmText: "Okay!",
        type: "neutral",
        onConfirm: () => process.relaunch(),
        onCancel: props.close
      }));
    });
  });
  var onUnload = () => {
  };
  load();
  return __toCommonJS(dorion_updater_exports);
})();
