import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { IconList } from 'components/IconList'

const VisualizationAdvantagesWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.project};
    border-bottom: 1px solid ${colors.dark};
`

const HeroColumn = styled.div``

export const VisualizationAdvantages = () => {
    const { i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allVisualizationAdvantagesYaml {
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
    const projectStructureData = data.allVisualizationAdvantagesYaml.edges.find(
        (elem: { node: { parent: { name: string } } }) => {
            return elem.node.parent.name.slice(-2) === i18n.language
        }
    ).node
    const { title, items } = projectStructureData

    return (
        <VisualizationAdvantagesWrapper>
            <Container columns={'1fr 2fr'}>
                <HeroColumn>{title}</HeroColumn>
                <IconList
                    items={items}
                    fill={backgroundColors.projectDark}
                    background={backgroundColors.project}
                />
            </Container>
        </VisualizationAdvantagesWrapper>
    )
}
