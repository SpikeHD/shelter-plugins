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
      eventKey: 'value',
      modify: (event, store) => {
        event['value'] = !store['enabled']
        return event
      }
    },
    press: [{
      type: 'STREAMER_MODE_UPDATE',
      key: 'enabled',
    }]
  },
  'TOGGLE_VOICE_MODE': {
    storeValue: {
      store: 'MediaEngineStore',
      key: 'getMode',
      eventKey: 'mode',
      modify: (event, store) => {
        event['mode'] = store['getMode']() === 'PUSH_TO_TALK' ? 'VOICE_ACTIVITY' : 'PUSH_TO_TALK'
        event['options'] = store['getModeOptions']() || {}
        return event
      }
    },
    press: [{
      type: 'AUDIO_SET_MODE',
      context: 'default'
    }]
  },
  // TODO grab the existing push to talk bind and display it in the keybinds section
  'PUSH_TO_TALK': {
    storeValue: {
      store: 'UserStore',
      key: '',
      eventKey: 'userId',
      modify: (event, store) => {
        event['userId'] = store['getCurrentUser']().id
        return event
      }
    },
    press: [{
      type: 'SPEAKING',
      context: 'default',
      speakingFlags: 1
    },
    {
      type: 'PUSH_TO_TALK_STATE_CHANGE',
      isActive: true,
      isPriority: false,
      isLatched: true,
    }],
    release: [{
      type: 'SPEAKING',
      context: 'default',
      speakingFlags: 0
    },
    {
      type: 'PUSH_TO_TALK_STATE_CHANGE',
      isActive: false,
      isPriority: false,
      isLatched: false,
    }]
  },
  'PUSH_TO_TALK_PRIORITY': {
    storeValue: {
      store: 'UserStore',
      key: '',
      eventKey: 'userId',
      modify: (event, store) => {
        event['userId'] = store['getCurrentUser']().id
        return event
      }
    },
    press: [{
      type: 'SPEAKING',
      context: 'default',
      speakingFlags: 4
    }],
    release: [{
      type: 'SPEAKING',
      context: 'default',
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
