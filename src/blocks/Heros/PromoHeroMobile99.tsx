import React from 'react'
import styled, { keyframes } from 'styled-components'

import { colors, backgroundColors } from 'styles/colors'
import { Container } from 'components/Container'
import { PhoneInput } from 'components/form/PhoneInput'

import { displayWidth } from 'styles/width'

import { indent } from 'styles/indent'
import { useTranslation } from 'react-i18next'
import { Form, IChildrenProps } from 'components/form/Form'
import { useFormHandler } from 'hooks/useFormHandler'
import { EmailInput } from 'components/form/EmailInput'
import { MessageInput } from 'components/form/MessageInput'

const Wrapper = styled.div`
    display: block;
    margin-top: 0.1px;
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`

const PromoHeroWraper = styled.div<{ text?: boolean }>`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: white;
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
        width: 68%;
        margin: 10px auto 30px;
        height: 60px;
        background-color: ${colors.accentText};
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
        width: 250px;
        margin: 10px auto;
    }
    textarea {
        margin: 10px auto;
    }

    span {
        bottom: 16px;
        font-size: 16px;
        color: #757474;
    }
`
const FormTitle = styled.div`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 50px;
    letter-spacing: 1px;
    color: ${colors.accentText};
    text-align: center;
    margin: 10px;
    p {
        margin-top: 5px;
        text-transform: uppercase;
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

export const PromoHeroMobile99 = ({ text }: { text?: boolean }) => {
    const { t } = useTranslation()

    const {
        handleSubmitStatus,
        handleFormSendStart,
        formSendStatus,
    } = useFormHandler()

    return (
        <Wrapper>
            <PromoHeroWraper text={text}>
                <ContainerStyled columns={'1fr'}>
                    <PromoHeroColumn>
                        <FormTitle>
                            {text ? t('designQuestion') : t('writeToUs')}
                        </FormTitle>
                        <Form
                            buttonText={t('send')}
                            onFormSubmit={handleSubmitStatus}
                            formSendStatus={formSendStatus}
                            onFormSendStart={handleFormSendStart}
                            conversionType={'TopFormDesktopPosadka99'}
                            eventCategory={'TopFormDesktopPosadka99'}
                        >
                            {({ register, errors }: IChildrenProps) => (
                                <InputBlock>
                                    <PhoneInput
                                        labelBottom={-5}
                                        placeholder={t('InputPhone')}
                                        ref={register({
                                            minLength: 18,
                                            required: true,
                                        })}
                                        err={errors.phone}
                                    />

                                    <EmailInput
                                        labelBottom={-5}
                                        placeholder={t('InputEmail')}
                                        ref={register}
                                        err={errors.email}
                                    />
                                    <MessageInput
                                        labelBottom={-5}
                                        placeholder={t('InputQuestion')}
                                        ref={register}
                                        err={errors.message}
                                    />
                                </InputBlock>
                            )}
                        </Form>
                    </PromoHeroColumn>
                </ContainerStyled>
            </PromoHeroWraper>
            {!text && (
                <RunningTextContainer>
                    <Wrapper1>
                        <Text>{t('designProject99').repeat(20)}</Text>
                        <Text2>{t('designProject99').repeat(20)}</Text2>
                    </Wrapper1>
                </RunningTextContainer>
            )}
        </Wrapper>
    )
}
