import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'

import { displayWidth } from 'styles/width'
import { colors, backgroundColors } from 'styles/colors'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { contactInformation } from 'components/contactInformation'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Container } from 'components/Container'
import { headerBg } from 'styles/headerBg'
import SimpleMap from 'components/Map/Map'
import { headerHeight } from 'styles/height'
import { sendConversion, sendEvent } from 'tracking'
import { sendForm } from 'components/form/api'
import { HelmetFunc } from 'components/PageMetaData'

const pageMetadata = {
    uk: {
        title: 'Контакти дизайн студії ClearLine',
        description: 'Контактна інформація студії дизайну інтер`єру ClearLine',
    },
    ru: {
        title: 'Контакты дизайн студии ClearLine',
        description: 'Контактная информация студии дизайна интерьера ClearLine',
    },
    en: {
        title: 'Contacts design studio ClearLine',
        description: 'Contact information of ClearLine interior design studio',
    },
}

const ContactsWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.contact};
    position: relative;
    :before {
        ${headerBg}
    }
    ${mobileAfterBorder}
    @media (min-width: ${displayWidth.tablet}) {
        height: calc(100vh - ${headerHeight.desktop});
    }
`

const LeftSidebar = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        flex-grow: 1;
        min-width: 79px;
        background-color: ${backgroundColors.contact};
        box-sizing: border-box;
    }
`
const RightSidebar = styled(LeftSidebar)`
    margin-left: 1px;
    @media (min-width: ${displayWidth.tablet}) {
        background-color: ${colors.white};
    }
`

const ContactsColumn = styled.div`
    padding: 0px 16px 33px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: ${displayWidth.tablet}) {
        border-right: 1px solid ${colors.dark};
        padding: 60px 30px 60px 48px;
        align-items: flex-start;
    }
`

const Header = styled.h3`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.4px;
    margin: 30px 0 0;
`
const Paragraph = styled(Header)`
    font-weight: normal;
    margin: 12px 0 0;
    a {
        text-decoration: none;
        color: ${colors.darkText};
        @media (min-width: ${displayWidth.tablet}) {
            text-align: left;
        }
        :hover {
            text-decoration: underline;
        }
    }
`
const Title = styled.h1`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 55px;
    text-align: center;
    letter-spacing: 2.37176px;
    color: ${colors.darkText};
    margin: 40px auto 0;
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 34px;
        line-height: 39px;
        letter-spacing: 1.68px;
        margin: 0;
    }
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 52px;
        line-height: 60px;
        letter-spacing: 2.68px;
    }
`
const MapWrapper = styled.div`
    width: 100%;
    height: 80vw;
    padding: 0 16px;
    box-sizing: border-box;
    background-color: ${colors.white};
    border-top: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        border-top: none;
        height: 100%;
        padding: 0;
    }
`
const ContactsPage = () => {
    const { t, i18n } = useTranslation()
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
        <ContactsWrapper>
            <HelmetFunc data={pageMetadata} />
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <ContactsColumn>
                    <Title>{t('contacts')}</Title>
                    <Header>{t('companyAddress')}:</Header>
                    <Paragraph>
                        <a
                            href="https://www.google.com.ua/maps/dir//50.4407395,30.5076001/@50.4406349,30.5077912,21z?hl=uk&authuser=0"
                            target="blank"
                            onClick={() => {
                                sendEvent('Click', {
                                    eventCategory: 'Address',
                                    placement: 'Contacts',
                                })
                            }}
                        >
                            <p>{street}</p>
                            <p> {city}</p>
                        </a>
                    </Paragraph>
                    <Header>{t('contacts')}:</Header>
                    <Paragraph>
                        <a
                            href={`tel:${contactInformation.primaryPhone}`}
                            onClick={() => {
                                sendForm(`ContactsPhoneClick`, {})
                                sendConversion('PhoneClick')
                                sendEvent('Phone', {
                                    eventCategory: 'PhoneClick',
                                    placement: 'Contacts',
                                    phone: contactInformation.primaryPhone,
                                })
                            }}
                        >
                            {contactInformation.primaryPhone}
                        </a>
                    </Paragraph>
                    <Paragraph>
                        <a
                            href={`tel:${contactInformation.secondaryPhones}`}
                            onClick={() => {
                                sendForm(`ContactsStationarPhoneClick`, {})
                                sendConversion('PhoneClick')
                                sendEvent('Phone', {
                                    eventCategory: 'PhoneClick',
                                    placement: 'Contacts',
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
                                    placement: 'Contacts',
                                    email: contactInformation.email,
                                })
                            }}
                        >
                            {contactInformation.email}
                        </a>
                    </Paragraph>
                </ContactsColumn>
                <MapWrapper>
                    <SimpleMap />
                </MapWrapper>
            </Container>
            <RightSidebar />
        </ContactsWrapper>
    )
}

export default ContactsPage
