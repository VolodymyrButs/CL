import React from 'react'
import styled, { css } from 'styled-components'
import { IInputProps } from 'components/form/Types'
import { Label } from 'components/form/Label'
import { inputStyle } from 'styles/inputStyle'
import { useHasValue } from 'hooks/useHasValue'

export const InputStyle = styled.input<{ isValid?: string }>`
    ${inputStyle}
    ${(props) =>
        props.isValid &&
        css`
            border-bottom-color: red;
        `};
    :-webkit-autofill {
        transition: background-color 5000s ease-in-out 0s;
        background: -webkit-linear-gradient(
            top,
            rgba(255, 255, 255, 0) 0%,
            rgba(0, 174, 255, 0.04) 50%,
            rgba(255, 255, 255, 0) 51%,
            rgba(0, 174, 255, 0.03) 100%
        );
    }
`

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
    ({ placeholder, ...props }, ref) => {
        const { inputHandler, hasValue } = useHasValue()
        return (
            <Label hasValue={hasValue} placeholder={placeholder}>
                <InputStyle onChange={inputHandler} ref={ref} {...props} />
            </Label>
        )
    }
)
Input.displayName = 'Input'
