export function setLanguage(lang: string) {
  const translations = window.__DORION_TRANSLATIONS
  if (translations && translations[lang]) {
    window.__DORION_LANG = lang
  } else {
    window.__DORION_LANG = 'en'
  }
}

// Also handles nested
export function t(key: string): string {
  const lang = window.__DORION_LANG || 'en'
  const translations = window.__DORION_TRANSLATIONS

  if (!translations || !translations[lang]) {
    return key // Fallback to key if translations not available
  }

  const keys = key.split('.')
  let result: any = translations[lang]

  for (const k of keys) {
    if (result && k in result) {
      result = result[k]
    } else {
      return key // Fallback to key if translation not found
    }
  }

  return typeof result === 'string' ? result : key
}
