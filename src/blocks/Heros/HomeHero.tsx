import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { JumpingArrow } from 'components/JumpingArrow'
import Img from 'gatsby-image'

import { colors, backgroundColors } from 'styles/colors'
import { Container } from 'components/Container'
import i18n from 'i18n/config'
import { displayWidth } from 'styles/width'
import { headerHeight } from 'styles/height'
import { headerBg } from 'styles/headerBg'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { getImageByImageName } from 'utils/getImageByImageName'

const HomeHeroWraper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: calc(100vh - ${headerHeight.mobile});
    min-height: 503px;
    border-top: 1px solid ${colors.dark};
    border-bottom: 1px solid ${colors.dark};
    background-color: ${backgroundColors.index};
    align-items: stretch;

    :before {
        ${headerBg}
    }
    @media (min-width: ${displayWidth.tablet}) {
        height: 600px;
    }
`
const ContainerStyled = styled(Container)`
    padding: 0 15px;
    @media (min-width: ${displayWidth.tablet}) {
        padding: 0;
        position: relative;
        :after {
            position: absolute;
            background-color: inherit;
            top: 0;
            bottom: 0;
            left: 33.3%;
            right: 33.3%;
            outline: 1px solid ${colors.dark};
            content: '';
        }
    }
`
const HomeHeroColumn = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-grow: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-left: 1px solid ${colors.dark};
    border-right: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        border-left: none;
        border-right: none;
        justify-content: space-evenly;
    }
    @media (min-width: ${displayWidth.tablet}) {
        justify-content: center;
    }
`
const Title = styled.h1`
    font-family: 'Yeseva One', cursive;
    font-size: 48px;
    line-height: 52px;
    letter-spacing: 0.666667px;
    margin: 0px auto 24px;
    text-align: center;
    color: ${colors.dark};
    @media (max-width: 355px) {
        font-size: 30px;
        line-height: 35px;
        letter-spacing: 1px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        letter-spacing: 0.888889px;
        overflow: visible;
        word-spacing: 500px;
        text-align: left;
        z-index: 3;
        padding-left: 18px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding-left: 48px;
        font-size: 64px;
        line-height: 74px;
    }
`

const SubTitle = styled.p`
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 0.4px;
    margin: 0 16px 24px;
    @media (min-width: ${displayWidth.tablet}) {
        align-self: flex-start;
        z-index: 3;
        max-width: 66%;
        text-align: left;
        box-sizing: border-box;
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: 0 48px;
    }
`
const MobileImage = styled(Img)`
    width: 100%;
    height: 90%;
    max-width: 55%;
    z-index: 2;
    @media (min-width: 360px) {
        max-width: 75%;
    }
    @media (orientation: landscape) {
        max-height: 286px;
        max-width: 50vw;
    }
    @media (orientation: landscape) and (min-width: 670px) {
        max-height: 338px;
        max-width: 45vw;
    }
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`
const DesktopImage = styled(Img)`
    display: none;
    width: 200%;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        height: 90%;
        margin: 70px 50px 0 0;
        max-width: 120%;
        max-height: 525px;
        z-index: 2;
    }
`
const JumpingArrowWrapper = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        align-self: flex-start;
        justify-content: center;
        width: 66.6%;
    }
`
export const HomeHero = () => {
    const data = useStaticQuery(graphql`
        query {
            allImageSharp {
                edges {
                    node {
                        fluid {
                            originalName
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            allHomeHeroYaml {
                edges {
                    node {
                        title
                        subTitle
                        mobileImage
                        desktopImage
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
    const homeHeroData = getDataByLanguage(data.allHomeHeroYaml, i18n.language)
    const homeHeroImageMobile = getImageByImageName(
        data.allImageSharp,
        homeHeroData.mobileImage
    )
    const homeHeroImageDesktop = getImageByImageName(
        data.allImageSharp,
        homeHeroData.desktopImage
    )

    return (
        <HomeHeroWraper>
            <ContainerStyled columns={'1fr'} tabletColumns={'1fr 1fr'}>
                <HomeHeroColumn>
                    <Title>{homeHeroData.title}</Title>
                    <SubTitle>{homeHeroData.subTitle}</SubTitle>
                    <JumpingArrowWrapper>
                        <JumpingArrow />
                    </JumpingArrowWrapper>
                </HomeHeroColumn>
                <HomeHeroColumn>
                    <MobileImage
                        fluid={homeHeroImageMobile.fluid}
                        style={{
                            overflow: 'visible',
                        }}
                        imgStyle={{
                            objectFit: 'containe',
                            height: '105%',
                            top: '5%',
                        }}
                    />
                    <DesktopImage
                        fluid={homeHeroImageDesktop.fluid}
                        style={{
                            overflow: 'visible',
                        }}
                        imgStyle={{
                            objectFit: 'containe',
                            height: '104%',
                            top: '5px',
                            left: '-50px',
                        }}
                    />
                </HomeHeroColumn>
            </ContainerStyled>
        </HomeHeroWraper>
    )
}
