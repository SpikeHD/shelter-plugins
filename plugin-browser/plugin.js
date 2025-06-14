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
//#region plugins/plugin-browser/components/Plugins.scss
const classes$1 = {
	"pluginList": "L-W60G_pluginList",
	"loading": "L-W60G_loading",
	"split": "L-W60G_split",
	"repoHeader": "L-W60G_repoHeader",
	"subtitle": "L-W60G_subtitle"
};
const css$1 = `.L-W60G_subtitle {
  margin-top: 12px;
  display: block;
}

.L-W60G_pluginList {
  grid-gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 16px;
  display: grid;
}

.L-W60G_repoHeader {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.L-W60G_loading {
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 12px;
  display: flex;
}

.L-W60G_split {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  display: flex;
}

.L-W60G_split button {
  width: 10%;
  height: 100%;
}
`;

//#endregion
//#region plugins/plugin-browser/storage.ts
function createLocalStorage() {
	const iframe = document.createElement("iframe");
	const interval = setInterval(() => {
		if (!document.head) return;
		document.head.append(iframe);
		const pd = Object.getOwnPropertyDescriptor(iframe.contentWindow, "localStorage");
		iframe.remove();
		if (!pd) return;
		Object.defineProperty(window, "localStorage", pd);
		clearInterval(interval);
	}, 50);
}
function savePluginsCache(cache) {
	localStorage.setItem("plugins-browser-cache", `${Date.now()};${JSON.stringify(cache)}`);
}
function getPluginsCache() {
	const cache = localStorage.getItem("plugins-browser-cache");
	if (!cache) return null;
	const [time, json] = cache.split(";");
	let cacheJson = null;
	try {
		cacheJson = JSON.parse(json);
	} catch (e) {
		console.log("[Plugin Browser] Error parsing cache JSON: ", e);
		return null;
	}
	maybeClearCache(time);
	return cacheJson;
}
function maybeClearCache(time) {
	if (Date.now() - parseInt(time) > 36e5) localStorage.removeItem("plugins-browser-cache");
}
function getPluginJsonCache() {
	const cache = localStorage.getItem("plugins-browser-plugin-json");
	if (!cache) return {};
	const [time, json] = cache.split(";");
	let cacheJson = null;
	try {
		cacheJson = JSON.parse(json);
	} catch (e) {
		console.log("[Plugin Browser] Error parsing cache JSON: ", e);
		return {};
	}
	maybeClearPluginJsonCache(time);
	return cacheJson;
}
function savePluginJsonCache(url, json) {
	localStorage.setItem("plugins-browser-plugin-json", `${Date.now()};${JSON.stringify({
		...getPluginJsonCache(),
		[url]: json
	})}`);
}
function maybeClearPluginJsonCache(time) {
	if (Date.now() - parseInt(time) > 36e5) localStorage.removeItem("plugins-browser-plugin-json");
}

//#endregion
//#region plugins/plugin-browser/github.ts
const ghFetch = async (url) => {
	return fetch(url, { headers: { "User-Agent": "Shelter Plugin Browser" } });
};
async function getRepos() {
	const resp = await ghFetch("https://api.github.com/search/repositories?q=shelter-plugins");
	const json = await resp.json();
	return json.items.map((item) => {
		return {
			name: item.name,
			description: item.description,
			url: item.html_url,
			stars: item.stargazers_count,
			owner: item.owner.login,
			owner_url: item.owner.html_url,
			owner_avatar: item.owner.avatar_url,
			homepage: item.homepage
		};
	});
}
async function pluginsSite(repo) {
	if (repo.homepage) return repo.homepage;
else return `https://${repo.owner}.github.io/${repo.name}`;
}
async function getRepoPlugins(repo) {
	const resp = await ghFetch(`https://api.github.com/repos/${repo.owner}/${repo.name}/contents/plugins`);
	const json = await resp.json();
	if (!Array.isArray(json)) return [];
	return json.map((item) => item.name);
}
async function getPluginsLocation(site, plugins) {
	const plugin = plugins?.[0];
	if (!plugin) return site;
	const paths = [`${site}/shelter-plugins/`, `${site}/`];
	let workingPath = site;
	for (const path of paths) {
		const url = `${path}/${plugin}/plugin.json`;
		const resp = await ghFetch(url);
		try {
			const json = await resp.json();
			if (json.name) {
				workingPath = path;
				break;
			}
		} catch (e) {}
	}
	return workingPath;
}
async function getPluginJson(site, plugin) {
	const url = `${site}/${plugin}/plugin.json`;
	const cache = getPluginJsonCache();
	if (cache[url]) return cache[url];
	const resp = await ghFetch(url);
	try {
		const json = await resp.json();
		savePluginJsonCache(url, json);
		return json;
	} catch (e) {
		console.log("[Plugin Browser] Error parsing plugin.json: ", e.message);
		return null;
	}
}
async function getAllPlugins() {
	const repos = await getRepos();
	let plugins = await Promise.all(repos.map(async (repo) => {
		try {
			const site = await pluginsSite(repo);
			if (!site) {
				console.log("[Plugin Browser] No site found for repo: ", repo.name);
				return null;
			}
			const plugins$1 = await getRepoPlugins(repo);
			if (!plugins$1 || plugins$1.length === 0) {
				console.log(`[Plugin Browser] No plugins found for repo: ${repo.owner}/${repo.name}`);
				return null;
			}
			return {
				site: await getPluginsLocation(site, plugins$1),
				repo,
				plugins: plugins$1
			};
		} catch (e) {
			console.error(e);
			return null;
		}
	}));
	plugins = plugins.filter((plugin) => plugin !== null);
	savePluginsCache(plugins);
	return plugins;
}

