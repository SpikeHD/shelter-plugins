import { PerformancePage } from './components/PerformancePage'
import { ProfilesPage } from './components/ProfilesPage'
import { SettingsPage } from './components/SettingsPage'

const {
  settings: {
    registerSection,
  },
  flux: {
    dispatcher
  },
  util: {
    sleep
  },
  observeDom
} = shelter

const { app } = (window as any).__TAURI__

const appendDorionVersion = async () => {
  const infoBoxSelector = 'div[class*="side_"] div[class*="info_"]'

  const unobserve = observeDom(infoBoxSelector, async (versionThings: HTMLDivElement) => {
    const firstChild = versionThings?.firstElementChild as HTMLSpanElement
    const newVersionThing = document.createElement('span') as HTMLSpanElement

    if (!firstChild) return

    newVersionThing.innerHTML = `Dorion v${await app.getVersion()}`
    // @ts-expect-error This works
    newVersionThing.classList.add(...firstChild.classList)
    newVersionThing.style.color = firstChild.style.color

    versionThings.appendChild(newVersionThing)

    unobserve()
  })

  // Unobserve after 5 seconds just in case something gets silly
  await sleep(5000)

  unobserve?.()
}

dispatcher.subscribe('USER_SETTINGS_MODAL_OPEN', appendDorionVersion)

const settingsUninjects = [
  registerSection('divider'),
  registerSection('header', 'Dorion'),
  registerSection('section', 'dorion-settings', 'Dorion Settings', SettingsPage),
  registerSection('section', 'dorion-performance', 'Performance & Extras', PerformancePage),
  registerSection('section', 'dorion-profiles', 'Profiles', ProfilesPage)
]

export const onUnload = () => {
  settingsUninjects.forEach((u) => u())
  dispatcher.unsubscribe('USER_SETTINGS_MODAL_OPEN', appendDorionVersion)
}