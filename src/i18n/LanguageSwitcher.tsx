import React, { useState } from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { languages } from 'i18n/languages'
import ShevronIcon from 'assets/icons/ShevronDown.svg'
import { usePagePath } from 'hooks/usePagePath'
import { headerHeight } from 'styles/height'
import { colors } from 'styles/colors'

const languagesList = Object.keys(languages)

const LanguageList = styled.div<{ open: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: ${headerHeight.desktop};
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
`
const LangItem = styled.li<{ open: boolean }>`
    display: flex;
    align-items: center;
    list-style: none;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px 0 20px;
    height: ${headerHeight.desktop};
    border-bottom: ${({ open }) => open && `1px solid ${colors.dark}`};
`

const IconStyled = styled(ShevronIcon)<{ open: boolean }>`
    width: 10px;
    fill: ${({ open }) => (open ? colors.white : colors.dark)};
    padding: 6px;
    transform: ${({ open }) => open && 'rotate(180deg)'};
    cursor: pointer;
`
const activeClassName = 'active'
const LinkStyled = styled(Link).attrs({
    activeClassName,
})<{ open: boolean }>`
    color: ${({ open }) => (open ? colors.white : colors.dark)};
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 19px;
    animation: 0.1s fadeIn ease-in;
    @keyframes fadeIn {
        0% {
            font-size: 0;
        }
        100% {
            font-size: 14px;
        }
    }
    :hover {
        text-decoration: underline;
    }
`
const Wrapper = styled.div`
    position: absolute;
    left: 0;
    top: ${headerHeight.desktop};
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const LanguageSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { i18n } = useTranslation()
    const { getPagePath } = usePagePath()

    return (
        <LanguageList open={isOpen}>
            <LanguageList open={isOpen}>
                <LangItem onClick={() => setIsOpen(!isOpen)} open={isOpen}>
                    <LinkStyled to={getPagePath(i18n.language)} open={isOpen}>
                        {languages[i18n.language].label}
                    </LinkStyled>
                    <IconStyled open={isOpen} />
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
                                <LangItem open={isOpen} key={lang}>
                                    <LinkStyled
                                        open={!isOpen}
                                        to={path}
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
