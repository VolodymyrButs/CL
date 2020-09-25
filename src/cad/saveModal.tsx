import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, ButtonGroup } from 'cad/Button'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
    isWall,
    ElementType,
    isTube,
    isMainDoor,
    isAperture,
    isApertureDoor,
    isHeater,
    isVent,
    isBalconyDoor,
} from 'cad/types'
import { accentDark } from 'cad/themes/accentDark'
import { getElements } from 'cad/storage/selectors'
import { toDxfStringLine } from 'cad/dxf/lineDxf'
import { toDxfStringDoor } from 'cad/dxf/doorDxf'
import { toDxfStringAperture } from 'cad/dxf/apertureDxf'
import { toDxfStringBattery } from 'cad/dxf/batteryDxf'
import { toDxfStringVent } from 'cad/dxf/ventDxf'
import { toDxfStringTube } from 'cad/dxf/tubeDxf'
import { fileDxf } from 'cad/dxf/fileDxf'
import { download } from 'cad/dxf/downloadDxf'
import { toDxfStringBalconyDoor } from './dxf/balconyDoor'

const ModalWraper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
`
const ModalContainer = styled.div`
    width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Text = styled.p`
    margin: 0;
    font-size: 30px;
    text-align: center;
    color: ${(props) => props.theme.color};
`
const SaveNameLabel = styled.label`
    display: block;
    text-align: center;
    margin: 30px;

    color: ${(props) => props.theme.color};
    font-size: 20px;

    & > span {
        display: block;
        margin-bottom: 10px;
    }
`
const SaveNameInput = styled.input`
    width: 240px;
    padding: 8px 30px;
    font-size: 20px;
    text-align: center;
    border-radius: 10px;
`

const WarningContainer = styled.section`
    margin: 0 0 30px;
    padding: 15px;
    text-align: center;
    background: #ff9c06;
    color: #fff;
`

const WarningHeader = styled.h2`
    margin: 0;
    margin-bottom: 10px;
`

const WarningMessage = styled.div`
    font-size: 20px;
`

type Props = {
    setShouldShowSaveModal: (arg: boolean) => void
    isConturLocked?: boolean | undefined
    onClose: () => void
}

export const SaveModal = ({
    setShouldShowSaveModal,
    isConturLocked,
    onClose,
}: Props) => {
    const stateElements: ElementType[] = useSelector(getElements)
    const date = new Date()
    const formatDate = `${date.getDate()}.${
        date.getMonth() + 1
    }.${date.getFullYear()}-${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`
    const itIsDoor = true

    const dfxElementsArray = stateElements.map((element) => {
        if (isWall(element)) return toDxfStringLine(element)
        if (isTube(element)) return toDxfStringTube(element)
        if (isMainDoor(element)) return toDxfStringDoor(element)
        if (isAperture(element)) return toDxfStringAperture(element)
        if (isApertureDoor(element))
            return toDxfStringAperture(element, itIsDoor)
        if (isHeater(element)) return toDxfStringBattery(element)
        if (isVent(element)) return toDxfStringVent(element)
        if (isBalconyDoor(element)) return toDxfStringBalconyDoor(element)
        return ''
    })

    const { t } = useTranslation()
    const [saveName, setSaveName] = useState(formatDate)
    const handleSaveNameChange = (event: { target: { value: string } }) =>
        setSaveName(event.target.value)
    const handleDownloadClick = () =>
        download(saveName, fileDxf(dfxElementsArray.join('')))
    return (
        <ModalWraper>
            <ModalContainer>
                <Text>{t('SaveTheDrawing')}</Text>

                <SaveNameLabel>
                    <span>{t('SaveNameLabel')}</span>

                    <SaveNameInput
                        value={saveName}
                        onChange={handleSaveNameChange}
                    />
                </SaveNameLabel>
                {!isConturLocked && (
                    <WarningContainer>
                        <WarningHeader>{t('SaveWarningHeader')}</WarningHeader>

                        <WarningMessage>
                            {t('SaveWarningMessage')}
                        </WarningMessage>
                    </WarningContainer>
                )}

                <ButtonGroup>
                    <Button
                        theme={accentDark}
                        onClick={() => {
                            setShouldShowSaveModal(false)
                            handleDownloadClick()
                            onClose()
                        }}
                    >
                        {t('Save')}
                    </Button>

                    <Button
                        onClick={() => {
                            setShouldShowSaveModal(false)
                            onClose()
                        }}
                    >
                        {t('Cancel')}
                    </Button>
                </ButtonGroup>
            </ModalContainer>
        </ModalWraper>
    )
}
