import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import { Icon } from 'components/Icon'
import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { TitleH1 } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { ServicesItem, ServicesItemProp } from 'blocks/Services/ServicesItem'
import { headerBg } from 'styles/headerBg'
import { getImageByImageName } from 'utils/getImageByImageName'
import { indent } from 'styles/indent'

const ServicesWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.contact};
    position: relative;
    border-bottom: 1px solid ${colors.dark};
    ${mobileAfterBorder};
    :before {
        ${headerBg}
    }
    @media (min-width: ${displayWidth.desktop}) {
        border-bottom: none;
    }
`
const TitleStyled = styled(TitleH1)`
    margin: 40px 0 32px;
    font-size: 48px;
    line-height: 55px;
    @media (min-width: ${displayWidth.tablet}) {
        margin-left: ${indent.heroColumnTablet};
    }
    @media (min-width: ${displayWidth.desktop}) {
        margin: 60px 10px 20px 49px;
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
        left: ${indent.mobile};
        right: ${indent.mobile};
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
const ServicesListStyled = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 56px 40px;
    }
`
const Image = styled(Img)<{ fluid: FluidObject }>`
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
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: inline;
        width: 60%;
        position: absolute;
        bottom: -30px;
        right: 0px;
    }
`

export const Services = () => {
    const { i18n } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allImageSharp {
                edges {
                    node {
                        fluid(quality: 100) {
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
    const palmImage = getImageByImageName(data.allImageSharp, image)
    const [isAnswerVisible, setIsAnswerVisible] = useState(-1)
    return (
        <ServicesWrapper>
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <TitleStyled>{title}</TitleStyled>
                    <Image
                        fluid={palmImage.fluid}
                        imgStyle={{
                            objectFit: 'containe',
                        }}
                    />
                    <ChairImg iconName="chairServices.svg" />
                </HeroColumn>
                <ServicesListStyled>
                    {questions.map((item: ServicesItemProp, index: number) => {
                        return (
                            <ServicesItem
                                setIsAnswerVisible={setIsAnswerVisible}
                                isAnswerVisible={isAnswerVisible}
                                key={index}
                                name={index}
                                question={item.question}
                                answer={item.answer}
                                icon={item.icon}
                            />
                        )
                    })}
                </ServicesListStyled>
            </Container>
        </ServicesWrapper>
    )
}
