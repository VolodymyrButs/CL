import React from 'react'
import InputMask from 'react-input-mask'
import { Input } from 'components/form/Input'
import { IInputProps } from 'components/form/Types'

export const PhoneInput = ({ err, inputRef }: IInputProps) => {
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
                    placeholder="phone"
                    ref={inputRef}
                />
            )}
        </InputMask>
    )
}
