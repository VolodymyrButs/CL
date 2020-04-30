import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { IconList } from 'components/IconList'

const ProjectStructureWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.promotion};
    border-bottom: 1px solid ${colors.dark};
`
const HeroColumn = styled.div``
const LeftSidebar = styled.div`
    display: flex;
    flex-grow: 1;
    min-width: 80px;
    background-color: ${backgroundColors.promotion};
    box-sizing: border-box;
`
const RightSidebar = styled(LeftSidebar)`
    background-color: ${colors.white};
    border-left: 1px solid ${colors.dark};
`

export const ProjectStructure = () => {
    const { i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allProjectStructureYaml {
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
    const projectStructureData = data.allProjectStructureYaml.edges.find(
        (elem: { node: { parent: { name: string } } }) => {
            return elem.node.parent.name.slice(-2) === i18n.language
        }
    ).node
    const { title, items } = projectStructureData

    return (
        <ProjectStructureWrapper>
            <LeftSidebar />
            <Container columns={'1fr 2fr'}>
                <HeroColumn>{title}</HeroColumn>
                <IconList items={items} fill={backgroundColors.promotion} />
            </Container>
            <RightSidebar />
        </ProjectStructureWrapper>
    )
}
