import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Form, IChildrenProps } from 'components/form/Form'
import { PhoneInput } from 'components/form/PhoneInput'
import { EmailInput } from 'components/form/EmailInput'
import { MessageInput } from 'components/form/MessageInput'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { colors, backgroundColors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { Container } from 'components/Container'
import { useFormHandler } from 'hooks/useFormHandler'
import { Button } from 'components/Button'
import { LocalizedLink } from 'i18n/LocalizedLink'
import { sendEvent } from 'tracking'
import { indent } from 'styles/indent'

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    background-color: ${backgroundColors.formPromo};
    width: 100%;
    ${mobileAfterBorder};
    @media (min-width: ${displayWidth.tablet}) {
        border-bottom: 1px solid ${colors.dark};
    }
`

const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: ${displayWidth.desktop}) {
        width: 100%;
    }
`
const FormTitle = styled.div`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 1px;
    color: ${colors.dark};
    text-align: center;
    margin: 40px 0 24px;
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 32px;
        text-align: left;
        margin: 56px 0 24px;
    }
`

const Wrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 32px;
    box-sizing: border-box;
    > div {
        min-width: 250px;
    }
    > form {
        align-items: center;
    }
    @media (min-width: ${displayWidth.tablet}) {
        border-right: 1px solid black;
        > div {
            min-width: 200px;
        }
    }
`
const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    box-sizing: border-box;
    position: relative;
    border-bottom: 1px solid ${colors.dark};
    z-index: 1;
    @media (min-width: ${displayWidth.tablet}) {
        justify-content: space-between;
        border-bottom: none;
        padding: 16px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: 56px 32px;
        align-items: flex-start;
    }
    :after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: ${indent.mobile};
        right: ${indent.mobile};
        border-left: 1px solid ${colors.dark};
        border-right: 1px solid ${colors.dark};
        content: '';
        z-index: -1;
        @media (min-width: ${displayWidth.tablet}) {
            border-left: none;
            border-right: none;
        }
    }
`
const ExampleBlock = styled(Block)`
    background-color: ${backgroundColors.promotion};
    flex: 0 0;
    @media (min-width: ${displayWidth.tablet}) {
        justify-content: space-between;
        border-bottom: none;
        padding: 32px 16px 0px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: 32px 32px 0px;
        align-items: flex-start;
    }
    :after {
        display: none;
    }
`
const ExampleBlock3D = styled(Block)`
    background-color: ${backgroundColors.index};
    flex: 0 0;
    @media (min-width: ${displayWidth.tablet}) {
        justify-content: space-between;
        border-bottom: none;
        padding: 32px 16px 0px;
        border-right: 1px solid black;
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: 32px 32px 0px;
        align-items: flex-start;
    }
    :after {
        display: none;
    }
`
const Title = styled.h2`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-size: 28px;
    line-height: 32px;
    letter-spacing: 1px;
    margin-top: 24px;
    text-align: center;
    color: ${colors.darkText};
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 34px;
        line-height: 39px;
        letter-spacing: 1.68px;
        text-align: left;
    }
`
const SubTitle = styled.h3`
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 0.4px;
    color: ${colors.dark};
    margin-top: 10px;
    strong {
        font-weight: bold;
    }
    a {
        color: ${colors.dark};
    }
    p,
    li {
        text-align: center;
    }
    ol,
    ul {
        margin-left: 1em;
    }
    ol {
        list-style: decimal;
    }
    @media (min-width: ${displayWidth.desktop}) {
        text-align: left;
        ul,
        p,
        li {
            text-align: left;
            margin-left: 0;
        }
    }
`
const ButtonStyled = styled(Button)`
    width: 264px;
    margin: 50px auto;
    z-index: 3;
    @media (max-width: 330px) {
        width: 250px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        width: 220px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 264px;
    }
`

export const OurServicesBottom = () => {
    const { t } = useTranslation()

    // TODO: move to Form
    const {
        handleSubmitStatus,
        handleFormSendStart,
        formSendStatus,
    } = useFormHandler()

    return (
        <FormWrapper>
            <Container columns={'1fr'} tabletColumns={'1fr 1fr 1fr'}>
                <ExampleBlock3D>
                    <Title>{t('comercialForm.example3d')}</Title>
                    <SubTitle>{t('exampleSubtitle3d')}</SubTitle>
                    <LocalizedLink
                        to={'example3d'}
                        onClick={() => {
                            sendEvent('Click', {
                                eventCategory: 'ShowExampleOfProject3d',
                                placement: 'Our Services',
                                target: 'Example3d',
                            })
                        }}
                    >
                        <ButtonStyled
                            aria-label={(t('goTo'), t('comercialForm.example'))}
                        >
                            {t('showProject')}
                        </ButtonStyled>
                    </LocalizedLink>
                </ExampleBlock3D>
                <Wrap>
                    <FormTitle>{t('defaultFormTitle')}</FormTitle>
                    <Form
                        buttonText={t('send')}
                        onFormSubmit={handleSubmitStatus}
                        formSendStatus={formSendStatus}
                        onFormSendStart={handleFormSendStart}
                        conversionType={'FormIndexPageBottom'}
                        eventCategory={'FormIndexPageBottom'}
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
                                <MessageInput
                                    ref={register}
                                    err={errors.message}
                                />
                                <EmailInput ref={register} err={errors.email} />
                            </InputBlock>
                        )}
                    </Form>
                </Wrap>
                <ExampleBlock>
                    <Title>{t('comercialForm.example')}</Title>
                    <SubTitle>{t('exampleSubtitle')}</SubTitle>
                    <LocalizedLink
                        to={'exapmle'}
                        onClick={() => {
                            sendEvent('Click', {
                                eventCategory: 'ShowExampleOfProject',
                                placement: 'Our Services',
                                target: 'Example',
                            })
                        }}
                    >
                        <ButtonStyled
                            aria-label={(t('goTo'), t('comercialForm.example'))}
                        >
                            {t('showProject')}
                        </ButtonStyled>
                    </LocalizedLink>
                </ExampleBlock>
            </Container>
        </FormWrapper>
    )
}
