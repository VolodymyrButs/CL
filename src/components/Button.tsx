import styled from 'styled-components'

import { colors } from 'styles/colors'

export const Button = styled.button`
    width: 264px;
    height: 72px;
    border: 1px solid ${colors.dark};
    background-color: ${colors.dark};
    border-radius: 36px;
    color: ${colors.white};
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    text-transform: uppercase;
    cursor: pointer;
    :hover {
        opacity: 0.9;
    }
`
