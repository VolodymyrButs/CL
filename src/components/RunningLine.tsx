import React from 'react'
import styled, { keyframes } from 'styled-components'

import { colors } from 'styles/colors'

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
const RunningTextContainer = styled.div`
    width: 100%;
    height: 100px;
    background-color: ${colors.dark};
    overflow: hidden;
    position: relative;
`
const Wrapper = styled.div`
    height: 100%;
    display: flex;
`
const Text = styled.p`
    align-self: center;
    color: ${colors.white};
    font-size: 23px;
    line-height: 27px;
    white-space: nowrap;
    text-transform: uppercase;
    animation: ${run} 120s linear infinite;
    animation-delay: -60s;
`
const Text2 = styled(Text)`
    animation: ${run2} 120s linear infinite;
    animation-delay: -120s;
`
export const RunningLine = ({ children }: { children: string }) => {
    const runningLineContent =
        children.length < 10 ? children.repeat(100) : children.repeat(20)
    return (
        <RunningTextContainer>
            <Wrapper>
                <Text>{runningLineContent}</Text>

                <Text2>{runningLineContent}</Text2>
            </Wrapper>
        </RunningTextContainer>
    )
}
