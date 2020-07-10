import React from 'react'
import styled, { css } from 'styled-components'

import { IInputProps } from 'components/form/Types'
import { inputStyle } from 'styles/inputStyle'
import { backgroundColors } from 'styles/colors'

const SelectElement = styled.select<{ isValid?: string }>`
    ${inputStyle}
    background-color: ${backgroundColors.formPromo};
    ${props =>
        props.isValid &&
        css`
            border-bottom-color: red;
        `}

`

export const Select = ({ inputRef, err, children, name }: IInputProps) => {
    return (
        <SelectElement
            ref={inputRef}
            defaultValue="none"
            name={name}
            isValid={err}
        >
            {children}
        </SelectElement>
    )
}
