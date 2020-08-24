import React from 'react'
import styled from 'styled-components'
import { smallLabel } from 'styles/smallLabel'

const LabelContainer = styled.label`
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
`
export const LabelText = styled.span<{ $hasValue?: boolean }>`
    position: absolute;
    color: gray;
    bottom: 27px;
    left: 6px;
    right: 0;
    ${LabelContainer} > *:focus + & {
        ${smallLabel}
    }
    ${({ $hasValue }) => $hasValue && smallLabel}
`
interface ILabelProps {
    placeholder?: string
    hasValue?: boolean
    children?: React.ReactNode
}
export const Label = ({ placeholder, children, hasValue }: ILabelProps) => {
    return (
        <LabelContainer>
            {children}
            <LabelText $hasValue={hasValue}>{placeholder}</LabelText>
        </LabelContainer>
    )
}
