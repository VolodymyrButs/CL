import React from 'react'
import styled from 'styled-components'

import { MainMenu } from 'blocks/Header/MainMenu'
import { LanguageSwitcher } from 'i18n/LanguageSwitcher'
import { Container } from 'components/Container'
import { SocialIcons } from 'components/SocialIcons'
import { contactInformation } from 'components/contactInformation'
import { PhoneLink } from 'components/PhoneLink'
import { colors } from 'styles/colors'
import { Logo } from 'components/Logo'

const HeaderWraper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    max-height: 80px;
    border-bottom: 1px solid #231f20;
    z-index: 3;
`

const ContactLinks = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

export const Header = () => {
    return (
        <HeaderWraper>
            <Logo />
            <Container columns={'7fr 5fr'}>
                <MainMenu />
                <ContactLinks>
                    <PhoneLink phone={contactInformation.primaryPhone} />
                    <SocialIcons fill={colors.dark} />
                </ContactLinks>
            </Container>
            <LanguageSwitcher />
        </HeaderWraper>
    )
}
