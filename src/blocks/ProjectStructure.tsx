import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { IconList } from 'components/IconList'
import { displayWidth } from 'styles/width'
import tableFlower from 'assets/images/tableFlower.svg'

const ProjectStructureWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.promotion};
    border-bottom: 1px solid ${colors.dark};
`
const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    position: relative;
    border-top: 1px solid ${colors.dark};
    border-bottom: 1px solid ${colors.dark};
    z-index: 1;
    @media (min-width: ${displayWidth.tablet}) {
        justify-content: space-between;
        border-top: none;
        border-bottom: none;
        padding: 40px 0 0;
    }
    :after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 16px;
        right: 16px;
        outline: 1px solid ${colors.dark};
        content: '';
        z-index: -1;
        @media (min-width: ${displayWidth.tablet}) {
            outline: none;
        }
    }
`
const IconListStyled = styled(IconList)`
    :after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 16px;
        right: 16px;
        outline: 1px solid ${colors.dark};
        content: '';
        z-index: 2;
        @media (min-width: ${displayWidth.tablet}) {
            outline: none;
        }
    }
`
const ContainerStyled = styled(Container)`
    @media (min-width: ${displayWidth.tablet}) {
        padding: 0;
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
    }
`
const RightSidebar = styled(LeftSidebar)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        background-color: ${colors.white};
        border-left: 1px solid ${colors.dark};
    }
`
const Title = styled.div`
    font-family: Yeseva One;
    font-size: 48px;
    line-height: 52px;
    font-style: normal;
    font-weight: normal;
    letter-spacing: 0.666667px;
    margin: 16px;
    text-align: center;
    color: ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 56px;
        line-height: 56px;
        letter-spacing: 0.8px;
        text-align: left;
    }
`
const PriceWrapper = styled.div`
    display: inline-block;
    position: relative;
    width: 120px;
    margin: 0;
    @media (min-width: ${displayWidth.tablet}) {
        width: 150px;
    }
`
const Price = styled.p`
    position: absolute;
    bottom: -50px;
    font-family: Yeseva One;
    font-style: normal;
    font-weight: normal;
    font-size: 64px;
    line-height: 74px;
    letter-spacing: 0.888889px;
    color: ${colors.accentText};
    margin: 0 10px;
    @media (min-width: ${displayWidth.tablet}) {
        position: absolute;
        font-size: 80px;
        line-height: 92px;
        letter-spacing: 1.11111px;
    }
`
const ImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const ImgBlock = styled.div`
    position: relative;
    align-self: flex-end;
    width: 140px;
    height: 200px;
    @media (min-width: 450px) {
        width: 185px;
        height: 300px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        width: 140px;
        height: 200px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 185px;
        height: 300px;
    }
`
const ImageSvg = styled(tableFlower)`
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: -30px;
    fill: ${backgroundColors.promotion};
    @media (min-width: 450px) {
        bottom: -50px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        right: 60%;
        bottom: -30px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        right: 70%;
        bottom: -40px;
    }
`
const Image = styled(Img)`
    width: 70%;
    height: auto;
    align-self: flex-end;
    @media (orientation: landscape) {
        max-width: 50vw;
    }
    @media (min-width: ${displayWidth.tablet}) {
        width: 90%;
    }
`
interface IProjectStructureProps {
    id?: string
}
export const ProjectStructure: React.FC<IProjectStructureProps> = ({ id }) => {
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
            allProjectStructureYaml {
                edges {
                    node {
                        title
                        price
                        image
                        items {
                            content
                            svg
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
    const projectStructureData = data.allProjectStructureYaml.edges.find(
        (elem: { node: { parent: { name: string } } }) => {
            return elem.node.parent.name.slice(-2) === i18n.language
        }
    ).node
    const { title, items, price } = projectStructureData
    const imageTable = data.allImageSharp.edges.find(
        (elem: { node: { fluid: { originalName: string } } }) => {
            return elem.node.fluid.originalName === projectStructureData.image
        }
    ).node
    return (
        <ProjectStructureWrapper id={id}>
            <LeftSidebar />
            <ContainerStyled columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <Title>
                        {title}
                        <PriceWrapper>
                            <Price>{price}</Price>
                        </PriceWrapper>
                    </Title>
                    <ImgWrapper>
                        <ImgBlock>
                            <ImageSvg />
                        </ImgBlock>
                        <Image fluid={imageTable.fluid} />
                    </ImgWrapper>
                </HeroColumn>
                <IconListStyled
                    items={items}
                    fill={backgroundColors.promotion}
                />
            </ContainerStyled>
            <RightSidebar />
        </ProjectStructureWrapper>
    )
}
