const {
  flux: {
    stores: {
      UserStore,
      StreamerModeStore
    }
  }
} = shelter

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
    storeValue: {
      store: 'StreamerModeStore',
      key: 'enabled',
      setKey: 'value'
    },
    press: [{
      type: 'STREAMER_MODE_UPDATE',
      key: 'enabled',
    }]
  },
  'TOGGLE_VOICE_MODE': {
    press: [{
      type: 'TOGGLE_VOICE_MODE',
      context: 'default'
    }]
  },
  // TODO grab the existing push to talk bind and display it in the keybinds section
  'PUSH_TO_TALK': {
    press: [{
      type: 'SPEAKING',
      context: 'default',
      userId: UserStore.getCurrentUser().id,
      speakingFlags: 1
    }],
    release: [{
      type: 'SPEAKING',
      context: 'default',
      userId: UserStore.getCurrentUser().id,
      speakingFlags: 0
    }]
  },
  'PUSH_TO_TALK_PRIORITY': {
    press: [{
      type: 'SPEAKING',
      context: 'default',
      userId: UserStore.getCurrentUser().id,
      speakingFlags: 4
    }],
    release: [{
      type: 'SPEAKING',
      context: 'default',
      userId: UserStore.getCurrentUser().id,
      speakingFlags: 0
    }]
  },
  'PUSH_TO_MUTE': {
    press: [{
      type: 'AUDIO_TOGGLE_SELF_MUTE',
      context: 'default',
      syncRemote: true,
      skipMuteUnmuteSoundEffect: true
    }],
    release: [{
      type: 'AUDIO_TOGGLE_SELF_MUTE',
      context: 'default',
      syncRemote: true,
      skipMuteUnmuteSoundEffect: true
    }]
  },
}
