import React from 'react'
import styled from 'styled-components'

import { Container } from 'components/Container'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'

const CommunicationWrapper = styled.div<{ backgroundcolor: string }>`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${props => props.backgroundcolor};
    position: relative;
    border-bottom: 1px solid ${colors.dark};
    ${mobileAfterBorder}
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
    backgroundColor: string
    text: string
    children: React.ReactElement
}

export const Connection: React.FC<IConnectionProps> = ({
    backgroundColor,
    text,
    children,
}) => {
    return (
        <CommunicationWrapper backgroundcolor={backgroundColor}>
            <ContainerStyle columns={'1fr'} tabletColumns={'1fr'}>
                <TitleStyled>{text}</TitleStyled>
                {children}
            </ContainerStyle>
        </CommunicationWrapper>
    )
}
