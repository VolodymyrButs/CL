import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'
import { SliderComponent } from 'components/SliderComponent'
import { indent } from 'styles/indent'
import FullScreen from 'assets/icons/fullScreen.svg'
import { ModalCarousel } from 'components/ModalCarousel'
import { ProjectData } from 'layout/Project'
import { sendEvent } from 'tracking'
import { headerBg } from 'styles/headerBg'
import Slider from 'react-slick'

const ExampleOfProjectWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.index};
    position: relative;
    border-bottom: 1px solid ${colors.dark};
    ${mobileAfterBorder}
    :before {
        ${headerBg}
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
const Link = styled(SubTitle)`
    a {
        cursor: pointer;
        text-decoration: none;
        color: ${colors.accentText};
        font-size: 20px;
        :hover {
            font-size: 21px;
            transition: font-size 0.1s linear;
        }
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
        justify-content: space-between;
        padding: 0 ${indent.heroColumnDesktop} 24px;
    }
`
const LeftSidebar = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        flex-grow: 1;
        min-width: 79px;
        background-color: ${backgroundColors.index};
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
        ::last-child {
            margin-bottom: 30px;
        }
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
const Counter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 25px;
    z-index: 10;
    width: 111px;
    height: 30px;
    position: absolute;
    bottom: 0px;
    left: calc(50% - 55px);
    background-color: ${colors.white};
    span {
        opacity: 0.6;
        font-size: 18px;
        line-height: 24px;
        margin-left: 5px;
    }
    p {
        display: flex;
        align-items: center;
        b {
            font-size: 12px;
            margin-left: 3px;
        }
        cursor: pointer;
    }

    @media (min-width: ${displayWidth.tablet}) {
        height: 40px;
        font-size: 30px;
        line-height: 35px;
        span {
            font-size: 22px;
            line-height: 30px;
        }
    }
`
const ListNumbers = styled.ul<{ listWisible: boolean }>`
    position: absolute;
    top: 12px;
    left: 12px;
    max-height: 175px;
    text-align: center;
    padding: 5px;
    overflow-y: scroll;
    background-color: ${colors.white};
    border: 1px solid black;
    z-index: 10;
    ${(props) => (props.listWisible === true ? 'top: 12px;' : 'top: -10000px;')}
    li {
        cursor: pointer;
    }
    li :hover {
        text-decoration: underline;
    }
`
const SliderComponentS = styled(SliderComponent)`
    margin-bottom: 15px;
`
export const ExamplesOfProjects3d = () => {
    const { t } = useTranslation()
    const [isModalOpen, setModalIsOpen] = useState(false)
    const [currentSlideS, setCurrentSlideS] = useState(0)
    const [listWisible, setListWisible] = useState(false)
    const data = useStaticQuery(graphql`
        query {
            desktop: allFile(
                filter: { relativeDirectory: { eq: "projectExample3d" } }
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
        }
    `)

    const sliderSettings = {
        infinite: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    dots: false,
                },
            },
        ],
    }
    const numbers = [...Array(data.desktop.edges.length).keys()]
    const sliderRefD = useRef<Slider | null>(null)
    const sliderRefM = useRef<Slider | null>(null)
    const sliderD = sliderRefD.current
    const sliderM = sliderRefM.current
    function handleListOpen() {
        let parrent = document.getElementById('ListNumbers')
        let child = document.getElementById(`number${currentSlideS}`)
        if (child !== null && parrent !== null) {
            let pos = child.offsetTop - parrent.offsetTop

            parrent.scrollTop = pos
        }
    }

    return (
        <ExampleOfProjectWrapper>
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <TitleStyled>{t('comercialForm.example3d')}</TitleStyled>
                    <SubTitle> {t('exampleSubtitle3d')}</SubTitle>
                    <Link
                        onClick={() => {
                            sendEvent('Click', {
                                eventCategory: 'DownloadExample3d',
                                placement: 'ExampleOfProject3d',
                            })
                        }}
                    >
                        <a
                            href="https://clearline.gitlab.io/cl-website/exampleProject3d.pdf"
                            download
                        >
                            {t('comercialForm.download3d')}(27.1
                            {t('m')})
                        </a>
                    </Link>
                    <Link
                        onClick={() => {
                            sendEvent('Click', {
                                eventCategory: 'ShowExample3d',
                                placement: 'ExampleOfProject3d',
                            })
                        }}
                    >
                        <a
                            href="http://model.clearline.com.ua/pages/popravki/full.html"
                            target="blank"
                        >
                            {t('comercialForm.3d')}
                        </a>
                    </Link>
                </HeroColumn>
                <WrapperDesktop>
                    <Counter id="countModal">
                        <p
                            onClick={() => {
                                setListWisible(!listWisible)
                                setTimeout(() => {
                                    handleListOpen()
                                }, 100)
                            }}
                        >
                            {currentSlideS + 1}
                            <b>▼</b>
                        </p>

                        <ListNumbers
                            id="ListNumbers"
                            onMouseLeave={() => setListWisible(false)}
                            listWisible={listWisible}
                        >
                            {numbers.map((i) => {
                                return (
                                    <li
                                        id={`number${i}`}
                                        onClick={() => {
                                            setListWisible(!listWisible)
                                            sliderD !== null &&
                                                sliderD.slickGoTo(i)
                                        }}
                                        key={i}
                                    >
                                        {i + 1}
                                    </li>
                                )
                            })}
                        </ListNumbers>

                        <span>/ {data.desktop.edges.length}</span>
                    </Counter>
                    <FullScreenButton
                        onClick={() => {
                            setModalIsOpen(true)
                            sendEvent('FullScreen', {
                                eventCategory: 'Slider',
                                placement: 'ExampleOfProject3d',
                            })
                        }}
                    />
                    <SliderComponentS
                        {...sliderSettings}
                        forwardRef={sliderRefD}
                        afterChange={(current: number) => {
                            setCurrentSlideS(current)
                            sendEvent('ShowSlide', {
                                eventCategory: 'Slider',
                                currentSlide: `${current}`,
                                placement: 'ExampleOfProject3d',
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
                    </SliderComponentS>
                </WrapperDesktop>
                <WrapperMobile>
                    <SliderComponent
                        {...sliderSettings}
                        forwardRef={sliderRefM}
                        afterChange={(current: number) => {
                            setCurrentSlideS(current)
                            sendEvent('ShowSlide', {
                                eventCategory: 'Slider',
                                currentSlide: `${current + 1}`,
                                placement: 'ExampleOfProject3d',
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
                    <Counter id="countModal">
                        <p
                            onClick={() => {
                                setListWisible(!listWisible)
                                setTimeout(() => {
                                    handleListOpen()
                                }, 100)
                            }}
                        >
                            {currentSlideS + 1}
                            <b>▼</b>
                        </p>

                        <ListNumbers
                            id="ListNumbers"
                            onMouseLeave={() => setListWisible(false)}
                            listWisible={listWisible}
                        >
                            {numbers.map((i) => {
                                return (
                                    <li
                                        id={`number${i}`}
                                        onClick={() => {
                                            setListWisible(!listWisible)
                                            sliderM !== null &&
                                                sliderM.slickGoTo(i)
                                        }}
                                        key={i}
                                    >
                                        {i + 1}
                                    </li>
                                )
                            })}
                        </ListNumbers>

                        <span>/ {data.desktop.edges.length}</span>
                    </Counter>
                </WrapperMobile>
            </Container>
            <RightSidebar />
            <ModalCarousel
                data={data.desktop.edges.map(
                    ({ node }: { node: ProjectData }) => node
                )}
                isModalOpen={isModalOpen}
                setCurrentSlideS={setCurrentSlideS}
                closeHandler={() => {
                    setModalIsOpen(false)
                    sliderD !== null && sliderD.slickGoTo(currentSlideS)
                }}
                initialSlideIndex={currentSlideS}
            />
        </ExampleOfProjectWrapper>
    )
}
