import { css, classes } from './index.tsx.scss'

const {
  flux: {
    storesFlat: {
      UserStore,
      SelectedChannelStore
    },
  },
  util: {
    getFiber,
    reactFiberWalker
  },
  plugin: {
    scoped: {
      flux: {
        subscribe
      }
    }
  },
  observeDom
} = shelter

const style = document.createElement('style')
style.innerHTML = css
style.id = 'youre-right-styles'

document.head.appendChild(style)

function handleElm(elm) {
  const message = reactFiberWalker(getFiber(elm), 'message', true)?.pendingProps?.message
  const id = UserStore.getCurrentUser().id
  if (!message || message.author.id !== id || elm.classList.contains(classes.youreRight)) return

  elm.classList.add(classes.youreRightItem)
}

function handleDispatch(payload) {
  // only listen for message_create in the current channel
  if (payload.type === 'MESSAGE_CREATE' && payload.channelId !== SelectedChannelStore.getChannelId())
    return

  const unObserve = observeDom('li[id^=chat-messages-]', (elem) => {
    handleElm(elem)
    unObserve()
  })

  setTimeout(unObserve, 500)
}

const triggers = ['MESSAGE_CREATE', 'CHANNEL_SELECT', 'LOAD_MESSAGES_SUCCESS', 'UPDATE_CHANNEL_DIMENSIONS']
for (const t of triggers)
  subscribe(t, handleDispatch)

export const onUnload = () => {
  style.remove()
  for (const t of triggers)
    subscribe(t, handleDispatch)
}

