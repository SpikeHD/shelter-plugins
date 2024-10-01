(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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

  // plugins/shelteRPC/index.tsx
  var shelteRPC_exports = {};
  __export(shelteRPC_exports, {
    generateAssetId: () => generateAssetId,
    onLoad: () => onLoad,
    onUnload: () => onUnload
  });

  // plugins/shelteRPC/components/RegisteredGames.tsx
  var import_web18 = __toESM(require_web(), 1);
  var import_web19 = __toESM(require_web(), 1);
  var import_web20 = __toESM(require_web(), 1);
  var import_web21 = __toESM(require_web(), 1);

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
  var backend = backendName;
  var api = window[backendName];
  var appName = backendObj.name;
  var invoke = backendObj.invoke;
  var event = backendObj.event;
  var app = backendObj.app;
  var process = backendObj.process;
  var apiWindow = backendObj.apiWindow;

  // plugins/shelteRPC/components/GameCard.tsx
  var import_web = __toESM(require_web(), 1);
  var import_web2 = __toESM(require_web(), 1);
  var import_web3 = __toESM(require_web(), 1);
  var import_web4 = __toESM(require_web(), 1);
  var import_web5 = __toESM(require_web(), 1);
  var import_web6 = __toESM(require_web(), 1);

  // plugins/shelteRPC/util.ts
  var timestampToRelative = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1e3);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
    return "Just now";
  };

  // plugins/shelteRPC/components/GameCard.scss
  var css = `._gameCard_1jztg_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;height:72px;border-radius:5px;color:var(--text-normal);margin:12px 0}._gameCard_1jztg_1._cardNone_1jztg_1{background-color:var(--background-secondary)}._gameCard_1jztg_1._cardPlaying_1jztg_1{background-color:var(--status-positive-background)}._gameCard_1jztg_1._cardPlaying_1jztg_1 ._gameCardIcons_1jztg_1{color:var(--green-230)}._gameCard_1jztg_1._cardPlayed_1jztg_1{background:rgba(0,0,0,0);border-radius:0;border-bottom:1px solid var(--primary-500)}._gameCard_1jztg_1._cardPlayed_1jztg_1 ._gameCardLastPlayed_1jztg_1{color:var(--text-muted)}._gameCard_1jztg_1._cardPlayed_1jztg_1 ._lastPlayedTimestamp_1jztg_1{font-weight:bold}._gameCardInfo_1jztg_1{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;width:70%;height:100%;padding:0 20px}._gameCardName_1jztg_1{font-weight:bold}._gameCardIcons_1jztg_1{display:flex;flex-direction:row;align-items:center;justify-content:flex-end;height:100%;padding:0 20px;color:var(--primary-400)}._gameCardIcons_1jztg_1 span{margin:4px;width:24px;height:24px;cursor:pointer}._gameCardIcons_1jztg_1 span:hover{color:var(--text-normal)}._gameCardIcons_1jztg_1 span svg{width:100%;height:100%}._trash_1jztg_1:hover{color:var(--status-danger) !important}`;
  var classes = {
    "gameCard": "_gameCard_1jztg_1",
    "cardNone": "_cardNone_1jztg_1",
    "cardPlaying": "_cardPlaying_1jztg_1",
    "gameCardIcons": "_gameCardIcons_1jztg_1",
    "cardPlayed": "_cardPlayed_1jztg_1",
    "gameCardLastPlayed": "_gameCardLastPlayed_1jztg_1",
    "lastPlayedTimestamp": "_lastPlayedTimestamp_1jztg_1",
    "gameCardInfo": "_gameCardInfo_1jztg_1",
    "gameCardName": "_gameCardName_1jztg_1",
    "trash": "_trash_1jztg_1"
  };

  // plugins/shelteRPC/components/GameCard.tsx
  var _tmpl$ = /* @__PURE__ */ (0, import_web.template)(`<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path><path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path></svg>`, 6);
  var _tmpl$2 = /* @__PURE__ */ (0, import_web.template)(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"></path></svg>`, 4);
  var _tmpl$3 = /* @__PURE__ */ (0, import_web.template)(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"></path></svg>`, 4);
  var _tmpl$4 = /* @__PURE__ */ (0, import_web.template)(`<div><div><span></span><span></span></div><div></div></div>`, 10);
  var _tmpl$5 = /* @__PURE__ */ (0, import_web.template)(`<span></span>`, 2);
  var {
    ui: {
      injectCss
    },
    plugin: {
      store
    },
    solid: {
      createSignal
    }
  } = shelter;
  var trashIcon = () => _tmpl$.cloneNode(true);
  var hideIcon = () => _tmpl$2.cloneNode(true);
  var hideClosed = () => _tmpl$3.cloneNode(true);
  var injectedCss = false;
  var deleteGame = (name) => {
    backend !== "None" && event.emit("remove_detectable", {
      name,
      exe: ""
    });
    const key = Object.keys(store.previouslyPlayed).find((k) => store.previouslyPlayed[k].name === name);
    delete store.previouslyPlayed[key];
    if (store.currentlyPlaying === name) {
      store.currentlyPlaying = "";
    }
  };
  var GameCard_default = (props) => {
    var _a;
    if (!injectedCss) {
      injectedCss = true;
      injectCss(css);
    }
    const [hide, setHide] = createSignal(props.name ? (_a = store.previouslyPlayed[props.name]) == null ? void 0 : _a.hide : false);
    return (() => {
      const _el$4 = _tmpl$4.cloneNode(true), _el$5 = _el$4.firstChild, _el$6 = _el$5.firstChild, _el$7 = _el$6.nextSibling, _el$8 = _el$5.nextSibling;
      (0, import_web5.insert)(_el$6, () => props.name || "No game detected");
      (0, import_web5.insert)(_el$7, (() => {
        const _c$ = (0, import_web6.memo)(() => props.type === "played");
        return () => _c$() ? ["Last played: ", (() => {
          const _el$9 = _tmpl$5.cloneNode(true);
          (0, import_web5.insert)(_el$9, () => timestampToRelative(props.lastPlayed));
          (0, import_web4.effect)(() => (0, import_web3.className)(_el$9, classes.lastPlayedTimestamp));
          return _el$9;
        })()] : props.type === "playing" && props.name ? "Now playing!" : "What are you playing?";
      })());
      (0, import_web5.insert)(_el$8, (() => {
        const _c$2 = (0, import_web6.memo)(() => !!props.local);
        return () => _c$2() && (() => {
          const _el$10 = _tmpl$5.cloneNode(true);
          _el$10.$$click = () => {
            deleteGame(props.name || "");
          };
          (0, import_web5.insert)(_el$10, trashIcon);
          (0, import_web4.effect)(() => (0, import_web3.className)(_el$10, classes.trash));
          return _el$10;
        })();
      })(), null);
      (0, import_web5.insert)(_el$8, (() => {
        const _c$3 = (0, import_web6.memo)(() => !!(props.name && props.type !== "playing"));
        return () => _c$3() && (() => {
          const _el$11 = _tmpl$5.cloneNode(true);
          _el$11.$$click = () => {
            if (!props.name)
              return;
            const key = Object.keys(store.previouslyPlayed).find((k) => store.previouslyPlayed[k].name === props.name);
            store.previouslyPlayed[key].hide = !hide();
            setHide(!hide());
          };
          (0, import_web5.insert)(_el$11, (() => {
            const _c$4 = (0, import_web6.memo)(() => !!hide());
            return () => _c$4() ? hideClosed() : hideIcon();
          })());
          (0, import_web4.effect)(() => (0, import_web3.className)(_el$11, classes.hide));
          return _el$11;
        })();
      })(), null);
      (0, import_web4.effect)((_p$) => {
        const _v$ = classes.gameCard + " " + (props.type === "playing" && props.name ? classes.cardPlaying : props.type === "played" ? classes.cardPlayed : classes.cardNone), _v$2 = classes.gameCardInfo, _v$3 = classes.gameCardName, _v$4 = classes.gameCardLastPlayed, _v$5 = classes.gameCardIcons;
        _v$ !== _p$._v$ && (0, import_web3.className)(_el$4, _p$._v$ = _v$);
        _v$2 !== _p$._v$2 && (0, import_web3.className)(_el$5, _p$._v$2 = _v$2);
        _v$3 !== _p$._v$3 && (0, import_web3.className)(_el$6, _p$._v$3 = _v$3);
        _v$4 !== _p$._v$4 && (0, import_web3.className)(_el$7, _p$._v$4 = _v$4);
        _v$5 !== _p$._v$5 && (0, import_web3.className)(_el$8, _p$._v$5 = _v$5);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0,
        _v$3: void 0,
        _v$4: void 0,
        _v$5: void 0
      });
      return _el$4;
    })();
  };
  (0, import_web2.delegateEvents)(["click"]);

  // components/Dropdown.tsx
  var import_web10 = __toESM(require_web(), 1);
  var import_web11 = __toESM(require_web(), 1);
  var import_web12 = __toESM(require_web(), 1);
  var import_web13 = __toESM(require_web(), 1);
  var import_web14 = __toESM(require_web(), 1);
  var import_web15 = __toESM(require_web(), 1);
  var import_web16 = __toESM(require_web(), 1);
  var import_web17 = __toESM(require_web(), 1);

  // components/Dropdown.tsx.scss
  var css2 = `._ddown_9nenk_1{box-sizing:border-box;font-size:16px;width:100%;border-radius:4px;color:var(--text-normal);background-color:var(--input-background);border:none;transition:border-color .2s ease-in-out;padding:10px;appearance:none;cursor:pointer}._dcontainer_9nenk_1{position:relative;width:100%}._dsarrow_9nenk_1{position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none}._dsarrow_9nenk_1 path{fill:var(--header-secondary)}._ddownplaceholder_9nenk_1{color:var(--header-secondary)}`;
  var classes2 = {
    "ddown": "_ddown_9nenk_1",
    "dcontainer": "_dcontainer_9nenk_1",
    "dsarrow": "_dsarrow_9nenk_1",
    "ddownplaceholder": "_ddownplaceholder_9nenk_1"
  };

  // components/SelectArrow.tsx
  var import_web7 = __toESM(require_web(), 1);
  var import_web8 = __toESM(require_web(), 1);
  var import_web9 = __toESM(require_web(), 1);
  var _tmpl$6 = /* @__PURE__ */ (0, import_web7.template)(`<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>`, 4);
  var SelectArrow = (props) => (() => {
    const _el$ = _tmpl$6.cloneNode(true);
    (0, import_web9.effect)(() => (0, import_web8.setAttribute)(_el$, "class", props.class));
    return _el$;
  })();

  // components/Dropdown.tsx
  var _tmpl$7 = /* @__PURE__ */ (0, import_web10.template)(`<div><select></select></div>`, 4);
  var _tmpl$22 = /* @__PURE__ */ (0, import_web10.template)(`<option value=""></option>`, 2);
  var _tmpl$32 = /* @__PURE__ */ (0, import_web10.template)(`<option></option>`, 2);
  var {
    ui: {
      injectCss: injectCss2
    }
  } = shelter;
  var injectedCss2 = false;
  var Dropdown = (props) => {
    if (!injectedCss2) {
      injectedCss2 = true;
      injectCss2(css2);
    }
    return (() => {
      const _el$ = _tmpl$7.cloneNode(true), _el$2 = _el$.firstChild;
      _el$2.addEventListener("change", (e) => {
        props.onChange(e);
        if (props.immutable) {
          e.preventDefault();
          e.stopPropagation();
          e.target.value = props.value;
        }
      });
      (0, import_web16.insert)(_el$2, (() => {
        const _c$ = (0, import_web17.memo)(() => !!props.placeholder);
        return () => _c$() && (() => {
          const _el$3 = _tmpl$22.cloneNode(true);
          (0, import_web16.insert)(_el$3, () => props.placeholder);
          (0, import_web14.effect)((_p$) => {
            const _v$8 = classes2.ddownplaceholder, _v$9 = props.value === "";
            _v$8 !== _p$._v$8 && (0, import_web13.className)(_el$3, _p$._v$8 = _v$8);
            _v$9 !== _p$._v$9 && (_el$3.selected = _p$._v$9 = _v$9);
            return _p$;
          }, {
            _v$8: void 0,
            _v$9: void 0
          });
          return _el$3;
        })();
      })(), null);
      (0, import_web16.insert)(_el$2, () => {
        var _a;
        return (_a = props.options) == null ? void 0 : _a.map((o) => (() => {
          const _el$4 = _tmpl$32.cloneNode(true);
          (0, import_web16.insert)(_el$4, () => o.label);
          (0, import_web14.effect)(() => _el$4.selected = o.value === props.value);
          (0, import_web14.effect)(() => _el$4.value = o.value);
          return _el$4;
        })());
      }, null);
      (0, import_web16.insert)(_el$, (0, import_web15.createComponent)(SelectArrow, {
        get ["class"]() {
          return classes2.dsarrow;
        }
      }), null);
      (0, import_web14.effect)((_p$) => {
        const _v$ = classes2.dcontainer, _v$2 = props.style, _v$3 = classes2.ddown + " " + (props.placeholder && props.value === "" ? classes2.ddownplaceholder : ""), _v$4 = props.placeholder, _v$5 = props.id, _v$6 = props["aria-label"], _v$7 = props.disabled;
        _v$ !== _p$._v$ && (0, import_web13.className)(_el$, _p$._v$ = _v$);
        _p$._v$2 = (0, import_web12.style)(_el$, _v$2, _p$._v$2);
        _v$3 !== _p$._v$3 && (0, import_web13.className)(_el$2, _p$._v$3 = _v$3);
        _v$4 !== _p$._v$4 && (0, import_web11.setAttribute)(_el$2, "placeholder", _p$._v$4 = _v$4);
        _v$5 !== _p$._v$5 && (0, import_web11.setAttribute)(_el$2, "id", _p$._v$5 = _v$5);
        _v$6 !== _p$._v$6 && (0, import_web11.setAttribute)(_el$2, "aria-label", _p$._v$6 = _v$6);
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
      return _el$;
    })();
  };

  // plugins/shelteRPC/components/RegisteredGames.scss
  var css3 = `._description_1kj0u_1{margin-top:8px;margin-bottom:8px}._addIt_1kj0u_1{margin-top:8px;margin-bottom:28px}._shead_1kj0u_1{margin-bottom:12px}._addhead_1kj0u_1{margin-top:42px;margin-bottom:12px}._modalhead_1kj0u_1{margin-top:12px}`;
  var classes3 = {
    "description": "_description_1kj0u_1",
    "addIt": "_addIt_1kj0u_1",
    "shead": "_shead_1kj0u_1",
    "addhead": "_addhead_1kj0u_1",
    "modalhead": "_modalhead_1kj0u_1"
  };

  // plugins/shelteRPC/components/RegisteredGames.tsx
  var _tmpl$8 = /* @__PURE__ */ (0, import_web18.template)(`<a target="_blank">Add it!</a>`, 2);
  var {
    ui: {
      Divider,
      Header,
      HeaderTags,
      Text,
      TextBox,
      injectCss: injectCss3,
      openConfirmationModal
    },
    solid: {
      createSignal: createSignal2,
      createEffect
    },
    plugin: {
      store: store2
    }
  } = shelter;
  var injectedCss3 = false;
  var RegisteredGames_default = () => {
    if (!injectedCss3) {
      injectedCss3 = true;
      injectCss3(css3);
    }
    const [isDorion, setIsDorion] = createSignal2(false);
    const [currentlyPlaying, setCurrentlyPlaying] = createSignal2("");
    const [previouslyPlayed, setPreviouslyPlayed] = createSignal2({});
    const [local, setLocal] = createSignal2([]);
    createEffect(() => __async(void 0, null, function* () {
      setIsDorion(appName === "Dorion");
      setCurrentlyPlaying(store2.currentlyPlaying || "");
      setPreviouslyPlayed(store2.previouslyPlayed || {});
      setLocal(isDorion && (yield invoke("get_local_detectables")));
      const markLocals = () => {
        for (const o of local()) {
          const maybeIdx = Object.values(previouslyPlayed()).findIndex((p) => p.name === o.name);
          if (maybeIdx !== -1) {
            previouslyPlayed()[Object.keys(previouslyPlayed())[maybeIdx]]["local"] = true;
          }
        }
      };
      markLocals();
      setInterval(() => {
        setCurrentlyPlaying(store2.currentlyPlaying || "");
        setPreviouslyPlayed(store2.previouslyPlayed || {});
        markLocals();
      }, 2e3);
    }));
    return [(0, import_web21.createComponent)(Header, {
      get tag() {
        return HeaderTags.H1;
      },
      get ["class"]() {
        return classes3.shead;
      },
      children: "Registered Games"
    }), (0, import_web21.createComponent)(Text, {
      get ["class"]() {
        return classes3.description;
      },
      children: "ShelteRPC will automatically update your status based on the game you're playing (if detectable). You can also manually add games to this list if it isn't being detected."
    }), (0, import_web21.createComponent)(Divider, {
      mt: 20,
      mb: 20
    }), (0, import_web20.memo)((() => {
      const _c$ = (0, import_web20.memo)(() => !!currentlyPlaying());
      return () => _c$() ? (0, import_web21.createComponent)(GameCard_default, {
        get name() {
          return currentlyPlaying();
        },
        type: "playing",
        get local() {
          var _a;
          return ((_a = Object.values(previouslyPlayed()).find((p) => p.name === currentlyPlaying())) == null ? void 0 : _a.local) || false;
        }
      }) : (0, import_web21.createComponent)(GameCard_default, {
        type: "none"
      });
    })()), (0, import_web21.createComponent)(Text, {
      get ["class"]() {
        return classes3.addIt;
      },
      get children() {
        return ["Not seeing your game? ", (0, import_web20.memo)(() => (0, import_web20.memo)(() => !!isDorion())() ? (() => {
          const _el$ = _tmpl$8.cloneNode(true);
          _el$.$$click = addIt;
          return _el$;
        })() : "Adding it is unsupported.")];
      }
    }), (0, import_web21.createComponent)(Header, {
      get ["class"]() {
        return classes3.addhead;
      },
      children: "Added Games"
    }), (0, import_web20.memo)(() => Object.values(previouslyPlayed()).map((game) => {
      if (game.name === currentlyPlaying())
        return null;
      return (0, import_web21.createComponent)(GameCard_default, {
        get name() {
          return game.name;
        },
        get lastPlayed() {
          return game.lastPlayed;
        },
        type: "played",
        get local() {
          return game == null ? void 0 : game.local;
        }
      });
    }))];
  };
  function addIt() {
    const [windows, setWindows] = createSignal2([]);
    const [selected, setSelected] = createSignal2(0);
    const [name, setName] = createSignal2("");
    createEffect(() => __async(this, null, function* () {
      const res = yield invoke("get_windows");
      setWindows(res);
    }));
    openConfirmationModal({
      body: () => (0, import_web20.memo)((() => {
        const _c$2 = (0, import_web20.memo)(() => windows().length > 0);
        return () => _c$2() ? [(0, import_web21.createComponent)(Dropdown, {
          get options() {
            return (
              // Unique
              windows().filter((w, i, a) => a.findIndex((w2) => w2.process_name === w.process_name) === i).map((w) => ({
                label: w.process_name,
                value: w.pid
              }))
            );
          },
          placeholder: "Select process...",
          maxVisibleItems: 5,
          closeOnSelect: true,
          onChange: (e) => setSelected(Number(e.target.value))
        }), (0, import_web21.createComponent)(Header, {
          get ["class"]() {
            return classes3.modalhead;
          },
          children: "Name to Display"
        }), (0, import_web21.createComponent)(TextBox, {
          get value() {
            return name();
          },
          onInput: (v) => setName(v),
          placeholder: "Enter the name to display..."
        })] : (0, import_web21.createComponent)(Text, {
          children: "Please wait..."
        });
      })()),
      header: () => "Add a game",
      confirmText: "Add",
      type: "neutral"
    }).then(() => {
      var _a;
      event.emit("add_detectable", {
        exe: (_a = windows().find((w) => w.pid === selected())) == null ? void 0 : _a.process_name,
        name: name()
      });
    }, () => {
    });
  }
  (0, import_web19.delegateEvents)(["click"]);

  // plugins/shelteRPC/index.tsx
  var {
    flux: {
      dispatcher: FluxDispatcher
    },
    settings: {
      registerSection
    },
    ui: {
      showToast
    },
    plugin: {
      store: store3
    },
    http
  } = shelter;
  var maybeUnregisterGameSettings = [() => {
  }];
  var cachedAssets = {};
  var ws;
  var apps = {};
  store3.currentlyPlaying = "";
  function lookupApp(appId) {
    return __async(this, null, function* () {
      var _a;
      return ((_a = yield http.get(`/oauth2/applications/${appId}/rpc`)) == null ? void 0 : _a.body) || "Unknown";
    });
  }
  var generateAssetId = (appId, asset) => __async(void 0, null, function* () {
    var _a;
    if (!cachedAssets[appId]) {
      const resp = yield http.get(`/oauth2/applications/${appId}/assets`);
      if (resp.status !== 200) {
        console.log("Failed to fetch assets");
      }
      cachedAssets[appId] = resp.body;
    }
    const assetId = (_a = cachedAssets[appId].find((a) => a.name === asset)) == null ? void 0 : _a.id;
    return assetId;
  });
  function handleMessage(e) {
    return __async(this, null, function* () {
      var _a, _b, _c, _d, _e;
      const data = JSON.parse(e.data);
      const assets = (_a = data.activity) == null ? void 0 : _a.assets;
      if (data.cmd)
        return handleCmd(data);
      if (assets == null ? void 0 : assets.large_image)
        assets.large_image = yield generateAssetId(data.activity.application_id, assets.large_image);
      if (assets == null ? void 0 : assets.small_image)
        assets.small_image = yield generateAssetId(data.activity.application_id, assets.small_image);
      if (data.activity) {
        const appId = data.activity.application_id;
        apps[appId] || (apps[appId] = yield lookupApp(appId).catch(() => "Unknown"));
        const app2 = apps[appId];
        if (typeof app2 !== "string") {
          (_b = data.activity).name || (_b.name = app2.name);
        }
        store3.currentlyPlaying = data.activity.name;
        if (!store3.previouslyPlayed)
          store3.previouslyPlayed = {};
        if (!(data.activity.name in store3.previouslyPlayed)) {
          store3.previouslyPlayed[data.activity.name] = {};
        }
        store3.previouslyPlayed[data.activity.name].name = data.activity.name;
        store3.previouslyPlayed[data.activity.name].appid = data.activity.application_id;
        store3.previouslyPlayed[data.activity.name].lastPlayed = Date.now();
        store3.previouslyPlayed[data.activity.name].local = data.activity.application_id === "1337";
      } else {
        store3.currentlyPlaying = "";
      }
      if ((_e = (_d = store3 == null ? void 0 : store3.previouslyPlayed) == null ? void 0 : _d[(_c = data.activity) == null ? void 0 : _c.name]) == null ? void 0 : _e.hide)
        return;
      FluxDispatcher.dispatch(__spreadValues({
        type: "LOCAL_ACTIVITY_UPDATE"
      }, data));
    });
  }
  var handleCmd = (payload) => __async(void 0, null, function* () {
    switch (payload.cmd) {
      case "INVITE_BROWSER":
    }
  });
  var retry = (fn, times = 5, wait = 500) => __async(void 0, null, function* () {
    let result;
    for (let i = 0; i < times; i++) {
      result = yield fn(i);
      if (result)
        return result;
      yield new Promise((r) => setTimeout(r, wait));
    }
    return result;
  });
  var onLoad = () => __async(void 0, null, function* () {
    if (ws && (ws == null ? void 0 : ws.close))
      ws.close();
    const connected = yield retry((curTry) => __async(void 0, null, function* () {
      var _a;
      ws = new WebSocket("ws://127.0.0.1:1337");
      ws.onmessage = handleMessage;
      ws.onerror = (e) => {
        throw e;
      };
      yield new Promise((r) => setTimeout(r, 1e3));
      if (ws.readyState !== WebSocket.OPEN) {
        (_a = ws == null ? void 0 : ws.close) == null ? void 0 : _a.call(ws);
        ws = null;
        showToast({
          title: "ShelteRPC",
          content: `Unable to connect to ShelteRPC server (${curTry})`,
          duration: 2e3
        });
        return false;
      }
      return true;
    }), 3, 3e3);
    maybeUnregisterGameSettings = [registerSection("divider"), registerSection("header", "shelteRPC"), registerSection("section", "shelterpc", "Registered Games", RegisteredGames_default)];
    if (!connected)
      return;
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
  });
  var onUnload = () => __async(void 0, null, function* () {
    var _a;
    if (ws == null ? void 0 : ws.close)
      (_a = ws.close) == null ? void 0 : _a.call(ws);
    if (maybeUnregisterGameSettings) {
      maybeUnregisterGameSettings.forEach((section) => section());
    }
  });
  return __toCommonJS(shelteRPC_exports);
})();
