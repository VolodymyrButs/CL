import React from 'react'
import styled from 'styled-components'
import { IInputProps } from 'components/form/Types'

const TextArea = styled.textarea<{ borderColor: string }>`
    border-color: ${props => (props.borderColor ? 'red' : 'default')};
`
export const MessageInput = ({ inputRef, err }: IInputProps) => {
    return (
        <TextArea
            name="message"
            placeholder="message"
            ref={inputRef}
            borderColor={err}
        />
    )
}
