import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { RoundText, Svg } from 'components/RoundText'
import { PhoneSvgAnimated } from 'components/PhoneSvgAnimated'
import { colors } from 'styles/colors'
import { sendConversion, sendEvent } from 'tracking'

export const PhoneLinkWrapper = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
    height: inherit;
    color: ${colors.dark};
    font-size: 21px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 28px;
    p {
        white-space: nowrap;
    }
    &:hover {
        ${Svg} {
            animation-name: rotate;
            animation-duration: 5s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            @keyframes rotate {
                from {
                    transform: rotate(360deg);
                }
                to {
                    transform: rotate(0);
                }
            }
        }
    }
`

interface IPhoneLinkProps {
    phone: string
    placement: string
}

export const PhoneLink: React.FC<IPhoneLinkProps> = ({
    phone,
    placement,
    ...props
}) => {
    const { t } = useTranslation()
    return (
        <PhoneLinkWrapper
            {...props}
            href={`tel:${phone}`}
            onClick={() => {
                sendConversion('PhoneClick')
                sendEvent('Phone', {
                    eventCategory: 'PhoneClick',
                    placement,
                    phone,
                })
            }}
        >
            <RoundText text={t('callUs')}>
                <PhoneSvgAnimated />
            </RoundText>
            <p>{phone}</p>
        </PhoneLinkWrapper>
    )
}
