import styled from 'styled-components'
import LogoIcon from 'assets/icons/Logo.svg'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'

export const Logo = styled(LogoIcon)`
    width: 43px;
    height: 43px;
    padding: 11px;
    fill: ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        min-width: 56px;
        padding: 12px;
    }
`
