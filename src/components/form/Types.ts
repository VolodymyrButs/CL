import { useForm } from 'react-hook-form'

export interface IInputProps {
    inputRef: (
        ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
    ) => void | ReturnType<typeof useForm>['register']
    err?: string
    isValid?: string
    placeholder?: string
    name?: string
    defaultValue?: string
    children?: React.ReactNode
}
