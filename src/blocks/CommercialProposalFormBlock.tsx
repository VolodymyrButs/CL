import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Form, IChildrenProps } from 'components/form/Form'
import { PhoneInput } from 'components/form/PhoneInput'
import { EmailInput } from 'components/form/EmailInput'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { colors, backgroundColors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { Container } from 'components/Container'
import { DefaultFormHero } from './DefaultFormHero'
import { Select } from 'components/form/Select'
import { NumberInput } from 'components/form/NumberInput'
import { useFormHandler } from 'hooks/useFormHandler'

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    background-color: ${backgroundColors.formPromo};
    width: 100%;
    ${mobileAfterBorder};
    border-bottom: 1px solid ${colors.dark};
`

const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: ${displayWidth.desktop}) {
        margin-right: 150px;
    }
`
const FormTitle = styled.div`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 21px;
    line-height: 30px;
    letter-spacing: 1px;
    color: ${colors.dark};
    text-align: center;
    margin: 40px 0 24px;
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
        margin: 60px 0 24px;
    }
`

const FormColumn = styled.div`
    width: 100%;
    padding: 0 32px;
    box-sizing: border-box;
    h3 {
        margin: 10px 0;
    }
`
const Unit = styled.p`
    pointer-events: none;
    right: 5px;
    position: absolute;
    bottom: 28px;
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
const Div = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: block;
    }
`

export const CommercialProposalFormBlock = () => {
    const { t } = useTranslation()
    const { handleSubmit, formSendStatus } = useFormHandler()
    return (
        <FormWrapper>
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <DefaultFormHero image />
                <FormColumn>
                    <FormTitle>{t('ComercialProposalFormTitle')}</FormTitle>
                    <h3>- Образец дизайн проекта</h3>
                    <h3>- Схему работи</h3>
                    <h3>- Комерческое предложение</h3>
                    <Form
                        buttonText={t('send')}
                        onFormSubmit={handleSubmit}
                        formSendStatus={formSendStatus}
                    >
                        {({ register, errors }: IChildrenProps) => (
                            <InputBlock>
                                <Wrapper>
                                    <Select
                                        name="homeType"
                                        defaultValue="none"
                                        ref={register({
                                            required: true,
                                            validate: value => value !== 'none',
                                        })}
                                        err={errors.homeType}
                                        id={'homeTypeSelect'}
                                        placeholder={t('homeTypeQuestion')}
                                    >
                                        <option
                                            value="none"
                                            disabled
                                            hidden
                                        ></option>
                                        <option value="flat">
                                            {t('homeType.flat')}
                                        </option>
                                        <option value="house">
                                            {t('homeType.house')}
                                        </option>
                                        <option value="comercialBuilding">
                                            {t('homeType.comercialBuilding')}
                                        </option>
                                    </Select>

                                    <Div />

                                    <div style={{ position: 'relative' }}>
                                        <NumberInput
                                            name="roomSize"
                                            placeholder={t('roomSize')}
                                            ref={register({
                                                maxLength: 10,
                                                required: true,
                                            })}
                                            err={errors.roomSize}
                                        />
                                        <Unit>
                                            M
                                            <sup>
                                                <small>2</small>
                                            </sup>
                                        </Unit>
                                    </div>
                                </Wrapper>
                                <Select
                                    name="availabilityDrawings"
                                    ref={register({
                                        required: true,
                                        validate: value => value !== 'none',
                                    })}
                                    err={errors.availabilityDrawings}
                                    id={'availabilityDrawingsSelect'}
                                    placeholder={t('availabilityDrawings')}
                                >
                                    <option
                                        value="none"
                                        disabled
                                        hidden
                                    ></option>

                                    <option value="noDrawing1">
                                        {t('no1')}
                                    </option>
                                    <option value="noDrawing2">
                                        {t('no2')}
                                    </option>
                                    <option value="yesDrawing">
                                        {t('yes')}
                                    </option>
                                </Select>
                                <PhoneInput
                                    ref={register({
                                        minLength: 18,
                                        required: true,
                                    })}
                                    err={errors.phone}
                                />
                                <EmailInput ref={register} err={errors.email} />
                                <input
                                    type="hidden"
                                    name="hidden"
                                    value="lalala"
                                    ref={register}
                                />
                            </InputBlock>
                        )}
                    </Form>
                </FormColumn>
            </Container>
        </FormWrapper>
    )
}
