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
import { DefaultFormHero } from './DefaultFormHero'

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    background-color: ${backgroundColors.formPromo};
    width: 100%;
    ${mobileAfterBorder};
    border-bottom: 1px solid ${colors.dark};
`

const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
`
const FormTitle = styled.div`
    font-family: 'Yeseva One', cursive;
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

    return (
        <FormWrapper>
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <DefaultFormHero />
                <FormColumn>
                    <FormTitle>{t('defaultFormTitle')}</FormTitle>
                    <Form buttonText={t('send')}>
                        {({ register, errors }: IChildrenProps) => (
                            <InputBlock>
                                <PhoneInput
                                    inputRef={register({
                                        minLength: 18,
                                        required: true,
                                    })}
                                    err={errors.phone}
                                />
                                <MessageInput
                                    inputRef={register}
                                    err={errors.message}
                                />
                                <EmailInput
                                    inputRef={register}
                                    err={errors.email}
                                />

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
