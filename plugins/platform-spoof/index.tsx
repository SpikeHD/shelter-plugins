import { createApi, webpackChunk } from '@cumjar/websmack'
import { after } from 'spitroast'
import { RadioGroup } from '../../components/RadioGroup'

const {
  plugin: {
    store
  },
  ui: {
    Header,
    HeaderTags
  }
} = shelter

const chunk = webpackChunk()
const wp = chunk && createApi([undefined, ...chunk])
const s = wp.findByProps('getSuperProperties')

if (!s) {
  throw new Error('Failed to find identification function')
}

// @ts-expect-error defining to global window
window.PlatformSpoof = {
  desktop: 'Discord Client',
  web: 'Chrome',
  mobile: 'Android',

  setSpoof: (type: 'desktop' | 'web' | 'mobile') => {
    store.clientType = type
  },
}

after('getSuperProperties', s, (args, response) => {
  return {
    ...response,
    // @ts-expect-error spoofing the client type
    ...{browser: window.PlatformSpoof?.[store.clientType] ?? window.PlatformSpoof.desktop},
  }
})

export const settings = () => (
  <>
    <Header tag={HeaderTags.H1}>Client Type</Header>
    <br />
    <RadioGroup
      options={[
        {
          label: 'Desktop Client',
          value: 'desktop',
        },
        {
          label: 'Web',
          value: 'web',
        },
        {
          label: 'Mobile',
          value: 'mobile',
        },
      ]}
      selected={store.clientType ?? 'desktop'}
      onChange={(v) => (store.clientType = v)}
    />
  </>
)
