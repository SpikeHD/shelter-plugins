import { appName } from '../../api/api.js'
import { ThemePage } from './components/ThemePage.jsx'

const {
  settings: {
    registerSection,
  },
} = shelter

const uninjects = [
  registerSection('divider'),
  registerSection('header', 'Theme Browser'),
  registerSection('section', `${appName}-theme-browser`, 'Theme Browser', ThemePage),
]

export const onUnload = () => {
  uninjects.forEach((u) => u())
}