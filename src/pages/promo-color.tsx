import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { RunningLine } from 'components/RunningLine'

import { Reviews } from 'blocks/Reviews'

import { HelmetFunc } from 'components/PageMetaData'

import { LanguageSwitcher } from 'i18n/LanguageSwitcher'
import ExitSvg from 'assets/icons/Exit.svg'
import BurgerSvg from 'assets/icons/Burger.svg'
import { backgroundColors, colors } from 'styles/colors'
import { Logo } from 'components/Logo'
import { displayWidth } from 'styles/width'
import { MainMenu } from 'blocks/Header/MainMenu'
import { contactInformation } from 'components/contactInformation'
import { headerHeight } from 'styles/height'
import Viber from 'assets/icons/Viber.svg'
import Telegram from 'assets/icons/Telegram.svg'
import Whatsapp from 'assets/icons/Whatsapp.svg'
import { RoundText } from 'components/RoundText'
import { PhoneSvgAnimated } from 'components/PhoneSvgAnimated'
import { useTranslation } from 'react-i18next'

import { PhoneLink } from 'components/PhoneLink'
import { sendForm } from 'components/form/api'
import { Header } from 'blocks/Header/Header'
import { PromoHeroMobile3d } from 'blocks/Heros/PromoHeroMobile3d'
import { AdvantagesServices } from 'blocks/AdvantagesService'
import { SelectionOfPaintsPosadka } from 'blocks/SelectionOfPaintPosadka'
import { PromoHeroColor } from 'blocks/Heros/PromoHeroColor'
import { graphql } from 'gatsby'
import { sendConversion, sendEvent, gtag } from 'tracking'
import { DefaultFormBlock } from 'blocks/DefaultFormBlock'
import { usePagePath } from 'hooks/usePagePath'

const MobileHeaderWraper = styled.div<{ isMenuOpen: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 65px;
    z-index: 10;
    background-color: ${({ isMenuOpen }) =>
        isMenuOpen ? colors.dark : backgroundColors.contact};

    border-bottom: 1px solid
        ${({ isMenuOpen }) => (isMenuOpen ? colors.white : colors.dark)};
    > a {
        display: flex;
        align-items: center;
        text-decoration: none;
        height: inherit;
        color: ${colors.dark};
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 28px;
        margin-right: 20px;
        white-space: nowrap;
    }
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`
const MobileMenu = styled.div<{ isMenuOpen: boolean }>`
    position: fixed;
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: space-between;
    top: 66px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`
const BurgerButton = styled.span`
    width: ${headerHeight.mobile};
    height: ${headerHeight.mobile};
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-right: 10px;
    cursor: pointer;
`

const BottomIcons = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    height: 60px;
    width: 100%;
    z-index: 10;
    background-color: ${backgroundColors.formPromo};
    display: flex;
    align-items: center;
    border-top: 1px solid #000;
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`
const PhoneLinkStyled = styled(PhoneLink)`
    display: flex;
    flex-direction: column;
    color: ${colors.white};
    margin-bottom: 80px;
    font-weight: normal;
    svg {
        fill: ${colors.white};
    }
`

const Desktop = styled.div`
    position: relative;
    display: none;
    width: 100%;
    height: 100%;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
    }
`
const Wrap = styled.div`
    top: 66px;
    height: calc(100vh - 126px);
    left: 0;
    right: 0;
    bottom: 60px;
    position: absolute;
    overflow: auto;
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`
const WrapDesktop = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        top: 80px;
        height: calc(100vh - 20px);
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        overflow: auto;
    }
`
const iconStyles = css`
    width: 38px;
    height: 38px;
    margin: 4px 13px;
    cursor: pointer;
    pointer-events: auto;
`
const ViberIconStyled = styled(Viber)`
    ${iconStyles};
    fill: ${colors.viber};
`
const TelegramIconStyled = styled(Telegram)`
    ${iconStyles};
    fill: ${colors.telegram};
