import { useLocation } from '@reach/router'
import { useTranslation } from 'react-i18next'
import { languages } from 'i18n/languages'
import path from 'path-browserify'
import { withPrefix } from 'gatsby'
export const usePagePath = () => {
    const { i18n } = useTranslation()
    const location = useLocation()

    const getPagePath = (lang: string) => {
        const pagePath = languages[i18n.language].isDefault
            ? location.pathname.replace(withPrefix('/'), '')
            : location.pathname.replace(withPrefix('/'), '').slice(3)
        const pathPrefix = languages[lang].isDefault ? '/' : `/${lang}`
        const joinedPath = path.join('/', pathPrefix, pagePath, '/')
        return joinedPath
    }
    return { getPagePath }
}
