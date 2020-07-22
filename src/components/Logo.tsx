import styled from 'styled-components'
import LogoIcon from 'assets/icons/Logo.svg'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { headerHeight } from 'styles/height'

const paddingMobile = '11px'
const paddingDesktop = '12px'

export const Logo = styled(LogoIcon)`
    width: ${headerHeight.mobile};
    height: ${headerHeight.mobile};
    padding: ${paddingMobile};
    fill: ${colors.dark};
    box-sizing: border-box;
    @media (min-width: ${displayWidth.tablet}) {
        min-width: ${headerHeight.desktop};
        min-height: ${headerHeight.desktop};
        padding: ${paddingDesktop};
    }
`
