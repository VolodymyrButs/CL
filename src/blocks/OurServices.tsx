import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import { backgroundColors, colors } from 'styles/colors'
import { Container } from 'components/Container'
import { useTranslation } from 'react-i18next'
import { Button } from 'components/Button'
import { LocalizedLink, LocalizedLinkAnchor } from 'i18n/LocalizedLink'
import { displayWidth } from 'styles/width'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { indent } from 'styles/indent'
import { sendEvent } from 'tracking'

const OurServicesWrapper = styled.div`
    width: 100%;
    background-color: ${backgroundColors.index};
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        justify-content: center;
        outline: 1px solid ${colors.dark};
        border-bottom: 1px solid ${colors.dark};
    }
`
const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    box-sizing: border-box;
    position: relative;
    border-bottom: 1px solid ${colors.dark};
    z-index: 1;
    @media (min-width: ${displayWidth.tablet}) {
        justify-content: space-between;
        border-bottom: none;
        padding: 16px;
        outline: 1px solid ${colors.dark};
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: 16px 32px;
    }
    :after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: ${indent.mobile};
        right: ${indent.mobile};
        border-left: 1px solid ${colors.dark};
        border-right: 1px solid ${colors.dark};
        content: '';
        z-index: -1;
        @media (min-width: ${displayWidth.tablet}) {
            border-left: none;
            border-right: none;
        }
    }
`
const PromoBlock = styled(Block)`
    background-color: ${backgroundColors.promotion};
`
const CadBlock = styled(Block)`
    background-color: ${colors.white};
`
const FaqBlock = styled(Block)`
    background-color: ${backgroundColors.contact};
`
const Title = styled.h2`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-size: 28px;
    line-height: 32px;
    letter-spacing: 1px;
    margin-top: 24px;
    text-align: center;
    color: ${colors.darkText};
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 34px;
        line-height: 39px;
        letter-spacing: 1.68px;
    }
`
const Price = styled.p`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 64px;
    line-height: 74px;
    letter-spacing: 0.888889px;
    color: ${colors.accentText};
    margin: 0;
`
const SubTitle = styled.h3`
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 0.4px;
    color: ${colors.dark};
    margin-top: 10px;
    strong {
        font-weight: bold;
    }
    a {
        color: ${colors.dark};
    }
    p,
    li {
        text-align: center;
    }
    ol,
    ul {
        margin-left: 1em;
    }
    ol {
        list-style: decimal;
    }
`
const ButtonStyled = styled(Button)`
    width: 264px;
    margin: 50px auto;
    z-index: 3;
    @media (max-width: 330px) {
        width: 250px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        width: 220px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 264px;
    }
`
export const OurServices = () => {
    const { i18n, t } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allOurServicesYaml {
                edges {
                    node {
                        titlePromo
                        pricePromo
                        subTitlePromo
                        buttonTextPromo
                        titleCad
                        subTitleCad
                        buttonTextCad
                        titleFaq
                        subTitleFaq
                        buttonTextFaq
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
    const allOurServicesData = getDataByLanguage(
        data.allOurServicesYaml,
        i18n.language
    )

    return (
        <>
            <OurServicesWrapper>
                <Container columns={'1fr'} tabletColumns={'1fr 1fr 1fr'}>
                    <PromoBlock>
                        <Title>
                            {allOurServicesData.titlePromo}
                            <Price>{allOurServicesData.pricePromo}</Price>
                        </Title>
                        <SubTitle>{allOurServicesData.subTitlePromo}</SubTitle>
                        <LocalizedLink
                            to={'/promo'}
                            onClick={() => {
                                sendEvent('Click', {
                                    eventCategory: 'ShowMoreButton',
                                    placement: 'Our Services',
                                    target: 'Promo',
                                })
                            }}
                        >
                            <ButtonStyled aria-label={(t('goTo'), t('promo'))}>
                                {allOurServicesData.buttonTextPromo}
                            </ButtonStyled>
                        </LocalizedLink>
                    </PromoBlock>
                    <CadBlock>
                        <Title>{allOurServicesData.titleCad}</Title>
                        <SubTitle
                            dangerouslySetInnerHTML={{
                                __html: allOurServicesData.subTitleCad,
                            }}
                        />
                        <LocalizedLink
                            to={'/editor'}
                            onClick={() => {
                                sendEvent('Click', {
                                    eventCategory: 'ShowMoreButton',
                                    placement: 'Our Services',
                                    target: 'CAD',
                                })
                            }}
                        >
                            <ButtonStyled aria-label={(t('goTo'), t('cad'))}>
                                {allOurServicesData.buttonTextCad}
                            </ButtonStyled>
                        </LocalizedLink>
                    </CadBlock>
                    <FaqBlock>
                        <Title>{allOurServicesData.titleFaq}</Title>
                        <SubTitle>{allOurServicesData.subTitleFaq}</SubTitle>
                        <LocalizedLinkAnchor
                            to={'promo/#faq'}
                            onClick={() => {
                                sendEvent('Click', {
                                    eventCategory: 'ShowMoreButton',
                                    placement: 'Our Services',
                                    target: 'FAQ',
                                })
                            }}
                        >
                            <ButtonStyled aria-label={(t('goTo'), t('promo'))}>
                                {allOurServicesData.buttonTextFaq}
                            </ButtonStyled>
                        </LocalizedLinkAnchor>
                    </FaqBlock>
                </Container>
            </OurServicesWrapper>
        </>
    )
}
