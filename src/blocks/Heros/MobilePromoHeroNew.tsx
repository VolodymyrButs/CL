import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import { headerBg } from 'styles/headerBg'
import { colors, backgroundColors } from 'styles/colors'
import { Container } from 'components/Container'
import { PhoneInput } from 'components/form/PhoneInput'
import { EmailInput } from 'components/form/EmailInput'
import { MessageInput } from 'components/form/MessageInput'
import i18n from 'i18n/config'
import { displayWidth } from 'styles/width'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { getImageByImageName } from 'utils/getImageByImageName'
import { indent } from 'styles/indent'
import { TitleH1 } from 'components/TitleComponent'
import { useTranslation } from 'react-i18next'
import { Form, IChildrenProps } from 'components/form/Form'
import { useFormHandler } from 'hooks/useFormHandler'
import { RunningLine } from 'components/RunningLine'

const Wrapper = styled.div`
    display: block;
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`

const PromoHeroWraper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.promotion};
    border-bottom: 1px solid ${colors.dark};
    :before {
        ${headerBg}
    }
    @media (orientation: landscape) {
        min-height: 590px;
    }
`

const PromoHeroColumn = styled.div`
    :first-child {
        display: flex;
    }
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-left: 1px solid ${colors.dark};
    border-right: 1px solid ${colors.dark};
    flex-grow: 0;
`
const ContainerStyled = styled(Container)`
    padding: 0 ${indent.mobile};
    box-sizing: border-box;
`

const TitleWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const TitleStyled = styled(TitleH1)`
    font-size: 50px;
    line-height: 65px;
    letter-spacing: 0.666667px;
    overflow: visible;
    text-align: center;
    color: #296963;
    margin-top: 30px;
`
const Price = styled.span`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 60px;
    line-height: 50px;
    letter-spacing: 0.888889px;
    color: ${colors.accentText};
    width: 100%;
    text-align: center;
`
const MobileImage = styled(Img)<{ fluid: FluidObject }>`
    width: 99%;
    height: auto;
    align-self: flex-end;
    margin: 50px 2px 0px;
    @media (orientation: landscape) {
        max-width: 50vw;
    }
`

const For = styled.span`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-size: 50px;
    line-height: 65px;
    letter-spacing: 0.666667px;
    text-align: center;
    color: #296963;
`
const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 16px;
`
const FormTitle = styled.div`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 30px;
    letter-spacing: 1px;
    color: ${colors.dark};
    text-align: center;
    margin: 24px 0;
`
const FormColumn = styled.div`
    width: 100%;
    box-sizing: border-box;
    background-color: ${backgroundColors.formPromo};
    border-bottom: 1px solid ${colors.dark};
`
const SubTitle = styled.h3`
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 0.4px;
    color: ${colors.dark};
    margin: 0 16px;
`

export const PromoHeroMobile = () => {
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

    const imageSofaMobile = getImageByImageName(
        data.allImageSharp,
        promoHeroData.imageMobile
    )
    const {
        handleSubmitStatus,
        handleFormSendStart,
        formSendStatus,
    } = useFormHandler()

    const tracking = {
        conversionType: 'FormPromoPageTop',
        eventCategory: 'FormPromoPageBTOP',
    }
    return (
        <Wrapper>
            <PromoHeroWraper>
                <ContainerStyled columns={'1fr'}>
                    <PromoHeroColumn>
                        <TitleWrapper>
                            <TitleStyled>{promoHeroData.title}</TitleStyled>
                            <Price>
                                <For>{t('for')} </For>
                                {promoHeroData.price}
                            </Price>
                        </TitleWrapper>
                        <MobileImage fluid={imageSofaMobile.fluid} />
                    </PromoHeroColumn>
                </ContainerStyled>
            </PromoHeroWraper>
            <RunningLine>{t('designProject99')}</RunningLine>
            <FormColumn>
                <ContainerStyled columns={'1fr'}>
                    <PromoHeroColumn>
                        <Form
                            buttonText={t('send')}
                            onFormSubmit={handleSubmitStatus}
                            formSendStatus={formSendStatus}
                            onFormSendStart={handleFormSendStart}
                            {...tracking}
                        >
                            {({ register, errors }: IChildrenProps) => (
                                <>
                                    <FormTitle>
                                        {t('defaultFormTitle')}
                                    </FormTitle>
                                    <SubTitle>{t('weSendToYou')}</SubTitle>
                                    <InputBlock>
                                        <PhoneInput
                                            ref={register({
                                                minLength: 18,
                                                required: true,
                                            })}
                                            err={errors.phone}
                                        />
                                        <EmailInput
                                            ref={register}
                                            err={errors.email}
                                        />
                                        <MessageInput
                                            ref={register}
                                            err={errors.message}
                                        />
                                    </InputBlock>
                                </>
                            )}
                        </Form>
                    </PromoHeroColumn>
                </ContainerStyled>
            </FormColumn>
        </Wrapper>
    )
}
