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
//#region plugins/launch-redirect/index.scss
const classes = {
	"dot": "osDxmG_dot",
	"selected": "osDxmG_selected",
	"label": "osDxmG_label",
	"row": "osDxmG_row"
};
const css = `.osDxmG_row {
  cursor: pointer;
  color: var(--interactive-normal);
  border-radius: 4px;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  padding: 6px 8px;
  display: flex;
}

.osDxmG_row:hover {
  background: var(--background-mod-subtle);
}

.osDxmG_row .osDxmG_dot {
  border: 2px solid var(--checkbox-border-default);
  border-radius: 50%;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.osDxmG_row .osDxmG_label {
  font-size: 14px;
}

.osDxmG_row.osDxmG_selected {
  color: var(--interactive-active);
  background: var(--background-mod-subtle);
}

.osDxmG_row.osDxmG_selected .osDxmG_dot {
  background: var(--background-brand);
  border-color: #0000;
  position: relative;
}

.osDxmG_row.osDxmG_selected .osDxmG_dot:after {
  content: "";
  background: #fff;
  border-radius: 50%;
  position: absolute;
  inset: 4px;
}
`;

//#endregion
//#region plugins/launch-redirect/index.tsx
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
const _tmpl$ = /*#__PURE__*/ (0, import_web.template)(`<div><!#><!/><!#><!/></div>`, 6), _tmpl$2 = /*#__PURE__*/ (0, import_web.template)(`<div><div></div><div></div></div>`, 6);
const { plugin: { store, scoped }, solid: { createSignal }, util: { getFiber }, flux: { storesFlat }, ui: { Header, HeaderTags, Select, SelectOption, injectCss } } = shelter;
const MODES = [
	{
		label: "Discord default",
		value: "off"
	},
	{
		label: "Direct Messages",
		value: "dms"
	},
	{
		label: "Quests",
		value: "quests"
	},
	{
		label: "Nitro",
		value: "nitro"
	},
	{
		label: "Shop",
		value: "shop"
	},
	{
		label: "Server",
		value: "guild"
	}
];
const HOME_ROUTES = {
	dms: "/channels/@me",
	quests: "/quest-home",
	nitro: "/store",
	shop: "/shop"
};
const LAUNCH_ROUTES = [
	"/app",
	"/",
	"/channels/@me",
	"/quest-home",
	"/store",
	"/shop"
];
injectCss(css);
injectCss(`
  [class*="wrap"]:has(> [role=combobox]) {
    anchor-name: --shelter-select;
  }

  [class*="wrap"]:not([class*="open"]) > [role=listbox] {
    max-height: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }

  [class*="wrap"] > [role=listbox] {
    position: fixed !important;
    top: calc(anchor(--shelter-select bottom) + 4px) !important;
    left: anchor(--shelter-select left) !important;
    z-index: 10000 !important;
  }
`);
function targetPath() {
	const mode = store.mode ?? "off";
	if (mode === "off") return null;
	if (mode !== "guild") return HOME_ROUTES[mode];
	const guildId = store.guildId;
	if (!guildId || !storesFlat.GuildStore.getGuild(guildId)) return null;
	const channelId = store.channelId;
	if (channelId && storesFlat.ChannelStore.hasChannel(channelId)) return `/channels/${guildId}/${channelId}`;
	return `/channels/${guildId}`;
}
function findNavigator() {
	const mount = document.getElementById("app-mount");
	if (!mount) return null;
	for (const child of mount.children) {
		let node = getFiber(child);
		while (node) {
			const props = node.memoizedProps;
			if (props && props.navigator) return props.navigator;
			node = node.return;
		}
	}
	return null;
}
let nav = null;
let origPush = null;
let origReplace = null;
let pollTimer = null;
let armTimer = null;
let launchDone = false;
let armed = false;
function rewrite() {
	if (launchDone) return null;
	launchDone = true;
	if (!LAUNCH_ROUTES.includes(location.pathname)) return null;
	const target = targetPath();
	if (target && target !== location.pathname) return target;
	if (store.mode === "guild" && store.guildId && !storesFlat.GuildStore.getGuild(store.guildId)) armed = true;
	return null;
}
function patch(navigator) {
	nav = navigator;
	origPush = navigator.push;
	origReplace = navigator.replace;
	navigator.push = (to, ...rest) => {
		armed = false;
		const target = rewrite();
		return target ? origPush(target, ...rest) : origPush(to, ...rest);
	};
	navigator.replace = (to, ...rest) => {
		armed = false;
		const target = rewrite();
		return target ? origReplace(target, ...rest) : origReplace(to, ...rest);
	};
	if (location.pathname !== "/app") {
		const target = rewrite();
		if (target) navigator.replace(target);
	}
	if (store.mode === "guild") armTimer = setInterval(() => {
		if (!armed) {
			clearInterval(armTimer);
			armTimer = null;
			return;
		}
		const target = targetPath();
		if (target && target !== location.pathname) {
			armed = false;
			navigator.replace(target);
			clearInterval(armTimer);
			armTimer = null;
		}
	}, 250);
}
function start() {
	const navigator = findNavigator();
	if (navigator) return patch(navigator);
	pollTimer = setInterval(() => {
		const navigator$1 = findNavigator();
		if (navigator$1) {
			clearInterval(pollTimer);
			pollTimer = null;
			patch(navigator$1);
		}
	}, 50);
}
scoped.onDispose(() => {
	if (pollTimer) clearInterval(pollTimer);
	if (armTimer) clearInterval(armTimer);
	if (nav) {
		nav.push = origPush;
		nav.replace = origReplace;
	}
});
start();
const settings = () => {
	const [mode, setMode] = createSignal(store.mode ?? "off");
	const [guildId, setGuildId] = createSignal(store.guildId ?? "");
	const [channelId, setChannelId] = createSignal(store.channelId ?? "");
	const guilds = () => storesFlat.GuildStore.getGuildIds().map((id) => storesFlat.GuildStore.getGuild(id)).filter((g) => g).sort((a, b) => a.name.localeCompare(b.name));
	const channels = () => guildId() ? (storesFlat.GuildChannelStore.getSelectableChannels(guildId()) ?? []).map((c) => c.channel).filter((c) => c && c.type !== 4) : [];
	const fitPopper = (e) => {
		const wrap = e.currentTarget;
		const lb = wrap.querySelector("[role=listbox]");
		if (lb) lb.style.width = `${wrap.offsetWidth}px`;
	};
	const pick = (m) => {
		setMode(m);
		store.mode = m;
	};
	return (() => {
		const _el$ = (0, import_web$6.getNextElement)(_tmpl$), _el$2 = _el$.firstChild, [_el$3, _co$] = (0, import_web$7.getNextMarker)(_el$2.nextSibling), _el$4 = _el$3.nextSibling, [_el$5, _co$2] = (0, import_web$7.getNextMarker)(_el$4.nextSibling);
		_el$.style.setProperty("padding", "4px 8px");
		(0, import_web$8.insert)(_el$, () => MODES.map((m) => (() => {
			const _el$6 = (0, import_web$6.getNextElement)(_tmpl$2), _el$7 = _el$6.firstChild, _el$8 = _el$7.nextSibling;
			_el$6.$$click = () => pick(m.value);
			(0, import_web$8.insert)(_el$8, () => m.label);
			(0, import_web$4.effect)((_p$) => {
				const _v$ = `${classes.row}${mode() === m.value ? ` ${classes.selected}` : ""}`, _v$2 = classes.dot, _v$3 = classes.label;
				_v$ !== _p$._v$ && (0, import_web$3.className)(_el$6, _p$._v$ = _v$);
				_v$2 !== _p$._v$2 && (0, import_web$3.className)(_el$7, _p$._v$2 = _v$2);
				_v$3 !== _p$._v$3 && (0, import_web$3.className)(_el$8, _p$._v$3 = _v$3);
				return _p$;
			}, {
				_v$: undefined,
				_v$2: undefined,
				_v$3: undefined
			});
			(0, import_web$5.runHydrationEvents)();
			return _el$6;
		})()), _el$3, _co$);
		(0, import_web$8.insert)(_el$, (() => {
			const _c$ = (0, import_web$9.memo)(() => mode() === "guild");
			return () => _c$() && [
				(0, import_web$2.createComponent)(Header, {
					get tag() {
						return HeaderTags.H3;
					},
					margin: false,
					style: {
						"margin-top": "12px",
						"margin-bottom": "6px"
					},
					children: "Server"
				}),
				(0, import_web$2.createComponent)(Select, {
					onClick: fitPopper,
					get value() {
						return guildId();
					},
					placeholder: "Pick a server",
					onChange: (id) => {
						setGuildId(id);
						store.guildId = id;
						setChannelId("");
						store.channelId = "";
					},
					get children() {
						return guilds().map((g) => (0, import_web$2.createComponent)(SelectOption, {
							get value() {
								return g.id;
							},
							get children() {
								return g.name;
							}
						}));
					}
				}),
				(0, import_web$2.createComponent)(Header, {
					get tag() {
						return HeaderTags.H3;
					},
					margin: false,
					style: {
						"margin-top": "12px",
						"margin-bottom": "6px"
					},
					children: "Channel"
				}),
				(0, import_web$2.createComponent)(Select, {
					onClick: fitPopper,
					get value() {
						return channelId();
					},
					placeholder: "Default channel",
					onChange: (id) => {
						setChannelId(id);
						store.channelId = id;
					},
					get children() {
						return channels().map((c) => (0, import_web$2.createComponent)(SelectOption, {
							get value() {
								return c.id;
							},
							get children() {
								return c.name;
							}
						}));
					}
				})
			];
		})(), _el$5, _co$2);
		return _el$;
	})();
};
(0, import_web$1.delegateEvents)(["click"]);

//#endregion
exports.settings = settings
return exports;
})({});