import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { LocalizedLink } from 'i18n/LocalizedLink'
import { Button } from 'components/Button'
import { JumpingArrow } from 'components/JumpingArrow'

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
    @media (min-width: ${displayWidth.desktop}) {
        margin: 0 32px 48px;
        text-align: left;
    }
`
const TitleStyled = styled(Title)`
    margin: 20px auto;
    @media (min-width: ${displayWidth.desktop}) {
        margin: 48px 32px 24px;
    }
`
const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px;
    align-items: center;
    border-bottom: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
        padding: 32px 0;
        border-right: 1px solid ${colors.dark};
    }
`
const ImgStyled = styled(Img)`
    height: 70vw;
    max-height: 100%;
    @media (min-width: ${displayWidth.tablet}) {
        max-width: calc((100vw - 160px) * 0.6666);
        max-height: 450px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 793px;
        max-height: 620px;
    }
`
const ImgWrapper = styled.div`
    padding: 0 16px;
    @media (min-width: ${displayWidth.tablet}) {
        padding: 0;
    }
`
const LocalizedLinkStyled = styled(LocalizedLink)`
    text-decoration: none;
`
const ButtonStyled = styled(Button)`
    width: 264px;
    margin: 50px auto;
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

export const SelectionOfPaints = () => {
    const { i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allImageSharp(
                filter: {
                    fluid: { originalName: { eq: "colorsAndTextur.png" } }
                }
            ) {
                edges {
                    node {
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
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
    const { title, subTitle, buttonText } = selectionOfPaintYaml

    const image = data.allImageSharp.edges[0].node

    return (
        <SelectionOfPaintWrapper>
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <TitleStyled>{title}</TitleStyled>
                    <SubTitle>{subTitle}</SubTitle>
                    <LocalizedLinkStyled to={'/promo#design'}>
                        <ButtonStyled>{buttonText}</ButtonStyled>
                    </LocalizedLinkStyled>
                    <JumpingArrow />
                </HeroColumn>
                <ImgWrapper>
                    <ImgStyled fluid={image.fluid} />
                </ImgWrapper>
            </Container>
        </SelectionOfPaintWrapper>
    )
}
