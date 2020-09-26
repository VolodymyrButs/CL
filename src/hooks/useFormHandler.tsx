import { useState } from 'react'

const notSend = 'NOT_SEND'
const sendSuccess = 'SUCCESS'
const sendError = 'ERROR'

export type FormSendStatus = 'NOT_SEND' | 'SENDING' | 'SUCCESS' | 'ERROR'

export const useFormHandler = () => {
    const [formSendStatus, setFormSendStatus] = useState<FormSendStatus>(
        notSend
    )

    const handleFormSendStart = () => setFormSendStatus('SENDING')

    const handleSubmitStatus = (success: boolean) =>
        success === true
            ? setFormSendStatus(sendSuccess)
            : setFormSendStatus(sendError)

    return {
        handleFormSendStart,
        handleSubmitStatus,
        formSendStatus,
    }
}
export const isNotSend = (formSendStatus: FormSendStatus) =>
    formSendStatus === notSend
export const isSending = (formSendStatus: FormSendStatus) =>
    formSendStatus === 'SENDING'
export const isFormSuccess = (formSendStatus: FormSendStatus) =>
    formSendStatus === sendSuccess
export const isFormError = (formSendStatus: FormSendStatus) =>
    formSendStatus === sendError
