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

  // plugins/plugin-browser/index.ts
  var plugin_browser_exports = {};
  __export(plugin_browser_exports, {
    onUnload: () => onUnload
  });

  // plugins/plugin-browser/components/Plugins.tsx
  var import_web7 = __toESM(require_web(), 1);
  var import_web8 = __toESM(require_web(), 1);
  var import_web9 = __toESM(require_web(), 1);
  var import_web10 = __toESM(require_web(), 1);
  var import_web11 = __toESM(require_web(), 1);
  var import_web12 = __toESM(require_web(), 1);
  var import_web13 = __toESM(require_web(), 1);

  // plugins/plugin-browser/components/Plugins.scss
  var css = `._subtitle_cy731_1{margin-top:12px;display:block}._pluginList_cy731_1{display:grid;grid-template-columns:repeat(2, 1fr);grid-gap:16px;margin-top:16px}._repoHeader_cy731_1{display:flex;flex-direction:row;justify-content:space-between;align-items:center}._loading_cy731_1{display:flex;justify-content:center;align-items:center;height:100%}`;
  var classes = {
    "subtitle": "_subtitle_cy731_1",
    "pluginList": "_pluginList_cy731_1",
    "repoHeader": "_repoHeader_cy731_1",
    "loading": "_loading_cy731_1"
  };

  // plugins/plugin-browser/components/PluginCard.tsx
  var import_web = __toESM(require_web(), 1);
  var import_web2 = __toESM(require_web(), 1);
  var import_web3 = __toESM(require_web(), 1);
  var import_web4 = __toESM(require_web(), 1);
  var import_web5 = __toESM(require_web(), 1);
  var import_web6 = __toESM(require_web(), 1);

  // plugins/plugin-browser/storage.ts
  function createLocalStorage() {
    const iframe = document.createElement("iframe");
    const interval = setInterval(() => {
      if (!document.head)
        return;
      document.head.append(iframe);
      const pd = Object.getOwnPropertyDescriptor(iframe.contentWindow, "localStorage");
      iframe.remove();
      if (!pd)
        return;
      Object.defineProperty(window, "localStorage", pd);
      clearInterval(interval);
    }, 50);
  }
  function savePluginsCache(cache) {
    localStorage.setItem("plugins-browser-cache", `${Date.now()};${JSON.stringify(cache)}`);
  }
  function getPluginsCache() {
    const cache = localStorage.getItem("plugins-browser-cache");
    if (!cache) {
      return null;
    }
    const [time, json] = cache.split(";");
    let cacheJson = null;
    try {
      cacheJson = JSON.parse(json);
    } catch (e) {
      console.log("[Plugin Browser] Error parsing cache JSON: ", e);
      return null;
    }
    maybeClearCache(time);
    return cacheJson;
  }
  function maybeClearCache(time) {
    if (Date.now() - parseInt(time) > 1e3 * 60 * 60) {
      localStorage.removeItem("plugins-browser-cache");
    }
  }
  function getPluginJsonCache() {
    const cache = localStorage.getItem("plugins-browser-plugin-json");
    if (!cache) {
      return {};
    }
    const [time, json] = cache.split(";");
    let cacheJson = null;
    try {
      cacheJson = JSON.parse(json);
    } catch (e) {
      console.log("[Plugin Browser] Error parsing cache JSON: ", e);
      return {};
    }
    maybeClearPluginJsonCache(time);
    return cacheJson;
  }
  function savePluginJsonCache(url, json) {
    localStorage.setItem("plugins-browser-plugin-json", `${Date.now()};${JSON.stringify(__spreadProps(__spreadValues({}, getPluginJsonCache()), { [url]: json }))}`);
  }
  function maybeClearPluginJsonCache(time) {
    if (Date.now() - parseInt(time) > 1e3 * 60 * 60) {
      localStorage.removeItem("plugins-browser-plugin-json");
    }
  }

  // plugins/plugin-browser/github.ts
  var ghFetch = (url) => __async(void 0, null, function* () {
    return fetch(url, {
      headers: {
        "User-Agent": "Shelter Plugin Browser"
      }
    });
  });
  function getRepos() {
    return __async(this, null, function* () {
      const resp = yield ghFetch("https://api.github.com/search/repositories?q=shelter-plugins");
      const json = yield resp.json();
      return json.items.map((item) => {
        return {
          name: item.name,
          description: item.description,
          url: item.html_url,
          stars: item.stargazers_count,
          owner: item.owner.login,
          owner_url: item.owner.html_url,
          owner_avatar: item.owner.avatar_url,
          homepage: item.homepage
        };
      });
    });
  }
  function pluginsSite(repo) {
    return __async(this, null, function* () {
      if (repo.homepage) {
        return repo.homepage;
      } else {
        return `https://${repo.owner}.github.io/${repo.name}`;
      }
    });
  }
  function getRepoPlugins(repo) {
    return __async(this, null, function* () {
      const resp = yield ghFetch(`https://api.github.com/repos/${repo.owner}/${repo.name}/contents/plugins`);
      const json = yield resp.json();
      if (!Array.isArray(json)) {
        return [];
      }
      return json.map((item) => item.name);
    });
  }
  function getPluginsLocation(site, plugins) {
    return __async(this, null, function* () {
      const plugin = plugins == null ? void 0 : plugins[0];
      if (!plugin) {
        return site;
      }
      const paths = [
        `${site}/shelter-plugins/`,
        `${site}/`
      ];
      let workingPath = site;
      for (const path of paths) {
        const url = `${path}/${plugin}/plugin.json`;
        const resp = yield ghFetch(url);
        try {
          const json = yield resp.json();
          if (json.name) {
            workingPath = path;
            break;
          }
        } catch (e) {
        }
      }
      return workingPath;
    });
  }
  function getPluginJson(site, plugin) {
    return __async(this, null, function* () {
      const url = `${site}/${plugin}/plugin.json`;
      const cache = getPluginJsonCache();
      if (cache[url]) {
        return cache[url];
      }
      const resp = yield ghFetch(url);
      try {
        const json = yield resp.json();
        savePluginJsonCache(url, json);
        return json;
      } catch (e) {
        console.log("[Plugin Browser] Error parsing plugin.json: ", e.message);
        return null;
      }
    });
  }
  function getAllPlugins() {
    return __async(this, null, function* () {
      const repos = yield getRepos();
      let plugins = yield Promise.all(repos.map((repo) => __async(this, null, function* () {
        try {
          const site = yield pluginsSite(repo);
          if (!site) {
            console.log("[Plugin Browser] No site found for repo: ", repo.name);
            return null;
          }
          const plugins2 = yield getRepoPlugins(repo);
          if (!plugins2 || plugins2.length === 0) {
            console.log(`[Plugin Browser] No plugins found for repo: ${repo.owner}/${repo.name}`);
            return null;
          }
          return {
            site: yield getPluginsLocation(site, plugins2),
            repo,
            plugins: plugins2
          };
        } catch (e) {
          console.error(e);
          return null;
        }
      })));
      plugins = plugins.filter((plugin) => plugin !== null);
      savePluginsCache(plugins);
      return plugins;
    });
  }

  // plugins/plugin-browser/components/PluginCard.scss
  var css2 = `._pluginCard_9arrd_1{display:flex;flex-direction:column;justify-content:space-evenly;align-items:flex-start;text-align:left;padding:16px;color:var(--text-primary);background:var(--background-secondary);border-radius:8px}._pluginCard_9arrd_1 ._contents_9arrd_1{margin-top:8px;flex:1}._pluginCard_9arrd_1 ._buttonContainer_9arrd_1{margin-top:8px;width:100%}._pluginCard_9arrd_1 ._buttonContainer_9arrd_1 ._installButton_9arrd_1{flex-grow:1;width:100%}._pluginCard_9arrd_1 ._buttonContainer_9arrd_1 ._installButton_9arrd_1 button P{width:100%}`;
  var classes2 = {
    "pluginCard": "_pluginCard_9arrd_1",
    "contents": "_contents_9arrd_1",
    "buttonContainer": "_buttonContainer_9arrd_1",
    "installButton": "_installButton_9arrd_1"
  };

  // plugins/plugin-browser/components/PluginCard.tsx
  var _tmpl$ = /* @__PURE__ */ (0, import_web.template)(`<b></b>`, 2);
  var _tmpl$2 = /* @__PURE__ */ (0, import_web.template)(`<div><div></div></div>`, 4);
  var {
    ui: {
      injectCss,
      Button,
      Text
    },
    solid: {
      createSignal,
      createEffect
    },
    plugins: {
      installedPlugins,
      addRemotePlugin
    }
  } = shelter;
  var injectedCss = false;
  function PluginCard(props) {
    if (!injectedCss) {
      injectCss(css2);
      injectedCss = true;
    }
    const [info, setInfo] = createSignal({});
    const [installed, setInstalled] = createSignal(false);
    createEffect(() => __async(this, null, function* () {
      setInfo(yield getPluginJson(props.site, props.plugin));
      const installed2 = Object.values((installedPlugins == null ? void 0 : installedPlugins()) || {}).some((p) => {
        var _a, _b;
        return p.manifest.name === ((_a = info()) == null ? void 0 : _a.name) && p.manifest.author === ((_b = info()) == null ? void 0 : _b.author);
      });
      setInstalled(installed2);
    }));
    const installPlugin = () => {
      addRemotePlugin(props.plugin, props.install_url, true);
      setInstalled(true);
    };
    return (() => {
      const _el$ = _tmpl$2.cloneNode(true), _el$4 = _el$.firstChild;
      (0, import_web5.insert)(_el$, (0, import_web4.createComponent)(Text, {
        get ["class"]() {
          return classes2.name;
        },
        get children() {
          return [(() => {
            const _el$2 = _tmpl$.cloneNode(true);
            (0, import_web5.insert)(_el$2, () => {
              var _a;
              return ((_a = info()) == null ? void 0 : _a.name) || props.plugin;
            });
            return _el$2;
          })(), " by ", (() => {
            const _el$3 = _tmpl$.cloneNode(true);
            (0, import_web5.insert)(_el$3, () => props.author);
            return _el$3;
          })()];
        }
      }), _el$4);
      (0, import_web5.insert)(_el$, (0, import_web4.createComponent)(Text, {
        get ["class"]() {
          return classes2.contents;
        },
        get children() {
          var _a;
          return (_a = info()) == null ? void 0 : _a.description;
        }
      }), _el$4);
      (0, import_web5.insert)(_el$4, (0, import_web4.createComponent)(Button, {
        get ["class"]() {
          return classes2.installButton;
        },
        onClick: installPlugin,
        get disabled() {
          var _a;
          return installed() || !((_a = info()) == null ? void 0 : _a.name);
        },
        get children() {
          return installed() ? "Installed" : "Install";
        }
      }));
      (0, import_web3.effect)((_p$) => {
        const _v$ = classes2.pluginCard, _v$2 = classes2.buttonContainer;
        _v$ !== _p$._v$ && (0, import_web2.className)(_el$, _p$._v$ = _v$);
        _v$2 !== _p$._v$2 && (0, import_web2.className)(_el$4, _p$._v$2 = _v$2);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0
      });
      return _el$;
    })();
  }

  // plugins/plugin-browser/components/Plugins.tsx
  var _tmpl$3 = /* @__PURE__ */ (0, import_web7.template)(`<a href="https://github.com/SpikeHD/shelter-plugins/tree/main/plugins/plugin-browser" target="_blank">Take a look</a>`, 2);
  var _tmpl$22 = /* @__PURE__ */ (0, import_web7.template)(`<a target="_blank">View Repository</a>`, 2);
  var _tmpl$32 = /* @__PURE__ */ (0, import_web7.template)(`<div></div>`, 2);
  var {
    ui: {
      injectCss: injectCss2,
      Header,
      HeaderTags,
      Text: Text2,
      Divider,
      TextBox,
      showToast
    },
    solid: {
      createSignal: createSignal2,
      createEffect: createEffect2
    }
  } = shelter;
  var injectedCss2 = false;
  var debounce = (fn, ms) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        fn(...args);
      }, ms);
    };
  };
  function Plugins() {
    if (!injectedCss2) {
      injectCss2(css);
      injectedCss2 = true;
    }
    const [repos, setRepos] = createSignal2([]);
    const [search, setSearch] = createSignal2("");
    createEffect2(() => __async(this, null, function* () {
      setRepos(getPluginsCache() || (yield getAllPlugins().catch((e) => {
        console.error(e);
        showToast({
          title: "Plugin Browser",
          content: "Failed to load plugins, check DevTools for error.",
          duration: 5e3
        });
        return [];
      })));
    }));
    return [(0, import_web13.createComponent)(Header, {
      get tag() {
        return HeaderTags.H1;
      },
      children: "Plugins"
    }), (0, import_web13.createComponent)(Text2, {
      get ["class"]() {
        return classes.subtitle;
      },
      get children() {
        return ["Not seeing your plugin repo? ", _tmpl$3.cloneNode(true), " at how this plugin finds repos!"];
      }
    }), (0, import_web13.createComponent)(Divider, {
      mt: 16,
      mb: 16
    }), (0, import_web13.createComponent)(TextBox, {
      get value() {
        return search();
      },
      get onInput() {
        return debounce((v) => setSearch(v), 100);
      },
      placeholder: "Search..."
    }), (0, import_web12.memo)((() => {
      const _c$ = (0, import_web12.memo)(() => repos().length > 0);
      return () => _c$() ? repos().map((repo) => {
        return [(0, import_web13.createComponent)(Divider, {
          mt: 16,
          mb: 16
        }), (() => {
          const _el$2 = _tmpl$32.cloneNode(true);
          (0, import_web9.insert)(_el$2, (0, import_web13.createComponent)(Header, {
            get tag() {
              return HeaderTags.H2;
            },
            get children() {
              return repo.repo.owner;
            }
          }), null);
          (0, import_web9.insert)(_el$2, (0, import_web13.createComponent)(Header, {
            get tag() {
              return HeaderTags.H2;
            },
            get children() {
              return [(() => {
                const _el$3 = _tmpl$22.cloneNode(true);
                (0, import_web11.effect)(() => (0, import_web10.setAttribute)(_el$3, "href", repo.repo.url));
                return _el$3;
              })(), " - ", (0, import_web12.memo)(() => repo.repo.stars), " \u2B50"];
            }
          }), null);
          (0, import_web11.effect)(() => (0, import_web8.className)(_el$2, classes.repoHeader));
          return _el$2;
        })(), (() => {
          const _el$4 = _tmpl$32.cloneNode(true);
          (0, import_web9.insert)(_el$4, () => repo.plugins.map((p) => {
            if (p.toLowerCase().includes("dorion"))
              return null;
            if (!p.toLowerCase().includes(search().toLowerCase()))
              return null;
            return (0, import_web13.createComponent)(PluginCard, {
              plugin: p,
              get site() {
                return repo.site;
              },
              get author() {
                return repo.repo.owner;
              },
              get install_url() {
                return `${repo.site}/${p}`;
              }
            });
          }));
          (0, import_web11.effect)(() => (0, import_web8.className)(_el$4, classes.pluginList));
          return _el$4;
        })()];
      }) : (() => {
        const _el$5 = _tmpl$32.cloneNode(true);
        (0, import_web9.insert)(_el$5, (0, import_web13.createComponent)(Text2, {
          children: "Loading..."
        }));
        (0, import_web11.effect)(() => (0, import_web8.className)(_el$5, classes.loading));
        return _el$5;
      })();
    })())];
  }

  // plugins/plugin-browser/index.ts
  var {
    settings: {
      registerSection
    }
  } = shelter;
  var unload = registerSection("section", "plugin-browser", "Plugin Browser", Plugins);
  if (!window.localStorage) {
    createLocalStorage();
  }
  var onUnload = () => {
    unload();
  };
  return __toCommonJS(plugin_browser_exports);
})();
