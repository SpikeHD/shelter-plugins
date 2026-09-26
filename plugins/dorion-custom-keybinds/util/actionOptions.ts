// Discord does not always expose these values on the settings component's props.
// Keep the fallback aligned with the actions handled by actionMap.ts.
export const fallbackActionTypes: KeybindActionType[] = [
  { value: 'UNASSIGNED', label: 'Unassigned' },
  { value: 'TOGGLE_MUTE', label: 'Toggle Mute' },
  { value: 'TOGGLE_DEAFEN', label: 'Toggle Deafen' },
  { value: 'TOGGLE_STREAMER_MODE', label: 'Toggle Streamer Mode' },
  { value: 'TOGGLE_VOICE_MODE', label: 'Toggle Voice Mode' },
  { value: 'PUSH_TO_TALK', label: 'Push to Talk' },
  { value: 'PUSH_TO_TALK_PRIORITY', label: 'Priority Push to Talk' },
  { value: 'PUSH_TO_MUTE', label: 'Push to Mute' },
]

export const fallbackActionDescriptions: KeybindDescription = {
  UNASSIGNED: 'Choose an action for this keybind.',
  TOGGLE_MUTE: 'Toggle your microphone on or off.',
  TOGGLE_DEAFEN: 'Toggle deafening on or off.',
  TOGGLE_STREAMER_MODE: 'Toggle Streamer Mode on or off.',
  TOGGLE_VOICE_MODE: 'Switch between Voice Activity and Push to Talk.',
  PUSH_TO_TALK: 'Hold to talk.',
  PUSH_TO_TALK_PRIORITY: 'Hold to talk with priority.',
  PUSH_TO_MUTE: 'Hold to mute your microphone.',
}
