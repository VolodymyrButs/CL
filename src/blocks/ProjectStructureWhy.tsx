import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { IconListWhy } from 'components/IconListWhy'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'

import { indent } from 'styles/indent'

const ProjectStructureWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #fff;
    position: relative;
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: 1px solid ${colors.dark};
    }
    ${mobileAfterBorder}
`
const IconListStyled = styled(IconListWhy)`
    border-bottom: 1px solid ${colors.dark};
    padding: 16px;
    background-color: #fff;
    > div {
        padding: 16px;
        background-color: #fff;
    }
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
    }
`

const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
        border-right: 1px solid #231f20;
    }
    @media (min-width: ${displayWidth.desktop}) {
        border-bottom: none;
        border-right: none;
        align-items: center;
    }
`
const LeftSidebar = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        flex-grow: 1;
        min-width: 79px;
        background-color: #fff;
        box-sizing: border-box;
        margin-left: 1px;
    }
`
const RightSidebar = styled(LeftSidebar)`
    @media (min-width: ${displayWidth.tablet}) {
        background-color: ${colors.white};
    }
`

const TitleStyled = styled(Title)`
    font-size: 26px;
    margin: 35px 20px;
    strong {
        color: #b75034;
        font-size: 28px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        margin-left: ${indent.heroColumnTablet};
        max-width: 250px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        margin-left: ${indent.heroColumnDesktop};
        font-size: 44px;
        max-width: 1000px;
        strong {
            font-size: 44px;
        }
    }
`

export const ProjectStructureWhy = ({ id }: { id?: string }) => {
    const { i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allProjectStructureWhyYaml {
                edges {
                    node {
                        title
                        price
                        image
                        promo
                        items {
                            question
                            answer
                            answerDesctop
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
    const projectStructureData = getDataByLanguage(
        data.allProjectStructureWhyYaml,
        i18n.language
    )

    const { items, title } = projectStructureData

    return (
        <ProjectStructureWrapper id={id}>
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr'}>
                <HeroColumn>
                    <TitleStyled
                        dangerouslySetInnerHTML={{
                            __html: title,
                        }}
                    />
                </HeroColumn>
                <IconListStyled
                    items={items}
                    fill={backgroundColors.formPromo}
                />
            </Container>
            <RightSidebar />
        </ProjectStructureWrapper>
    )
}
