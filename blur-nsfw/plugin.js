(function(exports) {

"use strict";

//#region plugins/blur-nsfw/index.ts
const { flux: { dispatcher, stores: { ChannelStore } } } = shelter;
let injectedCss = false;
let tempStyle = null;
const handleNsfwChannelSelect = async (payload) => {
	const { channelId } = payload;
	const channel = ChannelStore?.getChannel(channelId);
	if (!channel.nsfw_) {
		if (tempStyle) {
			tempStyle.remove();
			injectedCss = false;
		}
		return;
	}
	if (injectedCss) return;
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
};
dispatcher.subscribe("CHANNEL_SELECT", handleNsfwChannelSelect);
const onUnload = () => {
	dispatcher.unsubscribe("CHANNEL_SELECT", handleNsfwChannelSelect);
	if (tempStyle) {
		tempStyle.remove();
		injectedCss = false;
	}
};

//#endregion
exports.onUnload = onUnload
return exports;
})({});