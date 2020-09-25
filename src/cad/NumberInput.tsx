import React, { RefObject } from 'react'
import styled from 'styled-components'

const Input = styled.input`
    font-size: 20px;
    height: 34px;
    max-width: 90px;
    min-width: 80;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 0 5px;
    border: solid 1px ${(props) => props.theme.color};
    @media (max-width: 767px) {
        width: 90px;
        font-size: 16px;
        height: 24px;
    }
`

type Props = {
    onChange: (event: { target: { value: string } }) => void
    value: number
    min?: number
    max?: number
    forwardRef?: RefObject<HTMLInputElement> | null
    pattern?: string
    type?: string
}

export const NumberInput = ({
    value,
    min = 0,
    max = 999999,
    onChange,
    forwardRef = null,
    pattern = '[0-9]*',
    type = 'text',
}: Props) => {
    const handleChange = (event: { target: { value: string } }) => {
        if (isNaN(Number(event.target.value))) {
            return
        }
        if (Number(event.target.value) < 0) {
            return
        }
        if ((min !== undefined || min === 0) && value < min) {
            return
        }
        if ((max !== undefined || max === 0) && value > max) {
            return
        }

        onChange(event)
    }

    return (
        <Input
            value={value}
            inputMode="decimal"
            ref={forwardRef}
            onChange={handleChange}
            type={type}
            pattern={pattern}
        />
    )
}
