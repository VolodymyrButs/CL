import React from 'react'
import styled from 'styled-components'
import Img, { FluidObject } from 'gatsby-image'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { IconList } from 'components/IconList'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { getImageByImageName } from 'utils/getImageByImageName'
import { imagesDataProp } from 'pages/promo'

const VisualizationAdvantagesWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.services};
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

const Image = styled(Img)<{ fluid: FluidObject }>`
    width: 90%;
    height: auto;
    color: transparent;
    align-self: flex-end;
    @media (min-width: ${displayWidth.desktop}) {
        color: ${backgroundColors.services};
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
        background-color: ${backgroundColors.services};
        box-sizing: border-box;
        margin-left: 1px;
    }
`
const RightSidebar = styled(LeftSidebar)`
    @media (min-width: ${displayWidth.tablet}) {
        background-color: ${colors.white};
    }
`
export const AdvantagesServices = ({
    imagesData,
}: {
    imagesData: imagesDataProp
}) => {
    const { i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allAdvantagesServiceYaml {
                edges {
                    node {
                        title
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
    const advantagesServiceData = getDataByLanguage(
        data.allAdvantagesServiceYaml,
        i18n.language
    )
    const { title, items } = advantagesServiceData
    const imageFluid = getImageByImageName(
        imagesData.allImageSharp,
        'collage.webp'
    )
    return (
        <VisualizationAdvantagesWrapper>
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <Title>{title}</Title>

                    <Image fluid={imageFluid.fluid} />
                </HeroColumn>
                <IconListStyled
                    items={items}
                    fill={backgroundColors.services}
                />
            </Container>
            <RightSidebar />
        </VisualizationAdvantagesWrapper>
    )
}
