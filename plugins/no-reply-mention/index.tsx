const {
  flux: {
    intercept,
    stores: {
      UserStore
    }
  },
  ui: {
    SwitchItem
  },
  plugin: {
    store
  }
} = shelter

const unintercept = intercept(dispatch => {
  if (dispatch.type !== 'CREATE_PENDING_REPLY') return

  // @ts-expect-error cry about it
  const userIsAuthor = dispatch?.message?.author?.id === UserStore.getCurrentUser()?.id

  dispatch.shouldMention = (store.shiftToInvert && !userIsAuthor) ? !dispatch.shouldMention : false
})

export const onUnload = () => {
  unintercept()
}

export const settings = () => (
  <>
    <SwitchItem
      value={store.shiftToInvert}
      onChange={(v) => {
        store.shiftToInvert = v
      }}
      note="Enable to make holding shift enable mentions."
    >
      Inverse Shift Reply
    </SwitchItem>
  </>
)
