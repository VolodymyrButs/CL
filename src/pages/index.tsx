import React from 'react'

import { OurServices } from 'blocks/OurServices'
import { HomeHero } from 'blocks/Heros/HomeHero'
import { DefaultFormBlock } from 'blocks/DefaultFormBlock'

const IndexPage = () => {
    return (
        <>
            <HomeHero />
            <OurServices />
            <DefaultFormBlock />
        </>
    )
}

export default IndexPage
