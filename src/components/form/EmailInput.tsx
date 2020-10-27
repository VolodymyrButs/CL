import React from 'react'

import { Input } from 'components/form/Input'
import { useTranslation } from 'react-i18next'

interface EmailInputProps {
    err: string
}

export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
    ({ err }, ref) => {
        const { t } = useTranslation()

        return (
            <Input
                type="email"
                name="email"
                placeholder={t('email')}
                ref={ref}
                isValid={err}
            />
        )
    }
)

EmailInput.displayName = 'EmailInput'
