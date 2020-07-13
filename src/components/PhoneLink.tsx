import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { RoundText, Svg } from 'components/RoundText'
import { PhoneSvgAnimated } from 'components/PhoneSvgAnimated'
import { colors } from 'styles/colors'

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
}

export const PhoneLink: React.FC<IPhoneLinkProps> = ({ phone, ...props }) => {
    const { t } = useTranslation()
    return (
        <PhoneLinkWrapper {...props} href={`tel:${phone}`}>
            <RoundText text={t('callUs')}>
                <PhoneSvgAnimated />
            </RoundText>
            <p>{phone}</p>
        </PhoneLinkWrapper>
    )
}
