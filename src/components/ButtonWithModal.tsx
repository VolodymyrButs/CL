import React, { useState } from 'react'
import styled from 'styled-components'

import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { Modal } from './Modal'
import { Form, IChildrenProps, FormTracking } from 'components/form/Form'
import { PhoneInput } from 'components/form/PhoneInput'
import { Title } from 'components/TitleComponent'
import { Button } from './Button'
import { EmailInput } from './form/EmailInput'
import { MessageInput } from './form/MessageInput'
import { useFormHandler } from 'hooks/useFormHandler'

const SubTitle = styled.h3`
    display: block;
    text-align: left;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.4px;
    color: ${colors.dark};
    margin: 16px 0;
    text-align: center;
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
    }
`
const Wrapper = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    @media (min-width: ${displayWidth.tablet}) {
        align-items: flex-start;
        justify-content: space-around;
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: 15px 50px 0;
    }
`
const TitleStyled = styled(Title)`
    margin: 20px 0;
    @media (orientation: landscape) {
        margin: 16px 0;
    }
`
const ButtonStyled = styled(Button)`
    width: 264px;
    margin: 20px auto;
    @media (max-width: 330px) {
        width: 250px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        width: 220px;
        margin: 30px 0;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 264px;
    }
`
export const ButtonWithModal = ({
    modalTitle,
    modalDescription,
    buttonLabel,
    placeholder,
    submitLabel,
    tracking,
}: {
    modalTitle: string
    modalDescription: string
    buttonLabel: string
    placeholder: string
    submitLabel: string
    tracking: FormTracking
}) => {
    const [isModalOpen, setModalIsOpen] = useState(false)
    const { handleSubmitStatus, formSendStatus } = useFormHandler()
    return (
        <>
            <Modal
                isOpen={isModalOpen}
                closeHandler={() => setModalIsOpen(false)}
            >
                <Wrapper>
                    <>
                        <TitleStyled>{modalTitle}</TitleStyled>
                        <SubTitle>{modalDescription}</SubTitle>
                        <Form
                            formName={'Callback Form'}
                            buttonText={submitLabel}
                            onFormSubmit={handleSubmitStatus}
                            formSendStatus={formSendStatus}
                            closeHandler={setModalIsOpen}
                            {...tracking}
                        >
                            {({ register, errors }: IChildrenProps) => (
                                <div>
                                    <PhoneInput
                                        ref={register({
                                            minLength: 18,
                                            required: true,
                                        })}
                                        err={errors.phone}
                                    />

                                    <MessageInput
                                        ref={register({
                                            required: true,
                                        })}
                                        err={errors.message}
                                        placeholder={placeholder}
                                        maxHeight={'90px'}
                                    />

                                    <EmailInput
                                        ref={register}
                                        err={errors.email}
                                    />
                                </div>
                            )}
                        </Form>
                    </>
                </Wrapper>
            </Modal>

            <ButtonStyled
                onClick={() => {
                    setModalIsOpen(true)
                }}
            >
                {buttonLabel}
            </ButtonStyled>
        </>
    )
}
