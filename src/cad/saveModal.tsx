import React, { useState } from 'react'
import styled from 'styled-components'
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
import { displayWidth } from 'styles/width'
import ISvg from 'assets/icons/iconsCad/i.svg'
import { accentDark } from './themes/accentDark'
import { Button } from 'components/Button'
import { sendEvent } from 'tracking/tracking'

const ModalWraper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    width: 100%;
    height: 100%;
    background-color: #000000ef;
`
const ModalContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    @media (min-width: ${displayWidth.tablet}) {
        padding: 70px;
        align-items: flex-start;
    }
`
const Text = styled.p`
    margin: 0;
    font-size: 36px;
    text-align: center;
    color: black;
    @media (min-width: ${displayWidth.tablet}) {
        margin-bottom: 20px;
        text-align: left;
    }
`
const SaveNameLabel = styled.label`
    display: block;
    text-align: center;
    padding: 10px 0px;
    color: ${(props) => props.theme.color};
    font-size: 14px;

    & > span {
        display: block;
    }
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
        width: 100%;
    }
`
const SaveNameInput = styled.input`
    width: 100%;
    padding: 8px 5px;
    font-size: 20px;
    text-align: left;
    border: none;
    border-bottom: 1px solid #000;
    box-sizing: border-box;
`

const WarningContainer = styled.section`
    margin: 0 0 30px;
    padding: 15px;
    text-align: center;
    background: #f7d7d7;
    color: #000;
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
        width: 100%;
        box-sizing: border-box;
    }
`
const WarningIcon = styled(ISvg)`
    fill: ${accentDark.color};
    margin-right: 7px;
    height: 19px;
`
const WarningHeader = styled.h2`
    margin: 0;
    height: 19px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
`

const WarningMessage = styled.div`
    font-size: 16px;
    margin-left: 26px;
`
const Div = styled.div`
    display: flex;
    justify-content: center;
    @media (min-width: ${displayWidth.tablet}) {
        justify-content: flex-start;
    }
`
const SaveButton = styled(Button)`
    margin: 10px;
`
const CancelButton = styled(SaveButton)`
    color: black;
    background-color: white;
    :hover {
        background-color: lightgray;
    }
`
const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (min-width: ${displayWidth.tablet}) {
        flex-direction: row;
    }
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
                        <Div>
                            <WarningIcon />
                            <WarningHeader>
                                {t('SaveWarningHeader')}
                            </WarningHeader>
                        </Div>
                        <WarningMessage>
                            {t('SaveWarningMessage')}
                        </WarningMessage>
                    </WarningContainer>
                )}
                <ButtonWrapper>
                    <SaveButton
                        onClick={() => {
                            sendEvent('Click', {
                                eventCategory: 'Sava Draw',
                                placement: 'CAD',
                            })
                            setShouldShowSaveModal(false)
                            handleDownloadClick()
                            onClose()
                        }}
                    >
                        {t('Save')}
                    </SaveButton>

                    <CancelButton
                        onClick={() => {
                            setShouldShowSaveModal(false)
                            onClose()
                        }}
                    >
                        {t('Cancel')}
                    </CancelButton>
                </ButtonWrapper>
            </ModalContainer>
        </ModalWraper>
    )
}
