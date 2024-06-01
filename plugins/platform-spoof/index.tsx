import { createApi, webpackChunk } from '@cumjar/websmack'
import { after } from 'spitroast'

const {
  ui: {
    Header,
    HeaderTags,
    RadioGroup,
  },
  plugin: {
    store
  }
} = shelter

const chunk = webpackChunk()
const wp = chunk && createApi([undefined, ...chunk])
const c = wp.findByProps('getSuperProperties')

if (!c) {
  throw new Error('Failed to find getSuperProperties')
}

// @ts-expect-error defining to global window
window.PlatformSpoof = {
  desktop: 'Discord Client',
  web: 'Chrome',
  mobile: 'Android',

  setSpoof: (type: 'desktop' | 'web' | 'mobile') => {
    store.clientType = type
  }
}

after('getSuperProperties', c, (args, response) => {
  return {
    ...response,
    // @ts-expect-error spoofing the client type
    ...{browser: window.PlatformSpoof[store.clientType]},
  }
})

export const settings = () => (
  <>
    <Header tag={HeaderTags.H1}>Client Type</Header>
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
      value={store.clientType}
      onChange={(v) => (store.clientType = v)}
    />
  </>
)