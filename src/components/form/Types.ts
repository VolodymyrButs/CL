import { TFunction } from 'i18next'
import React from 'react'

export interface IInputProps {
    err?: string
    isValid?: string
    labelBottom?: number
    placeholder?: TFunction | string
    type?: string
    name?: string
    id?: string
    defaultValue?: string | number | string[]
    children?: React.ReactNode | React.ReactChild
    questionPlaceholder?: string
    maxHeight?: string
    options?: { value: string; label: string }[]
}
