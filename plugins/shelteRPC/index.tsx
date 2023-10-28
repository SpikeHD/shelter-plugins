const {
  flux: {
    dispatcher: FluxDispatcher
  },
  ui: {
    showToast
  }
} = shelter

let ws: WebSocket
const apps: Record<string, { name: string }> = {}

async function lookupApp(id: string) {
  // stub
  return false
}

async function fetchAssetIds(applicationId: string, keys: string[]) {
  // stub
  return ['none']
}

async function lookupAsset(applicationId: string, key: string): Promise<string> {
  return (await fetchAssetIds(applicationId, [key]))[0]
}

async function handleMessage(e: MessageEvent<string>) {
  const data = JSON.parse(e.data)
  const assets = data.activity?.assets

  if (assets?.large_image) assets.large_image = await lookupAsset(data.activity.application_id, assets.large_image)
  if (assets?.small_image) assets.small_image = await lookupAsset(data.activity.application_id, assets.small_image)

  if (data.activity) {
    const appId = data.activity.application_id
    apps[appId] ||= await lookupApp(appId)
    
    const app = apps[appId]
    data.activity.name ||= app.name
  }

  FluxDispatcher.dispatch({
    type: 'LOCAL_ACTIVITY_UPDATE',
    ...data
  })
}


export const onLoad = async () => {
  if (ws) ws.close()

  ws = new WebSocket('ws://127.0.0.1:1337')
  ws.onmessage = handleMessage

  // See if we were able to connect after a second
  const connected = await new Promise(r => setTimeout(() => {
    if (ws.readyState !== WebSocket.OPEN) {
      ws.close()
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
}

export const onUnload = () => {
  ws.close()
}