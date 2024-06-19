export const keybindActions: KeybindActionsInternal = {
  'UNASSIGNED': {},
  'TOGGLE_MUTE': {
    press: [{
      type: 'AUDIO_TOGGLE_SELF_MUTE',
      context: 'default',
      syncRemote: true,
      skipMuteUnmuteSoundEffect: false
    }]
  },
  'TOGGLE_DEAFEN': {
    press: [{
      type: 'AUDIO_TOGGLE_SELF_DEAF',
      context: 'default',
      syncRemote: true
    }]
  },
  'TOGGLE_STREAMER_MODE': {
    press: [{
      type: 'TOGGLE_STREAMER_MODE',
      context: 'default'
    }]
  },
  'TOGGLE_VOICE_MODE': {
    press: [{
      type: 'TOGGLE_VOICE_MODE',
      context: 'default'
    }]
  },
  // TODO finish these - also grab the existing push to talk bind and display it here
  'PUSH_TO_TALK': {},
  'PUSH_TO_TALK_PRIORITY': {},
  'PUSH_TO_MUTE': {},
}
