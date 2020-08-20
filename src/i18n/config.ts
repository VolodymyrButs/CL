import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
    fallbackLng: 'uk',
    ns: ['translations'],
    defaultNS: 'translations',

    // To investigate react-i18next translation issues enable this
    debug: false,

    interpolation: {
        escapeValue: false,
    },

    react: {
        wait: true,
        useSuspense: false,
    },
})
export default i18n
