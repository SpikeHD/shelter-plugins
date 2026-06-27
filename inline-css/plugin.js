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
//#region node_modules/.pnpm/@monaco-editor+loader@1.7.0/node_modules/@monaco-editor/loader/lib/es/_virtual/_rollupPluginBabelHelpers.js
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _arrayWithHoles(r) {
	if (Array.isArray(r)) return r;
}
function _defineProperty$1(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: true,
		configurable: true,
		writable: true
	}) : e[r] = t, e;
}
function _iterableToArrayLimit(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = true, o = false;
		try {
			if (i = (t = t.call(r)).next, 0 === l);
else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r$1) {
			o = true, n = r$1;
		} finally {
			try {
				if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), true).forEach(function(r$1) {
			_defineProperty$1(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function _slicedToArray(r, e) {
	return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r);
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	}
}

//#endregion
//#region node_modules/.pnpm/state-local@1.0.7/node_modules/state-local/lib/es/state-local.js
function _defineProperty(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
else obj[key] = value;
	return obj;
}
function ownKeys(object, enumerableOnly) {
	var keys = Object.keys(object);
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object);
		if (enumerableOnly) symbols = symbols.filter(function(sym) {
			return Object.getOwnPropertyDescriptor(object, sym).enumerable;
		});
		keys.push.apply(keys, symbols);
	}
	return keys;
}
function _objectSpread2(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i] != null ? arguments[i] : {};
		if (i % 2) ownKeys(Object(source), true).forEach(function(key) {
			_defineProperty(target, key, source[key]);
		});
else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
else ownKeys(Object(source)).forEach(function(key) {
			Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
		});
	}
	return target;
}
function compose$1() {
	for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) fns[_key] = arguments[_key];
	return function(x) {
		return fns.reduceRight(function(y, f) {
			return f(y);
		}, x);
	};
}
function curry$1(fn) {
	return function curried() {
		var _this = this;
		for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
		return args.length >= fn.length ? fn.apply(this, args) : function() {
			for (var _len3 = arguments.length, nextArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) nextArgs[_key3] = arguments[_key3];
			return curried.apply(_this, [].concat(args, nextArgs));
		};
	};
}
function isObject$1(value) {
	return {}.toString.call(value).includes("Object");
}
function isEmpty(obj) {
	return !Object.keys(obj).length;
}
function isFunction(value) {
	return typeof value === "function";
}
function hasOwnProperty(object, property) {
	return Object.prototype.hasOwnProperty.call(object, property);
}
function validateChanges(initial, changes) {
	if (!isObject$1(changes)) errorHandler$1("changeType");
	if (Object.keys(changes).some(function(field) {
		return !hasOwnProperty(initial, field);
	})) errorHandler$1("changeField");
	return changes;
}
function validateSelector(selector) {
	if (!isFunction(selector)) errorHandler$1("selectorType");
}
function validateHandler(handler) {
	if (!(isFunction(handler) || isObject$1(handler))) errorHandler$1("handlerType");
	if (isObject$1(handler) && Object.values(handler).some(function(_handler) {
		return !isFunction(_handler);
	})) errorHandler$1("handlersType");
}
function validateInitial(initial) {
	if (!initial) errorHandler$1("initialIsRequired");
	if (!isObject$1(initial)) errorHandler$1("initialType");
	if (isEmpty(initial)) errorHandler$1("initialContent");
}
function throwError$1(errorMessages$2, type) {
	throw new Error(errorMessages$2[type] || errorMessages$2["default"]);
}
var errorMessages$1 = {
	initialIsRequired: "initial state is required",
	initialType: "initial state should be an object",
	initialContent: "initial state shouldn't be an empty object",
	handlerType: "handler should be an object or a function",
	handlersType: "all handlers should be a functions",
	selectorType: "selector should be a function",
	changeType: "provided value of changes should be an object",
	changeField: "it seams you want to change a field in the state which is not specified in the \"initial\" state",
	"default": "an unknown error accured in `state-local` package"
};
var errorHandler$1 = curry$1(throwError$1)(errorMessages$1);
var validators$1 = {
	changes: validateChanges,
	selector: validateSelector,
	handler: validateHandler,
	initial: validateInitial
};
function create(initial) {
	var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	validators$1.initial(initial);
	validators$1.handler(handler);
	var state = { current: initial };
	var didUpdate = curry$1(didStateUpdate)(state, handler);
	var update = curry$1(updateState)(state);
	var validate = curry$1(validators$1.changes)(initial);
	var getChanges = curry$1(extractChanges)(state);
	function getState$1() {
		var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function(state$1) {
			return state$1;
		};
		validators$1.selector(selector);
		return selector(state.current);
	}
	function setState$1(causedChanges) {
		compose$1(didUpdate, update, validate, getChanges)(causedChanges);
	}
	return [getState$1, setState$1];
}
function extractChanges(state, causedChanges) {
	return isFunction(causedChanges) ? causedChanges(state.current) : causedChanges;
}
function updateState(state, changes) {
	state.current = _objectSpread2(_objectSpread2({}, state.current), changes);
	return changes;
}
function didStateUpdate(state, handler, changes) {
	isFunction(handler) ? handler(state.current) : Object.keys(changes).forEach(function(field) {
		var _handler$field;
		return (_handler$field = handler[field]) === null || _handler$field === void 0 ? void 0 : _handler$field.call(handler, state.current[field]);
	});
	return changes;
}
var index = { create };
var state_local_default = index;

