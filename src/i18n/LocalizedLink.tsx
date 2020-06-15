/* eslint-disable no-console */
import React from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'
import path from 'path-browserify'
import { languages } from 'i18n/languages'

interface ILocalizedLinkProps {
    to: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

export const LocalizedLink: React.FC<ILocalizedLinkProps> = ({
    to,
    ...props
}) => {
    const { i18n } = useTranslation()
    const { isDefault, pathPrefix } = languages[i18n.language]
    const pathIsDefault = path.join('/', to, '/')
    const pathNotDefault = path.join('/', pathPrefix, to, '/')
    const pathTo = isDefault ? pathIsDefault : pathNotDefault
    return <Link {...props} to={pathTo} />
}
