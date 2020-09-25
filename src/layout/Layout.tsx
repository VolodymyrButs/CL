import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

import { Header } from 'blocks/Header/Header'
import { Footer } from 'blocks/Footer'
import { languages } from 'i18n/languages'
import { usePagePath } from 'hooks/usePagePath'
import { displayWidth } from 'styles/width'
import { CallbackButton } from 'components/CallbackButton'
import { contactInformation } from 'components/contactInformation'
import { useStaticQuery, graphql } from 'gatsby'
import { getDataByLanguage } from 'utils/getDataByLanguage'

const LayoutWraper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
`
const BlocksWrapper = styled.div`
    position: absolute;
    width: 100%;
    top: 65px;
    bottom: 0;
    overflow-y: auto;
    box-sizing: content-box;
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scroll-behavior: smooth;
    @media (min-width: ${displayWidth.tablet}) {
        top: 80px;
    }
`
const languagesList = Object.keys(languages)
export const Layout = (props: { children: React.ReactNode }) => {
    const { i18n } = useTranslation()
    const { getPagePath } = usePagePath()
    const data = useStaticQuery(graphql`
        query {
            allAddressYaml {
                edges {
                    node {
                        companyName
                        street
                        city
                        parent {
                            ... on File {
                                name
                            }
                        }
                    }
                }
            }
            allReviewsYaml {
                edges {
                    node {
                        rating
                        bestRating
                        worstRating
                        reviewsArr {
                            text
                            name
                        }
                        parent {
                            ... on File {
                                name
                            }
                        }
                    }
                }
            }
        }
    `)

    const commonData = data.allReviewsYaml.edges.find(
        (elem: { node: { parent: { name: string } } }) => {
            return elem.node.parent.name === 'reviews'
        }
    ).node

    const { rating, bestRating, worstRating, reviewsArr } = commonData
    const addressData = getDataByLanguage(data.allAddressYaml, i18n.language)

    const { companyName, street, city } = addressData

    const reviewData = reviewsArr.map(
        (item: { name: string; text: string }) => {
            return {
                '@type': 'Review',
                author: `${item.name}`,
                name: `${item.name}`,
                reviewBody: `${item.text.replace(/<[^>]*>/g, '')}`,
                reviewRating: {
                    '@type': 'Rating',
                    bestRating: `${bestRating}`,
                    ratingValue: `${rating}`,
                    worstRating: `${worstRating}`,
                },
            }
        }
    )

    return (
        <LayoutWraper>
            <Helmet>
                <html lang={i18n.language} />
                <title>ClearLine</title>
                {languagesList.map((lang) => {
                    return (
                        <link
                            key={lang}
                            rel="alternate"
                            hrefLang={lang}
                            href={getPagePath(lang)}
                        />
                    )
                })}
                <meta name="description" content="Clearline" />
                <script type="application/ld+json">
                    {`{
                        "@context": "https://schema.org/",
                            "@type": "Organization",
                            "url": "https://clearline.gitlab.io/cl-website/",
                            "logo": "https://clearline.gitlab.io/cl-website/email-logo.jpg",
                            "geo": {
                                    "@type": "GeoCoordinates",
                                    "latitude": 50.440771,
                                    "longitude": 30.507301
                            },
                            "image": "https://clearline.gitlab.io/cl-website/email-logo.jpg",
                            "name": "${companyName}",
                            "telephone": "${contactInformation.primaryPhone}",
                            "address" :{
                            "@type": "PostalAddress",
                            "streetAddress": "${street}",
                            "addressLocality": "${city}"
                        },
                        "reviewRating": {
                            "@type": "Rating",
                            "bestRating": "${bestRating}",
                            "ratingValue": "${rating}",
                            "worstRating": "${worstRating}"
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "${rating}",
                            "reviewCount": "70"
                        },
                          "review": ${JSON.stringify(reviewData)}
                        }`}
                </script>
            </Helmet>
            <Header />
            <BlocksWrapper id="blockWrapper">
                {props.children}
                <Footer />
            </BlocksWrapper>
            <CallbackButton />
        </LayoutWraper>
    )
}
