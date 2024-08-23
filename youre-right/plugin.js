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

  // plugins/youre-right/index.tsx
  var youre_right_exports = {};
  __export(youre_right_exports, {
    onUnload: () => onUnload
  });

  // plugins/youre-right/index.tsx.scss
  var css = `._youreRightItem_4o6rk_1{transform:scaleX(-1)}._youreRightItem_4o6rk_1 video,._youreRightItem_4o6rk_1 h3,._youreRightItem_4o6rk_1 [id^=message-content-],._youreRightItem_4o6rk_1 [id^=username]{transform:scaleX(-1);text-align:right;margin:0}._youreRightItem_4o6rk_1 video{transform:scaleX(1)}._youreRightItem_4o6rk_1 img{text-align:right;margin:0}._youreRightItem_4o6rk_1 code{text-align:left}._youreRightItem_4o6rk_1 img[class^=emoji]{transform:scaleX(1) !important}._youreRightItem_4o6rk_1 span[class^=repliedTextPlaceholder]{transform:scaleX(-1)}._youreRightItem_4o6rk_1 [id^=message-content-]{max-width:60%;text-align:right}._youreRightItem_4o6rk_1 [class^=nonVisualMediaItemContainer],._youreRightItem_4o6rk_1 [class^=imageWrapper],._youreRightItem_4o6rk_1 [class^=avatar],._youreRightItem_4o6rk_1 [class^=embedWrapper],._youreRightItem_4o6rk_1 [class^=reaction_],._youreRightItem_4o6rk_1 [class^=buttonsInner]{transform:scaleX(-1)}._youreRightItem_4o6rk_1 [class*=timestampVisible]{transform:scaleX(-1);text-align:left !important}._youreRightItem_4o6rk_1 [id^=message-reply-context-]{justify-content:flex-start}._youreRightItem_4o6rk_1 [id^=message-reply-context-] [class^=username]{transform:scaleX(-1)}._youreRightItem_4o6rk_1 img:active{transform:scaleX(-1) translateY(-1px)}._youreRightItem_4o6rk_1 [role^=textbox]{transform:scaleX(-1);text-align:right}`;
  var classes = {
    "youreRightItem": "_youreRightItem_4o6rk_1"
  };

  // plugins/youre-right/index.tsx
  var {
    flux: {
      storesFlat: {
        UserStore,
        SelectedChannelStore
      }
    },
    util: {
      getFiber,
      reactFiberWalker
    },
    plugin: {
      scoped: {
        flux: {
          subscribe
        }
      }
    },
    observeDom
  } = shelter;
  var style = document.createElement("style");
  style.innerHTML = css;
  style.id = "youre-right-styles";
  document.head.appendChild(style);
  function handleElm(elm) {
    var _a, _b;
    const message = (_b = (_a = reactFiberWalker(getFiber(elm), "message", true)) == null ? void 0 : _a.pendingProps) == null ? void 0 : _b.message;
    const id = UserStore.getCurrentUser().id;
    if (!message || message.author.id !== id || elm.classList.contains(classes.youreRightItem))
      return;
    elm.classList.add(classes.youreRightItem);
  }
  function handleDispatch(payload) {
    if (payload.type === "MESSAGE_CREATE" && payload.channelId !== SelectedChannelStore.getChannelId())
      return;
    const unObserve = observeDom("li[id^=chat-messages-]", (elem) => {
      handleElm(elem);
      unObserve();
    });
    setTimeout(unObserve, 500);
  }
  var triggers = ["MESSAGE_CREATE", "CHANNEL_SELECT", "LOAD_MESSAGES_SUCCESS", "UPDATE_CHANNEL_DIMENSIONS"];
  for (const t of triggers)
    subscribe(t, handleDispatch);
  var onUnload = () => {
    style.remove();
    for (const t of triggers)
      subscribe(t, handleDispatch);
  };
  return __toCommonJS(youre_right_exports);
})();
