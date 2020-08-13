import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import { useTranslation } from 'react-i18next'
import { Connection } from 'blocks/Connection'
import { ButtonWithModal } from 'components/ButtonWithModal'
import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { headerBg } from 'styles/headerBg'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { displayWidth } from 'styles/width'
import Slider from 'react-slick'
import { WorksProjectItem } from 'blocks/Works/WorksProjectItem'

const ProjectWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.project};
    position: relative;
    border-bottom: 1px solid ${colors.dark};
    
    :before {
        ${headerBg}
    }
    ${mobileAfterBorder}
     @media (min-width: ${displayWidth.tablet}) {
    } 
`
const Title = styled.h2`
    font-family: 'Yeseva One', cursive;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    letter-spacing: 1.68px;
    color: ${colors.darkText};
    margin: 35px 16px 8px;
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 34px;
        line-height: 39px;
        letter-spacing: 1.68px;
        margin: 0;
    }
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 52px;
        line-height: 60px;
        letter-spacing: 2.68px;
    }
`
const SubTitle = styled.div`
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 0.4px;
    color: ${colors.dark};
    margin: 16px;
    p {
        margin: 10px 0;
    }
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
        margin: 0;
        margin-bottom: 32px;
    }
`
const CarouselWrapper = styled.div`
    width: 100vw;
    box-sizing: border-box;
    margin: 0 auto;
    height: auto;
    max-height: 500px;
    padding: 0 16px;
    @media (min-width: ${displayWidth.tablet}) {
        max-width: calc((100vw - 160px) * 0.6666);
        padding: 0;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: calc((${displayWidth.desktop} - 160px) * 0.6666);
        max-height: 400px;
    }
    .slick-track div {
        transform: translate(50% 50%);
    }
    .slick-list {
        margin: 0;
        @media (min-width: ${displayWidth.tablet}) {
            margin: 0 -30px;
        }
    }
    .slick-slide > div {
        margin: 0;
        @media (min-width: ${displayWidth.tablet}) {
            margin: 0 30px;
        }
    }
`
const HeroColumn = styled.div`
    padding: 0px 16px 33px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: ${displayWidth.tablet}) {
        padding: 60px 30px 60px 48px;
        align-items: flex-start;
    }
`
const CarouselWrapperMini = styled(CarouselWrapper)`
    max-height: 85px;
`
const Image = styled(Img)`
    width: 100%;
    height: 100%;
    background-color: ${colors.dark};
`
const HeadText = styled.p`
    padding: 10px 32px;
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 14px;
    letter-spacing: 2px;
    span {
        opacity: 0.5;
    }
`
const ProjectColumn = styled.div`
    max-height: 500px;
