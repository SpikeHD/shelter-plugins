const baseUrl = 'https://cdn.discordapp.com'

export const generateIconUrl = (appId: string, icon: string) => {
  return `${baseUrl}/app-icons/${appId}/${icon}.png`
}

export const generateCoverUrl = (appId: string, cover: string) => {
  return `${baseUrl}/app-icons/${appId}/${cover}.png`
}

export const generateAssetUrl = (appId: string, asset: string) => {
  return `${baseUrl}/app-assets/${appId}/${asset}.png`
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