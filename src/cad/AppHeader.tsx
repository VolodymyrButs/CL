import React, { useRef, useState, useLayoutEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { LocalizedLink } from 'i18n/LocalizedLink'
import { Button } from 'cad/Button'
import { LanguageSwitcherCad } from 'i18n/LanguageSwitcherCad'
import { accentDark } from 'cad/themes/accentDark'
import { getElements } from 'cad/storage/selectors'
import ClearSwg from 'assets/icons/iconsCad/Clean.svg'
import LogoSwg from 'assets/icons/Logo.svg'

const ButtonArea = styled.div`
    display: flex;
`
const LogoSvg = styled(LogoSwg)`
    width: 33px;
    margin-left: 5px;
`

const ButtonS = styled(Button)`
    align-self: center;
    font-size: 10px;
    line-height: 12px;
    margin-right: 5px;
    padding: 5px;
    @media (min-width: 400px) {
        font-size: 12px;
        line-height: 13px;
        padding: 5px 10px;
    }
    @media (min-width: 850px) {
        line-height: 22px;
        font-size: 16px;
    }
`

const Logo = styled(LocalizedLink)`
    display: flex;
    align-items: center;
    align-self: center;
    font-size: 28px;
    margin: 0 10px;
    color: ${accentDark.color};
    text-decoration: none;

    &:hover {
        color: ${accentDark.bgColorHover};
    }
`
const AppHeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;
    width: 100%;
    height: 50px;
    background-color: ${(props) => props.theme.bgColor};
`

const Banner = styled(LocalizedLink)`
    display: flex;
    padding: 5px;
    margin: 6px;
    background-color: ${accentDark.color};
    color: ${accentDark.bgColor};
    text-align: center;
    font-size: 8px;
    text-decoration: none;
    font-weight: 600;
    line-height: 1.3;
    border-radius: 10px;
    align-items: center;
    &:hover {
        background-color: ${accentDark.bgColorHover};
    }
    @media (min-width: 400px) {
        font-size: 13px;
    }
    @media (min-width: 850px) {
        padding: 5px 40px;
        font-size: 18px;
    }
`

type Props = {
    setShouldShowAskModal: (arg: boolean) => void
    setShouldShowSaveModal: (arg: boolean) => void
}
export const AppHeader = ({
    setShouldShowAskModal,
    setShouldShowSaveModal,
}: Props) => {
    const stateElements = useSelector(getElements)
    const windowRef = useRef<HTMLDivElement>(null)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const handleResize = useCallback(() => {
        setWindowWidth(windowRef.current!.clientWidth)
    }, [])

    useLayoutEffect(() => {
        setWindowWidth(windowRef.current!.clientWidth)
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [handleResize])

    const { t } = useTranslation()

    return (
        <AppHeaderContainer ref={windowRef}>
            <Logo to={'/'}>
                <LogoSvg />
            </Logo>

            <Banner to={'/promo'}>{t('Promo')}</Banner>

            <ButtonArea>
                <LanguageSwitcherCad />
                {stateElements && stateElements.length !== 0 && (
                    <ButtonS onClick={() => setShouldShowAskModal(true)}>
                        {windowWidth > 500 ? (
                            t('ClearAll')
                        ) : (
                            <ClearSwg style={{ margin: 0 }} />
                        )}
                    </ButtonS>
                )}
                {stateElements && stateElements.length !== 0 && (
                    <ButtonS onClick={() => setShouldShowSaveModal(true)}>
                        {t('Export')}
                    </ButtonS>
                )}
            </ButtonArea>
        </AppHeaderContainer>
    )
}
