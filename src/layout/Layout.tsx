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
                <title>ClearLine</title>
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
                <meta name="description" content="Clearline" />
                {/* <script type="application/ld+json">
    {
     JSON.stringify( '@context': 'https://schema.org',
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What is the return policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most unopened items in new condition and returned within <strong>90 days</strong> will receive a refund or exchange. Some items have a modified return policy noted on the receipt or packing slip. Items that are opened or damaged or do not have a receipt may be denied a refund or exchange. Items purchased online or in-store may be returned to any store.<br /><p>Online purchases may be returned via a major parcel carrier. <a href=http://example.com/returns> Click here </a> to initiate a return.</p>"
        }
      }, {
        "@type": "Question",
        "name": "How long does it take to process a refund?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We will reimburse you for returned items in the same way you paid for them. For example, any amounts deducted from a gift card will be credited back to a gift card. For returns by mail, once we receive your return, we will process it within 4–5 business days. It may take up to 7 days after we process the return to reflect in your account, depending on your financial institution's processing time."
        }
      }, {
        "@type": "Question",
        "name": "What is the policy for late/non-delivery of items ordered online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our local teams work diligently to make sure that your order arrives on time, within our normaldelivery hours of 9AM to 8PM in the recipient's time zone. During  busy holiday periods like Christmas, Valentine's and Mother's Day, we may extend our delivery hours before 9AM and after 8PM to ensure that all gifts are delivered on time. If for any reason your gift does not arrive on time, our dedicated Customer Service agents will do everything they can to help successfully resolve your issue. <br/> <p><a href=https://example.com/orders/>Click here</a> to complete the form with your order-related question(s).</p>"
        }
      }, {
        "@type": "Question",
        "name": "When will my credit card be charged?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We'll attempt to securely charge your credit card at the point of purchase online. If there's a problem, you'll be notified on the spot and prompted to use another card. Once we receive verification of sufficient funds, your payment will be completed and transferred securely to us. Your account will be charged in 24 to 48 hours."
        }
      }, {
        "@type": "Question",
        "name": "Will I be charged sales tax for online orders?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":"Local and State sales tax will be collected if your recipient's mailing address is in: <ul><li>Arizona</li><li>California</li><li>Colorado</li></ul>"}
        }])
    }
    </script> */}
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
