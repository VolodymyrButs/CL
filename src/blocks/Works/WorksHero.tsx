import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'

import { displayWidth } from 'styles/width'
import { colors, backgroundColors } from 'styles/colors'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Container } from 'components/Container'
import { headerBg } from 'styles/headerBg'
import { WorksProjectItem } from './WorksProjectItem'

const WorksHeroWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.project};
    position: relative;
    border-bottom: 1px solid ${colors.dark};

    :before {
        ${headerBg}
    }
    ${mobileAfterBorder}
`

const LeftSidebar = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        flex-grow: 1;
        min-width: 80px;
        background-color: ${backgroundColors.project};
        box-sizing: border-box;
    }
`
const RightSidebar = styled(LeftSidebar)`
    @media (min-width: ${displayWidth.tablet}) {
        background-color: ${colors.white};
    }
`
const SubTitle = styled.div`
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 0.4px;
    color: ${colors.dark};
    margin: 16px;
    p {
        margin: 10px 0;
    }
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
        margin: 0;
        margin-bottom: 32px;
    }
`
const HeroColumn = styled.div`
    padding: 0px 16px 33px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: ${displayWidth.tablet}) {
        padding: 60px 30px 60px 48px;
        align-items: flex-start;
    }
`

const Title = styled.h1`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 55px;
    text-align: center;
    letter-spacing: 2.37176px;
    color: ${colors.darkText};
    margin: 35px auto 0;
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 34px;
        line-height: 39px;
        letter-spacing: 1.68px;
        margin: 0;
    }
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 52px;
        line-height: 60px;
        letter-spacing: 2.68px;
    }
`
const ProjectColumn = styled.div`
    width: 100%;
    box-sizing: border-box;
    background-color: ${colors.white};
    z-index: 1;
    outline: 1px solid ${colors.dark};
`
export const WorksHero = () => {
    const { i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allProjectsYaml(sort: { fields: name, order: ASC }) {
                edges {
                    node {
                        name
                        en {
                            description
                            name
                        }
                        previewImage {
                            portrait
                        }
                        ru {
                            description
                            name
                        }
                        uk {
                            description
                            name
                        }
                        parent {
                            ... on File {
                                name
                            }
                        }
                    }
                }
            }
            allWorksYaml {
                edges {
                    node {
                        en {
                            subtitle
                            title
                        }
                        ru {
                            subtitle
                            title
                        }
                        uk {
                            subtitle
                            title
                        }
                    }
                }
            }
        }
    `)

    const firstWork = data.allProjectsYaml.edges[0].node
    const secondWork = data.allProjectsYaml.edges[1].node

    const { title, subtitle } = data.allWorksYaml.edges[0].node[i18n.language]
    return (
        <WorksHeroWrapper>
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr  1fr 1fr'}>
                <HeroColumn>
                    <Title>{title}</Title>
                    <SubTitle
                        dangerouslySetInnerHTML={{
                            __html: subtitle,
                        }}
                    />
                </HeroColumn>
                <ProjectColumn>
                    <WorksProjectItem
                        image={firstWork.previewImage.portrait}
                        description={firstWork[i18n.language].name}
                        link={firstWork.parent.name}
                    />
                </ProjectColumn>
                <ProjectColumn>
                    <WorksProjectItem
                        image={secondWork.previewImage.portrait}
                        description={secondWork[i18n.language].name}
                        link={secondWork.parent.name}
                    />
                </ProjectColumn>
            </Container>
            <RightSidebar />
        </WorksHeroWrapper>
    )
}
