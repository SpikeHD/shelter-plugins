export const debounce = (fn: (...args: unknown[]) => unknown, delay: number) => {
  let timer: number | null = null
  return (...args: unknown[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}