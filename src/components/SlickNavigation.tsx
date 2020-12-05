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
    width: 30px;
    height: 30px;
    :before {
        display: none;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 45px;
        height: 45px;
    }
`
const ArrowWrapperPrevious = styled(ArrowWrapper)<{
    modal?: boolean
    bottom?: boolean
}>`
    left: ${(props) => (props.modal ? '-0' : '30px')};
    ${(props) => props.bottom === true && 'top:95%;left:15px;'};
`
const ArrowWrapperNext = styled(ArrowWrapper)<{
    modal?: boolean
    bottom?: boolean
}>`
    right: ${(props) => (props.modal ? '2px' : '30px')};
    ${(props) => props.bottom === true && 'top:95%;right:15px;'};
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
    $currentslide?: any
    $slidecount?: any
    children?: any
    modal?: boolean
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export const SlickNext = ({
    $currentslide,
    $slidecount,
    children,
    modal,
    bottom,
    ...props
}: SlickButtonProps) => (
    <ArrowWrapperNext {...props} bottom={bottom} modal={modal}>
        <ArrowNext />
    </ArrowWrapperNext>
)

/* eslint-disable @typescript-eslint/no-unused-vars */
export const SlickPrevious = ({
    $currentslide,
    $slidecount,
    children,
    modal,
    bottom,
    ...props
}: SlickButtonProps) => (
    <ArrowWrapperPrevious {...props} bottom={bottom} modal={modal}>
        <ArrowPrevious />
    </ArrowWrapperPrevious>
)
