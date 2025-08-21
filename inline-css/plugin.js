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
//#region solid-js
var require_solid_js = __commonJS({ "solid-js"(exports, module) {
	module.exports = shelter.solid;
} });

//#endregion
//#region node_modules/.pnpm/@srsholmes+solid-code-input@0.0.18_@types+highlight.js@9.12.2_@types+prismjs@1.26.0_solid-js@1.8.7/node_modules/@srsholmes/solid-code-input/dist/esm/index.js
var import_web$22 = __toESM(require_web());
var import_solid_js = __toESM(require_solid_js());
function handleTabKey(event, input_element, code) {
	event.preventDefault();
	if (!event.shiftKey && input_element.selectionStart == input_element.selectionEnd) {
		let before_selection = code.slice(0, input_element.selectionStart);
		let after_selection = code.slice(input_element.selectionEnd, input_element.value.length);
		let cursor_pos = input_element.selectionEnd + 1;
		input_element.value = before_selection + "	" + after_selection;
		input_element.selectionStart = cursor_pos;
		input_element.selectionEnd = cursor_pos;
	} else {
		let lines = input_element.value.split("\n");
		let letter_i = 0;
		let selection_start = input_element.selectionStart;
		let selection_end = input_element.selectionEnd;
		let number_indents = 0;
		let first_line_indents = 0;
		for (let i = 0; i < lines.length; i++) {
			letter_i += lines[i].length + 1;
			if (input_element.selectionStart <= letter_i && input_element.selectionEnd >= letter_i - lines[i].length) if (event.shiftKey) {
				if (lines[i][0] == "	") {
					lines[i] = lines[i].slice(1);
					if (number_indents == 0) first_line_indents--;
					number_indents--;
				}
			} else {
				lines[i] = "	" + lines[i];
				if (number_indents == 0) first_line_indents++;
				number_indents++;
			}
		}
		input_element.value = lines.join("\n");
		input_element.selectionStart = selection_start + first_line_indents;
		input_element.selectionEnd = selection_end + number_indents;
	}
}
function handleEnterKey(event, input_element) {
	event.preventDefault();
	let lines = input_element.value.split("\n");
	let letter_i = 0;
	let current_line = lines.length - 1;
	let new_line = "";
	let number_indents = 0;
	for (let i = 0; i < lines.length; i++) {
		letter_i += lines[i].length + 1;
		if (input_element.selectionStart <= letter_i) {
			current_line = i;
			break;
		}
	}
	let cursor_pos_in_line = lines[current_line].length - (letter_i - input_element.selectionEnd) + 1;
	for (let i = 0; i < cursor_pos_in_line; i++) if (lines[current_line][i] == "	") number_indents++;
else break;
	let text_after_cursor = "";
	if (cursor_pos_in_line != lines[current_line].length) {
		text_after_cursor = lines[current_line].substring(cursor_pos_in_line);
		lines[current_line] = lines[current_line].substring(0, cursor_pos_in_line);
	}
	for (let i = 0; i < number_indents; i++) new_line += "	";
	new_line += text_after_cursor;
	let selection_start = input_element.selectionStart;
	let selection_end = input_element.selectionEnd;
	lines.splice(current_line + 1, 0, new_line);
	input_element.value = lines.join("\n");
	input_element.selectionStart = selection_start + number_indents + 1;
	input_element.selectionEnd = selection_end + number_indents + 1;
}
function styleInject(css$3, ref) {
	if (ref === void 0) ref = {};
	var insertAt = ref.insertAt;
	if (!css$3 || typeof document === "undefined") return;
	var head = document.head || document.getElementsByTagName("head")[0];
	var style$1 = document.createElement("style");
	style$1.type = "text/css";
	if (insertAt === "top") if (head.firstChild) head.insertBefore(style$1, head.firstChild);
else head.appendChild(style$1);
else head.appendChild(style$1);
	if (style$1.styleSheet) style$1.styleSheet.cssText = css$3;
else style$1.appendChild(document.createTextNode(css$3));
}
var css_248z = "/* Original CSS written by Oliver Geer (WebCoder49) */\n/* https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/ */\n/* Updated for solid-code-input */\n\n.styles-module_outer-wrapper__pwbah * {\n  box-sizing: border-box;\n}\n\n.styles-module_wrap__VKL-2 {\n  position: relative;\n  display: block;\n  min-height: 60px;\n  box-sizing: border-box;\n  position: relative;\n  top: 0;\n  left: 0;\n  display: block;\n  overflow: hidden;\n  min-height: 76px;\n  font-size: 16px;\n  font-family: monospace;\n  line-height: normal;\n  tab-size: 2;\n  caret-color: darkgrey;\n  white-space: pre;\n}\n\n.styles-module_wrap__VKL-2 textarea,\n.styles-module_wrap__VKL-2 pre {\n  width: 100%;\n  height: 100%;\n  border: none;\n  overflow: auto;\n  outline: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  font-family: monospace;\n  font-size: inherit !important;\n  line-height: inherit !important;\n  background: transparent;\n  padding: 0 !important;\n  margin: 0 !important;\n}\n\n.styles-module_wrap__VKL-2 textarea,\n.styles-module_wrap__VKL-2 pre,\n.styles-module_wrap__VKL-2 pre * {\n  font-size: inherit !important;\n  font-family: inherit !important;\n  line-height: inherit !important;\n  tab-size: inherit !important;\n}\n\n.styles-module_wrap__VKL-2 textarea {\n  display: block;\n  color: transparent;\n  background: transparent;\n  caret-color: inherit !important;\n  z-index: 1;\n}\n\n.styles-module_wrap__VKL-2 pre::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n}\n\n.styles-module_wrap__VKL-2 pre {\n  z-index: 0;\n}\n\n.styles-module_wrap__VKL-2 textarea,\n.styles-module_wrap__VKL-2 pre {\n  overflow: auto !important;\n  white-space: inherit;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n}\n\n.styles-module_wrap__VKL-2 textarea.styles-module_resize-both__x-us- {\n  resize: both;\n}\n\n.styles-module_wrap__VKL-2 textarea.styles-module_resize-none__0Stjz {\n  resize: none;\n}\n\n.styles-module_wrap__VKL-2 textarea.styles-module_resize-horizontal__Gt6Mt {\n  resize: horizontal;\n}\n\n.styles-module_wrap__VKL-2 textarea.styles-module_resize-vertical__eZhdp {\n  resize: vertical;\n}\n";
var styles = {
	"outer-wrapper": "styles-module_outer-wrapper__pwbah",
	"wrap": "styles-module_wrap__VKL-2",
	"resize-both": "styles-module_resize-both__x-us-",
	"resize-none": "styles-module_resize-none__0Stjz",
	"resize-horizontal": "styles-module_resize-horizontal__Gt6Mt",
	"resize-vertical": "styles-module_resize-vertical__eZhdp"
};
styleInject(css_248z);
const _tmpl$$4 = /*#__PURE__*/ (0, import_web$22.template)(`<div style="padding: 1rem; box-sizing: border-box;"><div><textarea></textarea><pre><div class="code-highlighted"></div></pre></div></div>`, 10);
const CodeInput = (props) => {
	const merged = (0, import_solid_js.mergeProps)({ autoHeight: true }, props);
	const language = () => merged.language || "typescript";
	const value = () => merged.value || "";
	let preElement;
	let textAreaElement;
	let wrapperElement;
	let outerElement;
	let wrapperHeight;
	let wrapperWidth;
	const [manualResize, setManualResize] = (0, import_solid_js.createSignal)(false);
	(0, import_solid_js.onMount)(async () => {
		watchResize();
		if (props.autoHeight) autoHeight();
		setBackgroundWrapper();
	});
	function setBackgroundWrapper() {
		const preBackground = window.getComputedStyle(preElement).backgroundColor;
		outerElement.style.backgroundColor = preBackground;
	}
	function setSizes() {
		const { height, width } = getTextareaSize();
		preElement.style.width = `${width}px`;
		preElement.style.height = `${height}px`;
		wrapperElement.style.width = `${width}px`;
		wrapperElement.style.height = `${height}px`;
		const rem = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
		outerElement.style.width = `${width + rem}px`;
		outerElement.style.height = `${height + rem}px`;
	}
	function getTextareaSize() {
		const { height, width } = textAreaElement.getBoundingClientRect();
		return {
			height,
			width
		};
	}
	function autoHeight() {
		if (manualResize() === true) return;
		wrapperElement.style.height = `0px`;
		wrapperElement.style.height = textAreaElement.scrollHeight + "px";
	}
	function watchResize() {
		new ResizeObserver(setSizes).observe(textAreaElement);
	}
	function syncScroll() {
		preElement.scrollTop = textAreaElement.scrollTop;
		preElement.scrollLeft = textAreaElement.scrollLeft;
		if (textAreaElement.scrollTop > preElement.scrollTop) textAreaElement.scrollTop = preElement.scrollTop;
		if (textAreaElement.scrollLeft > preElement.scrollLeft) textAreaElement.scrollLeft = preElement.scrollLeft;
	}
	const codeTokens = () => {
		try {
			if (merged.prismJS) if (merged.prismJS.languages[language()]) {
				if (merged.autoHeight) autoHeight();
				const tokens = merged.prismJS.highlight(value(), merged.prismJS.languages[language()], language());
				return tokens;
			} else {
				if (merged.autoHeight) autoHeight();
				return merged.prismJS.util.encode(value()).toString();
			}
else if (merged.highlightjs) {
				const tokens = merged.highlightjs.highlight(value(), { language: language() }).value;
				if (merged.autoHeight) autoHeight();
				return tokens;
			}
		} catch (e) {
			console.error(e);
		}
	};
	function handleKeyDown(event) {
		let input_element = textAreaElement;
		let code = input_element.value;
		if (event.key === "Tab") {
			handleTabKey(event, input_element, code);
			merged.onChange(input_element.value);
		}
		if (event.key === "Enter") {
			handleEnterKey(event, input_element);
			merged.onChange(input_element.value);
		}
	}
	async function handleInput(e) {
		merged.onChange(e.target.value);
	}
	function handleMouseDown() {
		const { height, width } = getTextareaSize();
		wrapperHeight = height;
		wrapperWidth = width;
	}
	function handleMouseUp() {
		const { height, width } = getTextareaSize();
		if (height !== wrapperHeight || width !== wrapperWidth) setManualResize(true);
	}
	return (() => {
		const _el$ = _tmpl$$4.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.firstChild;
		const _ref$ = outerElement;
		typeof _ref$ === "function" ? (0, import_web$22.use)(_ref$, _el$) : outerElement = _el$;
		const _ref$2 = wrapperElement;
		typeof _ref$2 === "function" ? (0, import_web$22.use)(_ref$2, _el$2) : wrapperElement = _el$2;
		_el$2.$$mouseup = handleMouseUp;
		_el$2.$$mousedown = handleMouseDown;
		const _ref$3 = textAreaElement;
		typeof _ref$3 === "function" ? (0, import_web$22.use)(_ref$3, _el$3) : textAreaElement = _el$3;
		_el$3.addEventListener("scroll", syncScroll);
		_el$3.$$input = handleInput;
		_el$3.$$keydown = handleKeyDown;
		(0, import_web$22.setAttribute)(_el$3, "spellcheck", false);
		const _ref$4 = preElement;
		typeof _ref$4 === "function" ? (0, import_web$22.use)(_ref$4, _el$4) : preElement = _el$4;
		(0, import_web$22.setAttribute)(_el$4, "aria-hidden", true);
		(0, import_web$22.effect)((_p$) => {
			const _v$ = styles["outer-wrapper"], _v$2 = styles.wrap, _v$3 = `${merged.resize ? styles[`resize-${merged.resize}`] : ""}`, _v$4 = merged.placeholder || "Type code here...", _v$5 = `language-${language()}`, _v$6 = codeTokens();
			_v$ !== _p$._v$ && (0, import_web$22.className)(_el$, _p$._v$ = _v$);
			_v$2 !== _p$._v$2 && (0, import_web$22.className)(_el$2, _p$._v$2 = _v$2);
			_v$3 !== _p$._v$3 && (0, import_web$22.className)(_el$3, _p$._v$3 = _v$3);
			_v$4 !== _p$._v$4 && (0, import_web$22.setAttribute)(_el$3, "placeholder", _p$._v$4 = _v$4);
			_v$5 !== _p$._v$5 && (0, import_web$22.className)(_el$4, _p$._v$5 = _v$5);
			_v$6 !== _p$._v$6 && (_el$5.innerHTML = _p$._v$6 = _v$6);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined,
			_v$3: undefined,
			_v$4: undefined,
			_v$5: undefined,
			_v$6: undefined
		});
		(0, import_web$22.effect)(() => _el$3.value = value());
		return _el$;
	})();
};
(0, import_web$22.delegateEvents)([
	"mousedown",
	"mouseup",
	"keydown",
	"input"
]);

