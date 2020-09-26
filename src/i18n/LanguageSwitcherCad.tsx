import React, { useState } from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { languages } from 'i18n/languages'
import ShevronIcon from 'assets/icons/ShevronDown.svg'
import { usePagePath } from 'hooks/usePagePath'
import { headerHeight } from 'styles/height'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'

const languagesList = Object.keys(languages)

const LanguageList = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${headerHeight.cad};
    height: ${headerHeight.cad};
    z-index: 3;
`
const LangItem = styled.div<{ open: boolean }>`
    display: flex;
    list-style: none;
    width: 100%;
    box-sizing: border-box;
    height: ${headerHeight.cad};
    background-color: ${({ open }) => open && colors.white};
`

const IconStyled = styled(ShevronIcon)<{ open: boolean }>`
    width: 10px;
    fill: ${colors.dark};
    ${({ open }) => (open ? 'padding-right:3px;' : 'padding-left: 3px;')};
    transform: ${({ open }) => open && 'rotate(180deg)'};
    cursor: pointer;
`
const activeClassName = 'active'
const LinkStyled = styled(Link).attrs({
    activeClassName,
})`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.dark};
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 15px;
    @media (min-width: ${displayWidth.tablet}) {
        :hover {
            text-decoration: underline;
        }
    }
`
const FakeLink = styled.span`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 15px;
    cursor: pointer;
    @media (min-width: ${displayWidth.tablet}) {
        :hover {
            text-decoration: underline;
        }
    }
`
const Wrapper = styled.div`
    position: absolute;
    left: 0;
    top: ${headerHeight.cad};
    width: ${headerHeight.cad};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const LanguageSwitcherCad = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { i18n } = useTranslation()
    const { getPagePath } = usePagePath()

    return (
        <LanguageList>
            <LanguageList>
                <LangItem onClick={() => setIsOpen(!isOpen)} open={isOpen}>
                    <FakeLink>
                        {languages[i18n.language].label}
                        <IconStyled open={isOpen} />
                    </FakeLink>
                </LangItem>
            </LanguageList>
            <Wrapper>
                {isOpen &&
                    languagesList
                        .filter((lang) => lang !== i18n.language)
                        .map((lang) => {
                            const langLabel = languages[lang].label
                            const path = getPagePath(lang)

                            return (
                                <LangItem open={isOpen} key={lang}>
                                    <LinkStyled
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
