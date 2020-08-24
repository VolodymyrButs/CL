import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { IInputProps } from 'components/form/Types'
import { useTranslation } from 'react-i18next'
import { inputStyle } from 'styles/inputStyle'
import { Label } from 'components/form/Label'

const TextArea = styled.textarea<{ isValid?: string; maxheight?: string }>`
    ${inputStyle}
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

export const MessageInput = React.forwardRef<HTMLTextAreaElement, IInputProps>(
    ({ err, placeholder, maxHeight }, ref) => {
        const { t } = useTranslation()
        const [withValue, setWithValue] = useState(false)
        const inputHandler = (e: { target: { value: string } }) => {
            if (e.target.value === '') {
                setWithValue(false)
                return
            }
            setWithValue(true)
        }
        return (
            <Label
                withValue={withValue}
                placeholder={placeholder || t('message')}
            >
                <TextArea
                    maxheight={maxHeight}
                    rows={1}
                    name="message"
                    ref={ref}
                    isValid={err}
                    onChange={inputHandler}
                />
            </Label>
        )
    }
)

MessageInput.displayName = 'MessageInput'
