import React, { useState } from 'react'
import fetch from 'node-fetch'
import { Button } from 'components/Button'
import { displayWidth } from 'styles/width'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import {
    isFormSuccess,
    isFormError,
    useFormHandler,
} from 'hooks/useFormHandler'
import InputMask from 'react-input-mask'
import { useForm, Controller } from 'react-hook-form'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { Modal } from 'components/Modal'
import { SendStatus } from './Form'

const Div = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
    }
`

const Unit = styled.p`
    pointer-events: none;
    color: gray;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: ${displayWidth.desktop}) {
        display: grid;
        grid-template-columns: 6fr 1fr 6fr;
    }
`
const FormWrapper = styled.div`
    position: relative;
    @media (min-width: ${displayWidth.tablet}) {
        min-width: 350px;
    }
`
const ButtonStyled = styled(Button)`
    width: 264px;
    margin: 50px auto;
    z-index: 3;
    @media (max-width: 330px) {
        width: 250px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        width: 220px;
        margin: 50px 0;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 264px;
    }
`
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    @media (min-width: ${displayWidth.tablet}) {
        justify-content: flex-start;
    }
`

const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: ${displayWidth.desktop}) {
        margin-right: 150px;
    }
    .MuiFormControl-root {
        margin: 8px 0;
    }
    .MuiSelect-root {
        max-width: calc(100vw - 88px);
        overflow: hidden;
    }
    .MuiInputBase-root {
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
            background-color: transparent;
            transition: background-color 5000s ease-in-out 0s;
        }
    }
`
export const ComercialForm = () => {
    const { t } = useTranslation()
    const formName = 'Commercial Proposall Form'
    const { errors, control, handleSubmit } = useForm({
        mode: 'onBlur',
        submitFocusError: false,
    })

    const { handleSubmitStatus, formSendStatus } = useFormHandler()
    const onSubmit = (data: object) => {
        fetch('/send-form', {
            method: 'POST',
            body: JSON.stringify({
                ...data,
                formName,
            }),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(response => {
                return response.json()
            })
            .then(success => {
                handleSubmitStatus(success.success)
            })
            .catch(() => handleSubmitStatus(false))
    }
    const [isOpenFormModal, setIsOpenFormModal] = useState(false)
    return (
        <FormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputBlock>
                    <Wrapper>
                        <FormControl
                            style={{ minWidth: 250 }}
                            error={Boolean(errors.homeType)}
                        >
                            <InputLabel>{t('homeTypeQuestion')}</InputLabel>

                            <Controller
                                as={
                                    <Select>
                                        <MenuItem value="flat">
                                            {t('homeType.flat')}
                                        </MenuItem>
                                        <MenuItem value="house">
                                            {t('homeType.house')}
                                        </MenuItem>
                                        <MenuItem value="comercialBuilding">
                                            {t('homeType.comercialBuilding')}
                                        </MenuItem>
                                    </Select>
                                }
                                error={Boolean(errors.homeType)}
                                name="homeType"
                                rules={{
                                    required: 'this is required',
                                }}
                                control={control}
                                defaultValue=""
                            />
                        </FormControl>
                        <Div />
                        <FormControl error={Boolean(errors.roomSize)}>
                            <InputLabel>{t('roomSize')}</InputLabel>
                            <Controller
                                as={Input}
                                type="number"
                                name="roomSize"
                                control={control}
                                endAdornment={
                                    <Unit>
                                        M
                                        <sup>
                                            <small>2</small>
                                        </sup>
                                    </Unit>
                                }
                                error={Boolean(errors.roomSize)}
                                defaultValue=""
                                rules={{
                                    required: 'this is required',
                                    maxLength: 10,
                                }}
                            />
                        </FormControl>
                    </Wrapper>
                    <FormControl error={Boolean(errors.availabilityDrawings)}>
                        <InputLabel>{t('availabilityDrawings')}</InputLabel>

                        <Controller
                            as={
                                <Select style={{ overflow: 'hidden' }}>
                                    <MenuItem
                                        value="noDrawing"
                                        style={{ whiteSpace: 'normal' }}
                                    >
                                        {t('noDrawing')}
                                    </MenuItem>
                                    <MenuItem
                                        value="hasMeasurement"
                                        style={{ whiteSpace: 'normal' }}
                                    >
                                        {t('hasMeasurement')}
                                    </MenuItem>
                                    <MenuItem
                                        value="hasDrawing"
                                        style={{ whiteSpace: 'normal' }}
                                    >
                                        {t('hasDrawing')}
                                    </MenuItem>
                                </Select>
                            }
                            name="availabilityDrawings"
                            rules={{
                                required: 'this is required',
                            }}
                            control={control}
                            defaultValue=""
                        />
                    </FormControl>

                    <FormControl error={Boolean(errors.phone)}>
                        <InputLabel>{t('phone')}</InputLabel>

                        <Controller
                            as={
                                <InputMask
                                    maskChar={null}
                                    mask="+3\8(999) 99 999 99"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="\+38+\([0-9]{3}\)\s+[0-9]{2}\s+[0-9]{3}\s+[0-9]{2}"
                                    name="phone"
                                >
                                    {(
                                        inputMaskProps: JSX.IntrinsicAttributes &
                                            import('@material-ui/core').InputProps
                                    ) => <Input {...inputMaskProps} />}
                                </InputMask>
                            }
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{
                                minLength: 18,
                                required: 'this is required',
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel error={Boolean(errors.email)}>
                            {t('email')}
                        </InputLabel>
                        <Controller
                            as={Input}
                            type="email"
                            name="email"
                            control={control}
                            error={Boolean(errors.email)}
                            rules={{
                                required: 'this is required',
                            }}
                            defaultValue=""
                        />
                    </FormControl>
                </InputBlock>
                <ButtonWrapper>
                    <ButtonStyled
                        disabled={isFormSuccess(formSendStatus)}
                        onClick={() => setIsOpenFormModal(true)}
                        type="submit"
                    >
                        {t('send')}
                    </ButtonStyled>
                </ButtonWrapper>
            </form>

            {isFormSuccess(formSendStatus) && (
                <Modal
                    isOpen={isOpenFormModal}
                    closeHandler={() => setIsOpenFormModal(false)}
                >
                    <SendStatus>
                        <h2>{t('isSendSuccess')}</h2>
                        <p>{t('isSendSuccessComercial')}</p>
                        <ButtonStyled
                            onClick={() => {
                                setIsOpenFormModal(false)
                            }}
                        >
                            {t('goBack')}
                        </ButtonStyled>
                    </SendStatus>
                </Modal>
            )}
            {isFormError(formSendStatus) && (
                <Modal
                    isOpen={isOpenFormModal}
                    closeHandler={() => setIsOpenFormModal(false)}
                >
                    <SendStatus>
                        <p>{t('isSendError')}</p>
                        <ButtonStyled
                            onClick={() => {
                                setIsOpenFormModal(false)
                            }}
                        >
                            {t('goBack')}
                        </ButtonStyled>
                    </SendStatus>
                </Modal>
            )}
        </FormWrapper>
    )
}
