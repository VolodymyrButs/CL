import React, { useState } from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { languages } from 'i18n/languages'
import ShevronIcon from 'assets/icons/ShevronDown.svg'
import { usePagePath } from 'hooks/usePagePath'
import { headerHeight } from 'styles/height'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { sendEvent } from 'tracking'

const languagesList = Object.keys(languages)

const LanguageList = styled.div<{ open: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${headerHeight.mobile};
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid ${colors.white};
    @media (min-width: ${displayWidth.tablet}) {
        ${(props) =>
            props.open
                ? css`
                      color: ${colors.white};
                      background: ${colors.dark};
                  `
                : css`
                      color: ${colors.dark};
                      background: transparent;
                  `}
        width:${headerHeight.desktop};
        height: 79px;
        border-right: none;
        margin-bottom: 0px;
        z-index: 1;
    }
`
const IconStyled = styled(ShevronIcon)<{ open: boolean }>`
    width: 10px;
    fill: ${colors.white};
    ${({ open }) => (open ? 'padding-right:6px;' : 'padding-left: 6px;')};
    transform: ${({ open }) => open && 'rotate(180deg)'};
    cursor: pointer;
    @media (min-width: ${displayWidth.tablet}) {
        fill: ${colors.dark};
    }
`
const FakeLink = styled.span<{ open: boolean }>`
    width: ${headerHeight.mobile};
    height: ${headerHeight.mobile};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.white};
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 19px;
    cursor: pointer;
    box-sizing: border-box;
    @media (min-width: ${displayWidth.tablet}) {
        color: ${colors.dark};
        width: ${headerHeight.desktop};
        height: 100%;
        background-color: ${({ open }) =>
            open ? colors.white : 'transparent'};
        border: ${({ open }) => (open ? `1px solid ${colors.dark}` : 'none')};
        border-bottom: none;
        border-top: none;
        box-sizing: border-box;
        :hover {
            background-color: ${({ open }) => open && colors.dark};
            color: ${({ open }) => open && colors.white};
            ${IconStyled} {
                fill: ${({ open }) => (open ? colors.white : colors.dark)};
            }
        }
    }
`
const activeClassName = 'active'
const LinkStyled = styled(Link).attrs({
    activeClassName,
})<{ open: boolean }>`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.white};
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 19px;
    @media (min-width: ${displayWidth.tablet}) {
        color: ${({ open }) => (open ? colors.white : colors.dark)};
    }
`

const LangItem = styled.button<{ open: boolean }>`
    display: flex;
    list-style: none;
    width: 100%;
    box-sizing: border-box;
    height: ${headerHeight.mobile};
    background-color: transparent;
    border: none;
    border-right: 1px solid ${colors.white};
    border-bottom: 1px solid ${colors.white};
    @media (min-width: ${displayWidth.tablet}) {
        height: ${headerHeight.desktop};
        background-color: ${({ open }) =>
            open ? colors.white : 'transparent'};
        border: ${({ open }) => (open ? `1px solid ${colors.dark}` : 'none')};
        border-bottom: ${({ open }) => open && 'none'};
    }
    :hover {
        cursor: pointer;
        background-color: ${({ open }) => open && colors.dark};
        ${LinkStyled} {
            color: ${colors.white};
        }
    }
`

const Wrapper = styled.div<{ open: boolean }>`
    position: absolute;
    left: 0;
    top: 66px;
    width: ${headerHeight.mobile};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (min-width: ${displayWidth.tablet}) {
        width: ${headerHeight.desktop};
        top: 79px;
        display: ${({ open }) => (open ? `flex` : 'none')};
    }

    :last-child {
        border-bottom: ${({ open }) =>
            open ? `1px solid ${colors.dark}` : 'none'};
    }
`

export const LanguageSwitcher = ({
    closeMenu = () => {},
}: {
    closeMenu?: (arg: boolean) => void
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const { i18n } = useTranslation()
    const { getPagePath } = usePagePath()
    return (
        <LanguageList open={isOpen}>
            <FakeLink open={isOpen} onClick={() => setIsOpen(!isOpen)}>
                {languages[i18n.language].label}
                <IconStyled open={isOpen} />
            </FakeLink>

            <Wrapper open={isOpen}>
                {languagesList
                    .filter((lang) => lang !== i18n.language)
                    .map((lang) => {
                        const langLabel = languages[lang].label
                        const path = getPagePath(lang)

                        return (
                            <LangItem open={isOpen} key={lang}>
                                <LinkStyled
                                    open={!isOpen}
                                    to={`${path}`}
                                    onClick={() => {
                                        closeMenu(false)
                                        setIsOpen(!isOpen)
                                        sendEvent('Click', {
                                            eventCategory: 'LanguageChange',
                                            to: `${lang}`,
                                        })
                                    }}
                                >
                                    {langLabel}
                                </LinkStyled>
                            </LangItem>
                        )
                    })}
            </Wrapper>
        </LanguageList>
    )
}
