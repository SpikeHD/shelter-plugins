(function(exports) {

"use strict";

//#region plugins/disable-f1/index.ts
const disableF1 = (e) => {
	if (e.key === "F1") {
		e.preventDefault();
		e.stopImmediatePropagation();
	}
};
const onLoad = () => {
	document.addEventListener("keydown", disableF1);
};
const onUnload = () => {
	document.removeEventListener("keydown", disableF1);
};

//#endregion
exports.onLoad = onLoad
exports.onUnload = onUnload
return exports;
})({});