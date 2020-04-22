import styled from 'styled-components'

export const Container = styled.div<{ columns: string }>`
    display: grid;
    grid-template-columns: ${props => props.columns};
    width: 100%;
    height: 100%;
    max-width: 1190px;
    outline: 1px solid #231f20;
`
