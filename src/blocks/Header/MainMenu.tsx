import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { LocalizedLink } from 'i18n/LocalizedLink'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
const MenuWraper = styled.menu`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 50%;
    flex-wrap: wrap;
    @media (min-width: ${displayWidth.tablet}) {
        flex-direction: row;
        border-right: 1px solid ${colors.dark};
        height: 100%;
        display: none;
    }
    @media (min-width: ${displayWidth.desktop}) {
        display: flex;
    }
`

const activeClassName = 'active'
const MenuItem = styled(LocalizedLink).attrs({
    activeClassName,
})`
    position: relative;
    color: ${colors.white};
    font-weight: 600;
    letter-spacing: 0.8px;
    line-height: 19px;
    text-transform: uppercase;
    text-decoration: none;
    margin: 0 10px;
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 14px;
        color: ${colors.dark};
        :nth-child(2) {
            margin: 0 9%;
        }
    }
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 16px;
        :nth-child(2) {
            margin: 0 10px;
        }
    }
    &::after {
        width: 0;
        transition: all 0.35s ease;
        position: absolute;
        bottom: -6px;
        width: 0;
        left: 0;
        border-top: 2px solid ${colors.white};
        content: '';
        @media (min-width: ${displayWidth.tablet}) {
            border-top: 2px solid ${colors.dark};
        }
    }

    &:hover,
    &.${activeClassName} {
        ::after {
            width: 100%;
        }
    }
`
const MenuWraperTablet = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        flex-direction: column;
        border-right: 1px solid ${colors.dark};
        align-items: center;
        justify-content: center;
    }
    @media (min-width: ${displayWidth.desktop}) {
        display: none;
    }
`
const Div = styled.div`
    width: 90%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`
interface IMainMenuProps {
    onMenuItemClick?: (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => void
}

export const MainMenu: React.FC<IMainMenuProps> = ({
    onMenuItemClick = () => {},
}) => {
    const { t } = useTranslation()
    return (
        <>
            <MenuWraper>
                <MenuItem
                    onClick={onMenuItemClick}
                    aria-label={(t('goTo'), t('home'))}
                    to="/"
                >
                    {t('home')}
                </MenuItem>
                <MenuItem
                    onClick={onMenuItemClick}
                    aria-label={(t('goTo'), t('promo'))}
                    to="/promo"
                >
                    {t('promo')}
                </MenuItem>
                <MenuItem
                    onClick={onMenuItemClick}
                    aria-label={(t('goTo'), t('works'))}
                    to="/works"
                >
                    {t('works')}
                </MenuItem>
                <MenuItem
                    onClick={onMenuItemClick}
                    aria-label={(t('goTo'), t('contacts'))}
                    to="/contacts"
                >
                    {t('contacts')}
                </MenuItem>
                <MenuItem
                    onClick={onMenuItemClick}
                    aria-label={(t('goTo'), t('services'))}
                    to="/services"
                >
                    {t('services')}
                </MenuItem>
                <MenuItem
                    onClick={onMenuItemClick}
                    aria-label={(t('goTo'), 'wiki')}
                    to="/promo-color"
                >
                    {t('wiki')}
                </MenuItem>
            </MenuWraper>
            <MenuWraperTablet>
                <Div>
                    <MenuItem
                        onClick={onMenuItemClick}
                        aria-label={(t('goTo'), t('home'))}
                        to="/"
                    >
                        {t('home')}
                    </MenuItem>
                    <MenuItem
                        onClick={onMenuItemClick}
                        aria-label={(t('goTo'), t('promo'))}
                        to="/promo"
                    >
                        {t('promo')}
                    </MenuItem>
                    <MenuItem
                        onClick={onMenuItemClick}
                        aria-label={(t('goTo'), t('works'))}
                        to="/works"
                    >
                        {t('works')}
                    </MenuItem>
                </Div>
                <Div>
                    <MenuItem
                        onClick={onMenuItemClick}
                        aria-label={(t('goTo'), t('contacts'))}
                        to="/contacts"
                    >
                        {t('contacts')}
                    </MenuItem>
                    <MenuItem
                        onClick={onMenuItemClick}
                        aria-label={(t('goTo'), t('services'))}
                        to="/services"
                    >
                        {t('services')}
                    </MenuItem>
                    {/* <MenuItem
                        onClick={onMenuItemClick}
                        aria-label={(t('goTo'), 'wiki')}
                        to="/wiki"
                    >
                        {t('wiki')}
                    </MenuItem> */}
                </Div>
            </MenuWraperTablet>
        </>
    )
}
