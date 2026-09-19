import { Settings } from './settings.jsx'

const {
  flux: {
    dispatcher,
    stores: { ChannelStore, GuildMemberStore, UserStore, VoiceStateStore, StreamerModeStore },
  },
  plugin: { store },
  ui: { showToast },
} = shelter

export interface Config {
  port: number;
}

interface ChannelState {
  userId: string;
  channelId: string;
  deaf: boolean;
  mute: boolean;
  stream: boolean;
  selfDeaf: boolean;
  selfMute: boolean;
  selfStream: boolean;
}

interface SoundboardSoundPayload {
  sound_id: string;
  name: string;
  volume: number;
  emoji_id: string | null;
  emoji_name: string | null;
  guild_id: string | null;
  available: boolean;
}

let ws: WebSocket
let currentChannel = null

export const defaultConfig: Config = {
  port: 6888,
}

const waitForPopulate = async (fn) => {
  // Runt the function until it returns a truthy value
  while (true) {
    const result = await fn()
    if (result) return result
    await new Promise((r) => setTimeout(r, 500))
  }
}

const toSoundboardPayload = (sound: any, fallbackGuild?: string): SoundboardSoundPayload | null => {
  if (!sound?.soundId) return null

  const guildId = sound.guildId ?? fallbackGuild

  return {
    sound_id: sound.soundId,
    name: sound.name,
    volume: sound.volume,
    emoji_id: sound.emojiId ?? null,
    emoji_name: sound.emojiName ?? null,
    guild_id: !guildId || guildId === '0' ? null : guildId,
    available: sound.available,
  }
}

const getSoundboardSounds = (): SoundboardSoundPayload[] => {
  const store: any = shelter.flux.stores?.SoundboardStore
  const sounds: SoundboardSoundPayload[] = []

  for (const [guildKey, guildSounds] of store.getSounds()) {
    for (const sound of guildSounds ?? []) {
      const payload = toSoundboardPayload(sound, guildKey)
      if (payload) sounds.push(payload)
    }
  }

  return sounds
}

const sendSoundboardUpdate = () => {
  if (!ws || ws.readyState !== WebSocket.OPEN) return

  const sounds = getSoundboardSounds()
  if (!sounds.length) return

  ws.send(JSON.stringify({ cmd: 'SOUNDBOARD_UPDATE', sounds }))
}

const handleSpeaking = (dispatch) => {
  ws?.send?.(
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

        ws?.send(
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
              streaming: s.selfStream,
              // TODO maybe an easy way to get this?
              speaking: false,
            })),
          })
        )

        currentChannel = state.channelId

        sendSoundboardUpdate()

        break
      } else if (!state.channelId) {
        ws?.send(
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
      ws?.send(
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
            streaming: state.selfStream,
            // TODO maybe an easy way to get this?
            speaking: false,
          },
        })
      )
    }
  }
}

const handleMessageNotification = (dispatch) => {
  ws?.send(
    JSON.stringify({
      cmd: 'MESSAGE_NOTIFICATION',
      message: {
        title: dispatch.title,
        body: dispatch.body,
        icon: dispatch.icon,
        guildId: dispatch.message.guild_id,
        channelId: dispatch.message.channel_id,
        messageId: dispatch.message.id,
      }
    })
  )
}

