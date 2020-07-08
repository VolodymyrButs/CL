import React from 'react'
import styled from 'styled-components'

import { Icon } from 'components/Icon'
import { colors } from 'styles/colors'

const PhoneSvg = styled(Icon)<{ color?: string }>`
    position: absolute;
    width: 30%;
    height: 30%;
    left: 35%;
    top: 35%;
    ${({ color }) => (color ? `fill:${color}` : `fill:${colors.dark}`)};
    animation-name: jump;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    @keyframes jump {
        0% {
            transform: rotate(30deg);
        }
        5% {
            transform: rotate(0deg);
        }
        10% {
            transform: rotate(30deg);
        }
        15% {
            transform: rotate(60deg);
        }
        20% {
            transform: rotate(30deg);
        }
        25% {
            transform: rotate(45deg);
        }
        30% {
            transform: rotate(30deg);
        }
        35% {
            transform: rotate(15deg);
        }
        40% {
            transform: rotate(30deg);
        }
        100% {
            transform: rotate(30deg);
        }
    }
`

export const PhoneSvgAnimated = ({ color }: { color?: string }) => {
    return <PhoneSvg color={color} iconName={'Phone.svg'} />
}
