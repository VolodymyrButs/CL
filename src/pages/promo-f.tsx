import { RunningLine } from 'components/RunningLine'

import { ProjectStructureNew } from 'blocks/ProjectStructureNew'

import { Faq } from 'blocks/FAQ/FAQ'

import { Reviews } from 'blocks/Reviews'

import { HelmetFunc } from 'components/PageMetaData'
import { PromoHeroMobile } from 'blocks/Heros/MobilePromoHeroNew'
import { PromoHeroNew } from 'blocks/Heros/PromoHeroNew'

import React, { useState } from 'react'
import styled, { css } from 'styled-components'

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
import { sendConversion, sendEvent } from 'tracking'
import { PhoneLink } from 'components/PhoneLink'
import { sendForm } from 'components/form/api'
import Proposal from 'assets/icons/proposal.svg'
import Pensile from 'assets/icons/pensile.svg'
import Handshake from 'assets/icons/handshake.svg'
import { ButtonWithModal } from 'components/ButtonWithModal'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Container } from 'components/Container'
import { ComercialForm } from 'components/form/CommercialForm'
import { Footer } from 'blocks/Footer'
import { CommercialProposalFormBlock } from 'blocks/CommercialProposalFormBlock'
import { Connection } from 'blocks/Connection'
import { ProjectStructure } from 'blocks/ProjectStructure'
import { Header } from 'blocks/Header/Header'

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
        border-top: 1px solid #000;
        top: 80px;
        height: calc(100vh - 80px);
        left: 0;
        right: 0;
        bottom: 60px;
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
        title: 'Дизайн проект квартири за $99',
        description:
            "Виконаємо дизайн проект інтер'єру усієї квартири за 99 доларів США",
    },
    ru: {
        title: 'Дизайн проект квартиры за $99',
        description:
            'Выполним дизайн проект интерьера всей квартиры за 99 долларов США',
    },
    en: {
        title: 'Apartment design for $99',
        description:
            'We will design the interior project of the entire apartment for 99 US dollars',
    },
}

const Block = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
    }
`
const CommunicationWrapper = styled.div<{ backgroundColors?: string }>`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${(props) =>
        props.backgroundColors
            ? props.backgroundColors
            : backgroundColors.formPromo};
    position: relative;
    border-bottom: 1px solid ${colors.dark};
    ${mobileAfterBorder}
    z-index:9;
`

const ContainerStyle = styled(Container)`
    margin: 30px 0;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 0;
        outline: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    @media (min-width: ${displayWidth.tablet}) {
        justify-content: space-between;
    }
`

const svgStyle = css`
    width: 40px;
    min-width: 40px;
    margin-right: 10px;
`
const HandshakeS = styled(Handshake)`
    ${svgStyle}
`
const PensileS = styled(Pensile)`
    ${svgStyle}
`
const ProposalS = styled(Proposal)`
    ${svgStyle}
`
const FormColumn = styled.div`
    position: relative;
    ${mobileAfterBorder};
    width: 100%;
    padding: 0 24px 30px;
    box-sizing: border-box;
    background-color: ${backgroundColors.formPromo};
    h3 {
        display: flex;
        align-items: center;
        font-size: 20px;
        line-height: 24px;
        padding: 10px 0;
    }
`
const DivS = styled.div`
    margin: 0 10px 30px;
`
const FormTitle = styled.div<{ text?: boolean }>`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;

    line-height: 40px;
    letter-spacing: 1px;
    ${({ text }) =>
        text === true
            ? `color:${colors.dark};font-size: 24px;`
            : `color: #437b13;font-size: 34px;`}

    text-align: center;
    padding: 40px 0 24px;
    white-space: pre-wrap;
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
        margin: 60px 0 24px;
        width: 350px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 100%;
    }
`

const Posadka = () => {
    const { t } = useTranslation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <div>
            <HelmetFunc data={pageMetadata} />
            <Wrap id="wrap">
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
                            sendForm(`PosadkaHeaderPhoneClick`, {})
                            sendConversion('PhoneClick')
                            sendEvent('Phone', {
                                eventCategory: 'PhoneClick',
                                placement: 'PosadkaHeader',
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
                        placement={'MobileMenuPosadka'}
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
                                    placement: 'PosadkaMobile',
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
                                    placement: 'PosadkaMobile',
                                })
                            }}
                        >
                            <WhatsappIconStyled aria-label="Whatsapp Button" />
                        </a>
                        <a
                            href="tg://resolve?domain=clearline_com_ua"
                            target="blank"
                        >
                            <TelegramIconStyled
                                aria-label="Telegram Button"
                                onClick={() => {
                                    sendForm(`PosadkaMobileTelegramIcon`, {})
                                    sendConversion('SocialIconTelegram')
                                    sendEvent('SocialIcon', {
                                        eventCategory: 'SocialIconTelegram',
                                        placement: 'PosadkaMobile',
                                    })
                                }}
                            />
                        </a>
                    </IconWrapper>
                </BottomIcons>

                <PromoHeroMobile />
                <Block>
                    <PromoHeroNew />
                </Block>

                <div id="projectStructure1" />
                <ProjectStructureNew />
                <CommunicationWrapper>
                    <ContainerStyle columns={'1fr'} tabletColumns={'1fr'}>
                        <ButtonWithModal
                            modalTitle={t('connection.modalTitle')}
                            modalDescription={t('connection.modalDescription')}
                            buttonLabel={t('writeToUs')}
                            placeholder={t('connection.placeholder')}
                            submitLabel={t('connection.submitLabel')}
                            tracking={{
                                conversionType: 'CallbackFromPosadkaMobile',
                                eventCategory: 'CallbackFromPosadkaMobile',
                            }}
                        />
                    </ContainerStyle>
                </CommunicationWrapper>

                <Reviews />
                <RunningLine inverse>{t('designProject99')}</RunningLine>
                <Faq />
                <FormColumn>
                    <FormTitle>{t('ComercialProposalFormTitle')}</FormTitle>

                    <DivS>
                        <h3>
                            <ProposalS /> {t('comercialForm.proposal')}
                        </h3>
                        <h3>
                            <PensileS />
                            {t('comercialForm.example')}
                        </h3>
                        <h3>
                            <HandshakeS /> {t('comercialForm.conditions')}
                        </h3>
                    </DivS>

                    <ComercialForm placement="Posadka" />
                </FormColumn>
                <Footer />
            </Wrap>

            <Desktop id="blockWrapper">
                <Header />
                <WrapDesktop>
                    <PromoHeroNew />
                    <RunningLine inverse>{t('designProject99')}</RunningLine>
                    <ProjectStructure />
                    <Reviews />

                    <RunningLine>{t('designProject99')}</RunningLine>

                    <Connection text={t('connection.text')}>
                        <ButtonWithModal
                            modalTitle={t('connection.modalTitle')}
                            modalDescription={t('connection.modalDescription')}
                            buttonLabel={t('connection.buttonLabel')}
                            placeholder={t('connection.placeholder')}
                            submitLabel={t('connection.submitLabel')}
                            tracking={{
                                conversionType: 'CallbackFromPosadka',
                                eventCategory: 'CallbackFromPosadka',
                            }}
                        />
                    </Connection>

                    <Faq />
                    <CommercialProposalFormBlock placement="Posadka" />
                    <Footer />
                </WrapDesktop>
            </Desktop>
        </div>
    )
}

export default Posadka
