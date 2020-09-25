import styled from 'styled-components'
import { displayWidth, containerWidth } from 'styles/width'
import { colors } from 'styles/colors'

interface IContainerProps {
    columns?: string
    tabletColumns?: string
    desktopColunms?: string
}
export const Container = styled.div<IContainerProps>`
    display: grid;
    grid-template-columns: ${(props) => props.columns};
    width: 100%;
    @media (min-width: ${displayWidth.tablet}) {
        width: calc(100% - 160px);
        padding: 0;
        outline: 1px solid ${colors.dark};
        grid-template-columns: ${(props) => props.tabletColumns};
    }
    @media (min-width: ${displayWidth.desktop}) {
        max-width: ${containerWidth.desktop};
        grid-template-columns: ${(props) => props.desktopColunms};
    }
`
