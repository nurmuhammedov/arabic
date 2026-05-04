import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'uz',
    supportedLngs: ['uz', 'uzb'],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    ns: [
      'common',
      'sidebar',
      'table',
      'labels',
      'errors',
      'form',
      'options',
      'users',
      'auth',
      'applications',
      'dictionaries',
      'branches',
      'permits',
      'registers',
    ],
    defaultNS: 'common',
    fallbackNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    react: {
      useSuspense: true,
    },
  })
  .catch((error) => {
    console.error('Error initializing i18n:', error)
  })
