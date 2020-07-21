import { css } from 'styled-components'
import { displayWidth } from 'styles/width'
import { colors } from './colors'
import { indent } from './indent'

export const mobileAfterBorder = css`
    :after {
        pointer-events: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: ${indent.mobile};
        right: ${indent.mobile};
        border-left: 1px solid ${colors.dark};
        border-right: 1px solid ${colors.dark};
        content: '';
        z-index: 2;
        @media (min-width: ${displayWidth.tablet}) {
            display: none;
        }
    }
`
