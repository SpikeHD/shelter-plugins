// macOS overlay titlebar support.
//
// Ported from Dorion's `src-tauri/injection/shared/macos_titlebar.ts`. When
// `use_native_titlebar` is false on macOS the window is created with an overlay
// title bar, so the native traffic lights float over Discord's own top bar.
// This module makes that bar act as the drag region, adds a fallback drag for
// when something renders above it (modals, settings, etc.), and restores
// double-click-to-zoom.

type AnyWindow = Window & { __TAURI__?: any }

const TITLEBAR_SELECTORS = [
  'div[class^="base"] > div[class^="bar_"]',
  'div[class^="base"] > div[class*="-bar"]',
]

const LOADING_CONTAINER_SELECTOR = '#loadingContainer'

const FALLBACK_TITLEBAR_HEIGHT = 30

// The overscroll fix sets `width/height: 100vw/100vh`, which macOS's CSS zoom
// scales down and leaves a gap on the right/bottom at non-100% zoom.
export const MACOS_LAYOUT_CSS = `
html[data-dorion-platform='macos'],
html[data-dorion-platform='macos'] body,
html[data-dorion-platform='macos'] #app-mount {
  width: auto !important;
  height: auto !important;
}
`

const CLICKABLE_TAGS = new Set([
  'A',
  'BUTTON',
  'INPUT',
  'SELECT',
  'TEXTAREA',
  'LABEL',
  'SUMMARY',
])

const INTERACTIVE_ROLES = new Set([
  'button',
  'link',
  'menuitem',
  'tab',
  'checkbox',
  'radio',
  'switch',
  'option',
])

function tauriInvoke(command: string) {
  return (window as AnyWindow).__TAURI__?.core?.invoke(`plugin:window|${command}`)
}

function enableWindowDrag(elm: Element) {
  if (elm.getAttribute('data-tauri-drag-region') !== 'deep') {
    elm.setAttribute('data-tauri-drag-region', 'deep')
  }
}

function isMacosOverlayTitlebar() {
  const tauri = (window as AnyWindow).__TAURI__

  return (
    document.documentElement.dataset.dorionPlatform === 'macos'
    && tauri?.webviewWindow?.getCurrentWebviewWindow?.()?.label === 'main'
    && !window.__DORION_CONFIG__?.use_native_titlebar
  )
}

function isClickableElement(elm: HTMLElement) {
  return (
    CLICKABLE_TAGS.has(elm.tagName)
    || (elm.hasAttribute('contenteditable') && elm.getAttribute('contenteditable') !== 'false')
    || (elm.hasAttribute('tabindex') && elm.getAttribute('tabindex') !== '-1')
    || INTERACTIVE_ROLES.has(elm.getAttribute('role') ?? '')
  )
}

function checkDragRegion(path: EventTarget[]) {
  for (const elm of path) {
    if (!(elm instanceof HTMLElement)) continue

    if (elm.hasAttribute('data-tauri-drag-region')) return 'tauri'
    if (isClickableElement(elm)) return 'interactive'
  }

  return 'unhandled'
}

function initWindowDragFallback(getDragAreaHeight: () => number) {
  let doubleClickPosition: [number, number] | null = null

  const onMouseDown = (event: MouseEvent) => {
    if (
      event.button !== 0
      || (event.detail !== 1 && event.detail !== 2)
      || event.clientY >= getDragAreaHeight()
      || checkDragRegion(event.composedPath()) !== 'unhandled'
    ) return

    event.preventDefault()
    event.stopImmediatePropagation()

    if (event.detail === 2) {
      doubleClickPosition = [event.clientX, event.clientY]
      return
    }

    tauriInvoke('start_dragging')
  }

  const onMouseUp = (event: MouseEvent) => {
    if (event.button !== 0 || event.detail !== 2) return

    const position = doubleClickPosition
    doubleClickPosition = null

    if (!position) return
    if (event.clientX !== position[0] || event.clientY !== position[1]) return
    if (checkDragRegion(event.composedPath()) !== 'unhandled') return

    tauriInvoke('internal_toggle_maximize')
  }

  document.addEventListener('mousedown', onMouseDown, true)
  document.addEventListener('mouseup', onMouseUp, true)

  return () => {
    document.removeEventListener('mousedown', onMouseDown, true)
    document.removeEventListener('mouseup', onMouseUp, true)
  }
}

/**
 * Sets up overlay titlebar dragging on macOS. Returns a cleanup function.
 * No-op when the overlay titlebar is not in use.
 */
export function initMacosTitlebar(): () => void {
  if (!isMacosOverlayTitlebar()) return () => {}

  let titlebarHeight = FALLBACK_TITLEBAR_HEIGHT

  const measureTitlebar = () => {
    titlebarHeight = FALLBACK_TITLEBAR_HEIGHT

    for (const selector of TITLEBAR_SELECTORS) {
      const titlebar = document.querySelector(selector)
      const bottom = titlebar?.getBoundingClientRect().bottom ?? 0

      if (bottom > 0) {
        titlebarHeight = bottom
        return
      }
    }
  }

  const keepTitlebarDraggable = () => {
    document.querySelectorAll(TITLEBAR_SELECTORS.join(', ')).forEach(enableWindowDrag)
    measureTitlebar()
  }

  let throttle: ReturnType<typeof setTimeout> | undefined

  const observer = new MutationObserver(() => {
    if (throttle) return

    throttle = setTimeout(() => {
      throttle = undefined
      keepTitlebarDraggable()
    }, 250)
  })

  const startObserving = () => {
    keepTitlebarDraggable()
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    })
  }

  // The plugin can load before the document body exists
  if (document.body) startObserving()
  else document.addEventListener('DOMContentLoaded', startObserving, { once: true })

  window.addEventListener('resize', measureTitlebar)

  // While the splash screen is up it should be draggable as a whole, otherwise
  // the window is stuck until Discord finishes loading.
  const removeDragFallback = initWindowDragFallback(() =>
    document.querySelector(LOADING_CONTAINER_SELECTOR) ? window.innerHeight : titlebarHeight
  )

  return () => {
    observer.disconnect()
    if (throttle) clearTimeout(throttle)
    window.removeEventListener('resize', measureTitlebar)
    document.removeEventListener('DOMContentLoaded', startObserving)
    removeDragFallback()
  }
}