`
const ProjectLayout = ({
    data,
}: {
    data: {
        allFile: {
            edges: {
                node: {
                    relativeDirectory: string
                    childImageSharp: { fluid: FluidObject }
                }
            }[]
        }
        allProjectsYaml: {
            edges: {
                node: {
                    [x: string]: {
                        name: string
                        description: string
                    }
                }
            }[]
        }
        lastProject: {
            edges: {
                node: {
                    [x: string]: {
                        name: string
                        description: string
                        portrait: string
                        landscape: string
                    }
                }
            }[]
        }
    }
}) => {
    const { t, i18n } = useTranslation()
    const sliderSettings = {
        infinite: true,
        arrows: false,
        asNavFor: '.slider-nav',
    }
    const sliderSettingsBottom = {
        infinite: true,
        arrows: false,
        slidesToShow: 2,
        asNavFor: '.slider-for',
    }
    const [nav1, setNav1] = useState()
    const [nav2, setNav2] = useState()
    const slider1 = useRef(null)
    const slider2 = useRef(null)

    useEffect(() => {
        setNav1(slider1.current)
        setNav2(slider2.current)
    }, [slider1, slider2])

    const project = data.allProjectsYaml.edges[0].node
    const firstWork = data.lastProject.edges[0].node
    const secondWork = data.lastProject.edges[1].node
    return (
        <>
            <HeadText>
                <span>{t('works')}</span> / {project[i18n.language].name}
            </HeadText>
            <ProjectWrapper>
                <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                    <HeroColumn>
                        <Title>{project[i18n.language].name}</Title>
                        <SubTitle
                            dangerouslySetInnerHTML={{
                                __html: project[i18n.language].description,
                            }}
                        />
                    </HeroColumn>
                    <div>
                        <CarouselWrapper>
                            <Slider
                                {...sliderSettings}
                                asNavFor={nav2}
                                ref={slider1}
                            >
                                {data.allFile.edges.map(
                                    (
                                        foto: {
                                            node: {
                                                relativeDirectory: string
                                                childImageSharp: {
                                                    fluid: FluidObject
                                                }
                                            }
                                        },
                                        index: number
                                    ) => (
                                        <div key={index}>
                                            <Image
                                                fluid={
                                                    foto.node.childImageSharp
                                                        .fluid
                                                }
                                                imgStyle={{
                                                    objectFit: 'containe',
                                                    objectPosition: '50% 50%',
                                                }}
                                            />
                                        </div>
                                    )
                                )}
                            </Slider>
                        </CarouselWrapper>
                        <CarouselWrapperMini>
                            <Slider
                                {...sliderSettingsBottom}
                                asNavFor={nav1}
                                ref={slider2}
                                slidesToShow={2}
                                swipeToSlide={true}
                                focusOnSelect={true}
                            >
                                {data.allFile.edges.map(
                                    (
                                        foto: {
                                            node: {
                                                relativeDirectory: string
                                                childImageSharp: {
                                                    fluid: FluidObject
                                                }
                                            }
                                        },
                                        index: number
                                    ) => (
                                        <div key={index}>
                                            <Image
                                                fluid={
                                                    foto.node.childImageSharp
                                                        .fluid
                                                }
                                                imgStyle={{
                                                    objectFit: 'containe',
                                                    objectPosition: '50% 50%',
                                                }}
                                            />
                                        </div>
                                    )
                                )}
                            </Slider>
                        </CarouselWrapperMini>
                    </div>
                </Container>
            </ProjectWrapper>
            <Connection text={t('connection.text')}>
                <ButtonWithModal
                    modalTitle={t('connection.modalTitle')}
                    secondModalTitle={t('connection.secondModalTitle')}
                    modalDescription={t('connection.modalDescription')}
                    secondModalDescription={t(
                        'connection.secondModalDescription'
                    )}
                    buttonLabel={t('connection.buttonLabel')}
                    placeholder={t('connection.placeholder')}
                    submitLabel={t('connection.submitLabel')}
                />
            </Connection>
            <ProjectWrapper>
                <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                    <ProjectColumn>
                        <WorksProjectItem
                            image={firstWork.previewImage.landscape}
                            description={firstWork[i18n.language].name}
                            link={firstWork.parent.name}
                        />
                    </ProjectColumn>
                    <ProjectColumn>
                        <WorksProjectItem
                            image={secondWork.previewImage.portrait}
                            description={secondWork[i18n.language].name}
                            link={secondWork.parent.name}
                        />
                    </ProjectColumn>
                </Container>
            </ProjectWrapper>
        </>
    )
}

export default ProjectLayout

export const query = graphql`
    query($imageFolder: String!, $id: String!) {
        allFile(filter: { relativeDirectory: { eq: $imageFolder } }) {
            edges {
                node {
                    relativeDirectory
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        allProjectsYaml(
            sort: { fields: date, order: DESC }
            filter: { parent: { id: { eq: $id } } }
        ) {
            edges {
                node {
                    date
                    en {
                        description
                        name
                    }
                    previewImage {
                        portrait
                    }
                    ru {
                        description
                        name
                    }
                    ua {
                        description
                        name
                    }
                    parent {
                        ... on File {
                            name
                        }
                    }
                }
            }
        }
        lastProject: allProjectsYaml(
            sort: { fields: date, order: DESC }
            filter: { parent: { id: { ne: $id } } }
        ) {
            edges {
                node {
                    date
                    en {
                        description
                        name
                    }
                    previewImage {
                        portrait
                        landscape
                    }
                    ru {
                        description
                        name
                    }
                    ua {
                        description
                        name
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
`
