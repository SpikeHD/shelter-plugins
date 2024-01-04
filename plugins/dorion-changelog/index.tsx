import { ChangelogPage } from './components/ChangelogPage.jsx'

const {
  settings: {
    registerSection,
  },
  // flux: {
  //   dispatcher
  // },
  // util: {
  //   sleep
  // },
} = shelter

const { invoke } = (window as any).__TAURI__

let settingsUninjects = [
  registerSection('divider'),
  registerSection('header', 'Dorion'),
]

export const onUnload = () => {
  settingsUninjects.forEach((u) => u())
}

invoke('update_check')
  .then((updateCheck: string) => updateCheck.includes('dorion'))
  .then((needsUpdate: boolean) => {
    settingsUninjects.push(registerSection('section', 'dorion-changelog', 'Changelog', ChangelogPage, { 
      badgeCount: needsUpdate ? 1 : 0 
    }))
  })
