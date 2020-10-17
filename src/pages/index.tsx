import React from 'react'

import { OurServices } from 'blocks/OurServices'
import { HomeHero } from 'blocks/Heros/HomeHero'
import { DefaultFormBlock } from 'blocks/DefaultFormBlock'
import { HelmetFunc } from 'components/PageMetaData'

const pageMetadata = {
    uk: {
        title:
            "Дизайн інтер'єру житлових і нежитлових приміщень від студії ClearLine",
        description:
            "Студія дизайну інтер'єру ClearLine розробляє індивідуальні проекти квартир, будинків та нежитлових приміщень",
    },
    ru: {
        title: 'Дизайн интерьера жилых и нежилых помещений',
        description:
            'Студия дизайна интерьера ClearLine разрабатывает индивидуальные проекты квартир, домов и нежилых помещений ',
    },
    en: {
        title:
            'Interior design of residential and non-residential premises from ClearLine studio',
        description:
            'ClearLine interior design studio develops individual projects for apartments, houses and non-residential premises',
    },
}

const IndexPage = () => {
    return (
        <>
            <HelmetFunc data={pageMetadata} />
            <HomeHero />
            <OurServices />
            <DefaultFormBlock
                withPhoneMobile
                tracking={{
                    conversionType: 'FormIndexPageBottom',
                    eventCategory: 'FormIndexPageBottom',
                }}
            />
        </>
    )
}

export default IndexPage
