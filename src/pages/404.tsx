import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'

import { Logo } from 'components/Logo'
import { contactInformation } from 'components/contactInformation'
import { colors } from 'styles/colors'
import sofaDesktopRight from 'assets/images/sofaDesktopRight.svg'
import { displayWidth } from 'styles/width'
import { getImageByImageName } from 'utils/getImageByImageName'
import { Button } from 'components/Button'
import { SocialIcons } from 'components/SocialIcons'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-color: ${colors.dark};
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    @media (min-width: ${displayWidth.tablet}) {
        align-items: center;
    }
`
const LogoStyled = styled(Logo)`
    position: absolute;
    top: 12px;
    left: 15px;
    fill: ${colors.white};
`
const PhoneLinkStyled = styled.a`
    position: absolute;
    top: 25px;
    right: 44px;
    text-decoration: none;
    font-style: normal;
    font-weight: 600;
    font-size: 21px;
    line-height: 29px;
    text-transform: uppercase;
    color: ${colors.white};
`
const DesktopImageRight = styled(Img)`
    display: none;
    width: 300px;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
    }
`
const DesktopImageLeft = styled(sofaDesktopRight)`
    display: none;
    width: 300px;
    fill: ${colors.dark};
    stroke: ${colors.white};
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
    }
`
const CenterBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    color: ${colors.white};
    text-align: center;
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    margin: 80px 20px 0;
    @media (min-width: ${displayWidth.tablet}) {
        justify-content: center;
    }
`
const Title = styled.h2`
    font-size: 100px;
    line-height: 120px;
    letter-spacing: 1.52778px;
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 144px;
        line-height: 166px;
    }
`
const SubTitle = styled.h3`
    font-size: 26px;
    line-height: 30px;
    letter-spacing: 0.45px;
    margin: 30px auto;
`
const ButtonStyled = styled(Button)`
    border-color: ${colors.white};
    margin: 30px auto;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 60px auto;
    }
`
const NotFoundPage = () => {
    const { t } = useTranslation()
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
        }
    `)
    const imageSofa = getImageByImageName(data.allImageSharp, 'sofa.png')
    return (
        <Wrapper>
            <LogoStyled />
            <PhoneLinkStyled href={`tel:${contactInformation.primaryPhone}`}>
                {contactInformation.primaryPhone}
            </PhoneLinkStyled>
            <DesktopImageLeft />
            <CenterBlock>
                <Title>404</Title>
                <SubTitle>{t('pageNotFound')}</SubTitle>
                <ButtonStyled onClick={() => window.history.back()}>
                    {t('goBack')}
                </ButtonStyled>
                <SocialIcons fill={colors.white} showAllIcons />
            </CenterBlock>
            <DesktopImageRight fluid={imageSofa.fluid} />
        </Wrapper>
    )
}
export default NotFoundPage
