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
  }
} = shelter

const { app } = (window as any).__TAURI__

const appendDorionVersion = async () => {
  await sleep(1000)

  const versionThings = document.querySelector('div[class*="side_"] div[class*="info_"]')
  const firstChild = versionThings.firstElementChild as HTMLSpanElement
  const newVersionThing = document.createElement('span') as HTMLSpanElement

  newVersionThing.innerHTML = `Dorion v${await app.getVersion()}`
  newVersionThing.classList.add(...firstChild.classList)
  newVersionThing.style.color = firstChild.style.color

  versionThings.appendChild(newVersionThing)
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