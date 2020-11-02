import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import Img, { FluidObject } from 'gatsby-image'
import { displayWidth } from 'styles/width'
import { PhoneLink } from 'components/PhoneLink'
import { colors } from 'styles/colors'
import { Title } from 'components/TitleComponent'
import { contactInformation } from 'components/contactInformation'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { indent } from 'styles/indent'
import { getImageByImageName } from 'utils/getImageByImageName'

const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    box-sizing: border-box;
    border-bottom: 1px solid ${colors.dark};
    width: 100%;
    max-width: 100vw;
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
        padding: 0;
        justify-content: space-between;
        align-items: flex-start;
        border-right: 1px solid ${colors.dark};
    }
`

const TitleStyledMobile = styled(Title)`
    margin: 56px 0 30px;
    font-size: 25px;
    max-width: 100%;
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
        padding: 0 32px;
    }
`
const TitleStyledDesktop = styled(Title)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        margin-left: ${indent.heroColumnTablet};
        text-align: left;
    }
    @media (min-width: ${displayWidth.desktop}) {
        margin-left: ${indent.heroColumnDesktop};
    }
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
`
const SubTitle = styled.h3`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        text-align: left;
        font-weight: normal;
        font-size: 16px;
        line-height: 26px;
        letter-spacing: 0.4px;
        color: ${colors.dark};
        margin-bottom: 32px;
        padding: 0 ${indent.heroColumnTablet};
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: 0 ${indent.heroColumnDesktop};
    }
`

const PhoneLinkStyled = styled(PhoneLink)<{ withPhoneMobile?: boolean }>`
    flex-direction: column;
    div {
        margin-bottom: 24px;
    }
    margin-bottom: 50px;
    align-self: center;
    ${({ withPhoneMobile }) =>
        withPhoneMobile ? 'display: flex;' : 'display: none;'}

    @media (min-width: ${displayWidth.desktop}) {
        flex-direction: row;
        align-items: center;
        margin: 0 20px 40px 0;
        padding: 0 38px;
        div {
            width: 100px;
            height: 100px;
            margin-bottom: 0;
        }
        div > div > svg {
            top: -50%;
        }
    }
`

const Image = styled(Img)<{ fluid: FluidObject }>`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        width: 90%;
        height: auto;
        align-self: center;
        color: transparent;
    }
`
export const DefaultFormHero = ({
    image,
    withPhoneMobile,
}: {
    withPhoneMobile?: boolean
    image?: boolean | undefined
}) => {
    const { i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allImageSharp {
                edges {
                    node {
                        fluid(srcSetBreakpoints: [400]) {
                            originalName
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            allFormYaml {
                edges {
                    node {
                        titleMobile
                        titleDesktop
                        description
                        price
                        formTitle
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
    const imageFluid = getImageByImageName(data.allImageSharp, 'fikus.webp')
    const formYaml = getDataByLanguage(data.allFormYaml, i18n.language)
    const { titleMobile, titleDesktop, description, price } = formYaml
    return (
        <HeroColumn>
            <TitleStyledMobile>
                {titleMobile}
                <Price>{price}</Price>
            </TitleStyledMobile>
            <TitleStyledDesktop>{titleDesktop}</TitleStyledDesktop>
            {!image && <SubTitle>{description}</SubTitle>}
            <PhoneLinkStyled
                phone={contactInformation.primaryPhone}
                withPhoneMobile={withPhoneMobile}
                placement={'Form'}
            />
            {image && <Image fluid={imageFluid.fluid} loading="eager" />}
        </HeroColumn>
    )
}
