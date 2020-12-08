import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { IconListQuestion } from 'components/IconListQuestion'
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
const IconListStyled = styled(IconListQuestion)`
    border-bottom: 1px solid ${colors.dark};
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
        justify-content: center;
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
    color: ${colors.accentText};
    font-size: 28px;
    font-weight: bold;
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 36px;
    }
`

const Big = styled.span`
    font-size: 30px;
    line-height: 45px;
    font-family: 'Open Sans', sans-serif;
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 36px;
    }
`

const TitleStyled = styled(Title)`
    font-size: 26px;
    margin: 35px 20px;
    font-weight: bold;
    @media (min-width: ${displayWidth.tablet}) {
        margin-left: ${indent.heroColumnTablet};
        max-width: 250px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        max-width: 1000px;
        font-size: 32px;
    }
`

export const ProjectStructureQuestion = ({
    id,
    data,
}: {
    id?: string
    /* eslint-disable @typescript-eslint/no-explicit-any */
    data?: any
}) => {
    const { i18n, t } = useTranslation()

    const projectStructureData = getDataByLanguage(
        data.allProjectStructureQuestionYaml,
        i18n.language
    )
    const { title, items, price, promo } = projectStructureData

    return (
        <ProjectStructureWrapper id={id}>
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <TitleStyled>
                        <Price>{promo}</Price> {title} {t('for')}{' '}
                        <Big>{price}</Big>
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

export const ProjectStructureQuestionDesktop = ({
    id,
    data,
}: {
    id?: string
    /* eslint-disable @typescript-eslint/no-explicit-any */
    data?: any
}) => {
    const { i18n, t } = useTranslation()

    const projectStructureData = getDataByLanguage(
        data.allProjectStructureQuestionYaml,
        i18n.language
    )
    const { title, items, price, promo } = projectStructureData

    return (
        <ProjectStructureWrapper id={id}>
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr'}>
                <HeroColumn>
                    <TitleStyled>
                        <Price>{promo}</Price> {title} {t('for')}{' '}
                        <Big>{price}</Big>
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
