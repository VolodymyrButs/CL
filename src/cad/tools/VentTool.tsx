import React, { useState } from 'react'
import { Layer } from 'react-konva'
import styled, { ThemeProvider } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { useTranslation } from 'react-i18next'

import { Button } from 'cad/Button'
import { light } from 'cad/themes/light'
import { accentDark } from 'cad/themes/accentDark'
import { Portal } from 'cad/Portal'
import { Vent } from 'cad/ElementsType'
import { tools } from 'cad/Workplace'
import ChangeIcon from 'assets/icons/iconsCad/change.svg'
import { getSelectedWallLength } from 'cad/reusableFunctions'
import { getElements } from 'cad/storage/selectors'
import VentSvg from 'assets/icons/iconsCad/vent.svg'
import { NumberInput } from 'cad/NumberInput'
import { OptionalString } from 'cad/types'

const LineEditorContainerAsk = styled.div`
    background-color: ${(props) => props.theme.bgColor};
    padding: 5px;
`
const LineEditorContainer = styled.form`
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
    padding: 5px;
    & p {
        margin: 0 5px;
        font-size: 18px;
        align-self: center;
        text-align: center;
    }
    @media (max-width: 767px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        max-width: 320px;
        justify-items: center;
    }
`
const InputSubmit = styled(Button)`
    display: flex;
`
const StartText = styled.span`
    width: 200px;
    margin: 0 5px;
    font-size: 18px;
    text-align: center;
    align-self: center;
`

type Props = {
    toolEditorContainerNode: React.ReactNode
    selected: OptionalString
    switchDirection: boolean
    setSelected: (arg: OptionalString) => void
    setCurrentTool: (arg: string) => void
    setSwitchDirection: (arg: boolean) => void
}
export const VentTool = ({
    toolEditorContainerNode,
    selected,
    setCurrentTool,
    setSelected,
    switchDirection,
    setSwitchDirection,
}: Props) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const stateElements = useSelector(getElements)
    const selectedLine = stateElements.find(
        (element: { id: string }) => element.id === selected
    )
    const [indent, setIndent] = useState(200)
    const [height, setHeight] = useState(2000)

    const selectedWallLength = selected && getSelectedWallLength(selectedLine)
    const handleIndentChange = (event: { target: { value: string } }) => {
        if (Number(selectedWallLength) - 150 >= Number(event.target.value))
            setIndent(Number(event.target.value))
    }
    const handleHeightChange = (event: { target: { value: string } }) =>
        setHeight(Number(event.target.value))

    if (!stateElements.length) {
        return null
    }

    const getCurrentVentPoints = () => {
        if (
            selectedLine.points[0] !== selectedLine.points[2] &&
            selectedLine.points[0] < selectedLine.points[2] &&
            switchDirection === false
        ) {
            return [
                selectedLine.points[0] + indent,
                selectedLine.points[1] - 150,
                selectedLine.points[0] + indent - 50,
                selectedLine.points[1] - 200,
                height,
            ]
        }

        if (
            selectedLine.points[0] !== selectedLine.points[2] &&
            selectedLine.points[0] < selectedLine.points[2] &&
            switchDirection === true
        ) {
            return [
                selectedLine.points[2] - indent - 150,
                selectedLine.points[3] - 150,
                selectedLine.points[2] - indent - 200,
                selectedLine.points[3] - 200,
                height,
            ]
        }

        if (
            selectedLine.points[0] !== selectedLine.points[2] &&
            selectedLine.points[0] > selectedLine.points[2] &&
            switchDirection === false
        ) {
            return [
                selectedLine.points[0] - indent - 150,
                selectedLine.points[1],
                selectedLine.points[0] - indent - 200,
                selectedLine.points[1] + 300,
                height,
            ]
        }
        if (
            selectedLine.points[0] !== selectedLine.points[2] &&
            selectedLine.points[0] > selectedLine.points[2] &&
            switchDirection === true
        ) {
            return [
                selectedLine.points[2] + indent,
                selectedLine.points[3],
                selectedLine.points[2] + indent - 50,
                selectedLine.points[3] + 300,
                height,
            ]
        }

        if (
            selectedLine.points[0] === selectedLine.points[2] &&
            selectedLine.points[1] < selectedLine.points[3] &&
            switchDirection === false
        ) {
            return [
                selectedLine.points[0],
                selectedLine.points[1] + indent,
                selectedLine.points[0] + 200,
                selectedLine.points[1] + indent + 120,
                height,
            ]
        }
        if (
            selectedLine.points[0] === selectedLine.points[2] &&
            selectedLine.points[1] < selectedLine.points[3] &&
            switchDirection === true
        ) {
            return [
                selectedLine.points[2],
                selectedLine.points[3] - indent - 150,
                selectedLine.points[2] + 200,
                selectedLine.points[3] - indent - 30,
                height,
            ]
        }
        if (
            selectedLine.points[0] === selectedLine.points[2] &&
            selectedLine.points[1] > selectedLine.points[3] &&
            switchDirection === false
        ) {
            return [
                selectedLine.points[0] - 150,
                selectedLine.points[1] - indent - 150,
                selectedLine.points[0] - 450,
                selectedLine.points[1] - indent - 30,
                height,
            ]
        }

        return [
            selectedLine.points[2] - 150,
            selectedLine.points[3] + indent,
            selectedLine.points[2] - 450,
            selectedLine.points[3] + indent + 120,
            height,
        ]
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch({
            type: 'addElement',
            element: {
                id: uuid(),
                objectType: 'vent',
                points: getCurrentVentPoints(),
            },
        })
        setCurrentTool(tools.move)
        setSelected(undefined)
    }
    const handleSwitch = () => setSwitchDirection(!switchDirection)
    return (
        <>
            {selected && (
                <Layer>
                    <Vent
                        isInProgres
                        element={{
                            points: getCurrentVentPoints(),
                        }}
                    />
                </Layer>
            )}

            <Portal node={toolEditorContainerNode}>
                <ThemeProvider theme={light}>
                    {!selected && (
                        <LineEditorContainerAsk>
                            <StartText>{t('SelectWallToContinue')}</StartText>
                        </LineEditorContainerAsk>
                    )}
                    {selected && (
                        <LineEditorContainer onSubmit={handleSubmit}>
                            <p>{t('Indent')}</p>

                            <NumberInput
                                min={0}
                                max={Number(selectedWallLength) - 150}
                                value={indent}
                                onChange={handleIndentChange}
                            />

                            <p>{t('Height')}</p>

                            <NumberInput
                                min={0}
                                value={height}
                                onChange={handleHeightChange}
                            />

                            <Button $buttonForm="normal" onClick={handleSwitch}>
                                <ChangeIcon />
                            </Button>

                            <InputSubmit
                                theme={accentDark}
                                $size="svgMobile"
                                type="submit"
                            >
                                {t('Add')}

                                <VentSvg />
                            </InputSubmit>
                        </LineEditorContainer>
                    )}
                </ThemeProvider>
            </Portal>
        </>
    )
}
