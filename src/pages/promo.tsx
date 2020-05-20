import React from 'react'
import { useTranslation } from 'react-i18next'

import { PromoHero } from 'blocks/Heros/PromoHero'
import { ProjectStructure } from 'blocks/ProjectStructure'
import { RunningLine } from 'components/RunningLine'
import { DefaultFormBlock } from 'blocks/DefaultFormBlock'



const Promo = () => {
    const { t } = useTranslation()
    return (
        <>
            <PromoHero />
            <RunningLine>{t('designProject99')}</RunningLine>
            <ProjectStructure />
            <DefaultFormBlock />
        </>
    )
}

export default Promo
