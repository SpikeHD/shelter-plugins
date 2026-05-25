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
//#region plugins/orbolay/settings.tsx
var import_web$1 = __toESM(require_web(), 1);
var import_web$2 = __toESM(require_web(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web$1.template)(`<p>Orbolay now uses a built-in configuration window, and this settings menu has been deprecated. Please update to the <a href="https://github.com/SpikeHD/Orbolay/releases" target="_blank">latest version</a>.</p>`, 4);
const Settings = () => {
	return (0, import_web$2.getNextElement)(_tmpl$);
};

//#endregion
//#region plugins/orbolay/index.tsx
var import_web = __toESM(require_web(), 1);
const { flux: { dispatcher, stores: { ChannelStore, GuildMemberStore, UserStore, VoiceStateStore, StreamerModeStore } }, plugin: { store }, ui: { showToast } } = shelter;
let ws;
let currentChannel = null;
const defaultConfig = {
	port: 6888,
	userId: "",
	messageAlignment: "topright",
	userAlignment: "topleft",
	voiceSemitransparent: true,
	messagesSemitransparent: false,
	isKeybindEnabled: true
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
			showToast({
				title: "Orbolay",
				content: "Failed to connect to Orbolay server. Make sure Orbolay is opened before refreshing Discord.",
				duration: 5e3
			});
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
	if (ws?.close) ws?.close();
};
const settings = () => (0, import_web.createComponent)(Settings, {});

//#endregion
exports.defaultConfig = defaultConfig
exports.onLoad = onLoad
exports.onUnload = onUnload
exports.settings = settings
return exports;
})({});