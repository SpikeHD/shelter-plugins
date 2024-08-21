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

  // plugins/clean-home/index.tsx
  var clean_home_exports = {};
  __export(clean_home_exports, {
    onUnload: () => onUnload,
    settings: () => settings
  });
  var import_web = __toESM(require_web(), 1);
  var import_web2 = __toESM(require_web(), 1);
  var {
    plugin: {
      store
    },
    ui: {
      SwitchItem
    }
  } = shelter;
  var components = [{
    name: "Active Now section",
    description: 'Removes the "Active Now" section from the home page',
    rules: `
      div[class*="nowPlayingColumn"] { display: none; }
    `
  }, {
    name: "Nitro tab",
    description: 'Removes the "Nitro" tab from the home page',
    rules: `
      a[href="/store"] { display: none; }
    `
  }, {
    name: "Store tab",
    description: 'Removes the "Store" tab from the home page',
    rules: `
      a[href="/shop"] { display: none; }
    `
  }, {
    name: "Apps button",
    description: "Removes the Apps button from the text area",
    rules: `
      div[class*="channelAppLauncher"] { display: none; }
    `
  }];
  var style = document.createElement("style");
  style.id = "clean-home-style";
  var styleElm = document.body.appendChild(style);
  var setStyle = () => {
    styleElm.textContent = components.filter((c) => store[c.name]).map((c) => c.rules).join(" ");
  };
  setStyle();
  var settings = () => {
    return components.map((c) => {
      return (0, import_web.createComponent)(SwitchItem, {
        get value() {
          return !!store[c.name];
        },
        onChange: (value) => {
          store[c.name] = value;
          setStyle();
        },
        get note() {
          return c.description;
        },
        get children() {
          return ["Remove ", (0, import_web2.memo)(() => c.name)];
        }
      });
    });
  };
  var onUnload = () => {
    styleElm.remove();
  };
  return __toCommonJS(clean_home_exports);
})();
