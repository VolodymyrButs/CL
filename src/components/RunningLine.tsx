import React from 'react'
import styled, { keyframes } from 'styled-components'

import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'

const run = keyframes`
0% {
    transform:translateX(100%)
}
100% {
    transform:translateX(-100%)
}
`
const run2 = keyframes`
0% {
    transform:translateX(0)
}
100% {
    transform:translateX(-200%)
}
`
const RunningTextContainer = styled.div<{ $inverse: boolean | undefined }>`
    width: 100%;
    height: 50px;
    background-color: ${({ $inverse }) =>
        $inverse === true ? colors.dark : colors.white};
    color: ${({ $inverse }) =>
        $inverse === true ? colors.white : colors.dark};
    border-bottom: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        background-color: ${({ $inverse }) =>
            $inverse === true ? colors.white : colors.dark};
        color: ${({ $inverse }) =>
            $inverse === true ? colors.dark : colors.white};
    }
    overflow: hidden;
    position: relative;
`
const Wrapper = styled.div`
    height: 100%;
    display: flex;
`
const Text = styled.p`
    align-self: center;
    color: inherit;
    font-size: 16px;
    line-height: 20px;
    white-space: nowrap;
    text-transform: uppercase;
    animation: ${run} 240s linear infinite;
    animation-delay: -120s;
    @media (min-width: ${displayWidth.tablet}) {
        animation: ${run} 120s linear infinite;
        animation-delay: -60s;
    }
`
const Text2 = styled(Text)`
    animation: ${run2} 240s linear infinite;
    animation-delay: -240s;
    @media (min-width: ${displayWidth.tablet}) {
        animation: ${run2} 120s linear infinite;
        animation-delay: -120s;
    }
`
export const RunningLine = ({
    children,
    inverse,
}: {
    children: string
    inverse?: boolean
}) => {
    const runningLineContent =
        children.length < 10 ? children.repeat(100) : children.repeat(20)
    return (
        <RunningTextContainer $inverse={inverse}>
            <Wrapper>
                <Text>{runningLineContent}</Text>
                <Text2>{runningLineContent}</Text2>
            </Wrapper>
        </RunningTextContainer>
    )
}
