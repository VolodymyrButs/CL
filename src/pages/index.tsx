import React from 'react'
import { useTranslation } from 'react-i18next'

import { LocalizedLink } from 'i18n/LocalizedLink'
import { Element } from 'blocks/Element'
import { Faq } from 'blocks/Faq'
import { Form, IChildrenProps } from 'components/form/Form'
import { NameInput } from 'components/form/NameInput'
import { PhoneInput } from 'components/form/PhoneInput'
import { EmailInput } from 'components/form/EmailInput'
import { MessageInput } from 'components/form/MessageInput'
import { RunningLine } from 'components/RunningLine'

const IndexPage = () => {
    const { t } = useTranslation()
    return (
        <>
            <RunningLine>{t('designProject99')}</RunningLine>
            <h1>{t('hi')}</h1>
            <Element />
            <Form>
                {({ register, errors }: IChildrenProps) => (
                    <>
                        <NameInput inputRef={register} err={errors.name} />
                        <PhoneInput
                            inputRef={register({
                                minLength: 18,
                                required: true,
                            })}
                            err={errors.phone}
                        />
                        <EmailInput inputRef={register} err={errors.email} />
                        <MessageInput
                            inputRef={register}
                            err={errors.message}
                        />
                        <input
                            type="hidden"
                            name="hidden"
                            value="lalala"
                            ref={register}
                        />
                    </>
                )}
            </Form>

            <LocalizedLink to="/SecondPage/">page2</LocalizedLink>
            <Faq />
        </>
    )
}

export default IndexPage
