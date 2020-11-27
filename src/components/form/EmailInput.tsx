import React from 'react'

import { Input } from 'components/form/Input'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'

interface EmailInputProps {
    err: string
    placeholder: TFunction | string
    labelBottom?: number
}

export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
    ({ err, placeholder, labelBottom }, ref) => {
        const { t } = useTranslation()

        return (
            <Input
                type="email"
                name="email"
                labelBottom={labelBottom}
                placeholder={placeholder || t('email')}
                ref={ref}
                isValid={err}
            />
        )
    }
)

EmailInput.displayName = 'EmailInput'
