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
const byKeyword = (strs) => (m) => strs.every((s$1) => Object.keys(m).some((k) => k.toLowerCase().includes(s$1.toLowerCase())));
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
	findByKeyword: (...s$1) => filterList.push([byKeyword(s$1), false]),
	findByKeywordAll: (...s$1) => filterList.push([byKeyword(s$1), true])
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
		findByCode: (c) => findByCodeAll(c)[0]
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
//#region components/Radio.tsx.scss
const classes = {
	"radio": "Ch7osa_radio",
	"selected": "Ch7osa_selected",
	"radioButton": "Ch7osa_radioButton",
	"radioButtonInner": "Ch7osa_radioButtonInner"
};
const css = `.Ch7osa_radio {
  color: var(--interactive-normal);
  box-sizing: border-box;
  grid-gap: 8px;
  cursor: pointer;
  background: none;
  border-radius: 4px;
  grid-template-columns: auto 1fr;
  align-items: center;
  padding: 8px;
  display: grid;
}

.Ch7osa_radio:not(:last-child) {
  margin-bottom: 8px;
}

.Ch7osa_radio .Ch7osa_radioButton {
  border: 2px solid var(--checkbox-border-default);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  margin: 4px;
  position: relative;
}

.Ch7osa_radio .Ch7osa_radioButton .Ch7osa_radioButtonInner {
  background: var(--interactive-normal);
  border-radius: 50%;
  width: 14px;
  height: 14px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.Ch7osa_radio:hover {
  background-color: var(--background-mod-subtle);
}

.Ch7osa_radio.Ch7osa_selected {
  color: var(--interactive-active);
  background-color: var(--background-mod-subtle);
}

.Ch7osa_radio.Ch7osa_selected .Ch7osa_radioButton {
  background-color: var(--background-brand);
}

.Ch7osa_radio.Ch7osa_selected .Ch7osa_radioButton .Ch7osa_radioButtonInner {
  background: #fff;
}
`;

//#endregion
//#region components/Radio.tsx
var import_web$7 = __toESM(require_web(), 1);
var import_web$8 = __toESM(require_web(), 1);
var import_web$9 = __toESM(require_web(), 1);
var import_web$10 = __toESM(require_web(), 1);
var import_web$11 = __toESM(require_web(), 1);
var import_web$12 = __toESM(require_web(), 1);
var import_web$13 = __toESM(require_web(), 1);
var import_web$14 = __toESM(require_web(), 1);
var import_web$15 = __toESM(require_web(), 1);
var import_web$16 = __toESM(require_web(), 1);
const _tmpl$$2 = /*#__PURE__*/ (0, import_web$7.template)(`<div><div></div><!#><!/></div>`, 6), _tmpl$2 = /*#__PURE__*/ (0, import_web$7.template)(`<div></div>`, 2);
const { ui: { injectCss: injectCss$1, Text } } = shelter;
let injectedCss$1 = false;
const Radio = (props) => {
	if (!injectedCss$1) {
		injectedCss$1 = true;
		injectCss$1(css);
	}
	const onRadioClick = () => {
		props.onClick(props.value);
	};
	return (() => {
		const _el$ = (0, import_web$11.getNextElement)(_tmpl$$2), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, [_el$4, _co$] = (0, import_web$13.getNextMarker)(_el$3.nextSibling);
		_el$.$$click = onRadioClick;
		(0, import_web$15.insert)(_el$2, (() => {
			const _c$ = (0, import_web$16.memo)(() => !!props.selected);
			return () => _c$() && (() => {
				const _el$5 = (0, import_web$11.getNextElement)(_tmpl$2);
				(0, import_web$10.effect)(() => (0, import_web$9.className)(_el$5, classes.radioButtonInner));
				return _el$5;
			})();
		})());
		(0, import_web$15.insert)(_el$, (0, import_web$14.createComponent)(Text, { get children() {
			return props.label;
		} }), _el$4, _co$);
		(0, import_web$10.effect)((_p$) => {
			const _v$ = classes.radio + (props.selected ? ` ${classes.selected}` : ""), _v$2 = classes.radioButton;
			_v$ !== _p$._v$ && (0, import_web$9.className)(_el$, _p$._v$ = _v$);
			_v$2 !== _p$._v$2 && (0, import_web$9.className)(_el$2, _p$._v$2 = _v$2);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined
		});
		(0, import_web$12.runHydrationEvents)();
		return _el$;
	})();
};
(0, import_web$8.delegateEvents)(["click"]);

//#endregion
//#region components/RadioGroup.tsx
var import_web$3 = __toESM(require_web(), 1);
var import_web$4 = __toESM(require_web(), 1);
var import_web$5 = __toESM(require_web(), 1);
var import_web$6 = __toESM(require_web(), 1);
const _tmpl$$1 = /*#__PURE__*/ (0, import_web$3.template)(`<div></div>`, 2);
const { ui: { injectCss } } = shelter;
let injectedCss = false;
const RadioGroup = (props) => {
	if (!injectedCss) {
		injectedCss = true;
		injectCss(css);
	}
	return (() => {
		const _el$ = (0, import_web$5.getNextElement)(_tmpl$$1);
		(0, import_web$6.insert)(_el$, () => props.options.map((o) => (0, import_web$4.createComponent)(Radio, {
			get ["class"]() {
				return classes.radioGroupItem;
			},
			get label() {
				return o.label;
			},
			get value() {
				return o.value;
			},
			get onClick() {
				return props.onChange;
			},
			get selected() {
				return props.selected === o.value;
			}
		})));
		return _el$;
	})();
};

//#endregion
//#region plugins/platform-spoof/index.tsx
var import_web = __toESM(require_web());
var import_web$1 = __toESM(require_web());
var import_web$2 = __toESM(require_web());
const _tmpl$ = /*#__PURE__*/ (0, import_web.template)(`<br>`, 1);
const { plugin: { store }, ui: { Header, HeaderTags } } = shelter;
const chunk = webpackChunk_default();
const wp = chunk && api_default([undefined, ...chunk]);
const s = wp.findByProps("getSuperProperties");
if (!s) throw new Error("Failed to find identification function");
window.PlatformSpoof = {
	desktop: "Discord Client",
	web: "Chrome",
	mobile: "Android",
	setSpoof: (type) => {
		store.clientType = type;
	}
};
after("getSuperProperties", s, (args, response) => {
	return {
		...response,
		...{ browser: window.PlatformSpoof?.[store.clientType] ?? window.PlatformSpoof.desktop }
	};
});
const settings = () => [
	(0, import_web$2.createComponent)(Header, {
		get tag() {
			return HeaderTags.H1;
		},
		children: "Client Type"
	}),
	(0, import_web$1.getNextElement)(_tmpl$),
	(0, import_web$2.createComponent)(RadioGroup, {
		options: [
			{
				label: "Desktop Client",
				value: "desktop"
			},
			{
				label: "Web",
				value: "web"
			},
			{
				label: "Mobile",
				value: "mobile"
			}
		],
		get selected() {
			return store.clientType ?? "desktop";
		},
		onChange: (v) => store.clientType = v
	})
];

//#endregion
exports.settings = settings
return exports;
})({});