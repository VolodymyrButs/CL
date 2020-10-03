import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'

import { displayWidth } from 'styles/width'
import { colors, backgroundColors } from 'styles/colors'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { headerBg } from 'styles/headerBg'
import { WorksProjectItem } from './WorksProjectItem'
import { Container } from 'components/Container'
import { Button } from 'components/Button'
import { sendEvent } from 'tracking'

const WorksGridWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: relative;
    :before {
        ${headerBg}
    }
    ${mobileAfterBorder}
`

const Ul = styled.ul`
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 140vw;
    @media (min-width: ${displayWidth.tablet}) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: 450px;
        max-width: calc(100% - 160px);
    }
    @media (min-width: ${displayWidth.desktop}) {
        grid-auto-rows: 550px;
        max-width: 1190px;
    }
`
const Li = styled.li`
    outline: 1px solid ${colors.dark};
    list-style: none;
    background: white;
    color: white;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    grid-column: span 1;
    @media (min-width: ${displayWidth.tablet}) {
        :nth-child(4n + 1) {
            grid-column: span 2;
        }
        :nth-child(4n + 4) {
            grid-column: span 2;
        }
    }
`
const Div = styled.div`
    border-right: 1px solid ${colors.dark};
`
const ButtonContainer = styled(Container)`
    margin-top: 1px;
`
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    @media (min-width: ${displayWidth.tablet}) {
        justify-content: flex-start;
    }
`
const ButtonStyled = styled(Button)`
    margin: 30px;
    background-color: ${backgroundColors.formPromo};
    color: ${colors.dark};
`
export const WorksProjectGrid = () => {
    const { i18n, t } = useTranslation()
    const [visibleProjects, setVisibleProjects] = useState(4)
    const orientationPosition = (index: number, arrLength: number) => {
        for (let i = 0; i < arrLength; i++) {
            if (index + 1 === i * 4 + 1 || index + 1 === i * 4 + 4) {
                return 0
            }
        }
        return 1
    }
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
                            landscape
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
        }
    `)

    const allProjectGrid = data.allProjectsYaml.edges.slice(2)
    return (
        <WorksGridWrapper>
            <Ul>
                {allProjectGrid.slice(0, visibleProjects).map(
                    (
                        item: {
                            node: {
                                [x: string]: {
                                    name: string
                                    landscape: string
                                    portrait: string
                                }
                            }
                        },
                        index: number,
                        arr: []
                    ) => {
                        return (
                            <Li key={index}>
                                <WorksProjectItem
                                    image={
                                        orientationPosition(
                                            index,
                                            arr.length
                                        ) === 0
                                            ? item.node.previewImage.landscape
                                            : item.node.previewImage.portrait
                                    }
                                    description={
                                        item.node[i18n.languages[0]].name
                                    }
                                    link={item.node.parent.name}
                                />
                            </Li>
                        )
                    }
                )}
            </Ul>
            {allProjectGrid.length > visibleProjects && (
                <ButtonContainer columns={'1fr'} tabletColumns={'1fr 2fr'}>
                    <Div></Div>
                    <ButtonWrapper>
                        <ButtonStyled
                            onClick={() => {
                                setVisibleProjects(allProjectGrid.length),
                                    sendEvent('Click', {
                                        eventCategory: 'ShowMoreButton',
                                        placement: 'Works',
                                        target: 'ShowMore',
                                    })
                            }}
                        >
                            {t('showMore')}
                        </ButtonStyled>
                    </ButtonWrapper>
                </ButtonContainer>
            )}
        </WorksGridWrapper>
    )
}
