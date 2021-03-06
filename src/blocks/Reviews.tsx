import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'

import { StarRating } from 'components/StarRating'
import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { SliderComponent } from 'components/SliderComponent'
import Google from 'assets/icons/google.svg'
import { createRand } from 'utils/getRandomArray'
import { indent } from 'styles/indent'
import { sendEvent } from 'tracking'
import { SlickNext, SlickPrevious } from 'components/SlickNavigation'

const ReviewsWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.contact};
    position: relative;
    border-bottom: 1px solid ${colors.dark};
    ${mobileAfterBorder}
`
const RankTextWrapper = styled.div`
    display: flex;
    justify-content: center;
    color: ${colors.dark};
    span {
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 33px;
        align-self: flex-end;
        @media (min-width: ${displayWidth.tablet}) {
            font-size: 20px;
            line-height: 24px;
        }
        @media (min-width: ${displayWidth.desktop}) {
            font-size: 24px;
            line-height: 33px;
        }
    }
`
const Rank = styled.p`
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 38px;
    margin-left: 5px;
    color: ${colors.accentText};
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 24px;
        line-height: 28px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 32px;
        line-height: 38px;
    }
`
const RankStarWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 14px auto;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 14px 0;
    }
`
const GoogleIcon = styled(Google)`
    margin-right: 18px;
`
const TextWrapper = styled.div`
    display: flex;
    overflow: hidden;
`
const Text = styled.div`
    width: 100%;
    overflow-y: auto;
    p {
        padding-top: 10px;
        text-align: center;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 26px;
        letter-spacing: 0.4px;
        @media (min-width: ${displayWidth.tablet}) {
            text-align: left;
        }
        strong {
            font-weight: 700;
        }
    }
`

const SubTitle = styled.a`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.4px;
    text-decoration: underline;
    text-underline-position: under;
    color: ${colors.dark};
    margin-bottom: 20px;
`
const BottomText = styled.div`
    font-style: normal;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.4px;
    color: ${colors.dark};
    text-align: center;
    font-weight: bold;
    margin: 25px auto;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 25px 0 0px;
        text-align: left;
    }
`
const TitleStyled = styled(Title)`
    @media (min-width: ${displayWidth.tablet}) {
        margin-left: 0;
    }
`
const SliderStyled = styled(SliderComponent)`
    background-color: ${backgroundColors.contact};
`
const Review = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid ${colors.dark};
    border-radius: 40px;
    height: 430px;
    @media (min-width: 500px) {
        height: 330px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        height: 330px;
        padding: 30px;
        align-items: flex-start;
        margin: 40px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: 10px 50px;
        height: 280px;
    }
    :focus {
        outline: none;
    }
`
const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        padding: 0 10px 56px ${indent.heroColumnTablet};
        align-items: flex-start;
        border-bottom: none;
        border-right: 1px solid ${colors.dark};
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: 0 10px 26px ${indent.heroColumnDesktop};
    }
`

const SlideWrapper = styled.div``

export const Reviews = ({ arrows }: { arrows?: boolean; bottom?: boolean }) => {
    const { i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allReviewsYaml {
                edges {
                    node {
                        title
                        ourRank
                        rating
                        quantity1
                        quantity2
                        link
                        reviewsQuantity
                        reviewsArr {
                            text
                            name
                            location
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
    const commonData = data.allReviewsYaml.edges.find(
        (elem: { node: { parent: { name: string } } }) => {
            return elem.node.parent.name === 'reviews'
        }
    ).node
    const { rating, reviewsQuantity, link, reviewsArr } = commonData
    const reviewsYaml = getDataByLanguage(data.allReviewsYaml, i18n.language)
    const { title, ourRank, quantity1, quantity2 } = reviewsYaml
    const arr = arrows ? true : false
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 100,
        arrows: arr,
        nextArrow: <SlickNext bottom />,
        prevArrow: <SlickPrevious bottom />,
    }

    const RandomList = createRand(5, 0, reviewsArr.length - 1)
    return (
        <ReviewsWrapper>
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <TitleStyled> {title}</TitleStyled>
                    <RankTextWrapper>
                        <span>{ourRank}: </span>
                        <Rank>{rating}</Rank>
                        <span>/5</span>
                    </RankTextWrapper>
                    <RankStarWrapper>
                        <GoogleIcon />
                        <StarRating rating={rating} quantity={5} />
                    </RankStarWrapper>
                    <SubTitle
                        href={link}
                        target="blank"
                        onClick={() => {
                            sendEvent('Click', {
                                eventCategory: 'GoogleRewiews',
                            })
                        }}
                    >
                        {quantity1}&nbsp;
                        {reviewsQuantity}&nbsp;
                        {quantity2}
                    </SubTitle>
                </HeroColumn>
                <SliderStyled
                    {...sliderSettings}
                    background={backgroundColors.contact}
                >
                    {RandomList.map((i) => {
                        return (
                            <SlideWrapper
                                key={i}
                                onClick={() => {
                                    sendEvent('Click', {
                                        eventCategory: 'ReviewItem',
                                        author: reviewsArr[i].name,
                                    })
                                }}
                            >
                                <Review>
                                    <p />
                                    <TextWrapper>
                                        <Text
                                            dangerouslySetInnerHTML={{
                                                __html: reviewsArr[i].text,
                                            }}
                                        />
                                    </TextWrapper>
                                    <BottomText>
                                        {reviewsArr[i].name},&nbsp;
                                        {reviewsArr[i].location}
                                    </BottomText>
                                </Review>
                            </SlideWrapper>
                        )
                    })}
                </SliderStyled>
            </Container>
        </ReviewsWrapper>
    )
}
