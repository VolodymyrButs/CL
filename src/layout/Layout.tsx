import React, { useEffect, useRef } from 'react'
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
import { sendEvent } from 'tracking'

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
    const scrolled25Send = useRef(false)
    const scrolled50Send = useRef(false)
    const scrolled75Send = useRef(false)
    const scrolled100Send = useRef(false)

    const pagePath = getPagePath(i18n.language)

    // Reset scroll event when page changes
    useEffect(() => {
        scrolled25Send.current = false
        scrolled50Send.current = false
        scrolled75Send.current = false
        scrolled100Send.current = false
    }, [pagePath])

    scrolled25Send.current = true
    const onScroll = () => {
        setTimeout(() => {
            const trackScroll = () => {
                const block = document.getElementById('blockWrapper')
                const scrollPosition = block!.scrollTop
                const windowHeight = block!.clientHeight
                const bodyHeight = block!.scrollHeight
                const scrolledRation = Math.ceil(
                    ((scrollPosition + windowHeight) / bodyHeight) * 100
                )
                if (
                    block &&
                    !scrolled100Send!.current &&
                    scrolledRation >= 100
                ) {
                    sendEvent('100', {
                        eventCategory: 'ScrollDepth',
                    })
                    scrolled100Send!.current = true
                    return
                }

                if (block && !scrolled75Send!.current && scrolledRation >= 75) {
                    sendEvent('75', {
                        eventCategory: 'ScrollDepth',
                    })
                    scrolled75Send!.current = true
                    return
                }

                if (block && !scrolled50Send!.current && scrolledRation >= 50) {
                    sendEvent('50', {
                        eventCategory: 'ScrollDepth',
                    })
                    scrolled50Send!.current = true
                    return
                }

                if (block && !scrolled25Send!.current && scrolledRation >= 25) {
                    sendEvent('25', {
                        eventCategory: 'ScrollDepth',
                    })
                    scrolled25Send!.current = true
                }
            }
            trackScroll()
        }, 700)
    }
    return (
        <LayoutWraper>
            <Helmet>
                <html lang={i18n.language} />
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
            <BlocksWrapper id="blockWrapper" onScroll={onScroll}>
                {props.children}
                <Footer />
            </BlocksWrapper>
            <CallbackButton
                tracking={{
                    conversionType: 'CallBackButtonForm',
                    eventCategory: 'CallBackButtonForm',
                }}
            />
        </LayoutWraper>
    )
}
