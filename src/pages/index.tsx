import React from 'react'

import { OurServices } from 'blocks/OurServices'
import { HomeHero } from 'blocks/Heros/HomeHero'
import { DefaultFormBlock } from 'blocks/DefaultFormBlock'
import { HelmetFunc } from 'components/PageMetaData'

const pageMetadata = {
    uk: { title: 'lalaU', description: 'desc' },
    ru: { title: 'lalaR', description: 'desc' },
    en: { title: 'lalaE', description: 'desc' },
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
