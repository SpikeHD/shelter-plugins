import en from '../../i18n/en.json' with { type: 'json' }
import ru from '../../i18n/ru.json' with { type: 'json' }

// Global window types for translations
declare global {
  interface Window {
    __DORION_LANG?: string
    __DORION_TRANSLATIONS?: {
      [key: string]: Record<string, unknown>
    }
  }
}

const languages: {
  [key: string]: Record<string, unknown>
} = {
  en,
  ru,
}

export const initializeTranslations = () => {
  try {
    const browserLang = navigator.language?.split('-')[0] || 'en'
    window.__DORION_LANG = languages[browserLang] ? browserLang : 'en'
    window.__DORION_TRANSLATIONS = languages
    console.log(`[Dorion Helpers] Initialized translations for language: ${window.__DORION_LANG}`)
  } catch (error) {
    console.warn('[Dorion Helpers] Failed to initialize translations, falling back to English:', error)
    window.__DORION_LANG = 'en'
    window.__DORION_TRANSLATIONS = languages
  }
}
