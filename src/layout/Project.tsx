import React, { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'

import { Connection } from 'blocks/Connection'
import { ButtonWithModal } from 'components/ButtonWithModal'
import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { headerBg } from 'styles/headerBg'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { displayWidth } from 'styles/width'
import { LastProjects } from '../components/LastProjects'
import FullScreen from 'assets/icons/fullScreen.svg'
import { ModalCarousel } from 'components/ModalCarousel'
import { SlickNext, SlickPrevious } from 'components/SlickNavigation'

const ProjectWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.project};
    position: relative;
    border-top: 1px solid ${colors.dark};
    :before {
        ${headerBg}
    }
    ${mobileAfterBorder}
`
const HeroColumn = styled.div`
    padding: 0px 16px 33px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    @media (min-width: ${displayWidth.tablet}) {
        padding: 40px 20px 60px 48px;
        align-items: flex-start;
    }
`
const Title = styled.h2`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 22px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 1.68px;
    color: ${colors.darkText};
    margin: 35px 16px 8px;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 35px 0px 20px;
        text-align: left;
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
const height = css`
    @media (min-width: ${displayWidth.tablet}) {
        height: calc((100vw - 160px) * 0.6666);
    }
    @media (min-width: ${displayWidth.desktop}) {
        height: calc((${displayWidth.desktop} - 160px) * 0.5);
    }
`
const CarouselWrapper = styled.div`
    position: relative;
    width: calc(100vw - 32px);
    height: 150vw;
    padding: 0 16px;
    outline: 1px solid ${colors.dark};
    ${height}
    @media (min-width: ${displayWidth.tablet}) {
        width: calc((100vw - 160px) * 0.6666);
        padding: 0;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: calc((${displayWidth.desktop} - 160px) * 0.6666);
    }
    .slick-list {
        margin: 0;
        @media (min-width: ${displayWidth.tablet}) {
            margin: 0 0px;
        }
    }
    .slick-slider {
        overflow: hidden;
        height: 150vw;
        ${height}
    }
    img {
        cursor: grab;
        height: 100%;
    }
`

const CarouselWrapperMini = styled(CarouselWrapper)`
    max-height: 35vw;
    @media (min-width: ${displayWidth.tablet}) {
        width: calc((100vw - 160px) * 0.6666);
        height: calc((100vw - 160px) * 0.6666 * 0.35);
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: calc((${displayWidth.desktop} - 160px) * 0.6666);
        height: calc((${displayWidth.desktop} - 160px) * 0.6666 / 4);
    }
    .slick-list {
        width: 150%;
        margin-left: -50%;
        @media (min-width: ${displayWidth.tablet}) {
            width: 133.3%;
            margin-left: -33.3%;
        }
    }
`

const ImageBig = styled(Img)`
    width: 100%;
    height: 100%;
    ${height}
`
const ImageSmall = styled(Img)`
    height: 35vw;
    overflow: hidden;
    @media (min-width: ${displayWidth.tablet}) {
        height: calc((${displayWidth.desktop} - 160px) * 0.6666 / 3);
    }
`

const Breadcrumbs = styled.p`
    padding: 10px 32px;
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 14px;
    letter-spacing: 2px;
    span {
        opacity: 0.7;
    }
    margin: 0 auto;
    @media (min-width: ${displayWidth.tablet}) {
        max-width: calc((100vw - 200px));
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: calc((${displayWidth.desktop} - 256px));
    }
`

const PhotoWrapper = styled.div`
    ${height}
`
const Counter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 35px;
    z-index: 5;
    width: 111px;
    height: 65px;
    position: absolute;
    bottom: 0px;
    right: 16px;
    background-color: ${colors.white};
    span {
        opacity: 0.6;
        font-size: 22px;
        line-height: 30px;
        margin-left: 10px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        right: 0px;
    }
`
const FullScreenButton = styled(FullScreen)`
    fill: ${colors.white};
    stroke: ${colors.dark};
    stroke-width: 1px;
    position: absolute;
    top: 10px;
    right: 26px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 3;
    @media (min-width: ${displayWidth.desktop}) {
        right: 10px;
    }
`
const sliderSettings = {
    infinite: true,
    nextArrow: <SlickNext />,
    prevArrow: <SlickPrevious />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                arrows: false,
            },
        },
    ],
}
const sliderSettingsBottom = {
    infinite: true,
    arrows: false,
    slidesToShow: 4,
    focusOnSelect: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
            },
        },
    ],
}

export interface ProjectImages {
    relativeDirectory: string
    childImageSharp: { fluid: FluidObject; id: string }
}
export interface ProjectData {
    [x: string]: {
        name: string
        description: string
        portrait: string
        landscape: string
    }
}

const ProjectLayout = ({
    data,
}: {
    data: {
        allFile: {
            edges: {
                node: ProjectImages
            }[]
        }
        allProjectsYaml: {
            edges: {
                node: ProjectData
            }[]
        }
        lastProject: {
            edges: {
                node: ProjectData
            }[]
        }
    }
}) => {
    const { t, i18n } = useTranslation()

    const [nav1, setNav1] = useState<Slider | undefined>()
    const [nav2, setNav2] = useState<Slider | undefined>()
    const slider1 = useRef(null)
    const slider2 = useRef(null)

    useEffect(() => {
        setNav1(slider1.current!)
        setNav2(slider2.current!)
    }, [slider1, slider2])

    const { name, description } = data.allProjectsYaml.edges[0].node[
        i18n.language
    ]
    const projectImages = data.allFile.edges.map(({ node }) => node)
    const [isModalOpen, setModalIsOpen] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)
    return (
        <>
            <Breadcrumbs>
                <span>{t('works')}</span> / {name}
            </Breadcrumbs>
            <ProjectWrapper>
                <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                    <HeroColumn>
                        <Title>{name}</Title>
                        <SubTitle
                            dangerouslySetInnerHTML={{
                                __html: description,
                            }}
                        />
                    </HeroColumn>
                    <div>
                        <CarouselWrapper>
                            <FullScreenButton
                                onClick={() => {
                                    setModalIsOpen(true)
                                }}
                            />
                            <Counter>
                                {imageIndex + 1}

                                <span>/ {projectImages.length}</span>
                            </Counter>
                            <Slider
                                {...sliderSettings}
                                asNavFor={nav2}
                                ref={slider1}
                                afterChange={current => setImageIndex(current)}
                            >
                                {projectImages.map(photo => {
                                    return (
                                        <PhotoWrapper
                                            key={
                                                photo.childImageSharp.fluid.src
                                            }
                                        >
                                            <ImageBig
                                                fluid={
                                                    photo.childImageSharp.fluid
                                                }
                                                imgStyle={{
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </PhotoWrapper>
                                    )
                                })}
                            </Slider>
                        </CarouselWrapper>
                        <CarouselWrapperMini>
                            <Slider
                                {...sliderSettingsBottom}
                                asNavFor={nav1}
                                ref={slider2}
                            >
                                {projectImages.map(photo => (
                                    <div key={photo.childImageSharp.fluid.src}>
                                        <ImageSmall
                                            fluid={photo.childImageSharp.fluid}
                                            imgStyle={{
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </CarouselWrapperMini>
                    </div>
                </Container>
            </ProjectWrapper>
            <ModalCarousel
                data={projectImages}
                isModalOpen={isModalOpen}
                closeHandler={() => setModalIsOpen(false)}
                initialSlideIndex={imageIndex}
            />

            <LastProjects data={data.lastProject} />
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
                    uk {
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
                    uk {
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
