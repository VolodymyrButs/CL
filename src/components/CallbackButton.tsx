import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'

import { colors } from 'styles/colors'
import CallbackIcon from 'assets/icons/callback.svg'
import { displayWidth } from 'styles/width'
import { Modal } from './Modal'
import { Form, IChildrenProps } from 'components/form/Form'
import { PhoneInput } from 'components/form/PhoneInput'
import { useStaticQuery, graphql } from 'gatsby'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { Title } from 'components/TitleComponent'
import { useFormHandler } from 'hooks/useFormHandler'
import { PhoneSvgAnimated } from './PhoneSvgAnimated'
import { contactInformation } from './contactInformation'

const CallbackButtonWrapperMobile = styled.button<{ open?: boolean }>`
    position: fixed;
    bottom: 10px;
    left: 18px;
    width: 64px;
    height: 64px;
    ${({ open }) =>
        open === true
            ? `background-color: rgba(213, 213, 213, 0.85596)`
            : `background-color: ${colors.dark}`};
    border: 1px solid ${colors.dark};
    border-radius: 50%;
    z-index: 11;
    :after,
    :before {
        pointer-events: none;
        content: '';
        display: block;
        position: absolute;
        border: 1px solid ${colors.dark};
        border-radius: 50%;
        bottom: -10px;
        top: -10px;
        right: -10px;
        left: -10px;
        animation: ${(props) =>
            props.open ? 'none' : 'pulse 2s linear infinite;'};
        opacity: 0;
        background-color: rgba(255, 255, 255, 0.07);
    }
    :after {
        animation-delay: 0.5s;
    }
    @keyframes pulse {
        0% {
            transform: scale(0.5);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: scale(1.2);
            opacity: 0;
        }
    }
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
        left: 8px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        left: calc((50vw - ${displayWidth.desktop} / 2) + 8px);
    }
    :hover {
        cursor: pointer;
    }
`
const CallbackButtonWrapperDesktop = styled(CallbackButtonWrapperMobile)`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
        left: 8px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        left: calc((50vw - ${displayWidth.desktop} / 2) + 8px);
    }
`

const callbackButtonIcon = css`
    fill: ${colors.white};
    width: 32px;
    height: 64px;
    cursor: pointer;
    pointer-events: auto;
`
const CallbackIconStyled = styled(CallbackIcon)`
    ${callbackButtonIcon};
`
const PhoneSvgAnimatedStyled = styled(PhoneSvgAnimated)`
    pointer-events: auto;
    fill: ${colors.white};
    width: 40%;
    height: 40%;
    left: 30%;
    top: 30%;
`
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
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    @media (orientation: landscape) {
        padding: 10px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        align-items: flex-start;
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: 30px 50px 0;
        justify-content: space-around;
    }
`
const TitleStyled = styled(Title)`
    margin: 50px 0;
    @media (orientation: landscape) {
        margin: 16px 0;
    }
`
export const CallbackButton = () => {
    const [isModalOpen, setModalIsOpen] = useState(false)
    const { handleSubmitStatus, formSendStatus } = useFormHandler()
    const { t, i18n } = useTranslation()

    const data = useStaticQuery(graphql`
        query {
            allCallbackButtonYaml {
                edges {
                    node {
                        subTitle
                        title
                        parent {
                            ... on File {
                                name
                            }
                        }
                    }
                }
            }
        }
    `)
    const addressData = getDataByLanguage(
        data.allCallbackButtonYaml,
        i18n.language
    )
    const { subTitle, title } = addressData
    return (
        <>
            <Modal
                isOpen={isModalOpen}
                closeHandler={() => setModalIsOpen(false)}
            >
                <Wrapper>
                    <TitleStyled>{title}</TitleStyled>
                    <SubTitle>{subTitle}</SubTitle>
                    <Form
                        formName={'Question Form'}
                        buttonText={t('send')}
                        onFormSubmit={handleSubmitStatus}
                        formSendStatus={formSendStatus}
                        closeHandler={setModalIsOpen}
                    >
                        {({ register, errors }: IChildrenProps) => (
                            <>
                                <PhoneInput
                                    ref={register({
                                        minLength: 18,
                                        required: true,
                                    })}
                                    err={errors.phone}
                                />
                            </>
                        )}
                    </Form>
                </Wrapper>
            </Modal>
            <CallbackButtonWrapperMobile aria-label="Callback Button">
                <a href={`tel:${contactInformation.primaryPhone}`}>
                    <PhoneSvgAnimatedStyled />
                </a>
            </CallbackButtonWrapperMobile>

            <CallbackButtonWrapperDesktop
                aria-label="Callback Button"
                onClick={() => {
                    setModalIsOpen(true)
                }}
            >
                <CallbackIconStyled />
            </CallbackButtonWrapperDesktop>
        </>
    )
}
