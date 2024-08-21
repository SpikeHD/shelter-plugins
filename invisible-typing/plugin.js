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

  // plugins/invisible-typing/index.tsx
  var invisible_typing_exports = {};
  __export(invisible_typing_exports, {
    onUnload: () => onUnload
  });
  var import_web = __toESM(require_web(), 1);
  var import_web2 = __toESM(require_web(), 1);
  var import_web3 = __toESM(require_web(), 1);
  var import_web4 = __toESM(require_web(), 1);
  var import_web5 = __toESM(require_web(), 1);
  var import_web6 = __toESM(require_web(), 1);
  var import_web7 = __toESM(require_web(), 1);

  // plugins/invisible-typing/index.scss
  var css = `._invisContainer_ga1se_1{display:flex;align-items:center;justify-content:center;width:40px;cursor:pointer}._invisContainer_ga1se_1 svg path{fill:var(--interactive-normal) !important}._invisContainer_ga1se_1._notShowing_ga1se_1 svg path{fill:var(--status-danger) !important}._invisContainer_ga1se_1 svg{height:55%;width:100%}`;
  var classes = {
    "invisContainer": "_invisContainer_ga1se_1",
    "notShowing": "_notShowing_ga1se_1"
  };

  // plugins/invisible-typing/index.tsx
  var _tmpl$ = /* @__PURE__ */ (0, import_web.template)(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm16 64h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm80-176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V144zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zM160 336c0-8.8 7.2-16 16-16H400c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V336zM272 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM256 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM368 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM352 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V240zM464 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM448 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V240zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16z"></path></svg>`, 4);
  var _tmpl$2 = /* @__PURE__ */ (0, import_web.template)(`<div id="invis-icon"></div>`, 2);
  var {
    flux: {
      intercept
    },
    plugin: {
      store
    },
    solid: {
      createSignal
    },
    ui: {
      injectCss,
      tooltip
    },
    observeDom
  } = shelter;
  var injectedCss = false;
  if (!injectedCss) {
    injectedCss = true;
    injectCss(css);
  }
  var keyboardSvg = _tmpl$.cloneNode(true);
  var unintercept = intercept((dispatch) => {
    if (dispatch.type === "TYPING_START_LOCAL")
      return store.enabled ? false : null;
  });
  var unobserve = observeDom('[class^="channelTextArea"] [class^="buttons"]', (node) => {
    if (document.querySelector("#invis-icon"))
      return;
    const [enabled, setEnabled] = createSignal(!!store.enabled);
    const toggleEnabled = () => {
      store.enabled = !enabled();
      setEnabled(!enabled());
    };
    const invisIcon = (() => {
      const _el$2 = _tmpl$2.cloneNode(true);
      (0, import_web7.use)(tooltip, _el$2, () => enabled() ? "Currently hiding" : "Currently not hiding");
      _el$2.$$click = toggleEnabled;
      (0, import_web6.insert)(_el$2, keyboardSvg);
      (0, import_web5.effect)((_p$) => {
        const _v$ = classes.invisContainer + (enabled() ? " " + classes.notShowing : ""), _v$2 = node.childElementCount === 0 && {
          display: "none"
        };
        _v$ !== _p$._v$ && (0, import_web4.className)(_el$2, _p$._v$ = _v$);
        _p$._v$2 = (0, import_web3.style)(_el$2, _v$2, _p$._v$2);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0
      });
      return _el$2;
    })();
    node.prepend(invisIcon);
  });
  var onUnload = () => {
    unintercept();
    unobserve();
    const invisIcon = document.querySelector("#invis-icon");
    if (invisIcon)
      invisIcon.remove();
  };
  (0, import_web2.delegateEvents)(["click"]);
  return __toCommonJS(invisible_typing_exports);
})();
