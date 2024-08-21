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

  // plugins/blur-nsfw/index.ts
  var blur_nsfw_exports = {};
  __export(blur_nsfw_exports, {
    onUnload: () => onUnload
  });
  var {
    flux: {
      dispatcher,
      stores: {
        ChannelStore
      }
    }
  } = shelter;
  var injectedCss = false;
  var tempStyle = null;
  var handleNsfwChannelSelect = (payload) => __async(void 0, null, function* () {
    const { channelId } = payload;
    const channel = ChannelStore == null ? void 0 : ChannelStore.getChannel(channelId);
    if (!channel.nsfw_) {
      if (tempStyle) {
        tempStyle.remove();
        injectedCss = false;
      }
      return;
    }
    if (injectedCss)
      return;
    const style = document.createElement("style");
    style.innerText = `
    div[class*="imageWrapper_"] video,
    div[class*="imageWrapper_"] img {
      filter: blur(10px) !important;

      transition: filter 0.5s ease;
    }

    /* On hover, show the image */
    div[class*="imageWrapper_"]:hover video,
    div[class*="imageWrapper_"]:hover img {
      filter: blur(0) !important;
    }

    /* If the user clicked it, the don't need it blurred anymore */
    div[class*="focusLock_"] video,
    div[class*="focusLock_"] img {
      filter: blur(0) !important;
    }
  `;
    tempStyle = document.body.appendChild(style);
  });
  dispatcher.subscribe("CHANNEL_SELECT", handleNsfwChannelSelect);
  var onUnload = () => {
    dispatcher.unsubscribe("CHANNEL_SELECT", handleNsfwChannelSelect);
    if (tempStyle) {
      tempStyle.remove();
      injectedCss = false;
    }
  };
  return __toCommonJS(blur_nsfw_exports);
})();
