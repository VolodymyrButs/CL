import React, { useState } from 'react'
import fetch from 'node-fetch'
import { TFunction } from 'i18next'

import { Button } from 'components/Button'
import { displayWidth } from 'styles/width'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import {
    isFormSuccess,
    isFormError,
    FormSendStatus,
} from 'hooks/useFormHandler'
import { useForm } from 'react-hook-form'
import { Modal } from 'components/Modal'

const FormWrapper = styled.div`
    position: relative;
    @media (min-width: ${displayWidth.tablet}) {
        min-width: 350px;
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
export const SendStatus = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    width: 600px;
    height: 100%;
    text-align: center;
    align-items: center;
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
    }
    p {
        margin: 10px 0;
        font-size: 20px;
        line-height: 30px;
        white-space: normal;
        text-align: center;
        @media (min-width: ${displayWidth.tablet}) {
            font-size: 30px;
            line-height: 40px;
            margin: 30px 0;
        }
    }
    h2 {
        text-align: center;
        margin: 20px 0;
        font-size: 25px;
        line-height: 40px;
        font-weight: 600;
        white-space: normal;
        @media (min-width: ${displayWidth.tablet}) {
            font-size: 30px;
            line-height: 40px;
            margin: 30px 0;
        }
    }
`
interface IFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any
    formName?: string
    buttonText?: TFunction | string
    onFormSubmit?: (success: boolean) => void
    formSendStatus?: FormSendStatus
    closeHandler?: (arg: boolean) => void
}
export interface IChildrenProps {
    register: ReturnType<typeof useForm>['register']
    errors: ReturnType<typeof useForm>['errors']
}
export const Form: React.FC<IFormProps> = ({
    children,
    onFormSubmit = () => {},
    formName = 'Regular Form',
    buttonText = 'Send',
    formSendStatus = 'NOT_SEND',
    closeHandler,
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
            .then((response) => {
                return response.json()
            })
            .then((success) => {
                onFormSubmit(success.success)
            })
            .catch(() => onFormSubmit(false))
    }
    const childrenProps: IChildrenProps = { register, errors }
    const { t } = useTranslation()
    const [isOpenFormModal, setIsOpenFormModal] = useState(false)

    return (
        <FormWrapper>
            <FormStyled onSubmit={handleSubmit(onSubmit)}>
                {children(childrenProps)}
                <ButtonWrapper>
                    <ButtonStyled
                        disabled={isFormSuccess(formSendStatus)}
                        onClick={() => setIsOpenFormModal(true)}
                        type="submit"
                    >
                        {buttonText}
                    </ButtonStyled>
                </ButtonWrapper>
            </FormStyled>
            {isFormSuccess(formSendStatus) && (
                <Modal
                    isOpen={isOpenFormModal}
                    closeHandler={() => {
                        setIsOpenFormModal(false)
                        closeHandler && closeHandler(false)
                    }}
                >
                    <SendStatus>
                        <h2>{t('isSendSuccess')}</h2>
                        <ButtonStyled
                            onClick={() => {
                                setIsOpenFormModal(false)
                                closeHandler && closeHandler(false)
                            }}
                        >
                            {t('goBack')}
                        </ButtonStyled>
                    </SendStatus>
                </Modal>
            )}
            {isFormError(formSendStatus) && (
                <Modal
                    isOpen={isOpenFormModal}
                    closeHandler={() => {
                        setIsOpenFormModal(false)
                        closeHandler && closeHandler(false)
                    }}
                >
                    <SendStatus>
                        <p>{t('isSendError')}</p>
                        <ButtonStyled
                            onClick={() => {
                                setIsOpenFormModal(false)
                                closeHandler && closeHandler(false)
                            }}
                        >
                            {t('goBack')}
                        </ButtonStyled>
                    </SendStatus>
                </Modal>
            )}
        </FormWrapper>
    )
}
