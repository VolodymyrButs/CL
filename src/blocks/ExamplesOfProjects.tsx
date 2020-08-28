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
import { indent } from 'styles/indent'

const Advantages3DWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.promotion};
    position: relative;
    border-bottom: 1px solid ${colors.dark};
    ${mobileAfterBorder}
`
const PriceWrapper = styled.span`
    display: inline-block;
    width: 89px;
    position: relative;
`
const Price = styled.p`
    position: absolute;
    bottom: -36px;
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 64px;
    line-height: 74px;
    letter-spacing: 0.888889px;
    color: ${colors.accentText};
    margin: 0 10px;
    @media (min-width: ${displayWidth.tablet}) {
        position: absolute;
        font-size: 36px;
        line-height: 42px;
        bottom: -8px;
        letter-spacing: 1.77882px;
    }
`
const Text = styled.div`
    margin-top: 15px;
    p {
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
const Line = styled.div`
    border-bottom: 1px solid ${colors.dark};
    margin: 32px 0;
`
const SubTitle = styled.h3`
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 0.4px;
    color: ${colors.dark};
    margin-bottom: 32px;
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
    }
`
const TitleStyled = styled(Title)`
    @media (min-width: ${displayWidth.tablet}) {
        margin-left: 0;
    }
`
const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 ${indent.heroColumnDesktop} 24px;
    justify-content: space-between;
    border-bottom: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
        border-right: 1px solid ${colors.dark};
    }
`
const LeftSidebar = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        flex-grow: 1;
        min-width: 80px;
        background-color: ${backgroundColors.promotion};
        box-sizing: border-box;
        margin-left: 1px;
    }
`
const RightSidebar = styled(LeftSidebar)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        background-color: ${colors.white};
    }
`
const ImgStyled = styled(Img)`
    height: 60vw;
    max-height: 100%;
    @media (min-width: ${displayWidth.tablet}) {
        max-width: calc((100vw - 160px) * 0.666666);
        max-height: calc((100vw - 160px) * 0.5);
        height: 100%;
    }
    @media (min-width: ${displayWidth.desktop}) {
        max-height: 595px;
    }
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: ${colors.white};
`
export const ExamplesOfProjects = () => {
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
            allExamplesOfProjectsYaml {
                edges {
                    node {
                        title
                        price
                        project
                        location
                        description
                        images {
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

    const examplesOfProjectsYaml = getDataByLanguage(
        data.allExamplesOfProjectsYaml,
        i18n.language
    )

    const commonImages = data.allExamplesOfProjectsYaml.edges.find(
        (elem: { node: { parent: { name: string } } }) => {
            return elem.node.parent.name === 'examplesOfProjects'
        }
    ).node

    const {
        price,
        description,
        location,
        project,
        title,
    } = examplesOfProjectsYaml
    const sliderSettings = {
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 5000,
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
        <Advantages3DWrapper>
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <TitleStyled>
                        {title}
                        <PriceWrapper>
                            <Price>{price}</Price>
                        </PriceWrapper>
                    </TitleStyled>
                    <Text
                        dangerouslySetInnerHTML={{
                            __html: project,
                        }}
                    />

                    <Text
                        dangerouslySetInnerHTML={{
                            __html: location,
                        }}
                    />
                    <Line />
                    <SubTitle> {description}</SubTitle>
                </HeroColumn>
                <Wrapper>
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
                </Wrapper>
            </Container>
            <RightSidebar />
        </Advantages3DWrapper>
    )
}
