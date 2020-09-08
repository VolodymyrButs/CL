import React from 'react'
import { useTranslation } from 'react-i18next'

import { WorksHero } from 'blocks/Works/WorksHero'
import { Reviews } from 'blocks/Reviews'
import { Connection } from 'blocks/Connection'
import { ButtonWithModal } from 'components/ButtonWithModal'
import { WorksProjectGrid } from 'blocks/Works/WorksProjectGrid'

const WorksPage = () => {
    const { t } = useTranslation()
    return (
        <>
            <WorksHero />
            <WorksProjectGrid />
            <Reviews />
            <Connection text={t('connection.needDesignProject')}>
                <ButtonWithModal
                    modalTitle={t('connection.modalTitle')}
                    secondModalTitle={t('connection.secondModalTitle')}
                    modalDescription={t('connection.modalDescription')}
                    secondModalDescription={t(
                        'connection.secondModalDescription'
                    )}
                    buttonLabel={t('connection.buttonLabel')}
                    placeholder={t('connection.placeholder')}
                    submitLabel={t('connection.submitLabel')}
                />
            </Connection>
        </>
    )
}

export default WorksPage
