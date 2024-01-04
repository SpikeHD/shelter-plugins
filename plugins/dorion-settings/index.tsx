import { PerformancePage } from './components/PerformancePage'
import { ProfilesPage } from './components/ProfilesPage'
import { SettingsPage } from './components/SettingsPage'
import { ChangelogPage } from './components/ChangelogPage'


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
} = shelter

const { app, invoke } = (window as any).__TAURI__

const appendDorionVersion = async () => {
  let tries = 0
  const infoBoxSelector = 'div[class*="side_"] div[class*="info_"]'

  // Wait for infoBox to exist
  while (!document.querySelector(infoBoxSelector)) {
    await sleep(500)
    tries++

    if (tries > 5) {
      console.error('Failed to find infoBox')
      return
    }
  }

  const versionThings = document.querySelector(infoBoxSelector)
  const firstChild = versionThings?.firstElementChild as HTMLSpanElement
  const newVersionThing = document.createElement('span') as HTMLSpanElement

  if (!firstChild) return

  newVersionThing.innerHTML = `Dorion v${await app.getVersion()}`
  // @ts-expect-error This works
  newVersionThing.classList.add(...firstChild.classList)
  newVersionThing.style.color = firstChild.style.color

  versionThings.appendChild(newVersionThing)
}

const checkForUpdates = async () => {    
  const updateCheck = await invoke('update_check')
  let needsUpdate = false

  if (updateCheck.includes('dorion')) needsUpdate = true

  // @ts-expect-error Shelter types are wrong? badgeCount does exist on type
  registerSection('section', 'dorion-changelog', 'Changelog', ChangelogPage, { 
    badgeCount: needsUpdate ? 1 : 0 
  })
}

dispatcher.subscribe('USER_SETTINGS_MODAL_OPEN', appendDorionVersion)

const settingsUninjects = [
  registerSection('divider'),
  registerSection('header', 'Dorion'),
  registerSection('section', 'dorion-settings', 'Dorion Settings', SettingsPage),
  registerSection('section', 'dorion-performance', 'Performance & Extras', PerformancePage),
  registerSection('section', 'dorion-profiles', 'Profiles', ProfilesPage)
]

checkForUpdates()

export const onUnload = () => {
  settingsUninjects.forEach((u) => u())
  dispatcher.unsubscribe('USER_SETTINGS_MODAL_OPEN', appendDorionVersion)
}