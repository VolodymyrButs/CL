import React from 'react'
import styled, { keyframes } from 'styled-components'

import BigShevronDown from 'assets/icons/BigShrvronDown.svg'
import { colors } from 'styles/colors'

const jump = keyframes`
        0% {
            transform: translate(0,-5px);
        }
        5% {
            transform: translate(0,5px);
        }
        10% {
            transform: translate(0,-5px);
        }
        15% {
            transform: translate(0,-15px);
        }
        20% {
            transform: translate(0,-5px);
        }
        25%{
            transform: translate(0,0px);
        }
        30%{
            transform: translate(0,-5px);
        }
        35%{
            transform: translate(0,-10px);
        }
        40%{
            transform: translate(0,-10px);
        }
        100%{
            transform: translate(0,-10px);

        }
    `
const ArrowWrapper = styled.div`
    position: relative;
    width: 27px;
    height: 77px;
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
    bottom: 20px;
    cursor: pointer;
`
const Line = styled.div`
    position: absolute;
    left: 13px;
    bottom: 20px;
    top: 0px;
    border-left: 1px solid ${colors.dark};
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const JumpingArrow = (props: any) => {
    return (
        <ArrowWrapper {...props}>
            <Line />
            <Arrow />
        </ArrowWrapper>
    )
}
