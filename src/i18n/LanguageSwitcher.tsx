import React, { useState } from 'react'
import { Link, withPrefix } from 'gatsby'
import { useLocation } from '@reach/router'
import { useTranslation } from 'react-i18next'
import styled, { keyframes } from 'styled-components'

import { languages } from 'i18n/languages'
import ShevronIcon from 'assets/icons/ShevronDown.svg'

const languagesList = Object.keys(languages)

const fadeIn = keyframes`
  0% {
    font-size: 0;
  }
  100% {
     font-size: 14px;
  }`
const LanguageList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 80px;
`
const LangItem = styled.li`
    display: flex;
    align-items: center;
    list-style: none;
    padding: 3px 10px;
`

const IconStyled = styled(ShevronIcon)`
    width: 10px;
    color: #231f20;
    padding-left: 6px;
`
const activeClassName = 'active'
const LinkStyled = styled(Link).attrs({
    activeClassName,
})`
    color: gray;
    text-decoration: none;
    font-family: 'Open Sans';
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 19px;
    animation: 0.1s ${fadeIn} ease-in;
    :hover {
        text-decoration: underline;
    }
    &.${activeClassName} {
        color: #231f20;
    }
`

export const LanguageSwitcher = () => {
    const [isVisible, setIsVisible] = useState(false)
    const { i18n } = useTranslation()
    const location = useLocation()
    const getPagePath = languages[i18n.language].isDefault
        ? `${location.pathname.replace(withPrefix(''), '')}`
        : `${location.pathname.replace(withPrefix(''), '').slice(3)}`

    return (
        <LanguageList>
            {languagesList.map(lang => {
                const pathPrefix = languages[lang].isDefault ? '' : `/${lang}`
                const path = `${pathPrefix}/${getPagePath}`
                const langLabel = languages[lang].label

                if (!isVisible && lang === i18n.language) {
                    return (
                        <LangItem
                            key={lang}
                            onClick={() => setIsVisible(!isVisible)}
                        >
                            <LinkStyled to={path}>{langLabel}</LinkStyled>
                            <IconStyled />
                        </LangItem>
                    )
                } else if (isVisible === true) {
                    return (
                        <LangItem key={lang}>
                            <LinkStyled
                                to={path}
                                onClick={() => setIsVisible(!isVisible)}
                            >
                                {langLabel}
                            </LinkStyled>
                        </LangItem>
                    )
                }
                return null
            })}
        </LanguageList>
    )
}
