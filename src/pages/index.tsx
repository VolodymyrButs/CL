import React from "react"
import { useTranslation } from "react-i18next"

import { LocalizedLink } from "i18n/LocalizedLink"
import { Header } from "blocks/Header"

const IndexPage = () => {
    const { t } = useTranslation()

    return (
        <>
            <Header />
            <h1>{t("hi")}</h1>
            <LocalizedLink to="/SecondPage/">page2</LocalizedLink>
        </>
    )
}

export default IndexPage
