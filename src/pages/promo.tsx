import React from 'react'
import { useTranslation } from 'react-i18next'

import { PromoHero } from 'blocks/Heros/PromoHero'
import { ProjectStructure } from 'blocks/ProjectStructure'
import { RunningLine } from 'components/RunningLine'
import { VisualizationAdvantages } from 'blocks/VisualizationAdvantages'

const Promo = () => {
    const { t } = useTranslation()
    return (
        <>
            <PromoHero />
            <RunningLine>{t('designProject99')}</RunningLine>
            <ProjectStructure />
            <RunningLine>{t('designProject99')}</RunningLine>
            <VisualizationAdvantages />
        </>
    )
}

export default Promo
