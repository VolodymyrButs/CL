import { useState } from 'react'

export const useHasValue = () => {
    const [hasValue, hasValueHandleChange] = useState(false)
    const inputHandler = (event: { target: { value: string } }) => {
        if (event.target.value === '') {
            hasValueHandleChange(false)
            return hasValue
        }
        hasValueHandleChange(true)
        return hasValue
    }
    return { inputHandler, hasValue }
}
