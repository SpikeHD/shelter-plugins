// Save the list of all plugins and repos to localStorage
export function savePluginsCache(cache: object) {
  localStorage.setItem('plugins-browser-cache', `${Date.now()};${JSON.stringify(cache)}`)
}

export function getPluginsCache() {
  const cache = localStorage.getItem('plugins-browser-cache')
  if (!cache) {
    return null
  }

  const json = cache.split(';')[1]
  let cacheJson = null

  try {
    cacheJson = JSON.parse(json)
  } catch (e) {
    console.log('[Plugin Browser] Error parsing cache JSON: ', e)
    return null
  }

  // check and see if we can clear cache
  maybeClearCache()

  return cacheJson
}

export function maybeClearCache() {
  // If its been more than an hour, clear it
  const cache = getPluginsCache()
  if (!cache) {
    return
  }

  const time = cache.split(';')[0]

  if (Date.now() - parseInt(time) > 1000 * 60 * 60) {
    localStorage.removeItem('plugins-browser-cache')
  }
}