//#endregion
//#region node_modules/.pnpm/@monaco-editor+loader@1.7.0/node_modules/@monaco-editor/loader/lib/es/config/index.js
var config$1 = { paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs" } };

//#endregion
//#region node_modules/.pnpm/@monaco-editor+loader@1.7.0/node_modules/@monaco-editor/loader/lib/es/utils/curry.js
function curry(fn) {
	return function curried() {
		var _this = this;
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		return args.length >= fn.length ? fn.apply(this, args) : function() {
			for (var _len2 = arguments.length, nextArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) nextArgs[_key2] = arguments[_key2];
			return curried.apply(_this, [].concat(args, nextArgs));
		};
	};
}

//#endregion
//#region node_modules/.pnpm/@monaco-editor+loader@1.7.0/node_modules/@monaco-editor/loader/lib/es/utils/isObject.js
function isObject(value) {
	return {}.toString.call(value).includes("Object");
}

//#endregion
//#region node_modules/.pnpm/@monaco-editor+loader@1.7.0/node_modules/@monaco-editor/loader/lib/es/validators/index.js
/**
* validates the configuration object and informs about deprecation
* @param {Object} config - the configuration object 
* @return {Object} config - the validated configuration object
*/
function validateConfig(config$2) {
	if (!config$2) errorHandler("configIsRequired");
	if (!isObject(config$2)) errorHandler("configType");
	if (config$2.urls) {
		informAboutDeprecation();
		return { paths: { vs: config$2.urls.monacoBase } };
	}
	return config$2;
}
/**
* logs deprecation message
*/
function informAboutDeprecation() {
	console.warn(errorMessages.deprecation);
}
function throwError(errorMessages$2, type) {
	throw new Error(errorMessages$2[type] || errorMessages$2["default"]);
}
var errorMessages = {
	configIsRequired: "the configuration object is required",
	configType: "the configuration object should be an object",
	"default": "an unknown error accured in `@monaco-editor/loader` package",
	deprecation: "Deprecation warning!\n    You are using deprecated way of configuration.\n\n    Instead of using\n      monaco.config({ urls: { monacoBase: '...' } })\n    use\n      monaco.config({ paths: { vs: '...' } })\n\n    For more please check the link https://github.com/suren-atoyan/monaco-loader#config\n  "
};
var errorHandler = curry(throwError)(errorMessages);
var validators = { config: validateConfig };

//#endregion
//#region node_modules/.pnpm/@monaco-editor+loader@1.7.0/node_modules/@monaco-editor/loader/lib/es/utils/compose.js
var compose = function compose$2() {
	for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) fns[_key] = arguments[_key];
	return function(x) {
		return fns.reduceRight(function(y, f) {
			return f(y);
		}, x);
	};
};

