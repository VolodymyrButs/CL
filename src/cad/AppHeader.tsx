import React, { useRef, useState, useLayoutEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { LocalizedLink } from 'i18n/LocalizedLink'
import { LanguageSwitcherCad } from 'i18n/LanguageSwitcherCad'
import { accentDark } from 'cad/themes/accentDark'
import { getElements } from 'cad/storage/selectors'
import SaveIcon from 'assets/icons/iconsCad/save.svg'
import DeleteIcon from 'assets/icons/iconsCad/delete.svg'
import LogoSwg from 'assets/icons/Logo.svg'
import { light } from './themes/light'
import { displayWidth } from 'styles/width'
import { sendEvent } from 'tracking/tracking'

const ButtonArea = styled.div`
    display: flex;
`
const LogoSvg = styled(LogoSwg)`
    width: 32px;
    margin-left: 5px;
    fill: #fff;
    @media (min-width: ${displayWidth.tablet}) {
        width: 57px;
    }
`

const ButtonS = styled.div`
    display: flex;
    align-items: center;
    align-self: center;
    height: 26px;
    padding: 5px;
    color: ${light.color};
    background-color: ${light.bgColor};
    text-transform: uppercase;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.685714px;
    text-transform: uppercase;
    cursor: pointer;
    svg {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        @media (min-width: ${displayWidth.tablet}) {
            margin-right: 12px;
            width: 26px;
            height: 26px;
        }
    }
    @media (min-width: ${displayWidth.tablet}) {
        margin-right: 20px;
    }

    :hover {
        color: gray;
        svg {
            fill: gray;
        }
    }
`

const Logo = styled(LocalizedLink)`
    display: flex;
    align-items: center;
    align-self: center;
    font-size: 28px;
    margin: 0 10px;
    text-decoration: none;

    :hover {
        svg {
            fill: gray;
        }
    }
`
const AppHeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;
    width: 100%;
    height: 60px;
    background-color: ${(props) => props.theme.bgColor};
    @media (min-width: ${displayWidth.tablet}) {
        height: 80px;
    }
`

const Banner = styled(LocalizedLink)`
    align-self: center;
    padding: 5px 10px 6px;
    height: 36px;
    background-color: ${accentDark.color};
    color: ${accentDark.bgColor};
    text-align: center;
    font-size: 16px;
    line-height: 18px;
    text-decoration: none;
    font-weight: 600;
    border-radius: 20px;
    align-items: center;
    &:hover {
        background-color: ${accentDark.bgColorHover};
    }
    p {
        margin: 0 auto;
        text-align: center;
    }
    @media (max-width: 350px) {
        font-size: 10px;
    }
    @media (max-width: 360px) {
        font-size: 14px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        padding: 10px 40px;
        margin: 12px;
        font-size: 26px;
        font-weight: 700;
        line-height: 30px;
        letter-spacing: 0px;
        text-align: center;
        border-radius: 32px;
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

            <Banner
                onClick={() =>
                    sendEvent('Click', {
                        eventCategory: 'Banner',
                        placement: 'CAD',
                    })
                }
                to={'/design-za-99'}
            >
                <p>{t('promoRaw')}</p>
                <p> {t('designProject99')}</p>
            </Banner>

            <ButtonArea>
                {stateElements && stateElements.length !== 0 && (
                    <ButtonS onClick={() => setShouldShowAskModal(true)}>
                        {windowWidth > 500 ? (
                            <>
                                <DeleteIcon />
                                {t('ClearAll')}
                            </>
                        ) : (
                            <DeleteIcon />
                        )}
                    </ButtonS>
                )}
                {stateElements && stateElements.length !== 0 && (
                    <ButtonS onClick={() => setShouldShowSaveModal(true)}>
                        {windowWidth > 500 ? (
                            <>
                                <SaveIcon />
                                {t('Export')}
                            </>
                        ) : (
                            <SaveIcon />
                        )}
                    </ButtonS>
                )}
                <LanguageSwitcherCad />
            </ButtonArea>
        </AppHeaderContainer>
    )
}
