import React from 'react'
import styled from 'styled-components'

import Next from 'assets/icons/arrowRight.svg'
import Previous from 'assets/icons/arrowLeft.svg'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'

const ArrowWrapper = styled.div`
    z-index: 4;
    position: absolute;
    top: calc(50% - 20px);
    right: 30px;
    :before {
        display: none;
    }
`
const ArrowWrapperPrevious = styled(ArrowWrapper)`
    left: 30px;
`
const ArrowWrapperNext = styled(ArrowWrapper)`
    right: 30px;
`
const ArrowNext = styled(Next)`
    width: 30px;
    height: 30px;
    border: 1px solid ${colors.white};
    border-radius: 50%;
    @media (min-width: ${displayWidth.desktop}) {
        width: 45px;
        height: 45px;
    }
`
const ArrowPrevious = styled(Previous)`
    width: 30px;
    height: 30px;
    border: 1px solid ${colors.white};
    border-radius: 50%;
    @media (min-width: ${displayWidth.desktop}) {
        width: 45px;
        height: 45px;
    }
`
/* eslint-disable @typescript-eslint/no-explicit-any */
interface SlickButtonProps {
    [x: string]: any
    currentSlide?: any
    slideCount?: any
    children?: any
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export const SlickNext = ({
    currentSlide,
    slideCount,
    children,
    ...props
}: SlickButtonProps) => (
    <ArrowWrapperNext {...props}>
        <ArrowNext />
    </ArrowWrapperNext>
)

/* eslint-disable @typescript-eslint/no-unused-vars */
export const SlickPrevious = ({
    currentSlide,
    slideCount,
    children,
    ...props
}: SlickButtonProps) => (
    <ArrowWrapperPrevious {...props}>
        <ArrowPrevious />
    </ArrowWrapperPrevious>
)
