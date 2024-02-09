import { event } from '../../api/api.js'

const {
  flux: {
    dispatcher: FluxDispatcher
  }
} = shelter


const unlisten = event.listen('streamer_mode_toggle', (event) => {
  const enabled = event.payload

  FluxDispatcher.dispatch({
    type: 'STREAMER_MODE_UPDATE',
    key: 'enabled',
    value: enabled,
  })
})

export const onUnload = () => {
  unlisten()
}
