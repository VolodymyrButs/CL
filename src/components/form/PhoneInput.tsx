import React from 'react'
import InputMask from 'react-input-mask'

import { useTranslation } from 'react-i18next'
import { Label } from './Label'
import { InputStyle } from './Input'
import { useHasValue } from 'hooks/useHasValue'

interface PhoneInputProps {
    err: string
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
    ({ err }, ref) => {
        const { t } = useTranslation()
        const { inputHandler, hasValue } = useHasValue()
        return (
            <Label hasValue={hasValue} placeholder={t('phone')}>
                <InputMask
                    maskChar={null}
                    mask="+3\8(999) 99 999 99"
                    type="text"
                    inputMode="numeric"
                    pattern="\+38+\([0-9]{3}\)\s+[0-9]{2}\s+[0-9]{3}\s+[0-9]{2}"
                    onChange={inputHandler}
                >
                    {(
                        inputMaskProps: React.InputHTMLAttributes<
                            HTMLInputElement
                        >
                    ) => (
                        <InputStyle
                            {...inputMaskProps}
                            isValid={err}
                            name="phone"
                            ref={ref}
                        />
                    )}
                </InputMask>
            </Label>
        )
    }
)

PhoneInput.displayName = 'PhoneInput'
