import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title, TitleH1 } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { JumpingArrow } from 'components/JumpingArrow'
import { indent } from 'styles/indent'
import { imagesDataProp } from 'pages/promo'
import { getImageByImageName } from 'utils/getImageByImageName'

const SelectionOfPaintWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.services};
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
    margin: 20px auto;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 0 ${indent.heroColumnTablet} 48px;
        text-align: left;
    }
    @media (min-width: ${displayWidth.desktop}) {
        margin: 0 ${indent.heroColumnDesktop} 48px;
    }
`

const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 32px 32px;
    align-items: center;
    border-bottom: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
        padding: 0px 0 32px;
        border-right: 1px solid ${colors.dark};
    }
`
const ImgStyled = styled(Img)<{ fluid: FluidObject }>`
    height: 70vw;
    max-height: 100%;
    @media (min-width: ${displayWidth.tablet}) {
        width: calc((100vw - 160px) * 0.6666);
        height: 100%;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 793px;
    }
`
const ImgWrapper = styled.div`
    display: none;
    padding: 0 16px;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        padding: 0;
    }
`

const TitleS = styled(Title)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        text-align: center;
        text-transform: uppercase;
        line-height: 44px;
        font-size: 34px;
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
    font-size: 34px;
    line-height: 45px;
    letter-spacing: 0.666667px;
    overflow: visible;
    text-align: center;
    color: #296963;
    margin-top: 20px;
    @media (max-width: 355px) {
        font-size: 40px;
        line-height: 45px;
    }
`

const Price = styled.span`
    display: none;
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 40px;
    line-height: 40px;
    letter-spacing: 0.888889px;
    color: ${colors.accentText};
    width: 100%;
    text-align: center;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
    }
`

export const SelectionOfPaintsPosadka = ({
    imagesData,
}: {
    imagesData: imagesDataProp
}) => {
    const { i18n, t } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allSelectionOfPaintYaml {
                edges {
                    node {
                        title
                        subTitle
                        buttonText
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
    const selectionOfPaintYaml = getDataByLanguage(
        data.allSelectionOfPaintYaml,
        i18n.language
    )
    const { title, subTitle } = selectionOfPaintYaml

    const image = getImageByImageName(
        imagesData.allImageSharp,
        'colorsAndTextur.webp'
    )

    return (
        <SelectionOfPaintWrapper>
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <TitleS>{title}</TitleS>
                    <TitleWrapper>
                        <TitleStyled>{t('consultation')}</TitleStyled>
                        <Price>{t('alternate')}</Price>
                    </TitleWrapper>
                    <SubTitle>{subTitle}</SubTitle>

                    <JumpingArrow />
                </HeroColumn>
                <ImgWrapper>
                    <ImgStyled fluid={image.fluid} loading="eager" />
                </ImgWrapper>
            </Container>
        </SelectionOfPaintWrapper>
    )
}
