import React from 'react'
import { useTranslation } from 'react-i18next'
import { Cad } from 'blocks/CadBlock'
import { Connection } from 'blocks/Connection'
import { ButtonWithModal } from 'components/ButtonWithModal'
import { backgroundColors } from 'styles/colors'

const EditorPage = () => {
    const { t } = useTranslation()

    return (
        <div>
            <Cad />
            <Connection
                text={t('connection.text')}
                backgroundColor={backgroundColors.promotion}
            >
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
        </div>
    )
}

export default EditorPage
