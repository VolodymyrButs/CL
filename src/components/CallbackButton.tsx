import React, { useState, useLayoutEffect } from 'react'
import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'

import { colors } from 'styles/colors'
import CallbackIcon from 'assets/icons/callback.svg'
import CloseIcon from 'assets/icons/Exit.svg'
import Viber from 'assets/icons/Viber.svg'
import Telegram from 'assets/icons/Telegram.svg'
import Whatsapp from 'assets/icons/Whatsapp.svg'
import PhoneIcon from 'assets/icons/Phone.svg'
import { displayWidth } from 'styles/width'
import { Modal } from './Modal'
import { Form, IChildrenProps } from 'components/form/Form'
import { PhoneInput } from 'components/form/PhoneInput'
import { useStaticQuery, graphql } from 'gatsby'
import { getDataByLanguage } from 'utils/getDataByLanguage'
import { Title } from 'components/TitleComponent'
import { Button } from './Button'

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
    z-index: 4;
    :after,
    :before {
        content: '';
        display: block;
        position: absolute;
        border: 1px solid ${colors.dark};
        border-radius: 50%;
        bottom: -10px;
        top: -10px;
        right: -10px;
        left: -10px;
        animation: ${props =>
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
const iconStyles = css`
    width: 58px;
    height: 58px;
    margin: 4px 3px;
    cursor: pointer;
    pointer-events: auto;
`
const ViberIconStyled = styled(Viber)`
    ${iconStyles};
    fill: ${colors.viber};
`
const TelegramIconStyled = styled(Telegram)`
    ${iconStyles};
    fill: ${colors.telegram};
`
const WhatsappIconStyled = styled(Whatsapp)`
    ${iconStyles};
    fill: ${colors.whatsapp};
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
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`
const CloseIconStyled = styled(CloseIcon)`
    ${callbackButtonIcon};
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`
const PhoneIconStyled = styled(PhoneIcon)`
    display: none;
    ${callbackButtonIcon};
    @media (min-width: ${displayWidth.tablet}) {
        display: inline;
    }
`

const CallBackTextButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    ${iconStyles};
    border-radius: 50%;
    background-color: ${colors.dark};
    font-style: normal;
    font-weight: normal;
    text-align: center;
    font-size: 9px;
    line-height: 12px;
    color: ${colors.white};
`
const IconBarWrapper = styled.div`
    position: fixed;
    bottom: 76px;
    left: 18px;
    z-index: 4;
    height: 270px;
    overflow: hidden;
    pointer-events: none;
`
const IconBar = styled.div<{ open: boolean }>`
    display: ${props => (props.open ? 'flex' : 'none')};
    flex-direction: column;
    width: 74px;
    height: 270px;
    animation: ${props => (props.open ? 'show 1s linear' : '')};
    @keyframes show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
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
const ButtonStyled = styled(Button)`
    margin: 50px 0;
`
export const CallbackButton = () => {
    const [isCallbackMenuOpen, setIsOpenCallbackMenu] = useState(false)
    const [isModalOpen, setModalIsOpen] = useState(false)
    const [isFormSend, setIsFormSend] = useState(false)
    const { t, i18n } = useTranslation()

    useLayoutEffect(() => {
        window.addEventListener(
            'resize',
            () =>
                window.matchMedia(`(min-width: ${displayWidth.tablet})`)
                    .matches && setIsOpenCallbackMenu(false)
        )
    })
    const data = useStaticQuery(graphql`
        query {
            allCallbackButtonYaml {
                edges {
                    node {
                        secondSubTitle
                        secondTitle
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
    const { secondSubTitle, secondTitle, subTitle, title } = addressData
    return (
        <>
            <Modal
                isOpen={isModalOpen}
                closeHandler={() => setModalIsOpen(false)}
            >
                <Wrapper>
                    {isFormSend ? (
                        <>
                            <TitleStyled>{secondTitle}</TitleStyled>
                            <SubTitle>{secondSubTitle}</SubTitle>
                            <ButtonStyled
                                onClick={() => {
                                    setIsFormSend(!isFormSend),
                                        setModalIsOpen(false)
                                }}
                            >
                                {t('goBack')}
                            </ButtonStyled>
                        </>
                    ) : (
                        <>
                            <TitleStyled>{title}</TitleStyled>
                            <SubTitle>{subTitle}</SubTitle>
                            <Form
                                formName={'Callback Form'}
                                buttonText={t('send')}
                                handleFormSubmit={() =>
                                    setIsFormSend(!isFormSend)
                                }
                            >
                                {({ register, errors }: IChildrenProps) => (
                                    <PhoneInput
                                        inputRef={register({
                                            minLength: 18,
                                            required: true,
                                        })}
                                        err={errors.phone}
                                    />
                                )}
                            </Form>
                        </>
                    )}
                </Wrapper>
            </Modal>
            <IconBarWrapper>
                <IconBar open={isCallbackMenuOpen}>
                    <ViberIconStyled />
                    <WhatsappIconStyled />
                    <TelegramIconStyled />
                    <CallBackTextButton
                        onClick={() => {
                            setModalIsOpen(true), setIsOpenCallbackMenu(false)
                        }}
                    >
                        {t('callback')}
                    </CallBackTextButton>
                </IconBar>
            </IconBarWrapper>

            <CallbackButtonWrapperMobile
                open={isCallbackMenuOpen}
                onClick={() => {
                    setIsOpenCallbackMenu(!isCallbackMenuOpen)
                }}
            >
                {isCallbackMenuOpen ? (
                    <CloseIconStyled />
                ) : (
                    <CallbackIconStyled />
                )}
            </CallbackButtonWrapperMobile>
            <CallbackButtonWrapperDesktop
                onClick={() => {
                    setModalIsOpen(true)
                }}
            >
                <PhoneIconStyled />
            </CallbackButtonWrapperDesktop>
        </>
    )
}
