import React from 'react'
import styled, { css } from 'styled-components'

import { IInputProps } from 'components/form/Types'
import { useTranslation } from 'react-i18next'
import { inputStyle } from 'styles/inputStyle'

const TextArea = styled.textarea<{ isValid?: string; maxheight?: string }>`
    ${inputStyle}
    font-family: 'Open Sans', sans-serif;
    ${props =>
        props.isValid &&
        css`
            border-bottom-color: red;
        `}
    width: 100%;
    resize: vertical;
    min-height: 33px;
    max-height: ${props => (props.maxheight ? props.maxheight : '150px')};
    overflow-y: auto;
`

export const MessageInput = ({
    inputRef,
    err,
    questionPlaceholder,
    maxHeight,
}: IInputProps) => {
    const { t } = useTranslation()
    return (
        <TextArea
            maxheight={maxHeight}
            rows={1}
            name="message"
            placeholder={
                questionPlaceholder ? questionPlaceholder : t('message')
            }
            ref={inputRef}
            isValid={err}
        />
    )
}
