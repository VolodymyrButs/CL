import React from 'react'
import styled, { css } from 'styled-components'
import { ILabelProps } from './Types'

const LabelContainer = styled.label`
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
`
export const LabelText = styled.span<{ withValue?: boolean }>`
    position: absolute;
    color: gray;
    bottom: 27px;
    left: 6px;
    right: 0;
    ${LabelContainer} > *:focus + & {
        font-size: 12px;
        bottom: 5px;
    }
    ${({ withValue }) =>
        withValue &&
        css`
            font-size: 12px;
            bottom: 5px;
        `}
`

export const Label = ({ placeholder, children, withValue }: ILabelProps) => {
    return (
        <LabelContainer>
            {children}
            <LabelText withValue={withValue}>{placeholder}</LabelText>
        </LabelContainer>
    )
}
