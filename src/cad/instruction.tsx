import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from 'cad/Button'
import styled from 'styled-components'
import Close from 'assets/icons/iconsCad/close.svg'
import { introductionContent } from 'cad/content/IntroductionContent'

const ApertureInstruction = styled.div`
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
`

const IntroductionContentContainer = styled.div`
    width: 94%;
    max-width: 800px;
    margin: 0 auto;
    height: 82%;
    padding: 30px 3% 0;
    overflow-y: auto;
`
const ExitButton = styled(Button)`
    position: absolute;
    top: 15px;
    right: 15px;
`

type Props = {
    closeFunction?: () => void
    showExitButton?: boolean
}
export const Instruction = ({ closeFunction, showExitButton }: Props) => {
    const { i18n } = useTranslation()
    const IntroductionContent = introductionContent(i18n.language)
    return (
        <ApertureInstruction>
            {showExitButton && (
                <ExitButton onClick={closeFunction} $buttonForm="square">
                    <Close />
                </ExitButton>
            )}
            <IntroductionContentContainer>
                <IntroductionContent />
            </IntroductionContentContainer>
        </ApertureInstruction>
    )
}
