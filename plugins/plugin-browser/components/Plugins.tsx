import { css, classes } from './Plugins.scss'
import { PluginCard } from './PluginCard'
import { getAllPlugins, getPluginJson } from '../github.js'
import { getPluginsCache } from '../storage.js'

const {
  ui: {
    injectCss,
    Header,
    HeaderTags,
    Text,
  },
  solid: {
    createSignal,
    createEffect,
  }
} = shelter

let injectedCss = false

export function Plugins() {
  if (!injectedCss) {
    injectCss(css)
    injectedCss = true
  }

  const [repos, setRepos] = createSignal<RepoInfo[]>([])

  createEffect(async () => {
    setRepos(getPluginsCache() ||  await getAllPlugins())
  })

  return (
    <>
      <Header tag={HeaderTags.H1}>Plugins</Header>

      <Text>
        Not seeing your plugin repo? <a href="">Take a look</a> at how this plugin finds repos!
      </Text>

      {
        repos().map((repo: RepoInfo) => {
          return (
            <>
              <Header tag={HeaderTags.H2}>{repo.repo.owner}</Header>

              <div class={classes.pluginList}>
                {
                  repo.plugins.map((p: string) => {
                    // TODO: filter out already installed plugins
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
        })
      }
    </>
  )
}