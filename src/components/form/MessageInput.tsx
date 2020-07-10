import React from 'react'
import styled, { css } from 'styled-components'

import { IInputProps } from 'components/form/Types'
import { useTranslation } from 'react-i18next'
import { displayWidth } from 'styles/width'
import { inputStyle } from 'styles/inputStyle'

const TextArea = styled.textarea<{ isValid?: string }>`
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
    max-height: 150px;
    overflow-y: auto;
    @media (min-width: ${displayWidth.desktop}) {
        width: calc(100% - 150px);
        margin-right: 150px;
    }
`
export const MessageInput = ({ inputRef, err }: IInputProps) => {
    const { t } = useTranslation()
    return (
        <TextArea
            rows={1}
            name="message"
            placeholder={t('message')}
            ref={inputRef}
            isValid={err}
        />
    )
}
