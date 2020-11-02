import React from 'react'
import { useTranslation } from 'react-i18next'

import { PromoHero } from 'blocks/Heros/PromoHero'
import { RunningLine } from 'components/RunningLine'
import { Advantages3D } from 'blocks/Advantages3D'
import { Visualization3d } from 'blocks/Visualization3d'
import { ProjectStructure } from 'blocks/ProjectStructure'
import { VisualizationAdvantages } from 'blocks/VisualizationAdvantages'
import { AdvantagesServices } from 'blocks/AdvantagesService'
import { Faq } from 'blocks/FAQ/FAQ'
import { Reviews } from 'blocks/Reviews'
import { Project3D } from 'blocks/Project3D'
import { DefaultFormBlock } from 'blocks/DefaultFormBlock'
import { SelectionOfPaints } from 'blocks/SelectionOfPaints'
import { Connection } from 'blocks/Connection'
import { CommercialProposalFormBlock } from 'blocks/CommercialProposalFormBlock'
import { ButtonWithModal } from 'components/ButtonWithModal'
import { HelmetFunc } from 'components/PageMetaData'
import { Layout } from 'layout/Layout'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
const pageMetadata = {
    uk: {
        title: 'Дизайн проект інтер`єру квартири за $99',
        description:
            'Індивідуальний дизайн проект квартири за $99 включає перепланування, розміщення меблів, електрику, сантехніку, освітлення, підлоги, стелі і інше',
    },
    ru: {
        title: 'Дизайн проект интерьера квартиры за $99',
        description:
            'Индивидуальный дизайн проект квартиры за $99 включает перепланировку, расстановку мебели, электрику, сантехнику, освещение, полы, потолки и другое',
    },
    en: {
        title: 'Apartment interior design project for $99',
        description:
            'Individual design project of an apartment for $99 includes redevelopment, furniture placement, electrics, plumbing, lighting, floors, ceilings and more.',
    },
}
export interface imagesDataProp {
    allImageSharp: {
        edges: {
            node: { childImageSharp: { fluid: FluidObject } }
        }[]
    }
}
const Promo = ({ data }: { data: imagesDataProp }) => {
    const { t } = useTranslation()
    return (
        <Layout>
            <HelmetFunc data={pageMetadata} />
            <PromoHero imagesData={data} />
            <RunningLine>{t('designProject99')}</RunningLine>
            <div id="projectStructure" />
            <ProjectStructure imagesData={data} />
            <Reviews />
            <CommercialProposalFormBlock text />
            <RunningLine>{t('designProject99')}</RunningLine>
            <Project3D imagesData={data} />
            <div id="project3dAdvantages" />
            <Advantages3D imagesData={data} />
            <Connection text={t('connection.text3d')}>
                <ButtonWithModal
                    modalTitle={t('connection.modalTitle')}
                    modalDescription={t('connection.modalDescription')}
                    buttonLabel={t('connection.buttonLabel')}
                    placeholder={t('connection.placeholder')}
                    submitLabel={t('connection.submitLabel')}
                    tracking={{
                        conversionType: 'CallbackFromPromo',
                        eventCategory: 'CallbackFromPromo',
                    }}
                />
            </Connection>
            <SelectionOfPaints imagesData={data} />
            <div id="selectionOfPaintsAdvantages" />
            <AdvantagesServices imagesData={data} />
            <RunningLine>{t('designProject99')}</RunningLine>
            <div id="visualization3d" />
            <Visualization3d imagesData={data} />
            <div id="visualization3dAdvantages" />
            <VisualizationAdvantages imagesData={data} />
            <div id="faq" />
            <Faq imagesData={data} />
            <DefaultFormBlock
                withPhoneMobile
                tracking={{
                    conversionType: 'FormPromoPageBottom',
                    eventCategory: 'FormPromoPageBottom',
                }}
            />
        </Layout>
    )
}

export default Promo

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
