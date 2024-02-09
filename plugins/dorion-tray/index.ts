import { invoke } from '../../api/api.js'

const {
  flux: {
    dispatcher,
  },
} = shelter

const state = {
  video: false,
  streaming: false,
  deafened: false,
  muted: false,
  speaking: false,
  connected: false,
}

const handleConnect = async (payload) => {
  const {state: connectionState} = payload

  if (connectionState.toLowerCase() === 'connected' || connectionState.toLowerCase() === 'connecting') {
    state.connected = true
  } else if (connectionState.toLowerCase() === 'disconnected') {
    state.connected = false
  }

  await handleTrayUpdate()
}

const handleVoiceChannelActions = async (payload) => {
  const loggedInUserId = localStorage.getItem('user_id_cache').replace(/"/g, '')
  const voiceState = payload.voiceStates.find((voiceState) => voiceState.userId === loggedInUserId)

  if (!voiceState) return

  const {selfDeaf, selfMute, selfStream, selfVideo} = voiceState

  state.muted = selfMute
  state.deafened = selfDeaf
  state.streaming = selfStream
  state.video = selfVideo

  await handleTrayUpdate()
}

const handleSpeakAction = async (payload) => {
  const loggedInUserId = localStorage.getItem('user_id_cache').replace(/"/g, '')
  const {userId, speakingFlags } = payload

  if (userId !== loggedInUserId) return

  state.speaking = speakingFlags > 0

  await handleTrayUpdate()
}

const handleTrayUpdate = async () => {
  const icon = Object.keys(state).find(k => state[k]) || 'disconnected'
  await invoke('set_tray_icon', { event: icon })
}

dispatcher.subscribe('VOICE_STATE_UPDATES', handleVoiceChannelActions)
dispatcher.subscribe('SPEAKING', handleSpeakAction)
dispatcher.subscribe('RTC_CONNECTION_STATE', handleConnect)

export const onUnload = () => {
  dispatcher.unsubscribe('VOICE_STATE_UPDATES', handleVoiceChannelActions)
  dispatcher.unsubscribe('SPEAKING', handleSpeakAction)
  dispatcher.unsubscribe('RTC_CONNECTION_STATE', handleConnect)
}
