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
                                        id={'homeTypeSelect'}
                                        placeholder={t('homeTypeQuestion')}
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

                                    <Div />

                                    <div style={{ position: 'relative' }}>
                                        <NumberInput
                                            name="roomSize"
                                            placeholder={t('roomSize')}
                                            inputRef={register({
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
                                    inputRef={register({
                                        required: true,
                                        validate: value => value !== 'none',
                                    })}
                                    err={errors.availabilityDrawings}
                                    defaultValue="none"
                                    id={'availabilityDrawingsSelect'}
                                    placeholder={t('availabilityDrawings')}
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
