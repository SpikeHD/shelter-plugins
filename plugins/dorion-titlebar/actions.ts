import { classes } from './index.scss'

export function close() {
  // @ts-expect-error shut up
  window.__TAURI__.core.invoke('close')
}

export function minimize() {
  // @ts-expect-error shut up
  window.__TAURI__.core.invoke('minimize')
}

export function toggleMaximize() {
  // @ts-expect-error shut up
  window.__TAURI__.core.invoke('toggle_maximize')
}

export async function setMaximizeIcon() {
  // @ts-expect-error shut up
  if (await window?.__TAURI__?.webviewWindow.getCurrentWebviewWindow().isMaximized()) {
    const topmax = document.querySelector(`.${classes.topmax}`) as HTMLDivElement
    topmax?.classList?.add(classes.maximized)
  } else {
    const topmax = document.querySelector(`.${classes.topmax}`) as HTMLDivElement
    topmax?.classList?.remove(classes.maximized)
  }
}
