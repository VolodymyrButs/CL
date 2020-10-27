import { css } from 'styled-components'
import { headerHeight } from 'styles/height'
import { displayWidth } from 'styles/width'

export const headerBg = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
    height: ${headerHeight.mobile};
    background-color: inherit;
    content: '';
    @media (min-width: ${displayWidth.tablet}) {
        height: ${headerHeight.desktop};
    }
`
