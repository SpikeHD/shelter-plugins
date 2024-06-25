const Keycode = {
  112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5', 117: 'F6', 118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12',
  27: 'Escape', 32: 'Space',
  17: 'Control', 16: 'Shift', 18: 'Alt',
  91: 'Meta',
  13: 'Enter', 38: 'Up', 40: 'Down', 37: 'Left', 39: 'Right', 8: 'Backspace',
  20: 'CapsLock', 9: 'Tab', 36: 'Home', 35: 'End', 33: 'PageUp', 34: 'PageDown',
  45: 'Insert', 46: 'Delete',
  109: 'NumpadSubtract', 107: 'NumpadAdd', 111: 'NumpadDivide', 106: 'NumpadMultiply',
  192: 'Grave', 189: 'Minus', 187: 'Equal', 219: 'LeftBracket', 221: 'RightBracket',
  220: 'BackSlash', 186: 'Semicolon', 222: 'Apostrophe', 188: 'Comma', 190: 'Dot', 191: 'Slash'
}

// Convert a key code to a string
export const keyToStr = (key: number) => {
  let keyStr = ''
  
  // get char code of uppercase letter
  if (key >= 65 && key <= 90) {
    keyStr = String.fromCharCode(key)
  }

  // get char code of lowercase letter
  if (key >= 97 && key <= 122) {
    keyStr = String.fromCharCode(key - 32)
  }

  // get char code of number
  if (key >= 48 && key <= 57) {
    keyStr = String.fromCharCode(key)
  }

  // Get everything else
  if (Keycode[key]) {
    keyStr = Keycode[key]
  }

  return keyStr
}

// Convert a key string to a key code
export const strToKey = (str: string) => {
  let key = 0

  if (str.length === 1) {
    // get char code of lowercase letter
    if (str >= 'a' && str <= 'z') {
      return str.charCodeAt(0) - 32
    }

    return str.charCodeAt(0)
  }

  // Get everything else
  for (const [k, v] of Object.entries(Keycode)) {
    if (v === str) {
      key = parseInt(k)
    }
  }

  return key
}

// converts things like A to KeyA and 0 to Digit0
export function strToCode(str: string) {
  const code = 'Key'

  if (str.length === 1) {
    // get char code of lowercase letter
    if (str >= 'a' && str <= 'z') {
      return code + str.toUpperCase()
    }

    return 'Digit' + str
  }
  
  if (Keycode[str]) {
    return Keycode[str]
  }

  return code + str
}