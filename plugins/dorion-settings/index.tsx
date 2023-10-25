import { SettingsPage } from "./components/SettingsPage"

const {
  settings: {
    registerSection,
  }
} = shelter

let settingsUninjects = [
  registerSection("divider"),
  registerSection("header", "Dorion"),
  registerSection("section", "dorion-settings", "Dorion Settings", SettingsPage)
]

export const onUnload = () => {
  settingsUninjects.forEach((u) => u())
}