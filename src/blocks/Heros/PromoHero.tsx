import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { headerBg } from 'styles/headerBg'
import { colors, backgroundColors } from 'styles/colors'
import { Container } from 'components/Container'
import { JumpingArrow } from 'components/JumpingArrow'
import { Button } from 'components/Button'
import LampIcon from 'assets/icons/Lamp.svg'
import sofaDesktopRight from 'assets/images/sofaDesktopRight.svg'
import i18n from 'i18n/config'
import { displayWidth } from 'styles/width'
import { headerHeight } from 'styles/height'
import { LocalizedLinkAnchor } from 'i18n/LocalizedLink'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { getImageByImageName } from 'utils/getImageByImageName'
import { indent } from 'styles/indent'
import { Title } from 'components/TitleComponent'
import { useTranslation } from 'react-i18next'

const PromoHeroWraper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.promotion};
    height: calc(100vh - ${headerHeight.mobile});
    min-height: 503px;
    border-bottom: 1px solid ${colors.dark};
    :before {
        ${headerBg}
    }
    @media (orientation: landscape) {
        min-height: 590px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        height: 500px;
        border-bottom: nonne;
    }
    @media (min-width: ${displayWidth.desktop}) {
        height: 600px;
    }
`

const PromoHeroColumn = styled.div`
    display: none;
    :first-child {
        display: flex;
    }
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-left: 1px solid ${colors.dark};
    border-right: 1px solid ${colors.dark};
    flex-grow: 0;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        position: relative;
        border-left: none;
        border-right: none;
        justify-content: center;
        outline: 1px solid ${colors.dark};
        max-width: calc((100vw - 160px) / 3);
        :nth-child(2n) {
            outline: none;
        }
    }
`
const ContainerStyled = styled(Container)`
    padding: 0 ${indent.mobile};
    @media (min-width: ${displayWidth.tablet}) {
        padding: 0;
    }
`

const JumpingArrowWrapper = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        align-self: center;
        justify-content: center;
    }
`
const LampIconStyled = styled(LampIcon)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        position: absolute;
        width: 190px;
        right: 10px;
        bottom: -55px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 265px;
        bottom: 10px;
    }
`
const TitleWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: ${displayWidth.desktop}) {
        width: 375px;
    }
`
const TitleStyled = styled(Title)`
    font-size: 50px;
    line-height: 55px;
    letter-spacing: 0.666667px;
    overflow: visible;
    text-align: center;
    color: #296963;
    @media (max-width: 355px) {
        font-size: 40px;
        line-height: 45px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        top: 0;
        left: 0;
        box-sizing: border-box;
        font-size: 56px;
        line-height: 56px;
        letter-spacing: 0.8px;
        text-align: left;
    }
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 64px;
        line-height: 64px;
    }
`
const Price = styled.span`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 64px;
    line-height: 64px;
    letter-spacing: 0.888889px;
    color: ${colors.accentText};
    width: 100%;
    text-align: center;
    @media (min-width: ${displayWidth.tablet}) {
        position: absolute;
        left: 350px;
        bottom: 30px;
        font-size: 133px;
        line-height: 115px;
        letter-spacing: 1.52778px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        bottom: 46px;
    }
`
const MobileImage = styled(Img)`
    width: 70%;
    height: auto;
    align-self: flex-end;
    margin-top: 30px;
    @media (orientation: landscape) {
        max-width: 50vw;
    }
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`
const DesktopImageRight = styled(sofaDesktopRight)`
    display: none;
    width: 75%;
    fill: ${backgroundColors.promotion};
    stroke: ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        position: absolute;
        left: 0;
        bottom: 30px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        bottom: 40px;
    }
`
const DesktopImageLeft = styled(Img)`
    display: none;
    width: 78%;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        position: absolute;
        left: 11%;
        bottom: -148px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        bottom: -144px;
    }
`
const ButtonStyled = styled(Button)`
    @media (min-width: ${displayWidth.tablet}) {
        margin: 30px 0;
    }
`
const LocalizedLinkStyled = styled(LocalizedLinkAnchor)`
    text-decoration: none;
`
const For = styled.span`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-size: 50px;
    line-height: 55px;
    letter-spacing: 0.666667px;
    text-align: center;
    color: #296963;
    @media (max-width: 355px) {
        font-size: 40px;
        line-height: 45px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
        position: relative;
    }
`
export const PromoHero = () => {
    const { t } = useTranslation()
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
            allPromoHeroYaml {
                edges {
                    node {
                        title
                        price
                        buttonText
                        image
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
    const promoHeroData = getDataByLanguage(
        data.allPromoHeroYaml,
        i18n.language
    )

    const imageSofa = getImageByImageName(
        data.allImageSharp,
        promoHeroData.image
    )

    return (
        <PromoHeroWraper>
            <ContainerStyled columns={'1fr'} tabletColumns={'1fr 1fr 1fr'}>
                <PromoHeroColumn>
                    <TitleWrapper>
                        <TitleStyled>{promoHeroData.title}</TitleStyled>
                        <Price>
                            <For>{t('for')} </For>
                            {promoHeroData.price}
                        </Price>
                    </TitleWrapper>
                    <LocalizedLinkStyled to={'/promo/#projectStructure'}>
                        <ButtonStyled>
                            <p>{promoHeroData.buttonText}</p>
                        </ButtonStyled>
                    </LocalizedLinkStyled>
                    <JumpingArrowWrapper>
                        <JumpingArrow />
                    </JumpingArrowWrapper>

                    <MobileImage fluid={imageSofa.fluid} />
                </PromoHeroColumn>
                <PromoHeroColumn>
                    <DesktopImageLeft fluid={imageSofa.fluid} />
                </PromoHeroColumn>
                <PromoHeroColumn>
                    <DesktopImageRight />
                    <LampIconStyled />
                </PromoHeroColumn>
            </ContainerStyled>
        </PromoHeroWraper>
    )
}
