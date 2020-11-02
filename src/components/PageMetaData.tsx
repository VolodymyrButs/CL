import { usePagePath } from 'hooks/usePagePath'
import { languages } from 'i18n/languages'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const languagesList = Object.keys(languages)

export const HelmetFunc = ({
    data,
}: {
    data: {
        [x: string]: {
            title: string
            description: string
        }
    }
}) => {
    const { i18n } = useTranslation()
    const langData = data[i18n.language]
    const { getPagePath } = usePagePath()
    return (
        <Helmet>
            <title>{langData.title} - Clearline</title>
            <meta name="description" content={langData.description} />
            <html lang={i18n.language} />
            {languagesList.map((lang) => {
                return (
                    <link
                        key={lang}
                        rel="alternate"
                        hrefLang={lang}
                        href={
                            `https://clearline.com.ua/new${  getPagePath(lang)}`
                        }
                    />
                )
            })}
        </Helmet>
    )
}
