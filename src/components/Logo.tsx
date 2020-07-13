import styled from 'styled-components'
import LogoIcon from 'assets/icons/Logo.svg'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { headerHeight } from 'styles/height'

export const Logo = styled(LogoIcon)`
    width: calc(${headerHeight.mobile} - 22px);
    height: calc(${headerHeight.mobile} - 22px);
    padding: 11px;
    fill: ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        min-width: calc(${headerHeight.desktop} - 24px);
        min-height: calc(${headerHeight.desktop} - 24px);
        padding: 12px;
    }
`
