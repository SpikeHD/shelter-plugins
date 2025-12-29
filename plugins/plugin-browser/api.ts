export type PluginRepo = {
  name: string
  url: string
  plugins: PluginData[]
}

export type PluginData = {
  name: string
  author: string
  description: string
  url: string
}

export async function getAllPlugins(): Promise<PluginRepo[]> {
  const response = await fetch('https://shindex.uwu.network/data')
  const data = await response.json()
  return data as PluginRepo[]
}
