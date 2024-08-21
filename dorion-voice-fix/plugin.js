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

  // plugins/dorion-voice-fix/index.tsx
  var dorion_voice_fix_exports = {};
  __export(dorion_voice_fix_exports, {
    onUnload: () => onUnload
  });
  var {
    flux: {
      stores: {
        MediaEngineStore
      }
    },
    patcher
  } = shelter;
  var unpatches = [
    patcher.instead("isSupported", MediaEngineStore, () => true),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    patcher.instead("supports", MediaEngineStore, (_e) => true)
  ];
  var onUnload = () => {
    unpatches.forEach((unpatch) => unpatch());
  };
  return __toCommonJS(dorion_voice_fix_exports);
})();
