import React from 'react'
import { useForm } from 'react-hook-form'
import fetch from 'node-fetch'
import { TFunction } from 'i18next'

import { Button } from 'components/Button'
import { displayWidth } from 'styles/width'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { isFormSuccess, isFormError } from 'hooks/useFormHandler'

const ButtonStyled = styled(Button)`
    width: 264px;
    margin: 50px auto;
    z-index: 3;
    @media (max-width: 330px) {
        width: 250px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        width: 220px;
        margin: 50px 0;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 264px;
    }
`
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    @media (min-width: ${displayWidth.tablet}) {
        justify-content: flex-start;
    }
`
const FormStyled = styled.form`
    position: relative;
`
const SendStatus = styled.p`
    width: 100%;
    text-align: center;
    position: absolute;
    left: 5px;
    bottom: 10px;
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
    }
`
interface IFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any
    formName?: string
    buttonText?: TFunction | string
    onFormSubmit?: (success: boolean) => void
    formSendStatus?: string
}
export interface IChildrenProps {
    register: ReturnType<typeof useForm>['register']
    errors: ReturnType<typeof useForm>['errors']
}
export const Form: React.FC<IFormProps> = ({
    children,
    onFormSubmit = () => {},
    formName = 'Clearline Form',
    buttonText = 'Send',
    formSendStatus = 'NOT_SEND',
}) => {
    const { register, errors, handleSubmit } = useForm({
        mode: 'onBlur',
    })
    const onSubmit = (data: object) => {
        fetch('/send-form', {
            method: 'POST',
            body: JSON.stringify({
                ...data,
                formName,
            }),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(response => {
                return response.json()
            })
            .then(success => {
                onFormSubmit(success.success)
            })
            .catch(() => onFormSubmit(false))
    }
    const childrenProps: IChildrenProps = { register, errors }
    const { t } = useTranslation()
    return (
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
            {children(childrenProps)}
            <ButtonWrapper>
                <ButtonStyled
                    disabled={isFormSuccess(formSendStatus)}
                    type="submit"
                >
                    {buttonText}
                </ButtonStyled>
            </ButtonWrapper>
            {isFormSuccess(formSendStatus) && (
                <SendStatus>{t('isSendSuccess')}</SendStatus>
            )}
            {isFormError(formSendStatus) && (
                <SendStatus>{t('isSendError')}</SendStatus>
            )}
        </FormStyled>
    )
}
