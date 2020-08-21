import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { IInputProps } from 'components/form/Types'
import { inputStyle } from 'styles/inputStyle'
import Arrow from 'assets/icons/ShevronDown.svg'

const Wrapper = styled.div`
    position: relative;
`
const LabelSelect = styled.label`
    position: absolute;
    font-size: 12px;
    right: 0;
    left: 6px;
    bottom: 5px;
    color: gray;
`
const ArrowS = styled(Arrow)`
    width: 15px;
    height: 15px;
    position: absolute;
    right: 7px;
    bottom: 28px;
    fill: gray;
    pointer-events: none;
`

const SelectElement = styled.select<{
    isValid?: string
    selectedValue?: string
}>`
    color: ${props => (props.selectedValue === 'none' ? 'gray' : 'black')};
    ${inputStyle};
    ${props =>
        props.isValid &&
        css`
            border-bottom-color: red;
        `};
`

export const Select = ({
    inputRef,
    err,
    children,
    name,
    id,
    placeholder,
}: IInputProps) => {
    const [selectValue, setSelectValue] = useState('none')
    const handleSelectChange = (e: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setSelectValue(e.target.value)
    }
    return (
        <Wrapper>
            <LabelSelect htmlFor={id}>{placeholder}</LabelSelect>
            <SelectElement
                ref={inputRef}
                defaultValue="none"
                name={name}
                isValid={err}
                id={id}
                onChange={handleSelectChange}
                selectedValue={selectValue}
            >
                {children}
            </SelectElement>
            <ArrowS />
        </Wrapper>
    )
}
