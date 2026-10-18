type AnyWindow = Window & { __TAURI__?: any }

const TITLEBAR_SELECTORS = [
  'div[class^="base"] > div[class^="bar_"]',
  'div[class^="base"] > div[class*="-bar"]',
]

// Fullscreen overlays
const OVERLAY_DRAG_SELECTORS = [
  // Dorion's splash (`preinject.ts displayLoadingTop`): absolute, 100vw/100vh.
  '#loadingContainer',
]

// Modal/popup/settings roots that cover the bar and have their own click
// handlers, which stop tauri's document-level drag listener from ever seeing
// the press. A transparent bar on top becomes the hit target instead.
const MODAL_SELECTORS = ['div[data-mana-component="layer-modal"]']

const DRAG_STRIP_ID = 'dorion-titlebar-drag'

const FALLBACK_TITLEBAR_HEIGHT = 30

const FALLBACK_THROTTLE_MS = 250

// The overscroll fix sets `width/height: 100vw/100vh`, which macOS's CSS zoom
// scales down and leaves a gap on the right/bottom at non-100% zoom.
export const MACOS_LAYOUT_CSS = `
:root[data-dorion-platform='macos'],
:root[data-dorion-platform='macos'] :is(body, #app-mount) {
  width: auto !important;
  height: auto !important;
}
`

function isMacosOverlayTitlebar() {
  const tauri = (window as AnyWindow).__TAURI__

  return (
    document.documentElement.dataset.dorionPlatform === 'macos'
    && tauri?.webviewWindow?.getCurrentWebviewWindow?.()?.label === 'main'
    && !window.__DORION_CONFIG__?.use_native_titlebar
  )
}

function getTitlebarHeight() {
  for (const selector of TITLEBAR_SELECTORS) {
    const bottom = document.querySelector(selector)?.getBoundingClientRect().bottom ?? 0

    if (bottom > 0) return bottom
  }

  return FALLBACK_TITLEBAR_HEIGHT
}

export function initMacosTitlebar(): () => void {
  if (!isMacosOverlayTitlebar()) return () => {}

  let dragStrip: HTMLElement | null = null

  const syncDragStrip = () => {
    const modalOpen = MODAL_SELECTORS.some(selector => document.querySelector(selector))

    if (!modalOpen) {
      dragStrip?.remove()
      dragStrip = null
      return
    }

    if (dragStrip) return

    dragStrip = document.createElement('div')
    dragStrip.id = DRAG_STRIP_ID
    dragStrip.setAttribute('data-tauri-drag-region', 'true')
    dragStrip.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: ${getTitlebarHeight()}px;
      background: transparent;
      pointer-events: auto;
      cursor: default;
      z-index: 2147483647;
    `
    document.body.appendChild(dragStrip)
  }

  const applyDragRegions = () => {
    document.querySelectorAll([...TITLEBAR_SELECTORS, ...OVERLAY_DRAG_SELECTORS].join(', ')).forEach(elm => {
      elm.setAttribute('data-tauri-drag-region', 'deep')
    })

    syncDragStrip()
  }

  let throttle: ReturnType<typeof setTimeout> | undefined

  // Discord re-renders the bar and swaps overlays in and out, so we need to re-apply.
  const observer = new MutationObserver(() => {
    if (throttle) return

    throttle = setTimeout(() => {
      throttle = undefined
      applyDragRegions()
    }, FALLBACK_THROTTLE_MS)
  })

  observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  })
  applyDragRegions()

  return () => {
    observer.disconnect()
    if (throttle) clearTimeout(throttle)
    throttle = undefined
    dragStrip?.remove()
    dragStrip = null
  }
}
