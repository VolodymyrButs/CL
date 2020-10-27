import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useTranslation } from 'react-i18next'

import { accentDark } from 'cad/themes/accentDark'
import { light } from 'cad/themes/light'
import CloseIcon from 'assets/icons/Exit.svg'
import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { Button } from 'components/Button'

const ModalWraper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    width: 100%;
    height: 100%;
    background-color: #000000ef;
`
const ModalContainer = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 700px;
    max-width: 90%;
    padding: 50px 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    @media (min-width: ${displayWidth.tablet}) {
        padding: 30px 70px;
    }
`
const CloseIconStyled = styled(CloseIcon)`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 4;
    fill: ${colors.dark};
    stroke: ${colors.white};
`
type FeedbackModalProps = {
    onClose: () => void
}

export const FeedbackModal = ({ onClose }: FeedbackModalProps) => {
    return (
        <ThemeProvider theme={light}>
            <ModalWraper>
                <ModalContainer>
                    <FeedbackForm />

                    <CloseIconStyled onClick={onClose} />
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
    @media (min-width: ${displayWidth.tablet}) {
        align-items: flex-start;
    }
`

const Text = styled.h3`
    color: black;
    font-family: 'Yeseva One';
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 42px;
    letter-spacing: 1.77882px;
    text-align: center;
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
        margin-bottom: 20px;
    }
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
    border-radius: 10px;
`

const SubmitButton = styled(Button)`
    margin: 20px 0 0;
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
