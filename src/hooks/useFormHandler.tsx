import { useState } from 'react'

export const useFormHandler = () => {
    const [isFormSend, setIsFormSend] = useState(false)
    const [isFormNotSend, setIsFormNotSend] = useState(false)
    const handleSubmit = (success: boolean) =>
        success === true
            ? (setIsFormSend(true), setIsFormNotSend(false))
            : (setIsFormSend(false), setIsFormNotSend(true))

    return {
        handleSubmit,
        isFormSend,
        setIsFormSend,
        isFormNotSend,
        setIsFormNotSend,
    }
}
