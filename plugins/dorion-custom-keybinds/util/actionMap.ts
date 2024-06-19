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
  }
}

export const getKeybindAction = (action: string) => {

}

export const getAllKeybindActions = () => {

}