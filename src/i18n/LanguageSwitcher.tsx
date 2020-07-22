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

const languagesList = Object.keys(languages)

const LanguageList = styled.div<{ open: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${headerHeight.mobile};
    height: ${headerHeight.mobile};

    @media (min-width: ${displayWidth.tablet}) {
        ${props =>
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
        height: ${headerHeight.desktop};
    }
`
const LangItem = styled.li<{ open: boolean; withBackground?: boolean }>`
    display: flex;
    list-style: none;
    width: 100%;
    box-sizing: border-box;
    height: ${headerHeight.mobile};
    border-right: 1px solid ${colors.white};
    border-bottom: 1px solid ${colors.white};
    @media (min-width: ${displayWidth.tablet}) {
        height: ${headerHeight.desktop};
        background-color: ${({ withBackground }) =>
            withBackground ? colors.white : 'transparent'};
        border-right: none;
        border-bottom: ${({ open }) =>
            open ? `1px solid ${colors.dark}` : 'none'};
    }
`

const IconStyled = styled(ShevronIcon)<{ open: boolean }>`
    width: 10px;
    fill: ${colors.white};
    ${({ open }) => (open ? 'padding-right:6px;' : 'padding-left: 6px;')};
    transform: ${({ open }) => open && 'rotate(180deg)'};
    cursor: pointer;
    @media (min-width: ${displayWidth.tablet}) {
        fill: ${({ open }) => (open ? colors.white : colors.dark)};
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
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 19px;
    @media (min-width: ${displayWidth.tablet}) {
        color: ${({ open }) => (open ? colors.white : colors.dark)};
        :hover {
            text-decoration: underline;
        }
    }
`
const FakeLink = styled.span<{ open: boolean }>`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.white};
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 19px;
    cursor: pointer;
    @media (min-width: ${displayWidth.tablet}) {
        color: ${({ open }) => (open ? colors.white : colors.dark)};
        :hover {
            text-decoration: underline;
        }
    }
`
const Wrapper = styled.div`
    position: absolute;
    left: 0;
    top: ${headerHeight.mobile};
    width: ${headerHeight.mobile};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (min-width: ${displayWidth.tablet}) {
        width: ${headerHeight.desktop};
        top: ${headerHeight.desktop};
    }
`
export const LanguageSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { i18n } = useTranslation()
    const { getPagePath } = usePagePath()

    return (
        <LanguageList open={isOpen}>
            <LanguageList open={isOpen}>
                <LangItem onClick={() => setIsOpen(!isOpen)} open={isOpen}>
                    {isOpen ? (
                        <LinkStyled
                            to={getPagePath(i18n.language)}
                            open={isOpen}
                        >
                            {languages[i18n.language].label}
                            <IconStyled open={isOpen} />
                        </LinkStyled>
                    ) : (
                        <FakeLink open={isOpen}>
                            {languages[i18n.language].label}
                            <IconStyled open={isOpen} />
                        </FakeLink>
                    )}
                </LangItem>
            </LanguageList>
            <Wrapper>
                {isOpen &&
                    languagesList
                        .filter(lang => lang !== i18n.language)
                        .map(lang => {
                            const langLabel = languages[lang].label
                            const path = getPagePath(lang)

                            return (
                                <LangItem
                                    open={isOpen}
                                    key={lang}
                                    withBackground
                                >
                                    <LinkStyled
                                        open={!isOpen}
                                        to={`${path}`}
                                        onClick={() => setIsOpen(!isOpen)}
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
