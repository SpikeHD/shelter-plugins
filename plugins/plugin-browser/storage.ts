// Save the list of all plugins and repos to localStorage
export function savePluginsCache(cache: object) {
  localStorage.setItem('plugins-browser-cache', `${Date.now()};${JSON.stringify(cache)}`)
}

export function getPluginsCache() {
  const cache = localStorage.getItem('plugins-browser-cache')
  if (!cache) {
    return null
  }

  const [time, json] = cache.split(';')
  let cacheJson = null

  try {
    cacheJson = JSON.parse(json)
  } catch (e) {
    console.log('[Plugin Browser] Error parsing cache JSON: ', e)
    return null
  }

  // check and see if we can clear cache
  maybeClearCache(time)

  return cacheJson
}

export function maybeClearCache(time: string) {
  // If its been more than an hour, clear it
  if (Date.now() - parseInt(time) > 1000 * 60 * 60) {
    localStorage.removeItem('plugins-browser-cache')
  }
}

export function getPluginJsonCache() {
  const cache = localStorage.getItem('plugins-browser-plugin-json')
  if (!cache) {
    return {}
  }

  const [time, json] = cache.split(';')
  let cacheJson = null

  try {
    cacheJson = JSON.parse(json)
  } catch (e) {
    console.log('[Plugin Browser] Error parsing cache JSON: ', e)
    return {}
  }

  // check and see if we can clear cache
  maybeClearPluginJsonCache(time)

  return cacheJson
}

export function savePluginJsonCache(url: string, json: object) {
  localStorage.setItem('plugins-browser-plugin-json', `${Date.now()};${JSON.stringify({ ...getPluginJsonCache(), [url]: json })}`)
}

export function maybeClearPluginJsonCache(time: string) {
  // If its been more than an hour, clear it
  if (Date.now() - parseInt(time) > 1000 * 60 * 60) {
    localStorage.removeItem('plugins-browser-plugin-json')
  }
}