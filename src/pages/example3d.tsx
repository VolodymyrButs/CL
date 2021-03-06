import React from 'react'
import { HelmetFunc } from 'components/PageMetaData'
import { RunningLine } from 'components/RunningLine'
import { useTranslation } from 'react-i18next'
import { Layout } from 'layout/Layout'
import { DefaultFormBlock } from 'blocks/DefaultFormBlock'
import { ExamplesOfProjects3d } from 'blocks/exampleOfProjects3d'

const pageMetadata = {
    uk: {
        title: 'Зразок дизайн проекту',
        description:
            'Перегляд зразку проекту який ви отримаєте по закінченню роботи',
    },
    ru: {
        title: 'Образец дизайн проекта ',
        description:
            'Просмотр образца проекта который вы получите по окончании работы',
    },
    en: {
        title: 'Sample project design',
        description:
            'View a sample project that you will receive at the end of the work',
    },
}

const Example3dPage = () => {
    const { t } = useTranslation()
    return (
        <Layout>
            <HelmetFunc data={pageMetadata} />
            <ExamplesOfProjects3d />
            <RunningLine>{t('designProject99')}</RunningLine>
            <DefaultFormBlock
                withPhoneMobile
                tracking={{
                    conversionType: 'FormExample',
                    eventCategory: 'FormExample',
                }}
            />
        </Layout>
    )
}

export default Example3dPage
