import React from 'react'
import { Cad } from 'blocks/CadBlock'
import { HelmetFunc } from 'components/PageMetaData'

const pageMetadata = {
    uk: {
        title: 'Створення обмеженого чертежу онлайн',
        description:
            'Створення обмежених чертежів житлових та нежилих приміщень безкоштовно, без реєстрації, онлайн, у форматі dxf від дизайнерських студій ClearLine',
    },
    ru: {
        title: 'Создание обмерочного чертежа онлайн',
        description:
            'Создание обмерочных чертежей жилых и нежилых помещений бесплатно, без регистрации, онлайн,  в формате dxf от дизайн студии ClearLine',
    },
    en: {
        title: 'Creating a dimensional drawing online',
        description:
            'Creation of dimensional drawings of residential and non-residential premises free of charge, without registration, online, in dxf format from design studio ClearLine',
    },
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
