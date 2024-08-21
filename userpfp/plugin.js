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

  // plugins/userpfp/index.tsx
  var userpfp_exports = {};
  __export(userpfp_exports, {
    onLoad: () => onLoad,
    settings: () => settings
  });
  var import_web = __toESM(require_web());

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
    (s) => Object.keys(m).some((k) => k.toLowerCase().includes(s.toLowerCase()))
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
    findByKeyword: (...s) => filterList.push([byKeyword(s), false]),
    findByKeywordAll: (...s) => filterList.push([byKeyword(s), true])
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
      findByCode: (c2) => findByCodeAll(c2)[0]
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

  // plugins/userpfp/index.scss
  var css = `._submit_gzseg_1{margin-bottom:10px;display:inline-block}`;
  var classes = {
    "submit": "_submit_gzseg_1"
  };

  // plugins/userpfp/index.tsx
  var {
    ui: {
      SwitchItem,
      LinkButton,
      injectCss
    },
    plugin: {
      store
    }
  } = shelter;
  var DATA_URL = "https://userpfp.github.io/UserPFP/source/data.json";
  var chunk = webpackChunk_default();
  var wp = chunk && api_default([void 0, ...chunk]);
  var c = wp.findByPropsAll("getUserAvatarURL");
  for (const m of c) {
    after("getUserAvatarURL", m, (args, response) => {
      var _a;
      return store.preferNitro && response.includes("a_") ? response : (_a = window.userpfp.getUrl(args[0])) != null ? _a : response;
    });
  }
  var injectedCss = false;
  if (!injectedCss) {
    injectedCss = true;
    injectCss(css);
  }
  var settings = () => [(0, import_web.createComponent)(LinkButton, {
    href: "https://userpfp.github.io/UserPFP/#how-to-request-a-profile-picture-pfp",
    get ["class"]() {
      return classes.submit;
    },
    children: "Submit your PFP here!"
  }), (0, import_web.createComponent)(SwitchItem, {
    get value() {
      return store.preferNitro;
    },
    onChange: (v) => store.preferNitro = v,
    tooltip: "If the user has Nitro but also has a custom UserPFP, prefer the Nitro one.",
    children: "Prefer Nitro"
  })];
  var onLoad = () => __async(void 0, null, function* () {
    const resp = yield fetch(DATA_URL);
    window.userpfp = yield resp.json();
    window.userpfp.getUrl = (id) => {
      var _a;
      return (_a = window.userpfp.avatars[id]) != null ? _a : null;
    };
  });
  return __toCommonJS(userpfp_exports);
})();
