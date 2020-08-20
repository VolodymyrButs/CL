import styled, { css } from 'styled-components'

import { inputStyle } from 'styles/inputStyle'

export const Input = styled.input<{ isValid?: string }>`
    ${inputStyle}
    ${props =>
        props.isValid &&
        css`
            border-bottom-color: red;
        `}
`
export const Label = styled.label`
    visibility: hidden;
    height: 0.01px;
`
