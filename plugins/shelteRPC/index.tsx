import { createApi, webpackChunk } from '@cumjar/websmack'
import { backend, invoke } from '../../api/api.js';
import RegisteredGames from './components/RegisteredGames'
import { css, classes } from './index.scss'

const {
  flux: {
    dispatcher: FluxDispatcher
  },
  settings: { registerSection },
  ui: {
    Header,
    HeaderTags,
    TextBox,
    Text,
    showToast,
    injectCss
  },
  plugin: { store },
  http,
} = shelter

const chunk = webpackChunk()
const wp = chunk && createApi([undefined, ...chunk])
const c = wp.findByCode('getAssetImage: ')
const fetchAssetIds = async (id, asset) => (await c.fetchAssetIds(id, [asset, null]))[0]

let injectedCss = false

if (!injectedCss) {
  injectedCss = true
  injectCss(css)
}

let maybeUnregisterGameSettings = [() => {}]

let ws: WebSocket
const apps: Record<string, { name: string } | string> = {}

// when we load, set current game as nothing
store.currentlyPlaying = ''

async function lookupApp(appId: string): Promise<string> {
  return (await http.get(`/oauth2/applications/${appId}/rpc`))?.body || 'Unknown'
}

async function handleMessage(e: MessageEvent<string>) {
  const data = JSON.parse(e.data)
  const assets = data.activity?.assets

  if (data.cmd) return handleCmd(data)

  if (assets?.large_image)
    assets.large_image = await fetchAssetIds(
      data.activity.application_id,
      assets.large_image
    )
  if (assets?.small_image)
    assets.small_image = await fetchAssetIds(
      data.activity.application_id,
      assets.small_image
    )

  if (data.activity) {
    const appId = data.activity.application_id
    apps[appId] ||= await lookupApp(appId).catch(() => 'Unknown')

    const app = apps[appId]
    if (typeof app !== 'string') {
      data.activity.name ||= app.name
    }

    store.currentlyPlaying = data.activity.name

    if (!store.previouslyPlayed) store.previouslyPlayed = {}

    // If this isn't already in the list, add it
    if (!(data.activity.name in store.previouslyPlayed)) {
      store.previouslyPlayed[data.activity.name] = {}
    }

    store.previouslyPlayed[data.activity.name].name = data.activity.name
    store.previouslyPlayed[data.activity.name].appid =
      data.activity.application_id
    store.previouslyPlayed[data.activity.name].lastPlayed = Date.now()
    store.previouslyPlayed[data.activity.name].local =
      data.activity.application_id === '1337'
  } else {
    // Clear out "currentlyPlaying"
    store.currentlyPlaying = ''
  }

  // If this activity should be hidden, don't update activity
  if (store?.previouslyPlayed?.[data.activity?.name]?.hide) return

  FluxDispatcher.dispatch({
    type: 'LOCAL_ACTIVITY_UPDATE',
    ...data,
  })
}

const handleCmd = async (payload: any) => {
  switch(payload.cmd) {
  case 'INVITE_BROWSER':
    const code = payload.args.code

    if (code === '') {
      // This should never happen
      return
    }
    
    // This is mostly to better replicate client behaviour
    FluxDispatcher.dispatch({
      type: 'INVITE_RESOLVE',
      code
    })

    const resp = await http.get(`/invites/${code}`)
    const invite = resp.body

    if (resp.status !== 200) {
      FluxDispatcher.dispatch({
        type: 'INVITE_RESOLVE_FAILED',
        code,
        ...resp.body,
      })
      return
    }

    FluxDispatcher.dispatch({
      type: 'INVITE_RESOLVE_SUCCESS',
      code,
      invite,
    })

    FluxDispatcher.dispatch({
      type: 'INVITE_MODAL_OPEN',
      context: 'APP',
      code,
      invite,
    })

    backend !== 'None' && invoke('ultrashow')
  }
}

const retry = async (fn: (curTry: number) => any, times: number = 5, wait: number = 500) => {
  let result

  for (let i = 0; i < times; i++) {
    result = await fn(i)
    if (result) return result
    await new Promise((r) => setTimeout(r, wait))
  }

  return result
}

export const onLoad = async () => {
  if (ws && ws?.close) ws.close()

  const connected = await retry(
    async (curTry) => {
      ws = new WebSocket('ws://127.0.0.1:1337')
      ws.onmessage = handleMessage
      ws.onerror = (e) => { throw e }

      await new Promise((r) => setTimeout(r, 1000))

      if (ws.readyState !== WebSocket.OPEN) {
        ws?.close?.()
        ws = null

        showToast({
          title: 'ShelteRPC',
          content: `Unable to connect to ShelteRPC server (${curTry})`,
          duration: store.retryWait ?? 3000,
        })

        return false
      }

      return true
    },
    store.retryCount ?? 3,
    store.retryWait ?? 3000,
  )

  maybeUnregisterGameSettings = [
    registerSection('divider'),
    registerSection('header', 'shelteRPC'),
    registerSection(
      'section',
      'shelterpc',
      'Registered Games',
      RegisteredGames
    )
  ]

  if (!connected) return

  ws.onclose = () => {
    showToast({
      title: 'ShelteRPC',
      content: 'ShelteRPC server disconnected',
      duration: 3000,
    })
  }

  showToast({
    title: 'ShelteRPC',
    content: 'Connected to ShelteRPC server',
    duration: 3000,
  })
}

export const onUnload = async () => {
  if (ws?.close) ws.close?.()

  if (maybeUnregisterGameSettings) {
    maybeUnregisterGameSettings.forEach((section) => section())
  }
}

export const settings = () => (
  <>
    <Header tag={HeaderTags.H1}>Connection</Header>
    <br />
    <div class={classes.container}>
      <Text>Connection Retry Count</Text>
      <TextBox
        value={store.retryCount ?? 3}
        onInput={(v) => store.retryCount = v}
        type="number"
      />
    </div>

    <div class={classes.container}>
      <Text>Connection Retry Wait (milliseconds)</Text>
      <TextBox
        value={store.retryWait ?? 3000}
        onInput={(v) => store.retryWait = v}
        type="number"
      />
    </div>
  </>
)