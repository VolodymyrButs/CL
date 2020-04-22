import React from 'react'
import styled, { keyframes } from 'styled-components'

import { TFunction } from 'i18next'

const rotate = keyframes`
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0);
        }
    `

const ContainerSvg = styled.div`
    width: 80px;
    height: 80px;
    position: relative;
`
const Circle = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;
    text {
        font-family: 'Helvetica Neue', Arial;
        font-size: 23px;
    }
    svg {
        position: absolute;
        left: -25%;
        top: -25%;
        width: 150%;
        height: 150%;
        animation-name: ${rotate};
        animation-duration: 5s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
`
interface IRoundTextProps {
    children: React.ReactElement
    text: TFunction
}

export const RoundText: React.FC<IRoundTextProps> = ({ children, text }) => {
    return (
        <ContainerSvg>
            <Circle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="300"
                    height="300"
                    x="0"
                    y="0"
                    viewBox="0 0 300 300"
                >
                    <defs>
                        <path
                            id="circlePath"
                            d="M90 150a60 60 0 01120 0 60 60 0 01-120 0"
                        ></path>
                    </defs>
                    <circle cx="150" cy="100" r="100" fill="none"></circle>
                    <use fill="none" xlinkHref="#circlePath"></use>
                    <text>
                        <textPath xlinkHref="#circlePath">{text}</textPath>
                    </text>
                </svg>
            </Circle>
            {children}
        </ContainerSvg>
    )
}
