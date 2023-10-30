const {
  flux: {
    stores: {
      MediaEngineStore
    }
  },
  patcher
} = shelter

const unpatches = [
  patcher.instead('isSupported', MediaEngineStore, () => true),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  patcher.instead('supports', MediaEngineStore, (_e: string) => true),
]

export const onUnload = () => {
  unpatches.forEach(unpatch => unpatch())
}