//#endregion
//#region node_modules/.pnpm/highlight.js@11.9.0/node_modules/highlight.js/lib/core.js
var require_core = __commonJS({ "node_modules/.pnpm/highlight.js@11.9.0/node_modules/highlight.js/lib/core.js"(exports, module) {
	function deepFreeze(obj) {
		if (obj instanceof Map) obj.clear = obj.delete = obj.set = function() {
			throw new Error("map is read-only");
		};
else if (obj instanceof Set) obj.add = obj.clear = obj.delete = function() {
			throw new Error("set is read-only");
		};
		Object.freeze(obj);
		Object.getOwnPropertyNames(obj).forEach((name) => {
			const prop = obj[name];
			const type = typeof prop;
			if ((type === "object" || type === "function") && !Object.isFrozen(prop)) deepFreeze(prop);
		});
		return obj;
	}
	var Response = class {
		/**
		* @param {CompiledMode} mode
		*/
		constructor(mode) {
			if (mode.data === undefined) mode.data = {};
			this.data = mode.data;
			this.isMatchIgnored = false;
		}
		ignoreMatch() {
			this.isMatchIgnored = true;
		}
	};
	/**
	* @param {string} value
	* @returns {string}
	*/
	function escapeHTML(value) {
		return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
	}
	/**
	* performs a shallow merge of multiple objects into one
	*
	* @template T
	* @param {T} original
	* @param {Record<string,any>[]} objects
	* @returns {T} a single new object
	*/
	function inherit$1(original, ...objects) {
		/** @type Record<string,any> */
		const result = Object.create(null);
		for (const key in original) result[key] = original[key];
		objects.forEach(function(obj) {
			for (const key in obj) result[key] = obj[key];
		});
		return result;
	}
	/**
	* @typedef {object} Renderer
	* @property {(text: string) => void} addText
	* @property {(node: Node) => void} openNode
	* @property {(node: Node) => void} closeNode
	* @property {() => string} value
	*/
	/** @typedef {{scope?: string, language?: string, sublanguage?: boolean}} Node */
	/** @typedef {{walk: (r: Renderer) => void}} Tree */
	/** */
	const SPAN_CLOSE = "</span>";
	/**
	* Determines if a node needs to be wrapped in <span>
	*
	* @param {Node} node */
	const emitsWrappingTags = (node) => {
		return !!node.scope;
	};
	/**
	*
	* @param {string} name
	* @param {{prefix:string}} options
	*/
	const scopeToCSSClass = (name, { prefix }) => {
		if (name.startsWith("language:")) return name.replace("language:", "language-");
		if (name.includes(".")) {
			const pieces = name.split(".");
			return [`${prefix}${pieces.shift()}`, ...pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`)].join(" ");
		}
		return `${prefix}${name}`;
	};
	var HTMLRenderer = class {
		/**
		* Creates a new HTMLRenderer
		*
		* @param {Tree} parseTree - the parse tree (must support `walk` API)
		* @param {{classPrefix: string}} options
		*/
		constructor(parseTree, options) {
			this.buffer = "";
			this.classPrefix = options.classPrefix;
			parseTree.walk(this);
		}
		/**
		* Adds texts to the output stream
		*
		* @param {string} text */
		addText(text) {
			this.buffer += escapeHTML(text);
		}
		/**
		* Adds a node open to the output stream (if needed)
		*
		* @param {Node} node */
		openNode(node) {
			if (!emitsWrappingTags(node)) return;
			const className$1 = scopeToCSSClass(node.scope, { prefix: this.classPrefix });
			this.span(className$1);
		}
		/**
		* Adds a node close to the output stream (if needed)
		*
		* @param {Node} node */
		closeNode(node) {
			if (!emitsWrappingTags(node)) return;
			this.buffer += SPAN_CLOSE;
		}
		/**
		* returns the accumulated buffer
		*/
		value() {
			return this.buffer;
		}
		/**
		* Builds a span element
		*
		* @param {string} className */
		span(className$1) {
			this.buffer += `<span class="${className$1}">`;
		}
	};
	/** @typedef {{scope?: string, language?: string, children: Node[]} | string} Node */
	/** @typedef {{scope?: string, language?: string, children: Node[]} } DataNode */
	/** @typedef {import('highlight.js').Emitter} Emitter */
	/**  */
	/** @returns {DataNode} */
	const newNode = (opts = {}) => {
		/** @type DataNode */
		const result = { children: [] };
		Object.assign(result, opts);
		return result;
	};
	var TokenTree = class TokenTree {
		constructor() {
			/** @type DataNode */
			this.rootNode = newNode();
			this.stack = [this.rootNode];
		}
		get top() {
			return this.stack[this.stack.length - 1];
		}
		get root() {
			return this.rootNode;
		}
		/** @param {Node} node */
		add(node) {
			this.top.children.push(node);
		}
		/** @param {string} scope */
		openNode(scope) {
			/** @type Node */
			const node = newNode({ scope });
			this.add(node);
			this.stack.push(node);
		}
		closeNode() {
			if (this.stack.length > 1) return this.stack.pop();
			return undefined;
		}
		closeAllNodes() {
			while (this.closeNode());
		}
		toJSON() {
			return JSON.stringify(this.rootNode, null, 4);
		}
		/**
		* @typedef { import("./html_renderer").Renderer } Renderer
		* @param {Renderer} builder
		*/
		walk(builder) {
			return this.constructor._walk(builder, this.rootNode);
		}
		/**
		* @param {Renderer} builder
		* @param {Node} node
		*/
		static _walk(builder, node) {
			if (typeof node === "string") builder.addText(node);
else if (node.children) {
				builder.openNode(node);
				node.children.forEach((child) => this._walk(builder, child));
				builder.closeNode(node);
			}
			return builder;
		}
		/**
		* @param {Node} node
		*/
		static _collapse(node) {
			if (typeof node === "string") return;
			if (!node.children) return;
			if (node.children.every((el) => typeof el === "string")) node.children = [node.children.join("")];
else node.children.forEach((child) => {
				TokenTree._collapse(child);
			});
		}
	};
	var TokenTreeEmitter = class extends TokenTree {
		/**
		* @param {*} options
		*/
		constructor(options) {
			super();
			this.options = options;
		}
		/**
		* @param {string} text
		*/
		addText(text) {
			if (text === "") return;
			this.add(text);
		}
		/** @param {string} scope */
		startScope(scope) {
			this.openNode(scope);
		}
		endScope() {
			this.closeNode();
		}
		/**
		* @param {Emitter & {root: DataNode}} emitter
		* @param {string} name
		*/
		__addSublanguage(emitter, name) {
			/** @type DataNode */
			const node = emitter.root;
			if (name) node.scope = `language:${name}`;
			this.add(node);
		}
		toHTML() {
			const renderer = new HTMLRenderer(this, this.options);
			return renderer.value();
		}
		finalize() {
			this.closeAllNodes();
			return true;
		}
	};
	/**
	* @param {string} value
	* @returns {RegExp}
	* */
	/**
	* @param {RegExp | string } re
	* @returns {string}
	*/
	function source(re) {
		if (!re) return null;
		if (typeof re === "string") return re;
		return re.source;
	}
	/**
	* @param {RegExp | string } re
	* @returns {string}
	*/
	function lookahead(re) {
		return concat("(?=", re, ")");
	}
	/**
	* @param {RegExp | string } re
	* @returns {string}
	*/
	function anyNumberOfTimes(re) {
		return concat("(?:", re, ")*");
	}
	/**
	* @param {RegExp | string } re
	* @returns {string}
	*/
	function optional(re) {
		return concat("(?:", re, ")?");
	}
	/**
	* @param {...(RegExp | string) } args
	* @returns {string}
	*/
	function concat(...args) {
		const joined = args.map((x) => source(x)).join("");
		return joined;
	}
	/**
	* @param { Array<string | RegExp | Object> } args
	* @returns {object}
	*/
	function stripOptionsFromArgs(args) {
		const opts = args[args.length - 1];
		if (typeof opts === "object" && opts.constructor === Object) {
			args.splice(args.length - 1, 1);
			return opts;
		} else return {};
	}
	/** @typedef { {capture?: boolean} } RegexEitherOptions */
	/**
	* Any of the passed expresssions may match
	*
	* Creates a huge this | this | that | that match
	* @param {(RegExp | string)[] | [...(RegExp | string)[], RegexEitherOptions]} args
	* @returns {string}
	*/
	function either(...args) {
		/** @type { object & {capture?: boolean} }  */
		const opts = stripOptionsFromArgs(args);
		const joined = "(" + (opts.capture ? "" : "?:") + args.map((x) => source(x)).join("|") + ")";
		return joined;
	}
	/**
	* @param {RegExp | string} re
	* @returns {number}
	*/
	function countMatchGroups(re) {
		return new RegExp(re.toString() + "|").exec("").length - 1;
	}
	/**
	* Does lexeme start with a regular expression match at the beginning
	* @param {RegExp} re
	* @param {string} lexeme
	*/
	function startsWith(re, lexeme) {
		const match = re && re.exec(lexeme);
		return match && match.index === 0;
	}
	const BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
	/**
	* @param {(string | RegExp)[]} regexps
	* @param {{joinWith: string}} opts
	* @returns {string}
	*/
	function _rewriteBackreferences(regexps, { joinWith }) {
		let numCaptures = 0;
		return regexps.map((regex) => {
			numCaptures += 1;
			const offset = numCaptures;
			let re = source(regex);
			let out = "";
			while (re.length > 0) {
				const match = BACKREF_RE.exec(re);
				if (!match) {
					out += re;
					break;
				}
				out += re.substring(0, match.index);
				re = re.substring(match.index + match[0].length);
				if (match[0][0] === "\\" && match[1]) out += "\\" + String(Number(match[1]) + offset);
else {
					out += match[0];
					if (match[0] === "(") numCaptures++;
				}
			}
			return out;
		}).map((re) => `(${re})`).join(joinWith);
	}
	/** @typedef {import('highlight.js').Mode} Mode */
	/** @typedef {import('highlight.js').ModeCallback} ModeCallback */
	const MATCH_NOTHING_RE = /\b\B/;
	const IDENT_RE = "[a-zA-Z]\\w*";
	const UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*";
	const NUMBER_RE = "\\b\\d+(\\.\\d+)?";
	const C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
	const BINARY_NUMBER_RE = "\\b(0b[01]+)";
	const RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
	/**
	* @param { Partial<Mode> & {binary?: string | RegExp} } opts
	*/
	const SHEBANG = (opts = {}) => {
		const beginShebang = /^#![ ]*\//;
		if (opts.binary) opts.begin = concat(beginShebang, /.*\b/, opts.binary, /\b.*/);
		return inherit$1({
			scope: "meta",
			begin: beginShebang,
			end: /$/,
			relevance: 0,
			"on:begin": (m, resp) => {
				if (m.index !== 0) resp.ignoreMatch();
			}
		}, opts);
	};
	const BACKSLASH_ESCAPE = {
		begin: "\\\\[\\s\\S]",
		relevance: 0
	};
	const APOS_STRING_MODE = {
		scope: "string",
		begin: "'",
		end: "'",
		illegal: "\\n",
		contains: [BACKSLASH_ESCAPE]
	};
	const QUOTE_STRING_MODE = {
		scope: "string",
		begin: "\"",
		end: "\"",
		illegal: "\\n",
		contains: [BACKSLASH_ESCAPE]
	};
	const PHRASAL_WORDS_MODE = { begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/ };
	/**
	* Creates a comment mode
	*
	* @param {string | RegExp} begin
	* @param {string | RegExp} end
	* @param {Mode | {}} [modeOptions]
	* @returns {Partial<Mode>}
	*/
	const COMMENT = function(begin, end, modeOptions = {}) {
		const mode = inherit$1({
			scope: "comment",
			begin,
			end,
			contains: []
		}, modeOptions);
		mode.contains.push({
			scope: "doctag",
			begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
			end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
			excludeBegin: true,
			relevance: 0
		});
		const ENGLISH_WORD = either(
			// list of common 1 and 2 letter words in English
			"I",
			"a",
			"is",
			"so",
			"us",
			"to",
			"at",
			"if",
			"in",
			"it",
			"on",
			// note: this is not an exhaustive list of contractions, just popular ones
			/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
			/[A-Za-z]+[-][a-z]+/,
			/[A-Za-z][a-z]{2,}/
);
		mode.contains.push({ begin: concat(/[ ]+/, "(", ENGLISH_WORD, /[.]?[:]?([.][ ]|[ ])/, "){3}") });
		return mode;
	};
	const C_LINE_COMMENT_MODE = COMMENT("//", "$");
	const C_BLOCK_COMMENT_MODE = COMMENT("/\\*", "\\*/");
	const HASH_COMMENT_MODE = COMMENT("#", "$");
	const NUMBER_MODE = {
		scope: "number",
		begin: NUMBER_RE,
		relevance: 0
	};
	const C_NUMBER_MODE = {
		scope: "number",
		begin: C_NUMBER_RE,
		relevance: 0
	};
	const BINARY_NUMBER_MODE = {
		scope: "number",
		begin: BINARY_NUMBER_RE,
		relevance: 0
	};
	const REGEXP_MODE = {
		scope: "regexp",
		begin: /\/(?=[^/\n]*\/)/,
		end: /\/[gimuy]*/,
		contains: [BACKSLASH_ESCAPE, {
			begin: /\[/,
			end: /\]/,
			relevance: 0,
			contains: [BACKSLASH_ESCAPE]
		}]
	};
	const TITLE_MODE = {
		scope: "title",
		begin: IDENT_RE,
		relevance: 0
	};
	const UNDERSCORE_TITLE_MODE = {
		scope: "title",
		begin: UNDERSCORE_IDENT_RE,
		relevance: 0
	};
	const METHOD_GUARD = {
		begin: "\\.\\s*" + UNDERSCORE_IDENT_RE,
		relevance: 0
	};
	/**
	* Adds end same as begin mechanics to a mode
	*
	* Your mode must include at least a single () match group as that first match
	* group is what is used for comparison
	* @param {Partial<Mode>} mode
	*/
	const END_SAME_AS_BEGIN = function(mode) {
		return Object.assign(mode, {
			"on:begin": (m, resp) => {
				resp.data._beginMatch = m[1];
			},
			"on:end": (m, resp) => {
				if (resp.data._beginMatch !== m[1]) resp.ignoreMatch();
			}
		});
	};
	var MODES$1 = /*#__PURE__*/ Object.freeze({
		__proto__: null,
		APOS_STRING_MODE,
		BACKSLASH_ESCAPE,
		BINARY_NUMBER_MODE,
		BINARY_NUMBER_RE,
		COMMENT,
		C_BLOCK_COMMENT_MODE,
		C_LINE_COMMENT_MODE,
		C_NUMBER_MODE,
		C_NUMBER_RE,
		END_SAME_AS_BEGIN,
		HASH_COMMENT_MODE,
		IDENT_RE,
		MATCH_NOTHING_RE,
		METHOD_GUARD,
		NUMBER_MODE,
		NUMBER_RE,
		PHRASAL_WORDS_MODE,
		QUOTE_STRING_MODE,
		REGEXP_MODE,
		RE_STARTERS_RE,
		SHEBANG,
		TITLE_MODE,
		UNDERSCORE_IDENT_RE,
		UNDERSCORE_TITLE_MODE
	});
	/**
	@typedef {import('highlight.js').CallbackResponse} CallbackResponse
	@typedef {import('highlight.js').CompilerExt} CompilerExt
	*/
	/**
	* Skip a match if it has a preceding dot
	*
	* This is used for `beginKeywords` to prevent matching expressions such as
	* `bob.keyword.do()`. The mode compiler automatically wires this up as a
	* special _internal_ 'on:begin' callback for modes with `beginKeywords`
	* @param {RegExpMatchArray} match
	* @param {CallbackResponse} response
	*/
	function skipIfHasPrecedingDot(match, response) {
		const before = match.input[match.index - 1];
		if (before === ".") response.ignoreMatch();
	}
	/**
	*
	* @type {CompilerExt}
	*/
	function scopeClassName(mode, _parent) {
		if (mode.className !== undefined) {
			mode.scope = mode.className;
			delete mode.className;
		}
	}
	/**
	* `beginKeywords` syntactic sugar
	* @type {CompilerExt}
	*/
	function beginKeywords(mode, parent) {
		if (!parent) return;
		if (!mode.beginKeywords) return;
		mode.begin = "\\b(" + mode.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)";
		mode.__beforeBegin = skipIfHasPrecedingDot;
		mode.keywords = mode.keywords || mode.beginKeywords;
		delete mode.beginKeywords;
		if (mode.relevance === undefined) mode.relevance = 0;
	}
	/**
	* Allow `illegal` to contain an array of illegal values
	* @type {CompilerExt}
	*/
	function compileIllegal(mode, _parent) {
		if (!Array.isArray(mode.illegal)) return;
		mode.illegal = either(...mode.illegal);
	}
	/**
	* `match` to match a single expression for readability
	* @type {CompilerExt}
	*/
	function compileMatch(mode, _parent) {
		if (!mode.match) return;
		if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");
		mode.begin = mode.match;
		delete mode.match;
	}
	/**
	* provides the default 1 relevance to all modes
	* @type {CompilerExt}
	*/
	function compileRelevance(mode, _parent) {
		if (mode.relevance === undefined) mode.relevance = 1;
	}
	const beforeMatchExt = (mode, parent) => {
		if (!mode.beforeMatch) return;
		if (mode.starts) throw new Error("beforeMatch cannot be used with starts");
		const originalMode = Object.assign({}, mode);
		Object.keys(mode).forEach((key) => {
			delete mode[key];
		});
		mode.keywords = originalMode.keywords;
		mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
		mode.starts = {
			relevance: 0,
			contains: [Object.assign(originalMode, { endsParent: true })]
		};
		mode.relevance = 0;
		delete originalMode.beforeMatch;
	};
	const COMMON_KEYWORDS = [
		"of",
		"and",
		"for",
		"in",
		"not",
		"or",
		"if",
		"then",
		"parent",
		"list",
		"value"
	];
	const DEFAULT_KEYWORD_SCOPE = "keyword";
	/**
	* Given raw keywords from a language definition, compile them.
	*
	* @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
	* @param {boolean} caseInsensitive
	*/
	function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
		/** @type {import("highlight.js/private").KeywordDict} */
		const compiledKeywords = Object.create(null);
		if (typeof rawKeywords === "string") compileList(scopeName, rawKeywords.split(" "));
else if (Array.isArray(rawKeywords)) compileList(scopeName, rawKeywords);
else Object.keys(rawKeywords).forEach(function(scopeName$1) {
			Object.assign(compiledKeywords, compileKeywords(rawKeywords[scopeName$1], caseInsensitive, scopeName$1));
		});
		return compiledKeywords;
		/**
		* Compiles an individual list of keywords
		*
		* Ex: "for if when while|5"
		*
		* @param {string} scopeName
		* @param {Array<string>} keywordList
		*/
		function compileList(scopeName$1, keywordList) {
			if (caseInsensitive) keywordList = keywordList.map((x) => x.toLowerCase());
			keywordList.forEach(function(keyword) {
				const pair = keyword.split("|");
				compiledKeywords[pair[0]] = [scopeName$1, scoreForKeyword(pair[0], pair[1])];
			});
		}
	}
	/**
	* Returns the proper score for a given keyword
	*
	* Also takes into account comment keywords, which will be scored 0 UNLESS
	* another score has been manually assigned.
	* @param {string} keyword
	* @param {string} [providedScore]
	*/
	function scoreForKeyword(keyword, providedScore) {
		if (providedScore) return Number(providedScore);
		return commonKeyword(keyword) ? 0 : 1;
	}
	/**
	* Determines if a given keyword is common or not
	*
	* @param {string} keyword */
	function commonKeyword(keyword) {
		return COMMON_KEYWORDS.includes(keyword.toLowerCase());
	}
	/**
	* @type {Record<string, boolean>}
	*/
	const seenDeprecations = {};
	/**
	* @param {string} message
	*/
	const error = (message) => {
		console.error(message);
	};
	/**
	* @param {string} message
	* @param {any} args
	*/
	const warn = (message, ...args) => {
		console.log(`WARN: ${message}`, ...args);
	};
	/**
	* @param {string} version
	* @param {string} message
	*/
	const deprecated = (version$1, message) => {
		if (seenDeprecations[`${version$1}/${message}`]) return;
		console.log(`Deprecated as of ${version$1}. ${message}`);
		seenDeprecations[`${version$1}/${message}`] = true;
	};
	/**
	@typedef {import('highlight.js').CompiledMode} CompiledMode
	*/
	const MultiClassError = new Error();
	/**
	* Renumbers labeled scope names to account for additional inner match
	* groups that otherwise would break everything.
	*
	* Lets say we 3 match scopes:
	*
	*   { 1 => ..., 2 => ..., 3 => ... }
	*
	* So what we need is a clean match like this:
	*
	*   (a)(b)(c) => [ "a", "b", "c" ]
	*
	* But this falls apart with inner match groups:
	*
	* (a)(((b)))(c) => ["a", "b", "b", "b", "c" ]
	*
	* Our scopes are now "out of alignment" and we're repeating `b` 3 times.
	* What needs to happen is the numbers are remapped:
	*
	*   { 1 => ..., 2 => ..., 5 => ... }
	*
	* We also need to know that the ONLY groups that should be output
	* are 1, 2, and 5.  This function handles this behavior.
	*
	* @param {CompiledMode} mode
	* @param {Array<RegExp | string>} regexes
	* @param {{key: "beginScope"|"endScope"}} opts
	*/
	function remapScopeNames(mode, regexes, { key }) {
		let offset = 0;
		const scopeNames = mode[key];
		/** @type Record<number,boolean> */
		const emit = {};
		/** @type Record<number,string> */
		const positions = {};
		for (let i = 1; i <= regexes.length; i++) {
			positions[i + offset] = scopeNames[i];
			emit[i + offset] = true;
			offset += countMatchGroups(regexes[i - 1]);
		}
		mode[key] = positions;
		mode[key]._emit = emit;
		mode[key]._multi = true;
	}
	/**
	* @param {CompiledMode} mode
	*/
	function beginMultiClass(mode) {
		if (!Array.isArray(mode.begin)) return;
		if (mode.skip || mode.excludeBegin || mode.returnBegin) {
			error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
			throw MultiClassError;
		}
		if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
			error("beginScope must be object");
			throw MultiClassError;
		}
		remapScopeNames(mode, mode.begin, { key: "beginScope" });
		mode.begin = _rewriteBackreferences(mode.begin, { joinWith: "" });
	}
	/**
	* @param {CompiledMode} mode
	*/
	function endMultiClass(mode) {
		if (!Array.isArray(mode.end)) return;
		if (mode.skip || mode.excludeEnd || mode.returnEnd) {
			error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
			throw MultiClassError;
		}
		if (typeof mode.endScope !== "object" || mode.endScope === null) {
			error("endScope must be object");
			throw MultiClassError;
		}
		remapScopeNames(mode, mode.end, { key: "endScope" });
		mode.end = _rewriteBackreferences(mode.end, { joinWith: "" });
	}
	/**
	* this exists only to allow `scope: {}` to be used beside `match:`
	* Otherwise `beginScope` would necessary and that would look weird
	
	{
	match: [ /def/, /\w+/ ]
	scope: { 1: "keyword" , 2: "title" }
	}
	
	* @param {CompiledMode} mode
	*/
	function scopeSugar(mode) {
		if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
			mode.beginScope = mode.scope;
			delete mode.scope;
		}
	}
	/**
	* @param {CompiledMode} mode
	*/
	function MultiClass(mode) {
		scopeSugar(mode);
		if (typeof mode.beginScope === "string") mode.beginScope = { _wrap: mode.beginScope };
		if (typeof mode.endScope === "string") mode.endScope = { _wrap: mode.endScope };
		beginMultiClass(mode);
		endMultiClass(mode);
	}
	/**
	@typedef {import('highlight.js').Mode} Mode
	@typedef {import('highlight.js').CompiledMode} CompiledMode
	@typedef {import('highlight.js').Language} Language
	@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
	@typedef {import('highlight.js').CompiledLanguage} CompiledLanguage
	*/
	/**
	* Compiles a language definition result
	*
	* Given the raw result of a language definition (Language), compiles this so
	* that it is ready for highlighting code.
	* @param {Language} language
	* @returns {CompiledLanguage}
	*/
	function compileLanguage(language) {
		/**
		* Builds a regex with the case sensitivity of the current language
		*
		* @param {RegExp | string} value
		* @param {boolean} [global]
		*/
		function langRe(value, global) {
			return new RegExp(source(value), "m" + (language.case_insensitive ? "i" : "") + (language.unicodeRegex ? "u" : "") + (global ? "g" : ""));
		}
		/**
		Stores multiple regular expressions and allows you to quickly search for
		them all in a string simultaneously - returning the first match.  It does
		this by creating a huge (a|b|c) regex - each individual item wrapped with ()
		and joined by `|` - using match groups to track position.  When a match is
		found checking which position in the array has content allows us to figure
		out which of the original regexes / match groups triggered the match.
		
		The match object itself (the result of `Regex.exec`) is returned but also
		enhanced by merging in any meta-data that was registered with the regex.
		This is how we keep track of which mode matched, and what type of rule
		(`illegal`, `begin`, end, etc).
		*/
		class MultiRegex {
			constructor() {
				this.matchIndexes = {};
				this.regexes = [];
				this.matchAt = 1;
				this.position = 0;
			}
			addRule(re, opts) {
				opts.position = this.position++;
				this.matchIndexes[this.matchAt] = opts;
				this.regexes.push([opts, re]);
				this.matchAt += countMatchGroups(re) + 1;
			}
			compile() {
				if (this.regexes.length === 0) this.exec = () => null;
				const terminators = this.regexes.map((el) => el[1]);
				this.matcherRe = langRe(_rewriteBackreferences(terminators, { joinWith: "|" }), true);
				this.lastIndex = 0;
			}
			/** @param {string} s */
			exec(s) {
				this.matcherRe.lastIndex = this.lastIndex;
				const match = this.matcherRe.exec(s);
				if (!match) return null;
				const i = match.findIndex((el, i$1) => i$1 > 0 && el !== undefined);
				const matchData = this.matchIndexes[i];
				match.splice(0, i);
				return Object.assign(match, matchData);
			}
		}
		class ResumableMultiRegex {
			constructor() {
				this.rules = [];
				this.multiRegexes = [];
				this.count = 0;
				this.lastIndex = 0;
				this.regexIndex = 0;
			}
			getMatcher(index) {
				if (this.multiRegexes[index]) return this.multiRegexes[index];
				const matcher = new MultiRegex();
				this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
				matcher.compile();
				this.multiRegexes[index] = matcher;
				return matcher;
			}
			resumingScanAtSamePosition() {
				return this.regexIndex !== 0;
			}
			considerAll() {
				this.regexIndex = 0;
			}
			addRule(re, opts) {
				this.rules.push([re, opts]);
				if (opts.type === "begin") this.count++;
			}
			/** @param {string} s */
			exec(s) {
				const m = this.getMatcher(this.regexIndex);
				m.lastIndex = this.lastIndex;
				let result = m.exec(s);
				if (this.resumingScanAtSamePosition()) if (result && result.index === this.lastIndex);
else {
					const m2 = this.getMatcher(0);
					m2.lastIndex = this.lastIndex + 1;
					result = m2.exec(s);
				}
				if (result) {
					this.regexIndex += result.position + 1;
					if (this.regexIndex === this.count) this.considerAll();
				}
				return result;
			}
		}
		/**
		* Given a mode, builds a huge ResumableMultiRegex that can be used to walk
		* the content and find matches.
		*
		* @param {CompiledMode} mode
		* @returns {ResumableMultiRegex}
		*/
		function buildModeRegex(mode) {
			const mm = new ResumableMultiRegex();
			mode.contains.forEach((term) => mm.addRule(term.begin, {
				rule: term,
				type: "begin"
			}));
			if (mode.terminatorEnd) mm.addRule(mode.terminatorEnd, { type: "end" });
			if (mode.illegal) mm.addRule(mode.illegal, { type: "illegal" });
			return mm;
		}
		/** skip vs abort vs ignore
		*
		* @skip   - The mode is still entered and exited normally (and contains rules apply),
		*           but all content is held and added to the parent buffer rather than being
		*           output when the mode ends.  Mostly used with `sublanguage` to build up
		*           a single large buffer than can be parsed by sublanguage.
		*
		*             - The mode begin ands ends normally.
		*             - Content matched is added to the parent mode buffer.
		*             - The parser cursor is moved forward normally.
		*
		* @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
		*           never matched) but DOES NOT continue to match subsequent `contains`
		*           modes.  Abort is bad/suboptimal because it can result in modes
		*           farther down not getting applied because an earlier rule eats the
		*           content but then aborts.
		*
		*             - The mode does not begin.
		*             - Content matched by `begin` is added to the mode buffer.
		*             - The parser cursor is moved forward accordingly.
		*
		* @ignore - Ignores the mode (as if it never matched) and continues to match any
		*           subsequent `contains` modes.  Ignore isn't technically possible with
		*           the current parser implementation.
		*
		*             - The mode does not begin.
		*             - Content matched by `begin` is ignored.
		*             - The parser cursor is not moved forward.
		*/
		/**
		* Compiles an individual mode
		*
		* This can raise an error if the mode contains certain detectable known logic
		* issues.
		* @param {Mode} mode
		* @param {CompiledMode | null} [parent]
		* @returns {CompiledMode | never}
		*/
		function compileMode(mode, parent) {
			const cmode = mode;
			if (mode.isCompiled) return cmode;
			[
				scopeClassName,
				compileMatch,
				MultiClass,
				beforeMatchExt
			].forEach((ext) => ext(mode, parent));
			language.compilerExtensions.forEach((ext) => ext(mode, parent));
			mode.__beforeBegin = null;
			[
				beginKeywords,
				compileIllegal,
				compileRelevance
			].forEach((ext) => ext(mode, parent));
			mode.isCompiled = true;
			let keywordPattern = null;
			if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
				mode.keywords = Object.assign({}, mode.keywords);
				keywordPattern = mode.keywords.$pattern;
				delete mode.keywords.$pattern;
			}
			keywordPattern = keywordPattern || /\w+/;
			if (mode.keywords) mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
			cmode.keywordPatternRe = langRe(keywordPattern, true);
			if (parent) {
				if (!mode.begin) mode.begin = /\B|\b/;
				cmode.beginRe = langRe(cmode.begin);
				if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
				if (mode.end) cmode.endRe = langRe(cmode.end);
				cmode.terminatorEnd = source(cmode.end) || "";
				if (mode.endsWithParent && parent.terminatorEnd) cmode.terminatorEnd += (mode.end ? "|" : "") + parent.terminatorEnd;
			}
			if (mode.illegal) cmode.illegalRe = langRe(mode.illegal);
			if (!mode.contains) mode.contains = [];
			mode.contains = [].concat(...mode.contains.map(function(c) {
				return expandOrCloneMode(c === "self" ? mode : c);
			}));
			mode.contains.forEach(function(c) {
				compileMode(c, cmode);
			});
			if (mode.starts) compileMode(mode.starts, parent);
			cmode.matcher = buildModeRegex(cmode);
			return cmode;
		}
		if (!language.compilerExtensions) language.compilerExtensions = [];
		if (language.contains && language.contains.includes("self")) throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
		language.classNameAliases = inherit$1(language.classNameAliases || {});
		return compileMode(language);
	}
	/**
	* Determines if a mode has a dependency on it's parent or not
	*
	* If a mode does have a parent dependency then often we need to clone it if
	* it's used in multiple places so that each copy points to the correct parent,
	* where-as modes without a parent can often safely be re-used at the bottom of
	* a mode chain.
	*
	* @param {Mode | null} mode
	* @returns {boolean} - is there a dependency on the parent?
	* */
	function dependencyOnParent(mode) {
		if (!mode) return false;
		return mode.endsWithParent || dependencyOnParent(mode.starts);
	}
	/**
	* Expands a mode or clones it if necessary
	*
	* This is necessary for modes with parental dependenceis (see notes on
	* `dependencyOnParent`) and for nodes that have `variants` - which must then be
	* exploded into their own individual modes at compile time.
	*
	* @param {Mode} mode
	* @returns {Mode | Mode[]}
	* */
	function expandOrCloneMode(mode) {
		if (mode.variants && !mode.cachedVariants) mode.cachedVariants = mode.variants.map(function(variant) {
			return inherit$1(mode, { variants: null }, variant);
		});
		if (mode.cachedVariants) return mode.cachedVariants;
		if (dependencyOnParent(mode)) return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });
		if (Object.isFrozen(mode)) return inherit$1(mode);
		return mode;
	}
	var version = "11.9.0";
	var HTMLInjectionError = class extends Error {
		constructor(reason, html) {
			super(reason);
			this.name = "HTMLInjectionError";
			this.html = html;
		}
	};
	/**
	@typedef {import('highlight.js').Mode} Mode
	@typedef {import('highlight.js').CompiledMode} CompiledMode
	@typedef {import('highlight.js').CompiledScope} CompiledScope
	@typedef {import('highlight.js').Language} Language
	@typedef {import('highlight.js').HLJSApi} HLJSApi
	@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
	@typedef {import('highlight.js').PluginEvent} PluginEvent
	@typedef {import('highlight.js').HLJSOptions} HLJSOptions
	@typedef {import('highlight.js').LanguageFn} LanguageFn
	@typedef {import('highlight.js').HighlightedHTMLElement} HighlightedHTMLElement
	@typedef {import('highlight.js').BeforeHighlightContext} BeforeHighlightContext
	@typedef {import('highlight.js/private').MatchType} MatchType
	@typedef {import('highlight.js/private').KeywordData} KeywordData
	@typedef {import('highlight.js/private').EnhancedMatch} EnhancedMatch
	@typedef {import('highlight.js/private').AnnotatedError} AnnotatedError
	@typedef {import('highlight.js').AutoHighlightResult} AutoHighlightResult
	@typedef {import('highlight.js').HighlightOptions} HighlightOptions
	@typedef {import('highlight.js').HighlightResult} HighlightResult
	*/
	const escape = escapeHTML;
	const inherit = inherit$1;
	const NO_MATCH = Symbol("nomatch");
	const MAX_KEYWORD_HITS = 7;
	/**
	* @param {any} hljs - object that is extended (legacy)
	* @returns {HLJSApi}
	*/
	const HLJS = function(hljs) {
		/** @type {Record<string, Language>} */
		const languages = Object.create(null);
		/** @type {Record<string, string>} */
		const aliases = Object.create(null);
		/** @type {HLJSPlugin[]} */
		const plugins = [];
		let SAFE_MODE = true;
		const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
		/** @type {Language} */
		const PLAINTEXT_LANGUAGE = {
			disableAutodetect: true,
			name: "Plain text",
			contains: []
		};
		/** @type HLJSOptions */
		let options = {
			ignoreUnescapedHTML: false,
			throwUnescapedHTML: false,
			noHighlightRe: /^(no-?highlight)$/i,
			languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
			classPrefix: "hljs-",
			cssSelector: "pre code",
			languages: null,
			__emitter: TokenTreeEmitter
		};
		/**
		* Tests a language name to see if highlighting should be skipped
		* @param {string} languageName
		*/
		function shouldNotHighlight(languageName) {
			return options.noHighlightRe.test(languageName);
		}
		/**
		* @param {HighlightedHTMLElement} block - the HTML element to determine language for
		*/
		function blockLanguage(block) {
			let classes$2 = block.className + " ";
			classes$2 += block.parentNode ? block.parentNode.className : "";
			const match = options.languageDetectRe.exec(classes$2);
			if (match) {
				const language = getLanguage(match[1]);
				if (!language) {
					warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
					warn("Falling back to no-highlight mode for this block.", block);
				}
				return language ? match[1] : "no-highlight";
			}
			return classes$2.split(/\s+/).find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
		}
		/**
		* Core highlighting function.
		*
		* OLD API
		* highlight(lang, code, ignoreIllegals, continuation)
		*
		* NEW API
		* highlight(code, {lang, ignoreIllegals})
		*
		* @param {string} codeOrLanguageName - the language to use for highlighting
		* @param {string | HighlightOptions} optionsOrCode - the code to highlight
		* @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
		*
		* @returns {HighlightResult} Result - an object that represents the result
		* @property {string} language - the language name
		* @property {number} relevance - the relevance score
		* @property {string} value - the highlighted HTML code
		* @property {string} code - the original raw code
		* @property {CompiledMode} top - top of the current mode stack
		* @property {boolean} illegal - indicates whether any illegal matches were found
		*/
		function highlight$1(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
			let code = "";
			let languageName = "";
			if (typeof optionsOrCode === "object") {
				code = codeOrLanguageName;
				ignoreIllegals = optionsOrCode.ignoreIllegals;
				languageName = optionsOrCode.language;
			} else {
				deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
				deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
				languageName = codeOrLanguageName;
				code = optionsOrCode;
			}
			if (ignoreIllegals === undefined) ignoreIllegals = true;
			/** @type {BeforeHighlightContext} */
			const context = {
				code,
				language: languageName
			};
			fire("before:highlight", context);
			const result = context.result ? context.result : _highlight(context.language, context.code, ignoreIllegals);
			result.code = context.code;
			fire("after:highlight", result);
			return result;
		}
		/**
		* private highlight that's used internally and does not fire callbacks
		*
		* @param {string} languageName - the language to use for highlighting
		* @param {string} codeToHighlight - the code to highlight
		* @param {boolean?} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
		* @param {CompiledMode?} [continuation] - current continuation mode, if any
		* @returns {HighlightResult} - result of the highlight operation
		*/
		function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
			const keywordHits = Object.create(null);
			/**
			* Return keyword data if a match is a keyword
			* @param {CompiledMode} mode - current mode
			* @param {string} matchText - the textual match
			* @returns {KeywordData | false}
			*/
			function keywordData(mode, matchText) {
				return mode.keywords[matchText];
			}
			function processKeywords() {
				if (!top.keywords) {
					emitter.addText(modeBuffer);
					return;
				}
				let lastIndex = 0;
				top.keywordPatternRe.lastIndex = 0;
				let match = top.keywordPatternRe.exec(modeBuffer);
				let buf = "";
				while (match) {
					buf += modeBuffer.substring(lastIndex, match.index);
					const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
					const data = keywordData(top, word);
					if (data) {
						const [kind, keywordRelevance] = data;
						emitter.addText(buf);
						buf = "";
						keywordHits[word] = (keywordHits[word] || 0) + 1;
						if (keywordHits[word] <= MAX_KEYWORD_HITS) relevance += keywordRelevance;
						if (kind.startsWith("_")) buf += match[0];
else {
							const cssClass = language.classNameAliases[kind] || kind;
							emitKeyword(match[0], cssClass);
						}
					} else buf += match[0];
					lastIndex = top.keywordPatternRe.lastIndex;
					match = top.keywordPatternRe.exec(modeBuffer);
				}
				buf += modeBuffer.substring(lastIndex);
				emitter.addText(buf);
			}
			function processSubLanguage() {
				if (modeBuffer === "") return;
				/** @type HighlightResult */
				let result$1 = null;
				if (typeof top.subLanguage === "string") {
					if (!languages[top.subLanguage]) {
						emitter.addText(modeBuffer);
						return;
					}
					result$1 = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
					continuations[top.subLanguage] = result$1._top;
				} else result$1 = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
				if (top.relevance > 0) relevance += result$1.relevance;
				emitter.__addSublanguage(result$1._emitter, result$1.language);
			}
			function processBuffer() {
				if (top.subLanguage != null) processSubLanguage();
else processKeywords();
				modeBuffer = "";
			}
			/**
			* @param {string} text
			* @param {string} scope
			*/
			function emitKeyword(keyword, scope) {
				if (keyword === "") return;
				emitter.startScope(scope);
				emitter.addText(keyword);
				emitter.endScope();
			}
			/**
			* @param {CompiledScope} scope
			* @param {RegExpMatchArray} match
			*/
			function emitMultiClass(scope, match) {
				let i = 1;
				const max = match.length - 1;
				while (i <= max) {
					if (!scope._emit[i]) {
						i++;
						continue;
					}
					const klass = language.classNameAliases[scope[i]] || scope[i];
					const text = match[i];
					if (klass) emitKeyword(text, klass);
else {
						modeBuffer = text;
						processKeywords();
						modeBuffer = "";
					}
					i++;
				}
			}
			/**
			* @param {CompiledMode} mode - new mode to start
			* @param {RegExpMatchArray} match
			*/
			function startNewMode(mode, match) {
				if (mode.scope && typeof mode.scope === "string") emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
				if (mode.beginScope) {
					if (mode.beginScope._wrap) {
						emitKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
						modeBuffer = "";
					} else if (mode.beginScope._multi) {
						emitMultiClass(mode.beginScope, match);
						modeBuffer = "";
					}
				}
				top = Object.create(mode, { parent: { value: top } });
				return top;
			}
			/**
			* @param {CompiledMode } mode - the mode to potentially end
			* @param {RegExpMatchArray} match - the latest match
			* @param {string} matchPlusRemainder - match plus remainder of content
			* @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
			*/
			function endOfMode(mode, match, matchPlusRemainder) {
				let matched = startsWith(mode.endRe, matchPlusRemainder);
				if (matched) {
					if (mode["on:end"]) {
						const resp = new Response(mode);
						mode["on:end"](match, resp);
						if (resp.isMatchIgnored) matched = false;
					}
					if (matched) {
						while (mode.endsParent && mode.parent) mode = mode.parent;
						return mode;
					}
				}
				if (mode.endsWithParent) return endOfMode(mode.parent, match, matchPlusRemainder);
			}
			/**
			* Handle matching but then ignoring a sequence of text
			*
			* @param {string} lexeme - string containing full match text
			*/
			function doIgnore(lexeme) {
				if (top.matcher.regexIndex === 0) {
					modeBuffer += lexeme[0];
					return 1;
				} else {
					resumeScanAtSamePosition = true;
					return 0;
				}
			}
			/**
			* Handle the start of a new potential mode match
			*
			* @param {EnhancedMatch} match - the current match
			* @returns {number} how far to advance the parse cursor
			*/
			function doBeginMatch(match) {
				const lexeme = match[0];
				const newMode = match.rule;
				const resp = new Response(newMode);
				const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
				for (const cb of beforeCallbacks) {
					if (!cb) continue;
					cb(match, resp);
					if (resp.isMatchIgnored) return doIgnore(lexeme);
				}
				if (newMode.skip) modeBuffer += lexeme;
else {
					if (newMode.excludeBegin) modeBuffer += lexeme;
					processBuffer();
					if (!newMode.returnBegin && !newMode.excludeBegin) modeBuffer = lexeme;
				}
				startNewMode(newMode, match);
				return newMode.returnBegin ? 0 : lexeme.length;
			}
			/**
			* Handle the potential end of mode
			*
			* @param {RegExpMatchArray} match - the current match
			*/
			function doEndMatch(match) {
				const lexeme = match[0];
				const matchPlusRemainder = codeToHighlight.substring(match.index);
				const endMode = endOfMode(top, match, matchPlusRemainder);
				if (!endMode) return NO_MATCH;
				const origin = top;
				if (top.endScope && top.endScope._wrap) {
					processBuffer();
					emitKeyword(lexeme, top.endScope._wrap);
				} else if (top.endScope && top.endScope._multi) {
					processBuffer();
					emitMultiClass(top.endScope, match);
				} else if (origin.skip) modeBuffer += lexeme;
else {
					if (!(origin.returnEnd || origin.excludeEnd)) modeBuffer += lexeme;
					processBuffer();
					if (origin.excludeEnd) modeBuffer = lexeme;
				}
				do {
					if (top.scope) emitter.closeNode();
					if (!top.skip && !top.subLanguage) relevance += top.relevance;
					top = top.parent;
				} while (top !== endMode.parent);
				if (endMode.starts) startNewMode(endMode.starts, match);
				return origin.returnEnd ? 0 : lexeme.length;
			}
			function processContinuations() {
				const list = [];
				for (let current = top; current !== language; current = current.parent) if (current.scope) list.unshift(current.scope);
				list.forEach((item) => emitter.openNode(item));
			}
			/** @type {{type?: MatchType, index?: number, rule?: Mode}}} */
			let lastMatch = {};
			/**
			*  Process an individual match
			*
			* @param {string} textBeforeMatch - text preceding the match (since the last match)
			* @param {EnhancedMatch} [match] - the match itself
			*/
			function processLexeme(textBeforeMatch, match) {
				const lexeme = match && match[0];
				modeBuffer += textBeforeMatch;
				if (lexeme == null) {
					processBuffer();
					return 0;
				}
				if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
					modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
					if (!SAFE_MODE) {
						/** @type {AnnotatedError} */
						const err = new Error(`0 width match regex (${languageName})`);
						err.languageName = languageName;
						err.badRule = lastMatch.rule;
						throw err;
					}
					return 1;
				}
				lastMatch = match;
				if (match.type === "begin") return doBeginMatch(match);
else if (match.type === "illegal" && !ignoreIllegals) {
					/** @type {AnnotatedError} */
					const err = new Error("Illegal lexeme \"" + lexeme + "\" for mode \"" + (top.scope || "<unnamed>") + "\"");
					err.mode = top;
					throw err;
				} else if (match.type === "end") {
					const processed = doEndMatch(match);
					if (processed !== NO_MATCH) return processed;
				}
				if (match.type === "illegal" && lexeme === "") return 1;
				if (iterations > 1e5 && iterations > match.index * 3) {
					const err = new Error("potential infinite loop, way more iterations than matches");
					throw err;
				}
				modeBuffer += lexeme;
				return lexeme.length;
			}
			const language = getLanguage(languageName);
			if (!language) {
				error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
				throw new Error("Unknown language: \"" + languageName + "\"");
			}
			const md = compileLanguage(language);
			let result = "";
			/** @type {CompiledMode} */
			let top = continuation || md;
			/** @type Record<string,CompiledMode> */
			const continuations = {};
			const emitter = new options.__emitter(options);
			processContinuations();
			let modeBuffer = "";
			let relevance = 0;
			let index = 0;
			let iterations = 0;
			let resumeScanAtSamePosition = false;
			try {
				if (!language.__emitTokens) {
					top.matcher.considerAll();
					for (;;) {
						iterations++;
						if (resumeScanAtSamePosition) resumeScanAtSamePosition = false;
else top.matcher.considerAll();
						top.matcher.lastIndex = index;
						const match = top.matcher.exec(codeToHighlight);
						if (!match) break;
						const beforeMatch = codeToHighlight.substring(index, match.index);
						const processedCount = processLexeme(beforeMatch, match);
						index = match.index + processedCount;
					}
					processLexeme(codeToHighlight.substring(index));
				} else language.__emitTokens(codeToHighlight, emitter);
				emitter.finalize();
				result = emitter.toHTML();
				return {
					language: languageName,
					value: result,
					relevance,
					illegal: false,
					_emitter: emitter,
					_top: top
				};
			} catch (err) {
				if (err.message && err.message.includes("Illegal")) return {
					language: languageName,
					value: escape(codeToHighlight),
					illegal: true,
					relevance: 0,
					_illegalBy: {
						message: err.message,
						index,
						context: codeToHighlight.slice(index - 100, index + 100),
						mode: err.mode,
						resultSoFar: result
					},
					_emitter: emitter
				};
else if (SAFE_MODE) return {
					language: languageName,
					value: escape(codeToHighlight),
					illegal: false,
					relevance: 0,
					errorRaised: err,
					_emitter: emitter,
					_top: top
				};
else throw err;
			}
		}
		/**
		* returns a valid highlight result, without actually doing any actual work,
		* auto highlight starts with this and it's possible for small snippets that
		* auto-detection may not find a better match
		* @param {string} code
		* @returns {HighlightResult}
		*/
		function justTextHighlightResult(code) {
			const result = {
				value: escape(code),
				illegal: false,
				relevance: 0,
				_top: PLAINTEXT_LANGUAGE,
				_emitter: new options.__emitter(options)
			};
			result._emitter.addText(code);
			return result;
		}
		/**
		Highlighting with language detection. Accepts a string with the code to
		highlight. Returns an object with the following properties:
		
		- language (detected language)
		- relevance (int)
		- value (an HTML string with highlighting markup)
		- secondBest (object with the same structure for second-best heuristically
		detected language, may be absent)
		
		@param {string} code
		@param {Array<string>} [languageSubset]
		@returns {AutoHighlightResult}
		*/
		function highlightAuto(code, languageSubset) {
			languageSubset = languageSubset || options.languages || Object.keys(languages);
			const plaintext = justTextHighlightResult(code);
			const results = languageSubset.filter(getLanguage).filter(autoDetection).map((name) => _highlight(name, code, false));
			results.unshift(plaintext);
			const sorted = results.sort((a, b) => {
				if (a.relevance !== b.relevance) return b.relevance - a.relevance;
				if (a.language && b.language) {
					if (getLanguage(a.language).supersetOf === b.language) return 1;
else if (getLanguage(b.language).supersetOf === a.language) return -1;
				}
				return 0;
			});
			const [best, secondBest] = sorted;
			/** @type {AutoHighlightResult} */
			const result = best;
			result.secondBest = secondBest;
			return result;
		}
		/**
		* Builds new class name for block given the language name
		*
		* @param {HTMLElement} element
		* @param {string} [currentLang]
		* @param {string} [resultLang]
		*/
		function updateClassName(element, currentLang, resultLang) {
			const language = currentLang && aliases[currentLang] || resultLang;
			element.classList.add("hljs");
			element.classList.add(`language-${language}`);
		}
		/**
		* Applies highlighting to a DOM node containing code.
		*
		* @param {HighlightedHTMLElement} element - the HTML element to highlight
		*/
		function highlightElement(element) {
			/** @type HTMLElement */
			let node = null;
			const language = blockLanguage(element);
			if (shouldNotHighlight(language)) return;
			fire("before:highlightElement", {
				el: element,
				language
			});
			if (element.dataset.highlighted) {
				console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", element);
				return;
			}
			if (element.children.length > 0) {
				if (!options.ignoreUnescapedHTML) {
					console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
					console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
					console.warn("The element with unescaped HTML:");
					console.warn(element);
				}
				if (options.throwUnescapedHTML) {
					const err = new HTMLInjectionError("One of your code blocks includes unescaped HTML.", element.innerHTML);
					throw err;
				}
			}
			node = element;
			const text = node.textContent;
			const result = language ? highlight$1(text, {
				language,
				ignoreIllegals: true
			}) : highlightAuto(text);
			element.innerHTML = result.value;
			element.dataset.highlighted = "yes";
			updateClassName(element, language, result.language);
			element.result = {
				language: result.language,
				re: result.relevance,
				relevance: result.relevance
			};
			if (result.secondBest) element.secondBest = {
				language: result.secondBest.language,
				relevance: result.secondBest.relevance
			};
			fire("after:highlightElement", {
				el: element,
				result,
				text
			});
		}
		/**
		* Updates highlight.js global options with the passed options
		*
		* @param {Partial<HLJSOptions>} userOptions
		*/
		function configure(userOptions) {
			options = inherit(options, userOptions);
		}
		const initHighlighting = () => {
			highlightAll();
			deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
		};
		function initHighlightingOnLoad() {
			highlightAll();
			deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
		}
		let wantsHighlight = false;
		/**
		* auto-highlights all pre>code elements on the page
		*/
		function highlightAll() {
			if (document.readyState === "loading") {
				wantsHighlight = true;
				return;
			}
			const blocks = document.querySelectorAll(options.cssSelector);
			blocks.forEach(highlightElement);
		}
		function boot() {
			if (wantsHighlight) highlightAll();
		}
		if (typeof window !== "undefined" && window.addEventListener) window.addEventListener("DOMContentLoaded", boot, false);
		/**
		* Register a language grammar module
		*
		* @param {string} languageName
		* @param {LanguageFn} languageDefinition
		*/
		function registerLanguage(languageName, languageDefinition) {
			let lang = null;
			try {
				lang = languageDefinition(hljs);
			} catch (error$1) {
				error("Language definition for '{}' could not be registered.".replace("{}", languageName));
				if (!SAFE_MODE) throw error$1;
else error(error$1);
				lang = PLAINTEXT_LANGUAGE;
			}
			if (!lang.name) lang.name = languageName;
			languages[languageName] = lang;
			lang.rawDefinition = languageDefinition.bind(null, hljs);
			if (lang.aliases) registerAliases(lang.aliases, { languageName });
		}
		/**
		* Remove a language grammar module
		*
		* @param {string} languageName
		*/
		function unregisterLanguage(languageName) {
			delete languages[languageName];
			for (const alias of Object.keys(aliases)) if (aliases[alias] === languageName) delete aliases[alias];
		}
		/**
		* @returns {string[]} List of language internal names
		*/
		function listLanguages() {
			return Object.keys(languages);
		}
		/**
		* @param {string} name - name of the language to retrieve
		* @returns {Language | undefined}
		*/
		function getLanguage(name) {
			name = (name || "").toLowerCase();
			return languages[name] || languages[aliases[name]];
		}
		/**
		*
		* @param {string|string[]} aliasList - single alias or list of aliases
		* @param {{languageName: string}} opts
		*/
		function registerAliases(aliasList, { languageName }) {
			if (typeof aliasList === "string") aliasList = [aliasList];
			aliasList.forEach((alias) => {
				aliases[alias.toLowerCase()] = languageName;
			});
		}
		/**
		* Determines if a given language has auto-detection enabled
		* @param {string} name - name of the language
		*/
		function autoDetection(name) {
			const lang = getLanguage(name);
			return lang && !lang.disableAutodetect;
		}
		/**
		* Upgrades the old highlightBlock plugins to the new
		* highlightElement API
		* @param {HLJSPlugin} plugin
		*/
		function upgradePluginAPI(plugin) {
			if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) plugin["before:highlightElement"] = (data) => {
				plugin["before:highlightBlock"](Object.assign({ block: data.el }, data));
			};
			if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) plugin["after:highlightElement"] = (data) => {
				plugin["after:highlightBlock"](Object.assign({ block: data.el }, data));
			};
		}
		/**
		* @param {HLJSPlugin} plugin
		*/
		function addPlugin(plugin) {
			upgradePluginAPI(plugin);
			plugins.push(plugin);
		}
		/**
		* @param {HLJSPlugin} plugin
		*/
		function removePlugin(plugin) {
			const index = plugins.indexOf(plugin);
			if (index !== -1) plugins.splice(index, 1);
		}
		/**
		*
		* @param {PluginEvent} event
		* @param {any} args
		*/
		function fire(event, args) {
			const cb = event;
			plugins.forEach(function(plugin) {
				if (plugin[cb]) plugin[cb](args);
			});
		}
		/**
		* DEPRECATED
		* @param {HighlightedHTMLElement} el
		*/
		function deprecateHighlightBlock(el) {
			deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
			deprecated("10.7.0", "Please use highlightElement now.");
			return highlightElement(el);
		}
		Object.assign(hljs, {
			highlight: highlight$1,
			highlightAuto,
			highlightAll,
			highlightElement,
			highlightBlock: deprecateHighlightBlock,
			configure,
			initHighlighting,
			initHighlightingOnLoad,
			registerLanguage,
			unregisterLanguage,
			listLanguages,
			getLanguage,
			registerAliases,
			autoDetection,
			inherit,
			addPlugin,
			removePlugin
		});
		hljs.debugMode = function() {
			SAFE_MODE = false;
		};
		hljs.safeMode = function() {
			SAFE_MODE = true;
		};
		hljs.versionString = version;
		hljs.regex = {
			concat,
			lookahead,
			either,
			optional,
			anyNumberOfTimes
		};
		for (const key in MODES$1) if (typeof MODES$1[key] === "object") deepFreeze(MODES$1[key]);
		Object.assign(hljs, MODES$1);
		return hljs;
	};
	const highlight = HLJS({});
	highlight.newInstance = () => HLJS({});
	module.exports = highlight;
	highlight.HighlightJS = highlight;
	highlight.default = highlight;
} });

//#endregion
//#region node_modules/.pnpm/highlight.js@11.9.0/node_modules/highlight.js/es/core.js
var import_core = __toESM(require_core(), 1);
var core_default = import_core.default;

//#endregion
//#region node_modules/.pnpm/highlight.js@11.9.0/node_modules/highlight.js/es/languages/css.js
const MODES = (hljs) => {
	return {
		IMPORTANT: {
			scope: "meta",
			begin: "!important"
		},
		BLOCK_COMMENT: hljs.C_BLOCK_COMMENT_MODE,
		HEXCOLOR: {
			scope: "number",
			begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
		},
		FUNCTION_DISPATCH: {
			className: "built_in",
			begin: /[\w-]+(?=\()/
		},
		ATTRIBUTE_SELECTOR_MODE: {
			scope: "selector-attr",
			begin: /\[/,
			end: /\]/,
			illegal: "$",
			contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
		},
		CSS_NUMBER_MODE: {
			scope: "number",
			begin: hljs.NUMBER_RE + "(" + "%|em|ex|ch|rem" + "|vw|vh|vmin|vmax" + "|cm|mm|in|pt|pc|px" + "|deg|grad|rad|turn" + "|s|ms" + "|Hz|kHz" + "|dpi|dpcm|dppx" + ")?",
			relevance: 0
		},
		CSS_VARIABLE: {
			className: "attr",
			begin: /--[A-Za-z_][A-Za-z0-9_-]*/
		}
	};
};
const TAGS = [
	"a",
	"abbr",
	"address",
	"article",
	"aside",
	"audio",
	"b",
	"blockquote",
	"body",
	"button",
	"canvas",
	"caption",
	"cite",
	"code",
	"dd",
	"del",
	"details",
	"dfn",
	"div",
	"dl",
	"dt",
	"em",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"header",
	"hgroup",
	"html",
	"i",
	"iframe",
	"img",
	"input",
	"ins",
	"kbd",
	"label",
	"legend",
	"li",
	"main",
	"mark",
	"menu",
	"nav",
	"object",
	"ol",
	"p",
	"q",
	"quote",
	"samp",
	"section",
	"span",
	"strong",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"tr",
	"ul",
	"var",
	"video"
];
const MEDIA_FEATURES = [
	"any-hover",
	"any-pointer",
	"aspect-ratio",
	"color",
	"color-gamut",
	"color-index",
	"device-aspect-ratio",
	"device-height",
	"device-width",
	"display-mode",
	"forced-colors",
	"grid",
	"height",
	"hover",
	"inverted-colors",
	"monochrome",
	"orientation",
	"overflow-block",
	"overflow-inline",
	"pointer",
	"prefers-color-scheme",
	"prefers-contrast",
	"prefers-reduced-motion",
	"prefers-reduced-transparency",
	"resolution",
	"scan",
	"scripting",
	"update",
	"width",
	"min-width",
	"max-width",
	"min-height",
	"max-height"
];
const PSEUDO_CLASSES = [
	"active",
	"any-link",
	"blank",
	"checked",
	"current",
	"default",
	"defined",
	"dir",
	"disabled",
	"drop",
	"empty",
	"enabled",
	"first",
	"first-child",
	"first-of-type",
	"fullscreen",
	"future",
	"focus",
	"focus-visible",
	"focus-within",
	"has",
	"host",
	"host-context",
	"hover",
	"indeterminate",
	"in-range",
	"invalid",
	"is",
	"lang",
	"last-child",
	"last-of-type",
	"left",
	"link",
	"local-link",
	"not",
	"nth-child",
	"nth-col",
	"nth-last-child",
	"nth-last-col",
	"nth-last-of-type",
	"nth-of-type",
	"only-child",
	"only-of-type",
	"optional",
	"out-of-range",
	"past",
	"placeholder-shown",
	"read-only",
	"read-write",
	"required",
	"right",
	"root",
	"scope",
	"target",
	"target-within",
	"user-invalid",
	"valid",
	"visited",
	"where"
];
const PSEUDO_ELEMENTS = [
	"after",
	"backdrop",
	"before",
	"cue",
	"cue-region",
	"first-letter",
	"first-line",
	"grammar-error",
	"marker",
	"part",
	"placeholder",
	"selection",
	"slotted",
	"spelling-error"
];
const ATTRIBUTES = [
	"align-content",
	"align-items",
	"align-self",
	"all",
	"animation",
	"animation-delay",
	"animation-direction",
	"animation-duration",
	"animation-fill-mode",
	"animation-iteration-count",
	"animation-name",
	"animation-play-state",
	"animation-timing-function",
	"backface-visibility",
	"background",
	"background-attachment",
	"background-blend-mode",
	"background-clip",
	"background-color",
	"background-image",
	"background-origin",
	"background-position",
	"background-repeat",
	"background-size",
	"block-size",
	"border",
	"border-block",
	"border-block-color",
	"border-block-end",
	"border-block-end-color",
	"border-block-end-style",
	"border-block-end-width",
	"border-block-start",
	"border-block-start-color",
	"border-block-start-style",
	"border-block-start-width",
	"border-block-style",
	"border-block-width",
	"border-bottom",
	"border-bottom-color",
	"border-bottom-left-radius",
	"border-bottom-right-radius",
	"border-bottom-style",
	"border-bottom-width",
	"border-collapse",
	"border-color",
	"border-image",
	"border-image-outset",
	"border-image-repeat",
	"border-image-slice",
	"border-image-source",
	"border-image-width",
	"border-inline",
	"border-inline-color",
	"border-inline-end",
	"border-inline-end-color",
	"border-inline-end-style",
	"border-inline-end-width",
	"border-inline-start",
	"border-inline-start-color",
	"border-inline-start-style",
	"border-inline-start-width",
	"border-inline-style",
	"border-inline-width",
	"border-left",
	"border-left-color",
	"border-left-style",
	"border-left-width",
	"border-radius",
	"border-right",
	"border-right-color",
	"border-right-style",
	"border-right-width",
	"border-spacing",
	"border-style",
	"border-top",
	"border-top-color",
	"border-top-left-radius",
	"border-top-right-radius",
	"border-top-style",
	"border-top-width",
	"border-width",
	"bottom",
	"box-decoration-break",
	"box-shadow",
	"box-sizing",
	"break-after",
	"break-before",
	"break-inside",
	"caption-side",
	"caret-color",
	"clear",
	"clip",
	"clip-path",
	"clip-rule",
	"color",
	"column-count",
	"column-fill",
	"column-gap",
	"column-rule",
	"column-rule-color",
	"column-rule-style",
	"column-rule-width",
	"column-span",
	"column-width",
	"columns",
	"contain",
	"content",
	"content-visibility",
	"counter-increment",
	"counter-reset",
	"cue",
	"cue-after",
	"cue-before",
	"cursor",
	"direction",
	"display",
	"empty-cells",
	"filter",
	"flex",
	"flex-basis",
	"flex-direction",
	"flex-flow",
	"flex-grow",
	"flex-shrink",
	"flex-wrap",
	"float",
	"flow",
	"font",
	"font-display",
	"font-family",
	"font-feature-settings",
	"font-kerning",
	"font-language-override",
	"font-size",
	"font-size-adjust",
	"font-smoothing",
	"font-stretch",
	"font-style",
	"font-synthesis",
	"font-variant",
	"font-variant-caps",
	"font-variant-east-asian",
	"font-variant-ligatures",
	"font-variant-numeric",
	"font-variant-position",
	"font-variation-settings",
	"font-weight",
	"gap",
	"glyph-orientation-vertical",
	"grid",
	"grid-area",
	"grid-auto-columns",
	"grid-auto-flow",
	"grid-auto-rows",
	"grid-column",
	"grid-column-end",
	"grid-column-start",
	"grid-gap",
	"grid-row",
	"grid-row-end",
	"grid-row-start",
	"grid-template",
	"grid-template-areas",
	"grid-template-columns",
	"grid-template-rows",
	"hanging-punctuation",
	"height",
	"hyphens",
	"icon",
	"image-orientation",
	"image-rendering",
	"image-resolution",
	"ime-mode",
	"inline-size",
	"isolation",
	"justify-content",
	"left",
	"letter-spacing",
	"line-break",
	"line-height",
	"list-style",
	"list-style-image",
	"list-style-position",
	"list-style-type",
	"margin",
	"margin-block",
	"margin-block-end",
	"margin-block-start",
	"margin-bottom",
	"margin-inline",
	"margin-inline-end",
	"margin-inline-start",
	"margin-left",
	"margin-right",
	"margin-top",
	"marks",
	"mask",
	"mask-border",
	"mask-border-mode",
	"mask-border-outset",
	"mask-border-repeat",
	"mask-border-slice",
	"mask-border-source",
	"mask-border-width",
	"mask-clip",
	"mask-composite",
	"mask-image",
	"mask-mode",
	"mask-origin",
	"mask-position",
	"mask-repeat",
	"mask-size",
	"mask-type",
	"max-block-size",
	"max-height",
	"max-inline-size",
	"max-width",
	"min-block-size",
	"min-height",
	"min-inline-size",
	"min-width",
	"mix-blend-mode",
	"nav-down",
	"nav-index",
	"nav-left",
	"nav-right",
	"nav-up",
	"none",
	"normal",
	"object-fit",
	"object-position",
	"opacity",
	"order",
	"orphans",
	"outline",
	"outline-color",
	"outline-offset",
	"outline-style",
	"outline-width",
	"overflow",
	"overflow-wrap",
	"overflow-x",
	"overflow-y",
	"padding",
	"padding-block",
	"padding-block-end",
	"padding-block-start",
	"padding-bottom",
	"padding-inline",
	"padding-inline-end",
	"padding-inline-start",
	"padding-left",
	"padding-right",
	"padding-top",
	"page-break-after",
	"page-break-before",
	"page-break-inside",
	"pause",
	"pause-after",
	"pause-before",
	"perspective",
	"perspective-origin",
	"pointer-events",
	"position",
	"quotes",
	"resize",
	"rest",
	"rest-after",
	"rest-before",
	"right",
	"row-gap",
	"scroll-margin",
	"scroll-margin-block",
	"scroll-margin-block-end",
	"scroll-margin-block-start",
	"scroll-margin-bottom",
	"scroll-margin-inline",
	"scroll-margin-inline-end",
	"scroll-margin-inline-start",
	"scroll-margin-left",
	"scroll-margin-right",
	"scroll-margin-top",
	"scroll-padding",
	"scroll-padding-block",
	"scroll-padding-block-end",
	"scroll-padding-block-start",
	"scroll-padding-bottom",
	"scroll-padding-inline",
	"scroll-padding-inline-end",
	"scroll-padding-inline-start",
	"scroll-padding-left",
	"scroll-padding-right",
	"scroll-padding-top",
	"scroll-snap-align",
	"scroll-snap-stop",
	"scroll-snap-type",
	"scrollbar-color",
	"scrollbar-gutter",
	"scrollbar-width",
	"shape-image-threshold",
	"shape-margin",
	"shape-outside",
	"speak",
	"speak-as",
	"src",
	"tab-size",
	"table-layout",
	"text-align",
	"text-align-all",
	"text-align-last",
	"text-combine-upright",
	"text-decoration",
	"text-decoration-color",
	"text-decoration-line",
	"text-decoration-style",
	"text-emphasis",
	"text-emphasis-color",
	"text-emphasis-position",
	"text-emphasis-style",
	"text-indent",
	"text-justify",
	"text-orientation",
	"text-overflow",
	"text-rendering",
	"text-shadow",
	"text-transform",
	"text-underline-position",
	"top",
	"transform",
	"transform-box",
	"transform-origin",
	"transform-style",
	"transition",
	"transition-delay",
	"transition-duration",
	"transition-property",
	"transition-timing-function",
	"unicode-bidi",
	"vertical-align",
	"visibility",
	"voice-balance",
	"voice-duration",
	"voice-family",
	"voice-pitch",
	"voice-range",
	"voice-rate",
	"voice-stress",
	"voice-volume",
	"white-space",
	"widows",
	"width",
	"will-change",
	"word-break",
	"word-spacing",
	"word-wrap",
	"writing-mode",
	"z-index"
].reverse();
/** @type LanguageFn */
function css$2(hljs) {
	const regex = hljs.regex;
	const modes = MODES(hljs);
	const VENDOR_PREFIX = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ };
	const AT_MODIFIERS = "and or not only";
	const AT_PROPERTY_RE = /@-?\w[\w]*(-\w+)*/;
	const IDENT_RE$1 = "[a-zA-Z-][a-zA-Z0-9_-]*";
	const STRINGS = [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE];
	return {
		name: "CSS",
		case_insensitive: true,
		illegal: /[=|'\$]/,
		keywords: { keyframePosition: "from to" },
		classNameAliases: { keyframePosition: "selector-tag" },
		contains: [
			modes.BLOCK_COMMENT,
			VENDOR_PREFIX,
			modes.CSS_NUMBER_MODE,
			{
				className: "selector-id",
				begin: /#[A-Za-z0-9_-]+/,
				relevance: 0
			},
			{
				className: "selector-class",
				begin: "\\." + IDENT_RE$1,
				relevance: 0
			},
			modes.ATTRIBUTE_SELECTOR_MODE,
			{
				className: "selector-pseudo",
				variants: [{ begin: ":(" + PSEUDO_CLASSES.join("|") + ")" }, { begin: ":(:)?(" + PSEUDO_ELEMENTS.join("|") + ")" }]
			},
			modes.CSS_VARIABLE,
			{
				className: "attribute",
				begin: "\\b(" + ATTRIBUTES.join("|") + ")\\b"
			},
			{
				begin: /:/,
				end: /[;}{]/,
				contains: [
					modes.BLOCK_COMMENT,
					modes.HEXCOLOR,
					modes.IMPORTANT,
					modes.CSS_NUMBER_MODE,
					...STRINGS,
					{
						begin: /(url|data-uri)\(/,
						end: /\)/,
						relevance: 0,
						keywords: { built_in: "url data-uri" },
						contains: [...STRINGS, {
							className: "string",
							begin: /[^)]/,
							endsWithParent: true,
							excludeEnd: true
						}]
					},
					modes.FUNCTION_DISPATCH
				]
			},
			{
				begin: regex.lookahead(/@/),
				end: "[{;]",
				relevance: 0,
				illegal: /:/,
				contains: [{
					className: "keyword",
					begin: AT_PROPERTY_RE
				}, {
					begin: /\s/,
					endsWithParent: true,
					excludeEnd: true,
					relevance: 0,
					keywords: {
						$pattern: /[a-z-]+/,
						keyword: AT_MODIFIERS,
						attribute: MEDIA_FEATURES.join(" ")
					},
					contains: [
						{
							begin: /[a-z-]+(?=:)/,
							className: "attribute"
						},
						...STRINGS,
						modes.CSS_NUMBER_MODE
					]
				}]
			},
			{
				className: "selector-tag",
				begin: "\\b(" + TAGS.join("|") + ")\\b"
			}
		]
	};
}

//#endregion
//#region plugins/inline-css/components/Editor.scss
const classes$1 = {
	"ceditor": "alHKPa_ceditor",
	"controls": "alHKPa_controls",
	"popout": "alHKPa_popout"
};
const css$1 = `.alHKPa_ceditor {
  background: var(--input-background);
  border-radius: 5px;
  margin-top: 28px;
  padding: 12px;
  height: 80vh !important;
}

.alHKPa_ceditor > div {
  height: 100% !important;
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

.alHKPa_popout {
  margin-top: 12px;
  width: 100% !important;
}

.alHKPa_popout svg {
  width: 30px;
  height: 50%;
}

.alHKPa_ceditor textarea {
  cursor: auto;
  color: #0000;
  height: 100% !important;
}

.alHKPa_ceditor textarea::-webkit-scrollbar-corner {
  background: none;
}

.alHKPa_ceditor textarea::-webkit-scrollbar {
  background: none;
}

.alHKPa_ceditor textarea::-webkit-scrollbar-track {
  background: none;
}

.alHKPa_ceditor textarea::-webkit-scrollbar-thumb {
  background: var(--primary-530);
  border-radius: 4px;
}

.alHKPa_ceditor textarea::-webkit-scrollbar:horizontal {
  height: 8px;
}

.alHKPa_ceditor textarea::-webkit-scrollbar:vertical {
  width: 8px;
}

.alHKPa_ceditor div[class*="styles-"] {
  width: 100% !important;
  height: 100% !important;
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
var import_web$20 = __toESM(require_web(), 1);
var import_web$21 = __toESM(require_web(), 1);
const _tmpl$$3 = /*#__PURE__*/ (0, import_web$20.template)(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve"><defs></defs><g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"><path d="M 85 35.661 c -2.762 0 -5 -2.239 -5 -5 V 10 H 59.339 c -2.762 0 -5 -2.239 -5 -5 s 2.238 -5 5 -5 H 85 c 2.762 0 5 2.239 5 5 v 25.661 C 90 33.422 87.762 35.661 85 35.661 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path><path d="M 33.678 61.322 c -1.28 0 -2.559 -0.488 -3.536 -1.465 c -1.953 -1.952 -1.953 -5.118 0 -7.07 L 81.465 1.464 c 1.951 -1.952 5.119 -1.952 7.07 0 c 1.953 1.953 1.953 5.119 0 7.071 L 37.214 59.857 C 36.237 60.834 34.958 61.322 33.678 61.322 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path><path d="M 74.394 90 H 15.606 C 7.001 90 0 82.999 0 74.394 V 15.606 C 0 7.001 7.001 0 15.606 0 h 18.072 c 2.761 0 5 2.239 5 5 s -2.239 5 -5 5 H 15.606 C 12.515 10 10 12.515 10 15.606 v 58.787 C 10 77.485 12.515 80 15.606 80 h 58.787 C 77.485 80 80 77.485 80 74.394 V 56.322 c 0 -2.762 2.238 -5 5 -5 s 5 2.238 5 5 v 18.071 C 90 82.999 82.999 90 74.394 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path></g></svg>`, 12);
const Popout = () => (0, import_web$21.getNextElement)(_tmpl$$3);

//#endregion
//#region plugins/inline-css/components/Window.scss
const classes = {
	"main": "EVeMMG_main",
	"window": "EVeMMG_window",
	"resize": "EVeMMG_resize",
	"content": "EVeMMG_content",
	"inner": "EVeMMG_inner",
	"topbar": "EVeMMG_topbar",
	"exit": "EVeMMG_exit"
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
  box-shadow: 0 0 3px #000;
}

.EVeMMG_content .EVeMMG_inner {
  height: calc(100% - 50px);
  margin: 8px;
  overflow-y: auto;
}

.EVeMMG_content .EVeMMG_inner::-webkit-scrollbar-corner {
  background: none;
}

.EVeMMG_content .EVeMMG_inner::-webkit-scrollbar {
  background: none;
}

.EVeMMG_content .EVeMMG_inner::-webkit-scrollbar-track {
  background: none;
}

.EVeMMG_content .EVeMMG_inner::-webkit-scrollbar-thumb {
  background: var(--input-background);
  border-radius: 4px;
}

.EVeMMG_content .EVeMMG_inner::-webkit-scrollbar:horizontal {
  height: 8px;
}

.EVeMMG_content .EVeMMG_inner::-webkit-scrollbar:vertical {
  width: 8px;
}

.EVeMMG_topbar {
  background: var(--input-background);
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
  margin-right: 10px;
}
`;

//#endregion
//#region plugins/inline-css/components/Close.tsx
var import_web$18 = __toESM(require_web(), 1);
var import_web$19 = __toESM(require_web(), 1);
const _tmpl$$2 = /*#__PURE__*/ (0, import_web$18.template)(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve"><defs></defs><g style="
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
const Close = () => (0, import_web$19.getNextElement)(_tmpl$$2);

//#endregion
//#region plugins/inline-css/components/Window.tsx
var import_web$9 = __toESM(require_web(), 1);
var import_web$10 = __toESM(require_web(), 1);
var import_web$11 = __toESM(require_web(), 1);
var import_web$12 = __toESM(require_web(), 1);
var import_web$13 = __toESM(require_web(), 1);
var import_web$14 = __toESM(require_web(), 1);
var import_web$15 = __toESM(require_web(), 1);
var import_web$16 = __toESM(require_web(), 1);
var import_web$17 = __toESM(require_web(), 1);
const _tmpl$$1 = /*#__PURE__*/ (0, import_web$9.template)(`<div><div></div><div><div><div></div></div><div><div></div></div></div></div>`, 14);
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
		const _el$ = (0, import_web$13.getNextElement)(_tmpl$$1), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.firstChild, _el$5 = _el$4.firstChild, _el$6 = _el$4.nextSibling, _el$7 = _el$6.firstChild;
		const _ref$ = ref;
		typeof _ref$ === "function" ? (0, import_web$17.use)(_ref$, _el$) : ref = _el$;
		_el$.style.setProperty("height", "400px");
		_el$.style.setProperty("width", "30vw");
		_el$2.$$mousedown = resizeMouseDown;
		_el$4.$$mousedown = topbarMouseDown;
		_el$5.$$click = close;
		(0, import_web$15.insert)(_el$5, (0, import_web$16.createComponent)(Close, {}));
		(0, import_web$15.insert)(_el$7, (0, import_web$16.createComponent)(Editor_default, {
			get styleElm() {
				return document.getElementById("inline-css-output");
			},
			popout: true
		}));
		(0, import_web$12.effect)((_p$) => {
			const _v$ = classes.window, _v$2 = classes.resize, _v$3 = classes.content, _v$4 = classes.topbar, _v$5 = classes.exit, _v$6 = classes.inner, _v$7 = classes.main;
			_v$ !== _p$._v$ && (0, import_web$11.className)(_el$, _p$._v$ = _v$);
			_v$2 !== _p$._v$2 && (0, import_web$11.className)(_el$2, _p$._v$2 = _v$2);
			_v$3 !== _p$._v$3 && (0, import_web$11.className)(_el$3, _p$._v$3 = _v$3);
			_v$4 !== _p$._v$4 && (0, import_web$11.className)(_el$4, _p$._v$4 = _v$4);
			_v$5 !== _p$._v$5 && (0, import_web$11.className)(_el$5, _p$._v$5 = _v$5);
			_v$6 !== _p$._v$6 && (0, import_web$11.className)(_el$6, _p$._v$6 = _v$6);
			_v$7 !== _p$._v$7 && (0, import_web$11.className)(_el$7, _p$._v$7 = _v$7);
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
		(0, import_web$14.runHydrationEvents)();
		return _el$;
	})();
};
(0, import_web$10.delegateEvents)(["mousedown", "click"]);

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
const _tmpl$ = /*#__PURE__*/ (0, import_web.template)(`<div><!#><!/><!#><!/></div>`, 6), _tmpl$2 = /*#__PURE__*/ (0, import_web.template)(`<div></div>`, 2);
core_default.registerLanguage("css", css$2);
const { ui: { injectCss, Header, HeaderTags, Button, CheckboxItem }, plugin: { store: store$1 }, solid: { createSignal, createEffect }, flux: { dispatcher } } = shelter;
const saveCss = debounce((css$3, styleElm$1) => {
	store$1.inlineCss = css$3;
	if (styleElm$1) styleElm$1.textContent = css$3;
}, 500);
let injectedCss = false;
function Editor_default(props) {
	let ref = null;
	if (!injectedCss) {
		injectCss(css$1);
		injectedCss = true;
	}
	const [inlineCss, setInlineCss] = createSignal("");
	const [hotReload, setHotReload] = createSignal(true);
	createEffect(() => {
		setInlineCss(store$1.inlineCss);
	});
	const setCss = (css$3) => {
		if (ref) {
			const textarea = ref.querySelector("textarea");
			if (textarea && textarea.scrollTop !== textarea.scrollHeight) textarea.scrollTop = textarea.scrollHeight;
		}
		setInlineCss(css$3);
		saveCss(css$3, props.styleElm);
	};
	return [
		(0, import_web$8.createComponent)(Header, {
			get tag() {
				return HeaderTags.H1;
			},
			children: "CSS Editor"
		}),
		(0, import_web$7.memo)((() => {
			const _c$ = (0, import_web$7.memo)(() => !!!props.popout);
			return () => _c$() && (0, import_web$8.createComponent)(Button, {
				get ["class"]() {
					return classes$1.popout;
				},
				onClick: () => {
					document.body.appendChild(Window());
					dispatcher.dispatch({ type: "LAYER_POP" });
				},
				get children() {
					return ["Pop Out ", (0, import_web$8.createComponent)(Popout, {})];
				}
			});
		})()),
		(() => {
			const _el$ = (0, import_web$4.getNextElement)(_tmpl$), _el$2 = _el$.firstChild, [_el$3, _co$] = (0, import_web$5.getNextMarker)(_el$2.nextSibling), _el$4 = _el$3.nextSibling, [_el$5, _co$2] = (0, import_web$5.getNextMarker)(_el$4.nextSibling);
			(0, import_web$6.insert)(_el$, (0, import_web$8.createComponent)(CheckboxItem, {
				get checked() {
					return hotReload();
				},
				onChange: setHotReload,
				children: "Hot Reload"
			}), _el$3, _co$);
			(0, import_web$6.insert)(_el$, (0, import_web$8.createComponent)(Button, {
				onClick: () => {
					setCss(inlineCss());
				},
				get disabled() {
					return hotReload();
				},
				children: "Save & Apply"
			}), _el$5, _co$2);
			(0, import_web$3.effect)(() => (0, import_web$2.className)(_el$, classes$1.controls));
			return _el$;
		})(),
		(() => {
			const _el$6 = (0, import_web$4.getNextElement)(_tmpl$2);
			const _ref$ = ref;
			typeof _ref$ === "function" ? (0, import_web$1.use)(_ref$, _el$6) : ref = _el$6;
			(0, import_web$6.insert)(_el$6, (0, import_web$8.createComponent)(CodeInput, {
				highlightjs: core_default,
				autoHeight: false,
				resize: "none",
				placeholder: "Enter any CSS here...",
				get onChange() {
					return hotReload() ? setCss : setInlineCss;
				},
				get value() {
					return inlineCss();
				},
				language: "css"
			}));
			(0, import_web$3.effect)(() => (0, import_web$2.className)(_el$6, classes$1.ceditor));
			return _el$6;
		})()
	];
}

//#endregion
//#region plugins/inline-css/index.tsx
const { settings: { registerSection }, plugin: { store } } = shelter;
let styleElm = null;
const style = document.createElement("style");
style.textContent = ".code-highlighted { color: var(--text-default) }";
styleElm = document.body.appendChild(style);
let inlineStyleElm = null;
const inlineStyle = document.createElement("style");
inlineStyle.id = "inline-css-output";
inlineStyleElm = document.body.appendChild(inlineStyle);
inlineStyleElm.textContent = store.inlineCss;
const unload = registerSection("section", "inline-css", "CSS Editor", () => Editor_default({ styleElm: inlineStyleElm }));
const onUnload = () => {
	unload();
	if (styleElm) styleElm.remove();
	if (inlineStyleElm) inlineStyleElm.remove();
};

//#endregion
exports.onUnload = onUnload
return exports;
})({});