//#endregion
//#region node_modules/.pnpm/@monaco-editor+loader@1.7.0/node_modules/@monaco-editor/loader/lib/es/utils/deepMerge.js
function merge(target, source) {
	Object.keys(source).forEach(function(key) {
		if (source[key] instanceof Object) {
			if (target[key]) Object.assign(source[key], merge(target[key], source[key]));
		}
	});
	return _objectSpread2$1(_objectSpread2$1({}, target), source);
}

//#endregion
//#region node_modules/.pnpm/@monaco-editor+loader@1.7.0/node_modules/@monaco-editor/loader/lib/es/utils/makeCancelable.js
var CANCELATION_MESSAGE = {
	type: "cancelation",
	msg: "operation is manually canceled"
};
function makeCancelable(promise) {
	var hasCanceled_ = false;
	var wrappedPromise = new Promise(function(resolve, reject) {
		promise.then(function(val) {
			return hasCanceled_ ? reject(CANCELATION_MESSAGE) : resolve(val);
		});
		promise["catch"](reject);
	});
	return wrappedPromise.cancel = function() {
		return hasCanceled_ = true;
	}, wrappedPromise;
}

//#endregion
//#region node_modules/.pnpm/@monaco-editor+loader@1.7.0/node_modules/@monaco-editor/loader/lib/es/loader/index.js
var _excluded = ["monaco"];
/** the local state of the module */
var _state$create = state_local_default.create({
	config: config$1,
	isInitialized: false,
	resolve: null,
	reject: null,
	monaco: null
}), _state$create2 = _slicedToArray(_state$create, 2), getState = _state$create2[0], setState = _state$create2[1];
/**
* set the loader configuration
* @param {Object} config - the configuration object
*/
function config(globalConfig) {
	var _validators$config = validators.config(globalConfig), monaco = _validators$config.monaco, config$2 = _objectWithoutProperties(_validators$config, _excluded);
	setState(function(state) {
		return {
			config: merge(state.config, config$2),
			monaco
		};
	});
}
/**
* handles the initialization of the monaco-editor
* @return {Promise} - returns an instance of monaco (with a cancelable promise)
*/
function init() {
	var state = getState(function(_ref) {
		var monaco = _ref.monaco, isInitialized = _ref.isInitialized, resolve = _ref.resolve;
		return {
			monaco,
			isInitialized,
			resolve
		};
	});
	if (!state.isInitialized) {
		setState({ isInitialized: true });
		if (state.monaco) {
			state.resolve(state.monaco);
			return makeCancelable(wrapperPromise);
		}
		if (window.monaco && window.monaco.editor) {
			storeMonacoInstance(window.monaco);
			state.resolve(window.monaco);
			return makeCancelable(wrapperPromise);
		}
		compose(injectScripts, getMonacoLoaderScript)(configureLoader);
	}
	return makeCancelable(wrapperPromise);
}
/**
* injects provided scripts into the document.body
* @param {Object} script - an HTML script element
* @return {Object} - the injected HTML script element
*/
function injectScripts(script) {
	return document.body.appendChild(script);
}
/**
* creates an HTML script element with/without provided src
* @param {string} [src] - the source path of the script
* @return {Object} - the created HTML script element
*/
function createScript(src) {
	var script = document.createElement("script");
	return src && (script.src = src), script;
}
/**
* creates an HTML script element with the monaco loader src
* @return {Object} - the created HTML script element
*/
function getMonacoLoaderScript(configureLoader$1) {
	var state = getState(function(_ref2) {
		var config$2 = _ref2.config, reject = _ref2.reject;
		return {
			config: config$2,
			reject
		};
	});
	var loaderScript = createScript("".concat(state.config.paths.vs, "/loader.js"));
	loaderScript.onload = function() {
		return configureLoader$1();
	};
	loaderScript.onerror = state.reject;
	return loaderScript;
}
/**
* configures the monaco loader
*/
function configureLoader() {
	var state = getState(function(_ref3) {
		var config$2 = _ref3.config, resolve = _ref3.resolve, reject = _ref3.reject;
		return {
			config: config$2,
			resolve,
			reject
		};
	});
	var require$1 = window.require;
	require$1.config(state.config);
	require$1(["vs/editor/editor.main"], function(loaded) {
		var monaco = loaded.m || loaded;
		storeMonacoInstance(monaco);
		state.resolve(monaco);
	}, function(error) {
		state.reject(error);
	});
}
/**
* store monaco instance in local state
*/
function storeMonacoInstance(monaco) {
	if (!getState().monaco) setState({ monaco });
}
/**
* internal helper function
* extracts stored monaco instance
* @return {Object|null} - the monaco instance
*/
function __getMonacoInstance() {
	return getState(function(_ref4) {
		var monaco = _ref4.monaco;
		return monaco;
	});
}
var wrapperPromise = new Promise(function(resolve, reject) {
	return setState({
		resolve,
		reject
	});
});
var loader = {
	config,
	init,
	__getMonacoInstance
};

