(function(exports) {

"use strict";

//#region plugins/always-trust/index.ts
const { flux: { stores: { MaskedLinkStore } }, patcher } = shelter;
const unpatch = patcher.instead("isTrustedDomain", MaskedLinkStore, () => true, false);
const onUnload = () => {
	unpatch();
};

//#endregion
exports.onUnload = onUnload
return exports;
})({});