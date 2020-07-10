import React from 'react'
import { useForm } from 'react-hook-form'
import fetch from 'node-fetch'
import { TFunction } from 'i18next'

import { Button } from 'components/Button'
import { displayWidth } from 'styles/width'
import styled from 'styled-components'

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
interface IFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any
    formName?: string
    buttonText?: TFunction
}
export interface IChildrenProps {
    register: ReturnType<typeof useForm>['register']
    errors: ReturnType<typeof useForm>['errors']
}
export const Form: React.FC<IFormProps> = ({
    children,
    formName = 'Clearline Form',
    buttonText = 'Send',
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
    }
    const childrenProps: IChildrenProps = { register, errors }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {children(childrenProps)}
            <ButtonWrapper>
                <ButtonStyled type="submit">{buttonText}</ButtonStyled>
            </ButtonWrapper>
        </form>
    )
}
