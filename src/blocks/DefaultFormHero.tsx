import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import fikus from 'assets/images/fikus.svg'
import { displayWidth } from 'styles/width'
import { PhoneLink } from 'components/PhoneLink'
import { colors } from 'styles/colors'
import { Title } from 'components/TitleComponent'
import { contactInformation } from 'components/contactInformation'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { indent } from 'styles/indent'

const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    box-sizing: border-box;
    border-bottom: 1px solid ${colors.dark};
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
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
        padding: 0 32px;
    }
`
const TitleStyledDesktop = styled(Title)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        text-align: left;
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
        margin-bottom: 40px;
        padding: 0 ${indent.heroColumnDesktop};
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

const Image = styled(fikus)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        width: 80%;
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
            />
            {image && <Image />}
        </HeroColumn>
    )
}
