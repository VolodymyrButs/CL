import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { TitleH1 } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { LocalizedLinkAnchor } from 'i18n/LocalizedLink'
import { Button } from 'components/Button'
import { JumpingArrow } from 'components/JumpingArrow'
import { indent } from 'styles/indent'
import { sendEvent } from 'tracking'

const Visualization3dWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.project};
    position: relative;
    border-bottom: 1px solid ${colors.dark};
    ${mobileAfterBorder}
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
    }
`

const SubTitle = styled.h3`
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 0.4px;
    color: ${colors.dark};
    margin: 20px ${indent.heroColumnDesktop};
    @media (min-width: ${displayWidth.tablet}) {
        margin: 0 ${indent.heroColumnTablet} 48px;
        text-align: left;
    }
    @media (min-width: ${displayWidth.desktop}) {
        margin: 0 0 48px ${indent.heroColumnDesktop};
    }
`

const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 32px;
    align-items: center;
    border-bottom: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
        padding: 0 0 32px;
        border-right: 1px solid ${colors.dark};
    }
`
const ImgStyled = styled(Img)<{ fluid: FluidObject }>`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 16px;
    align-self: center;
    @media (min-width: ${displayWidth.tablet}) {
        max-width: calc((100vw - 160px) * 0.6666);
        padding: 0;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 793px;
    }
`
const ImgWrapper = styled.div`
    padding: 0 16px;
    @media (min-width: ${displayWidth.tablet}) {
        padding: 0;
    }
`
const LocalizedLinkStyled = styled(LocalizedLinkAnchor)`
    text-decoration: none;
`
const ButtonStyled = styled(Button)`
    width: 264px;
    margin: 0 auto 50px;
    z-index: 3;
    @media (max-width: 330px) {
        width: 250px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        width: 220px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 264px;
    }
`
const TitleWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const TitleStyled = styled(TitleH1)`
    font-size: 40px;
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
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 50px;
    line-height: 30px;
    letter-spacing: 0.888889px;
    color: ${colors.accentText};
    width: 100%;
    text-align: center;
`

export const Project3DPosadka = () => {
    const { i18n, t } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allImageSharp(
                filter: { fluid: { originalName: { eq: "picture3D.png" } } }
            ) {
                edges {
                    node {
                        fluid(quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            allProject3DYaml {
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
    const project3DYaml = getDataByLanguage(
        data.allProject3DYaml,
        i18n.language
    )
    const image = data.allImageSharp.edges[0].node
    const { subTitle, buttonText } = project3DYaml

    return (
        <Visualization3dWrapper>
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <TitleWrapper>
                        <TitleStyled>{t('3dDesignFlat')}</TitleStyled>
                        <Price>
                            $4 {t('for')} m<sup>2</sup>
                        </Price>
                    </TitleWrapper>
                    <SubTitle>{subTitle}</SubTitle>
                    <LocalizedLinkStyled
                        to={'/promo/#project3dAdvantages'}
                        onClick={() => {
                            sendEvent('Click', {
                                eventCategory: 'ShowMoreButton',
                                placement: 'Project3D',
                                target: 'Advantages3D',
                            })
                        }}
                    >
                        <ButtonStyled>{buttonText}</ButtonStyled>
                    </LocalizedLinkStyled>
                    <JumpingArrow />
                </HeroColumn>
                <ImgWrapper>
                    <ImgStyled fluid={image.fluid} loading="eager" />
                </ImgWrapper>
            </Container>
        </Visualization3dWrapper>
    )
}
