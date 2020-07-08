import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { RoundText } from 'components/RoundText'
import { PhoneSvgAnimated } from 'components/PhoneSvgAnimated'

const PhoneLinkWrapper = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
    height: inherit;
    color: #000000;
    font-size: 21px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 28px;
    p {
        white-space: nowrap;
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
