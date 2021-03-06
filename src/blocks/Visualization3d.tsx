import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { getImageByImageName } from 'utils/getImageByImageName'
import { SliderComponent } from 'components/SliderComponent'
import { LocalizedLinkAnchor } from 'i18n/LocalizedLink'
import { Button } from 'components/Button'
import { JumpingArrow } from 'components/JumpingArrow'
import { indent } from 'styles/indent'
import { sendEvent } from 'tracking'
import { imagesDataProp } from 'pages/promo'

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
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 0.4px;
    color: ${colors.dark};
    margin: 20px;
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
        margin: 0 ${indent.heroColumnTablet};
    }
    @media (min-width: ${displayWidth.desktop}) {
        margin: 0 ${indent.heroColumnDesktop};
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
        padding: 0 0 32px;
        border-right: 1px solid ${colors.dark};
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: 20px 0;
    }
`

const ImgStyled = styled(Img)<{ fluid: FluidObject }>`
    width: calc(100vw - 64px);
    height: 100%;
    @media (min-width: ${displayWidth.tablet}) {
        width: calc((100vw - 160px) * 0.6666);
        height: calc(((100vw - 160px) * 0.6666) / 1.22);
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 793px;
        height: auto;
    }
`
const LocalizedLinkStyled = styled(LocalizedLinkAnchor)`
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
    }
`
const MobileWrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: ${colors.white};
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`

export const Visualization3d = ({
    imagesData,
    notButton,
}: {
    imagesData: imagesDataProp
    notButton?: boolean
}) => {
    const { i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allVisualization3DYaml {
                edges {
                    node {
                        title
                        subTitle
                        buttonText
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
    const { title, subTitle, buttonText } = visualization3DYaml
    const sliderSettings = {
        infinite: true,
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
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <Title>{title}</Title>
                    <SubTitle>{subTitle}</SubTitle>
                    {!notButton && (
                        <LocalizedLinkStyled
                            to={'/promo/#visualization3dAdvantages'}
                            onClick={() => {
                                sendEvent('Click', {
                                    eventCategory: 'ShowMoreButton',
                                    placement: 'Vizualization3d',
                                    target: 'AdvantagesVizualization',
                                })
                            }}
                        >
                            <ButtonStyled>{buttonText}</ButtonStyled>
                        </LocalizedLinkStyled>
                    )}
                    <JumpingArrow />
                </HeroColumn>
                <DesctopWrapper>
                    <SliderComponent {...sliderSettings}>
                        {commonImages.images.map(
                            (item: { image: string }, index: number) => {
                                const ImageNode = getImageByImageName(
                                    imagesData.allImageSharp,
                                    item.image
                                )

                                return (
                                    <ImgStyled
                                        key={index}
                                        fluid={ImageNode.fluid}
                                        imgStyle={{
                                            objectFit: 'cover',
                                        }}
                                        alt={ImageNode.parent.name}
                                        title={ImageNode.parent.name}
                                    />
                                )
                            }
                        )}
                    </SliderComponent>
                </DesctopWrapper>
                <MobileWrapper>
                    <SliderComponent {...sliderSettings}>
                        {commonImages.mobileImages.map(
                            (item: { image: string }, index: number) => {
                                const ImageNode = getImageByImageName(
                                    imagesData.allImageSharp,
                                    item.image
                                )

                                return (
                                    <ImgStyled
                                        key={index}
                                        fluid={ImageNode.fluid}
                                        imgStyle={{
                                            objectFit: 'cover',
                                        }}
                                    />
                                )
                            }
                        )}
                    </SliderComponent>
                </MobileWrapper>
            </Container>
        </Visualization3dWrapper>
    )
}
