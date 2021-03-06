import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { IconList } from 'components/IconList'
import { displayWidth } from 'styles/width'
import tableFlower from 'assets/images/tableFlower.svg'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { getImageByImageName } from 'utils/getImageByImageName'
import { indent } from 'styles/indent'
import { imagesDataProp } from 'pages/promo'

const ProjectStructureWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.promotion};
    position: relative;
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: 1px solid ${colors.dark};
    }
    ${mobileAfterBorder}
`
const IconListStyled = styled(IconList)`
    border-bottom: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
    }
`

const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
        border-right: 1px solid #231f20;
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

const PriceWrapper = styled.span`
    display: inline-block;
    width: 200px;
    position: relative;
`
const Price = styled.p`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 64px;
    line-height: 74px;
    letter-spacing: 0.888889px;
    color: ${colors.accentText};
    margin: 0 10px;
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 80px;
        position: absolute;
        top: -10px;
        line-height: 30px;
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
    height: 10px;
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
    height: 2000%;
    position: absolute;
    bottom: -30px;
    fill: ${backgroundColors.promotion};
    @media (min-width: 450px) {
        bottom: -50px;
        height: 100%;
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
const Image = styled(Img)<{ fluid: FluidObject }>`
    width: 50%;
    height: auto;
    align-self: flex-end;
    margin-right: 3px;
    @media (orientation: landscape) {
        max-width: 50vw;
    }
    @media (min-width: ${displayWidth.tablet}) {
        width: 90%;
    }
`
const TitleStyled = styled(Title)`
    margin: 30px auto 100px auto;
    @media (min-width: ${displayWidth.tablet}) {
        margin-left: ${indent.heroColumnTablet};
        max-width: 250px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        margin-left: ${indent.heroColumnDesktop};
    }
`

export const ProjectStructure = ({
    imagesData,
    id,
}: {
    imagesData: imagesDataProp
    id?: string
}) => {
    const { i18n, t } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
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
    const projectStructureData = getDataByLanguage(
        data.allProjectStructureYaml,
        i18n.language
    )
    const { title, items, price } = projectStructureData
    const imageTable = getImageByImageName(
        imagesData.allImageSharp,
        projectStructureData.image
    )

    return (
        <ProjectStructureWrapper id={id}>
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <TitleStyled>
                        {title}
                        <br />
                        {t('for')}
                        <PriceWrapper>
                            <Price>{price}</Price>
                        </PriceWrapper>
                    </TitleStyled>
                    <ImgWrapper>
                        <ImgBlock>
                            <ImageSvg />
                        </ImgBlock>
                        <Image fluid={imageTable.fluid} loading="eager" />
                    </ImgWrapper>
                </HeroColumn>
                <IconListStyled
                    items={items}
                    fill={backgroundColors.promotion}
                />
            </Container>
            <RightSidebar />
        </ProjectStructureWrapper>
    )
}
