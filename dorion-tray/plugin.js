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

  // plugins/dorion-tray/index.ts
  var dorion_tray_exports = {};
  __export(dorion_tray_exports, {
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
  var appName = backendObj.name;
  var invoke = backendObj.invoke;
  var event = backendObj.event;
  var app = backendObj.app;
  var process = backendObj.process;
  var apiWindow = backendObj.apiWindow;

  // plugins/dorion-tray/index.ts
  var {
    flux: {
      dispatcher
    }
  } = shelter;
  var state = {
    video: false,
    streaming: false,
    deafened: false,
    muted: false,
    speaking: false,
    connected: false
  };
  var handleConnect = (payload) => __async(void 0, null, function* () {
    const { state: connectionState } = payload;
    if (connectionState.toLowerCase() === "connected" || connectionState.toLowerCase() === "connecting") {
      state.connected = true;
    } else if (connectionState.toLowerCase() === "disconnected") {
      state.connected = false;
    }
    yield handleTrayUpdate();
  });
  var handleVoiceChannelActions = (payload) => __async(void 0, null, function* () {
    const loggedInUserId = localStorage.getItem("user_id_cache").replace(/"/g, "");
    const voiceState = payload.voiceStates.find((voiceState2) => voiceState2.userId === loggedInUserId);
    if (!voiceState)
      return;
    const { selfDeaf, selfMute, selfStream, selfVideo } = voiceState;
    state.muted = selfMute;
    state.deafened = selfDeaf;
    state.streaming = selfStream;
    state.video = selfVideo;
    yield handleTrayUpdate();
  });
  var handleSpeakAction = (payload) => __async(void 0, null, function* () {
    const loggedInUserId = localStorage.getItem("user_id_cache").replace(/"/g, "");
    const { userId, speakingFlags } = payload;
    if (userId !== loggedInUserId)
      return;
    state.speaking = speakingFlags > 0;
    yield handleTrayUpdate();
  });
  var handleTrayUpdate = () => __async(void 0, null, function* () {
    const icon = Object.keys(state).find((k) => state[k]) || "disconnected";
    yield invoke("set_tray_icon", { event: icon });
  });
  dispatcher.subscribe("VOICE_STATE_UPDATES", handleVoiceChannelActions);
  dispatcher.subscribe("SPEAKING", handleSpeakAction);
  dispatcher.subscribe("RTC_CONNECTION_STATE", handleConnect);
  var onUnload = () => {
    dispatcher.unsubscribe("VOICE_STATE_UPDATES", handleVoiceChannelActions);
    dispatcher.unsubscribe("SPEAKING", handleSpeakAction);
    dispatcher.unsubscribe("RTC_CONNECTION_STATE", handleConnect);
  };
  return __toCommonJS(dorion_tray_exports);
})();
