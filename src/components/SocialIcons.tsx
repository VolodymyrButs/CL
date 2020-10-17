import React from 'react'
import styled from 'styled-components'

import ViberIcon from 'assets/icons/Viber.svg'
import TelegramIcon from 'assets/icons/Telegram.svg'
import WhatsappIcon from 'assets/icons/Whatsapp.svg'
import InstagramIcon from 'assets/icons/Instagram.svg'
import FacebookIcon from 'assets/icons/Facebook.svg'
import { displayWidth } from 'styles/width'
import { sendConversion, sendEvent } from 'tracking'
import { sendForm } from './form/api'
import { colors } from 'styles/colors'

const SocialIconsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    box-sizing: border-box;
    @media (min-width: ${displayWidth.desktop}) {
        justify-content: space-between;
    }
`
const ViberIconS = styled(ViberIcon)<{ fill: string }>`
    fill: ${(props) => props.fill};
    margin: 0 5px;
    :hover {
        fill: ${colors.viber};
    }
`
const TelegramIconS = styled(TelegramIcon)<{ fill: string }>`
    fill: ${(props) => props.fill};
    margin: 0 5px;
    :hover {
        fill: ${colors.telegram};
    }
`
const WhatsappIconS = styled(WhatsappIcon)<{ fill: string }>`
    fill: ${(props) => props.fill};
    margin: 0 5px;
    :hover {
        fill: ${colors.whatsapp};
    }
`
const InstagramIconS = styled(InstagramIcon)<{ fill: string }>`
    fill: ${(props) => props.fill};
    margin: 0 5px;
    :hover {
        fill: ${colors.insta};
    }
`
const FacebookIconS = styled(FacebookIcon)<{ fill: string }>`
    fill: ${(props) => props.fill};
    margin: 0 5px;
    :hover {
        fill: ${colors.facebook};
    }
`
interface ISocialIconsProps {
    fill: string
    showAllIcons?: Boolean
    placement: string
}

export const SocialIcons: React.FC<ISocialIconsProps> = ({
    fill,
    showAllIcons,
    placement,
}) => {
    return (
        <SocialIconsWrapper>
            <a
                href="viber://chat?number=%2B380982117690"
                target="blank"
                onClick={() => {
                    sendForm(`${placement}ViberIcon`, {})
                    sendConversion('SocialIconViber')
                    sendEvent('SocialIcon', {
                        eventCategory: 'SocialIconViber',
                        placement,
                    })
                }}
            >
                <ViberIconS aria-label="ViberButton" fill={fill} />
            </a>
            <a
                href="tg://resolve?domain=clearline_com_ua"
                target="blank"
                onClick={() => {
                    sendForm(`${placement}TelegramIcon`, {})
                    sendConversion('SocialIconTelegram')
                    sendEvent('SocialIcon', {
                        eventCategory: 'SocialIconTelegram',
                        placement,
                    })
                }}
            >
                <TelegramIconS aria-label="Telegram Button" fill={fill} />
            </a>
            <a
                href="https://wa.me/+380958363420"
                target="blank"
                onClick={() => {
                    sendForm(`${placement}WhatsappIcon`, {})
                    sendConversion('SocialIconWhatsApp')
                    sendEvent('SocialIcon', {
                        eventCategory: 'SocialIconWhatsApp',
                        placement,
                    })
                }}
            >
                <WhatsappIconS aria-label="Whatsapp Button" fill={fill} />
            </a>
            {showAllIcons && (
                <>
                    <a
                        href="https://www.instagram.com/clear_line/"
                        target="blank"
                        onClick={() => {
                            sendForm(`${placement}InstagramIcon`, {})
                            sendConversion('SocialIconInstagram')
                            sendEvent('SocialIcon', {
                                eventCategory: 'SocialIconInstagram',
                                placement,
                            })
                        }}
                    >
                        <InstagramIconS
                            aria-label="Instagram Button"
                            fill={fill}
                        />
                    </a>
                    <a
                        href="https://www.facebook.com/clearline.com.ua/"
                        target="blank"
                        onClick={() => {
                            sendForm(`${placement}FacebookIcon`, {})
                            sendConversion('SocialIconFacebook')
                            sendEvent('SocialIcon', {
                                eventCategory: 'SocialIconFacebook',
                                placement,
                            })
                        }}
                    >
                        <FacebookIconS
                            aria-label="Facebook Button"
                            fill={fill}
                        />
                    </a>
                </>
            )}
        </SocialIconsWrapper>
    )
}
