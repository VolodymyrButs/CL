import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { LocalizedLink } from 'i18n/LocalizedLink'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
const MenuWraper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    outline: 1px solid ${colors.dark};
    height: 100%;
`

const activeClassName = 'active'
const MenuItem = styled(LocalizedLink).attrs({
    activeClassName,
})`
    position: relative;
    color: ${colors.dark};
    font-weight: 600;
    letter-spacing: 0.8px;
    line-height: 19px;
    text-transform: uppercase;
    text-decoration: none;
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 14px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 1em;
    }
    &::after {
        width: 0;
        transition: all 0.35s ease;
        position: absolute;
        bottom: -6px;
        width: 0;
        left: 0;
        border-top: 2px solid ${colors.dark};
        content: '';
    }

    &:hover,
    &.${activeClassName} {
        ::after {
            width: 100%;
        }
    }
`

export const MainMenu = () => {
    const { t } = useTranslation()
    return (
        <MenuWraper>
            <MenuItem to="/">{t('home')}</MenuItem>
            <MenuItem to="/promo/">Promo</MenuItem>
            <MenuItem to="/">Work</MenuItem>
            <MenuItem to="/projects/">Projects</MenuItem>
            <MenuItem to="/contacts/">Contacts</MenuItem>
        </MenuWraper>
    )
}
