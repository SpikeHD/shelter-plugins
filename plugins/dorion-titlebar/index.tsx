import { Controls, Titlebar } from './Titlebar.jsx'
import { setMaximizeIcon } from './actions.js'
import { css, classes } from './index.scss'
import { disobserve, waitForElm } from './waitElm.js'

const {
  ui: { injectCss },
  flux: { dispatcher }
} = shelter

let injectedCss = false

const insertOne = (classNames: Array<string> | string, callbackFn: () => void) => {
  if (!Array.isArray(classNames)) classNames = [classNames]
  classNames.forEach(className => {
    document.querySelectorAll(`div.${className}`).forEach(e => {
      e.remove()
    })
  })
  callbackFn()
}

const insertTitleBar = (parent: Element) => {
  insertOne(classes.dorion_topbar, () => parent.prepend(<Titlebar />))
}

const insertStandaloneControl = (parent: Element) => {
  insertOne([classes.dorion_topbar, classes.topright], () => parent.appendChild(<Controls standalone />))
  setMaximizeIcon()
}

const waitDiscordPanel = (callbackFn: (elm: Element) => void) => waitForElm(['>div#app-mount', '>div[class*=appAsidePanelWrapper]', '>div[class*=notAppAsidePanel]'], {callbackFn})

// if titlebar injected at `document.body`, `div#app-mount`, `div[class*=appAsidePanelWrapper]`, `div[class*=notAppAsidePanel]`
// would be worst case with overflow or some contents covered causing some parts Discord cannot be seen
const injectControls = async () => {
  // always keep a title bar available if following elms not available
  insertTitleBar(document.body)
  // cancel old observer to inject new controls
  const discordPanel = await waitDiscordPanel(elm => insertTitleBar(elm))
  const discordBar = await waitForElm(['div[data-layer=base]>div[class*=container]', '>div[class*=base]', ['>div[class*=bar_]', '>div[class*=-bar]']], {root:discordPanel})
  waitForElm('>div[class*=trailing]', {callbackFn: elm => {
    insertStandaloneControl(elm)
  }, root: discordBar})
  waitForElm('>div[class*=title]', {callbackFn: elm => {
    elm.setAttribute('data-tauri-drag-region', 'true')
  }, root: discordBar})
}

const handleFullTitlebar = async () => {
  // cancel old observer to inject new titlebar
  waitDiscordPanel(elm => insertTitleBar(elm))
}

const handleControlsOnly = async () => {
  // use querySelector, do nothing while observer still injecting elms
  const dorionControl = document.querySelector(`div[class*=notAppAsidePanel] div[data-layer=base][class*=baseLayer] div[class*=base]>div[class*=bar]>div[class*=trailing] div.${classes.topright}`)
  if (dorionControl) document.querySelectorAll(`.${classes.dorion_topbar}`)?.forEach(e => e.remove())
}

const handleFullscreenExit = dispatch => {
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

  injectControls()

  dispatcher.subscribe('LAYER_PUSH', handleFullTitlebar)
  dispatcher.subscribe('LAYER_POP', handleControlsOnly)
  dispatcher.subscribe('LOGIN_SUCCESS', injectControls)
  dispatcher.subscribe('WINDOW_FULLSCREEN_CHANGE', handleFullscreenExit)
}

export const onUnload = () => {
  disobserve()
  dispatcher.unsubscribe('LAYER_PUSH', handleFullTitlebar)
  dispatcher.unsubscribe('LAYER_POP', handleControlsOnly)
  dispatcher.unsubscribe('LOGIN_SUCCESS', injectControls)
  dispatcher.unsubscribe('WINDOW_FULLSCREEN_CHANGE', handleFullscreenExit)
}
