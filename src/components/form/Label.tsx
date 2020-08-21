import React from 'react'
import styled from 'styled-components'
import { ILabelProps } from './Types'

const LabelContainer = styled.label`
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
`
export const LabelText = styled.span`
    position: absolute;
    font-size: 12px;
    color: gray;
    bottom: 5px;
    left: 6px;
    right: 0;
`

export const Label = ({ placeholder, children }: ILabelProps) => {
    return (
        <LabelContainer>
            {children}
            <LabelText>{placeholder}</LabelText>
        </LabelContainer>
    )
}
