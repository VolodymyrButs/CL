import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { IconList } from 'components/IconList'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'

import { indent } from 'styles/indent'

const ProjectStructureWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.promotion};
    position: relative;
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: 1px solid ${colors.dark};
    }
    ${mobileAfterBorder}
`
const IconListStyled = styled(IconList)`
    border-bottom: 1px solid ${colors.dark};
    padding: 16px;
    > div {
        padding: 16px;
        p {
            font-size: 18px;
        }
        /* flex-direction: row;
        svg {
            min-width: 45px;
            max-width: 45px;
            max-height: 34px;
            margin-right: 10px;
        } */
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
`
const LeftSidebar = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        flex-grow: 1;
        min-width: 79px;
        background-color: ${backgroundColors.promotion};
        box-sizing: border-box;
        margin-left: 1px;
    }
`
const RightSidebar = styled(LeftSidebar)`
    @media (min-width: ${displayWidth.tablet}) {
        background-color: ${colors.white};
    }
`

const Price = styled.span`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 64px;
    line-height: 74px;
    letter-spacing: 0.888889px;
    color: ${colors.accentText};
    margin: 0 10px;
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 80px;
        position: absolute;
        top: -10px;
        line-height: 30px;
        letter-spacing: 1.11111px;
    }
`

const TitleStyled = styled(Title)`
    margin: 35px 25px;
    @media (min-width: ${displayWidth.tablet}) {
        margin-left: ${indent.heroColumnTablet};
        max-width: 250px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        margin-left: ${indent.heroColumnDesktop};
    }
`

export const ProjectStructureNew = ({ id }: { id?: string }) => {
    const { i18n, t } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allProjectStructure1Yaml {
                edges {
                    node {
                        title
                        price
                        image
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
    const projectStructureData = getDataByLanguage(
        data.allProjectStructure1Yaml,
        i18n.language
    )

    const { items, price } = projectStructureData

    return (
        <ProjectStructureWrapper id={id}>
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <TitleStyled>
                        {t('structurePosadka')}
                        <p>
                            {t('for')}
                            <Price>{price}</Price>
                        </p>
                    </TitleStyled>
                </HeroColumn>
                <IconListStyled
                    items={items}
                    fill={backgroundColors.promotion}
                />
            </Container>
            <RightSidebar />
        </ProjectStructureWrapper>
    )
}
