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

const LayoutWraper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
`
const BlocksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    return (
        <LayoutWraper>
            <Helmet>
                <html lang={i18n.language} />
                <title>Page name</title>
                {languagesList.map(lang => {
                    return (
                        <link
                            key={lang}
                            rel="alternate"
                            hrefLang={lang}
                            href={getPagePath(lang)}
                        />
                    )
                })}
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Yeseva+One&display=swap"
                    rel="stylesheet"
                ></link>
                <meta name="description" content="Clearline" />
            </Helmet>
            <Header />
            <BlocksWrapper id="blockWrapper">
                <div>{props.children}</div>
                <CallbackButton />
                <Footer />
            </BlocksWrapper>
        </LayoutWraper>
    )
}