`
const WhatsappIconStyled = styled(Whatsapp)`
    ${iconStyles};
    fill: ${colors.whatsapp};
`
const IconWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    padding-right: 13px;
`

const pageMetadata = {
    uk: {
        title: 'Підбір кольорів і текстур в дизайні інтер`єру',
        description:
            "Дизайнер підбере кольори і текстури для вашого інтер'єру на консультації в офісі",
    },
    ru: {
        title: 'Подбор цветов и текстур в дизайне интерьера',
        description:
            'Дизайнер подберет цвета и текстуры для вашего интерьера на консультации в офисе',
    },
    en: {
        title: 'Selection of colors and textures in interior design',
        description:
            'The designer will select colors and textures for your interior for consultation in the office',
    },
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const PosadkaColor = ({ data }: { data: any }) => {
    const { t } = useTranslation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { i18n } = useTranslation()

    const { getPagePath } = usePagePath()
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
        gtag('config', `${process.env.GA_ID}`, {
            // eslint-disable-next-line camelcase
            page_location: document.location,
        })
    }, [pagePath])

    const onScroll = () => {
        const block = document.getElementById('blockColor')
        const scrollPosition = block!.scrollTop
        const windowHeight = block!.clientHeight
        const bodyHeight = block!.scrollHeight
        const blockMod = document.getElementById('wrap')
        const scrollPositionMob = blockMod!.scrollTop
        const windowHeightMob = blockMod!.clientHeight
        const bodyHeightMob = blockMod!.scrollHeight
        setTimeout(() => {
            const trackScroll = () => {
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
            const trackScrollMob = () => {
                const scrolledRationMob = Math.ceil(
                    ((scrollPositionMob + windowHeightMob) / bodyHeightMob) *
                        100
                )
                if (
                    block &&
                    !scrolled100Send!.current &&
                    scrolledRationMob >= 100
                ) {
                    sendEvent('100', {
                        eventCategory: 'ScrollDepth',
                    })
                    scrolled100Send!.current = true
                    return
                }

                if (
                    block &&
                    !scrolled75Send!.current &&
                    scrolledRationMob >= 75
                ) {
                    sendEvent('75', {
                        eventCategory: 'ScrollDepth',
                    })
                    scrolled75Send!.current = true
                    return
                }

                if (
                    block &&
                    !scrolled50Send!.current &&
                    scrolledRationMob >= 50
                ) {
                    sendEvent('50', {
                        eventCategory: 'ScrollDepth',
                    })
                    scrolled50Send!.current = true
                    return
                }

                if (
                    block &&
                    !scrolled25Send!.current &&
                    scrolledRationMob >= 25
                ) {
                    sendEvent('25', {
                        eventCategory: 'ScrollDepth',
                    })
                    scrolled25Send!.current = true
                }
            }
            trackScrollMob()
            trackScroll()
        }, 700)
    }
    return (
        <div>
            <HelmetFunc data={pageMetadata} />
            <Wrap id="wrap" onScroll={onScroll}>
                <MobileHeaderWraper isMenuOpen={isMenuOpen}>
                    <Logo />
                    <BurgerButton
                        onClick={() => {
                            setIsMenuOpen(!isMenuOpen)
                        }}
                    >
                        <BurgerSvg fill={colors.dark} />
                    </BurgerButton>
                    <a
                        href={'tel:+380982117690'}
                        onClick={() => {
                            sendForm(`PosadkaHeaderPhoneClickColor`, {})
                            sendConversion('PhoneClick')
                            sendEvent('Phone', {
                                eventCategory: 'PhoneClick',
                                placement: 'PosadkaHeaderColor',
                            })
                        }}
                    >
                        +38 098 211 76 90
                    </a>
                </MobileHeaderWraper>
                <MobileMenu isMenuOpen={isMenuOpen}>
                    <MobileHeaderWraper isMenuOpen={isMenuOpen}>
                        <LanguageSwitcher closeMenu={setIsMenuOpen} />
                        <BurgerButton
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen)
                            }}
                        >
                            <ExitSvg fill={colors.white} />
                        </BurgerButton>
                    </MobileHeaderWraper>

                    <MainMenu onMenuItemClick={() => setIsMenuOpen(false)} />
                    <PhoneLinkStyled
                        phone={contactInformation.primaryPhone}
                        placement={'MobileMenuPosadkaColor'}
                    >
                        <RoundText color={colors.white} text={t('callUs')}>
                            <PhoneSvgAnimated color={colors.white} />
                        </RoundText>
                    </PhoneLinkStyled>
                </MobileMenu>
                <BottomIcons>
                    <IconWrapper>
                        <a
                            href="viber://chat?number=%2B380982117690"
                            target="blank"
                            onClick={() => {
                                sendForm(`PosadkaMobileViberIcon`, {})
                                sendConversion('SocialIconViber')
                                sendEvent('SocialIcon', {
                                    eventCategory: 'SocialIconViber',
                                    placement: 'PosadkaMobile3d',
                                })
                            }}
                        >
                            <ViberIconStyled aria-label="ViberButton" />
                        </a>
                        <a
                            href="https://wa.me/+380958363420"
                            target="blank"
                            onClick={() => {
                                sendForm(`PosadkaMobileWhatsAppIcon`, {})
                                sendConversion('SocialIconWhatsApp')
                                sendEvent('SocialIcon', {
                                    eventCategory: 'SocialIconWhatsApp',
                                    placement: 'PosadkaMobile3d',
                                })
                            }}
                        >
                            <WhatsappIconStyled aria-label="Whatsapp Button" />
                        </a>
                        <a
                            href="tg://resolve?domain=ClearLine_bot"
                            target="blank"
                        >
                            <TelegramIconStyled
                                aria-label="Telegram Button"
                                onClick={() => {
                                    sendForm(`PosadkaMobileTelegramIcon`, {})
                                    sendConversion('SocialIconTelegram')
                                    sendEvent('SocialIcon', {
                                        eventCategory: 'SocialIconTelegram',
                                        placement: 'PosadkaMobile3d',
                                    })
                                }}
                            />
                        </a>
                    </IconWrapper>
                </BottomIcons>
                <PromoHeroMobile3d />
                <SelectionOfPaintsPosadka imagesData={data} />
                <AdvantagesServices imagesData={data} imgNot />

                <RunningLine inverse>{t('designProject99')}</RunningLine>

                <PromoHeroMobile3d text />
            </Wrap>

            <Desktop id="blockColor" onScroll={onScroll}>
                <Header />
                <WrapDesktop>
                    <PromoHeroColor imagesData={data} />
                    <RunningLine inverse>{t('designProject99')}</RunningLine>
                    <SelectionOfPaintsPosadka imagesData={data} />
                    <div id="selectionOfPaintPosadka" />
                    <AdvantagesServices imagesData={data} />
                    <Reviews />
                    <RunningLine>{t('designProject99')}</RunningLine>
                    <DefaultFormBlock
                        textTitle
                        withPhoneMobile
                        tracking={{
                            conversionType: 'PosadkaColor',
                            eventCategory: 'PosadkaColor',
                        }}
                    />
                </WrapDesktop>
            </Desktop>
        </div>
    )
}

export default PosadkaColor

export const query = graphql`
    query {
        allImageSharp {
            edges {
                node {
                    fluid(srcSetBreakpoints: [400]) {
                        originalName
                        ...GatsbyImageSharpFluid
                    }
                    parent {
                        ... on File {
                            name
                        }
                    }
                }
            }
        }
        allFaqColorYaml {
            edges {
                node {
                    title
                    image
                    subTitle
                    buttonTextOpen
                    buttonTextClose
                    questions {
                        question
                        answer
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
`
