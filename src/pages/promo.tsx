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

const Promo = () => {
    const { t } = useTranslation()
    return (
        <>
            <PromoHero />
            <RunningLine>{t('designProject99')}</RunningLine>
            <ProjectStructure />
            <ExamplesOfProjects />
            <Reviews />
            <CommercialProposalFormBlock />
            <Project3D />
            <Advantages3D />
            <Connection text={'Узнай больше о 3D дизайн-проекте'}>
                <ButtonWithModal
                    modalTitle={'Оставьте заявку'}
                    secondModalTitle={'Спасибо!'}
                    modalDescription={'Напишите нам и мы Вам перезвоним!'}
                    secondModalDescription={
                        'Мы с Вами свяжемся в ближайшее время!'
                    }
                    buttonLabel={'Связаться с нами'}
                    questionPlaceholder={'Спитай шось)))'}
                    submitLabel={'Послати пісьмо'}
                />
            </Connection>
            <SelectionOfPaints />
            <AdvantagesServices />
            <DefaultFormBlock />
            <RunningLine>{t('designProject99')}</RunningLine>
            <Visualization3d />
            <VisualizationAdvantages />
            <Faq />
            <p id="design" />
        </>
    )
}

export default Promo
