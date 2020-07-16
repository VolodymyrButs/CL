import styled from 'styled-components'
import LogoIcon from 'assets/icons/Logo.svg'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { headerHeight } from 'styles/height'

const paddingMobile = '11px'
const paddingDesktop = '12px'

export const Logo = styled(LogoIcon)`
    width: calc(${headerHeight.mobile} - ${paddingMobile}*2);
    height: calc(${headerHeight.mobile} - ${paddingMobile}*2);
    padding: ${paddingMobile};
    fill: ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        min-width: calc(${headerHeight.desktop} - ${paddingDesktop}*2);
        min-height: calc(${headerHeight.desktop} - ${paddingDesktop}*2);
        padding: ${paddingDesktop};
    }
`
