(function(exports) {

"use strict";

//#region plugins/dorion-voice-fix/index.tsx
const { flux: { stores: { MediaEngineStore } }, patcher } = shelter;
const unpatches = [patcher.instead("isSupported", MediaEngineStore, () => true), patcher.instead("supports", MediaEngineStore, (_e) => true)];
const onUnload = () => {
	unpatches.forEach((unpatch) => unpatch());
};

//#endregion
exports.onUnload = onUnload
return exports;
})({});