import React from 'react'
import { useTranslation } from 'react-i18next'

import { WorksHero } from 'blocks/Works/WorksHero'
import { Reviews } from 'blocks/Reviews'
import { Connection } from 'blocks/Connection'
import { ButtonWithModal } from 'components/ButtonWithModal'
import { WorksProjectGrid } from 'blocks/Works/WorksProjectGrid'
import { HelmetFunc } from 'components/PageMetaData'

const pageMetadata = {
    uk: {
        title: 'Роботи студії дизайну інтер`єру ClearLine',
        description: 'Роботи за дизайном інтер`єрів студій ClearLine',
    },
    ru: {
        title: 'Работы студии дизайна интерьера ClearLine',
        description: 'Работы по дизайну интерьеров студии  ClearLine',
    },
    en: {
        title: 'ClearLine interior design studio works',
        description: 'Works on interior design of the ClearLine studio',
    },
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
