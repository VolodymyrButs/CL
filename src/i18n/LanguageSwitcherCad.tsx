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
    width: ${headerHeight.cadMobile};
    height: ${headerHeight.cadMobile};
    box-sizing: border-box;
    z-index: 4;
    margin-bottom: 0px;
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
    @media (min-width: ${displayWidth.tablet}) {
        width: ${headerHeight.cadDesctop};
        height: ${headerHeight.cadDesctop};
    }
`
const IconStyled = styled(ShevronIcon)<{ open: boolean }>`
    width: 10px;
    ${({ open }) => (open ? 'padding-right:6px;' : 'padding-left: 6px;')};
    transform: ${({ open }) => open && 'rotate(180deg)'};
    cursor: pointer;
`
const FakeLink = styled.span<{ open: boolean }>`
    width: ${headerHeight.cadMobile};
    height: ${headerHeight.cadMobile};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.white};
    text-decoration: none;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 19px;
    cursor: pointer;
    box-sizing: border-box;
    color: ${({ open }) => (open ? colors.dark : colors.white)};
    background-color: ${({ open }) => (open ? colors.white : 'transparent')};
    border: ${({ open }) => (open ? `1px solid ${colors.dark}` : 'none')};
    border-left: ${({ open }) =>
        open ? `1px solid ${colors.dark}` : `1px solid ${colors.white}`};
    ${IconStyled} {
        fill: ${({ open }) => (open ? colors.dark : colors.white)};
    }
    :hover {
        background-color: ${({ open }) => (open ? colors.dark : colors.white)};
        color: ${({ open }) => (open ? colors.white : colors.dark)};
        ${IconStyled} {
            fill: ${({ open }) => (open ? colors.white : colors.dark)};
        }
    }
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 14px;
        width: ${headerHeight.cadDesctop};
        height: ${headerHeight.cadDesctop};
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
    text-decoration: none;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 19px;
    color: ${({ open }) => (open ? colors.white : colors.dark)};
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 14px;
    }
`

const LangItem = styled.button<{ open: boolean }>`
    display: flex;
    list-style: none;
    width: 100%;
    box-sizing: border-box;
    height: ${headerHeight.cadMobile};
    background-color: transparent;
    border: none;
    box-sizing: border-box;
    background-color: ${({ open }) => (open ? colors.white : 'transparent')};
    border: ${({ open }) => (open ? `1px solid ${colors.dark}` : 'none')};
    border-bottom: ${({ open }) => open && 'none'};

    :hover {
        cursor: pointer;
        background-color: ${({ open }) => open && colors.dark};
        ${LinkStyled} {
            color: ${colors.white};
        }
    }
    @media (min-width: ${displayWidth.tablet}) {
        height: ${headerHeight.cadDesctop};
    }
`

const Wrapper = styled.div<{ open: boolean }>`
    position: absolute;
    left: 0;
    top: 59px;
    width: ${headerHeight.cadMobile};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    :last-child {
        border-bottom: ${({ open }) => open && `1px solid ${colors.dark}`};
        box-sizing: border-box;
    }
    @media (min-width: ${displayWidth.tablet}) {
        width: ${headerHeight.cadDesctop};
        top: 79px;
    }
`

export const LanguageSwitcherCad = () => {
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
                {isOpen &&
                    languagesList
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
