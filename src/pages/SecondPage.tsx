import React from "react"
import { useTranslation } from "react-i18next"

import { LocalizedLink } from "i18n/LocalizedLink"
import { About } from "blocks/About"
import { Header } from "blocks/Header"

const SecondPage = () => {
    const { t } = useTranslation()

    return (
        <div>
            <Header />
            <About />
            <LocalizedLink to="/">{t("hi")}</LocalizedLink>
        </div>
    )
}

export default SecondPage
