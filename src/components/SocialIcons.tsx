import React from 'react'
import styled from 'styled-components'

import ViberIcon from 'assets/icons/Viber.svg'
import TelegramIcon from 'assets/icons/Telegram.svg'
import WhatsappIcon from 'assets/icons/Whatsapp.svg'
import InstagramIcon from 'assets/icons/Instagram.svg'
import FacebookIcon from 'assets/icons/Facebook.svg'
import { displayWidth } from 'styles/width'
import { sendConversion, sendEvent } from 'tracking'

const SocialIconsWrapper = styled.div<{ fill: string }>`
    display: flex;
    justify-content: space-around;
    width: 100%;
    box-sizing: border-box;
    svg {
        fill: ${(props) => props.fill};
        margin: 0 5px;
        :hover {
            fill: gray;
        }
    }
    @media (min-width: ${displayWidth.desktop}) {
        justify-content: space-between;
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
        <SocialIconsWrapper fill={fill}>
            <a
                href="viber://chat?number=%2B380982117690"
                target="blank"
                onClick={() => {
                    sendConversion('SocialIconViber')
                    sendEvent('SocialIcon', {
                        eventCategory: 'SocialIconViber',
                        placement,
                    })
                }}
            >
                <ViberIcon aria-label="ViberButton" />
            </a>
            <a
                href="tg://resolve?domain=clearline_com_ua"
                target="blank"
                onClick={() => {
                    sendConversion('SocialIconTelegram')
                    sendEvent('SocialIcon', {
                        eventCategory: 'SocialIconTelegram',
                        placement,
                    })
                }}
            >
                <TelegramIcon aria-label="Telegram Button" />
            </a>
            <a
                href="https://wa.me/+380958363420"
                target="blank"
                onClick={() => {
                    sendConversion('SocialIconWhatsApp')
                    sendEvent('SocialIcon', {
                        eventCategory: 'SocialIconWhatsApp',
                        placement,
                    })
                }}
            >
                <WhatsappIcon aria-label="Whatsapp Button" />
            </a>
            {showAllIcons && (
                <>
                    <a
                        href="https://www.instagram.com/clear_line/"
                        target="blank"
                        onClick={() => {
                            sendConversion('SocialIconInstagram')
                            sendEvent('SocialIcon', {
                                eventCategory: 'SocialIconInstagram',
                                placement,
                            })
                        }}
                    >
                        <InstagramIcon aria-label="Instagram Button" />
                    </a>
                    <a
                        href="https://www.facebook.com/clearline.com.ua/"
                        target="blank"
                        onClick={() => {
                            sendConversion('SocialIconFacebook')
                            sendEvent('SocialIcon', {
                                eventCategory: 'SocialIconFacebook',
                                placement,
                            })
                        }}
                    >
                        <FacebookIcon aria-label="Facebook Button" />
                    </a>
                </>
            )}
        </SocialIconsWrapper>
    )
}
