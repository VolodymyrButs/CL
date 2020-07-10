import React from 'react'

import { Input } from 'components/form/Input'
import { IInputProps } from 'components/form/Types'
import { useTranslation } from 'react-i18next'

export const NameInput = ({ inputRef, err }: IInputProps) => {
    const { t } = useTranslation()
    return (
        <Input
            type="text"
            name="name"
            placeholder={t('name')}
            ref={inputRef}
            isValid={err}
        />
    )
}
