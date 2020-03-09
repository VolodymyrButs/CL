import React from "react"
import { Link, withPrefix } from "gatsby"
import { useLocation } from "@reach/router"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import { languages } from "./languages"
const languagesList = Object.keys(languages)

const activeClassName = "active"
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
    return (
        <>
            {languagesList.map(lang => {
                const getPagePath = () => {
                    if (languages[i18n.language].isDefault) {
                        return location.pathname.replace(withPrefix(""), "")
                    }
                    return location.pathname
                        .replace(withPrefix(""), "")
                        .slice(3)
                }
                const pathPrefix = languages[lang].isDefault ? "/" : `/${lang}`

                return (
                    <li key={lang}>
                        <LinkStyled to={`${pathPrefix}/${getPagePath()}`}>
                            {languages[lang].label}
                        </LinkStyled>
                    </li>
                )
            })}
        </>
    )
}
