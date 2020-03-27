import React from 'react'
import { Input } from 'components/form/Input'
import { IInputProps } from 'components/form/Types'

export const NameInput = ({ inputRef, err }: IInputProps) => {
    return (
        <Input
            type="text"
            name="name"
            placeholder="name"
            ref={inputRef}
            borderColor={err}
        />
    )
}
