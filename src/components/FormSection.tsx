import React from 'react'
import styled from 'styled-components'

import { PhoneLink } from 'components/PhoneLink'
import { backgroundColors, colors } from 'styles/colors'
import { Container } from 'components/Container'
import { contactInformation } from 'components/contactInformation'

const FormSectionWrapper = styled.div`
    display: flex;
    justify-content: center;
    background-color: ${backgroundColors.formPromo};
    width: 100%;
`

const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const FormColumn = styled.div`
    padding: 20px;
    outline: 1px solid ${colors.dark};
`
const Title = styled.h2``

const Description = styled.p``

interface IFormSectionProps {
    title: string
    description: string
    children: React.ReactElement
}

export const FormSection: React.FC<IFormSectionProps> = ({
    title,
    description,
    children,
}) => {
    return (
        <FormSectionWrapper>
            <Container columns={'1fr 2fr'}>
                <HeroColumn>
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                    <PhoneLink phone={contactInformation.primaryPhone} />
                </HeroColumn>
                <FormColumn>{children}</FormColumn>
            </Container>
        </FormSectionWrapper>
    )
}
