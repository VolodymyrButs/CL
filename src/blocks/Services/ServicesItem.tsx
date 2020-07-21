import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import Arrow from 'assets/icons/close.svg'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { IServicesItem } from './Services'
import { Icon } from 'components/Icon'

const QuestionWrapper = styled.div<{ showansver: boolean }>`
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
     ${({ showansver }) =>
         showansver &&
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
const Question = styled.div<{ showansver: boolean }>`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: ${({ showansver }) => (showansver ? colors.white : colors.dark)};
    text-align: center;
    @media (min-width: ${displayWidth.tablet}) {
        width: 100%;
        text-align: left;
    }
`
const Answer = styled.div<{ showansver: boolean }>`
    display: ${({ showansver }) => (showansver ? 'block' : 'none')};
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
const ArrowStyled = styled(Arrow)<{ showansver: boolean }>`
    margin: 16px 0;
    fill: ${({ showansver }) => showansver && colors.white};
    transform: ${({ showansver }) => !showansver && 'rotate(180deg)'};
    cursor: pointer;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 16px 5px;
    }
`
const IconStyled = styled(Icon)<{ showansver: boolean }>`
    width: 50px;
    height: 50px;
    fill: ${({ showansver }) => showansver && colors.white};
    @media (min-width: ${displayWidth.tablet}) {
        margin: 0 15px 0 5px;
    }
`

export const ServicesItem = ({ question, answer, icon }: IServicesItem) => {
    const [showAnsver, setShowAnswer] = useState(false)
    return (
        <>
            <QuestionWrapper showansver={showAnsver}>
                <IconStyled showansver={showAnsver} iconName={icon} />
                <Question
                    showansver={showAnsver}
                    dangerouslySetInnerHTML={{
                        __html: question,
                    }}
                />
                <ArrowStyled
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
        </>
    )
}
