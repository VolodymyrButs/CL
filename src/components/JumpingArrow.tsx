import React from 'react'
import styled, { keyframes } from 'styled-components'

import BigShevronDown from 'assets/icons/BigShrvronDown.svg'
import { colors } from 'styles/colors'

const jump = keyframes`
        0% {
            transform: translate(0,0);
        }
        5% {
            transform: translate(0,10px);
        }
        10% {
            transform: translate(0,0);
        }
        15% {
            transform: translate(0,-10px);
        }
        20% {
            transform: translate(0,0);
        }
        25%{
            transform: translate(0,5px);
        }
        30%{
            transform: translate(0,0);
        }
        35%{
            transform: translate(0,-5px);
        }
        40%{
            transform: translate(0,0);
        }
        100%{
            transform: translate(0,0);

        }
    `
const ArrowWrapper = styled.div`
    position: relative;
    width: 27px;
    height: 57px;
    animation-name: ${jump};
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`

const Arrow = styled(BigShevronDown)`
    fill: ${colors.dark};
    position: absolute;
    width: 100%;
    right: 0;
    left: 0;
    bottom: 0;
    cursor: pointer;
`
const Line = styled.div`
    position: absolute;
    left: 13px;
    bottom: 2px;
    top: 0;
    border-left: 1px solid ${colors.dark};
`

export const JumpingArrow = () => {
    return (
        <ArrowWrapper>
            <Line />
            <Arrow />
        </ArrowWrapper>
    )
}
