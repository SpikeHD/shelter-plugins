const {
  flux: {
    stores: {
      MediaEngineStore
    }
  },
  patcher
} = shelter

const unpatch = patcher.instead('isSupported', MediaEngineStore, () => true)

export const onUnload = () => unpatch()