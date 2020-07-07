import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { getImageByImageName } from 'utils/getImageByImageName'
import { SliderComponent } from 'components/SliderComponent'
import { LocalizedLink } from 'i18n/LocalizedLink'
import { Button } from 'components/Button'
import { JumpingArrow } from 'components/JumpingArrow'

const Visualization3dWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.vizualization};
    position: relative;
    border-bottom: 1px solid ${colors.dark};
    ${mobileAfterBorder}
`

const SubTitle = styled.h3`
    font-family: 'Open Sans', sans-serif;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 0.4px;
    color: ${colors.dark};
    margin: 20px;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 24px;
    }
`
const TitleStyled = styled(Title)`
    margin: 20px auto;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 0 24px;
    }
`
const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px;
    align-items: center;
    border-bottom: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
        padding: 32px 0;
        border-right: 1px solid ${colors.dark};
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: 60px 0 40px;
    }
`
const LeftSidebar = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        flex-grow: 1;
        min-width: 80px;
        background-color: ${backgroundColors.vizualization};
        box-sizing: border-box;
    }
`
const RightSidebar = styled(LeftSidebar)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        background-color: ${backgroundColors.vizualization};
        border-left: 1px solid ${colors.dark};
    }
`
const ImgStyled = styled(Img)`
    height: auto;
    max-height: 100%;
    @media (min-width: ${displayWidth.tablet}) {
        max-width: calc((100vw - 160px) * 0.6666);
        max-height: 450px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 793px;
        max-height: 711px;
    }
`
const LocalizedLinkStyled = styled(LocalizedLink)`
    text-decoration: none;
`
const ButtonStyled = styled(Button)`
    width: 264px;
    margin: 50px auto;
    z-index: 3;
    @media (max-width: 330px) {
        width: 250px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        width: 220px;
        margin: 10px auto 20px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 264px;
    }
`
const DesctopWrapper = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        align-items: center;
        background-color: ${colors.white};
        position: relative;
    }
`
const MobileWrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: ${colors.white};
    position: relative;
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`
const VisualizationBlock = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 50%;
    bottom: 0;
    height: 48px;
    background-color: ${colors.dark};
    color: ${colors.white};
    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.4px;
    border-right: 1px solid ${colors.white};
`
const RealizationBlock = styled(VisualizationBlock)`
    left: 50%;
    right: 0;
    border-right: none;
`

export const Visualization3d = () => {
    const { i18n } = useTranslation()
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
            allVisualization3DYaml {
                edges {
                    node {
                        title
                        subTitle
                        buttonText
                        visualization
                        realization
                        images {
                            image
                        }
                        mobileImages {
                            image
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
    const visualization3DYaml = getDataByLanguage(
        data.allVisualization3DYaml,
        i18n.language
    )
    const commonImages = data.allVisualization3DYaml.edges.find(
        (elem: { node: { parent: { name: string } } }) => {
            return elem.node.parent.name === 'visualization3d'
        }
    ).node
    const {
        title,
        subTitle,
        buttonText,
        visualization,
        realization,
    } = visualization3DYaml
    const sliderSettings = {
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    dots: true,
                },
            },
        ],
    }
    return (
        <Visualization3dWrapper>
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <TitleStyled>{title}</TitleStyled>
                    <SubTitle>{subTitle}</SubTitle>
                    <LocalizedLinkStyled to={'promo#design'}>
                        <ButtonStyled>{buttonText}</ButtonStyled>
                    </LocalizedLinkStyled>
                    <JumpingArrow />
                </HeroColumn>
                <DesctopWrapper>
                    <SliderComponent {...sliderSettings}>
                        {commonImages.images.map(
                            (item: { image: string }, index: number) => {
                                const ImageNode = getImageByImageName(
                                    data.allImageSharp,
                                    item.image
                                )

                                return (
                                    <ImgStyled
                                        key={index}
                                        fluid={ImageNode.fluid}
                                        imgStyle={{
                                            objectFit: 'containe',
                                        }}
                                    />
                                )
                            }
                        )}
                    </SliderComponent>
                    <VisualizationBlock>{visualization}</VisualizationBlock>
                    <RealizationBlock>{realization}</RealizationBlock>
                </DesctopWrapper>
                <MobileWrapper>
                    {' '}
                    <SliderComponent {...sliderSettings}>
                        {commonImages.mobileImages.map(
                            (item: { image: string }, index: number) => {
                                const ImageNode = getImageByImageName(
                                    data.allImageSharp,
                                    item.image
                                )

                                return (
                                    <ImgStyled
                                        key={index}
                                        fluid={ImageNode.fluid}
                                        imgStyle={{
                                            objectFit: 'containe',
                                        }}
                                    />
                                )
                            }
                        )}
                    </SliderComponent>
                </MobileWrapper>
            </Container>
            <RightSidebar />
        </Visualization3dWrapper>
    )
}
