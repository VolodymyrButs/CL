import React from 'react'
import { useTranslation } from 'react-i18next'

import { PromoHero } from 'blocks/Heros/PromoHero'
import { RunningLine } from 'components/RunningLine'

const Promo = () => {
    const { t } = useTranslation()
    return (
        <>
            <PromoHero />
            <RunningLine>{t('designProject99')}</RunningLine>
            <p id="design" />
        </>
    )
}

export default Promo
