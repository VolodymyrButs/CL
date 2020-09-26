import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import Arrow from 'assets/icons/close.svg'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { Icon } from 'components/Icon'
import { sendEvent } from 'tracking'

const QuestionWrapper = styled.div<{ $isAnswerVisible: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 22px 16px 0;
    cursor: pointer;
    :before {
        position: absolute;
        content: '';
        top: 0px;
        left: 16px;
        right: 16px;
        z-index: 3;
        border-top: 1px solid ${colors.dark};
        border-bottom: none;
        bottom: 100%;
    }
    ${({ $isAnswerVisible }) =>
        $isAnswerVisible &&
        css`
            background-color: ${colors.dark};
            :after {
                pointer-events: none;
                position: absolute;
                top: 0;
                bottom: 0px;
                left: 15px;
                right: 15px;
                border-left: 1px solid ${colors.white};
                border-right: 1px solid ${colors.white};
                z-index: 3;
                content: '';
                @media (min-width: ${displayWidth.tablet}) {
                    display: none;
                }
            }
            :before {
                border-top: none;
            }
        `}
    @media (min-width: ${displayWidth.tablet}) {
        margin: 0 32px;
        padding: 10px 0;
        flex-direction: row;
        justify-content: flex-start;
        :before {
            position: absolute;
            content: '';
            bottom: 0px;
            left: 0;
            right: 0;
            z-index: 3;
            border-bottom: 1px solid ${colors.dark};
            border-top: none;
            top: 100%;
        }
    }
`
const Question = styled.div<{ $isAnswerVisible: boolean }>`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: ${({ $isAnswerVisible }) =>
        $isAnswerVisible ? colors.white : colors.dark};
    text-align: center;
    @media (min-width: ${displayWidth.tablet}) {
        width: 100%;
        text-align: left;
    }
`
const Answer = styled.div<{ $isAnswerVisible: boolean }>`
    display: ${({ $isAnswerVisible }) => ($isAnswerVisible ? 'block' : 'none')};
    color: ${colors.darkText};
    background-color: ${colors.white};
    padding: 32px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.4px;
    @media (min-width: ${displayWidth.tablet}) {
        border: 1px solid ${colors.dark};
        padding: 32px 65px;
        margin: 0 32px;
    }
    strong {
        font-weight: bold;
    }
    a {
        color: ${colors.dark};
    }
    p,
    li {
        margin: 1em 0;
    }
    ol,
    ul {
        margin-left: 1em;
    }
    ol {
        list-style: decimal;
    }
`
const ArrowStyled = styled(Arrow)<{ $isAnswerVisible: boolean }>`
    margin: 16px 0px;
    stroke: ${({ $isAnswerVisible }) => $isAnswerVisible && colors.white};
    transform: ${({ $isAnswerVisible }) =>
        !$isAnswerVisible && 'rotate(180deg)'};
    cursor: pointer;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 16px 10px;
    }
`
const IconStyled = styled(Icon)<{ $isAnswerVisible: boolean }>`
    width: 45px;
    height: 50px;
    min-width: 45px;
    stroke: ${({ $isAnswerVisible }) => $isAnswerVisible && colors.white};
    @media (min-width: ${displayWidth.tablet}) {
        margin: 0 15px 0 5px;
    }
`
export interface ServicesItemProp {
    question: string
    answer: string
    icon: string
}
export const ServicesItem = ({ question, answer, icon }: ServicesItemProp) => {
    const [isAnswerVisible, setIsAnswerVisible] = useState(false)
    return (
        <>
            <QuestionWrapper
                $isAnswerVisible={isAnswerVisible}
                onClick={() => {
                    setIsAnswerVisible(!isAnswerVisible)
                    sendEvent('Click', {
                        eventCategory: 'ServicesItem',
                        type: question,
                    })
                }}
            >
                <IconStyled
                    $isAnswerVisible={isAnswerVisible}
                    iconName={icon}
                />
                <Question
                    $isAnswerVisible={isAnswerVisible}
                    dangerouslySetInnerHTML={{
                        __html: question,
                    }}
                />
                <ArrowStyled $isAnswerVisible={isAnswerVisible} />
            </QuestionWrapper>
            <Answer
                $isAnswerVisible={isAnswerVisible}
                dangerouslySetInnerHTML={{
                    __html: answer,
                }}
            />
        </>
    )
}
