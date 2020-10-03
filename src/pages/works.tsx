import React from 'react'
import { useTranslation } from 'react-i18next'

import { WorksHero } from 'blocks/Works/WorksHero'
import { Reviews } from 'blocks/Reviews'
import { Connection } from 'blocks/Connection'
import { ButtonWithModal } from 'components/ButtonWithModal'
import { WorksProjectGrid } from 'blocks/Works/WorksProjectGrid'
import { HelmetFunc } from 'components/PageMetaData'

const pageMetadata = {
    uk: { title: 'lalaU', description: 'desc' },
    ru: { title: 'lalaR', description: 'desc' },
    en: { title: 'lalaE', description: 'desc' },
}

const WorksPage = () => {
    const { t } = useTranslation()
    return (
        <>
            <HelmetFunc data={pageMetadata} />
            <WorksHero />
            <WorksProjectGrid />
            <Reviews />
            <Connection text={t('connection.needDesignProject')}>
                <ButtonWithModal
                    modalTitle={t('connection.modalTitle')}
                    modalDescription={t('connection.modalDescription')}
                    buttonLabel={t('connection.buttonLabel')}
                    placeholder={t('connection.placeholder')}
                    submitLabel={t('connection.submitLabel')}
                    tracking={{
                        conversionType: 'CallbackFromWorks',
                        eventCategory: 'CallbackFromWorks',
                    }}
                />
            </Connection>
        </>
    )
}

export default WorksPage
