import React from 'react'
import styled, { css, keyframes } from 'styled-components'

import { colors, backgroundColors } from 'styles/colors'
import { Container } from 'components/Container'
import { PhoneInput } from 'components/form/PhoneInput'

import { displayWidth } from 'styles/width'

import { indent } from 'styles/indent'
import { useTranslation } from 'react-i18next'
import { Form, IChildrenProps } from 'components/form/Form'
import { useFormHandler } from 'hooks/useFormHandler'
import { inputStyle } from 'styles/inputStyle'

const Wrapper = styled.div`
    display: block;
    margin-top: 0.1px;
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`

const PromoHeroWraper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${backgroundColors.contact};
    border-bottom: 1px solid ${colors.dark};
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
    button {
        width: 94%;
        margin: 10px auto 20px;
    }
`
const ContainerStyled = styled(Container)`
    padding: 0 ${indent.mobile};
    box-sizing: border-box;
`

const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 16px;
    input {
        border: 1px solid black;
        margin: 10px 0;
        padding: 10px;
        border-radius: 7px;
    }
    label {
        span {
            display: none;
        }

        input {
            border: 1px solid black;
            margin: 10px 0;
            padding: 10px;
            border-radius: 7px;
        }
    }
`
const FormTitle = styled.div`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 30px;
    letter-spacing: 1px;
    color: #00655b;
    text-align: center;
    margin: 10px;
    p {
        margin-top: 5px;
        text-transform: uppercase;
    }
`

const InputStyle = styled.input<{ isValid?: string }>`
    ${inputStyle}
    ${(props) =>
        props.isValid &&
        css`
            border-bottom-color: red;
        `};
    :-webkit-autofill {
        transition: background-color 5000s ease-in-out 0s;
        background: -webkit-linear-gradient(
            top,
            rgba(255, 255, 255, 0) 0%,
            rgba(0, 174, 255, 0.04) 50%,
            rgba(255, 255, 255, 0) 51%,
            rgba(0, 174, 255, 0.03) 100%
        );
    }
`
const run = keyframes`
0% {
    transform:translateX(100%)
}
100% {
    transform:translateX(-100%)
}
`
const run2 = keyframes`
0% {
    transform:translateX(0)
}
100% {
    transform:translateX(-200%)
}
`
const RunningTextContainer = styled.div`
    width: 100%;
    height: 50px;
    background-color: ${backgroundColors.formPromo};
    color: ${colors.dark};
    border-bottom: 1px solid ${colors.dark};

    overflow: hidden;
    position: relative;
`
const Wrapper1 = styled.div`
    height: 100%;
    display: flex;
`
const Text = styled.p`
    align-self: center;
    color: inherit;
    font-size: 16px;
    line-height: 20px;
    white-space: nowrap;
    text-transform: uppercase;
    animation: ${run} 240s linear infinite;
    animation-delay: -120s;
    @media (min-width: ${displayWidth.tablet}) {
        animation: ${run} 120s linear infinite;
        animation-delay: -60s;
    }
`
const Text2 = styled(Text)`
    animation: ${run2} 240s linear infinite;
    animation-delay: -240s;
    @media (min-width: ${displayWidth.tablet}) {
        animation: ${run2} 120s linear infinite;
        animation-delay: -120s;
    }
`
export const PromoHeroMobile = () => {
    const { t } = useTranslation()

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
                        <Form
                            buttonText={t('sendAsk')}
                            onFormSubmit={handleSubmitStatus}
                            formSendStatus={formSendStatus}
                            onFormSendStart={handleFormSendStart}
                            {...tracking}
                        >
                            {({ register, errors }: IChildrenProps) => (
                                <>
                                    <FormTitle>
                                        {t('formHeroPosadka')}
                                    </FormTitle>
                                    <InputBlock>
                                        <PhoneInput
                                            placeholder={t('phone')}
                                            ref={register({
                                                minLength: 18,
                                                required: true,
                                            })}
                                            err={errors.phone}
                                        />
                                        <InputStyle
                                            type="email"
                                            name="email"
                                            placeholder={t('email')}
                                            ref={register}
                                            isValid={errors.email}
                                        />
                                    </InputBlock>
                                </>
                            )}
                        </Form>
                    </PromoHeroColumn>
                </ContainerStyled>
            </PromoHeroWraper>
            <RunningTextContainer>
                <Wrapper1>
                    <Text>{t('designProject99').repeat(20)}</Text>
                    <Text2>{t('designProject99').repeat(20)}</Text2>
                </Wrapper1>
            </RunningTextContainer>
        </Wrapper>
    )
}
