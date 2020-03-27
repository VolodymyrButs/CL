import { CustomElement, useForm } from 'react-hook-form'

export interface IInputProps {
    inputRef: (
        ref:
            | HTMLInputElement
            | HTMLSelectElement
            | HTMLTextAreaElement
            | CustomElement
            | null
    ) => void | ReturnType<typeof useForm>['register']
    err: string
}
