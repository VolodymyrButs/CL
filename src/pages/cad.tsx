import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { store } from 'cad/storage/reduser'
import { light } from 'cad/themes/light'
import Workplace from 'cad/Workplace'
import { AppHeader } from 'cad/AppHeader'

const AppStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
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
