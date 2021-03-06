import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { IconList } from 'components/IconList'
import { displayWidth } from 'styles/width'
import frame from 'assets/images/frame.svg'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { getImageByImageName } from 'utils/getImageByImageName'
import { imagesDataProp } from 'pages/promo'

const Advantages3DWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.project};
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

const DesktopImageTop = styled(frame)`
    display: none;
    width: 30%;
    height: auto;
    align-self: flex-end;
    margin-right: 20px;
    color: transparent;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
    }
`
const ImageMobile = styled(Img)<{ fluid: FluidObject }>`
    width: 50%;
    height: auto;
    align-self: flex-end;
    margin-right: 20px;
    color: transparent;
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
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
        overflow: hidden;
    }
    @media (min-width: ${displayWidth.desktop}) {
        min-width: 395.66px;
    }
`
const LeftSidebar = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        flex-grow: 1;
        min-width: 79px;
        background-color: ${backgroundColors.project};
        box-sizing: border-box;
        margin-left: 1px;
    }
`
const RightSidebar = styled(LeftSidebar)`
    @media (min-width: ${displayWidth.tablet}) {
        background-color: ${colors.white};
    }
`
const ContainerS = styled(Container)`
    padding-right: 1px;
    box-sizing: border-box;
`
const DesktopImage = styled(Img)<{ fluid: FluidObject }>`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        width: 100%;
        left: 30%;
        overflow: hidden;
    }
`
export const Advantages3D = ({
    imagesData,
}: {
    imagesData: imagesDataProp
}) => {
    const { i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allAdvantages3DYaml {
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
    const advantages3DData = getDataByLanguage(
        data.allAdvantages3DYaml,
        i18n.language
    )
    const { title, items } = advantages3DData
    const proposalImage = getImageByImageName(
        imagesData.allImageSharp,
        'comercialProposalImage.webp'
    )
    const imageFluid = getImageByImageName(
        imagesData.allImageSharp,
        'fikus.webp'
    )
    return (
        <Advantages3DWrapper>
            <LeftSidebar />
            <ContainerS columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <Title>{title}</Title>
                    <ImageMobile fluid={imageFluid.fluid} />
                    <DesktopImageTop />
                    <DesktopImage
                        fluid={proposalImage.fluid}
                        imgStyle={{
                            objectFit: 'containe',
                        }}
                        loading="eager"
                    />
                </HeroColumn>
                <IconListStyled items={items} fill={backgroundColors.project} />
            </ContainerS>
            <RightSidebar />
        </Advantages3DWrapper>
    )
}
