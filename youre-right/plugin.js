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
  var classes = { "youreRightItem": "CPnQ-q_youreRightItem" };
  var css = `.CPnQ-q_youreRightItem {
  transform: scaleX(-1);
}

.CPnQ-q_youreRightItem video, .CPnQ-q_youreRightItem h3, .CPnQ-q_youreRightItem [id^="message-content-"], .CPnQ-q_youreRightItem [id^="username"] {
  text-align: right;
  margin: 0;
  transform: scaleX(-1);
}

.CPnQ-q_youreRightItem video {
  transform: scaleX(1);
}

.CPnQ-q_youreRightItem img {
  text-align: right;
  margin: 0;
}

.CPnQ-q_youreRightItem code {
  text-align: left;
}

.CPnQ-q_youreRightItem img[class^="emoji"] {
  transform: scaleX(1) !important;
}

.CPnQ-q_youreRightItem span[class^="repliedTextPlaceholder"] {
  transform: scaleX(-1);
}

.CPnQ-q_youreRightItem [id^="message-content-"] {
  text-align: right;
  max-width: 60%;
}

.CPnQ-q_youreRightItem [class^="nonVisualMediaItemContainer"], .CPnQ-q_youreRightItem [class^="imageWrapper"], .CPnQ-q_youreRightItem [class^="avatar"], .CPnQ-q_youreRightItem [class^="embedWrapper"], .CPnQ-q_youreRightItem [class^="reaction_"], .CPnQ-q_youreRightItem [class^="buttonsInner"] {
  transform: scaleX(-1);
}

.CPnQ-q_youreRightItem [class*="timestampVisible"] {
  transform: scaleX(-1);
  text-align: left !important;
}

.CPnQ-q_youreRightItem [id^="message-reply-context-"] {
  justify-content: flex-start;
}

.CPnQ-q_youreRightItem [id^="message-reply-context-"] [class^="username"] {
  transform: scaleX(-1);
}

.CPnQ-q_youreRightItem img:active {
  transform: scaleX(-1)translateY(-1px);
}

.CPnQ-q_youreRightItem [role^="textbox"] {
  text-align: right;
  transform: scaleX(-1);
}
`;

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
