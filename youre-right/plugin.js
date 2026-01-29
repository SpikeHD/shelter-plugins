(function(exports) {

"use strict";

//#region plugins/youre-right/index.tsx.scss
const classes = { "youreRightItem": "CPnQ-q_youreRightItem" };
const css = `.CPnQ-q_youreRightItem {
  flex-direction: row-reverse;
  justify-content: flex-start;
  width: 100%;
  display: flex;
  --content-padding-right: 3.25rem !important;
  --content-padding-left: 4rem !important;
  padding-left: auto !important;
}

.CPnQ-q_youreRightItem [id^="message-content-"] {
  text-align: right;
}

.CPnQ-q_youreRightItem [class^="message__"] {
  width: calc(100% - (var(--content-padding-right)  + var(--content-padding-left))) !important;
  padding-right: var(--content-padding-right) !important;
  padding-left: var(--content-padding-left) !important;
}

.CPnQ-q_youreRightItem [id^="message-accessories"] {
  float: right;
}

.CPnQ-q_youreRightItem [id^="message-reply-context"] {
  justify-content: flex-end;
}

.CPnQ-q_youreRightItem [class^="repliedMessageClickableSpine"] {
  right: -2.25rem;
  left: unset;
  width: 1.75rem;
  transform: scaleX(-1);
}

.CPnQ-q_youreRightItem [aria-labelledby^="message-reply-"] [class^="contents"], .CPnQ-q_youreRightItem [aria-labelledby^="message-username-"] [class^="contents"] {
  flex-direction: column;
  display: flex;
}

.CPnQ-q_youreRightItem [aria-labelledby^="message-reply-"] [class^="contents"] h3, .CPnQ-q_youreRightItem [aria-labelledby^="message-username-"] [class^="contents"] h3 {
  margin-left: auto;
  display: flex;
}

.CPnQ-q_youreRightItem [aria-labelledby^="message-reply-"] img[class^="avatar"], .CPnQ-q_youreRightItem [aria-labelledby^="message-username-"] img[class^="avatar"] {
  right: 0;
  left: unset;
  position: absolute;
}

.CPnQ-q_youreRightItem [aria-labelledby^="message-reply-"] h3, .CPnQ-q_youreRightItem [aria-labelledby^="message-username-"] h3 {
  float: right;
}
`;

//#endregion
//#region plugins/youre-right/index.tsx
const { flux: { storesFlat: { UserStore, SelectedChannelStore } }, util: { getFiber, reactFiberWalker }, plugin: { scoped: { flux: { subscribe } } }, observeDom } = shelter;
const style = document.createElement("style");
style.innerHTML = css;
style.id = "youre-right-styles";
document.head.appendChild(style);
function handleElm(elm) {
	const message = reactFiberWalker(getFiber(elm), "message", true)?.pendingProps?.message;
	const id = UserStore.getCurrentUser().id;
	if (!message || message.author.id !== id || elm.classList.contains(classes.youreRightItem)) return;
	elm.classList.add(classes.youreRightItem);
}
function handleDispatch(payload) {
	if (payload.type === "MESSAGE_CREATE" && payload.channelId !== SelectedChannelStore.getChannelId()) return;
	const unObserve = observeDom("li[id^=chat-messages-]", (elem) => {
		handleElm(elem);
		unObserve();
	});
	setTimeout(unObserve, 500);
}
const triggers = [
	"MESSAGE_CREATE",
	"CHANNEL_SELECT",
	"LOAD_MESSAGES_SUCCESS",
	"UPDATE_CHANNEL_DIMENSIONS"
];
for (const t of triggers) subscribe(t, handleDispatch);
const onUnload = () => {
	style.remove();
	for (const t of triggers) subscribe(t, handleDispatch);
};

//#endregion
exports.onUnload = onUnload
return exports;
})({});