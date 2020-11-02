import React from 'react'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import CloseIcon from 'assets/icons/Exit.svg'
import { introductionContent } from 'cad/content/IntroductionContent'
import { useStaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
// import ReactPlayer from 'react-player'

// import Frame from 'assets/icons/frame.svg'
import { Container } from 'components/Container'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { Title } from 'components/TitleComponent'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { getImageByImageName } from 'utils/getImageByImageName'

const CadWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
    position: relative;
    z-index: 6;
    border-bottom: 1px solid ${colors.dark};
    overflow-y: auto;
    margin-bottom: 90px;
`
const SubTitle = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.4px;
    color: ${colors.dark};
    text-align: center;
`
const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 32px;
    justify-content: space-between;
    position: relative;
    @media (min-width: ${displayWidth.tablet}) {
        align-items: flex-start;
        border-right: 1px solid ${colors.dark};
    }
`
const TitleStyled = styled(Title)`
    margin: 40px 0;
    font-size: 28px;
    line-height: 55px;
    text-align: center;
    letter-spacing: 0.67px;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 60px 0;
    }
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 48px;
        margin: 60px 0 48px;
    }
`
const InstructionColumn = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    @media (min-width: ${displayWidth.tablet}) {
        align-items: flex-start;
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

const Image = styled(Img)<{ fluid: FluidObject }>`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        width: 100%;
        height: auto;
        position: absolute;
        bottom: 0;
        right: 0;
        color: transparent;
    }
`
const ContainerS = styled(Container)`
    margin: 0 auto;
    position: relative;
`

const IntroductionContentContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    @media (min-width: ${displayWidth.tablet}) {
        padding: 60px;
    }
`
const ExitButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    cursor: pointer;
    z-index: 11;
`
type Props = {
    closeFunction?: () => void
}

export const Instruction = ({ closeFunction }: Props) => {
    const { i18n } = useTranslation()

    const IntroductionContent = introductionContent(i18n.language)
    const data = useStaticQuery(graphql`
        query {
            allImageSharp {
                edges {
                    node {
                        fluid(srcSetBreakpoints: [400]) {
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
    const { title, subTitle /* video, */ } = cadYaml
    const imageFluid = getImageByImageName(data.allImageSharp, 'cactus.webp')
    return (
        <CadWrapper>
            <ContainerS columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <ExitButton onClick={closeFunction}>
                    <CloseIcon />
                </ExitButton>
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

                    <IntroductionContentContainer>
                        <IntroductionContent />
                    </IntroductionContentContainer>
                </InstructionColumn>
            </ContainerS>
        </CadWrapper>
    )
}
