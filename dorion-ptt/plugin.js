(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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

  // plugins/dorion-ptt/index.ts
  var dorion_ptt_exports = {};
  __export(dorion_ptt_exports, {
    onUnload: () => onUnload
  });

  // util/keyUtil.ts
  var Keycode = {
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    27: "Escape",
    32: "Space",
    17: "Control",
    16: "Shift",
    18: "Alt",
    91: "Meta",
    13: "Enter",
    38: "Up",
    40: "Down",
    37: "Left",
    39: "Right",
    8: "Backspace",
    20: "CapsLock",
    9: "Tab",
    36: "Home",
    35: "End",
    33: "PageUp",
    34: "PageDown",
    45: "Insert",
    46: "Delete",
    109: "NumpadSubtract",
    107: "NumpadAdd",
    111: "NumpadDivide",
    106: "NumpadMultiply",
    192: "Grave",
    189: "Minus",
    187: "Equal",
    219: "LeftBracket",
    221: "RightBracket",
    220: "BackSlash",
    186: "Semicolon",
    222: "Apostrophe",
    188: "Comma",
    190: "Dot",
    191: "Slash"
  };
  var keyToStr = (key) => {
    let keyStr = "";
    if (key >= 65 && key <= 90) {
      keyStr = String.fromCharCode(key);
    }
    if (key >= 97 && key <= 122) {
      keyStr = String.fromCharCode(key - 32);
    }
    if (key >= 48 && key <= 57) {
      keyStr = String.fromCharCode(key);
    }
    if (Keycode[key]) {
      keyStr = Keycode[key];
    }
    return keyStr;
  };
  function strToCode(str) {
    if (str.length === 1) {
      if (str.toLowerCase() >= "a" && str.toLowerCase() <= "z") {
        return "Key" + str.toUpperCase();
      }
      return "Digit" + str;
    }
    let maybeKeycode = "";
    Object.values(Keycode).forEach((v) => {
      console.log("comparing", str, v);
      if (str.includes(v)) {
        console.log("found!");
        maybeKeycode = v;
      }
    });
    console.log(maybeKeycode);
    if (maybeKeycode) {
      return maybeKeycode;
    }
    return "Key" + str;
  }

  // api/dorion.ts
  var dorion_default = {
    name: "Dorion",
    invoke: (name, payload) => {
      var _a2;
      if ((_a2 = window.__TAURI__) == null ? void 0 : _a2.invoke) {
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
          var _a2, _b;
          if ((_b = (_a2 = window.__TAURI__) == null ? void 0 : _a2.webviewWindow) == null ? void 0 : _b.getCurrentWebviewWindow) {
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

  // plugins/dorion-ptt/index.ts
  var {
    flux: {
      dispatcher: FluxDispatcher,
      stores: {
        MediaEngineStore
      }
    },
    observeDom
  } = shelter;
  var events = [];
  var subscriptions = [];
  var unobserves = [];
  var warningSelector = 'div[class*="pttToolsMessage_"]';
  var radiobarSelector = 'div[class*="radioBar_"]';
  var popupSelector = 'div[class*="layerContainer_"] div[class*="layer_"]';
  var unobserveAll = () => unobserves.forEach((unobserve) => unobserve());
  var settingsHandler = (payload) => __async(void 0, null, function* () {
    if (payload.section !== "Voice & Video") {
      unobserveAll();
      return;
    }
    unobserves.push(
      observeDom(warningSelector, (node) => {
        node.remove();
      }),
      observeDom(popupSelector, (node) => {
        if (node.id)
          return;
        node.innerHTML = "";
        const unobserveBackdrop = observeDom('div[class*="backdrop_"]', (backdrop) => {
          backdrop.click();
          unobserveBackdrop();
        });
      }),
      observeDom(radiobarSelector, (node) => {
        const textSelector = 'div[class*="info_"] div[class*="text"]';
        const text = node.querySelector(textSelector);
        if (text.textContent.includes("(")) {
          text.textContent = text.textContent.replace(/\(.+?\)/g, "");
        }
      })
    );
  });
  var keybindCreationHandler = (payload) => __async(void 0, null, function* () {
    const {
      mode,
      options: {
        shortcut
      }
    } = payload;
    const keys = shortcut.map((k) => k[1]);
    const toKeys = keys.map((k) => ({
      code: strToCode(keyToStr(k)),
      name: keyToStr(k)
    }));
    invoke("set_keybind", { action: "PUSH_TO_TALK", keys: toKeys });
    event.emit("ptt_toggled", {
      state: mode === "PUSH_TO_TALK"
    });
  });
  var _a;
  event.emit("ptt_toggled", {
    // @ts-expect-error shut up
    state: ((_a = MediaEngineStore == null ? void 0 : MediaEngineStore.getMode) == null ? void 0 : _a.call(MediaEngineStore)) === "PUSH_TO_TALK"
  });
  subscriptions.push(
    FluxDispatcher.subscribe("USER_SETTINGS_MODAL_SET_SECTION", settingsHandler),
    FluxDispatcher.subscribe("LAYER_POP", unobserveAll),
    FluxDispatcher.subscribe("AUDIO_SET_MODE", keybindCreationHandler)
  );
  var onUnload = () => {
    unobserveAll();
    events.forEach((e) => e());
    subscriptions.forEach((s) => s());
  };
  return __toCommonJS(dorion_ptt_exports);
})();
