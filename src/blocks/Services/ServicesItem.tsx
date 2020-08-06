import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import Arrow from 'assets/icons/close.svg'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { Icon } from 'components/Icon'

const QuestionWrapper = styled.div<{ isAnswerVisible: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 22px 16px 0;
     :before {
        position: absolute;
        content: '';
        bottom: 0;
        left: 15px;
        right: 15px;
        z-index: 3;
        border-bottom: 1px solid ${colors.dark};
    }
     ${({ isAnswerVisible }) =>
         isAnswerVisible &&
         css`
             background-color: ${colors.dark};
             :after {
                 pointer-events: none;
                 position: absolute;
                 top: 0;
                 bottom: 0;
                 left: 16px;
                 right: 16px;
                 border-left: 1px solid ${colors.white};
                 border-right: 1px solid ${colors.white};
                 content: '';
                 @media (min-width: ${displayWidth.tablet}) {
                     display: none;
                 }
             }
             :before {
                 border-bottom: none;
             }
         `}
    @media (min-width: ${displayWidth.tablet}) {
        margin: 24px 32px 0;
        padding: 5px 0;
        flex-direction: row;
        justify-content: flex-start;
        :before {
            left: 0px;
            right: 0px;
        }
    }
`
const Question = styled.div<{ isAnswerVisible: boolean }>`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: ${({ isAnswerVisible }) =>
        isAnswerVisible ? colors.white : colors.dark};
    text-align: center;
    @media (min-width: ${displayWidth.tablet}) {
        width: 100%;
        text-align: left;
    }
`
const Answer = styled.div<{ isAnswerVisible: boolean }>`
    display: ${({ isAnswerVisible }) => (isAnswerVisible ? 'block' : 'none')};
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
const ArrowStyled = styled(Arrow)<{ isAnswerVisible: boolean }>`
    margin: 16px 0;
    stroke: ${({ isAnswerVisible }) => isAnswerVisible && colors.white};
    transform: ${({ isAnswerVisible }) => !isAnswerVisible && 'rotate(180deg)'};
    cursor: pointer;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 16px 5px;
    }
`
const IconStyled = styled(Icon)<{ isAnswerVisible: boolean }>`
    width: 45px;
    height: 50px;
    min-width: 45px;
    stroke: ${({ isAnswerVisible }) => isAnswerVisible && colors.white};
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
                isAnswerVisible={isAnswerVisible}
                onClick={() => {
                    setIsAnswerVisible(!isAnswerVisible)
                }}
            >
                <IconStyled isAnswerVisible={isAnswerVisible} iconName={icon} />
                <Question
                    isAnswerVisible={isAnswerVisible}
                    dangerouslySetInnerHTML={{
                        __html: question,
                    }}
                />
                <ArrowStyled isAnswerVisible={isAnswerVisible} />
            </QuestionWrapper>
            <Answer
                isAnswerVisible={isAnswerVisible}
                dangerouslySetInnerHTML={{
                    __html: answer,
                }}
            />
        </>
    )
}
