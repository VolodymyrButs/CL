import React from 'react'

import { Input } from 'components/form/Input'
import { IInputProps } from 'components/form/Types'
import { useTranslation } from 'react-i18next'

export const EmailInput = ({ inputRef, err }: IInputProps) => {
    const { t } = useTranslation()
    return (
        <>
            <Input
                type="email"
                name="email"
                placeholder={t('email')}
                ref={inputRef}
                isValid={err}
            />
        </>
    )
}
