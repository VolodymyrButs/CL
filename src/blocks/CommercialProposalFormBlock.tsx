import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Form, IChildrenProps } from 'components/form/Form'
import { PhoneInput } from 'components/form/PhoneInput'
import { EmailInput } from 'components/form/EmailInput'
import { MessageInput } from 'components/form/MessageInput'
import { mobileAfterBorder } from 'styles/mobileAfterBorder'
import { colors, backgroundColors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { Container } from 'components/Container'
import { DefaultFormHero } from './DefaultFormHero'
import { Select } from 'components/form/Select'
import { NumberInput } from 'components/form/NumberInput'

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
`
const FormTitle = styled.div`
    font-family: 'Yeseva One', cursive;
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
        margin: 56px 0 24px;
    }
`

const FormColumn = styled.div`
    width: 100%;
    padding: 0 32px;
    box-sizing: border-box;
    @media (min-width: ${displayWidth.tablet}) {
        outline: 1px solid ${colors.dark};
    }
`
const Unit = styled.p`
    pointer-events: none;
    right: 5px;
    position: absolute;
    top: -48px;
    @media (min-width: ${displayWidth.desktop}) {
        right: 155px;
        top: 24px;
    }
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: ${displayWidth.desktop}) {
        flex-direction: row;
    }
`
export const CommercialProposalFormBlock = () => {
    const { t } = useTranslation()

    return (
        <FormWrapper>
            <Container columns={'1fr'} tabletColumns={'1fr 2fr'}>
                <DefaultFormHero />
                <FormColumn>
                    <FormTitle>{t('ComercialProposalFormTitle')}</FormTitle>
                    <Form buttonText={t('send')}>
                        {({ register, errors }: IChildrenProps) => (
                            <InputBlock>
                                <Wrapper>
                                    <Select
                                        name="homeType"
                                        defaultValue="none"
                                        inputRef={register({
                                            required: true,
                                            validate: value => value !== 'none',
                                        })}
                                        err={errors.homeType}
                                    >
                                        <option value="none" disabled hidden>
                                            {t('homeTypeQuestion')}
                                        </option>
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

                                    <NumberInput
                                        name="roomSize"
                                        placeholder={t('roomSize')}
                                        inputRef={register({
                                            maxLength: 10,
                                            required: true,
                                        })}
                                        err={errors.roomSize}
                                    />
                                    <div style={{ position: 'relative' }}>
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
                                    inputRef={register({
                                        required: true,
                                        validate: value => value !== 'none',
                                    })}
                                    err={errors.availabilityDrawings}
                                    defaultValue="none"
                                >
                                    <option value="none" disabled hidden>
                                        {t('availabilityDrawings')}
                                    </option>
                                    <option value="yes">{t('yes')}</option>
                                    <option value="no">{t('no')}</option>
                                </Select>
                                <PhoneInput
                                    inputRef={register({
                                        minLength: 18,
                                        required: true,
                                    })}
                                    err={errors.phone}
                                />
                                <MessageInput
                                    inputRef={register}
                                    err={errors.message}
                                />
                                <EmailInput
                                    inputRef={register}
                                    err={errors.email}
                                />
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
