(function(exports) {

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion

//#region solid-js/web
var require_web = __commonJS({ "solid-js/web"(exports, module) {
	module.exports = shelter.solidWeb;
} });

//#endregion
//#region node_modules/.pnpm/@cumjar+websmack@1.2.0/node_modules/@cumjar/websmack/src/raid/webpackChunk.js
var webpackChunk_default = (key) => {
	key ??= Object.keys(window).find((key$1) => key$1.startsWith("webpackChunk"));
	if (!window[key]) return;
	let wpRequire;
	window[key].push([
		[Symbol()],
		{},
		(e) => {
			wpRequire = e;
		}
	]);
	window[key].pop();
	return [wpRequire.c ?? Object.fromEntries(Object.entries(wpRequire.m).map(([k]) => [k, {
		id: k,
		loaded: true,
		exports: wpRequire(k)
	}])), wpRequire];
};

//#endregion
//#region node_modules/.pnpm/@cumjar+websmack@1.2.0/node_modules/@cumjar/websmack/src/api/filters.js
const byProps = (props) => (m) => props.every((p) => m[p] !== undefined);
const byProtos = (protos) => (m) => m.prototype && protos.every((p) => m.prototype[p] !== undefined);
const byDisplayName = (name, defaultExp = true) => (m) => (defaultExp ? m.displayName : m.default?.displayName) === name;
const byKeyword = (strs) => (m) => strs.every((s) => Object.keys(m).some((k) => k.toLowerCase().includes(s.toLowerCase())));
const byDispNameDeep = (name) => (m) => {
	const regex = new RegExp(`(${name}$)|((\\w+\\()+${name}\\))`);
	if (regex.test(m.displayName)) return true;
	if (typeof m.$$typeof !== "symbol") return;
	if (m.Consumer !== undefined) return;
	if (m.type || m.render) {
		while (typeof m.type === "object" || typeof m.render === "object") m = m.type ?? m.render;
		if (regex.test(m.type?.displayName)) return true;
		if (regex.test(m.render?.displayName)) return true;
	}
};
const isKeyable = (m) => typeof m === "object" || typeof m === "function";
const byNestedProps = (props) => (m) => isKeyable(m) && Object.values(m).some((v) => isKeyable(v) && props.some((p) => v?.[p] !== undefined));
const allByCode = (modules, loaders) => (code) => Object.entries(loaders).filter(([, m]) => m.toString().match(code)).map(([id]) => modules[id]?.exports).filter((m) => m);

//#endregion
//#region node_modules/.pnpm/@cumjar+websmack@1.2.0/node_modules/@cumjar/websmack/src/api/batch.js
const batchFilter = (modules, filterList) => {
	const found = [];
	const checkModule = (mod) => filterList.forEach(([filter$1, multi], i) => {
		if (multi && !found[i]) found[i] = [];
		if (filter$1(mod)) {
			if (multi) found[i].push(mod);
else if (!found[i]) found[i] = mod;
		}
	});
	for (const mid in modules) {
		const module$1 = modules[mid].exports;
		if (!module$1 || module$1 === window) continue;
		if (module$1.default && module$1.__esModule) checkModule(module$1.default);
		checkModule(module$1);
	}
	return found;
};
const makeFakeWp = (filterList) => ({
	find: (f) => filterList.push([f, false]),
	findAll: (f) => filterList.push([f, true]),
	findByProps: (...p) => filterList.push([byProps(p), false]),
	findByPropsAll: (...p) => filterList.push([byProps(p), true]),
	findByPrototypes: (...p) => filterList.push([byProtos(p), false]),
	findByPrototypesAll: (...p) => filterList.push([byProtos(p), true]),
	findByNestedProps: (...p) => filterList.push([byNestedProps(p), false]),
	findByNestedPropsAll: (...p) => filterList.push([byNestedProps(p), true]),
	findByDisplayName: (n, d) => filterList.push([byDisplayName(n, d), false]),
	findByDisplayNameAll: (n, d) => filterList.push([byDisplayName(n, d), true]),
	findByDispNameDeep: (n) => filterList.push([byDispNameDeep(n), false]),
	findByDispNameDeepAll: (n) => filterList.push([byDispNameDeep(n), true]),
	findByKeyword: (...s) => filterList.push([byKeyword(s), false]),
	findByKeywordAll: (...s) => filterList.push([byKeyword(s), true])
});
var batch_default = (mods) => (cb) => {
	const fList = [];
	const fakeWp = makeFakeWp(fList);
	cb(fakeWp);
	return batchFilter(mods, fList);
};

//#endregion
//#region node_modules/.pnpm/@cumjar+websmack@1.2.0/node_modules/@cumjar/websmack/src/api/index.js
const filter = (modules, single = true) => (filterFunc) => {
	const found = [];
	for (const mid in modules) {
		const module$1 = modules[mid].exports;
		if (!module$1 || module$1 === window) continue;
		if (module$1.default && module$1.__esModule && filterFunc(module$1.default)) {
			if (single) return module$1.default;
			found.push(module$1.default);
		}
		if (filterFunc(module$1)) {
			if (single) return module$1;
			found.push(module$1);
		}
	}
	if (!single) return found;
};
var api_default = ([, modules, wpR]) => {
	const find = filter(modules);
	const findAll = filter(modules, false);
	const findByCodeAll = wpR ? allByCode(modules, wpR.m) : () => {
		throw new Error("findByCode does not work with this bundler");
	};
	return {
		batchFind: batch_default(modules),
		find,
		findAll,
		findByProps: (...p) => find(byProps(p)),
		findByPropsAll: (...p) => findAll(byProps(p)),
		findByPrototypes: (...p) => find(byProtos(p)),
		findByPrototypesAll: (...p) => findAll(byProtos(p)),
		findByNestedProps: (...p) => find(byNestedProps(p)),
		findByNestedPropsAll: (...p) => findAll(byNestedProps(p)),
		findByDisplayName: (d, p) => find(byDisplayName(d, p)),
		findByDisplayNameAll: (d, p) => findAll(byDisplayName(d, p)),
		findByDispNameDeep: (d) => find(byDispNameDeep(d)),
		findByDispNameDeepAll: (d) => findAll(byDispNameDeep(d)),
		findByKeyword: (...k) => find(byKeyword(k)),
		findByKeywordAll: (...k) => findAll(byKeyword(k)),
		findByCodeAll,
		findByCode: (c$1) => findByCodeAll(c$1)[0]
	};
};

//#endregion
//#region node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/shared.js
const patchTypes = [
	"a",
	"b",
	"i"
];
const patchedObjects = new Map();

//#endregion
//#region node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/hook.js
function hook_default(funcName, funcParent, funcArgs, ctxt, isConstruct) {
	const patch = patchedObjects.get(funcParent)?.[funcName];
	if (!patch) return isConstruct ? Reflect.construct(funcParent[funcName], funcArgs, ctxt) : funcParent[funcName].apply(ctxt, funcArgs);
	for (const hook of patch.b.values()) {
		const maybefuncArgs = hook.call(ctxt, funcArgs);
		if (Array.isArray(maybefuncArgs)) funcArgs = maybefuncArgs;
	}
	let workingRetVal = [...patch.i.values()].reduce(
		(prev, current) => (...args) => current.call(ctxt, args, prev),
		// This calls the original function
		(...args) => isConstruct ? Reflect.construct(patch.o, args, ctxt) : patch.o.apply(ctxt, args)
)(...funcArgs);
	for (const hook of patch.a.values()) workingRetVal = hook.call(ctxt, funcArgs, workingRetVal) ?? workingRetVal;
	return workingRetVal;
}

//#endregion
//#region node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/unpatch.js
function unpatch(funcParent, funcName, hookId, type) {
	const patchedObject = patchedObjects.get(funcParent);
	const patch = patchedObject?.[funcName];
	if (!patch?.[type].has(hookId)) return false;
	patch[type].delete(hookId);
	if (patchTypes.every((t) => patch[t].size === 0)) {
		const success = Reflect.defineProperty(funcParent, funcName, {
			value: patch.o,
			writable: true,
			configurable: true
		});
		if (!success) funcParent[funcName] = patch.o;
		delete patchedObject[funcName];
	}
	if (Object.keys(patchedObject).length == 0) patchedObjects.delete(funcParent);
	return true;
}

//#endregion
//#region node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/getPatchFunc.js
var getPatchFunc_default = (patchType) => (funcName, funcParent, callback, oneTime = false) => {
	if (typeof funcParent[funcName] !== "function") throw new Error(`${funcName} is not a function in ${funcParent.constructor.name}`);
	if (!patchedObjects.has(funcParent)) patchedObjects.set(funcParent, Object.create(null));
	const parentInjections = patchedObjects.get(funcParent);
	if (!parentInjections[funcName]) {
		const origFunc = funcParent[funcName];
		parentInjections[funcName] = {
			o: origFunc,
			b: new Map(),
			i: new Map(),
			a: new Map()
		};
		const runHook = (ctxt, args, construct) => {
			const ret = hook_default(funcName, funcParent, args, ctxt, construct);
			if (oneTime) unpatchThisPatch();
			return ret;
		};
		const replaceProxy = new Proxy(origFunc, {
			apply: (_, ctxt, args) => runHook(ctxt, args, false),
			construct: (_, args) => runHook(origFunc, args, true),
			get: (target, prop, receiver) => prop == "toString" ? origFunc.toString.bind(origFunc) : Reflect.get(target, prop, receiver)
		});
		const success = Reflect.defineProperty(funcParent, funcName, {
			value: replaceProxy,
			configurable: true,
			writable: true
		});
		if (!success) funcParent[funcName] = replaceProxy;
	}
	const hookId = Symbol();
	const unpatchThisPatch = () => unpatch(funcParent, funcName, hookId, patchType);
	parentInjections[funcName][patchType].set(hookId, callback);
	return unpatchThisPatch;
};

//#endregion
//#region node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/index.js
const before = getPatchFunc_default("b");
const instead = getPatchFunc_default("i");
const after = getPatchFunc_default("a");

//#endregion
//#region plugins/userpfp/index.scss
const classes = { "submit": "eTp9Lq_submit" };
const css = `.eTp9Lq_submit {
  margin-bottom: 10px;
  display: inline-block;
}
`;

//#endregion
//#region plugins/userpfp/index.tsx
var import_web = __toESM(require_web());
const { ui: { SwitchItem, LinkButton, injectCss }, plugin: { store } } = shelter;
const DATA_URL = "https://userpfp.github.io/UserPFP/source/data.json";
const chunk = webpackChunk_default();
const wp = chunk && api_default([undefined, ...chunk]);
const c = wp.findByPropsAll("getUserAvatarURL");
for (const m of c) after("getUserAvatarURL", m, (args, response) => {
	return store.preferNitro && response.includes("a_") ? response : window.userpfp.getUrl(args[0]) ?? response;
});
let injectedCss = false;
if (!injectedCss) {
	injectedCss = true;
	injectCss(css);
}
const settings = () => [(0, import_web.createComponent)(LinkButton, {
	href: "https://userpfp.github.io/UserPFP/#how-to-request-a-profile-picture-pfp",
	get ["class"]() {
		return classes.submit;
	},
	children: "Submit your PFP here!"
}), (0, import_web.createComponent)(SwitchItem, {
	get value() {
		return store.preferNitro;
	},
	onChange: (v) => store.preferNitro = v,
	tooltip: "If the user has Nitro but also has a custom UserPFP, prefer the Nitro one.",
	children: "Prefer Nitro"
})];
const onLoad = async () => {
	const resp = await fetch(DATA_URL);
	window.userpfp = await resp.json();
	window.userpfp.getUrl = (id) => window.userpfp.avatars[id] ?? null;
};

//#endregion
exports.onLoad = onLoad
exports.settings = settings
return exports;
})({});