import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { IInputProps } from 'components/form/Types'
import { inputStyle } from 'styles/inputStyle'
import Arrow from 'assets/icons/ShevronDown.svg'

const Wrapper = styled.div`
    position: relative;
`

const LabelSelect = styled.label<{
    selectValue?: string
}>`
    position: absolute;
    color: gray;
    bottom: 27px;
    left: 6px;
    right: 0;
    ${({ selectValue }) =>
        selectValue !== 'none' &&
        css`
            font-size: 12px;
            bottom: 5px;
        `}
    pointer-events: none;
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

export const Select = React.forwardRef<HTMLSelectElement, IInputProps>(
    ({ err, children, name, id, placeholder }, ref) => {
        const [selectValue, setSelectValue] = useState('none')

        const handleSelectChange = (e: {
            target: { value: React.SetStateAction<string> }
        }) => {
            setSelectValue(e.target.value)
        }
        return (
            <Wrapper>
                <LabelSelect selectValue={selectValue} htmlFor={id}>
                    {placeholder}
                </LabelSelect>
                <SelectElement
                    ref={ref}
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
)

Select.displayName = 'Select'
