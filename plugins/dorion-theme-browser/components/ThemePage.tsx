import { Dropdown } from '../../../components/Dropdown.jsx'
import { debounce } from '../../../util/debounce.js'
import { themeListEndpoint } from '../api.js'
import { ThemeCard } from './ThemeCard.jsx'
import { css, classes } from './ThemePage.tsx.scss'

const {
  ui: {
    injectCss,
    Divider,
    Header,
    HeaderTags,
    TextBox
  },
  solid: {
    createSignal,
    createEffect,
  },
} = shelter

let injectedCss = false

export function ThemePage() {
  if (!injectedCss) {
    injectCss(css)
    injectedCss = true
  }

  const [themeData, setThemeData] = createSignal<any[]>([])
  const [sort, setSort] = createSignal('popular')
  const [search, setSearch] = createSignal('')

  createEffect(async () => {
    await loadThemes()
  })

  const loadThemes = async () => {
    setThemeData(await themeListEndpoint({ page: '1', sort: sort(), filter: search() }))
  }

  const doSearch = debounce((v: string) => setSearch(v), 500)

  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.tophead}>Theme Browser</Header>

      <div class={classes.sortSection}>
        <Dropdown
          value={sort()}
          onChange={(e) => {
            setSort(e.target.value)
            loadThemes()
          }}
          style='width: 30%;'
          options={[
            { label: 'Popular', value: 'popular' },
            { label: 'Creation Date', value: 'creationdate' },
            { label: 'Name', value: 'name' },
            { label: 'Likes', value: 'likes' },
            { label: 'Downloads', value: 'downloads' },
            { label: 'Recently Updated', value: 'recentlyupdated' },
          ]}
          placeholder={'Sort by...'}
        />

        <span class={classes.searchBox}>
          <TextBox
            value={search()}
            onInput={(v) => doSearch(v)}
            placeholder={'Search...'}
          />
        </span>
      </div>


      <Divider mt={16} mb={16} />

      <div class={classes.themeCards}>
        {
          themeData().map((t) => (
            <ThemeCard
              key={t.name}
              thumbnail={t.thumbnail}
              likes={t.likes}
              downloads={t.downloads}
              theme={t.name}
              description={t.description}
              author={t.author}
              install_url={t.install_url}
            />
          ))
        }
      </div>
    </>
  )
}