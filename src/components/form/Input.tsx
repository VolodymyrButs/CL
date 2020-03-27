import styled from 'styled-components'

export const Input = styled.input<{ borderColor: string }>`
    border-color: ${props => (props.borderColor ? 'red' : 'default')};
`
