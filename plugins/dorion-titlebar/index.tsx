import { Controls, Titlebar } from './Titlebar.jsx'
import { setMaximizeIcon } from './actions.js'
import { css, classes } from './index.scss'

const {
  ui: {
    injectCss
  },
  util: {
    sleep
  },
  flux: {
    dispatcher
  }
} = shelter

let injectedCss = false

const waitForDefinition = async (fn, maxTries = 20) => {
  // Run the function until it returns a truthy value
  let tries = 0
  while (true) {
    const result = await fn()
    if (result) return result

    await new Promise((r) => setTimeout(r, 500))

    tries++
    if (tries > maxTries) {
      return false
    }
  }
}

const injectControls = async () => {
  if (document.querySelector(`.${classes.dorion_topbar}`)) {
    // Remove before recreating
    document.querySelectorAll(`.${classes.dorion_topbar}`)?.forEach(e => e.remove())
  }

  // Also remove other instances of the window controls
  if (document.querySelector(`.${classes.topright}`)) {
    document.querySelectorAll(`.${classes.topright}`)?.forEach(e => e.remove())
  }

  const sel = 'div[class^="bar_"] div[class^="trailing_"]'
  let elm: HTMLDivElement
  let tries = 0

  while (!(elm = document.querySelector(sel))) {
    await sleep(300)

    tries++
    if (tries > 10) {
      return false
    }
  }

  const controls = <Controls standalone />

  elm.appendChild(controls)
  setMaximizeIcon()

  const discordBar = document.querySelector('div[class^="title_"]')

  if (discordBar) {
    discordBar.setAttribute('data-tauri-drag-region', 'true')
  }

  return true
}

const handleFullTitlebar = async () => {
  // Append the whole titlebar
  const titlebar = <Titlebar />

  await waitForDefinition(() => document.querySelector('div[class^=notAppAsidePanel_]'))

  const innerMount = document.querySelector('div[class^=notAppAsidePanel_]')
  innerMount?.prepend(titlebar)
}

const handleControlsOnly = () => {
  // Remove the whole titlebar
  document.querySelectorAll(`.${classes.dorion_topbar}`)?.forEach(e => e.remove())
}

const handleFullscreenExit = (dispatch) => {
  if (dispatch.isElementFullscreen) return

  injectControls()
}

export const onLoad = async () => {
  // @ts-expect-error shut up
  if (window?.__DORION_CONFIG__?.use_native_titlebar || await window?.__TAURI__?.core.invoke('get_platform') === 'macos') return

  if (!injectedCss) {
    injectCss(css)
    injectedCss = true
  }

  // @ts-expect-error shut up
  window?.__TAURI__?.event.listen(
    // @ts-expect-error shut up
    window.__TAURI__.event.TauriEvent.WINDOW_RESIZED,
    setMaximizeIcon
  )

  // @ts-expect-error shut up
  window?.__TAURI__?.core.invoke('remove_top_bar') 

  if (!await injectControls()) {
    // Inject full titlebar if we must
    handleFullTitlebar()
  }
  
  dispatcher.subscribe('LAYER_PUSH', handleFullTitlebar)
  dispatcher.subscribe('LAYER_POP', handleControlsOnly)
  dispatcher.subscribe('LOGIN_SUCCESS', injectControls)
  dispatcher.subscribe('WINDOW_FULLSCREEN_CHANGE', handleFullscreenExit)
}

export const onUnload = () => {
  dispatcher.unsubscribe('LAYER_PUSH', handleFullTitlebar)
  dispatcher.unsubscribe('LAYER_POP', handleControlsOnly)
  dispatcher.unsubscribe('LOGIN_SUCCESS', injectControls)
  dispatcher.unsubscribe('WINDOW_FULLSCREEN_CHANGE', handleFullscreenExit)
}
