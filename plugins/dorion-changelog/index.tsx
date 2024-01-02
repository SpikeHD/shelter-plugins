// import { PerformancePage } from './components/PerformancePage'
// import { ProfilesPage } from './components/ProfilesPage'
// import { SettingsPage } from './components/SettingsPage'

import { ChangelogPage } from "./components/ChangelogPage.jsx"

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

const { app } = (window as any).__TAURI__

const settingsUninjects = [
  registerSection('divider'),
  registerSection('header', 'Dorion'),
  registerSection('section', 'dorion-changelog', 'Changelog', ChangelogPage),
]

export const onUnload = () => {
  settingsUninjects.forEach((u) => u())
}