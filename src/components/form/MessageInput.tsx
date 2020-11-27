import React from 'react'
import styled, { css } from 'styled-components'

import { IInputProps } from 'components/form/Types'
import { useTranslation } from 'react-i18next'
import { inputStyle } from 'styles/inputStyle'
import { Label } from 'components/form/Label'
import { useHasValue } from 'hooks/useHasValue'

const TextArea = styled.textarea<{ isValid?: string; maxheight?: string }>`
    ${inputStyle}
    ${(props) =>
        props.isValid &&
        css`
            border-bottom-color: red;
        `}
    width: 100%;
    resize: vertical;
    min-height: 33px;
    max-height: ${(props) => (props.maxheight ? props.maxheight : '150px')};
    overflow-y: auto;
`

export const MessageInput = React.forwardRef<HTMLTextAreaElement, IInputProps>(
    ({ err, placeholder, maxHeight, labelBottom }, ref) => {
        const { t } = useTranslation()
        const { inputHandler, hasValue } = useHasValue()

        return (
            <Label
                labelBottom={labelBottom}
                hasValue={hasValue}
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