//#endregion
//#region plugins/inline-css/components/Editor.scss
const classes$1 = {
	"monaco-editor": "alHKPa_monaco-editor",
	"line-numbers": "alHKPa_line-numbers",
	"glyph-margin": "alHKPa_glyph-margin",
	"popout": "alHKPa_popout",
	"controls": "alHKPa_controls",
	"ceditor": "alHKPa_ceditor"
};
const css$1 = `.alHKPa_ceditor {
  border-radius: 5px;
  margin-top: 20px;
  height: 80vh !important;
}

.alHKPa_ceditor[data-popout="true"] {
  flex-direction: column;
  flex: 1;
  min-height: 0;
  margin-top: 0;
  margin-bottom: 12px;
  display: flex;
  height: auto !important;
}

.alHKPa_ceditor > div {
  height: 100% !important;
}

.alHKPa_ceditor[data-popout="true"] > div {
  flex-direction: column;
  flex: 1;
  min-height: 0;
  display: flex;
  height: auto !important;
}

.alHKPa_ceditor .alHKPa_monaco-editor {
  height: 100% !important;
}

.alHKPa_ceditor .alHKPa_monaco-editor .alHKPa_line-numbers {
  text-align: right !important;
  padding-right: 4px !important;
}

.alHKPa_ceditor .alHKPa_monaco-editor .alHKPa_glyph-margin {
  width: 0 !important;
}

.alHKPa_ceditor[data-popout="true"] .alHKPa_monaco-editor {
  flex: 1;
  min-height: 0;
  height: auto !important;
}

.alHKPa_controls {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  display: flex;
}

.alHKPa_controls button {
  width: 30%;
}

.alHKPa_ceditor[data-popout="true"] .alHKPa_controls {
  margin-top: 12px;
  margin-bottom: 12px;
}

.alHKPa_popout {
  margin-top: 12px;
  width: 100% !important;
}

.alHKPa_popout svg {
  width: 30px;
  height: 50%;
}
`;

//#endregion
//#region util/debounce.ts
const debounce = (fn, delay) => {
	let timer = null;
	return (...args) => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(void 0, args);
		}, delay);
	};
};

