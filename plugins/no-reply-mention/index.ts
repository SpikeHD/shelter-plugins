const {
  flux: {
    intercept
  }
} = shelter

const unintercept = intercept(dispatch => {
  if (dispatch.type !== 'CREATE_PENDING_REPLY') return

  dispatch.shouldMention = false
})

export const onUnload = () => {
  unintercept()
}