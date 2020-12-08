import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import { headerBg } from 'styles/headerBg'
import { colors, backgroundColors } from 'styles/colors'
import { Container } from 'components/Container'
import LampIcon from 'assets/icons/Lamp.svg'
import sofaDesktopRight from 'assets/images/sofaDesktopRight.svg'
import i18n from 'i18n/config'
import { displayWidth } from 'styles/width'
import { headerHeight } from 'styles/height'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { getImageByImageName } from 'utils/getImageByImageName'
import { indent } from 'styles/indent'
import { TitleH1 } from 'components/TitleComponent'
import { useTranslation } from 'react-i18next'
import { useFormHandler } from 'hooks/useFormHandler'
import { Form, IChildrenProps } from 'components/form/Form'
import { PhoneInput } from 'components/form/PhoneInput'
import { EmailInput } from 'components/form/EmailInput'
import { MessageInput } from 'components/form/MessageInput'
import { imagesDataProp } from 'pages/promo'

const PromoHeroWraper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.promotion};
    height: calc(100vh - ${headerHeight.mobile} - 50px);
    min-height: 503px;
    border-bottom: 1px solid ${colors.dark};
    :before {
        ${headerBg}
    }

    @media (min-width: ${displayWidth.tablet}) {
        height: 605px;
        border-bottom: nonne;
    }
    @media (min-width: ${displayWidth.desktop}) {
        height: 630px;
    }
`

const PromoHeroColumn = styled.div`
    display: none;
    :first-child {
        display: flex;
    }
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-left: 1px solid ${colors.dark};
    border-right: 1px solid ${colors.dark};
    flex-grow: 0;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        position: relative;
        border-left: none;
        justify-content: center;

        box-sizing: border-box;
        :nth-child(3n) {
            border-right: none;
        }
    }
    div {
        min-width: 100px;
        form {
            @media (min-width: ${displayWidth.tablet}) {
                max-width: calc((100vw - 160px) / 3.4);
            }
            @media (min-width: ${displayWidth.desktop}) {
                min-width: 350px;
            }
            button {
                margin: 50px auto;
            }
            textarea {
                max-height: 60px;
            }
        }
    }
    :first-child {
        justify-content: flex-start;
    }
`
const ContainerStyled = styled(Container)`
    padding: 0 ${indent.mobile};
    @media (min-width: ${displayWidth.tablet}) {
        padding: 0;
    }
`

const LampIconStyled = styled(LampIcon)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        position: absolute;
        width: 190px;
        right: 10px;
        bottom: -55px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 265px;
        bottom: 30px;
    }
`
const TitleWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: ${displayWidth.tablet}) {
        width: 560px;
        position: absolute;
        top: 40px;
        left: 0px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 700px;
    }
`
const TitleStyled = styled(TitleH1)`
    font-size: 50px;
    line-height: 55px;
    letter-spacing: 0.666667px;
    overflow: visible;
    text-align: center;
    color: #296963;
    @media (max-width: 355px) {
        font-size: 40px;
        line-height: 45px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        box-sizing: border-box;
        padding-left: 0px;
        font-size: 46px;
        line-height: 56px;
        letter-spacing: 0.8px;
        text-align: left;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 50px;
        line-height: 64px;
        padding-left: 0px;
    }
`
const Price = styled.span`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 40px;
    line-height: 40px;
    letter-spacing: 0.888889px;
    color: ${colors.accentText};
    width: 100%;
    text-align: left;
    padding-left: 48px;
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 66px;
        line-height: 60px;
        letter-spacing: 1.52778px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        bottom: 46px;
        font-size: 90px;
        line-height: 70px;
        margin-left: 31px;
    }
`

const DesktopImageRight = styled(sofaDesktopRight)`
    display: none;
    width: 75%;
    fill: ${backgroundColors.promotion};
    stroke: ${colors.dark};
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        position: absolute;
        left: -1px;
        bottom: 30px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        bottom: 55px;
    }
`
const DesktopImageLeft = styled(Img)<{ fluid: FluidObject }>`
    display: none;
    width: 78%;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        position: absolute;
        left: 11%;
        bottom: -150px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        bottom: -136px;
    }
`

const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: ${displayWidth.desktop}) {
        margin: 0 auto;
        width: 80%;
    }
`
const FormTitle = styled.div`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 40px;
    line-height: 48px;
    letter-spacing: 1px;
    color: ${colors.dark};
    text-align: center;
    margin: 50px 0 10px;
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 50px;
        line-height: 58px;
        margin: 50px 0 10px;
    }
`
export const PromoHero3d = ({ imagesData }: { imagesData: imagesDataProp }) => {
    const { t } = useTranslation()
    const data = useStaticQuery(graphql`
        query {
            allPromoHeroYaml {
                edges {
                    node {
                        title
                        price
                        buttonText
                        image
                        imageMobile
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
    const promoHeroData = getDataByLanguage(
        data.allPromoHeroYaml,
        i18n.language
    )

    const imageSofa = getImageByImageName(
        imagesData.allImageSharp,
        promoHeroData.image
    )
    const {
        handleSubmitStatus,
        handleFormSendStart,
        formSendStatus,
    } = useFormHandler()
    return (
        <PromoHeroWraper>
            <ContainerStyled columns={'1fr'} tabletColumns={'1fr 1fr 1fr'}>
                <PromoHeroColumn>
                    <FormTitle>{t('writeToUs')}</FormTitle>
                    <Form
                        buttonText={t('send')}
                        onFormSubmit={handleSubmitStatus}
                        formSendStatus={formSendStatus}
                        onFormSendStart={handleFormSendStart}
                        conversionType={'TopFormDesktopPosadka3d'}
                        eventCategory={'TopFormDesktopPosadka3d'}
                    >
                        {({ register, errors }: IChildrenProps) => (
                            <InputBlock>
                                <PhoneInput
                                    ref={register({
                                        minLength: 18,
                                        required: true,
                                    })}
                                    err={errors.phone}
                                />

                                <EmailInput ref={register} err={errors.email} />
                                <MessageInput
                                    ref={register}
                                    err={errors.message}
                                />
                            </InputBlock>
                        )}
                    </Form>
                </PromoHeroColumn>
                <PromoHeroColumn>
                    <TitleWrapper>
                        <TitleStyled>{t('3dDesignFlat')}</TitleStyled>
                        <Price>
                            $4 {t('for')} {t('m')}
                            <sup>2</sup>
                        </Price>
                    </TitleWrapper>
                    <DesktopImageLeft fluid={imageSofa.fluid} />
                </PromoHeroColumn>
                <PromoHeroColumn>
                    <DesktopImageRight />
                    <LampIconStyled />
                </PromoHeroColumn>
            </ContainerStyled>
        </PromoHeroWraper>
    )
}
