import React from 'react'
import InputMask from 'react-input-mask'

import { Input } from 'components/form/Input'
import { useTranslation } from 'react-i18next'

interface PhoneInputProps {
    err: string
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
    ({ err }, ref) => {
        const { t } = useTranslation()
        return (
            <InputMask
                maskChar={null}
                mask="+3\8(999) 99 999 99"
                type="text"
                inputMode="numeric"
                pattern="\+38+\([0-9]{3}\)\s+[0-9]{2}\s+[0-9]{3}\s+[0-9]{2}"
            >
                {(
                    inputMaskProps: React.InputHTMLAttributes<HTMLInputElement>
                ) => (
                    <Input
                        {...inputMaskProps}
                        isValid={err}
                        name="phone"
                        placeholder={t('phone')}
                        ref={ref}
                    />
                )}
            </InputMask>
        )
    }
)

PhoneInput.displayName = 'PhoneInput'
