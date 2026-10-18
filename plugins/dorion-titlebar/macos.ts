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

export function initMacosTitlebar(): () => void {
  if (!isMacosOverlayTitlebar()) return () => {}

  const applyDragRegions = () => {
    document.querySelectorAll([...TITLEBAR_SELECTORS, ...OVERLAY_DRAG_SELECTORS].join(', ')).forEach(elm => {
      elm.setAttribute('data-tauri-drag-region', 'deep')
    })
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
  }
}
