(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

  // plugins/platform-spoof/index.tsx
  var {
    plugin: {
      store
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
})();
