import { app, appName, invoke } from '../../api/api.js'
import { t } from '../../util/i18n.js'

import { PerformancePage } from './pages/PerformancePage.jsx'
import { ProfilesPage } from './pages/ProfilesPage.jsx'
import { SettingsPage } from './pages/SettingsPage.jsx'
import { ChangelogPage } from './pages/ChangelogPage.jsx'
import { PluginsPage } from './pages/PluginsPage.jsx'
import { ThemesPage } from './pages/ThemesPage.jsx'
import { RPCPage } from './pages/RPC.jsx'

const IconCog = () => (
  <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
    <g>
      <path d="M0,0h24v24H0V0z" fill="none"></path>
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"></path>
    </g>
  </svg>
)

const IconPlugins = () => (
  <svg xmlns="http://www.w3.org/2000/svg" role="img" width="20" height="20" viewBox="0 0 24 24">
    <path fill="currentColor" d="M18.559 12.8227C17.7884 13.4957 16.6663 13.3616 15.9404 12.641C14.7975 11.5063 11.4931 8.21104 11.4931 8.21104C10.897 7.63087 10.897 6.44662 11.4931 5.85464C12.319 5.03435 13.6053 3.75146 13.6053 3.75146C13.9641 3.39195 14.456 3.18972 14.9653 3.18886L18.3363 3.18425L19.5255 2L22.5 4.96048L21.3108 6.14473L21.3021 9.50878C21.2992 10.0164 21.0967 10.5026 20.735 10.8613C20.735 10.8613 19.5718 11.9384 18.559 12.8227ZM15.2315 13.9548L13.4954 15.8273C14.0972 16.4265 14.0972 16.9113 13.64 17.6997L11.3976 20.2485C11.0359 20.6081 10.5469 20.8103 10.0347 20.8111L6.66378 20.8158L5.47455 22L2.5 19.0395L3.68927 17.8553L3.70082 14.4912C3.70082 13.9836 3.90338 13.4974 4.26507 13.1387L6.37153 11.0404C6.96759 10.4485 8.15685 10.4485 8.73844 11.0404L8.74424 11.0465L10.5295 9.26998L11.7188 10.4542L9.93347 12.2305L12.3119 14.599L14.0972 12.8227L15.2315 13.9548Z" />
  </svg>
)

const IconThemes = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"></path>
    <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6Z" fill="currentColor"></path>
  </svg>
)

const IconProfile = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
)

const IconPerformance = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </svg>
)

const IconChangelog = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor">
    <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
  </svg>
)

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

let settingsUninjects = []

;(async () => {
  // @ts-expect-error womp womp
  const platform = await window.__TAURI__.core.invoke('get_platform')

  settingsUninjects = [
    registerSection('divider'),
    registerSection('header', appName),
    registerSection('section', `${appName}-settings`, t('dorion_settings.title', { appName }), SettingsPage, {
      icon: IconCog,
    }),
    registerSection('section', `${appName}-plugins`, t('common.plugins'), PluginsPage, {
      icon: IconPlugins,
    }),
    registerSection('section', `${appName}-themes`, t('common.themes'), ThemesPage, {
      icon: IconThemes,
    }),
    registerSection('section',  `${appName}-performance`, t('dorion_performance.title'), PerformancePage, {
      icon: IconPerformance,
    }),
    platform !== 'macos' && registerSection('section', `${appName}-rpc`, t('dorion_rpc.title'), RPCPage),
    registerSection('section', `${appName}-profiles`, t('dorion_profiles.title'), ProfilesPage, {
      icon: IconProfile,
    }),
  ]
})()

const appendAppVersion = async () => {
  let tries = 0
  const infoBoxSelector = 'div[class*="sidebar_"] div[class*="compactInfo_"]'
  const hash = await invoke('git_hash').catch((e) => console.error(e)) || ''

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

  if (hash) {
    newVersionThing.innerHTML += ` (${hash.slice(0, 7)})`
  }

  // @ts-expect-error This works
  newVersionThing.classList.add(...firstChild.classList)
  newVersionThing.style.color = firstChild.style.color
  newVersionThing.style.textTransform = 'none'

  versionThings.appendChild(newVersionThing)
}

const checkForUpdates = async () => {
  const updateCheck = await invoke('update_check')
  let needsUpdate = false

  if (updateCheck.includes('dorion')) needsUpdate = true

  settingsUninjects.push(
    registerSection('section', `${appName}-changelog`, t('dorion_changelog.title'), ChangelogPage, {
      icon: IconChangelog,
      badgeCount: needsUpdate ? 1 : 0
    })
  )
}

dispatcher.subscribe('USER_SETTINGS_MODAL_OPEN', appendAppVersion)

checkForUpdates()

export const onUnload = () => {
  settingsUninjects.forEach((u) => u && u())
  dispatcher.unsubscribe('USER_SETTINGS_MODAL_OPEN', appendAppVersion)
}