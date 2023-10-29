const {
  flux: {
    stores: {
      MaskedLinkStore
    }
  },
  patcher
} = shelter

const unpatch = patcher.instead('isTrustedDomain', MaskedLinkStore, () => true, false)

export const onUnload = () => {
  unpatch()
}
