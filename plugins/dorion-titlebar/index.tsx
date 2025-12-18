import { Controls, Titlebar } from './Titlebar.jsx'
import { setMaximizeIcon } from './actions.js'
import { css, classes } from './index.scss'

const {
  ui: {
    injectCss
  },
  flux: {
    dispatcher
  }
} = shelter

let injectedCss = false

let observer: MutationObserver | null = null // keep only one observer working

/**
 * Observes the DOM for newly added nodes and executes a callback for each.
 * @template T - The type of the value that the Promise will eventually resolve to.
 * @param {Node} rootElm - The DOM node to start observing from (e.g., document.body).
 * @param {(Node, resolve(T)) => boolean} callbackFn - A function executed for every added node. 
 * - Call `resolve(value)` to fulfill the promise.
 * - Return `false` to disconnect the observer and stop listening.
 * - Return `true` to continue observing for more nodes.
 * * @returns {Promise<T>} A promise that resolves when `resolve()` is called within the callback.
 * * @example
 * const target = await observeDom<HTMLDivElement>(document.body, (node, resolve) => {
 *   if (node instanceof HTMLDivElement && node.id === 'my-element') {
 *     resolve(node);
 *     return false; // Found it, stop observing
 *   }
 *   return true; // Keep looking
 * });
 */
function observeDom<T>(rootElm: Node, callbackFn: (node: Node, resolve: (value: T) => void) => boolean, subtree: boolean): Promise<T> {
  return new Promise(resolve => {
    if (observer) observer.disconnect() // disconnnect old one
    observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes)
          for (const node of addedNodes) {
            if (!callbackFn(node, resolve)) {
              observer.disconnect()
              observer = null
              return
            };
          }
        }
      }
    })
    observer.observe(rootElm, {
      childList: true,
      subtree // reduce callback count for perf
    })
  })
}

// Ensure at least one element on the chain would callback
const waitDom = async (queries: Array<string> | string, callbackFn: (elm: Element) => void = () => { }, root: Element = document.body): Promise<Element> => {
  if (!Array.isArray(queries)) queries = [queries]
  loop: while (queries.length) {
    // prepare query
    let query = queries.shift()
    const subtree = query[0] === '>'
    if (subtree) query = query.slice(1)
    // fast exit if remaining queries already exist
    for (let i = queries.length; i > 0; i--) {
      const elm = root.querySelector(`${query} ${queries.slice(0, i).join(' ')}`)
      if (elm) { root = elm; callbackFn(root); queries = queries.slice(i); continue loop }
    }
    // start observer
    root = await observeDom(root, (node, res) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return true
      const e = node as Element
      if (e.matches(query)) {
        res(e)
        return false
      }
      const elm: Element = e.querySelector(query)
      if (elm) {
        res(elm)
        return false
      }
      return true
    }, subtree) as Element
    // callback after found
    callbackFn(root)
  }
  return root
}

const insertOne = (className: string, callbackFn: () => void) => {
  const existElms = document.querySelectorAll(`div.${className}`)
  if (existElms.length > 1) existElms.forEach(e => { e.remove() })
  else if (!existElms.length) callbackFn()
}

const insertTitleBar = (parent: Element) => {
  insertOne(classes.dorion_topbar, () => parent.prepend(<Titlebar />))
}

const insertStandaloneControl = (parent: Element) => {
  document.querySelectorAll(`div.${classes.dorion_topbar}`).forEach(e => { e.remove() })
  insertOne(classes.topright, () => parent.appendChild(<Controls standalone />))
  setMaximizeIcon()
}

const waitDiscordPanel = (callbackFn: (elm: Element) => void) => waitDom(['>div#app-mount', '>div[class*=appAsidePanelWrapper]', '>div[class*=notAppAsidePanel]'], callbackFn)

// if titlebar injected at `document.body`, `div#app-mount`, `div[class*=appAsidePanelWrapper]`
// would be worst case with overflow or content covered
const injectControls = async () => {
  // always keep a title bar available if following elms not available
  insertTitleBar(document.body)
  // cancel old observer to inject new controls
  const discordPanel = await waitDiscordPanel(elm => insertTitleBar(elm))
  const discordBar = await waitDom(['div[class*=baseLayer]', '>div[class*=container]', '>div[class*=base]', '>div[class*=bar]'], () => { }, discordPanel)
  waitDom('>div[class*=trailing]', elm => {
    insertStandaloneControl(elm)
    const discordBarTitle = discordBar.querySelector('div[class*=title]')
    if (discordBarTitle) discordBarTitle.setAttribute('data-tauri-drag-region', 'true')
  }, discordBar)
}

const handleFullTitlebar = async () => {
  // cancel old observer to inject new titlebar
  waitDiscordPanel(elm => insertTitleBar(elm))
}

const handleControlsOnly = async () => {
  // use querySelector, do nothing while observer still injecting elms
  const discordPanel = document.querySelector('div[class*=notAppAsidePanel]')
  if (!discordPanel) return
  // Remove the whole titlebar
  const dorionControl = discordPanel.querySelector(`div[data-layer=base][class*=baseLayer] div[class*=base]>div[class*=bar]>div[class*=trailing] div.${classes.topright}`)
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
  dispatcher.unsubscribe('LAYER_PUSH', handleFullTitlebar)
  dispatcher.unsubscribe('LAYER_POP', handleControlsOnly)
  dispatcher.unsubscribe('LOGIN_SUCCESS', injectControls)
  dispatcher.unsubscribe('WINDOW_FULLSCREEN_CHANGE', handleFullscreenExit)
}
