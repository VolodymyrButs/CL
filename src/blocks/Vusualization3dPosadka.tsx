import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { TitleH1 } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { getImageByImageName } from 'utils/getImageByImageName'
import { SliderComponent } from 'components/SliderComponent'
import { JumpingArrow } from 'components/JumpingArrow'
import { indent } from 'styles/indent'
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
const TitleWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`
const TitleStyled = styled(TitleH1)`
    font-size: 32px;
    line-height: 45px;
    letter-spacing: 0.666667px;
    overflow: visible;
    text-align: center;
    color: #296963;
    margin: 0;
    @media (max-width: 355px) {
        font-size: 40px;
        line-height: 45px;
    }
`
const Price = styled.span`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 40px;
    line-height: 40px;
    letter-spacing: 0.888889px;
    color: ${colors.accentText};
    width: 100%;
    text-align: center;
`
export const Visualization3dPosadka = ({
    imagesData,
}: {
    imagesData: imagesDataProp
}) => {
    const { i18n, t } = useTranslation()
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
    const { subTitle } = visualization3DYaml
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
                    <TitleWrapper>
                        <TitleStyled>{t('visualization')}</TitleStyled>
                        <Price>
                            {t('from')} $5 {t('for')} m<sup>2</sup>
                        </Price>
                    </TitleWrapper>
                    <SubTitle>{subTitle}</SubTitle>
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
