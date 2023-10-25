import { SettingsPage } from './components/SettingsPage'

const {
  settings: {
    registerSection,
  }
} = shelter

const settingsUninjects = [
  registerSection('divider'),
  registerSection('header', 'Dorion'),
  registerSection('section', 'dorion-settings', 'Dorion Settings', SettingsPage)
]

export const onUnload = () => {
  settingsUninjects.forEach((u) => u())
}