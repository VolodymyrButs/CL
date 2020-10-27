import React from 'react'
import { useTranslation } from 'react-i18next'

import { Services } from 'blocks/Services/Services'
import { RunningLine } from 'components/RunningLine'
import { Reviews } from 'blocks/Reviews'
import { DefaultFormBlock } from 'blocks/DefaultFormBlock'
import { HelmetFunc } from 'components/PageMetaData'
import { Layout } from 'layout/Layout'

const pageMetadata = {
    uk: {
        title: 'Послуги та ціни на дизайн інтер`єру',
        description:
            'Дизайн проект інтер`єру, 3д візуалізація, обмiр приміщень',
    },
    ru: {
        title: 'Услуги и цены на дизайн интерьера',
        description:
            'Дизайн проект интерьера, 3д визуализация, обмер помещений',
    },
    en: {
        title: 'Services and prices for interior design',
        description:
            'Interior design project, 3d visualization, measurement of premises',
    },
}

const ServicesPage = () => {
    const { t } = useTranslation()

    return (
        <Layout>
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
        </Layout>
    )
}

export default ServicesPage
