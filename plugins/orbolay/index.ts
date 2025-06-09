const {
  flux: {
    intercept,
    stores: {
      GuildMemberStore,
      UserStore,
      VoiceStateStore,
    }
  },
  plugin: { store },
} = shelter

interface ChannelState {
  userId: string
  channelId: string
  deaf: boolean
  mute: boolean
  selfDeaf: boolean
  selfMute: boolean
}

let ws: WebSocket
let currentChannel = null

const waitForPopulate = async (fn) => {
  // Runt the function until it returns a truthy value
  while (true) {
    const result = await fn()
    if (result) return result
    await new Promise((r) => setTimeout(r, 500))
  }
}

const unintercept = intercept(async dispatch => {
  if (ws?.readyState !== WebSocket.OPEN) return dispatch

  switch (dispatch.type) {
  case 'SPEAKING': {
    ws.send(JSON.stringify({
      cmd: 'VOICE_STATE_UPDATE',
      state: {
        userId: dispatch.userId,
        speaking: dispatch.speakingFlags === 1
      }
    }))

    break
  }
  case 'VOICE_STATE_UPDATES': {
    // Ensure we are in the channel that the update is for
    // @ts-expect-error this exists
    const id = UserStore?.getCurrentUser()?.id
    
    for (const state of dispatch.voiceStates) {
      const ourState = state.userId === id
      const guildId = state.guildId

      if (ourState) {
        if (state.channelId && state.channelId !== currentChannel) {
          // @ts-expect-error this exists
          const voiceStates = await waitForPopulate(() => VoiceStateStore?.getVoiceStatesForChannel(state.channelId))

          ws.send(JSON.stringify({
            cmd: 'CHANNEL_JOINED',
            states: Object.values(voiceStates).map((s: ChannelState) => ({
              userId: s.userId,
              // @ts-expect-error this exists
              username: GuildMemberStore.getNick(guildId, s.userId) || UserStore?.getUser(s.userId)?.globalName,
              channelId: s.channelId,
              deaf: s.deaf || s.selfDeaf,
              mute: s.mute || s.selfMute,
              // TODO maybe an easy way to get this?
              speaking: false,
            }))
          }))

          currentChannel = state.channelId

          break
        } else if (!state.channelId) {
          ws.send(JSON.stringify({
            cmd: 'CHANNEL_LEFT',
          }))

          currentChannel = null

          break
        }
      }

      // If this is for the channel we are in, send a VOICE_STATE_UPDATE
      if (!!currentChannel && (state.channelId === currentChannel || state.oldChannelId === currentChannel)) {
        ws.send(JSON.stringify({
          cmd: 'VOICE_STATE_UPDATE',
          state: {
            userId: state.userId,
            // @ts-expect-error this exists
            username: GuildMemberStore.getNick(guildId, state.userId) || UserStore?.getUser(state.userId)?.globalName,
            channelId: state.channelId ? state.channelId : '0',
            deaf: state.deaf || state.selfDeaf,
            mute: state.mute || state.selfMute,
            // TODO maybe an easy way to get this?
            speaking: false,
          }
        }))
      }
    }

    break
  }}
})

export const onLoad = () => {
  ws = new WebSocket('ws://' + (store.connAddr || '127.0.0.1:6888'))
  ws.onerror = (e) => { throw e }
  ws.onmessage = (e) => { console.log(e) }
  ws.onopen = () => {
    // Send initial channel joined (if the user is in a channel)
    // @ts-expect-error this exists
    const userVoiceState = VoiceStateStore.getVoiceStateForUser(UserStore.getCurrentUser().id)

    if (!userVoiceState) {
      return
    }

    // @ts-expect-error this exists
    const channelState = VoiceStateStore.getVoiceStatesForChannel(userVoiceState.channelId)
    const guildId = userVoiceState.guildId

    ws.send(JSON.stringify({
      cmd: 'CHANNEL_JOINED',
      states: Object.values(channelState).map((s: ChannelState) => ({
        userId: s.userId,
        // @ts-expect-error this exists
        username: GuildMemberStore.getNick(guildId, s.userId) || UserStore?.getUser(s.userId)?.globalName,
        channelId: s.channelId,
        deaf: s.deaf || s.selfDeaf,
        mute: s.mute || s.selfMute,
        // TODO maybe an easy way to get this?
        speaking: false,
      }))
    }))

    currentChannel = userVoiceState.channelId
  }
}

export const onUnload = () => {
  unintercept()

  // Close websocket
  if (ws?.close) ws.close()
}