import React, { RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { light } from './themes/light'

const Input = styled.input`
    font-size: 20px;
    height: 26px;
    max-width: 100px;
    width: 100%;
    box-sizing: border-box;
    padding: 2px;
    border: none;
    border-radius: 0;
    border-bottom: solid 1px ${light.bgColor};
    @media (max-width: 767px) {
        font-size: 16px;
        height: 20px;
    }
`
const Label = styled.span`
    font-size: 10px;
    padding-left: 5px;
`
const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 5px;
`
const Unit = styled.span`
    position: absolute;
    bottom: 7px;
    right: 5px;
`
type Props = {
    onChange: (event: { target: { value: string } }) => void
    value: number
    min?: number
    max?: number
    forwardRef?: RefObject<HTMLInputElement> | null
    pattern?: string
    type?: string
    placeholder?: string
    setInputValue: (arg: number) => void
}

export const NumberInput = ({
    value,
    min = 0,
    max = 99999,
    onChange,
    forwardRef = null,
    pattern = '[0-9]*',
    type = 'text',
    placeholder = '0',
    setInputValue,
}: Props) => {
    const { t } = useTranslation()
    const handleChange = (event: { target: { value: string } }) => {
        if (isNaN(Number(event.target.value))) {
            setInputValue(100)
            return
        }
        if (Number(event.target.value) < 0) {
            setInputValue(100)
            return
        }
        if ((min !== undefined || min === 0) && value < min) {
            setInputValue(min)
            return
        }
        if ((max !== undefined || max === 0) && value > max) {
            setInputValue(max)
            return
        }

        onChange(event)
    }

    return (
        <Wrapper>
            <Label> {placeholder} </Label>
            <Unit>{t('unit')}</Unit>
            <Input
                value={value}
                inputMode="decimal"
                ref={forwardRef}
                onChange={handleChange}
                type={type}
                pattern={pattern}
            />
        </Wrapper>
    )
}