const handleStreamerModeUpdate = (dispatch) => {
  ws?.send(JSON.stringify({ cmd: 'STREAMER_MODE', enabled: dispatch.value }))
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
  case 'DISCONNECT':
    dispatcher.dispatch({
      type: 'VOICE_CHANNEL_SELECT',
      channelId: null
    })
    break
  case 'STOP_STREAM': {
    // @ts-expect-error i will explode typescript with my mind
    const userId = UserStore?.getCurrentUser()?.id
    // @ts-expect-error i will explode typescript with my mind
    const voiceState = VoiceStateStore?.getVoiceStateForUser(userId)
    // @ts-expect-error i will explode typescript with my mind
    const channel = ChannelStore?.getChannel?.(voiceState?.channelId)

    // If any of these are null, we can't do anything
    if (!userId || !voiceState || !channel) break

    dispatcher.dispatch({
      type: 'STREAM_STOP',
      streamKey: `guild:${channel.guild_id}:${voiceState.channelId}:${userId}`,
      appContext: 'APP'
    })

    break
  }
  case 'NAVIGATE': {
    // If any of this isn't defined then we can't do anything anyways, so just break
    if (!payload.guild_id || !payload.channel_id || !payload.message_id) break

    const { guild_id, channel_id, message_id } = payload
    dispatcher.dispatch({
      type: 'CHANNEL_SELECT',
      guildId: String(guild_id),
      channelId: String(channel_id),
      messageId: String(message_id),
    })

    break
  }
  }
}

const createWebsocket = () => {
  console.log('Attempting to connect to Orbolay server')

  // First ensure old connection is closed
  if (ws?.close) ws?.close()

  setTimeout(() => {
    // If the ws is not ready, kill it and log
    if (ws?.readyState !== WebSocket.OPEN) {
      console.log('Orbolay websocket is not ready')
      showToast({
        title: 'Orbolay',
        content: 'Failed to connect to Orbolay server. Make sure Orbolay is opened before refreshing Discord.',
        duration: 5000,
      })
      ws = null
      return
    }
  }, 1000)

  const port = (store && typeof store.port === 'number') ? store.port : defaultConfig.port
  ws = new WebSocket('ws://127.0.0.1:' + String(port))
  ws.onerror = (e) => {
    ws?.close?.()
    ws = null
    throw e
  }
  ws.onmessage = (e) => {
    incoming(JSON.parse(e.data))
  }
  ws.onclose = () => {
    ws = null
  }
  ws.onopen = async () => {
    showToast({
      title: 'Orbolay',
      content: 'Connected to Orbolay server',
      duration: 3000,
    })

    // Ensure we track the current user id
    // @ts-expect-error this exists
    const userId = await waitForPopulate(() => UserStore?.getCurrentUser()?.id)
    if (userId) store.userId = userId

    // Register only the user id with the remote server
    ws?.send(JSON.stringify({ cmd: 'REGISTER_CONFIG', userId }))

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

    ws?.send(
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
          streaming: s.selfStream,
          // TODO maybe an easy way to get this?
          speaking: false,
        })),
      })
    )

    // Also tell the overlay whether we are in streamer mode
    // @ts-expect-error this exists
    ws?.send(JSON.stringify({ cmd: 'STREAMER_MODE', enabled: StreamerModeStore?.enabled }))

    currentChannel = userVoiceState.channelId

    sendSoundboardUpdate()
  }
}

export const onLoad = () => {
  // Ensure the store has a port value; keep all other configuration out of the plugin store
  if (store && store.port === undefined) store.port = defaultConfig.port

  createWebsocket()

  dispatcher.subscribe('SPEAKING', handleSpeaking)
  dispatcher.subscribe('VOICE_STATE_UPDATES', handleVoiceStateUpdates)
  dispatcher.subscribe('RPC_NOTIFICATION_CREATE', handleMessageNotification)
  dispatcher.subscribe('STREAMER_MODE_UPDATE', handleStreamerModeUpdate)
}

export const onUnload = () => {
  dispatcher.unsubscribe('SPEAKING', handleSpeaking)
  dispatcher.unsubscribe('VOICE_STATE_UPDATES', handleVoiceStateUpdates)
  dispatcher.unsubscribe('RPC_NOTIFICATION_CREATE', handleMessageNotification)
  dispatcher.unsubscribe('STREAMER_MODE_UPDATE', handleStreamerModeUpdate)

  // Close websocket
  if (ws?.close) ws?.close()
}

export const settings = () => <Settings ws={ws} />
