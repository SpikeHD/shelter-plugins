import { app, appName, invoke } from '../../api/api.js'

import { PerformancePage } from './pages/PerformancePage.jsx'
import { ProfilesPage } from './pages/ProfilesPage.jsx'
import { SettingsPage } from './pages/SettingsPage.jsx'
import { ChangelogPage } from './pages/ChangelogPage.jsx'
import { PluginsPage } from './pages/PluginsPage.jsx'
import { ThemesPage } from './pages/ThemesPage.jsx'

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

const settingsUninjects = [
  registerSection('divider'),
  registerSection('header', appName),
  registerSection('section', `${appName}-settings`, `${appName} Settings`, SettingsPage),
  registerSection('section', `${appName}-plugins`, 'Plugins', PluginsPage),
  registerSection('section', `${appName}-themes`, 'Themes', ThemesPage),
  registerSection('section',  `${appName}-performance`, 'Performance & Extras', PerformancePage),
  registerSection('section', `${appName}-profiles`, 'Profiles', ProfilesPage),
]

const appendAppVersion = async () => {
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

  newVersionThing.innerHTML = `${appName} v${await app.getVersion()}`
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
    registerSection('section', `${appName}-changelog`, 'Changelog', ChangelogPage, { 
      badgeCount: needsUpdate ? 1 : 0 
    })
  )
}

dispatcher.subscribe('USER_SETTINGS_MODAL_OPEN', appendAppVersion)

checkForUpdates()

export const onUnload = () => {
  settingsUninjects.forEach((u) => u())
  dispatcher.unsubscribe('USER_SETTINGS_MODAL_OPEN', appendAppVersion)
}