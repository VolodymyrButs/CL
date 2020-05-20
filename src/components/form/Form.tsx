import React from 'react'
import { useForm } from 'react-hook-form'
import fetch from 'node-fetch'
import { TFunction } from 'i18next'

import { Button } from 'components/Button'

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
    const { register, errors, handleSubmit } = useForm()
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
            <Button type="submit">{buttonText}</Button>
        </form>
    )
}
