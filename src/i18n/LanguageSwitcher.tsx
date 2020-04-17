import React from 'react'
import { Link, withPrefix } from 'gatsby'
import { useLocation } from '@reach/router'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { languages } from 'i18n/languages'

const languagesList = Object.keys(languages)

const activeClassName = 'active'
const LinkStyled = styled(Link).attrs({
    activeClassName,
})`
    color: #000;
    text-decoration: none;
    :hover {
        color: #a1a1a1;
    }
    &.${activeClassName} {
        color: #777;
    }
`

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation()
    const location = useLocation()
    const getPagePath = languages[i18n.language].isDefault
        ? `${location.pathname.replace(withPrefix(''), '')}`
        : `${location.pathname.replace(withPrefix(''), '').slice(3)}`

    return (
        <>
            {languagesList.map(lang => {
                const pathPrefix = languages[lang].isDefault ? '' : `/${lang}`
                const path = `${pathPrefix}/${getPagePath}`
                const langLabel = languages[lang].label

                return (
                    <li key={lang}>
                        <LinkStyled to={path}>{langLabel}</LinkStyled>
                    </li>
                )
            })}
        </>
    )
}
