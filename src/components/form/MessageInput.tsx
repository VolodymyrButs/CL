import React from 'react'
import styled from 'styled-components'

import { IInputProps } from 'components/form/Types'
import { colors } from 'styles/colors'
import { useTranslation } from 'react-i18next'

const TextArea = styled.textarea<{ borderColor: string }>`
    background-color: transparent;
    border: 0px solid;
    border-bottom: 1px solid ${colors.dark};
    border-bottom-color: ${props => (props.borderColor ? 'red' : 'default')};
    padding: 5px;
    margin: 20px;
    margin-right: 200px;
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
