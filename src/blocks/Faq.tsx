import React from 'react'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import { css, FlattenSimpleInterpolation } from 'styled-components'

import { Icon } from 'components/Icon'

const iconStyle: FlattenSimpleInterpolation = css`
    color: violet;
    > .c1 {
        color: green;
    }
`

export const Faq = () => {
    const { t, i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allFaqYaml {
                edges {
                    node {
                        title
                        levels {
                            level
                            message
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
    const blockData = data.allFaqYaml.edges.find(
        (elem: { node: { parent: { name: string } } }) => {
            return elem.node.parent.name.slice(-2) === i18n.language
        }
    ).node
    const { title, levels } = blockData

    return (
        <div>
            <p>{t('hi')}</p>
            <p>{title}</p>
            {levels.map(
                (
                    item: { level: string; message: string; svg?: string },
                    index: number
                ) => {
                    return (
                        <div key={index}>
                            <div
                                dangerouslySetInnerHTML={{ __html: item.level }}
                            />
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: item.message,
                                }}
                            />
                            {item.svg && (
                                <Icon iconName={item.svg} styles={iconStyle} />
                            )}
                        </div>
                    )
                }
            )}
        </div>
    )
}
