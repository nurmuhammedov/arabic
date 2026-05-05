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
    supportedLngs: ['ar', 'uz', 'uzb'],
    lng: 'uz',
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
      'users',
      'auth',
      'applications',
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

export default i18n
