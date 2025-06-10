(function(exports) {

"use strict";

//#region plugins/orbolay/index.ts
const { flux: { intercept, stores: { GuildMemberStore, UserStore, VoiceStateStore } }, plugin: { store }, ui: { showToast } } = shelter;
let ws;
let currentChannel = null;
const waitForPopulate = async (fn) => {
	while (true) {
		const result = await fn();
		if (result) return result;
		await new Promise((r) => setTimeout(r, 500));
	}
};
const unintercept = intercept(async (dispatch) => {
	if (ws?.readyState !== WebSocket.OPEN) return dispatch;
	switch (dispatch.type) {
		case "SPEAKING": {
			ws.send(JSON.stringify({
				cmd: "VOICE_STATE_UPDATE",
				state: {
					userId: dispatch.userId,
					speaking: dispatch.speakingFlags === 1
				}
			}));
			break;
		}
		case "VOICE_STATE_UPDATES": {
			const id = UserStore?.getCurrentUser()?.id;
			for (const state of dispatch.voiceStates) {
				const ourState = state.userId === id;
				const guildId = state.guildId;
				if (ourState) {
					if (state.channelId && state.channelId !== currentChannel) {
						const voiceStates = await waitForPopulate(() => VoiceStateStore?.getVoiceStatesForChannel(state.channelId));
						ws.send(JSON.stringify({
							cmd: "CHANNEL_JOINED",
							states: Object.values(voiceStates).map((s) => ({
								userId: s.userId,
								username: GuildMemberStore.getNick(guildId, s.userId) || UserStore?.getUser(s.userId)?.globalName,
								avatarUrl: UserStore?.getUser(s.userId)?.avatar,
								channelId: s.channelId,
								deaf: s.deaf || s.selfDeaf,
								mute: s.mute || s.selfMute,
								speaking: false
							}))
						}));
						currentChannel = state.channelId;
						break;
					} else if (!state.channelId) {
						ws.send(JSON.stringify({ cmd: "CHANNEL_LEFT" }));
						currentChannel = null;
						break;
					}
				}
				if (!!currentChannel && (state.channelId === currentChannel || state.oldChannelId === currentChannel)) ws.send(JSON.stringify({
					cmd: "VOICE_STATE_UPDATE",
					state: {
						userId: state.userId,
						username: GuildMemberStore.getNick(guildId, state.userId) || UserStore?.getUser(state.userId)?.globalName,
						avatarUrl: UserStore?.getUser(state.userId)?.avatar,
						channelId: state.channelId ? state.channelId : "0",
						deaf: state.deaf || state.selfDeaf,
						mute: state.mute || state.selfMute,
						speaking: false
					}
				}));
			}
			break;
		}
	}
});
const onLoad = () => {
	ws = new WebSocket("ws://" + (store.connAddr || "127.0.0.1:6888"));
	ws.onerror = (e) => {
		throw e;
	};
	ws.onmessage = (e) => {
		console.log(e);
	};
	ws.onopen = () => {
		showToast({
			title: "Orbolay",
			content: "Connected to Orbolay server",
			duration: 3e3
		});
		const userVoiceState = VoiceStateStore.getVoiceStateForUser(UserStore.getCurrentUser().id);
		if (!userVoiceState) return;
		const channelState = VoiceStateStore.getVoiceStatesForChannel(userVoiceState.channelId);
		const guildId = userVoiceState.guildId;
		ws.send(JSON.stringify({
			cmd: "CHANNEL_JOINED",
			states: Object.values(channelState).map((s) => ({
				userId: s.userId,
				username: GuildMemberStore.getNick(guildId, s.userId) || UserStore?.getUser(s.userId)?.globalName,
				avatarUrl: UserStore?.getUser(s.userId)?.avatar,
				channelId: s.channelId,
				deaf: s.deaf || s.selfDeaf,
				mute: s.mute || s.selfMute,
				speaking: false
			}))
		}));
		currentChannel = userVoiceState.channelId;
	};
};
const onUnload = () => {
	unintercept();
	if (ws?.close) ws.close();
};

//#endregion
exports.onLoad = onLoad
exports.onUnload = onUnload
return exports;
})({});