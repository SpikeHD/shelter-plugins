interface Repo {
  name: string
  description: string
  url: string
  stars: number
  owner: string
  owner_url: string
  owner_avatar: string
  homepage: string
}

interface RepoInfo {
  repo: Repo
  site: string
  plugins: string[]
}