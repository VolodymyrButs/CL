import React from 'react'
import { useForm } from 'react-hook-form'
import fetch from 'node-fetch'

interface IFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any
    formName?: string
}
export interface IChildrenProps {
    register: ReturnType<typeof useForm>['register']
    errors: ReturnType<typeof useForm>['errors']
}
export const Form: React.FC<IFormProps> = ({
    children,
    formName = 'Clearline Form',
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
            <button type="submit">Click</button>
        </form>
    )
}
