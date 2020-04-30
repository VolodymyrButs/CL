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

const FooterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${backgroundColors.footer};
    color: white;
    border-top: 1px solid ${colors.white};
`
const FooterContainer = styled(Container)`
    outline: 1px solid ${colors.white};
    > :last-child {
        justify-content: space-between;
    }
`

const FooterColumn = styled.div`
    padding: 70px 15%;
    outline: 1px solid ${colors.white};
    display: flex;
    flex-direction: column;
    > :last-child {
        margin-bottom: 0;
    }
`
const FooterLogo = styled(Logo)`
    fill: ${colors.white};
`

const FooterLogo2 = styled(Logo)`
    opacity: 0;
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
    const addressData = data.allAddressYaml.edges.find(
        (elem: { node: { parent: { name: string } } }) => {
            return elem.node.parent.name.slice(-2) === i18n.language
        }
    ).node
    const { companyName, street, city } = addressData
    return (
        <FooterWrapper>
            <FooterLogo />
            <FooterContainer columns={'1fr 1fr 1fr'}>
                <FooterColumn>
                    <h3>{t('address')}</h3>
                    <p>{companyName}</p>
                    <p>
                        {street} <br />
                        {city}
                    </p>
                </FooterColumn>
                <FooterColumn>
                    <h3>{t('contacts')}</h3>
                    <p>
                        {contactInformation.primaryPhone}
                        <br />
                        {contactInformation.secondaryPhones}
                    </p>
                    <p>{contactInformation.email}</p>
                </FooterColumn>

                <FooterColumn>
                    <h3>{t('contactUs')}</h3>
                    <SocialIcons fill={colors.white} showAllIcons />
                </FooterColumn>
            </FooterContainer>
            <FooterLogo2 fill={colors.white} />
        </FooterWrapper>
    )
}
