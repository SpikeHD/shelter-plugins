export function setLanguage(lang: string) {
  const translations = window.__DORION_TRANSLATIONS
  if (translations && translations[lang]) {
    window.__DORION_LANG = lang
  } else {
    window.__DORION_LANG = 'en'
  }
}

export function t(
  key: string,
  replace?: Record<string, Node | string | string>
): string | Node | (string | Node)[] {
  const lang = window.__DORION_LANG ?? 'en'
  const translations = window.__DORION_TRANSLATIONS

  let value: any = translations?.[lang]
  for (const k of key.split('.')) {
    value = value?.[k]
    if (value == null) return key
  }

  if (!replace) return value

  const parts: (string | Node)[] = []
  const regex = /\{\{\s*(\w+)\s*\}\}/g
  let lastIndex = 0
  let hasNode = false

  for (const match of value.matchAll(regex)) {
    const [raw, name] = match
    const index = match.index

    if (index > lastIndex) {
      parts.push(value.slice(lastIndex, index))
    }

    const replacement = replace[name]
    if (replacement !== undefined) {
      parts.push(replacement)
      if (typeof replacement !== 'string') {
        hasNode = true
      }
    } else {
      parts.push(raw)
    }

    lastIndex = index + raw.length
  }

  if (lastIndex < value.length) {
    parts.push(value.slice(lastIndex))
  }

  return hasNode ? parts : parts.join('')
}
