import { useState } from 'react'

export const useHasValue = () => {
    const [hasValue, hasValueHandleChange] = useState(false)
    const inputHandler = (e: { target: { value: string } }) => {
        if (e.target.value === '') {
            hasValueHandleChange(false)
            return hasValue
        }
        hasValueHandleChange(true)
        return hasValue
    }
    return { inputHandler, hasValue }
}
