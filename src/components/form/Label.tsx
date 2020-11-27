import { TFunction } from 'i18next'
import React from 'react'
import styled, { css } from 'styled-components'
import { smallLabel } from 'styles/smallLabel'

const LabelContainer = styled.label`
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    line-height: 1;
`
export const LabelText = styled.span<{
    $hasValue?: boolean
    labelBottom?: number
}>`
    position: absolute;
    color: gray;
    bottom: 27px;
    left: 6px;
    right: 0;
    ${LabelContainer} > *:focus + & {
        ${({ labelBottom }) =>
            labelBottom
                ? css`
                      font-size: 12px;
                      bottom: ${labelBottom}px;
                  `
                : smallLabel}
    }
    ${({ $hasValue, labelBottom }) =>
        ($hasValue &&
            labelBottom &&
            css`
                font-size: 12px;
                bottom: ${labelBottom}px;
            `) ||
        ($hasValue && !labelBottom && smallLabel)}
`
interface ILabelProps {
    placeholder?: string | TFunction
    hasValue?: boolean
    children?: React.ReactNode
    labelBottom?: number
}
export const Label = ({
    placeholder,
    children,
    hasValue,
    labelBottom,
    ...props
}: ILabelProps) => {
    return (
        <LabelContainer>
            {children}
            <LabelText
                {...props}
                labelBottom={labelBottom}
                $hasValue={hasValue}
            >
                {placeholder}
            </LabelText>
        </LabelContainer>
    )
}
