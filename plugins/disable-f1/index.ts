const disableF1 = (e: KeyboardEvent) => {
  if (e.key === 'F1') {
    e.preventDefault()
    e.stopImmediatePropagation()
  }
}

export const onLoad = () => {
  document.addEventListener('keydown', disableF1)
}

export const onUnload = () => {
  document.removeEventListener('keydown', disableF1)
}
