import React from 'react'
import { useForm } from 'react-hook-form'

interface IFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any
}
export interface IChildrenProps {
    register: ReturnType<typeof useForm>['register']
    errors: ReturnType<typeof useForm>['errors']
}
export const Form: React.FC<IFormProps> = ({ children }) => {
    const { register, errors, handleSubmit } = useForm()
    const onSubmit = (data: object) => {
        // eslint-disable-next-line no-undef
        console.log(data) // eslint-disable-line no-console
    }
    const childrenProps: IChildrenProps = { register, errors }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {children(childrenProps)}
            <button type="submit">Click</button>
        </form>
    )
}
