import React from 'react'
import { Cad } from 'blocks/CadBlock'
import { HelmetFunc } from 'components/PageMetaData'

const pageMetadata = {
    uk: { title: 'lalaU', description: 'desc' },
    ru: { title: 'lalaR', description: 'desc' },
    en: { title: 'lalaE', description: 'desc' },
}

const EditorPage = () => {
    return (
        <>
            <HelmetFunc data={pageMetadata} />
            <Cad />
        </>
    )
}

export default EditorPage
