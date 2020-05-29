import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { LanguageSwitcher } from 'i18n/LanguageSwitcher'
import PhoneLinesSvg from 'assets/icons/PhoneLines.svg'
import ExitSvg from 'assets/icons/Exit.svg'
import BurgerSvg from 'assets/icons/Burger.svg'
import { colors } from 'styles/colors'
import { Logo } from 'components/Logo'
import { displayWidth } from 'styles/width'
import { PhoneSvgAnimated } from 'components/PhoneSvgAnimated'
import { MainMenu } from './MainMenu'
import { RoundText } from 'components/RoundText'
import { contactInformation } from 'components/contactInformation'
import { headerHeight } from 'styles/height'
import { LocalizedLink } from 'i18n/LocalizedLink'

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
    z-index: 2;
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
`
const PhoneLink = styled.a`
    padding: 30px;
    margin: 0 auto;
    @media (min-height: 450px) {
        padding: 70px;
    }
`
export const MobileHeader = () => {
    const { t } = useTranslation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <MobileHeaderWraper isMenuOpen={isMenuOpen}>
                <LocalizedLink to="/">
                    <Logo />
                </LocalizedLink>
                <a href={`tel:${contactInformation.primaryPhone}`}>
                    <PhoneLinesSvg />
                </a>
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
