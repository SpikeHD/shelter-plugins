import { webpackChunk, createApi } from '@cumjar/websmack'
import * as patcher from 'spitroast'

const {
  // plugin: {
  //   store
  // }
  flux: {
    stores: {
      MediaEngineStore: {
        // @ts-expect-error shut up
        getOutputVolume
      }
    }
  }
} = shelter

const ch = webpackChunk()
const finder = ch && createApi([undefined, ...ch])
const exports = finder.findByCode('./message1.mp3')

declare global {
  interface Window {
    SoundChanger: {
      maybeReplaceSound: (sound: keyof typeof soundList) => string | false
      getOutputVolume: () => number
    }
  }
}

// ctrl+shift+f for "./message1.mp3" to find these
export const soundList = {
  message1: 'Message',
  call_ringing: 'Incoming Ring',
  call_calling: 'Outgoing Ring',
  mute: 'Mute',
  unmute: 'Unmute',
  deafen: 'Defean',
  undeafen: 'Undefean',
  disconnect: 'Voice Disconnected',
  user_join: 'User Join',
  user_leave: 'User Leave',
  user_moved: 'User Moved',
  ptt_start: 'PTT Activate',
  ptt_stop: 'PTT Deactive',
  stream_started: 'Stream Started',
  stream_ended: 'Stream Ended',
  stream_user_joined: 'Viewer Join',
  stream_user_left: 'Viewer Leave',
  activity_launch: 'Activity Start',
  activity_end: 'Activity End',
  activity_user_join: 'Activity User Join',
  activity_user_left: 'Activity User Leave',
  reconnect: 'Invited to Speak',
}

export function maybeReplaceSound(sound: keyof typeof soundList) {
  // If we have a replacement set in the plugin store, return that, otherwise return false
  //return store?.[sound] || false
  console.log('Maybe replacing: ', sound)
  return Date.now() > 0 ?
    getOriginalSound(
      `./${sound}.mp3`
    ) : sound
}

export function getOriginalSound(sound: string) {
  return exports(sound)
}

export function patchSoundGetter() {
  window.finder = finder

  const audioClass = Object.entries(finder.findByCode('_ensureAudio()')).find(m => m[0].includes('Audio'))[1]

  window.SoundChanger = {
    maybeReplaceSound,
    getOutputVolume
  }

  // @ts-expect-error shut up
  const replacement = audioClass.prototype._ensureAudio.toString().replace(
    /\.src=.+?\),/,
    '.src=window.SoundChanger.maybeReplaceSound(this.name),'
  )
  // Replace volume setter
    .replace(
      /\((.{1,2}.default.getOutputVolume\(\))/,
      '(window.SoundChanger.getOutputVolume()'
    )
    .replace(
      /{(.{1,2}\.volume.+.{1,2}getOutputVolume.+?\)),.+?}/,
      '{$1}'
    )
  // also replace the opening and closing braces
    .replace(/.+\){/, '')
    .slice(0, -1)

  // Patch ensureAudio
  // @ts-expect-error shut up
  audioClass.prototype._ensureAudio = function () {
    const fn = new Function(replacement)
    // "this" is the conext of the instantiated class
    return fn.call(this)
  }
}
