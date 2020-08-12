import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { useTranslation } from 'react-i18next'

import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { Logo } from 'components/Logo'
import { Button } from 'components/Button'
import { LocalizedLink } from 'i18n/LocalizedLink'
import { getImageByImageName } from 'utils/getImageByImageName'
import { graphql, useStaticQuery } from 'gatsby'

const Image = styled(Img)`
    width: 100%;
    height: 100%;
`
const HoverWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0.8;
    @media (min-width: ${displayWidth.desktop}) {
        opacity: 0;
    }
`
const ItemWrapper = styled.div`
    position: relative;
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    margin: 30px;
    outline: 1px solid ${colors.dark};
    flex: 1;
    &:hover {
        ${HoverWrapper} {
            @media (min-width: ${displayWidth.desktop}) {
                opacity: 0.8;
                transition: opacity 1s;
            }
        }
    }
`
const LogoStyled = styled(Logo)`
    fill: ${colors.white};
`
const ButtonS = styled(Button)`
    width: 210px;
    background-color: transparent;
    padding: 20px 0;
    border: 1px solid ${colors.white};
    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
`
const Description = styled.p`
    color: ${colors.white};
    margin: 0 16px;
    text-align: center;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0.889412px;
`
export interface WorksProjectItemProp {
    image: string
    description: React.ReactNode
    link: React.ReactNode
}

export const WorksProjectItem = ({
    image,
    description,
    link,
}: WorksProjectItemProp) => {
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
        }
    `)
    const { t } = useTranslation()

    return (
        <ItemWrapper>
            <Image
                fluid={getImageByImageName(data.allImageSharp, image).fluid}
                imgStyle={{
                    objectFit: 'containe',
                }}
            />
            <HoverWrapper>
                <LogoStyled />
                <Description>{description}</Description>
                <LocalizedLink to={`works/${link}`}>
                    <ButtonS>{t('showProject')}</ButtonS>
                </LocalizedLink>
            </HoverWrapper>
        </ItemWrapper>
    )
}
