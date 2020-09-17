import { useState } from 'react'

const notSend = 'NOT_SEND'
const sendSuccess = 'SUCCESS'
const sendError = 'ERROR'

export type FormSendStatus = 'NOT_SEND' | 'SUCCESS' | 'ERROR'

export const useFormHandler = () => {
    const [formSendStatus, setFormSendStatus] = useState<FormSendStatus>(
        notSend
    )
    const handleSubmitStatus = (success: boolean) =>
        success === true
            ? setFormSendStatus(sendSuccess)
            : setFormSendStatus(sendError)

    return {
        handleSubmitStatus,
        formSendStatus,
    }
}
export const isNotSend = (formSendStatus: FormSendStatus) =>
    formSendStatus === notSend
export const isFormSuccess = (formSendStatus: FormSendStatus) =>
    formSendStatus === sendSuccess
export const isFormError = (formSendStatus: FormSendStatus) =>
    formSendStatus === sendError
