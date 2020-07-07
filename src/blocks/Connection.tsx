import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { Button } from 'components/Button'

const CommunicationWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.formPromo};
    position: relative;
    border-bottom: 1px solid ${colors.dark};
    ${mobileAfterBorder}
`
const ButtonStyled = styled(Button)`
    width: 264px;
    margin: 30px auto;
    z-index: 3;
    @media (max-width: 330px) {
        width: 250px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        width: 220px;
        margin: 30px 0;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 264px;
    }
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
        margin: 20px;
    }
`

export const Connection = () => {
    const { i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allConnectionYaml {
                edges {
                    node {
                        title
                        buttonText
                        parent {
                            ... on File {
                                name
                            }
                        }
                    }
                }
            }
        }
    `)
    const connectionYaml = getDataByLanguage(
        data.allConnectionYaml,
        i18n.language
    )
    const { title, buttonText } = connectionYaml

    return (
        <CommunicationWrapper>
            <ContainerStyle columns={'1fr'} tabletColumns={'1fr'}>
                <TitleStyled>{title}</TitleStyled>
                <ButtonStyled>{buttonText}</ButtonStyled>
            </ContainerStyle>
        </CommunicationWrapper>
    )
}
