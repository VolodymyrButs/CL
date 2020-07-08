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
const Answer = styled(Question)<{ showansver: boolean }>`
    display: ${({ showansver }) => (showansver ? 'block' : 'none')};
    color: ${colors.darkText};
    margin-top: 2px;
    opacity: 0.38;
`
const IconStyled = styled(Arrow)<{ showansver: boolean }>`
    position: absolute;
    bottom: 8px;
    right: 0;
    transform: ${({ showansver }) => !showansver && 'rotate(180deg)'};
    cursor: pointer;
`

export const FAQItem = ({ question, answer }: IFAQItem) => {
    const [showAnsver, setShowAnswer] = useState(false)
    return (
        <FaqListItemWrapper>
            <QuestionWrapper>
                <Question
                    dangerouslySetInnerHTML={{
                        __html: question,
                    }}
                />

                <IconStyled
                    showansver={showAnsver}
                    onClick={() => {
                        setShowAnswer(!showAnsver)
                    }}
                />
            </QuestionWrapper>
            <Answer
                showansver={showAnsver}
                dangerouslySetInnerHTML={{
                    __html: answer,
                }}
            />
        </FaqListItemWrapper>
    )
}
