import React from 'react'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'

export const About = () => {
    const { t, i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        {
            allFile(filter: { relativeDirectory: { eq: "blocks/about" } }) {
                edges {
                    node {
                        name
                        childMarkdownRemark {
                            internal {
                                content
                            }
                            frontmatter {
                                title
                            }
                        }
                    }
                }
            }
        }
    `)

    const blockData = data.allFile.edges.find(
        (elem: { node: { name: string } }) => {
            return elem.node.name.slice(-2) === i18n.language
        }
    ).node.childMarkdownRemark

    const {
        frontmatter,
        internal: { content },
    } = blockData

    return (
        <div>
            {t('hi')}
            <p>{frontmatter.title}</p>
            <p>{content}</p>
        </div>
    )
}
