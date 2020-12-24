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
import { sendConversion, sendEvent } from 'tracking'
import { sendForm } from 'components/form/api'

const FooterWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${backgroundColors.footer};
    color: white;
    z-index: 1;
    overflow: hidden;
    width: 100%;
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
        align-items: flex-start;
        padding: 0;
    }
`
const FooterContainer = styled(Container)`
    padding: 30px 16px;
    border-bottom: 1px solid ${colors.white};
    > :last-child {
        justify-content: space-between;
    }
    box-sizing: border-box;
    @media (min-width: ${displayWidth.tablet}) {
        padding: 0;
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
        margin: 5px 0;
    }
    @media (min-width: ${displayWidth.tablet}) {
        padding: ${indent.heroColumnTablet};
        align-items: flex-start;
        border-right: 1px solid ${colors.white};
        :last-child {
            border-right: none;
        }
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: ${indent.heroColumnDesktop};
    }
`
const Header = styled.h3`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.4px;
    margin-bottom: 10px;
`
const Paragraph = styled(Header)`
    font-weight: normal;
    a {
        text-decoration: none;
        color: ${colors.white};
        p {
            padding-bottom: 10px;
        }
        :hover {
            text-decoration: underline;
        }
    }
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
    }
`
const FooterLogo = styled(Logo)`
    display: none;
    fill: ${colors.white};
    @media (min-width: ${displayWidth.tablet}) {
        margin-top: 35px;
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
const SocialIconsWrapper = styled.div`
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
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
    const { street, city } = addressData

    return (
        <FooterWrapper>
            <FooterLogo />
            <FooterContainer columns={'1fr'} tabletColumns={'1fr 1fr 1fr'}>
                <FooterColumn>
                    <Header>{t('address')}</Header>
                    {/* <Paragraph>{companyName}</Paragraph> */}
                    <Paragraph>
                        <a
                            href={`https://www.google.com.ua/maps/place/ClearLine/@50.4405714,30.5056453,17z/data=!4m8!1m2!2m1!1z0JTQuNC30LDQudC90LXRgCDQuNC90YLQtdGA0YzQtdGA0LA!3m4!1s0x40d4cefa03940353:0xf974319028460098!8m2!3d50.440568!4d30.507834?hl=${i18n.language}&authuser=0`}
                            target="blank"
                            onClick={() => {
                                sendEvent('Click', {
                                    eventCategory: 'Address',
                                    placement: 'Footer',
                                })
                            }}
                        >
                            <p> {street}</p>
                            <p> {city}</p>
                        </a>
                    </Paragraph>
                </FooterColumn>
                <FooterColumn>
                    <Header>{t('contacts')}</Header>
                    <Paragraph>
                        <a
                            href={`tel:${contactInformation.primaryPhone}`}
                            onClick={() => {
                                sendEvent('Phone', {
                                    eventCategory: 'PhoneClick',
                                    placement: 'Footer',
                                    phone: contactInformation.primaryPhone,
                                })
                                sendForm(`FooterPhoneClick`, {})
                                sendConversion('PhoneClick')
                            }}
                        >
                            {contactInformation.primaryPhone}
                        </a>
                    </Paragraph>
                    <Paragraph>
                        <a
                            href={`tel:${contactInformation.secondaryPhones}`}
                            onClick={() => {
                                sendForm(`FooterStationarPhoneClick`, {})
                                sendConversion('PhoneClick')
                                sendEvent('Phone', {
                                    eventCategory: 'PhoneClick',
                                    placement: 'Footer',
                                    phone: contactInformation.secondaryPhones,
                                })
                            }}
                        >
                            {contactInformation.secondaryPhones}
                        </a>
                    </Paragraph>
                    <Paragraph>
                        <a
                            href={`mailto:${contactInformation.email}`}
                            onClick={() => {
                                sendConversion('EmailClick')
                                sendEvent('Email', {
                                    eventCategory: 'EmailClick',
                                    placement: 'Footer',
                                    email: contactInformation.email,
                                })
                            }}
                        >
                            {contactInformation.email}
                        </a>
                    </Paragraph>
                </FooterColumn>

                <FooterColumn>
                    <Header>{t('contactUs')}</Header>
                    <SocialIconsWrapper>
                        <SocialIcons
                            fill={colors.white}
                            showAllIcons
                            placement={'Footer'}
                        />
                    </SocialIconsWrapper>
                </FooterColumn>
            </FooterContainer>
            <FooterLogo2 />
        </FooterWrapper>
    )
}
