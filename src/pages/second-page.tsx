import React from 'react'
import { useTranslation } from 'react-i18next'

import { LocalizedLink } from 'i18n/LocalizedLink'
import { About } from 'blocks/About'

const SecondPage = () => {
    const { t } = useTranslation()

    return (
        <div>
            <About />
            <LocalizedLink to="/">{t('hi')}</LocalizedLink>
        </div>
    )
}

export default SecondPage
