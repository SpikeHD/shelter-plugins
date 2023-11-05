interface AssetCache {
  [key: string]: {
    id: string
    name: string
    type: number
  }[]
}

const {
  http
} = shelter

const baseUrl = 'https://cdn.discordapp.com'
const cachedAssets: AssetCache = {}

export const generateIconUrl = (appId: string, icon: string) => {
  return `${baseUrl}/app-icons/${appId}/${icon}.png`
}

export const generateCoverUrl = (appId: string, cover: string) => {
  return `${baseUrl}/app-icons/${appId}/${cover}.png`
}

export const generateAssetId = async (appId: string, asset: string) => {
  // get cached assets for the appid if we dont have them already
  if (!cachedAssets[appId]) {
    const resp = await http.get(`/oauth2/applications/${appId}/assets`)

    if (resp.status !== 200) {
      console.log('Failed to fetch assets')
    }

    cachedAssets[appId] = resp.body as AssetCache[typeof appId]
  }

  const assetId = cachedAssets[appId].find(a => a.name === asset)?.id

  return assetId
}

/**
 * Convert the timestamp to something like "2 minutes ago" or "Just now", showing only the largest unit
 */
export const timestampToRelative = (timestamp: number) => {
  const now = Date.now()
  const diff = now - timestamp

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  }

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  }

  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }

  return 'Just now'
}