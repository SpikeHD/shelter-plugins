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

  // plugins/no-reply-mention/index.ts
  var no_reply_mention_exports = {};
  __export(no_reply_mention_exports, {
    onUnload: () => onUnload
  });
  var {
    flux: {
      intercept
    }
  } = shelter;
  var unintercept = intercept((dispatch) => {
    if (dispatch.type !== "CREATE_PENDING_REPLY")
      return;
    dispatch.shouldMention = false;
  });
  var onUnload = () => {
    unintercept();
  };
  return __toCommonJS(no_reply_mention_exports);
})();
