import React from 'react'
import { Input } from 'components/form/Input'
import { IInputProps } from 'components/form/Types'

export const EmailInput = ({ inputRef, err }: IInputProps) => {
    return (
        <Input
            type="email"
            name="email"
            placeholder="email"
            ref={inputRef}
            borderColor={err}
        />
    )
}
