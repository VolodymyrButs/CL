import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useTranslation } from 'react-i18next'

import { Button } from 'cad/Button'
import { accentDark } from 'cad/themes/accentDark'
import { light } from 'cad/themes/light'

const ModalWraper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.overlayColor};
`
const ModalContainer = styled.div`
    box-sizing: border-box;
    width: 640px;
    max-width: 90%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
`

type FeedbackModalProps = {
    onClose: () => void
}

export const FeedbackModal = ({ onClose }: FeedbackModalProps) => {
    const { t } = useTranslation()

    return (
        <ThemeProvider theme={light}>
            <ModalWraper>
                <ModalContainer>
                    <FeedbackForm />

                    <Button onClick={onClose}>{t('Close')}</Button>
                </ModalContainer>
            </ModalWraper>
        </ThemeProvider>
    )
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
    text-align: center;
`

const Text = styled.h3`
    color: ${({ theme }) => theme.color};
`

const FeedbackText = styled.textarea`
    padding: 10px 20px;
    width: 100%;
    max-width: 100%;
    min-width: 100px;
    font-size: 16px;
    line-height: 20px;
    height: calc(20px * 6);
    min-height: calc(20px * 6);
    box-sizing: border-box;
`

const SubmitButton = styled(Button)`
    margin: 10px 0;
`

export const FeedbackForm = () => {
    const { t } = useTranslation()
    const [feedbackContent, setFeedbackContent] = useState('')
    const [isFormSent, setIsFormSent] = useState(false)

    const handleFeedbackChange = (event: { target: { value: string } }) => {
        setFeedbackContent(event.target.value)
    }

    const handleFormSubmit = (event: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        preventDefault: any
        target: { value: string }
    }) => {
        event
            .preventDefault()(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                window as any
            )
            .ga('send', 'event', 'FeedbackForm', 'Send', feedbackContent)
        setIsFormSent(true)
    }

    if (isFormSent) {
        return <Text>{t('ThanksForYourFeedback')}</Text>
    }

    return (
        <Form onSubmit={() => handleFormSubmit}>
            <Text>{t('HelpUsImproveTheApp')}</Text>

            <FeedbackText
                placeholder="..."
                value={feedbackContent}
                onChange={handleFeedbackChange}
            />

            <SubmitButton type="submit" theme={accentDark}>
                {t('LeaveFeedback')}
            </SubmitButton>
        </Form>
    )
}
