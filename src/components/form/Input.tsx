import styled from 'styled-components'

import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'

export const Input = styled.input<{ borderColor: string }>`
    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.4px;
    background-color: transparent;
    border: 0px solid;
    border-bottom: 1px solid ${colors.dark};
    border-bottom-color: ${props => (props.borderColor ? 'red' : 'default')};
    margin: 20px 0;
    padding: 5px;
    @media (min-width: ${displayWidth.desktop}) {
        margin-right: 150px;
    }
`
