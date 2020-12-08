import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Img, { FluidObject } from 'gatsby-image'

import { Container } from 'components/Container'
import { backgroundColors, colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { TitleH1 } from 'components/TitleComponent'
import { imagesDataProp } from 'pages/promo'
import { getImageByImageName } from 'utils/getImageByImageName'

const Visualization3dWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.project};
    position: relative;
    border-bottom: 1px solid ${colors.dark};
    ${mobileAfterBorder}
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
    }
`

const HeroColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 32px;
    align-items: center;
    border-bottom: 1px solid ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: none;
        padding: 0 0 32px;
        border-right: 1px solid ${colors.dark};
    }
`
const ImgStyled = styled(Img)<{ fluid: FluidObject }>`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 16px;
    align-self: center;
    @media (min-width: ${displayWidth.tablet}) {
        max-width: calc((100vw - 160px) * 0.6666);
        padding: 0;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 793px;
    }
`
const ImgWrapper = styled.div`
    display: none;
    padding: 0 16px;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        padding: 0;
    }
`
const TitleWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const TitleStyled = styled(TitleH1)`
    font-size: 40px;
    line-height: 45px;
    letter-spacing: 0.666667px;
    overflow: visible;
    text-align: center;
    margin-top: 20px;
    @media (max-width: 355px) {
        font-size: 40px;
        line-height: 45px;
    }
`
const Price = styled.span`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 50px;
    line-height: 30px;
    letter-spacing: 0.888889px;
    color: ${colors.accentText};
    width: 100%;
    text-align: center;
`

export const Project3DPosadka = ({
    imagesData,
}: {
    imagesData: imagesDataProp
}) => {
    const { t } = useTranslation()

    const image = getImageByImageName(
        imagesData.allImageSharp,
        'picture3D.webp'
    )

    return (
        <Visualization3dWrapper>
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <HeroColumn>
                    <TitleWrapper>
                        <TitleStyled>{t('3dDesignFlat')}</TitleStyled>
                        <Price>
                            $4 {t('for')} m<sup>2</sup>
                        </Price>
                    </TitleWrapper>
                </HeroColumn>
                <ImgWrapper>
                    <ImgStyled fluid={image.fluid} loading="eager" />
                </ImgWrapper>
            </Container>
        </Visualization3dWrapper>
    )
}
