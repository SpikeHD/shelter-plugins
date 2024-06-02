import { createApi, webpackChunk } from '@cumjar/websmack'
import { after } from 'spitroast'

const {
  plugin: {
    store
  }
} = shelter

const chunk = webpackChunk()
const wp = chunk && createApi([undefined, ...chunk])
const s = wp.findByProps('getSuperProperties')

if (!s) {
  throw new Error('Failed to find idenficiation function')
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

// Apparently this breaks all Shelter dialogs for some reason right now lolol
// export const settings = () => (
//   <>
//     <Header tag={HeaderTags.H1}>Client Type</Header>
//     <RadioGroup
//       options={[
//         {
//           label: 'Desktop Client',
//           value: 'desktop',
//         },
//         {
//           label: 'Web',
//           value: 'web',
//         },
//         {
//           label: 'Mobile',
//           value: 'mobile',
//         },
//       ]}
//       value={store.clientType}
//       onChange={(v) => (store.clientType = v)}
//     />
//   </>
// )