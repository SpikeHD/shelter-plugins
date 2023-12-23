export const keyToStr = (key: number) => {
  let keyStr = ''

  // Convert special keys to strings
  // see: https://docs.rs/device_query/latest/device_query/keymap/enum.Keycode.html
  switch (key) {
  case 8:
    keyStr = 'Backspace'
    break
  case 9:
    keyStr = 'Tab'
    break
  case 13:
    keyStr = 'Enter'
    break
  case 16:
    keyStr = 'Shift'
    break
  case 17:
    keyStr = 'Control'
    break
  case 18:
    keyStr = 'Alt'
    break
  case 20:
    keyStr = 'CapsLock'
    break
  case 27:
    keyStr = 'Escape'
    break
  case 32:
    keyStr = 'Space'
    break
  case 33:
    keyStr = 'PageUp'
    break
  case 34:
    keyStr = 'PageDown'
    break
  case 35:
    keyStr = 'End'
    break
  case 36:
    keyStr = 'Home'
    break
  case 37:
    keyStr = 'Left'
    break
  case 38:
    keyStr = 'Up'
    break
  case 39:
    keyStr = 'Right'
    break
  case 40:
    keyStr = 'Down'
    break
  case 45:
    keyStr = 'Insert'
    break
  case 46:
    keyStr = 'Delete'
    break
  default:
    keyStr = String.fromCharCode(key)
    break
  }

  return keyStr
}