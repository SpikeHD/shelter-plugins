import { appName, api, invoke } from '../api/api.js'

export const installAndLoad = async (link: string, statusUpdater: (string) => void, filename?: string) => {
  statusUpdater('Fetching...')

  const themeName = await invoke('theme_from_link', {
    link,
    filename
  })

  statusUpdater(`Applying ${themeName} ...`)

  // Save the theme to the config
  const config = JSON.parse(await invoke('read_config_file'))

  config?.themes?.push(themeName) 

  statusUpdater('Saving...')

  await invoke('write_config_file', {
    contents: JSON.stringify(config)
  })

  // Get the Dorion theme style tag, replace the contents
  await reloadThemes()

  statusUpdater('Done!')

  return themeName
}


export const reloadThemes = async () => {
  // Get the Dorion theme style tag, replace the contents
  const themeTag = document.getElementById(`${appName.toLowerCase()}-theme`) as HTMLStyleElement

  // Get the initial theme
  const themeContents = await invoke('get_themes').catch(e => console.error(e))

  // Create a "name" for the "theme" (or combo) based on the retrieved enabled theme list
  const themeNames = await invoke('get_enabled_themes').catch(e => console.error(e)) || []
  // Gotta adhere to filename length restrictions
  const themeName = themeNames.join('').substring(0, 254)

  if (themeName === '') {
    themeTag.innerHTML = ''
    return
  }

  const localized = await invoke('localize_imports', {
    css: themeContents,
    name: themeName
  })

  // Internal Dorion function
  const contents = api.util.cssSanitize(localized)

  themeTag.innerHTML = contents
}
