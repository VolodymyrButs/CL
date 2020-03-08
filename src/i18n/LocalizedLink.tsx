import React from "react"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"

import { languages } from "i18n/languages"

interface ILocalizedLinkProps {
    to: string
}

export const LocalizedLink: React.FC<ILocalizedLinkProps> = ({
    to,
    ...props
}) => {
    const { i18n } = useTranslation()
    const { isDefault, pathPrefix } = languages[i18n.language]
    const pathTo = isDefault ? to : `/${pathPrefix}/${to}`

    return <Link {...props} to={pathTo} />
}
