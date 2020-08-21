import { useForm } from 'react-hook-form'

export interface IInputProps {
    inputRef?: (
        ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
    ) => void | ReturnType<typeof useForm>['register']
    err?: string
    isValid?: string
    placeholder?: string
    name?: string
    id?: string
    defaultValue?: string
    children?: React.ReactNode | React.ReactChild
    questionPlaceholder?: string
    maxHeight?: string
}
export interface ILabelProps {
    placeholder?: string
    children?: React.ReactNode
}
