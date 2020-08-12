import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import { displayWidth } from 'styles/width'
import { PhoneLink } from 'components/PhoneLink'
import { colors } from 'styles/colors'
import { Title } from 'components/TitleComponent'
import { contactInformation } from 'components/contactInformation'
import { getDataByLanguage } from 'utils/getDataByLanguage'

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
        justify-content: space-between;
        align-items: flex-start;
    }
`

const TitleStyledMobile = styled(Title)`
    margin: 56px 0 30px;
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`
const TitleStyledDesktop = styled(Title)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        margin: 56px 0 30px;
        text-align: left;
    }
`
const Price = styled.span`
    font-family: 'Yeseva One', cursive;
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
    }
`

const PhoneLinkStyled = styled(PhoneLink)`
    flex-direction: column;
    div {
        margin-bottom: 24px;
    }
    margin-bottom: 50px;
    @media (min-width: ${displayWidth.desktop}) {
        flex-direction: row;
        align-items: center;
        margin-bottom: 40px;
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

export const DefaultFormHero = () => {
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
                <span>?</span>
            </TitleStyledMobile>
            <TitleStyledDesktop>{titleDesktop}</TitleStyledDesktop>
            <SubTitle>{description}</SubTitle>
            <PhoneLinkStyled phone={contactInformation.primaryPhone} />
        </HeroColumn>
    )
}