//#endregion
//#region plugins/plugin-browser/components/PluginCard.scss
const classes = {
	"buttonContainer": "THQemG_buttonContainer",
	"contents": "THQemG_contents",
	"pluginCard": "THQemG_pluginCard",
	"installButton": "THQemG_installButton"
};
const css = `.THQemG_pluginCard {
  text-align: left;
  color: var(--text-primary);
  background: var(--background-secondary);
  border-radius: 8px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 16px;
  display: flex;
}

.THQemG_pluginCard .THQemG_contents {
  flex: 1;
  margin-top: 8px;
}

.THQemG_pluginCard .THQemG_buttonContainer {
  width: 100%;
  margin-top: 8px;
}

.THQemG_pluginCard .THQemG_buttonContainer .THQemG_installButton {
  flex-grow: 1;
  width: 100%;
}

.THQemG_pluginCard .THQemG_buttonContainer .THQemG_installButton button P {
  width: 100%;
}
`;

//#endregion
//#region plugins/plugin-browser/components/PluginCard.tsx
var import_web$9 = __toESM(require_web(), 1);
var import_web$10 = __toESM(require_web(), 1);
var import_web$11 = __toESM(require_web(), 1);
var import_web$12 = __toESM(require_web(), 1);
var import_web$13 = __toESM(require_web(), 1);
var import_web$14 = __toESM(require_web(), 1);
var import_web$15 = __toESM(require_web(), 1);
const _tmpl$$1 = /*#__PURE__*/ (0, import_web$9.template)(`<b></b>`, 2), _tmpl$2$1 = /*#__PURE__*/ (0, import_web$9.template)(`<div><!#><!/><!#><!/><div></div></div>`, 8);
const { ui: { injectCss: injectCss$1, Button: Button$1, Text: Text$1 }, solid: { createSignal: createSignal$1, createEffect: createEffect$1 }, plugins: { installedPlugins, addRemotePlugin } } = shelter;
let injectedCss$1 = false;
function PluginCard(props) {
	if (!injectedCss$1) {
		injectCss$1(css);
		injectedCss$1 = true;
	}
	const [info, setInfo] = createSignal$1({});
	const [installed, setInstalled] = createSignal$1(false);
	createEffect$1(async () => {
		setInfo(await getPluginJson(props.site, props.plugin));
		const installed$1 = Object.values(installedPlugins?.() || {}).some((p) => p.manifest.name === info()?.name && p.manifest.author === info()?.author);
		setInstalled(installed$1);
	});
	const installPlugin = () => {
		addRemotePlugin(props.plugin, props.install_url, true);
		setInstalled(true);
	};
	return (() => {
		const _el$ = (0, import_web$14.getNextElement)(_tmpl$2$1), _el$5 = _el$.firstChild, [_el$6, _co$] = (0, import_web$12.getNextMarker)(_el$5.nextSibling), _el$7 = _el$6.nextSibling, [_el$8, _co$2] = (0, import_web$12.getNextMarker)(_el$7.nextSibling), _el$4 = _el$8.nextSibling;
		(0, import_web$15.insert)(_el$, (0, import_web$13.createComponent)(Text$1, {
			get ["class"]() {
				return classes.name;
			},
			get children() {
				return [
					(() => {
						const _el$2 = (0, import_web$14.getNextElement)(_tmpl$$1);
						(0, import_web$15.insert)(_el$2, () => info()?.name || props.plugin);
						return _el$2;
					})(),
					" by ",
					(() => {
						const _el$3 = (0, import_web$14.getNextElement)(_tmpl$$1);
						(0, import_web$15.insert)(_el$3, () => props.author);
						return _el$3;
					})()
				];
			}
		}), _el$6, _co$);
		(0, import_web$15.insert)(_el$, (0, import_web$13.createComponent)(Text$1, {
			get ["class"]() {
				return classes.contents;
			},
			get children() {
				return info()?.description;
			}
		}), _el$8, _co$2);
		(0, import_web$15.insert)(_el$4, (0, import_web$13.createComponent)(Button$1, {
			get ["class"]() {
				return classes.installButton;
			},
			onClick: installPlugin,
			get disabled() {
				return installed() || !info()?.name;
			},
			get children() {
				return installed() ? "Installed" : "Install";
			}
		}));
		(0, import_web$11.effect)((_p$) => {
			const _v$ = classes.pluginCard, _v$2 = classes.buttonContainer;
			_v$ !== _p$._v$ && (0, import_web$10.className)(_el$, _p$._v$ = _v$);
			_v$2 !== _p$._v$2 && (0, import_web$10.className)(_el$4, _p$._v$2 = _v$2);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined
		});
		return _el$;
	})();
}

