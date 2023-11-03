const {
  flux: {
    intercept
  },
} = shelter

const unintercept = intercept(dispatch => {
  if (dispatch.type === 'TYPING_START_LOCAL') return false
})

export const onUnload = () => {
  unintercept()
}
