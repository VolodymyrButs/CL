import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

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
    return (
        <Helmet>
            <title>{langData.title} - Clearline</title>
            <meta name="description" content={langData.description} />
        </Helmet>
    )
}
