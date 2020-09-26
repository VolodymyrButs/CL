import React, { useState } from 'react'
import styled from 'styled-components'

import Arrow from 'assets/icons/close.svg'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { IFAQItem } from './FAQ'
import { sendEvent } from 'tracking'

const FaqListItemWrapper = styled.div`
    border-bottom: 1px solid ${colors.dark};
`
const QuestionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-top: 36px;
    cursor: pointer;
    @media (min-width: ${displayWidth.tablet}) {
        margin-top: 24px;
    }
`
const Question = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: ${colors.dark};
    margin-right: 30px;
    padding-bottom: 8px;
`
const Answer = styled(Question)<{ $isAnswerVisible: boolean }>`
    display: ${({ $isAnswerVisible }) => ($isAnswerVisible ? 'block' : 'none')};
    color: ${colors.darkText};
    margin-top: 2px;
    opacity: 0.7;
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
const IconStyled = styled(Arrow)<{ $isAnswerVisible: boolean }>`
    position: absolute;
    bottom: 8px;
    right: 0;
    transform: ${({ $isAnswerVisible }) =>
        !$isAnswerVisible && 'rotate(180deg)'};
    cursor: pointer;
`

export const FAQItem = ({ question, answer }: IFAQItem) => {
    const [isAnswerVisible, setIsAnswerVisible] = useState(false)
    return (
        <FaqListItemWrapper>
            <QuestionWrapper
                onClick={() => {
                    setIsAnswerVisible(!isAnswerVisible)
                    sendEvent('Click', {
                        eventCategory: 'FAQItem',
                        question,
                    })
                }}
            >
                <Question
                    dangerouslySetInnerHTML={{
                        __html: question,
                    }}
                />

                <IconStyled $isAnswerVisible={isAnswerVisible} />
            </QuestionWrapper>
            <Answer
                $isAnswerVisible={isAnswerVisible}
                dangerouslySetInnerHTML={{
                    __html: answer,
                }}
            />
        </FaqListItemWrapper>
    )
}
