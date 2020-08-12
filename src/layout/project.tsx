import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

const Image = styled(Img)`
    width: 100%;
    height: 100%;
`

const ProjectLayout = ({
    data,
}: {
    data: {
        allFile: {
            edges: {
                node: {
                    childImageSharp: { fluid: FluidObject }
                }
            }[]
        }
    }
}) => {
    return (
        <>
            {data.allFile.edges.map(
                (
                    foto: {
                        node: {
                            childImageSharp: { fluid: FluidObject }
                        }
                    },
                    index: number
                ) => (
                    <div key={index}>
                        <Image
                            fluid={foto.node.childImageSharp.fluid}
                            imgStyle={{
                                objectFit: 'containe',
                            }}
                        />
                    </div>
                )
            )}
        </>
    )
}

export default ProjectLayout

export const query = graphql`
    query($projectName: String!) {
        allFile(filter: { relativeDirectory: { eq: $projectName } }) {
            edges {
                node {
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`
