import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { LocalizedLink } from 'i18n/LocalizedLink'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
const MenuWraper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 50%;
    @media (min-width: ${displayWidth.tablet}) {
        flex-direction: row;
        outline: 1px solid ${colors.dark};
        height: 100%;
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
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 13px;
        color: ${colors.dark};
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
        <MenuWraper>
            <MenuItem onClick={onMenuItemClick} to="/">
                {t('home')}
            </MenuItem>
            <MenuItem onClick={onMenuItemClick} to="/promo">
                Promo
            </MenuItem>
            <MenuItem onClick={onMenuItemClick} to="/works">
                Works
            </MenuItem>
            <MenuItem onClick={onMenuItemClick} to="/projects">
                Projects
            </MenuItem>
            <MenuItem onClick={onMenuItemClick} to="/contacts">
                Contacts
            </MenuItem>
            <MenuItem onClick={onMenuItemClick} to="/services">
                Services
            </MenuItem>
        </MenuWraper>
    )
}
