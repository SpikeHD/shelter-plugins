const baseUrl = 'https://cdn.discordapp.com'

export const generateIconUrl = (appId: string, icon: string) => {
  return `${baseUrl}/app-icons/${appId}/${icon}.png`
}

export const generateCoverUrl = (appId: string, cover: string) => {
  return `${baseUrl}/app-assets/${appId}/${cover}.png`
}
export const generateAssetUrl = (appId: string, asset: string) => {
  return `${baseUrl}/app-assets/${appId}/${asset}.png`
}