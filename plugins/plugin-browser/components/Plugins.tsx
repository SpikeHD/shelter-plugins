import { css, classes } from './Plugins.scss'
import { PluginCard } from './PluginCard'
import { getAllPlugins } from '../github.js'
import { getPluginsCache } from '../storage.js'

const {
  ui: {
    injectCss,
    Header,
    HeaderTags,
    Text,
    Divider,
    TextBox,
    showToast
  },
  solid: {
    createSignal,
    createEffect,
  }
} = shelter

let injectedCss = false
const debounce = (fn: (...args) => any, ms: number) => {
  let timeoutId = null
  return (...args) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      fn(...args)
    }, ms)
  }
}

export function Plugins() {
  if (!injectedCss) {
    injectCss(css)
    injectedCss = true
  }

  const [repos, setRepos] = createSignal<RepoInfo[]>([])
  const [search, setSearch] = createSignal('')

  createEffect(async () => {
    setRepos(getPluginsCache() ||  await getAllPlugins().catch((e) => {
      console.error(e)

      showToast({
        title: 'Plugin Browser',
        content: 'Failed to load plugins, check DevTools for error.',
        duration: 5000,
      })

      return []
    }))
  })

  return (
    <>
      <Header tag={HeaderTags.H1}>Plugins</Header>

      <Text class={classes.subtitle}>
        Not seeing your plugin repo? <a href="https://github.com/SpikeHD/shelter-plugins/tree/main/plugins/plugin-browser" target="_blank">Take a look</a> at how this plugin finds repos!
      </Text>

      <Divider mt={16} mb={16} />

      <TextBox
        value={search()}
        onInput={debounce((v) => setSearch(v), 100)}
        placeholder={'Search...'}
      />

      {
        repos().length > 0 ? repos().map((repo: RepoInfo) => {
          return (
            <>
              <Divider mt={16} mb={16} />
              <div class={classes.repoHeader}>
                <Header tag={HeaderTags.H2}>{repo.repo.owner}</Header>
                <Header tag={HeaderTags.H2}>
                  <a href={repo.repo.url} target="_blank">View Repository</a> - {repo.repo.stars} ⭐
                </Header>
              </div>

              <div class={classes.pluginList}>
                {
                  repo.plugins.map((p: string) => {
                    if (p.toLowerCase().includes('dorion')) return null
                    if (!p.toLowerCase().includes(search().toLowerCase())) return null

                    return (
                      <PluginCard
                        plugin={p}
                        site={repo.site}
                        author={repo.repo.owner}
                        install_url={`${repo.site}/${p}`}
                      />
                    )
                  })
                }
              </div>
            </>
          )
        }) : (
          <Text>Loading...</Text>
        )
      }
    </>
  )
}