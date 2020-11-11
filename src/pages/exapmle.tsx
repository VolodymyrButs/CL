import React from 'react'
import { HelmetFunc } from 'components/PageMetaData'
import { ExamplesOfProjects } from 'blocks/ExamplesOfProjects'
import { CommercialProposalFormBlock } from 'blocks/CommercialProposalFormBlock'
import { RunningLine } from 'components/RunningLine'
import { useTranslation } from 'react-i18next'
import { Layout } from 'layout/Layout'

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

const ExamplePage = () => {
    const { t } = useTranslation()
    return (
        <Layout>
            <HelmetFunc data={pageMetadata} />
            <ExamplesOfProjects />
            <RunningLine>{t('designProject99')}</RunningLine>
            <CommercialProposalFormBlock text />
        </Layout>
    )
}

export default ExamplePage