//#endregion
//#region plugins/plugin-browser/components/Plugins.tsx
var import_web = __toESM(require_web(), 1);
var import_web$1 = __toESM(require_web(), 1);
var import_web$2 = __toESM(require_web(), 1);
var import_web$3 = __toESM(require_web(), 1);
var import_web$4 = __toESM(require_web(), 1);
var import_web$5 = __toESM(require_web(), 1);
var import_web$6 = __toESM(require_web(), 1);
var import_web$7 = __toESM(require_web(), 1);
var import_web$8 = __toESM(require_web(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web.template)(`<a href="https://github.com/SpikeHD/shelter-plugins/tree/main/plugins/plugin-browser" target="_blank">Take a look</a>`, 2), _tmpl$2 = /*#__PURE__*/ (0, import_web.template)(`<div><!#><!/><!#><!/></div>`, 6), _tmpl$3 = /*#__PURE__*/ (0, import_web.template)(`<a target="_blank">View Repository</a>`, 2), _tmpl$4 = /*#__PURE__*/ (0, import_web.template)(`<div></div>`, 2);
const { ui: { Button, injectCss, Header, HeaderTags, Text, Divider, TextBox, showToast }, solid: { createSignal, createEffect } } = shelter;
let injectedCss = false;
const debounce = (fn, ms) => {
	let timeoutId = null;
	return (...args) => {
		window.clearTimeout(timeoutId);
		timeoutId = window.setTimeout(() => {
			fn(...args);
		}, ms);
	};
};
function Plugins() {
	if (!injectedCss) {
		injectCss(css$1);
		injectedCss = true;
	}
	const [repos, setRepos] = createSignal([]);
	const [search, setSearch] = createSignal("");
	createEffect(async () => {
		const cache = await getPluginsCache();
		if (cache) setRepos(cache);
else loadPlugins();
	});
	const loadPlugins = async () => {
		const plugins = await getAllPlugins().catch((e) => {
			console.error(e);
			showToast({
				title: "Plugin Browser",
				content: "Failed to load plugins, check DevTools for error.",
				duration: 5e3
			});
			return [];
		});
		setRepos(plugins);
	};
	return [
		(0, import_web$8.createComponent)(Header, {
			get tag() {
				return HeaderTags.H1;
			},
			children: "Plugins"
		}),
		(0, import_web$8.createComponent)(Text, {
			get ["class"]() {
				return classes$1.subtitle;
			},
			get children() {
				return [
					"Not seeing your plugin repo? ",
					(0, import_web$7.getNextElement)(_tmpl$),
					" at how this plugin finds repos!"
				];
			}
		}),
		(0, import_web$8.createComponent)(Divider, {
			mt: 16,
			mb: 16
		}),
		(() => {
			const _el$2 = (0, import_web$7.getNextElement)(_tmpl$2), _el$3 = _el$2.firstChild, [_el$4, _co$] = (0, import_web$5.getNextMarker)(_el$3.nextSibling), _el$5 = _el$4.nextSibling, [_el$6, _co$2] = (0, import_web$5.getNextMarker)(_el$5.nextSibling);
			(0, import_web$6.insert)(_el$2, (0, import_web$8.createComponent)(TextBox, {
				get value() {
					return search();
				},
				get onInput() {
					return debounce((v) => setSearch(v), 100);
				},
				placeholder: "Search..."
			}), _el$4, _co$);
			(0, import_web$6.insert)(_el$2, (0, import_web$8.createComponent)(Button, {
				onClick: () => {
					setRepos([]);
					loadPlugins();
				},
				children: "Refresh"
			}), _el$6, _co$2);
			(0, import_web$4.effect)(() => (0, import_web$3.className)(_el$2, classes$1.split));
			return _el$2;
		})(),
		(0, import_web$2.memo)((() => {
			const _c$ = (0, import_web$2.memo)(() => repos().length > 0);
			return () => _c$() ? repos().map((repo) => {
				return [
					(0, import_web$8.createComponent)(Divider, {
						mt: 16,
						mb: 16
					}),
					(() => {
						const _el$7 = (0, import_web$7.getNextElement)(_tmpl$2), _el$9 = _el$7.firstChild, [_el$0, _co$3] = (0, import_web$5.getNextMarker)(_el$9.nextSibling), _el$1 = _el$0.nextSibling, [_el$10, _co$4] = (0, import_web$5.getNextMarker)(_el$1.nextSibling);
						(0, import_web$6.insert)(_el$7, (0, import_web$8.createComponent)(Header, {
							get tag() {
								return HeaderTags.H2;
							},
							get children() {
								return repo.repo.owner;
							}
						}), _el$0, _co$3);
						(0, import_web$6.insert)(_el$7, (0, import_web$8.createComponent)(Header, {
							get tag() {
								return HeaderTags.H2;
							},
							get children() {
								return [
									(() => {
										const _el$8 = (0, import_web$7.getNextElement)(_tmpl$3);
										(0, import_web$4.effect)(() => (0, import_web$1.setAttribute)(_el$8, "href", repo.repo.url));
										return _el$8;
									})(),
									" - ",
									(0, import_web$2.memo)(() => repo.repo.stars),
									" ⭐"
								];
							}
						}), _el$10, _co$4);
						(0, import_web$4.effect)(() => (0, import_web$3.className)(_el$7, classes$1.repoHeader));
						return _el$7;
					})(),
					(() => {
						const _el$11 = (0, import_web$7.getNextElement)(_tmpl$4);
						(0, import_web$6.insert)(_el$11, () => repo.plugins.map((p) => {
							if (p.toLowerCase().includes("dorion")) return null;
							if (!p.toLowerCase().includes(search().toLowerCase())) return null;
							return (0, import_web$8.createComponent)(PluginCard, {
								plugin: p,
								get site() {
									return repo.site;
								},
								get author() {
									return repo.repo.owner;
								},
								get install_url() {
									return `${repo.site}/${p}`;
								}
							});
						}));
						(0, import_web$4.effect)(() => (0, import_web$3.className)(_el$11, classes$1.pluginList));
						return _el$11;
					})()
				];
			}) : (() => {
				const _el$12 = (0, import_web$7.getNextElement)(_tmpl$4);
				(0, import_web$6.insert)(_el$12, (0, import_web$8.createComponent)(Text, { children: "Loading..." }));
				(0, import_web$4.effect)(() => (0, import_web$3.className)(_el$12, classes$1.loading));
				return _el$12;
			})();
		})())
	];
}

//#endregion
//#region plugins/plugin-browser/index.ts
const { settings: { registerSection } } = shelter;
const unload = registerSection("section", "plugin-browser", "Plugin Browser", Plugins);
if (!window.localStorage) createLocalStorage();
const onUnload = () => {
	unload();
};

//#endregion
exports.onUnload = onUnload
return exports;
})({});