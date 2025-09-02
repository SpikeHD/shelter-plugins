const {
  flux: {
    intercept
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

  dispatch.shouldMention = store.shiftToInvert ? !dispatch.shouldMention : false
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