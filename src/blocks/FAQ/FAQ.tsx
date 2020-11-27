import React, { useState } from 'react'
import Img, { FluidObject } from 'gatsby-image'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import { colors, backgroundColors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { Container } from 'components/Container'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Button } from 'components/Button'
import { FAQItem } from './FAQItem'
import Chair from 'assets/images/chair.svg'
import { Title } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { getImageByImageName } from 'utils/getImageByImageName'
import { sendEvent } from 'tracking'
import { imagesDataProp } from 'pages/promo'

const FaqWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.contact};
    position: relative;
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: 1px solid ${colors.dark};
    }
`
const FaqListStyled = styled.div<{ showFaqListMobile: boolean }>`
    display: ${({ showFaqListMobile }) =>
        showFaqListMobile ? 'flex' : 'none'};
    flex-direction: column;
    padding: 28px 33px 64px;
    box-sizing: border-box;
    border-bottom: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        outline: 1px solid ${colors.dark};
        padding: 40px 48px 64px;
        border-bottom: none;
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: 56px 48px;
    }
`

const SubTitle = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: ${colors.dark};
    margin: 0 30px;
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`
const ButtonFaq = styled(Button)`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    background: transparent;
    color: ${colors.darkText};
    margin: 40px 28px 58px;
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
    :focus {
        outline: none;
    }
`

const Image = styled(Img)<{ fluid: FluidObject }>`
    display: none;
    width: 100%;
    height: auto;
    color: transparent;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
    }
`
const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${colors.dark};
    ${mobileAfterBorder}
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
        position: relative;
        align-items: flex-start;
    }
`
const CnairImg = styled(Chair)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        position: absolute;
        width: 40%;
        height: auto;
        bottom: 0;
        right: 10%;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 40%;
    }
`
export interface IFAQItem {
    question: string
    answer: string
    isAnswerVisible: number
    setIsAnswerVisible: (arg: number) => void
    name: number
}

export const Faq = ({ imagesData }: { imagesData: imagesDataProp }) => {
    const { i18n } = useTranslation()
    const [showFaqListMobile, setShowFaqListMobile] = useState(false)
    const [isAnswerVisible, setIsAnswerVisible] = useState(-1)
    const data = useStaticQuery(graphql`
        query {
            allFaqYaml {
                edges {
                    node {
                        title
                        image
                        subTitle
                        buttonTextOpen
                        buttonTextClose
                        questions {
                            question
                            answer
                        }
                        parent {
                            ... on File {
                                name
                            }
                        }
                    }
                }
            }
        }
    `)

    const {
        image,
        buttonTextOpen,
        buttonTextClose,
        subTitle,
        title,
        questions,
    } = getDataByLanguage(data.allFaqYaml, i18n.language)

    const imageLamp = getImageByImageName(imagesData.allImageSharp, image)

    const faqData = questions.map((item: IFAQItem) => {
        return {
            '@type': 'Question',
            name: `${item.question}`,
            acceptedAnswer: {
                '@type': 'Answer',
                text: `${item.answer}`,
            },
        }
    })
    return (
        <FaqWrapper>
            <Helmet>
                <script type="application/ld+json">
                    {`{
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": ${JSON.stringify(faqData)}
                    }`}
                </script>
            </Helmet>
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <Title>{title}</Title>
                    <SubTitle>{subTitle}</SubTitle>
                    <ButtonFaq
                        onClick={() => {
                            !showFaqListMobile &&
                                window.document.getElementById('faq') &&
                                window!
                                    .document!.getElementById('faq')!
                                    .scrollIntoView(true)
                            setShowFaqListMobile(!showFaqListMobile)
                            sendEvent('Click', {
                                eventCategory: 'ShowMoreButtonFAQ',
                            })
                        }}
                    >
                        {!showFaqListMobile ? buttonTextOpen : buttonTextClose}
                    </ButtonFaq>
                    <Image fluid={imageLamp.fluid} />
                    <CnairImg />
                </HeroColumn>

                <FaqListStyled showFaqListMobile={showFaqListMobile} id="faq">
                    {questions.map((item: IFAQItem, index: number) => {
                        return (
                            <FAQItem
                                key={index}
                                question={item.question}
                                answer={item.answer}
                                isAnswerVisible={isAnswerVisible}
                                setIsAnswerVisible={setIsAnswerVisible}
                                name={index}
                            />
                        )
                    })}
                </FaqListStyled>
            </Container>
        </FaqWrapper>
    )
}
