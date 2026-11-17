import { css, classes } from './index.scss'

const {
  plugin: { store, scoped },
  solid: { createSignal },
  util: { getFiber },
  flux: { storesFlat },
  ui: {
    Header,
    HeaderTags,
    Select,
    SelectOption,
    injectCss,
  },
} = shelter

type Mode = 'off' | 'dms' | 'quests' | 'nitro' | 'shop' | 'guild'

const MODES: { label: string, value: Mode }[] = [
  { label: 'Discord default', value: 'off' },
  { label: 'Direct Messages', value: 'dms' },
  { label: 'Quests', value: 'quests' },
  { label: 'Nitro', value: 'nitro' },
  { label: 'Shop', value: 'shop' },
  { label: 'Server', value: 'guild' },
]

const HOME_ROUTES: Record<string, string> = {
  dms: '/channels/@me',
  quests: '/quest-home',
  nitro: '/store',
  shop: '/shop',
}

// routes Discord can land on at launch
const LAUNCH_ROUTES = ['/app', '/', '/channels/@me', '/quest-home', '/store', '/shop']

injectCss(css)

// Fix Select list options being within the container
injectCss(`
  [class*="wrap"]:has(> [role=combobox]) {
    anchor-name: --shelter-select;
  }

  [class*="wrap"]:not([class*="open"]) > [role=listbox] {
    max-height: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }

  [class*="wrap"] > [role=listbox] {
    position: fixed !important;
    top: calc(anchor(--shelter-select bottom) + 4px) !important;
    left: anchor(--shelter-select left) !important;
    z-index: 10000 !important;
  }
`)

function targetPath(): string | null {
  const mode: Mode = store.mode ?? 'off'
  if (mode === 'off') return null
  if (mode !== 'guild') return HOME_ROUTES[mode]

  const guildId = store.guildId
  if (!guildId || !storesFlat.GuildStore.getGuild(guildId)) return null

  const channelId = store.channelId
  if (channelId && storesFlat.ChannelStore.hasChannel(channelId)) {
    return `/channels/${guildId}/${channelId}`
  }
  return `/channels/${guildId}`
}

function findNavigator() {
  const mount = document.getElementById('app-mount')
  if (!mount) return null

  for (const child of mount.children) {
    let node = getFiber(child)
    while (node) {
      const props = node.memoizedProps
      if (props && props.navigator) return props.navigator
      node = node.return
    }
  }
  return null
}

let nav: any = null
let origPush: any = null
let origReplace: any = null
let pollTimer: ReturnType<typeof setInterval> | null = null
let armTimer: ReturnType<typeof setInterval> | null = null

let launchDone = false
let armed = false

function rewrite(): string | null {
  if (launchDone) return null
  launchDone = true

  // deep links on cold load are intentional
  if (!LAUNCH_ROUTES.includes(location.pathname)) return null

  const target = targetPath()
  if (target && target !== location.pathname) return target

  // guild data may not be loaded at launch
  if (store.mode === 'guild' && store.guildId && !storesFlat.GuildStore.getGuild(store.guildId)) {
    armed = true
  }

  return null
}

function patch(navigator: any) {
  nav = navigator
  origPush = navigator.push
  origReplace = navigator.replace

  navigator.push = (to: any, ...rest: any[]) => {
    armed = false
    const target = rewrite()
    return target ? origPush(target, ...rest) : origPush(to, ...rest)
  }

  navigator.replace = (to: any, ...rest: any[]) => {
    armed = false
    const target = rewrite()
    return target ? origReplace(target, ...rest) : origReplace(to, ...rest)
  }

  // plugin loaded after the app already navigated
  if (location.pathname !== '/app') {
    const target = rewrite()
    if (target) navigator.replace(target)
  }

  if (store.mode === 'guild') {
    armTimer = setInterval(() => {
      if (!armed) {
        clearInterval(armTimer!)
        armTimer = null
        return
      }
      const target = targetPath()
      if (target && target !== location.pathname) {
        armed = false
        navigator.replace(target)
        clearInterval(armTimer!)
        armTimer = null
      }
    }, 250)
  }
}

function start() {
  const navigator = findNavigator()
  if (navigator) return patch(navigator)

  pollTimer = setInterval(() => {
    const navigator = findNavigator()
    if (navigator) {
      clearInterval(pollTimer!)
      pollTimer = null
      patch(navigator)
    }
  }, 50)
}

scoped.onDispose(() => {
  if (pollTimer) clearInterval(pollTimer)
  if (armTimer) clearInterval(armTimer)
  if (nav) {
    nav.push = origPush
    nav.replace = origReplace
  }
})

start()

export const settings = () => {
  const [mode, setMode] = createSignal<Mode>(store.mode ?? 'off')
  const [guildId, setGuildId] = createSignal<string>(store.guildId ?? '')
  const [channelId, setChannelId] = createSignal<string>(store.channelId ?? '')

  const guilds = () => storesFlat.GuildStore.getGuildIds()
    .map(id => storesFlat.GuildStore.getGuild(id))
    .filter(g => g)
    .sort((a, b) => a.name.localeCompare(b.name))

  const channels = () => guildId()
    ? (storesFlat.GuildChannelStore.getSelectableChannels(guildId()) ?? [])
      .map(c => c.channel)
      .filter(c => c && c.type !== 4)
    : []

  const fitPopper = (e: Event) => {
    const wrap = e.currentTarget as HTMLElement
    const lb = wrap.querySelector('[role=listbox]') as HTMLElement | null
    if (lb) lb.style.width = `${wrap.offsetWidth}px`
  }

  const pick = (m: Mode) => {
    setMode(m)
    store.mode = m
  }

  return (
    <div style={{ padding: '4px 8px' }}>
      {MODES.map(m => (
        <div
          class={`${classes.row}${mode() === m.value ? ` ${classes.selected}` : ''}`}
          onClick={() => pick(m.value)}
        >
          <div class={classes.dot}></div>
          <div class={classes.label}>{m.label}</div>
        </div>
      ))}

      {mode() === 'guild' && (
        <>
          <Header tag={HeaderTags.H3} margin={false} style={{ 'margin-top': '12px', 'margin-bottom': '6px' }}>Server</Header>
          <Select
            onClick={fitPopper}
            value={guildId()}
            placeholder="Pick a server"
            onChange={(id: string) => {
              setGuildId(id)
              store.guildId = id
              setChannelId('')
              store.channelId = ''
            }}
          >
            {guilds().map(g => <SelectOption value={g.id}>{g.name}</SelectOption>)}
          </Select>

          <Header tag={HeaderTags.H3} margin={false} style={{ 'margin-top': '12px', 'margin-bottom': '6px' }}>Channel</Header>
          <Select
            onClick={fitPopper}
            value={channelId()}
            placeholder="Default channel"
            onChange={(id: string) => {
              setChannelId(id)
              store.channelId = id
            }}
          >
            {channels().map(c => <SelectOption value={c.id}>{c.name}</SelectOption>)}
          </Select>
        </>
      )}

    </div>
  )
}
