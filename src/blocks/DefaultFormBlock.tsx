import React, { useState } from 'react'
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
import { DefaultFormHero } from './DefaultFormHero'

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
        width: calc(100% - 150px);
        margin-right: 150px;
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
        text-align: left;
        margin: 56px 0 24px;
    }
`

const FormColumn = styled.div`
    width: 100%;
    padding: 0 32px;
    box-sizing: border-box;
    @media (min-width: ${displayWidth.tablet}) {
        outline: 1px solid ${colors.dark};
    }
`
export const DefaultFormBlock = () => {
    const { t } = useTranslation()
    const [isFormSend, setIsFormSend] = useState(false)
    const [isFormNotSend, setIsFormNotSend] = useState(false)
    return (
        <FormWrapper>
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <DefaultFormHero />
                <FormColumn>
                    <FormTitle>{t('defaultFormTitle')}</FormTitle>
                    <Form
                        buttonText={t('send')}
                        handleFormSubmit={(success: boolean) =>
                            success === true
                                ? (setIsFormSend(true), setIsFormNotSend(false))
                                : (setIsFormSend(false), setIsFormNotSend(true))
                        }
                        isFormSend={isFormSend}
                        isFormNotSend={isFormNotSend}
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

                                <input
                                    type="hidden"
                                    name="hidden"
                                    value="lalala"
                                    ref={register}
                                />
                            </InputBlock>
                        )}
                    </Form>
                </FormColumn>
            </Container>
        </FormWrapper>
    )
}
