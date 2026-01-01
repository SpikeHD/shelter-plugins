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
//#region components/Dropdown.tsx.scss
const classes$1 = {
	"dcontainer": "sqVpyW_dcontainer",
	"ddownplaceholder": "sqVpyW_ddownplaceholder",
	"dsarrow": "sqVpyW_dsarrow",
	"ddown": "sqVpyW_ddown"
};
const css$1 = `.sqVpyW_ddown {
  box-sizing: border-box;
  width: 100%;
  color: var(--text-default);
  background-color: var(--background-base-lowest);
  appearance: none;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  transition: border-color .2s ease-in-out;
}

.sqVpyW_ddown option {
  color: var(--text-default);
  background: #333;
}

.sqVpyW_dcontainer {
  width: 100%;
  position: relative;
}

.sqVpyW_dsarrow {
  pointer-events: none;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

.sqVpyW_dsarrow path {
  fill: var(--text-subtle);
}

.sqVpyW_ddownplaceholder {
  color: var(--text-subtle);
}
`;

//#endregion
//#region components/SelectArrow.tsx
var import_web$18 = __toESM(require_web(), 1);
var import_web$19 = __toESM(require_web(), 1);
var import_web$20 = __toESM(require_web(), 1);
var import_web$21 = __toESM(require_web(), 1);
const _tmpl$$2 = /*#__PURE__*/ (0, import_web$18.template)(`<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>`, 4);
const SelectArrow = (props) => (() => {
	const _el$ = (0, import_web$21.getNextElement)(_tmpl$$2);
	(0, import_web$20.effect)(() => (0, import_web$19.setAttribute)(_el$, "class", props.class));
	return _el$;
})();

