import React from 'react'
import { useTranslation } from 'react-i18next'

import { RunningLine } from 'components/RunningLine'
import { Advantages3D } from 'blocks/Advantages3D'
import { Visualization3d } from 'blocks/Visualization3d'
import { ProjectStructureNew } from 'blocks/ProjectStructureNew'
import { VisualizationAdvantages } from 'blocks/VisualizationAdvantages'
import { AdvantagesServices } from 'blocks/AdvantagesService'
import { Faq } from 'blocks/FAQ/FAQ'
import { ExamplesOfProjects } from 'blocks/ExamplesOfProjects'
import { Reviews } from 'blocks/Reviews'
import { Project3D } from 'blocks/Project3D'
import { SelectionOfPaints } from 'blocks/SelectionOfPaints'
import { CommercialProposalFormBlock } from 'blocks/CommercialProposalFormBlock'
import { HelmetFunc } from 'components/PageMetaData'
import { PromoHeroMobile } from 'blocks/Heros/MobilePromoHeroNew'
import { PromoHeroNew } from 'blocks/Heros/PromoHeroNew'
import styled from 'styled-components'
import { displayWidth } from 'styles/width'

const pageMetadata = {
    uk: {
        title: 'Дизайн проект квартири за $99',
        description:
            "Виконаємо дизайн проект інтер'єру усієї квартири за 99 доларів США",
    },
    ru: {
        title: 'Дизайн проект квартиры за $99',
        description:
            'Выполним дизайн проект интерьера всей квартиры за 99 долларов США',
    },
    en: {
        title: 'Apartment design for $99',
        description:
            'We will design the interior project of the entire apartment for 99 US dollars',
    },
}

const Block = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
    }
`

const Promo = () => {
    const { t } = useTranslation()
    return (
        <>
            <HelmetFunc data={pageMetadata} />
            <PromoHeroMobile />
            <Block>
                <PromoHeroNew />
            </Block>

            <div id="projectStructure" />
            <ProjectStructureNew />
            <ExamplesOfProjects />
            <Reviews />
            <RunningLine>{t('designProject99')}</RunningLine>
            <Project3D />
            <div id="project3dAdvantages" />
            <Advantages3D />
            <SelectionOfPaints />
            <div id="selectionOfPaintsAdvantages" />
            <AdvantagesServices />
            <RunningLine>{t('designProject99')}</RunningLine>
            <div id="visualization3d" />
            <Visualization3d />
            <div id="visualization3dAdvantages" />
            <VisualizationAdvantages />
            <div id="faq" />
            <Faq />
            <CommercialProposalFormBlock />
        </>
    )
}

export default Promo
