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

  // shltr-res-ns:solid-js/web
  var require_web = __commonJS({
    "shltr-res-ns:solid-js/web"(exports, module) {
      module.exports = shelter.solidWeb;
    }
  });

  // plugins/openasar-dom-optimizer/index.tsx
  var openasar_dom_optimizer_exports = {};
  __export(openasar_dom_optimizer_exports, {
    settings: () => settings
  });
  var import_web = __toESM(require_web(), 1);
  var import_web2 = __toESM(require_web(), 1);
  var _tmpl$ = /* @__PURE__ */ (0, import_web.template)(`<a href="https://github.com/GooseMod/OpenAsar/wiki/DOM-Optimizer">the OpenAsar wiki</a>`, 2);
  var _tmpl$2 = /* @__PURE__ */ (0, import_web.template)(`<br>`, 1);
  var {
    plugin: {
      store
    },
    ui: {
      SwitchItem,
      Text
    }
  } = shelter;
  var _removeChild = Element.prototype.removeChild;
  var _appendChild = Element.prototype.appendChild;
  var optimize = (orig) => function(...args) {
    if (
      // @ts-expect-error womp womp
      typeof args[0].className === "string" && // @ts-expect-error womp womp
      args[0].className.indexOf("activity") !== -1
    )
      return setTimeout(() => orig.apply(this, args), 100);
    return orig.apply(this, args);
  };
  if (store.remove) {
    Element.prototype.removeChild = optimize(Element.prototype.removeChild);
  }
  var settings = () => [(0, import_web2.createComponent)(Text, {
    get children() {
      return ["See ", _tmpl$.cloneNode(true), " for more information on how this works!"];
    }
  }), _tmpl$2.cloneNode(true), _tmpl$2.cloneNode(true), (0, import_web2.createComponent)(SwitchItem, {
    get value() {
      return store.remove;
    },
    onChange: (v) => {
      store.remove = v;
      if (v) {
        Element.prototype.removeChild = optimize(_removeChild);
      } else {
        Element.prototype.removeChild = _removeChild;
      }
    },
    children: "Apply to Element.removeChild"
  })];
  return __toCommonJS(openasar_dom_optimizer_exports);
})();
