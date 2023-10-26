import { PerformancePage } from './components/PerformancePage'
import { ProfilesPage } from './components/ProfilesPage'
import { SettingsPage } from './components/SettingsPage'

const {
  settings: {
    registerSection,
  }
} = shelter

const settingsUninjects = [
  registerSection('divider'),
  registerSection('header', 'Dorion'),
  registerSection('section', 'dorion-settings', 'Dorion Settings', SettingsPage),
  registerSection('section', 'dorion-performance', 'Performance & Extras', PerformancePage),
  registerSection('section', 'dorion-profiles', 'Profiles', ProfilesPage)
]

export const onUnload = () => {
  settingsUninjects.forEach((u) => u())
}