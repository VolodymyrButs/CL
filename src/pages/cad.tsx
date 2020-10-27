import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { store } from 'cad/storage/reduser'
import { light } from 'cad/themes/light'
import Workplace from 'cad/Workplace'
import { AppHeader } from 'cad/AppHeader'
import { HelmetFunc } from 'components/PageMetaData'

const pageMetadata = {
    uk: { title: 'lalaU', description: 'desc' },
    ru: { title: 'lalaR', description: 'desc' },
    en: { title: 'lalaE', description: 'desc' },
}

const AppStyled = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    width: 100vw;
    height: 100%;
    max-height: 100vh;
`

const CadPage = () => {
    const [shouldRender, setShouldRender] = useState(false)
    const [shouldShowAskModal, setShouldShowAskModal] = useState(false)
    const [shouldShowSaveModal, setShouldShowSaveModal] = useState(false)
    const [shouldShowFeedbackModal, setShouldShowFeedbackModal] = useState(
        false
    )

    useEffect(() => {
        setShouldRender(true)
    }, [])

    if (!shouldRender) {
        return null
    }

    return (
        <Provider store={store}>
            <HelmetFunc data={pageMetadata} />
            <AppStyled>
                <ThemeProvider theme={light}>
                    <AppHeader
                        setShouldShowAskModal={setShouldShowAskModal}
                        setShouldShowSaveModal={setShouldShowSaveModal}
                    />
                </ThemeProvider>
                <Workplace
                    shouldShowAskModal={shouldShowAskModal}
                    setShouldShowAskModal={setShouldShowAskModal}
                    shouldShowSaveModal={shouldShowSaveModal}
                    setShouldShowSaveModal={setShouldShowSaveModal}
                    shouldShowFeedbackModal={shouldShowFeedbackModal}
                    setShouldShowFeedbackModal={setShouldShowFeedbackModal}
                />
            </AppStyled>
        </Provider>
    )
}

export default CadPage
