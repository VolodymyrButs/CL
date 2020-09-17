import React from 'react'
import { useTranslation } from 'react-i18next'

import { Services } from 'blocks/Services/Services'
import { RunningLine } from 'components/RunningLine'
import { Reviews } from 'blocks/Reviews'
import { DefaultFormBlock } from 'blocks/DefaultFormBlock'

const ServicesPage = () => {
    const { t } = useTranslation()

    return (
        <div>
            <Services />
            <RunningLine>{t('designProject99')}</RunningLine>
            <Reviews />
            <DefaultFormBlock withPhoneMobile />
        </div>
    )
}

export default ServicesPage
