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
