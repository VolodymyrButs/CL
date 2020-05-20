import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { FormSection } from 'components/FormSection'
import { Form, IChildrenProps } from 'components/form/Form'
import { PhoneInput } from 'components/form/PhoneInput'
import { EmailInput } from 'components/form/EmailInput'
import { MessageInput } from 'components/form/MessageInput'

const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
`
export const DefaultFormBlock = () => {
    const { t } = useTranslation()
    return (
        <FormSection title={t('formTitle')} description={t('formDescription')}>
            <Form buttonText={t('send')}>
                {({ register, errors }: IChildrenProps) => (
                    <InputBlock>
                        <MessageInput
                            inputRef={register}
                            err={errors.message}
                        />
                        <PhoneInput
                            inputRef={register({
                                minLength: 18,
                                required: true,
                            })}
                            err={errors.phone}
                        />
                        <EmailInput inputRef={register} err={errors.email} />

                        <input
                            type="hidden"
                            name="hidden"
                            value="lalala"
                            ref={register}
                        />
                    </InputBlock>
                )}
            </Form>
        </FormSection>
    )
}
