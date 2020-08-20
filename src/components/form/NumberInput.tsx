import React from 'react'

import { Input } from 'components/form/Input'
import { IInputProps } from 'components/form/Types'

export const NumberInput = ({
    inputRef,
    err,
    placeholder,
    name,
    ...props
}: IInputProps) => {
    return (
        <Input
            type="number"
            name={name}
            ref={inputRef}
            isValid={err}
            placeholder={placeholder}
            {...props}
        />
    )
}
