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

  // shltr-res-ns:solid-js/web
  var require_web = __commonJS({
    "shltr-res-ns:solid-js/web"(exports, module) {
      module.exports = shelter.solidWeb;
    }
  });

  // plugins/platform-spoof/index.tsx
  var platform_spoof_exports = {};
  __export(platform_spoof_exports, {
    settings: () => settings
  });
  var import_web11 = __toESM(require_web());
  var import_web12 = __toESM(require_web());
  var import_web13 = __toESM(require_web());

  // node_modules/.pnpm/@cumjar+websmack@1.2.0/node_modules/@cumjar/websmack/src/raid/webpackChunk.js
  var webpackChunk_default = (key) => {
    key ??= Object.keys(window).find((key2) => key2.startsWith("webpackChunk"));
    if (!window[key])
      return;
    let wpRequire;
    window[key].push([
      [Symbol()],
      {},
      (e) => {
        wpRequire = e;
      }
    ]);
    window[key].pop();
    return [wpRequire.c ?? // wow thats jank lmao
    Object.fromEntries(
      Object.entries(wpRequire.m).map(([k]) => [
        k,
        { id: k, loaded: true, exports: wpRequire(k) }
      ])
    ), wpRequire];
  };

  // node_modules/.pnpm/@cumjar+websmack@1.2.0/node_modules/@cumjar/websmack/src/api/filters.js
  var byProps = (props) => (m) => props.every((p) => m[p] !== void 0);
  var byProtos = (protos) => (m) => m.prototype && protos.every((p) => m.prototype[p] !== void 0);
  var byDisplayName = (name, defaultExp = true) => (m) => (defaultExp ? m.displayName : m.default?.displayName) === name;
  var byKeyword = (strs) => (m) => strs.every(
    (s2) => Object.keys(m).some((k) => k.toLowerCase().includes(s2.toLowerCase()))
  );
  var byDispNameDeep = (name) => (m) => {
    const regex = new RegExp(`(${name}$)|((\\w+\\()+${name}\\))`);
    if (regex.test(m.displayName))
      return true;
    if (typeof m.$$typeof !== "symbol")
      return;
    if (m.Consumer !== void 0)
      return;
    if (m.type || m.render) {
      while (typeof m.type === "object" || typeof m.render === "object")
        m = m.type ?? m.render;
      if (regex.test(m.type?.displayName))
        return true;
      if (regex.test(m.render?.displayName))
        return true;
    }
  };
  var isKeyable = (m) => typeof m === "object" || typeof m === "function";
  var byNestedProps = (props) => (m) => isKeyable(m) && Object.values(m).some(
    (v) => isKeyable(v) && props.some((p) => v?.[p] !== void 0)
  );
  var allByCode = (modules, loaders) => (code) => Object.entries(loaders).filter(([, m]) => m.toString().match(code)).map(([id]) => modules[id]?.exports).filter((m) => m);

  // node_modules/.pnpm/@cumjar+websmack@1.2.0/node_modules/@cumjar/websmack/src/api/batch.js
  var batchFilter = (modules, filterList) => {
    const found = [];
    const checkModule = (mod) => filterList.forEach(([filter2, multi], i) => {
      if (multi && !found[i])
        found[i] = [];
      if (filter2(mod)) {
        if (multi)
          found[i].push(mod);
        else if (!found[i])
          found[i] = mod;
      }
    });
    for (const mid in modules) {
      const module = modules[mid].exports;
      if (!module || module === window)
        continue;
      if (module.default && module.__esModule)
        checkModule(module.default);
      checkModule(module);
    }
    return found;
  };
  var makeFakeWp = (filterList) => ({
    find: (f) => filterList.push([f, false]),
    findAll: (f) => filterList.push([f, true]),
    findByProps: (...p) => filterList.push([byProps(p), false]),
    findByPropsAll: (...p) => filterList.push([byProps(p), true]),
    findByPrototypes: (...p) => filterList.push([byProtos(p), false]),
    findByPrototypesAll: (...p) => filterList.push([byProtos(p), true]),
    findByNestedProps: (...p) => filterList.push([byNestedProps(p), false]),
    findByNestedPropsAll: (...p) => filterList.push([byNestedProps(p), true]),
    findByDisplayName: (n, d) => filterList.push([byDisplayName(n, d), false]),
    findByDisplayNameAll: (n, d) => filterList.push([byDisplayName(n, d), true]),
    findByDispNameDeep: (n) => filterList.push([byDispNameDeep(n), false]),
    findByDispNameDeepAll: (n) => filterList.push([byDispNameDeep(n), true]),
    findByKeyword: (...s2) => filterList.push([byKeyword(s2), false]),
    findByKeywordAll: (...s2) => filterList.push([byKeyword(s2), true])
  });
  var batch_default = (mods) => (cb) => {
    const fList = [];
    const fakeWp = makeFakeWp(fList);
    cb(fakeWp);
    return batchFilter(mods, fList);
  };

  // node_modules/.pnpm/@cumjar+websmack@1.2.0/node_modules/@cumjar/websmack/src/api/index.js
  var filter = (modules, single = true) => (filterFunc) => {
    const found = [];
    for (const mid in modules) {
      const module = modules[mid].exports;
      if (!module || module === window)
        continue;
      if (module.default && module.__esModule && filterFunc(module.default)) {
        if (single)
          return module.default;
        found.push(module.default);
      }
      if (filterFunc(module)) {
        if (single)
          return module;
        found.push(module);
      }
    }
    if (!single)
      return found;
  };
  var api_default = ([, modules, wpR]) => {
    const find = filter(modules);
    const findAll = filter(modules, false);
    const findByCodeAll = wpR ? allByCode(modules, wpR.m) : () => {
      throw new Error("findByCode does not work with this bundler");
    };
    return {
      batchFind: batch_default(modules),
      find,
      findAll,
      findByProps: (...p) => find(byProps(p)),
      findByPropsAll: (...p) => findAll(byProps(p)),
      findByPrototypes: (...p) => find(byProtos(p)),
      findByPrototypesAll: (...p) => findAll(byProtos(p)),
      findByNestedProps: (...p) => find(byNestedProps(p)),
      findByNestedPropsAll: (...p) => findAll(byNestedProps(p)),
      findByDisplayName: (d, p) => find(byDisplayName(d, p)),
      findByDisplayNameAll: (d, p) => findAll(byDisplayName(d, p)),
      findByDispNameDeep: (d) => find(byDispNameDeep(d)),
      findByDispNameDeepAll: (d) => findAll(byDispNameDeep(d)),
      findByKeyword: (...k) => find(byKeyword(k)),
      findByKeywordAll: (...k) => findAll(byKeyword(k)),
      findByCodeAll,
      findByCode: (c) => findByCodeAll(c)[0]
    };
  };

  // node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/shared.js
  var patchTypes = ["a", "b", "i"];
  var patchedObjects = /* @__PURE__ */ new Map();

  // node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/hook.js
  function hook_default(funcName, funcParent, funcArgs, ctxt, isConstruct) {
    const patch = patchedObjects.get(funcParent)?.[funcName];
    if (!patch)
      return isConstruct ? Reflect.construct(funcParent[funcName], funcArgs, ctxt) : funcParent[funcName].apply(ctxt, funcArgs);
    for (const hook of patch.b.values()) {
      const maybefuncArgs = hook.call(ctxt, funcArgs);
      if (Array.isArray(maybefuncArgs))
        funcArgs = maybefuncArgs;
    }
    let workingRetVal = [...patch.i.values()].reduce(
      (prev, current) => (...args) => current.call(ctxt, args, prev),
      // This calls the original function
      (...args) => isConstruct ? Reflect.construct(patch.o, args, ctxt) : patch.o.apply(ctxt, args)
    )(...funcArgs);
    for (const hook of patch.a.values())
      workingRetVal = hook.call(ctxt, funcArgs, workingRetVal) ?? workingRetVal;
    return workingRetVal;
  }

  // node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/unpatch.js
  function unpatch(funcParent, funcName, hookId, type) {
    const patchedObject = patchedObjects.get(funcParent);
    const patch = patchedObject?.[funcName];
    if (!patch?.[type].has(hookId))
      return false;
    patch[type].delete(hookId);
    if (patchTypes.every((t) => patch[t].size === 0)) {
      const success = Reflect.defineProperty(funcParent, funcName, {
        value: patch.o,
        writable: true,
        configurable: true
      });
      if (!success)
        funcParent[funcName] = patch.o;
      delete patchedObject[funcName];
    }
    if (Object.keys(patchedObject).length == 0)
      patchedObjects.delete(funcParent);
    return true;
  }

  // node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/getPatchFunc.js
  var getPatchFunc_default = (patchType) => (funcName, funcParent, callback, oneTime = false) => {
    if (typeof funcParent[funcName] !== "function")
      throw new Error(`${funcName} is not a function in ${funcParent.constructor.name}`);
    if (!patchedObjects.has(funcParent))
      patchedObjects.set(funcParent, /* @__PURE__ */ Object.create(null));
    const parentInjections = patchedObjects.get(funcParent);
    if (!parentInjections[funcName]) {
      const origFunc = funcParent[funcName];
      parentInjections[funcName] = {
        o: origFunc,
        b: /* @__PURE__ */ new Map(),
        i: /* @__PURE__ */ new Map(),
        a: /* @__PURE__ */ new Map()
      };
      const runHook = (ctxt, args, construct) => {
        const ret = hook_default(funcName, funcParent, args, ctxt, construct);
        if (oneTime)
          unpatchThisPatch();
        return ret;
      };
      const replaceProxy = new Proxy(origFunc, {
        apply: (_, ctxt, args) => runHook(ctxt, args, false),
        construct: (_, args) => runHook(origFunc, args, true),
        get: (target, prop, receiver) => prop == "toString" ? origFunc.toString.bind(origFunc) : Reflect.get(target, prop, receiver)
      });
      const success = Reflect.defineProperty(funcParent, funcName, {
        value: replaceProxy,
        configurable: true,
        writable: true
      });
      if (!success)
        funcParent[funcName] = replaceProxy;
    }
    const hookId = Symbol();
    const unpatchThisPatch = () => unpatch(funcParent, funcName, hookId, patchType);
    parentInjections[funcName][patchType].set(hookId, callback);
    return unpatchThisPatch;
  };

  // node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/index.js
  var before = getPatchFunc_default("b");
  var instead = getPatchFunc_default("i");
  var after = getPatchFunc_default("a");

  // components/RadioGroup.tsx
  var import_web8 = __toESM(require_web(), 1);
  var import_web9 = __toESM(require_web(), 1);
  var import_web10 = __toESM(require_web(), 1);

  // components/Radio.tsx
  var import_web = __toESM(require_web(), 1);
  var import_web2 = __toESM(require_web(), 1);
  var import_web3 = __toESM(require_web(), 1);
  var import_web4 = __toESM(require_web(), 1);
  var import_web5 = __toESM(require_web(), 1);
  var import_web6 = __toESM(require_web(), 1);
  var import_web7 = __toESM(require_web(), 1);

  // components/Radio.tsx.scss
  var classes = { "radioButton": "Ch7osa_radioButton", "radioButtonInner": "Ch7osa_radioButtonInner", "radio": "Ch7osa_radio", "selected": "Ch7osa_selected" };
  var css = `.Ch7osa_radio {
  color: var(--interactive-normal);
  box-sizing: border-box;
  grid-gap: 8px;
  background: var(--background-secondary);
  cursor: pointer;
  border-radius: 4px;
  grid-template-columns: auto 1fr;
  align-items: center;
  padding: 8px;
  display: grid;
}

.Ch7osa_radio:not(:last-child) {
  margin-bottom: 8px;
}

.Ch7osa_radio .Ch7osa_radioButton {
  border: 2px solid var(--interactive-normal);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin: 4px;
  position: relative;
}

.Ch7osa_radio .Ch7osa_radioButton .Ch7osa_radioButtonInner {
  background: var(--interactive-normal);
  border-radius: 50%;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.Ch7osa_radio:hover {
  background-color: var(--background-modifier-hover);
}

.Ch7osa_radio.Ch7osa_selected {
  color: var(--interactive-active);
  background-color: var(--background-modifier-selected);
}

.Ch7osa_radio.Ch7osa_selected .Ch7osa_radioButton {
  border-color: var(--interactive-active);
}

.Ch7osa_radio.Ch7osa_selected .Ch7osa_radioButton .Ch7osa_radioButtonInner {
  background: var(--interactive-active);
}
`;

  // components/Radio.tsx
  var _tmpl$ = /* @__PURE__ */ (0, import_web.template)(`<div><div></div></div>`, 4);
  var _tmpl$2 = /* @__PURE__ */ (0, import_web.template)(`<div></div>`, 2);
  var {
    ui: {
      injectCss,
      Text
    }
  } = shelter;
  var injectedCss = false;
  var Radio = (props) => {
    if (!injectedCss) {
      injectedCss = true;
      injectCss(css);
    }
    const onRadioClick = () => {
      props.onClick(props.value);
    };
    return (() => {
      const _el$ = _tmpl$.cloneNode(true), _el$2 = _el$.firstChild;
      _el$.$$click = onRadioClick;
      (0, import_web6.insert)(_el$2, (() => {
        const _c$ = (0, import_web7.memo)(() => !!props.selected);
        return () => _c$() && (() => {
          const _el$3 = _tmpl$2.cloneNode(true);
          (0, import_web4.effect)(() => (0, import_web3.className)(_el$3, classes.radioButtonInner));
          return _el$3;
        })();
      })());
      (0, import_web6.insert)(_el$, (0, import_web5.createComponent)(Text, {
        get children() {
          return props.label;
        }
      }), null);
      (0, import_web4.effect)((_p$) => {
        const _v$ = classes.radio + (props.selected ? ` ${classes.selected}` : ""), _v$2 = classes.radioButton;
        _v$ !== _p$._v$ && (0, import_web3.className)(_el$, _p$._v$ = _v$);
        _v$2 !== _p$._v$2 && (0, import_web3.className)(_el$2, _p$._v$2 = _v$2);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0
      });
      return _el$;
    })();
  };
  (0, import_web2.delegateEvents)(["click"]);

  // components/RadioGroup.tsx
  var _tmpl$3 = /* @__PURE__ */ (0, import_web8.template)(`<div></div>`, 2);
  var {
    ui: {
      injectCss: injectCss2
    }
  } = shelter;
  var injectedCss2 = false;
  var RadioGroup = (props) => {
    if (!injectedCss2) {
      injectedCss2 = true;
      injectCss2(css);
    }
    return (() => {
      const _el$ = _tmpl$3.cloneNode(true);
      (0, import_web10.insert)(_el$, () => props.options.map((o) => (0, import_web9.createComponent)(Radio, {
        get ["class"]() {
          return classes.radioGroupItem;
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

  // plugins/platform-spoof/index.tsx
  var _tmpl$4 = /* @__PURE__ */ (0, import_web11.template)(`<br>`, 1);
  var {
    plugin: {
      store
    },
    ui: {
      Header,
      HeaderTags
    }
  } = shelter;
  var chunk = webpackChunk_default();
  var wp = chunk && api_default([void 0, ...chunk]);
  var s = wp.findByProps("getSuperProperties");
  if (!s) {
    throw new Error("Failed to find identification function");
  }
  window.PlatformSpoof = {
    desktop: "Discord Client",
    web: "Chrome",
    mobile: "Android",
    setSpoof: (type) => {
      store.clientType = type;
    }
  };
  after("getSuperProperties", s, (args, response) => {
    var _a, _b;
    return __spreadValues(__spreadValues({}, response), {
      browser: (_b = (_a = window.PlatformSpoof) == null ? void 0 : _a[store.clientType]) != null ? _b : window.PlatformSpoof.desktop
    });
  });
  var settings = () => [(0, import_web13.createComponent)(Header, {
    get tag() {
      return HeaderTags.H1;
    },
    children: "Client Type"
  }), _tmpl$4.cloneNode(true), (0, import_web13.createComponent)(RadioGroup, {
    options: [{
      label: "Desktop Client",
      value: "desktop"
    }, {
      label: "Web",
      value: "web"
    }, {
      label: "Mobile",
      value: "mobile"
    }],
    get selected() {
      var _a;
      return (_a = store.clientType) != null ? _a : "desktop";
    },
    onChange: (v) => store.clientType = v
  })];
  return __toCommonJS(platform_spoof_exports);
})();
