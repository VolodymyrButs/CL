import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { IconList } from 'components/IconList'

const Advantages3DWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.project};
    border-bottom: 1px solid ${colors.dark};
`
const HeroColumn = styled.div``
const LeftSidebar = styled.div`
    display: flex;
    flex-grow: 1;
    min-width: 80px;
    background-color: ${backgroundColors.project};
    box-sizing: border-box;
`
const RightSidebar = styled(LeftSidebar)`
    background-color: ${colors.white};
    border-left: 1px solid ${colors.dark};
`

export const Advantages3D = () => {
    const { i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allAdvantages3DYaml {
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
    const advantages3DData = data.allAdvantages3DYaml.edges.find(
        (elem: { node: { parent: { name: string } } }) => {
            return elem.node.parent.name.slice(-2) === i18n.language
        }
    ).node
    const { title, items } = advantages3DData

    return (
        <Advantages3DWrapper>
            <LeftSidebar />
            <Container columns={'1fr 2fr'}>
                <HeroColumn>{title}</HeroColumn>
                <IconList items={items} fill={backgroundColors.project} />
            </Container>
            <RightSidebar />
        </Advantages3DWrapper>
    )
}
