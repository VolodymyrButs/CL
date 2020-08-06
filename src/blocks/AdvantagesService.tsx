import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'

import collage from 'assets/images/collage.svg'
import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { IconList } from 'components/IconList'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'

const VisualizationAdvantagesWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.services};
    position: relative;
    border-bottom: 1px solid ${colors.dark};
    ${mobileAfterBorder}
`
const IconListStyled = styled(IconList)`
    border-bottom: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
    }
`

const Image = styled(collage)`
    width: 90%;
    height: auto;
    color: transparent;
    align-self: flex-end;
    @media (min-width: ${displayWidth.desktop}) {
        color: ${backgroundColors.services};
    }
`
const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
    }
`
const LeftSidebar = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        flex-grow: 1;
        min-width: 80px;
        background-color: ${backgroundColors.services};
        box-sizing: border-box;
        margin-left: 1px;
    }
`
const RightSidebar = styled(LeftSidebar)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        background-color: ${colors.white};
    }
`
export const AdvantagesServices = () => {
    const { i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allAdvantagesServiceYaml {
                edges {
                    node {
                        title
                        items {
                            content
                            svg
                        }
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
    const advantagesServiceData = getDataByLanguage(
        data.allAdvantagesServiceYaml,
        i18n.language
    )
    const { title, items } = advantagesServiceData

    return (
        <VisualizationAdvantagesWrapper>
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <Title>{title}</Title>

                    <Image />
                </HeroColumn>
                <IconListStyled
                    items={items}
                    fill={backgroundColors.services}
                />
            </Container>
            <RightSidebar />
        </VisualizationAdvantagesWrapper>
    )
}
