import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'

import { Logo } from 'components/Logo'
import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { SocialIcons } from 'components/SocialIcons'
import { contactInformation } from 'components/contactInformation'
import i18n from 'i18n/config'
import { displayWidth } from 'styles/width'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { indent } from 'styles/indent'

const FooterWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${backgroundColors.footer};
    color: white;
    padding: 0 10px;
    z-index: 1;
    overflow: hidden;
    :after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: ${indent.mobile};
        right: ${indent.mobile};
        border-left: 1px solid ${colors.white};
        border-right: 1px solid ${colors.white};
        content: '';
        z-index: -1;
        @media (min-width: ${displayWidth.tablet}) {
            display: none;
        }
    }

    @media (min-width: ${displayWidth.tablet}) {
        flex-direction: row;
        padding: 0;
    }
`
const FooterContainer = styled(Container)`
    padding: 30px 16px;
    border-bottom: 1px solid ${colors.white};
    > :last-child {
        justify-content: space-between;
    }
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
        border-right: 1px solid ${colors.white};
        border-left: 1px solid ${colors.white};
    }
`

const FooterColumn = styled.div`
    padding: 24px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    :last-child {
        margin-bottom: 0;
    }
    @media (min-width: ${displayWidth.tablet}) {
        padding: 60px 48px;
        align-items: flex-start;
        border-right: 1px solid ${colors.white};
        :last-child {
            border-right: none;
        }
    }
`
const Header = styled.h3`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.4px;
    margin-bottom: 16px;
`
const Paragraph = styled(Header)`
    font-weight: normal;
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
    }
`
const FooterLogo = styled(Logo)`
    display: none;
    fill: ${colors.white};
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
    }
`

const FooterLogo2 = styled(Logo)`
    fill: ${colors.white};
    height: 55px;
    @media (min-width: ${displayWidth.tablet}) {
        fill: transparent;
    }
`
export const Footer = () => {
    const { t } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allAddressYaml {
                edges {
                    node {
                        companyName
                        street
                        city
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
    const addressData = getDataByLanguage(data.allAddressYaml, i18n.language)
    const { companyName, street, city } = addressData

    return (
        <FooterWrapper>
            <FooterLogo />
            <FooterContainer columns={'1fr'} tabletColumns={'1fr 1fr 1fr'}>
                <FooterColumn>
                    <Header>{t('address')}</Header>
                    <Paragraph>{companyName}</Paragraph>
                    <Paragraph>
                        {street} <br />
                        {city}
                    </Paragraph>
                </FooterColumn>
                <FooterColumn>
                    <Header>{t('contacts')}</Header>
                    <Paragraph>
                        {contactInformation.primaryPhone}
                        <br />
                        {contactInformation.secondaryPhones}
                    </Paragraph>
                    <Paragraph>{contactInformation.email}</Paragraph>
                </FooterColumn>

                <FooterColumn>
                    <Header>{t('contactUs')}</Header>
                    <SocialIcons fill={colors.white} showAllIcons />
                </FooterColumn>
            </FooterContainer>
            <FooterLogo2 />
        </FooterWrapper>
    )
}
