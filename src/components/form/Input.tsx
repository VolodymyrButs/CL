import styled from 'styled-components'

import { colors } from 'styles/colors'

export const Input = styled.input<{ borderColor: string }>`
    background-color: transparent;
    border: 0px solid;
    border-bottom: 1px solid ${colors.dark};
    border-bottom-color: ${props => (props.borderColor ? 'red' : 'default')};
    margin: 20px;
    margin-right: 200px;
    padding: 5px;
`
