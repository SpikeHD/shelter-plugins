const {
  util: { log }
} = shelter

let observer: MutationObserver | null = null // keep only one observer working

export function disobserve() {
  observer.disconnect()
  observer = null
}

// Observes the DOM for newly added nodes and executes a callback for each.
function observeDom<T>(rootElm: Node, callbackFn: (node: Node, resolve: (value: T) => void) => boolean, subtree: boolean): Promise<T> {
  return new Promise(resolve => {
    if (observer) disobserve() // disconnnect old one

    observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes)
          for (const node of addedNodes) {
            if (!callbackFn(node, resolve)) {
              return disobserve()
            }
          }
        }
      }
    })

    observer.observe(rootElm, {
      childList: true,
      subtree // reduce callback count for perf
    })
  })
}

type Query = Array<string> | string
type WaitCfg = { callbackFn: null | ((elm: Element) => void), root: Element }
const subtreeFind = (p: Element, q: Array<string>) => Array.from(p.children).find(c => q.some(q => c.matches(q)))
const queryFind = (p: Element, query: Array<string>) => {
  for (let q of query) {
    const subtree = q[0] === '>'
    if (subtree) q = q.slice(1)
    const elm = subtree ? subtreeFind(p, [q]) : p.querySelector(q)
    if (elm) return elm
  }
}

export const waitForElm = async (queries: Array<Query> | Query, cfg: Partial<WaitCfg>): Promise<Element> => {
  let root = cfg.root || document.body
  const callbackFn = cfg.callbackFn

  let query: string[]
  let timeout = true
  const startTimeout = () => setTimeout(() => {
    if (timeout) {
      log(['The observer seems stuck at', root, 'looking for', query, 'with remaining queries:', queries], 'warn')
      startTimeout()
    }
  }, 10000)

  startTimeout()

  if (!Array.isArray(queries)) queries = [queries]

  while (queries.length) {
    // prepare query
    const q: Query = queries.shift()
    query = typeof q === 'string' ? [q] : q
    const directChild = query.every(q => q[0] === '>')

    if (directChild) query = query.map(q => q.slice(1))

    // no observe if this elm already exist
    const elm = directChild ? subtreeFind(root, query) : queryFind(root, query)

    if (elm) {
      root = elm
      if (callbackFn) callbackFn(root)
      continue
    }

    // start observer
    root = await observeDom(root, (node, res) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return true

      const e = node as Element

      for (let q of query) {
        if (!directChild) {
          const s = q[0] === '>'
          if (s) q = q.slice(1)
        }

        let ret = e.matches(q) ? e : null

        if (!ret) {
          ret = e.querySelector(q)
        }

        if (ret) {
          res(e)
          return false
        }
      }

      return true
    }, !directChild) as Element

    // callback after found
    if (callbackFn) callbackFn(root)
  }

  timeout = false

  return root
}