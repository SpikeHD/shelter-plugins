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

  // plugins/dorion-theme-browser/index.ts
  var dorion_theme_browser_exports = {};
  __export(dorion_theme_browser_exports, {
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

  // plugins/dorion-theme-browser/components/ThemePage.tsx
  var import_web18 = __toESM(require_web(), 1);
  var import_web19 = __toESM(require_web(), 1);
  var import_web20 = __toESM(require_web(), 1);
  var import_web21 = __toESM(require_web(), 1);
  var import_web22 = __toESM(require_web(), 1);

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
  var css = `._ddown_9nenk_1{box-sizing:border-box;font-size:16px;width:100%;border-radius:4px;color:var(--text-normal);background-color:var(--input-background);border:none;transition:border-color .2s ease-in-out;padding:10px;appearance:none;cursor:pointer}._dcontainer_9nenk_1{position:relative;width:100%}._dsarrow_9nenk_1{position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none}._dsarrow_9nenk_1 path{fill:var(--header-secondary)}._ddownplaceholder_9nenk_1{color:var(--header-secondary)}`;
  var classes = {
    "ddown": "_ddown_9nenk_1",
    "dcontainer": "_dcontainer_9nenk_1",
    "dsarrow": "_dsarrow_9nenk_1",
    "ddownplaceholder": "_ddownplaceholder_9nenk_1"
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
  var _tmpl$22 = /* @__PURE__ */ (0, import_web4.template)(`<option value=""></option>`, 2);
  var _tmpl$3 = /* @__PURE__ */ (0, import_web4.template)(`<option></option>`, 2);
  var {
    ui: {
      injectCss
    }
  } = shelter;
  var injectedCss = false;
  var Dropdown = (props) => {
    if (!injectedCss) {
      injectedCss = true;
      injectCss(css);
    }
    return (() => {
      const _el$ = _tmpl$2.cloneNode(true), _el$2 = _el$.firstChild;
      _el$2.addEventListener("change", (e) => {
        props.onChange(e);
        if (props.immutable) {
          e.preventDefault();
          e.stopPropagation();
          e.target.value = props.value;
        }
      });
      (0, import_web10.insert)(_el$2, (() => {
        const _c$ = (0, import_web11.memo)(() => !!props.placeholder);
        return () => _c$() && (() => {
          const _el$3 = _tmpl$22.cloneNode(true);
          (0, import_web10.insert)(_el$3, () => props.placeholder);
          (0, import_web8.effect)((_p$) => {
            const _v$8 = classes.ddownplaceholder, _v$9 = props.value === "";
            _v$8 !== _p$._v$8 && (0, import_web7.className)(_el$3, _p$._v$8 = _v$8);
            _v$9 !== _p$._v$9 && (_el$3.selected = _p$._v$9 = _v$9);
            return _p$;
          }, {
            _v$8: void 0,
            _v$9: void 0
          });
          return _el$3;
        })();
      })(), null);
      (0, import_web10.insert)(_el$2, () => {
        var _a;
        return (_a = props.options) == null ? void 0 : _a.map((o) => (() => {
          const _el$4 = _tmpl$3.cloneNode(true);
          (0, import_web10.insert)(_el$4, () => o.label);
          (0, import_web8.effect)(() => _el$4.selected = o.value === props.value);
          (0, import_web8.effect)(() => _el$4.value = o.value);
          return _el$4;
        })());
      }, null);
      (0, import_web10.insert)(_el$, (0, import_web9.createComponent)(SelectArrow, {
        get ["class"]() {
          return classes.dsarrow;
        }
      }), null);
      (0, import_web8.effect)((_p$) => {
        const _v$ = classes.dcontainer, _v$2 = props.style, _v$3 = classes.ddown + " " + (props.placeholder && props.value === "" ? classes.ddownplaceholder : ""), _v$4 = props.placeholder, _v$5 = props.id, _v$6 = props["aria-label"], _v$7 = props.disabled;
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
      return _el$;
    })();
  };

  // util/debounce.ts
  var debounce = (fn, delay) => {
    let timer = null;
    return (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(void 0, args);
      }, delay);
    };
  };

  // plugins/dorion-theme-browser/api.ts
  var BASE = "https://betterdiscord.app";
  var themeListEndpoint = (options) => __async(void 0, null, function* () {
    const query = new URLSearchParams(options);
    query.set("type", "theme");
    query.set("pages", "1");
    query.set("sortDirection", "descending");
    query.set("tags", "[]");
    const resp = yield fetch(`${BASE}/Addon/GetApprovedAddons?${query}`);
    if (!resp.ok) {
      throw new Error("Failed to fetch themes");
    }
    const parser = new DOMParser();
    const dom = parser.parseFromString(yield resp.text(), "text/html");
    const themes = Array.from(dom.querySelectorAll(".card-wrap")).map((e) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      return {
        thumbnail: `${BASE}${(_a = e.querySelector(".card-image")) == null ? void 0 : _a.getAttribute("src")}`,
        name: (_c = (_b = e.querySelector(".card-title")) == null ? void 0 : _b.textContent) == null ? void 0 : _c.trim(),
        author: (_e = (_d = e.querySelector(".author-link")) == null ? void 0 : _d.textContent) == null ? void 0 : _e.trim(),
        description: (_g = (_f = e.querySelector(".card-description")) == null ? void 0 : _f.textContent) == null ? void 0 : _g.trim(),
        likes: (_i = (_h = e.querySelector("#addon-likes")) == null ? void 0 : _h.textContent) == null ? void 0 : _i.trim(),
        downloads: (_k = (_j = e.querySelector("#addon-downloads")) == null ? void 0 : _j.textContent) == null ? void 0 : _k.trim()
      };
    });
    return themes;
  });

  // plugins/dorion-theme-browser/components/ThemeCard.tsx
  var import_web12 = __toESM(require_web(), 1);
  var import_web13 = __toESM(require_web(), 1);
  var import_web14 = __toESM(require_web(), 1);
  var import_web15 = __toESM(require_web(), 1);
  var import_web16 = __toESM(require_web(), 1);
  var import_web17 = __toESM(require_web(), 1);

  // plugins/dorion-theme-browser/components/ThemeCard.tsx.scss
  var css2 = `._themeCard_16boh_1{display:flex;flex-direction:column;justify-content:space-around;align-items:flex-start;text-align:left;padding:0px;margin:8px;color:var(--text-primary);background:var(--background-secondary);border-radius:8px}._themeCard_16boh_1 ._thumbnail_16boh_1{width:100%;height:160px;overflow:hidden;border-radius:8px 8px 0px 0px;background-size:cover;background-position:center}._themeCard_16boh_1 ._info_16boh_1{display:flex;flex-direction:column;margin-top:6px;padding:16px;width:100%;text-overflow:ellipsis;overflow:hidden}._themeCard_16boh_1 ._info_16boh_1 ._name_16boh_1,._themeCard_16boh_1 ._info_16boh_1 ._contents_16boh_1,._themeCard_16boh_1 ._info_16boh_1 ._installButton_16boh_1{margin-bottom:8px}._themeCard_16boh_1 ._info_16boh_1 ._installButton_16boh_1{margin-top:8px;width:100%}`;
  var classes2 = {
    "themeCard": "_themeCard_16boh_1",
    "thumbnail": "_thumbnail_16boh_1",
    "info": "_info_16boh_1",
    "name": "_name_16boh_1",
    "contents": "_contents_16boh_1",
    "installButton": "_installButton_16boh_1"
  };

  // plugins/dorion-theme-browser/components/ThemeCard.tsx
  var _tmpl$4 = /* @__PURE__ */ (0, import_web12.template)(`<b></b>`, 2);
  var _tmpl$23 = /* @__PURE__ */ (0, import_web12.template)(`<div><div></div><div><div></div></div></div>`, 8);
  var {
    ui: {
      injectCss: injectCss2,
      Button,
      Text
    },
    solid: {
      createSignal,
      createEffect
    }
  } = shelter;
  var injectedCss2 = false;
  function ThemeCard(props) {
    if (!injectedCss2) {
      injectCss2(css2);
      injectedCss2 = true;
    }
    const installTheme = () => {
    };
    return (() => {
      const _el$ = _tmpl$23.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$6 = _el$3.firstChild;
      (0, import_web17.insert)(_el$3, (0, import_web16.createComponent)(Text, {
        get ["class"]() {
          return classes2.name;
        },
        get children() {
          return [(() => {
            const _el$4 = _tmpl$4.cloneNode(true);
            (0, import_web17.insert)(_el$4, () => props.theme);
            return _el$4;
          })(), " by ", (() => {
            const _el$5 = _tmpl$4.cloneNode(true);
            (0, import_web17.insert)(_el$5, () => props.author);
            return _el$5;
          })()];
        }
      }), _el$6);
      (0, import_web17.insert)(_el$3, (0, import_web16.createComponent)(Text, {
        get ["class"]() {
          return classes2.contents;
        },
        get children() {
          return props.description;
        }
      }), _el$6);
      (0, import_web17.insert)(_el$6, (0, import_web16.createComponent)(Button, {
        get ["class"]() {
          return classes2.installButton;
        },
        onClick: installTheme,
        children: "Install"
      }));
      (0, import_web15.effect)((_p$) => {
        const _v$ = classes2.themeCard, _v$2 = classes2.thumbnail, _v$3 = `background-image: url(${props.thumbnail})`, _v$4 = classes2.info, _v$5 = classes2.buttonContainer;
        _v$ !== _p$._v$ && (0, import_web14.className)(_el$, _p$._v$ = _v$);
        _v$2 !== _p$._v$2 && (0, import_web14.className)(_el$2, _p$._v$2 = _v$2);
        _p$._v$3 = (0, import_web13.style)(_el$2, _v$3, _p$._v$3);
        _v$4 !== _p$._v$4 && (0, import_web14.className)(_el$3, _p$._v$4 = _v$4);
        _v$5 !== _p$._v$5 && (0, import_web14.className)(_el$6, _p$._v$5 = _v$5);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0,
        _v$3: void 0,
        _v$4: void 0,
        _v$5: void 0
      });
      return _el$;
    })();
  }

  // plugins/dorion-theme-browser/components/ThemePage.tsx.scss
  var css3 = `._shead_1ax34_1{margin-top:16px;margin-bottom:8px}._bot16_1ax34_1{margin-bottom:16px}._themeCards_1ax34_1{display:grid;grid-template-columns:repeat(2, 1fr);grid-gap:8px;margin-top:16px;width:100%}._sortSection_1ax34_1{display:flex;flex-direction:row;justify-content:space-between;align-items:center}._searchBox_1ax34_1{flex-grow:0 !important;width:50%}`;
  var classes3 = {
    "shead": "_shead_1ax34_1",
    "bot16": "_bot16_1ax34_1",
    "themeCards": "_themeCards_1ax34_1",
    "sortSection": "_sortSection_1ax34_1",
    "searchBox": "_searchBox_1ax34_1"
  };

  // plugins/dorion-theme-browser/components/ThemePage.tsx
  var _tmpl$5 = /* @__PURE__ */ (0, import_web18.template)(`<div><span></span></div>`, 4);
  var _tmpl$24 = /* @__PURE__ */ (0, import_web18.template)(`<div></div>`, 2);
  var {
    ui: {
      injectCss: injectCss3,
      Divider,
      Header,
      HeaderTags,
      TextBox
    },
    solid: {
      createSignal: createSignal2,
      createEffect: createEffect2
    }
  } = shelter;
  var injectedCss3 = false;
  function ThemePage() {
    if (!injectedCss3) {
      injectCss3(css3);
      injectedCss3 = true;
    }
    const [themeData, setThemeData] = createSignal2([]);
    const [sort, setSort] = createSignal2("popular");
    const [search, setSearch] = createSignal2("");
    createEffect2(() => __async(this, null, function* () {
      yield loadThemes();
    }));
    const loadThemes = () => __async(this, null, function* () {
      setThemeData(yield themeListEndpoint({
        page: "1",
        sort: sort(),
        filter: search()
      }));
    });
    const doSearch = debounce((v) => setSearch(v), 500);
    return [(0, import_web22.createComponent)(Header, {
      get tag() {
        return HeaderTags.H1;
      },
      get ["class"]() {
        return classes3.tophead;
      },
      children: "Theme Browser"
    }), (() => {
      const _el$ = _tmpl$5.cloneNode(true), _el$2 = _el$.firstChild;
      (0, import_web21.insert)(_el$, (0, import_web22.createComponent)(Dropdown, {
        get value() {
          return sort();
        },
        onChange: (e) => {
          setSort(e.target.value);
          loadThemes();
        },
        style: "width: 30%;",
        options: [{
          label: "Popular",
          value: "popular"
        }, {
          label: "Creation Date",
          value: "creationdate"
        }, {
          label: "Name",
          value: "name"
        }, {
          label: "Likes",
          value: "likes"
        }, {
          label: "Downloads",
          value: "downloads"
        }, {
          label: "Recently Updated",
          value: "recentlyupdated"
        }],
        placeholder: "Sort by..."
      }), _el$2);
      (0, import_web21.insert)(_el$2, (0, import_web22.createComponent)(TextBox, {
        get value() {
          return search();
        },
        onInput: (v) => doSearch(v),
        placeholder: "Search..."
      }));
      (0, import_web20.effect)((_p$) => {
        const _v$ = classes3.sortSection, _v$2 = classes3.searchBox;
        _v$ !== _p$._v$ && (0, import_web19.className)(_el$, _p$._v$ = _v$);
        _v$2 !== _p$._v$2 && (0, import_web19.className)(_el$2, _p$._v$2 = _v$2);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0
      });
      return _el$;
    })(), (0, import_web22.createComponent)(Divider, {
      mt: 16,
      mb: 16
    }), (() => {
      const _el$3 = _tmpl$24.cloneNode(true);
      (0, import_web21.insert)(_el$3, () => themeData().map((t) => (0, import_web22.createComponent)(ThemeCard, {
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
      (0, import_web20.effect)(() => (0, import_web19.className)(_el$3, classes3.themeCards));
      return _el$3;
    })()];
  }

  // plugins/dorion-theme-browser/index.ts
  var {
    settings: {
      registerSection
    }
  } = shelter;
  var uninjects = [
    registerSection("divider"),
    registerSection("header", "Theme Browser"),
    registerSection("section", `${appName}-theme-browser`, "Theme Browser", ThemePage)
  ];
  var onUnload = () => {
    uninjects.forEach((u) => u());
  };
  return __toCommonJS(dorion_theme_browser_exports);
})();