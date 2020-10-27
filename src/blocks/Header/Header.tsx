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
import { displayWidth } from 'styles/width'
import { MobileHeader } from './MobileHeader'

const HeaderWraper = styled.div`
    display: none;
    justify-content: center;
    width: 100%;
    max-height: 80px;
    border-bottom: 1px solid ${colors.dark};
    z-index: 3;
    box-sizing: border-box;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
    }
`

const ContactLinks = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`
const SocialIconsWrapper = styled.div`
    margin: 0 45px;
    width: 100%;
`

interface HeaderProps {
    showSocialIcons?: boolean
}

export const Header: React.FC<HeaderProps> = ({ showSocialIcons = true }) => {
    return (
        <>
            <MobileHeader showSocialIcons={showSocialIcons} />
            <HeaderWraper>
                <Logo />
                <Container tabletColumns={'7fr 5fr'} desktopColunms={'7fr 5fr'}>
                    <MainMenu />
                    <ContactLinks>
                        <PhoneLink
                            phone={contactInformation.primaryPhone}
                            placement={'Header'}
                        />
                        {showSocialIcons && (
                            <SocialIconsWrapper>
                                <SocialIcons
                                    fill={colors.dark}
                                    placement={'Header'}
                                />
                            </SocialIconsWrapper>
                        )}
                    </ContactLinks>
                </Container>
                <LanguageSwitcher />
            </HeaderWraper>
        </>
    )
}
