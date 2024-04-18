import { createApi, webpackChunk } from '@cumjar/websmack'
import { after } from 'spitroast'
import { css, classes } from './index.scss'

const {
  ui: {
    SwitchItem,
    LinkButton,
    injectCss,
  },
  plugin: {
    store
  }
} = shelter

const DATA_URL = 'https://userpfp.github.io/UserPFP/source/data.json'

const chunk = webpackChunk()
const wp = chunk && createApi([undefined, ...chunk])
const c = wp.findByPropsAll('getUserAvatarURL')

for (const m of c) {
  after('getUserAvatarURL', m, (args, response) => {
    return store.preferNitro && response.includes('a_') ? response : window.userpfp.getUrl(args[0]) ?? response
  })
}

declare global {
  interface Window {
    userpfp: {
      avatars: Record<string, string>
      getUrl: (id: string) => string
    }
  }
}

let injectedCss = false

if (!injectedCss) {
  injectedCss = true
  injectCss(css)
}

export const settings = () => (
  <>
    <LinkButton
      href='https://userpfp.github.io/UserPFP/#how-to-request-a-profile-picture-pfp'
      class={classes.submit}
    >
      Submit your PFP here!
    </LinkButton>

    <SwitchItem
      value={store.preferNitro}
      onChange={(v) => (store.preferNitro = v)}
      tooltip="If the user has Nitro but also has a custom UserPFP, prefer the Nitro one."
    >
      Prefer Nitro
    </SwitchItem>
  </>
)

export const onLoad = async () => {
  const resp = await fetch(DATA_URL)
  window.userpfp = await resp.json()
  window.userpfp.getUrl = (id: string) => window.userpfp.avatars[id] ?? null
}