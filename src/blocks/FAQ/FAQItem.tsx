import React, { useState } from 'react'
import styled from 'styled-components'

import Arrow from 'assets/icons/close.svg'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { IFAQItem } from './FAQ'

const FaqListItemWrapper = styled.div`
    border-bottom: 1px solid ${colors.dark};
`
const QuestionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-top: 36px;
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
const Answer = styled(Question)<{ isAnswerVisible: boolean }>`
    display: ${({ isAnswerVisible }) => (isAnswerVisible ? 'block' : 'none')};
    color: ${colors.darkText};
    margin-top: 2px;
    opacity: 0.38;
`
const IconStyled = styled(Arrow)<{ isAnswerVisible: boolean }>`
    position: absolute;
    bottom: 8px;
    right: 0;
    transform: ${({ isAnswerVisible }) => !isAnswerVisible && 'rotate(180deg)'};
    cursor: pointer;
`

export const FAQItem = ({ question, answer }: IFAQItem) => {
    const [isAnswerVisible, setIsAnswerVisible] = useState(false)
    return (
        <FaqListItemWrapper>
            <QuestionWrapper>
                <Question
                    dangerouslySetInnerHTML={{
                        __html: question,
                    }}
                />

                <IconStyled
                    isAnswerVisible={isAnswerVisible}
                    onClick={() => {
                        setIsAnswerVisible(!isAnswerVisible)
                    }}
                />
            </QuestionWrapper>
            <Answer
                isAnswerVisible={isAnswerVisible}
                dangerouslySetInnerHTML={{
                    __html: answer,
                }}
            />
        </FaqListItemWrapper>
    )
}
