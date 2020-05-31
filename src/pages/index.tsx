import React from 'react'

import { LocalizedLink } from 'i18n/LocalizedLink'
import { Element } from 'blocks/Element'
import { Faq } from 'blocks/Faq'
import { Form, IChildrenProps } from 'components/form/Form'
import { NameInput } from 'components/form/NameInput'
import { PhoneInput } from 'components/form/PhoneInput'
import { EmailInput } from 'components/form/EmailInput'
import { MessageInput } from 'components/form/MessageInput'
import { OurServices } from 'blocks/OurServices'
import { HomeHero } from 'blocks/Heros/HomeHero'

const IndexPage = () => {
    return (
        <>
            <HomeHero />
            <OurServices />
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
