import React from 'react'
import { useTranslation } from 'react-i18next'

import { Services } from 'blocks/Services/Services'
import { RunningLine } from 'components/RunningLine'
import { Reviews } from 'blocks/Reviews'
import { DefaultFormBlock } from 'blocks/DefaultFormBlock'
import { HelmetFunc } from 'components/PageMetaData'

const pageMetadata = {
    uk: { title: 'lalaU', description: 'desc' },
    ru: { title: 'lalaR', description: 'desc' },
    en: { title: 'lalaE', description: 'desc' },
}

const ServicesPage = () => {
    const { t } = useTranslation()

    return (
        <div>
            <HelmetFunc data={pageMetadata} />
            <Services />
            <RunningLine>{t('designProject99')}</RunningLine>
            <Reviews />
            <DefaultFormBlock
                withPhoneMobile
                tracking={{
                    conversionType: 'FormServicesPageBottom',
                    eventCategory: 'FormServicesPageBottom',
                }}
            />
        </div>
    )
}

export default ServicesPage
