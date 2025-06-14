const {
  flux: {
    dispatcher,
    stores: { GuildMemberStore, UserStore, VoiceStateStore },
  },
  plugin: { store },
  ui: { showToast },
} = shelter

interface ChannelState {
  userId: string;
  channelId: string;
  deaf: boolean;
  mute: boolean;
  selfDeaf: boolean;
  selfMute: boolean;
}

interface CornerAlignment {
  top: boolean;
  left: boolean;
}

interface Config {
  port: number;
  userId: string;
  messageAlignment: CornerAlignment;
  userAlignment: CornerAlignment;
}

let ws: WebSocket
let currentChannel = null

const defaultConfig: Config = {
  port: 6888,
  userId: '',
  messageAlignment: {
    top: true,
    left: false,
  },
  userAlignment: {
    top: true,
    left: true,
  },
}

const waitForPopulate = async (fn) => {
  // Runt the function until it returns a truthy value
  while (true) {
    const result = await fn()
    if (result) return result
    await new Promise((r) => setTimeout(r, 500))
  }
}

const handleSpeaking = (dispatch) => {
  ws.send(
    JSON.stringify({
      cmd: 'VOICE_STATE_UPDATE',
      state: {
        userId: dispatch.userId,
        speaking: dispatch.speakingFlags === 1,
      },
    })
  )
}

const handleVoiceStateUpdates = async (dispatch) => {
  // Ensure we are in the channel that the update is for
  // @ts-expect-error this exists
  const id = UserStore?.getCurrentUser()?.id

  for (const state of dispatch.voiceStates) {
    const ourState = state.userId === id
    const guildId = state.guildId

    if (ourState) {
      if (state.channelId && state.channelId !== currentChannel) {
        const voiceStates = await waitForPopulate(() =>
          // @ts-expect-error this exists
          VoiceStateStore?.getVoiceStatesForChannel(state.channelId)
        )

        ws.send(
          JSON.stringify({
            cmd: 'CHANNEL_JOINED',
            states: Object.values(voiceStates).map((s: ChannelState) => ({
              userId: s.userId,
              username:
                // @ts-expect-error this exists
                GuildMemberStore.getNick(guildId, s.userId) ||
                // @ts-expect-error this exists
                UserStore?.getUser(s.userId)?.globalName,
              // @ts-expect-error this exists
              avatarUrl: UserStore?.getUser(s.userId)?.avatar,
              channelId: s.channelId,
              deaf: s.deaf || s.selfDeaf,
              mute: s.mute || s.selfMute,
              // TODO maybe an easy way to get this?
              speaking: false,
            })),
          })
        )

        currentChannel = state.channelId

        break
      } else if (!state.channelId) {
        ws.send(
          JSON.stringify({
            cmd: 'CHANNEL_LEFT',
          })
        )

        currentChannel = null

        break
      }
    }

    // If this is for the channel we are in, send a VOICE_STATE_UPDATE
    if (
      !!currentChannel &&
      (state.channelId === currentChannel ||
        state.oldChannelId === currentChannel)
    ) {
      ws.send(
        JSON.stringify({
          cmd: 'VOICE_STATE_UPDATE',
          state: {
            userId: state.userId,
            username:
              // @ts-expect-error this exists
              GuildMemberStore.getNick(guildId, state.userId) ||
              // @ts-expect-error this exists
              UserStore?.getUser(state.userId)?.globalName,
            // @ts-expect-error this exists
            avatarUrl: UserStore?.getUser(state.userId)?.avatar,
            channelId: state.channelId ? state.channelId : '0',
            deaf: state.deaf || state.selfDeaf,
            mute: state.mute || state.selfMute,
            // TODO maybe an easy way to get this?
            speaking: false,
          },
        })
      )
    }
  }
}

const handleMessageNotification = (dispatch) => {
  ws.send(
    JSON.stringify({
      cmd: 'MESSAGE_NOTIFICATION',
      message: {
        title: dispatch.title,
        body: dispatch.body,
        icon: dispatch.icon,
        channelId: dispatch.channelId,
      }
    })
  )
}

const incoming = (payload) => {
  switch (payload.cmd) {
  case 'TOGGLE_MUTE':
    dispatcher.dispatch({
      type: 'AUDIO_TOGGLE_SELF_MUTE',
      syncRemote: true,
      playSoundEffect: true,
      context: 'default'
    })
    break
  case 'TOGGLE_DEAF':
    dispatcher.dispatch({
      type: 'AUDIO_TOGGLE_SELF_DEAF',
      syncRemote: true,
      playSoundEffect: true,
      context: 'default'
    })
    break
  }
}

export const onLoad = () => {
  ws = new WebSocket('ws://' + (store?.config?.connAddr || '127.0.0.1:6888'))
  ws.onerror = (e) => {
    throw e
  }
  ws.onmessage = (e) => {
    incoming(e.data)
  }
  ws.onopen = async () => {
    showToast({
      title: 'Orbolay',
      content: 'Connected to Orbolay server',
      duration: 3000,
    })

    // Send over the config
    const config = {
      ...defaultConfig,
      ...store?.config,
    }

    // Ensure we track the current user id
    // @ts-expect-error this exists
    config.userId = await waitForPopulate(() => UserStore?.getCurrentUser()?.id)

    ws.send(JSON.stringify({ cmd: 'REGISTER_CONFIG', ...config }))

    // Send initial channel joined (if the user is in a channel)
    // @ts-expect-error this exists
    const userVoiceState = VoiceStateStore.getVoiceStateForUser(
      // @ts-expect-error this exists
      UserStore.getCurrentUser().id
    )

    if (!userVoiceState) {
      return
    }

    // @ts-expect-error this exists
    const channelState = VoiceStateStore.getVoiceStatesForChannel(
      userVoiceState.channelId
    )
    const guildId = userVoiceState.guildId

    ws.send(
      JSON.stringify({
        cmd: 'CHANNEL_JOINED',
        states: Object.values(channelState).map((s: ChannelState) => ({
          userId: s.userId,
          username:
            // @ts-expect-error this exists
            GuildMemberStore.getNick(guildId, s.userId) ||
            // @ts-expect-error this exists
            UserStore?.getUser(s.userId)?.globalName,
          // @ts-expect-error this exists
          avatarUrl: UserStore?.getUser(s.userId)?.avatar,
          channelId: s.channelId,
          deaf: s.deaf || s.selfDeaf,
          mute: s.mute || s.selfMute,
          // TODO maybe an easy way to get this?
          speaking: false,
        })),
      })
    )

    currentChannel = userVoiceState.channelId
  }

  dispatcher.subscribe('SPEAKING', handleSpeaking)
  dispatcher.subscribe('VOICE_STATE_UPDATES', handleVoiceStateUpdates)
  dispatcher.subscribe('RPC_NOTIFICATION_CREATE', handleMessageNotification)
}

export const onUnload = () => {
  dispatcher.unsubscribe('SPEAKING', handleSpeaking)
  dispatcher.unsubscribe('VOICE_STATE_UPDATES', handleVoiceStateUpdates)
  dispatcher.unsubscribe('RPC_NOTIFICATION_CREATE', handleMessageNotification)

  // Close websocket
  if (ws?.close) ws.close()
}
