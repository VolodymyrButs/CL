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
    background-color: ${backgroundColors.project};
    position: relative;
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: 1px solid ${colors.dark};
    }
    ${mobileAfterBorder}
`
const IconListStyled = styled(IconListQuestion)`
    background-color: ${backgroundColors.project};
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
        background-color: ${backgroundColors.project};
        box-sizing: border-box;
        margin-left: 1px;
    }
`
const RightSidebar = styled(LeftSidebar)`
    @media (min-width: ${displayWidth.tablet}) {
        background-color: ${colors.white};
    }
`

const Price = styled.p`
    color: ${colors.accentText};
    font-size: 40px;
    margin: 10px;
    font-weight: bold;
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 50px;
        display: inline-block;
    }
`

const TitleStyled = styled(Title)`
    font-size: 40px;
    line-height: 45px;
    margin: 35px 20px;
    font-weight: bold;
    @media (min-width: ${displayWidth.tablet}) {
        margin-left: ${indent.heroColumnTablet};
        max-width: 250px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        max-width: 1000px;
        font-size: 50px;
    }
`

export const Advantages3dQuestion = ({
    id,
    data,
}: {
    id?: string
    /* eslint-disable @typescript-eslint/no-explicit-any */
    data?: any
}) => {
    const { i18n, t } = useTranslation()

    const projectStructureData = getDataByLanguage(
        data.allAdvantages3DposadkaYaml,
        i18n.language
    )
    const { items } = projectStructureData

    return (
        <ProjectStructureWrapper id={id}>
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <TitleStyled>
                        {t('3dDesignFlat')}
                        <Price>
                            $4 {t('for')} <span>{t('m')}</span>
                            <sup>2</sup>
                        </Price>
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

export const Advantages3dQuestionDesktop = ({
    id,
    data,
}: {
    id?: string
    /* eslint-disable @typescript-eslint/no-explicit-any */
    data?: any
}) => {
    const { i18n, t } = useTranslation()

    const projectStructureData = getDataByLanguage(
        data.allAdvantages3DposadkaYaml,
        i18n.language
    )
    const { items } = projectStructureData

    return (
        <ProjectStructureWrapper id={id}>
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr'}>
                <HeroColumn>
                    <TitleStyled>
                        {t('3dDesignFlat')} -
                        <Price>
                            $4 {t('for')} {t('m')}
                            <sup>2</sup>
                        </Price>
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
