import React, { useState } from 'react'
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
import { SliderComponent } from 'components/SliderComponent'
import { indent } from 'styles/indent'
import FullScreen from 'assets/icons/fullScreen.svg'
import { ModalCarousel } from 'components/ModalCarousel'
import { ProjectData } from 'layout/Project'
import { sendEvent } from 'tracking'

const ExampleOfProjectWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.promotion};
    position: relative;
    border-bottom: 1px solid ${colors.dark};
    ${mobileAfterBorder}
`

const Price = styled.span`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 64px;
    line-height: 74px;
    letter-spacing: 0.888889px;
    color: ${colors.accentText};
    margin-left: 6px;
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 36px;
        line-height: 42px;
        letter-spacing: 1.77882px;
    }
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
        margin-right: 0;
    }
`
const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 ${indent.heroColumnTablet} 24px;
    border-bottom: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
        border-right: 1px solid ${colors.dark};
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: 0 ${indent.heroColumnDesktop} 24px;
    }
`
const LeftSidebar = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        flex-grow: 1;
        min-width: 79px;
        background-color: ${backgroundColors.promotion};
        box-sizing: border-box;
        margin-left: 1px;
    }
`
const RightSidebar = styled(LeftSidebar)`
    @media (min-width: ${displayWidth.tablet}) {
        background-color: ${colors.white};
    }
`
const ImgStyled = styled(Img)<{ fluid: FluidObject }>`
    width: 100%;
    height: 100%;
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: ${colors.white};
    position: relative;
`
const WrapperMobile = styled(Wrapper)`
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`
const WrapperDesktop = styled(Wrapper)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
    }
`
const FullScreenButton = styled(FullScreen)`
    fill: ${colors.white};
    stroke: ${colors.dark};
    stroke-width: 1px;
    position: absolute;
    top: 10px;
    right: 26px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    z-index: 3;
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
    }
    @media (min-width: ${displayWidth.desktop}) {
        right: 10px;
    }
`
export const ExamplesOfProjects = () => {
    const { i18n } = useTranslation()
    const [isModalOpen, setModalIsOpen] = useState(false)
    const data = useStaticQuery(graphql`
        query {
            desktop: allFile(
                filter: { relativeDirectory: { eq: "projectExampleDesktop" } }
                sort: { fields: absolutePath }
            ) {
                edges {
                    node {
                        id
                        childImageSharp {
                            fluid(srcSetBreakpoints: [400]) {
                                ...GatsbyImageSharpFluid
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
            mobile: allFile(
                filter: { relativeDirectory: { eq: "projectExamplesMobile" } }
                sort: { fields: absolutePath }
            ) {
                edges {
                    node {
                        id
                        childImageSharp {
                            fluid(srcSetBreakpoints: [400]) {
                                ...GatsbyImageSharpFluid
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
            allExamplesOfProjectsYaml {
                edges {
                    node {
                        title
                        price
                        description
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

    const { price, description, title } = examplesOfProjectsYaml
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
        <ExampleOfProjectWrapper>
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <TitleStyled>
                        {title}
                        <Price>{price}</Price>
                    </TitleStyled>
                    <SubTitle> {description}</SubTitle>
                </HeroColumn>
                <WrapperDesktop>
                    <FullScreenButton
                        onClick={() => {
                            setModalIsOpen(true)
                            sendEvent('FullScreen', {
                                eventCategory: 'Slider',
                                placement: 'ExampleOfProject',
                            })
                        }}
                    />
                    <SliderComponent
                        {...sliderSettings}
                        afterChange={(current: number) => {
                            sendEvent('ShowSlide', {
                                eventCategory: 'Slider',
                                currentSlide: `${current}`,
                                placement: 'ExampleOfProject',
                            })
                        }}
                    >
                        {data.desktop.edges.map(
                            (
                                item: {
                                    node: {
                                        childImageSharp: {
                                            fluid: FluidObject
                                            parent: { name: string }
                                        }
                                    }
                                },
                                index: number
                            ) => {
                                return (
                                    <ImgStyled
                                        key={index}
                                        fluid={item.node.childImageSharp.fluid}
                                        imgStyle={{
                                            objectFit: 'containe',
                                        }}
                                        alt={
                                            item.node.childImageSharp.parent
                                                .name
                                        }
                                        title={
                                            item.node.childImageSharp.parent
                                                .name
                                        }
                                    />
                                )
                            }
                        )}
                    </SliderComponent>
                </WrapperDesktop>
                <WrapperMobile>
                    <SliderComponent
                        {...sliderSettings}
                        afterChange={(current: number) => {
                            sendEvent('ShowSlide', {
                                eventCategory: 'Slider',
                                currentSlide: `${current + 1}`,
                                placement: 'ExampleOfProject',
                            })
                        }}
                    >
                        {data.mobile.edges.map(
                            (
                                item: {
                                    node: {
                                        childImageSharp: {
                                            fluid: FluidObject
                                            parent: { name: string }
                                        }
                                    }
                                },
                                index: number
                            ) => {
                                return (
                                    <ImgStyled
                                        key={index}
                                        fluid={item.node.childImageSharp.fluid}
                                        imgStyle={{
                                            objectFit: 'containe',
                                        }}
                                        alt={
                                            item.node.childImageSharp.parent
                                                .name
                                        }
                                        title={
                                            item.node.childImageSharp.parent
                                                .name
                                        }
                                    />
                                )
                            }
                        )}
                    </SliderComponent>
                </WrapperMobile>
            </Container>
            <RightSidebar />
            <ModalCarousel
                data={data.desktop.edges.map(
                    ({ node }: { node: ProjectData }) => node
                )}
                isModalOpen={isModalOpen}
                closeHandler={() => setModalIsOpen(false)}
                initialSlideIndex={1}
            />
        </ExampleOfProjectWrapper>
    )
}
