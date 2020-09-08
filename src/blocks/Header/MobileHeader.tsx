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

const MobileHeaderWraper = styled.div<{ isMenuOpen: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-height: 65px;
    border-bottom: 1px solid
        ${({ isMenuOpen }) => (isMenuOpen ? colors.white : colors.dark)};
    z-index: 1;
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
const PhoneLink = styled.a`
    padding: 30px;
    margin: 0 auto;
    @media (min-height: 450px) {
        padding: 70px;
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
export const MobileHeader = () => {
    const { t } = useTranslation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <MobileHeaderWraper isMenuOpen={isMenuOpen}>
                <Logo />
                <IconWrapper>
                    <a
                        href="viber://chat?number=%2B380982117690"
                        target="blank"
                    >
                        <ViberIconStyled aria-label="ViberButton" />
                    </a>
                    <a href="https://wa.me/+380958363420" target="blank">
                        <WhatsappIconStyled aria-label="Whatsapp Button" />
                    </a>
                    <a
                        href="tg://resolve?domain=clearline_com_ua"
                        target="blank"
                    >
                        <TelegramIconStyled aria-label="Telegram Button" />
                    </a>
                </IconWrapper>
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
                    <LanguageSwitcher />
                    <BurgerButton
                        onClick={() => {
                            setIsMenuOpen(!isMenuOpen)
                        }}
                    >
                        <ExitSvg fill={colors.white} />
                    </BurgerButton>
                </MobileHeaderWraper>

                <MainMenu onMenuItemClick={() => setIsMenuOpen(false)} />
                <PhoneLink href={`tel:${contactInformation.primaryPhone}`}>
                    <RoundText color={colors.white} text={t('callUs')}>
                        <PhoneSvgAnimated color={colors.white} />
                    </RoundText>
                </PhoneLink>
            </MobileMenu>
        </>
    )
}
