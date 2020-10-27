import React from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { Form, IChildrenProps, FormTracking } from 'components/form/Form'
import { PhoneInput } from 'components/form/PhoneInput'
import { EmailInput } from 'components/form/EmailInput'
import { MessageInput } from 'components/form/MessageInput'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { colors, backgroundColors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { Container } from 'components/Container'
import { DefaultFormHero } from './DefaultFormHero'
import { useFormHandler } from 'hooks/useFormHandler'

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

const FormColumn = styled.div<{ $size: boolean }>`
    width: 100%;
    padding: ${({ $size }) => ($size === true ? '0' : '0 32px')};
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    box-sizing: border-box;
    ${({ $size }) =>
        $size === true
            ? css`
                  span {
                      box-sizing: border-box;
                      padding: 0 32px;
                      width: 100%;
                      @media (min-width: ${displayWidth.tablet}) {
                          width: 50%;
                      }
                      div {
                          @media (min-width: ${displayWidth.tablet}) {
                              min-width: 200px;
                          }
                          form {
                              div {
                                  @media (min-width: ${displayWidth.tablet}) {
                                      margin-right: 0px;
                                      width: calc(100% - 50px);
                                  }
                              }
                          }
                      }
                      span {
                          padding: 0;
                      }
                  }
                  > div {
                      border-top: 1px solid #000;
                      width: 100%;
                      flex-shrink: 0;
                      @media (min-width: ${displayWidth.tablet}) {
                          width: 50%;
                          border-top: none;
                      }
                  }
              `
            : ''}
    @media (min-width: ${displayWidth.tablet}) {
        flex-direction: row;
    }
`
const Wrap = styled.span`
    width: 100%;
`
export const DefaultFormBlock = ({
    withPhoneMobile,
    tracking,
    children = null,
}: {
    withPhoneMobile?: boolean
    tracking: FormTracking
    children?: React.ReactNode
}) => {
    const { t } = useTranslation()

    // TODO: move to Form
    const {
        handleSubmitStatus,
        handleFormSendStart,
        formSendStatus,
    } = useFormHandler()

    return (
        <FormWrapper>
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <DefaultFormHero withPhoneMobile={withPhoneMobile} />
                <FormColumn $size={Boolean(children)}>
                    <Wrap>
                        <FormTitle>{t('defaultFormTitle')}</FormTitle>
                        <Form
                            buttonText={t('send')}
                            onFormSubmit={handleSubmitStatus}
                            formSendStatus={formSendStatus}
                            onFormSendStart={handleFormSendStart}
                            {...tracking}
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
                                    <EmailInput
                                        ref={register}
                                        err={errors.email}
                                    />
                                </InputBlock>
                            )}
                        </Form>
                    </Wrap>
                    {children}
                </FormColumn>
            </Container>
        </FormWrapper>
    )
}
