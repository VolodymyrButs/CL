import React from 'react'
import styled from 'styled-components'

import ViberIcon from 'assets/icons/Viber.svg'
import TelegramIcon from 'assets/icons/Telegram.svg'
import WhatsappIcon from 'assets/icons/Whatsapp.svg'
import InstagramIcon from 'assets/icons/Instagram.svg'
import FacebookIcon from 'assets/icons/Facebook.svg'

const SocialIconsWrapper = styled.div<{ fill: string }>`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    svg {
        fill: ${props => props.fill};
        :hover {
            fill: gray;
        }
    }
`

interface ISocialIconsProps {
    fill: string
    showAllIcons?: Boolean
}

export const SocialIcons: React.FC<ISocialIconsProps> = ({
    fill,
    showAllIcons,
}) => {
    return (
        <SocialIconsWrapper fill={fill}>
            <a href="viber://chat?number=%2B380982117690" target="blank">
                <ViberIcon aria-label="ViberButton" />
            </a>
            <a href="tg://resolve?domain=clearline_com_ua" target="blank">
                <TelegramIcon aria-label="Telegram Button" />
            </a>
            <a href="https://wa.me/+380958363420" target="blank">
                <WhatsappIcon aria-label="Whatsapp Button" />
            </a>
            {showAllIcons && (
                <>
                    <a
                        href="https://www.instagram.com/clear_line/"
                        target="blank"
                    >
                        <InstagramIcon aria-label="Instagram Button" />
                    </a>
                    <a
                        href="https://www.facebook.com/clearline.com.ua/"
                        target="blank"
                    >
                        <FacebookIcon aria-label="Facebook Button" />
                    </a>
                </>
            )}
        </SocialIconsWrapper>
    )
}
