import React from 'react'

import { Input } from 'components/form/Input'
import { useTranslation } from 'react-i18next'

interface NameInputProps {
    err: string
}

export const NameInput = React.forwardRef<HTMLInputElement, NameInputProps>(
    ({ err }, ref) => {
        const { t } = useTranslation()

        return (
            <Input
                type="text"
                name="name"
                placeholder={t('name')}
                ref={ref}
                isValid={err}
            />
        )
    }
)

NameInput.displayName = 'NameInput'
