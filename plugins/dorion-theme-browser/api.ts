import { api } from '../../api/api.js'

interface ThemeOptions {
  filter?: string
  page?: string
  sort?: 'popular' | 'creationdate' | 'name' | 'likes' | 'downloads' | 'recentlyupdated'
}

const BASE = 'https://betterdiscord.app'

export const themeListEndpoint = async (options: ThemeOptions) => {
  const query = new URLSearchParams(options as Record<string, string>)

  query.set('type', 'theme')
  query.set('pages', '1')
  query.set('sortDirection', 'descending')
  query.set('tags', '[]')

  const resp = await fetch(`${BASE}/Addon/GetApprovedAddons?${query}`)

  if (!resp.ok) {
    throw new Error('Failed to fetch themes')
  }

  const parser = new DOMParser()
  const dom = parser.parseFromString(await resp.text(), 'text/html')

  const themes = await Promise.all(Array.from(dom.querySelectorAll('.card-wrap')).map(async (e: Element) => ({
    thumbnail: await api.util.fetchImage(`${BASE}${e.querySelector('.card-image')?.getAttribute('src')}`),
    name: e.querySelector('.card-title')?.textContent?.trim(),
    author: e.querySelector('.author-link')?.textContent?.trim(),
    description: e.querySelector('.card-description')?.textContent?.trim(),
    likes: e.querySelector('#addon-likes')?.textContent?.trim(),
    downloads: e.querySelector('#addon-downloads')?.textContent?.trim(),
    install_url: `${BASE}${e.querySelector('.btn-primary')?.getAttribute('href')}`,
  })))

  return themes
}