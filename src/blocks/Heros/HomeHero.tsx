import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { JumpingArrow } from 'components/JumpingArrow'
import Img, { FluidObject } from 'gatsby-image'

import { colors, backgroundColors } from 'styles/colors'
import { Container } from 'components/Container'
import i18n from 'i18n/config'
import { displayWidth } from 'styles/width'
import { headerHeight } from 'styles/height'
import { headerBg } from 'styles/headerBg'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { getImageByImageName } from 'utils/getImageByImageName'
import { indent } from 'styles/indent'
import { Logo } from 'components/Logo'

const HomeHeroWraper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 100vw;
    height: calc(100vh - ${headerHeight.mobile} - 50px);
    min-height: 503px;
    background-color: ${backgroundColors.index};
    align-items: stretch;
    border-bottom: 1px solid ${colors.dark};
    :before {
        ${headerBg}
    }
    @media (min-width: ${displayWidth.tablet}) {
        height: 600px;
    }
    @media (orientation: landscape) {
        height: auto;
    }
`
const ContainerStyled = styled(Container)`
    padding: 0 ${indent.mobile};
    @media (min-width: ${displayWidth.tablet}) {
        padding: 0;
        position: relative;
        :after {
            position: absolute;
            background-color: inherit;
            top: 0;
            bottom: 0;
            left: 33.3333%;
            right: 33.3333%;
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
        align-items: flex-start;
    }
`
const HomeHeroColumnImage = styled(HomeHeroColumn)`
    justify-content: flex-end;
`
const Title = styled.h1`
    font-size: 16px;
    line-height: 22px;
    word-spacing: 8px;
    margin-top: 15px;
    margin-bottom: 10px;
    letter-spacing: 6.888889px;
    text-align: center;
    color: ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 18px;
        line-height: 24px;
        word-spacing: 10px;
        margin-top: 15px;
        margin-bottom: 0;
        letter-spacing: 10.888889px;
        padding-left: calc((66% - 260px) / 2);
    }
`
// const SubTitle = styled.p`
//     font-size: 16px;
//     line-height: 26px;
//     text-align: center;
//     letter-spacing: 0.4px;
//     margin: 0 16px 24px;
//     @media (min-width: ${displayWidth.tablet}) {
//         align-self: flex-start;
//         z-index: 3;
//         max-width: 66%;
//         text-align: left;
//         box-sizing: border-box;
//         max-width: calc((100vw - 160px) * 0.25);
//     }
//     @media (min-width: ${displayWidth.desktop}) {
//         padding: 20px 48px;
//         max-width: 350px;
//     }
// `
const MobileImage = styled(Img)<{ fluid: FluidObject }>`
    width: 90%;
    height: 100%;
    bottom: -5%;
    z-index: 2;
    max-height: 400px;
    @media (min-width: 400px) {
        width: 70%;
        height: 90%;
        bottom: -4%;
    }
    @media (min-width: 840px) {
        max-height: 600px;
        width: 75%;
        height: 75%;
        bottom: -4%;
    }
    @media (min-width: ${displayWidth.tablet}) {
        width: 85%;
        height: 95%;
        bottom: -4%;
    }
    @media (min-width: ${displayWidth.desktop}) {
        display: none;
    }
`
const DesktopImage = styled(Img)<{ fluid: FluidObject }>`
    display: none;
    @media (min-width: ${displayWidth.desktop}) {
        display: block;
        width: 110%;
        height: 95.6%;
        max-height: 90%;
        bottom: -3.8%;
        left: -70px;
        z-index: 2;
        align-self: flex-end;
    }
`
const JumpingArrowWrapper = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        align-self: flex-start;
        justify-content: center;
        width: 66.6%;
        margin-top: 30px;
    }
`
const LogoS = styled(Logo)`
    width: auto;
    height: 20vh;
    min-height: 120px;
    fill: #5f7db5;
    padding: 5px;
    @media (min-width: ${displayWidth.tablet}) {
        width: 250px;
        height: 250px;
        margin-left: calc(((100vw - 160px) * 0.33 - 260px) / 2);
    }
    @media (min-width: ${displayWidth.desktop}) {
        margin-left: 75px;
    }
`
export const HomeHero = () => {
    const data = useStaticQuery(graphql`
        query {
            allImageSharp {
                edges {
                    node {
                        fluid(quality: 100) {
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
                    <LogoS />
                    {/* <SubTitle>{homeHeroData.subTitle}</SubTitle> */}
                    <JumpingArrowWrapper>
                        <JumpingArrow />
                    </JumpingArrowWrapper>
                </HomeHeroColumn>
                <HomeHeroColumnImage>
                    <MobileImage
                        fluid={homeHeroImageMobile.fluid}
                        imgStyle={{
                            objectFit: 'containe',
                        }}
                    />
                    <DesktopImage
                        fluid={homeHeroImageDesktop.fluid}
                        imgStyle={{
                            objectFit: 'containe',
                        }}
                    />
                </HomeHeroColumnImage>
            </ContainerStyled>
        </HomeHeroWraper>
    )
}
