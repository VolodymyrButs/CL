import { useState } from 'react'

export const useFormHandler = () => {
    const notSent = 'NOT_SENT'
    const sendSuccess = 'SUCCESS'
    const sendError = 'ERROR'
    const [formSendStatus, setFormSendStatus] = useState(notSent)
    const handleSubmit = (success: boolean) =>
        success === true
            ? setFormSendStatus(sendSuccess)
            : setFormSendStatus(sendError)

    return {
        handleSubmit,
        formSendStatus,
    }
}
export const isNotSend = (formSendStatus: string) =>
    formSendStatus === 'NOT_SEND'
export const isFormSuccess = (formSendStatus: string) =>
    formSendStatus === 'SUCCESS'
export const isFormError = (formSendStatus: string) =>
    formSendStatus === 'ERROR'
