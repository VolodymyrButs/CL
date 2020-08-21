import React from 'react'
import styled, { css } from 'styled-components'
import { Label } from 'components/form/Label'
import { colors } from 'styles/colors'
import { useForm } from 'react-hook-form'

const InputStyle = styled.input<{ isValid?: string }>`
    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    font-weight: normal;
    width: 100%;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.4px;
    background-color: transparent !important;
    border: 0px solid;
    border-bottom: 1px solid ${colors.dark};
    margin: 20px 0;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 0;
    -webkit-appearance: none;
    -webkit-border-radius: 0px;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    [type='number'] {
        -moz-appearance: textfield;
    }
    ${props =>
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

export const Input = React.forwardRef(
    ({
        placeholder,
        ref,
        ...props
    }: {
        placeholder: string
        ref: (
            ref:
                | HTMLInputElement
                | HTMLSelectElement
                | HTMLTextAreaElement
                | null
        ) => void | ReturnType<typeof useForm>['register']
    }) => {
        return (
            <Label placeholder={placeholder}>
                <InputStyle placeholder={placeholder} ref={ref} {...props} />
            </Label>
        )
    }
)
Input.displayName = 'Input'
