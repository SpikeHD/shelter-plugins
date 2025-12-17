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
function observeDom<T>(rootElm: Node, callbackFn: (node: Node, resolve: (value: T) => void) => boolean): Promise<T> {
  return new Promise(async (resolve) => {
    const observer = new MutationObserver((mutations, observer) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          for (const node of addedNodes) {
            if (!callbackFn(node, resolve)) {
              observer.disconnect();
              return;
            };
          }
        }
      }
    });
    observer.observe(rootElm, {
      childList: true,
      subtree: true
    });
  });
}

// Ensure at least one element on the parent chain or even document body would return
const querySelectorWaitLast = (query: Array<string> | string, root: Element = document.body, timeout = 10000): Promise<Element> => {
  return new Promise(async (resolve) => {
    const fullQuery = (Array.isArray(query)) ? query.join(' ') : query;
    const elm = root.querySelector(fullQuery);
    if (elm) { resolve(elm); return; }
    let stop = false;
    setTimeout(() => { stop = true; resolve(root) }, timeout);
    if (!Array.isArray(query)) query = [query];
    while (!stop && query.length) {
      let q = query.shift();
      const elm = root.querySelector(q);
      if (elm) { root = elm; continue; }
      root = await observeDom(root, (node, res) => {
        if (stop) return false;
        if (node.nodeType !== Node.ELEMENT_NODE) return true;
        const e = node as Element;
        if (e.matches(q)) {
          res(e);
          return false;
        }
        const elm: Element = e.querySelector(q);
        if (elm) {
          res(elm);
          return false;
        }
        return true;
      }) as Element;
    }
    resolve(root);
  })
}

const insertOne = (className: string, callbackFn: () => void) => {
  const existElms = document.querySelectorAll(`div.${className}`);
  if (existElms.length > 1) existElms.forEach(e => { e.remove() });
  else if (!existElms.length) callbackFn();
}

const insertTitleBar = (parent: Element) => {
  insertOne(classes.dorion_topbar, () => parent.prepend(<Titlebar />))
}

const insertStandaloneControl = (parent: Element) => {
  insertOne(classes.topright, () => parent.appendChild(<Controls standalone />))
}

const injectControls = async () => {
  const discordPanel = await querySelectorWaitLast(['div#app-mount', 'div[class*=appAsidePanelWrapper]', 'div[class*=notAppAsidePanel]']);
  if (!discordPanel.className.match('notAppAsidePanel')) return insertTitleBar(discordPanel);
  const discordBar = discordPanel.querySelector('div[data-layer=base][class*=baseLayer] div[class*=base] div[class*=bar]');
  if (!discordBar) return insertTitleBar(discordPanel);
  const discordBarTrailing = discordBar.querySelector('div[class*=trailing]');
  if (!discordBarTrailing) return insertTitleBar(discordPanel);

  insertStandaloneControl(discordBarTrailing);
  setMaximizeIcon();

  const discordBarTitle = discordBar.querySelector('div[class*=title]');
  if (discordBarTitle) discordBarTitle.setAttribute('data-tauri-drag-region', 'true');
}

const handleFullTitlebar = async () => {
  const discordPanel = await querySelectorWaitLast('div[class*=notAppAsidePanel]');
  insertTitleBar(discordPanel);
}

const handleControlsOnly = async () => {
  const discordPanel = document.querySelector('div[class*=notAppAsidePanel]');
  if (!discordPanel.className.match('notAppAsidePanel')) return;
  const dorionControl = discordPanel.querySelector(`div[data-layer=base][class*=baseLayer] div[class*=base] div[class*=bar] div[class*=trailing] div.${classes.topright}`);
  // Remove the whole titlebar
  if (dorionControl) document.querySelectorAll(`.${classes.dorion_topbar}`)?.forEach(e => e.remove());
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
