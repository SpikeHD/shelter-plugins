import RegisteredGames from './components/RegisteredGames'
import { generateAssetId } from './util'

const {
  flux: {
    dispatcher: FluxDispatcher,
    stores: {
      GameStore
    }
  },
  settings: {
    registerSection
  },
  ui: {
    showToast
  },
  plugin: {
    store
  },
  http
} = shelter

let maybeUnregisterGameSetting = () => {}

let ws: WebSocket
const apps: Record<string, { name: string } | string> = {}

async function lookupApp(name: string): Promise<string> {
  return GameStore.getGameByName(name)?.name || 'Unknown'
}

async function handleMessage(e: MessageEvent<string>) {
  console.log(e.data)
  const data = JSON.parse(e.data)
  const assets = data.activity?.assets

  if (assets?.large_image) assets.large_image = await generateAssetId(data.activity.application_id, assets.large_image)
  if (assets?.small_image) assets.small_image = await generateAssetId(data.activity.application_id, assets.small_image)

  if (data.activity) {
    const appId = data.activity.application_id
    apps[appId] ||= await lookupApp(data.activity.name)
    
    const app = apps[appId]
    if (typeof app !== 'string') {
      data.activity.name ||= app.name
    }

    store.currentlyPlaying = data.activity.name

    if (!store.previouslyPlayed) store.previouslyPlayed = {}

    // If this isn't already in the list, add it
    if (!(data.activity.application_id in store.previouslyPlayed)) {
      store.previouslyPlayed[data.activity.application_id] = {}
    }
    
    store.previouslyPlayed[data.activity.application_id] = {
      name: data.activity.name,
      lastPlayed: Date.now()
    }
  } else {
    // Clear out "currentlyPlaying"
    store.currentlyPlaying = ''
  }
  
  FluxDispatcher.dispatch({
    type: 'LOCAL_ACTIVITY_UPDATE',
    ...data
  })
}

export const onLoad = async () => {
  if (ws && ws?.close) ws.close()

  ws = new WebSocket('ws://127.0.0.1:1337')
  ws.onmessage = handleMessage
  ws.onerror = (e) => console.error(e)

  // See if we were able to connect after a second
  const connected = await new Promise(r => setTimeout(() => {
    if (ws.readyState !== WebSocket.OPEN) {
      console.log(ws)
      ws?.close()
      ws = null

      showToast({
        title: 'ShelteRPC',
        content: 'Unable to connect to ShelteRPC server',
        duration: 3000
      })

      r(false)
    }

    r(true)
  }, 1000))

  if (!connected) return

  ws.onclose = () => {
    showToast({
      title: 'ShelteRPC',
      content: 'ShelteRPC server disconnected',
      duration: 3000
    })
  }

  showToast({
    title: 'ShelteRPC',
    content: 'Connected to ShelteRPC server',
    duration: 3000
  })

  maybeUnregisterGameSetting = registerSection('section', 'shelterpc', 'Registered Games', RegisteredGames)
}

export const onUnload = async () => {
  ws?.close()
  
  if (maybeUnregisterGameSetting) maybeUnregisterGameSetting()
}