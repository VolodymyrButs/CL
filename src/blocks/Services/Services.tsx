import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Icon } from 'components/Icon'
import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { ServicesItem } from 'blocks/Services/ServicesItem'
import { headerBg } from 'styles/headerBg'
import { getImageByImageName } from 'utils/getImageByImageName'

const ServicesWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.contact};
    position: relative;
    ${mobileAfterBorder};
    :before {
        ${headerBg}
    }
`
const TitleStyled = styled(Title)`
    margin: 40px 0 32px;
    font-size: 48px;
    line-height: 55px;
    @media (min-width: ${displayWidth.desktop}) {
        margin: 80px 10px 48px 49px;
    }
`
const HeroColumn = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    :after {
        position: absolute;
        content: '';
        pointer-events: none;
        bottom: 0;
        left: 15px;
        right: 15px;
        border-bottom: 1px solid ${colors.dark};
        z-index: 3;
    }
    @media (min-width: ${displayWidth.tablet}) {
        align-items: flex-start;
        border-bottom: none;
        border-right: 1px solid ${colors.dark};
        :after {
            display: none;
        }
    }
`
const LeftSidebar = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        flex-grow: 1;
        min-width: 80px;
        background-color: ${backgroundColors.contact};
        box-sizing: border-box;
    }
`
const RightSidebar = styled(LeftSidebar)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        background-color: ${backgroundColors.contact};
        border-left: 1px solid ${colors.dark};
    }
`
const ServicesListStyled = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 56px 40px;
    }
`
const Image = styled(Img)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        width: 65%;
        height: auto;
        max-height: 500px;
        color: transparent;
        display: block;
        z-index: 2;
    }
`
const ChairImg = styled(Icon)`
    width: 60%;
    position: absolute;
    bottom: -30px;
    right: 0px;
`
export interface IServicesItem {
    question: string
    answer: string
    icon: string
}

export const Services = () => {
    const { i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allImageSharp {
                edges {
                    node {
                        fluid {
                            originalName
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            allServicesYaml {
                edges {
                    node {
                        title
                        image
                        questions {
                            question
                            answer
                            icon
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

    const { image, title, questions } = getDataByLanguage(
        data.allServicesYaml,
        i18n.language
    )
    const imagePalma = getImageByImageName(data.allImageSharp, image)
    return (
        <ServicesWrapper>
            <LeftSidebar />
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <TitleStyled> {title}</TitleStyled>
                    <Image
                        fluid={imagePalma.fluid}
                        imgStyle={{
                            objectFit: 'containe',
                        }}
                    />
                    <ChairImg iconName="chair2.svg" />
                </HeroColumn>
                <ServicesListStyled>
                    {questions.map((item: IServicesItem, index: number) => {
                        return (
                            <ServicesItem
                                key={index}
                                question={item.question}
                                answer={item.answer}
                                icon={item.icon}
                            />
                        )
                    })}
                </ServicesListStyled>
            </Container>
            <RightSidebar />
        </ServicesWrapper>
    )
}