//#endregion
//#region plugins/inline-css/components/Popout.tsx
var import_web$21 = __toESM(require_web(), 1);
var import_web$22 = __toESM(require_web(), 1);
const _tmpl$$3 = /*#__PURE__*/ (0, import_web$21.template)(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve"><defs></defs><g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"><path d="M 85 35.661 c -2.762 0 -5 -2.239 -5 -5 V 10 H 59.339 c -2.762 0 -5 -2.239 -5 -5 s 2.238 -5 5 -5 H 85 c 2.762 0 5 2.239 5 5 v 25.661 C 90 33.422 87.762 35.661 85 35.661 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path><path d="M 33.678 61.322 c -1.28 0 -2.559 -0.488 -3.536 -1.465 c -1.953 -1.952 -1.953 -5.118 0 -7.07 L 81.465 1.464 c 1.951 -1.952 5.119 -1.952 7.07 0 c 1.953 1.953 1.953 5.119 0 7.071 L 37.214 59.857 C 36.237 60.834 34.958 61.322 33.678 61.322 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path><path d="M 74.394 90 H 15.606 C 7.001 90 0 82.999 0 74.394 V 15.606 C 0 7.001 7.001 0 15.606 0 h 18.072 c 2.761 0 5 2.239 5 5 s -2.239 5 -5 5 H 15.606 C 12.515 10 10 12.515 10 15.606 v 58.787 C 10 77.485 12.515 80 15.606 80 h 58.787 C 77.485 80 80 77.485 80 74.394 V 56.322 c 0 -2.762 2.238 -5 5 -5 s 5 2.238 5 5 v 18.071 C 90 82.999 82.999 90 74.394 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path></g></svg>`, 12);
const Popout = () => (0, import_web$22.getNextElement)(_tmpl$$3);

//#endregion
//#region plugins/inline-css/components/Window.scss
const classes = {
	"window": "EVeMMG_window",
	"topbar": "EVeMMG_topbar",
	"exit": "EVeMMG_exit",
	"resize": "EVeMMG_resize",
	"inner": "EVeMMG_inner",
	"main": "EVeMMG_main",
	"content": "EVeMMG_content"
};
const css = `.EVeMMG_window {
  z-index: 99999;
  pointer-events: none;
  min-width: 300px;
  min-height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
}

.EVeMMG_resize {
  cursor: se-resize;
  z-index: -1;
  pointer-events: all;
  width: 16px;
  height: 16px;
  position: absolute;
  bottom: 0;
  right: 0;
}

.EVeMMG_content {
  --inset: 8px;
  width: calc(100% - 2px - 2 * var(--inset));
  height: calc(100% - 2px - 2 * var(--inset));
  margin: var(--inset);
  pointer-events: all;
  background: var(--background-base-low);
  border: 1px solid var(--background-surface-highest);
  border-radius: 6px;
  flex-direction: column;
  display: flex;
  box-shadow: 0 0 3px #000;
}

.EVeMMG_content .EVeMMG_inner {
  flex-direction: column;
  flex: 1;
  min-height: 0;
  margin: 8px;
  display: flex;
  overflow: hidden;
}

.EVeMMG_topbar {
  background: var(--background-base-lowest);
  width: 100%;
  height: 30px;
  margin-bottom: 12px;
}

.EVeMMG_exit {
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 100%;
  display: flex;
}

.EVeMMG_exit:hover {
  cursor: pointer;
  background: #f23f43;
}

.EVeMMG_exit svg {
  width: 100%;
  height: 60%;
}

.EVeMMG_main {
  flex-direction: column;
  flex: 1;
  min-height: 0;
  margin-right: 10px;
  display: flex;
}
`;

//#endregion
//#region plugins/inline-css/components/Close.tsx
var import_web$19 = __toESM(require_web(), 1);
var import_web$20 = __toESM(require_web(), 1);
const _tmpl$$2 = /*#__PURE__*/ (0, import_web$19.template)(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve"><defs></defs><g style="
      stroke: none;
      stroke-width: 0;
      stroke-dasharray: none;
      stroke-linecap: butt;
      stroke-linejoin: miter;
      stroke-miterlimit: 10;
      fill: none;
      fill-rule: nonzero;
      opacity: 1;
    " transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"><path d="M 8 90 c -2.047 0 -4.095 -0.781 -5.657 -2.343 c -3.125 -3.125 -3.125 -8.189 0 -11.314 l 74 -74 c 3.125 -3.124 8.189 -3.124 11.314 0 c 3.124 3.124 3.124 8.189 0 11.313 l -74 74 C 12.095 89.219 10.047 90 8 90 z" style="
        stroke: none;
        stroke-width: 1;
        stroke-dasharray: none;
        stroke-linecap: butt;
        stroke-linejoin: miter;
        stroke-miterlimit: 10;
        fill: rgb(255, 255, 255);
        fill-rule: nonzero;
        opacity: 1;
      " transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path><path d="M 82 90 c -2.048 0 -4.095 -0.781 -5.657 -2.343 l -74 -74 c -3.125 -3.124 -3.125 -8.189 0 -11.313 c 3.124 -3.124 8.189 -3.124 11.313 0 l 74 74 c 3.124 3.125 3.124 8.189 0 11.314 C 86.095 89.219 84.048 90 82 90 z" style="
        stroke: none;
        stroke-width: 1;
        stroke-dasharray: none;
        stroke-linecap: butt;
        stroke-linejoin: miter;
        stroke-miterlimit: 10;
        fill: rgb(255, 255, 255);
        fill-rule: nonzero;
        opacity: 1;
      " transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path></g></svg>`, 10);
const Close = () => (0, import_web$20.getNextElement)(_tmpl$$2);

//#endregion
//#region plugins/inline-css/components/Window.tsx
var import_web$10 = __toESM(require_web(), 1);
var import_web$11 = __toESM(require_web(), 1);
var import_web$12 = __toESM(require_web(), 1);
var import_web$13 = __toESM(require_web(), 1);
var import_web$14 = __toESM(require_web(), 1);
var import_web$15 = __toESM(require_web(), 1);
var import_web$16 = __toESM(require_web(), 1);
var import_web$17 = __toESM(require_web(), 1);
var import_web$18 = __toESM(require_web(), 1);
const _tmpl$$1 = /*#__PURE__*/ (0, import_web$10.template)(`<div><div></div><div><div><div></div></div><div><div></div></div></div></div>`, 14);
const { ui: { injectCss: injectCss$1 } } = shelter;
let injectedCss$1 = false;
const getClientCoordinates = ({ touches, clientX, clientY }) => {
	if (touches) return [touches[touches.length - 1].clientX, touches[touches.length - 1].clientY];
	return [clientX, clientY];
};
const handleDragging = (onDrag) => {
	const drag = debounce((evt) => {
		evt.preventDefault();
		onDrag(evt);
	}, 5);
	const mouseup = () => {
		document.removeEventListener("mousemove", drag);
		document.removeEventListener("touchmove", drag);
		document.removeEventListener("mouseup", mouseup);
		document.removeEventListener("touchend", mouseup);
	};
	document.addEventListener("mousemove", drag);
	document.addEventListener("touchmove", drag);
	document.addEventListener("mouseup", mouseup);
	document.addEventListener("touchend", mouseup);
};
const Window = () => {
	let ref = null;
	if (!injectedCss$1) {
		injectCss$1(css);
		injectedCss$1 = true;
	}
	const close = () => {
		if (ref) ref.remove();
	};
	const topbarMouseDown = (evt) => {
		evt.preventDefault();
		const [oldClientX, oldClientY] = getClientCoordinates(evt);
		const windowElm = evt.target.closest("." + classes.window);
		const rect = windowElm.getBoundingClientRect();
		const dragOffsetX = oldClientX - rect.left;
		const dragOffsetY = oldClientY - rect.top;
		handleDragging((evt$1) => {
			const newX = evt$1.clientX - dragOffsetX;
			const newY = evt$1.clientY - dragOffsetY;
			windowElm.style.left = `${newX}px`;
			windowElm.style.top = `${newY}px`;
		});
	};
	const resizeMouseDown = (evt) => {
		evt.preventDefault();
		const [oldClientX, oldClientY] = getClientCoordinates(evt);
		const windowElm = evt.target.closest("." + classes.window);
		const rect = windowElm.getBoundingClientRect();
		handleDragging((evt$1) => {
			const newWidth = rect.width + evt$1.clientX - oldClientX;
			const newHeight = rect.height + evt$1.clientY - oldClientY;
			windowElm.style.width = `${newWidth}px`;
			windowElm.style.height = `${newHeight}px`;
		});
	};
	return (() => {
		const _el$ = (0, import_web$14.getNextElement)(_tmpl$$1), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.firstChild, _el$5 = _el$4.firstChild, _el$6 = _el$4.nextSibling, _el$7 = _el$6.firstChild;
		const _ref$ = ref;
		typeof _ref$ === "function" ? (0, import_web$18.use)(_ref$, _el$) : ref = _el$;
		_el$.style.setProperty("height", "400px");
		_el$.style.setProperty("width", "30vw");
		_el$2.$$mousedown = resizeMouseDown;
		_el$4.$$mousedown = topbarMouseDown;
		_el$5.$$click = close;
		(0, import_web$16.insert)(_el$5, (0, import_web$17.createComponent)(Close, {}));
		(0, import_web$16.insert)(_el$7, (0, import_web$17.createComponent)(Editor_default, {
			get styleElm() {
				return document.getElementById("inline-css-output");
			},
			popout: true
		}));
		(0, import_web$13.effect)((_p$) => {
			const _v$ = classes.window, _v$2 = classes.resize, _v$3 = classes.content, _v$4 = classes.topbar, _v$5 = classes.exit, _v$6 = classes.inner, _v$7 = classes.main;
			_v$ !== _p$._v$ && (0, import_web$12.className)(_el$, _p$._v$ = _v$);
			_v$2 !== _p$._v$2 && (0, import_web$12.className)(_el$2, _p$._v$2 = _v$2);
			_v$3 !== _p$._v$3 && (0, import_web$12.className)(_el$3, _p$._v$3 = _v$3);
			_v$4 !== _p$._v$4 && (0, import_web$12.className)(_el$4, _p$._v$4 = _v$4);
			_v$5 !== _p$._v$5 && (0, import_web$12.className)(_el$5, _p$._v$5 = _v$5);
			_v$6 !== _p$._v$6 && (0, import_web$12.className)(_el$6, _p$._v$6 = _v$6);
			_v$7 !== _p$._v$7 && (0, import_web$12.className)(_el$7, _p$._v$7 = _v$7);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined,
			_v$3: undefined,
			_v$4: undefined,
			_v$5: undefined,
			_v$6: undefined,
			_v$7: undefined
		});
		(0, import_web$15.runHydrationEvents)();
		return _el$;
	})();
};
(0, import_web$11.delegateEvents)(["mousedown", "click"]);

//#endregion
//#region plugins/inline-css/components/Editor.tsx
var import_web = __toESM(require_web(), 1);
var import_web$1 = __toESM(require_web(), 1);
var import_web$2 = __toESM(require_web(), 1);
var import_web$3 = __toESM(require_web(), 1);
var import_web$4 = __toESM(require_web(), 1);
var import_web$5 = __toESM(require_web(), 1);
var import_web$6 = __toESM(require_web(), 1);
var import_web$7 = __toESM(require_web(), 1);
var import_web$8 = __toESM(require_web(), 1);
var import_web$9 = __toESM(require_web(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web.template)(`<div><!#><!/><!#><!/></div>`, 6), _tmpl$2 = /*#__PURE__*/ (0, import_web.template)(`<div></div>`, 2);
const { ui: { injectCss, Header, HeaderTags, Button, CheckboxItem }, plugin: { store: store$1 }, solid: { createSignal, createEffect, onMount, onCleanup }, flux: { dispatcher } } = shelter;
const saveCss = debounce((css$2, styleElm) => {
	store$1.inlineCss = css$2;
	if (styleElm) styleElm.textContent = css$2;
}, 500);
let injectedCss = false;
const getDiscordTheme = () => {
	return document.documentElement.classList.contains("theme-dark");
};
function Editor_default(props) {
	let ref = null;
	let editorInstance = null;
	if (!injectedCss) {
		injectCss(css$1);
		injectedCss = true;
	}
	const [hotReload, setHotReload] = createSignal(true);
	const [isDark, setIsDark] = createSignal(true);
	onMount(() => {
		setIsDark(getDiscordTheme());
		const observer = new MutationObserver(() => {
			setIsDark(getDiscordTheme());
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"]
		});
		onCleanup(() => observer.disconnect());
		requestAnimationFrame(() => {
			const container = ref;
			if (!container || editorInstance) return;
			loader.init().then((monaco) => {
				if (editorInstance) editorInstance.dispose();
				editorInstance = monaco.editor.create(container, {
					value: store$1.inlineCss || "",
					language: "css",
					theme: isDark() ? "vs-dark" : "vs",
					minimap: { enabled: false },
					fontSize: 14,
					automaticLayout: true,
					scrollBeyondLastLine: false,
					lineNumbers: "on",
					lineNumbersMinChars: 3,
					lineDecorationsWidth: 5,
					glyphMargin: false,
					folding: true,
					wordWrap: "on"
				});
				createEffect(() => {
					if (editorInstance) editorInstance.updateOptions({ theme: isDark() ? "vs-dark" : "vs" });
				});
				editorInstance.onDidChangeModelContent(() => {
					const value = editorInstance.getValue();
					if (hotReload()) saveCss(value, props.styleElm);
				});
			});
			onCleanup(() => {
				if (editorInstance) editorInstance.dispose();
			});
		});
	});
	const setCss = () => {
		if (editorInstance) {
			const value = editorInstance.getValue();
			saveCss(value, props.styleElm);
		}
	};
	return [
		(0, import_web$9.createComponent)(Header, {
			get tag() {
				return HeaderTags.H1;
			},
			children: "CSS Editor"
		}),
		(0, import_web$8.memo)((() => {
			const _c$ = (0, import_web$8.memo)(() => !!!props.popout);
			return () => _c$() && (0, import_web$9.createComponent)(Button, {
				get ["class"]() {
					return classes$1.popout;
				},
				onClick: () => {
					document.body.appendChild(Window());
					dispatcher.dispatch({ type: "LAYER_POP" });
				},
				get children() {
					return ["Pop Out ", (0, import_web$9.createComponent)(Popout, {})];
				}
			});
		})()),
		(() => {
			const _el$ = (0, import_web$5.getNextElement)(_tmpl$), _el$2 = _el$.firstChild, [_el$3, _co$] = (0, import_web$6.getNextMarker)(_el$2.nextSibling), _el$4 = _el$3.nextSibling, [_el$5, _co$2] = (0, import_web$6.getNextMarker)(_el$4.nextSibling);
			(0, import_web$7.insert)(_el$, (0, import_web$9.createComponent)(CheckboxItem, {
				get checked() {
					return hotReload();
				},
				onChange: setHotReload,
				children: "Hot Reload"
			}), _el$3, _co$);
			(0, import_web$7.insert)(_el$, (0, import_web$9.createComponent)(Button, {
				onClick: setCss,
				get disabled() {
					return hotReload();
				},
				children: "Save & Apply"
			}), _el$5, _co$2);
			(0, import_web$4.effect)(() => (0, import_web$3.className)(_el$, classes$1.controls));
			return _el$;
		})(),
		(() => {
			const _el$6 = (0, import_web$5.getNextElement)(_tmpl$2);
			const _ref$ = ref;
			typeof _ref$ === "function" ? (0, import_web$2.use)(_ref$, _el$6) : ref = _el$6;
			(0, import_web$4.effect)((_p$) => {
				const _v$ = classes$1.ceditor, _v$2 = props.popout ? "true" : "false";
				_v$ !== _p$._v$ && (0, import_web$3.className)(_el$6, _p$._v$ = _v$);
				_v$2 !== _p$._v$2 && (0, import_web$1.setAttribute)(_el$6, "data-popout", _p$._v$2 = _v$2);
				return _p$;
			}, {
				_v$: undefined,
				_v$2: undefined
			});
			return _el$6;
		})()
	];
}

//#endregion
//#region plugins/inline-css/index.tsx
const { settings: { registerSection }, plugin: { store } } = shelter;
let inlineStyleElm = null;
const inlineStyle = document.createElement("style");
inlineStyle.id = "inline-css-output";
inlineStyleElm = document.body.appendChild(inlineStyle);
inlineStyleElm.textContent = store.inlineCss;
const unload = registerSection("section", "inline-css", "CSS Editor", () => Editor_default({ styleElm: inlineStyleElm }));
const onUnload = () => {
	unload();
	if (inlineStyleElm) inlineStyleElm.remove();
};

//#endregion
exports.onUnload = onUnload
return exports;
})({});