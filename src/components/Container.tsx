import styled from 'styled-components'
import { displayWidth, containerWidth } from 'styles/width'

interface IContainerProps {
    columns?: string
    tabletColumns?: string
    desktopColunms?: string
}
export const Container = styled.div<IContainerProps>`
    display: grid;
    grid-template-columns: ${props => props.columns};
    width: 100%;
    height: 100%;
    @media (min-width: ${displayWidth.tablet}) {
        width: calc(100% - 160px);
        grid-template-columns: ${props => props.tabletColumns};
    }
    outline: 1px solid #231f20;
    @media (min-width: ${displayWidth.desktop}) {
        max-width: ${containerWidth.desktop};
        grid-template-columns: ${props => props.desktopColunms};
    }
`
