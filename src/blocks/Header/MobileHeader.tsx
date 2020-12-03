import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { LanguageSwitcher } from 'i18n/LanguageSwitcher'
import ExitSvg from 'assets/icons/Exit.svg'
import BurgerSvg from 'assets/icons/Burger.svg'
import { colors } from 'styles/colors'
import { Logo } from 'components/Logo'
import { displayWidth } from 'styles/width'
import { MainMenu } from './MainMenu'
import { contactInformation } from 'components/contactInformation'
import { headerHeight } from 'styles/height'
import Viber from 'assets/icons/Viber.svg'
import Telegram from 'assets/icons/Telegram.svg'
import Whatsapp from 'assets/icons/Whatsapp.svg'
import { RoundText } from 'components/RoundText'
import { PhoneSvgAnimated } from 'components/PhoneSvgAnimated'
import { useTranslation } from 'react-i18next'
import { sendConversion, sendEvent } from 'tracking'
import { PhoneLink } from 'components/PhoneLink'
import { sendForm } from 'components/form/api'

const MobileHeaderWraper = styled.div<{ isMenuOpen: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 65px;
    border-bottom: 1px solid
        ${({ isMenuOpen }) => (isMenuOpen ? colors.white : colors.dark)};
    z-index: 2;
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`
const MobileMenu = styled.div<{ isMenuOpen: boolean }>`
    position: absolute;
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: space-between;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: ${colors.dark};
`
const BurgerButton = styled.span`
    width: ${headerHeight.mobile};
    height: ${headerHeight.mobile};
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    padding: 10px;
    cursor: pointer;
`
const PhoneLinkStyled = styled(PhoneLink)`
    display: flex;
    flex-direction: column;
    color: ${colors.white};
    margin-bottom: 80px;
    font-weight: normal;
    svg {
        fill: ${colors.white};
    }
`
const iconStyles = css`
    width: 38px;
    height: 38px;
    margin: 4px 13px;
    cursor: pointer;
    pointer-events: auto;
`
const ViberIconStyled = styled(Viber)`
    ${iconStyles};
    fill: ${colors.viber};
`
const TelegramIconStyled = styled(Telegram)`
    ${iconStyles};
    fill: ${colors.telegram};
`
const WhatsappIconStyled = styled(Whatsapp)`
    ${iconStyles};
    fill: ${colors.whatsapp};
`
const IconWrapper = styled.div`
    display: flex;
`

interface MobileHeaderProps {
    showSocialIcons?: boolean
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
    showSocialIcons,
}) => {
    const { t } = useTranslation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <MobileHeaderWraper isMenuOpen={isMenuOpen}>
                <Logo />
                {showSocialIcons && (
                    <IconWrapper>
                        <a
                            href="viber://pa?chatURI=clearline_com_ua"
                            target="blank"
                            onClick={() => {
                                sendForm(`HeaderMobileViberIcon`, {})
                                sendConversion('SocialIconViber')
                                sendEvent('SocialIcon', {
                                    eventCategory: 'SocialIconViber',
                                    placement: 'MobileHeader',
                                })
                            }}
                        >
                            <ViberIconStyled aria-label="ViberButton" />
                        </a>
                        <a
                            href="https://wa.me/+380958363420"
                            target="blank"
                            onClick={() => {
                                sendForm(`HeaderMobileWhatsAppIcon`, {})
                                sendConversion('SocialIconWhatsApp')
                                sendEvent('SocialIcon', {
                                    eventCategory: 'SocialIconWhatsApp',
                                    placement: 'MobileHeader',
                                })
                            }}
                        >
                            <WhatsappIconStyled aria-label="Whatsapp Button" />
                        </a>
                        <a
                            href="tg://resolve?domain=ClearLine_bot"
                            target="blank"
                        >
                            <TelegramIconStyled
                                aria-label="Telegram Button"
                                onClick={() => {
                                    sendForm(`HeaderMobileTelegramIcon`, {})
                                    sendConversion('SocialIconTelegram')
                                    sendEvent('SocialIcon', {
                                        eventCategory: 'SocialIconTelegram',
                                        placement: 'MobileHeader',
                                    })
                                }}
                            />
                        </a>
                    </IconWrapper>
                )}
                <BurgerButton
                    onClick={() => {
                        setIsMenuOpen(!isMenuOpen)
                    }}
                >
                    <BurgerSvg fill={colors.dark} />
                </BurgerButton>
            </MobileHeaderWraper>
            <MobileMenu isMenuOpen={isMenuOpen}>
                <MobileHeaderWraper isMenuOpen={isMenuOpen}>
                    <LanguageSwitcher closeMenu={setIsMenuOpen} />
                    <BurgerButton
                        onClick={() => {
                            setIsMenuOpen(!isMenuOpen)
                        }}
                    >
                        <ExitSvg fill={colors.white} />
                    </BurgerButton>
                </MobileHeaderWraper>

                <MainMenu onMenuItemClick={() => setIsMenuOpen(false)} />
                <PhoneLinkStyled
                    phone={contactInformation.primaryPhone}
                    placement={'MobileHeader'}
                >
                    <RoundText color={colors.white} text={t('callUs')}>
                        <PhoneSvgAnimated color={colors.white} />
                    </RoundText>
                </PhoneLinkStyled>
            </MobileMenu>
        </>
    )
}
