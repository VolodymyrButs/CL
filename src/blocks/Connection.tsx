import React from 'react'
import styled from 'styled-components'

import { Container } from 'components/Container'
import { colors, backgroundColors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'

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
    z-index:10;
`

const ContainerStyle = styled(Container)`
    @media (min-width: ${displayWidth.tablet}) {
        outline: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    @media (min-width: ${displayWidth.tablet}) {
        justify-content: space-between;
    }
`
const TitleStyled = styled(Title)`
    @media (min-width: ${displayWidth.tablet}) {
        margin: 20px 50px;
    }
`
interface IConnectionProps {
    backgroundColor?: string
    text: string
    children: React.ReactElement
}

export const Connection: React.FC<IConnectionProps> = ({
    backgroundColor,
    text,
    children,
}) => {
    return (
        <CommunicationWrapper backgroundColors={backgroundColor}>
            <ContainerStyle columns={'1fr'} tabletColumns={'1fr'}>
                <TitleStyled>{text}</TitleStyled>
                {children}
            </ContainerStyle>
        </CommunicationWrapper>
    )
}
