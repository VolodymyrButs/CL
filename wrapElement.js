import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from './src/i18n/config'

import { Layout } from 'layout/Layout'

const wrapPageElement = ({ element, props }) => {
    const addResources = (pc, language) => {
        if (pc && pc.localeResources) {
            if (!i18n.hasResourceBundle(language, 'translations')) {
                i18n.addResourceBundle(language, 'translations', {
                    ...pc.localeResources,
                })
            }
        }
    }
    const pageContext = props.pageContext
    if (pageContext) {
        const currentLanguage = pageContext.locale
        if (currentLanguage && currentLanguage !== i18n.language) {
            addResources(pageContext, currentLanguage)
            i18n.changeLanguage(currentLanguage)
        }
    }

    return (
        <I18nextProvider i18n={i18n} {...props}>
            <Layout>{element}</Layout>
        </I18nextProvider>
    )
}

export default wrapPageElement
