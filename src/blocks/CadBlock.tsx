import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
// import ReactPlayer from 'react-player'

// import Frame from 'assets/icons/frame.svg'
import { headerBg } from 'styles/headerBg'
import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { Title } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { Button } from 'components/Button'
import { getImageByImageName } from 'utils/getImageByImageName'
import { LocalizedLink } from 'i18n/LocalizedLink'

const CadWrapper = styled.div`
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
`
const SubTitle = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.4px;
    color: ${colors.dark};
    text-align: center;
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
    }
`
const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 32px;
    justify-content: space-between;
    position: relative;
    @media (min-width: ${displayWidth.tablet}) {
        padding: 0 32px 56px;
        align-items: flex-start;
        border-right: 1px solid ${colors.dark};
    }
`
const TitleStyled = styled(Title)`
    margin: 40px 0 10px;
    font-size: 48px;
    line-height: 55px;
    text-align: center;
    letter-spacing: 0.67px;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 20px 0;
    }
    @media (min-width: ${displayWidth.desktop}) {
        margin: 80px 0 48px;
    }
`
const InstructionColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    a {
        margin: 0 0 32px 0;
    }
    @media (min-width: ${displayWidth.tablet}) {
        align-items: flex-start;
        a {
            margin: 0 0 80px 60px;
        }
    }
`
// const Video = styled.div`
//     width: 100%;
//     position: relative;
//     padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
//     div {
//         position: absolute;
//         top: 5%;
//         left: 5.6%;
//         width: 100%;
//         height: 100%;
//     }
//     @media (min-width: ${displayWidth.tablet}) {
//         margin-top: 90px;
//     }
// `
// const FrameStyled = styled(Frame)`
//     position: absolute;
//     top: -12%;
//     left: 6.5%;
//     width: 87%;
//     height: 108%;
// `
const InstructionText = styled.div`
    ol {
        margin: 10px 58px 58px;
        list-style: decimal;
        @media (min-width: ${displayWidth.tablet}) {
            text-align: left;
            margin: 60px;
        }
    }
    ul {
        margin: 32px;
        list-style: none;
        @media (min-width: ${displayWidth.tablet}) {
            text-align: left;
            margin: 60px;
        }
    }
    li {
        margin-bottom: 20px;
        position: relative;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 26px;
        text-align: center;
        letter-spacing: 0.4px;
        @media (min-width: ${displayWidth.tablet}) {
            text-align: left;
            margin: 0px 0 30зч 0;
        }
    }
    strong {
        font-weight: bold;
    }
`
const Image = styled(Img)<{ fluid: FluidObject }>`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        width: 100%;
        height: auto;
        color: transparent;
        position: relative;
        bottom: -7%;
        left: 0;
    }
`
export const Cad = () => {
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
            allCadYaml {
                edges {
                    node {
                        title
                        subTitle
                        video
                        instruction
                        buttonText
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
    const cadYaml = getDataByLanguage(data.allCadYaml, i18n.language)
    const { title, subTitle, /* video, */ instruction, buttonText } = cadYaml
    const imageFluid = getImageByImageName(data.allImageSharp, 'cactus.png')
    return (
        <CadWrapper>
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <div>
                        <TitleStyled> {title}</TitleStyled>
                        <SubTitle>{subTitle}</SubTitle>
                    </div>
                    <Image fluid={imageFluid.fluid} />
                </HeroColumn>
                <InstructionColumn>
                    {/* <Video>
                        <FrameStyled />
                        <ReactPlayer
                            width="80%"
                            height="80%"
                            controls={true}
                            url={video}
                            loop={true}
                            volume={0.5}
                            muted={true}
                            config={{
                                youtube: {
                                    playerVars: {
                                        showinfo: 0,
                                        autoplay: 1,
                                        color: 'white',
                                        enablejsapi: 1,
                                    },
                                },
                            }}
                        />
                    </Video> */}
                    <InstructionText
                        dangerouslySetInnerHTML={{
                            __html: instruction,
                        }}
                    />
                    <LocalizedLink to={'/cad'}>
                        <Button>{buttonText}</Button>
                    </LocalizedLink>
                </InstructionColumn>
            </Container>
        </CadWrapper>
    )
}
