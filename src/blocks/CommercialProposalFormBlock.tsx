import React from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

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
import Proposal from 'assets/icons/proposal.svg'
import Pensile from 'assets/icons/pensile.svg'
import Handshake from 'assets/icons/handshake.svg'

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
    font-size: 32px;
    line-height: 32px;
    letter-spacing: 1px;
    color: #296963;
    text-align: center;
    margin: 40px 0 24px;
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
        margin: 60px 0 24px;
        width: 350px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 100%;
    }
`
const svgStyle = css`
    width: 20px;
    margin-right: 10px;
`
const HandshakeS = styled(Handshake)`
    ${svgStyle}
`
const PensileS = styled(Pensile)`
    ${svgStyle}
`
const ProposalS = styled(Proposal)`
    ${svgStyle}
`
const FormColumn = styled.div`
    width: 100%;
    padding: 0 32px;
    box-sizing: border-box;
    h3 {
        display: flex;
        align-items: center;
        font-size: 20px;
        line-height: 24px;
        margin: 10px 0;
    }
`
const DivS = styled.div`
    margin-bottom: 30px;
`
const Unit = styled.p`
    pointer-events: none;
    right: 5px;
    position: absolute;
    bottom: 32px;
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
                    <DivS>
                        <h3>
                            <PensileS /> Образец дизайн проекта
                        </h3>
                        <h3>
                            <HandshakeS /> Как мы работаем
                        </h3>
                        <h3>
                            <ProposalS /> Коммерческое предложение
                        </h3>
                    </DivS>
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

                                    <option value="noDrawing">
                                        {t('noDrawing')}
                                    </option>
                                    <option value="hasMeasurement">
                                        {t('hasMeasurement')}
                                    </option>
                                    <option value="hasDrawing">
                                        {t('hasDrawing')}
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
