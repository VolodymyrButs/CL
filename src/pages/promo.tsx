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
import { ExamplesOfProjects } from 'blocks/ExamplesOfProjects'
import { Reviews } from 'blocks/Reviews'
import { Project3D } from 'blocks/Project3D'
import { DefaultFormBlock } from 'blocks/DefaultFormBlock'
import { SelectionOfPaints } from 'blocks/SelectionOfPaints'
import { Connection } from 'blocks/Connection'
import { CommercialProposalFormBlock } from 'blocks/CommercialProposalFormBlock'
import { ButtonWithModal } from 'components/ButtonWithModal'
import { HelmetFunc } from 'components/PageMetaData'

const pageMetadata = {
    uk: {
        title: 'Дизайн проект квартири за $99 - clearline.com.ua',
        description:
            "Виконаємо дизайн проект інтер'єру усієї квартири за 99 доларів США",
    },
    ru: {
        title: 'Дизайн проект квартиры за $99 - clearline.com.ua',
        description:
            'Выполним дизайн проект интерьера всей квартиры за 99 долларов США',
    },
    en: {
        title: 'Apartment design for $99 - clearline.com.ua',
        description:
            'We will design the interior project of the entire apartment for 99 US dollars',
    },
}

const Promo = () => {
    const { t } = useTranslation()
    return (
        <>
            <HelmetFunc data={pageMetadata} />
            <PromoHero />
            <RunningLine>{t('designProject99')}</RunningLine>
            <div id="projectStructure" />
            <ProjectStructure />
            <ExamplesOfProjects />
            <Reviews />
            <CommercialProposalFormBlock text />
            <RunningLine>{t('designProject99')}</RunningLine>
            <Project3D />
            <div id="project3dAdvantages" />
            <Advantages3D />
            <Connection text={t('connection.text')}>
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
            <DefaultFormBlock
                withPhoneMobile
                tracking={{
                    conversionType: 'FormPromoPageBottom',
                    eventCategory: 'FormPromoPageBottom',
                }}
            />
        </>
    )
}

export default Promo
