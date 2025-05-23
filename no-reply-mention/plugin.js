(function(exports) {

"use strict";

//#region plugins/no-reply-mention/index.ts
const { flux: { intercept } } = shelter;
const unintercept = intercept((dispatch) => {
	if (dispatch.type !== "CREATE_PENDING_REPLY") return;
	dispatch.shouldMention = false;
});
const onUnload = () => {
	unintercept();
};

//#endregion
exports.onUnload = onUnload
return exports;
})({});