export interface IInputProps {
    err?: string
    isValid?: string
    placeholder?: string
    name?: string
    id?: string
    defaultValue?: string | number | string[]
    children?: React.ReactNode | React.ReactChild
    questionPlaceholder?: string
    maxHeight?: string
    type?: string
}
export interface ILabelProps {
    placeholder?: string
    children?: React.ReactNode
}
