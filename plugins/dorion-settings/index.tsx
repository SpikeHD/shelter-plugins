import { PerformancePage } from './components/PerformancePage.jsx'
import { ProfilesPage } from './components/ProfilesPage.jsx'
import { SettingsPage } from './components/SettingsPage.jsx'
import { ChangelogPage } from './components/ChangelogPage.jsx'
import { PluginsPage } from './components/PluginsPage.jsx'
import { ThemesPage } from './components/ThemesPage.jsx'

declare global {
  interface Window {
    Dorion: {
      util: {
        cssSanitize: (css: string) => string
        fetchImage: (url: string) => Promise<string>
        applyNotificationCount: () => void
      }

      shouldShowUnreadBadge: boolean
    }
  }
}

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

const settingsUninjects = [
  registerSection('divider'),
  registerSection('header', 'Dorion'),
  registerSection('section', 'dorion-settings', 'Dorion Settings', SettingsPage),
  registerSection('section', 'dorion-plugins', 'Client Mods & Plugins', PluginsPage),
  registerSection('section', 'dorion-themes', 'Themes', ThemesPage),
  registerSection('section', 'dorion-performance', 'Performance & Extras', PerformancePage),
  registerSection('section', 'dorion-profiles', 'Profiles', ProfilesPage)
]

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

  settingsUninjects.push(
    // @ts-expect-error Shelter types are wrong? badgeCount does exist on type
    registerSection('section', 'dorion-changelog', 'Changelog', ChangelogPage, { 
      badgeCount: needsUpdate ? 1 : 0 
    })
  )
}

dispatcher.subscribe('USER_SETTINGS_MODAL_OPEN', appendDorionVersion)

checkForUpdates()

export const onUnload = () => {
  settingsUninjects.forEach((u) => u())
  dispatcher.unsubscribe('USER_SETTINGS_MODAL_OPEN', appendDorionVersion)
}