//#endregion
//#region components/Dropdown.tsx
var import_web$8 = __toESM(require_web(), 1);
var import_web$9 = __toESM(require_web(), 1);
var import_web$10 = __toESM(require_web(), 1);
var import_web$11 = __toESM(require_web(), 1);
var import_web$12 = __toESM(require_web(), 1);
var import_web$13 = __toESM(require_web(), 1);
var import_web$14 = __toESM(require_web(), 1);
var import_web$15 = __toESM(require_web(), 1);
var import_web$16 = __toESM(require_web(), 1);
var import_web$17 = __toESM(require_web(), 1);
const _tmpl$$1 = /*#__PURE__*/ (0, import_web$8.template)(`<div><select><!#><!/><!#><!/></select><!#><!/></div>`, 10), _tmpl$2 = /*#__PURE__*/ (0, import_web$8.template)(`<option value=""></option>`, 2), _tmpl$3 = /*#__PURE__*/ (0, import_web$8.template)(`<option></option>`, 2);
const { ui: { injectCss: injectCss$1 } } = shelter;
let injectedCss$1 = false;
const Dropdown = (props) => {
	if (!injectedCss$1) {
		injectedCss$1 = true;
		injectCss$1(css$1);
	}
	return (() => {
		const _el$ = (0, import_web$13.getNextElement)(_tmpl$$1), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, [_el$4, _co$] = (0, import_web$15.getNextMarker)(_el$3.nextSibling), _el$5 = _el$4.nextSibling, [_el$6, _co$2] = (0, import_web$15.getNextMarker)(_el$5.nextSibling), _el$7 = _el$2.nextSibling, [_el$8, _co$3] = (0, import_web$15.getNextMarker)(_el$7.nextSibling);
		_el$2.addEventListener("change", (e) => {
			props.onChange(e);
			if (props.immutable) {
				e.preventDefault();
				e.stopPropagation();
				e.target.value = props.value;
			}
		});
		(0, import_web$16.insert)(_el$2, (() => {
			const _c$ = (0, import_web$17.memo)(() => !!props.placeholder);
			return () => _c$() && (() => {
				const _el$9 = (0, import_web$13.getNextElement)(_tmpl$2);
				(0, import_web$16.insert)(_el$9, () => props.placeholder);
				(0, import_web$12.effect)((_p$) => {
					const _v$8 = classes$1.ddownplaceholder, _v$9 = props.value === "";
					_v$8 !== _p$._v$8 && (0, import_web$11.className)(_el$9, _p$._v$8 = _v$8);
					_v$9 !== _p$._v$9 && (_el$9.selected = _p$._v$9 = _v$9);
					return _p$;
				}, {
					_v$8: undefined,
					_v$9: undefined
				});
				return _el$9;
			})();
		})(), _el$4, _co$);
		(0, import_web$16.insert)(_el$2, () => props.options?.map((o) => (() => {
			const _el$0 = (0, import_web$13.getNextElement)(_tmpl$3);
			(0, import_web$16.insert)(_el$0, () => o.label);
			(0, import_web$12.effect)(() => _el$0.selected = o.value === props.value);
			(0, import_web$12.effect)(() => _el$0.value = o.value);
			return _el$0;
		})()), _el$6, _co$2);
		(0, import_web$16.insert)(_el$, (0, import_web$14.createComponent)(SelectArrow, { get ["class"]() {
			return classes$1.dsarrow;
		} }), _el$8, _co$3);
		(0, import_web$12.effect)((_p$) => {
			const _v$ = classes$1.dcontainer, _v$2 = props.style, _v$3 = classes$1.ddown + " " + (props.placeholder && props.value === "" ? classes$1.ddownplaceholder : ""), _v$4 = props.placeholder, _v$5 = props.id, _v$6 = props["aria-label"], _v$7 = props.disabled;
			_v$ !== _p$._v$ && (0, import_web$11.className)(_el$, _p$._v$ = _v$);
			_p$._v$2 = (0, import_web$10.style)(_el$, _v$2, _p$._v$2);
			_v$3 !== _p$._v$3 && (0, import_web$11.className)(_el$2, _p$._v$3 = _v$3);
			_v$4 !== _p$._v$4 && (0, import_web$9.setAttribute)(_el$2, "placeholder", _p$._v$4 = _v$4);
			_v$5 !== _p$._v$5 && (0, import_web$9.setAttribute)(_el$2, "id", _p$._v$5 = _v$5);
			_v$6 !== _p$._v$6 && (0, import_web$9.setAttribute)(_el$2, "aria-label", _p$._v$6 = _v$6);
			_v$7 !== _p$._v$7 && (_el$2.disabled = _p$._v$7 = _v$7);
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
		return _el$;
	})();
};

//#endregion
//#region plugins/orbolay/settings.scss
const classes = { "container": "jvShCW_container" };
const css = `.jvShCW_container {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  display: flex;
}

.jvShCW_container > span {
  font-weight: 500;
}

.jvShCW_container > * {
  width: 50% !important;
}
`;

//#endregion
//#region plugins/orbolay/settings.tsx
var import_web$1 = __toESM(require_web(), 1);
var import_web$2 = __toESM(require_web(), 1);
var import_web$3 = __toESM(require_web(), 1);
var import_web$4 = __toESM(require_web(), 1);
var import_web$5 = __toESM(require_web(), 1);
var import_web$6 = __toESM(require_web(), 1);
var import_web$7 = __toESM(require_web(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web$1.template)(`<div><!#><!/><!#><!/></div>`, 6);
const { ui: { injectCss, SwitchItem, Text, TextBox, Divider }, plugin: { store: store$1 } } = shelter;
let injectedCss = false;
const Settings = (props) => {
	if (!injectedCss) {
		injectedCss = true;
		injectCss(css);
	}
	const submitSettings = () => {
		props?.ws?.send?.(JSON.stringify({
			cmd: "REGISTER_CONFIG",
			...store$1
		}));
	};
	const set = (key, value) => {
		store$1[key] = value;
		submitSettings();
	};
	return [
		(() => {
			const _el$ = (0, import_web$4.getNextElement)(_tmpl$), _el$2 = _el$.firstChild, [_el$3, _co$] = (0, import_web$5.getNextMarker)(_el$2.nextSibling), _el$4 = _el$3.nextSibling, [_el$5, _co$2] = (0, import_web$5.getNextMarker)(_el$4.nextSibling);
			(0, import_web$6.insert)(_el$, (0, import_web$7.createComponent)(Text, { children: "Orbolay Port" }), _el$3, _co$);
			(0, import_web$6.insert)(_el$, (0, import_web$7.createComponent)(TextBox, {
				get value() {
					return store$1.port ?? defaultConfig.port;
				},
				onInput: (v) => set("port", parseInt(v) || defaultConfig.port),
				type: "number"
			}), _el$5, _co$2);
			(0, import_web$3.effect)(() => (0, import_web$2.className)(_el$, classes.container));
			return _el$;
		})(),
		(0, import_web$7.createComponent)(Divider, {}),
		(0, import_web$7.createComponent)(SwitchItem, {
			get value() {
				return store$1.isKeybindEnabled;
			},
			onChange: (v) => set("keybindIsEnabled", v),
			children: "Enable Global Keybind"
		}),
		(() => {
			const _el$6 = (0, import_web$4.getNextElement)(_tmpl$), _el$7 = _el$6.firstChild, [_el$8, _co$3] = (0, import_web$5.getNextMarker)(_el$7.nextSibling), _el$9 = _el$8.nextSibling, [_el$0, _co$4] = (0, import_web$5.getNextMarker)(_el$9.nextSibling);
			(0, import_web$6.insert)(_el$6, (0, import_web$7.createComponent)(Text, { children: "Messages Alignment" }), _el$8, _co$3);
			(0, import_web$6.insert)(_el$6, (0, import_web$7.createComponent)(Dropdown, {
				get value() {
					return store$1.messagesAlignment;
				},
				get selected() {
					return store$1.messagesAlignment;
				},
				onChange: (e) => set("messageAlignment", e.target.value),
				options: [
					{
						label: "Top Left",
						value: "topleft"
					},
					{
						label: "Top Right",
						value: "topright"
					},
					{
						label: "Bottom Left",
						value: "bottomleft"
					},
					{
						label: "Bottom Right",
						value: "bottomright"
					},
					{
						label: "Top Center",
						value: "topcenter"
					},
					{
						label: "Bottom Center",
						value: "bottomcenter"
					},
					{
						label: "Center Left",
						value: "centerleft"
					},
					{
						label: "Center Right",
						value: "centerright"
					}
				]
			}), _el$0, _co$4);
			(0, import_web$3.effect)(() => (0, import_web$2.className)(_el$6, classes.container));
			return _el$6;
		})(),
		(0, import_web$7.createComponent)(Divider, {}),
		(() => {
			const _el$1 = (0, import_web$4.getNextElement)(_tmpl$), _el$10 = _el$1.firstChild, [_el$11, _co$5] = (0, import_web$5.getNextMarker)(_el$10.nextSibling), _el$12 = _el$11.nextSibling, [_el$13, _co$6] = (0, import_web$5.getNextMarker)(_el$12.nextSibling);
			(0, import_web$6.insert)(_el$1, (0, import_web$7.createComponent)(Text, { children: "User Alignment" }), _el$11, _co$5);
			(0, import_web$6.insert)(_el$1, (0, import_web$7.createComponent)(Dropdown, {
				get value() {
					return store$1.userAlignment;
				},
				get selected() {
					return store$1.userAlignment;
				},
				onChange: (e) => set("userAlignment", e.target.value),
				options: [
					{
						label: "Top Left",
						value: "topleft"
					},
					{
						label: "Top Right",
						value: "topright"
					},
					{
						label: "Bottom Left",
						value: "bottomleft"
					},
					{
						label: "Bottom Right",
						value: "bottomright"
					},
					{
						label: "Top Center",
						value: "topcenter"
					},
					{
						label: "Bottom Center",
						value: "bottomcenter"
					},
					{
						label: "Center Left",
						value: "centerleft"
					},
					{
						label: "Center Right",
						value: "centerright"
					}
				]
			}), _el$13, _co$6);
			(0, import_web$3.effect)(() => (0, import_web$2.className)(_el$1, classes.container));
			return _el$1;
		})(),
		(0, import_web$7.createComponent)(Divider, { mb: 12 }),
		(0, import_web$7.createComponent)(SwitchItem, {
			get value() {
				return store$1.voiceSemitransparent;
			},
			onChange: (v) => set("voiceSemitransparent", v),
			children: "VC Members Semi-Transparent"
		}),
		(0, import_web$7.createComponent)(SwitchItem, {
			get value() {
				return store$1.messagesSemitransparent;
			},
			onChange: (v) => set("messagesSemitransparent", v),
			children: "Message Notifications Semi-Transparent"
		})
	];
};

//#endregion
//#region plugins/orbolay/index.tsx
var import_web = __toESM(require_web(), 1);
const { flux: { dispatcher, stores: { ChannelStore, GuildMemberStore, UserStore, VoiceStateStore, StreamerModeStore } }, plugin: { store }, ui: { showToast } } = shelter;
let ws;
let retryInterval = null;
let currentChannel = null;
const defaultConfig = {
	port: 6888,
	userId: "",
	messageAlignment: "topright",
	userAlignment: "topleft",
	voiceSemitransparent: true,
	messagesSemitransparent: false,
	keybindIsEnabled: true
};
const waitForPopulate = async (fn) => {
	while (true) {
		const result = await fn();
		if (result) return result;
		await new Promise((r) => setTimeout(r, 500));
	}
};
const handleSpeaking = (dispatch) => {
	ws?.send?.(JSON.stringify({
		cmd: "VOICE_STATE_UPDATE",
		state: {
			userId: dispatch.userId,
			speaking: dispatch.speakingFlags === 1
		}
	}));
};
const handleVoiceStateUpdates = async (dispatch) => {
	const id = UserStore?.getCurrentUser()?.id;
	for (const state of dispatch.voiceStates) {
		const ourState = state.userId === id;
		const guildId = state.guildId;
		if (ourState) {
			if (state.channelId && state.channelId !== currentChannel) {
				const voiceStates = await waitForPopulate(() => VoiceStateStore?.getVoiceStatesForChannel(state.channelId));
				ws?.send(JSON.stringify({
					cmd: "CHANNEL_JOINED",
					states: Object.values(voiceStates).map((s) => ({
						userId: s.userId,
						username: GuildMemberStore.getNick(guildId, s.userId) || UserStore?.getUser(s.userId)?.globalName,
						avatarUrl: UserStore?.getUser(s.userId)?.avatar,
						channelId: s.channelId,
						deaf: s.deaf || s.selfDeaf,
						mute: s.mute || s.selfMute,
						streaming: s.selfStream,
						speaking: false
					}))
				}));
				currentChannel = state.channelId;
				break;
			} else if (!state.channelId) {
				ws?.send(JSON.stringify({ cmd: "CHANNEL_LEFT" }));
				currentChannel = null;
				break;
			}
		}
		if (!!currentChannel && (state.channelId === currentChannel || state.oldChannelId === currentChannel)) ws?.send(JSON.stringify({
			cmd: "VOICE_STATE_UPDATE",
			state: {
				userId: state.userId,
				username: GuildMemberStore.getNick(guildId, state.userId) || UserStore?.getUser(state.userId)?.globalName,
				avatarUrl: UserStore?.getUser(state.userId)?.avatar,
				channelId: state.channelId ? state.channelId : "0",
				deaf: state.deaf || state.selfDeaf,
				mute: state.mute || state.selfMute,
				streaming: state.selfStream,
				speaking: false
			}
		}));
	}
};
const handleMessageNotification = (dispatch) => {
	ws?.send(JSON.stringify({
		cmd: "MESSAGE_NOTIFICATION",
		message: {
			title: dispatch.title,
			body: dispatch.body,
			icon: dispatch.icon,
			guildId: dispatch.message.guild_id,
			channelId: dispatch.message.channel_id,
			messageId: dispatch.message.id
		}
	}));
};
const handleStreamerModeUpdate = (dispatch) => {
	ws?.send(JSON.stringify({
		cmd: "STREAMER_MODE",
		enabled: dispatch.value
	}));
};
const incoming = (payload) => {
	switch (payload.cmd) {
		case "TOGGLE_MUTE":
			dispatcher.dispatch({
				type: "AUDIO_TOGGLE_SELF_MUTE",
				syncRemote: true,
				playSoundEffect: true,
				context: "default"
			});
			break;
		case "TOGGLE_DEAF":
			dispatcher.dispatch({
				type: "AUDIO_TOGGLE_SELF_DEAF",
				syncRemote: true,
				playSoundEffect: true,
				context: "default"
			});
			break;
		case "DISCONNECT":
			dispatcher.dispatch({
				type: "VOICE_CHANNEL_SELECT",
				channelId: null
			});
			break;
		case "STOP_STREAM": {
			const userId = UserStore?.getCurrentUser()?.id;
			const voiceState = VoiceStateStore?.getVoiceStateForUser(userId);
			const channel = ChannelStore?.getChannel?.(voiceState?.channelId);
			if (!userId || !voiceState || !channel) break;
			dispatcher.dispatch({
				type: "STREAM_STOP",
				streamKey: `guild:${channel.guild_id}:${voiceState.channelId}:${userId}`,
				appContext: "APP"
			});
			break;
		}
		case "NAVIGATE": {
			if (!payload.guild_id || !payload.channel_id || !payload.message_id) break;
			const { guild_id, channel_id, message_id } = payload;
			dispatcher.dispatch({
				type: "CHANNEL_SELECT",
				guildId: String(guild_id),
				channelId: String(channel_id),
				messageId: String(message_id)
			});
			break;
		}
	}
};
const createWebsocket = () => {
	console.log("Attempting to connect to Orbolay server");
	if (ws?.close) ws?.close();
	setTimeout(() => {
		if (ws?.readyState !== WebSocket.OPEN) {
			console.log("Orbolay websocket is not ready");
			ws = null;
			return;
		}
	}, 1e3);
	ws = new WebSocket("ws://" + (store?.config?.connAddr || "127.0.0.1:6888"));
	ws.onerror = (e) => {
		ws?.close?.();
		ws = null;
		throw e;
	};
	ws.onmessage = (e) => {
		incoming(JSON.parse(e.data));
	};
	ws.onclose = () => {
		ws = null;
	};
	ws.onopen = async () => {
		showToast({
			title: "Orbolay",
			content: "Connected to Orbolay server",
			duration: 3e3
		});
		const config = {
			...defaultConfig,
			...store
		};
		config.userId = await waitForPopulate(() => UserStore?.getCurrentUser()?.id);
		store.userId = config.userId;
		ws?.send(JSON.stringify({
			cmd: "REGISTER_CONFIG",
			...config
		}));
		const userVoiceState = VoiceStateStore.getVoiceStateForUser(
			// @ts-expect-error this exists
			UserStore.getCurrentUser().id
);
		if (!userVoiceState) return;
		const channelState = VoiceStateStore.getVoiceStatesForChannel(userVoiceState.channelId);
		const guildId = userVoiceState.guildId;
		ws?.send(JSON.stringify({
			cmd: "CHANNEL_JOINED",
			states: Object.values(channelState).map((s) => ({
				userId: s.userId,
				username: GuildMemberStore.getNick(guildId, s.userId) || UserStore?.getUser(s.userId)?.globalName,
				avatarUrl: UserStore?.getUser(s.userId)?.avatar,
				channelId: s.channelId,
				deaf: s.deaf || s.selfDeaf,
				mute: s.mute || s.selfMute,
				streaming: s.selfStream,
				speaking: false
			}))
		}));
		ws?.send(JSON.stringify({
			cmd: "STREAMER_MODE",
			enabled: StreamerModeStore?.enabled
		}));
		currentChannel = userVoiceState.channelId;
	};
};
const onLoad = () => {
	if (!store) Object.keys(defaultConfig).forEach((key) => store[key] = defaultConfig[key]);
	retryInterval = setInterval(() => {
		if (ws?.readyState === WebSocket.OPEN) return;
		createWebsocket();
	}, 5e3);
	createWebsocket();
	dispatcher.subscribe("SPEAKING", handleSpeaking);
	dispatcher.subscribe("VOICE_STATE_UPDATES", handleVoiceStateUpdates);
	dispatcher.subscribe("RPC_NOTIFICATION_CREATE", handleMessageNotification);
	dispatcher.subscribe("STREAMER_MODE_UPDATE", handleStreamerModeUpdate);
};
const onUnload = () => {
	dispatcher.unsubscribe("SPEAKING", handleSpeaking);
	dispatcher.unsubscribe("VOICE_STATE_UPDATES", handleVoiceStateUpdates);
	dispatcher.unsubscribe("RPC_NOTIFICATION_CREATE", handleMessageNotification);
	dispatcher.unsubscribe("STREAMER_MODE_UPDATE", handleStreamerModeUpdate);
	clearInterval(retryInterval);
	if (ws?.close) ws?.close();
};
const settings = () => (0, import_web.createComponent)(Settings, { ws });

//#endregion
exports.defaultConfig = defaultConfig
exports.onLoad = onLoad
exports.onUnload = onUnload
exports.settings = settings
return exports;
})({});