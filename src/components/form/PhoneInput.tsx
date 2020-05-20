import React from 'react'
import InputMask from 'react-input-mask'

import { Input } from 'components/form/Input'
import { IInputProps } from 'components/form/Types'
import { useTranslation } from 'react-i18next'

export const PhoneInput = ({ err, inputRef }: IInputProps) => {
    const { t } = useTranslation()
    return (
        <InputMask
            maskChar={null}
            mask="+3\8(999) 99 999 99"
            type="text"
            inputMode="numeric"
            pattern="\+38+\([0-9]{3}\)\s+[0-9]{2}\s+[0-9]{3}\s+[0-9]{2}"
        >
            {(inputMaskProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                <Input
                    {...inputMaskProps}
                    borderColor={err}
                    name="phone"
                    placeholder={t('phone')}
                    ref={inputRef}
                />
            )}
        </InputMask>
    )
}
