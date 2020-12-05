import React from 'react'
import { HelmetFunc } from 'components/PageMetaData'
import { CommercialProposalFormBlock } from 'blocks/CommercialProposalFormBlock'
import { RunningLine } from 'components/RunningLine'
import { useTranslation } from 'react-i18next'
import { Layout } from 'layout/Layout'
import { Faq } from 'blocks/FAQ/FAQ'
import { imagesDataProp } from './promo'
import { graphql } from 'gatsby'

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

const ExamplePage = ({ data }: { data: imagesDataProp }) => {
    const { t } = useTranslation()
    return (
        <Layout>
            <HelmetFunc data={pageMetadata} />
            <Faq imagesData={data} />
            <RunningLine>{t('designProject99')}</RunningLine>
            <CommercialProposalFormBlock text />
        </Layout>
    )
}

export default ExamplePage

export const query = graphql`
    query {
        allImageSharp {
            edges {
                node {
                    fluid(srcSetBreakpoints: [400]) {
                        originalName
                        ...GatsbyImageSharpFluid
                    }
                    parent {
                        ... on File {
                            name
                        }
                    }
                }
            }
        }
    }
`
