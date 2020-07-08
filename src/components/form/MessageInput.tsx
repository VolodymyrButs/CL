import React from 'react'
import styled from 'styled-components'

import { IInputProps } from 'components/form/Types'
import { colors } from 'styles/colors'
import { useTranslation } from 'react-i18next'
import { displayWidth } from 'styles/width'

const TextArea = styled.textarea<{ borderColor: string }>`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.4px;
    background-color: transparent;
    border: 0px solid;
    box-sizing: border-box;
    border-bottom: 1px solid ${colors.dark};
    border-bottom-color: ${props => (props.borderColor ? 'red' : 'default')};
    padding: 5px;
    margin: 20px 0;
    width: 100%;
    resize: vertical;
    min-height: 33px;
    max-height: 150px;
    overflow-y: auto;
    @media (min-width: ${displayWidth.desktop}) {
        width: calc(100% - 150px);
        margin-right: 200px;
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
            borderColor={err}
        />
    )
}
