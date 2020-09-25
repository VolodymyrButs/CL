import React, { useState, useEffect } from 'react'
import { Layer } from 'react-konva'
import styled, { ThemeProvider } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { accentDark } from 'cad/themes/accentDark'
import { light } from 'cad/themes/light'
import { useTranslation } from 'react-i18next'
import { Button } from 'cad/Button'
import { Portal } from 'cad/Portal'
import { Battery } from 'cad/ElementsType'
import { tools } from 'cad/Workplace'
import {
    getSelectedWallLength,
    calculateDefaultIndent,
} from 'cad/reusableFunctions'
import { getElements } from 'cad/storage/selectors'
import Heater from 'assets/icons/iconsCad/heater.svg'
import { NumberInput } from 'cad/NumberInput'
import { HeaterTypePoints, OptionalString } from 'cad/types'

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
        font-size: 18px;
        align-self: center;
        margin: 0;
        @media (max-width: 767px) {
            font-size: 14px;
            text-align: center;
        }
    }
    @media (max-width: 767px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        max-width: 320px;
        justify-items: start;
    }
`
const InputWraper = styled.div`
    margin: 0 10px;
`
const StartText = styled.span`
    width: 200px;
    margin: 0 5px;
    font-size: 18px;
    text-align: center;
    align-self: center;
`
const InputSubmit = styled(Button)`
    height: 54px;
    display: flex;
    @media (max-width: 767px) {
        height: 48px;
        margin: 5px 10px 0;
    }
`

type Props = {
    toolEditorContainerNode?: React.ReactNode
    selected: OptionalString
    setSelected: (arg: OptionalString) => void
    setCurrentTool: (arg: string) => void
}
export const BatteryTool = ({
    toolEditorContainerNode,
    selected,
    setCurrentTool,
    setSelected,
}: Props) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const stateElements = useSelector(getElements)

    const selectedLine: { points: number[] } = stateElements.find(
        (element: { id: string }) => element.id === selected
    )
    const selectedWallLength = selected && getSelectedWallLength(selectedLine)
    const [leftIndent, setLeftIndent] = useState<number>(0)
    const [rightIndent, setRightIndent] = useState<number>(0)
    const [depth, setDepth] = useState<number>(150)

    useEffect(() => {
        const defaultIndent = calculateDefaultIndent(selected, selectedLine)

        setLeftIndent(defaultIndent)
        setRightIndent(defaultIndent)
    }, [selected, selectedLine])

    const handleLeftIndentChange = (event: { target: { value: string } }) => {
        if (
            Number(selectedWallLength) - Number(rightIndent) >=
            Number(event.target.value)
        )
            setLeftIndent(Number(event.target.value))
    }
    const handleRightIndentChange = (event: { target: { value: string } }) => {
        if (
            Number(selectedWallLength) - Number(leftIndent) >=
            Number(event.target.value)
        )
            setRightIndent(Number(event.target.value))
    }
    const handleDepthChange = (event: { target: { value: string } }) =>
        setDepth(Number(event.target.value))
    if (!stateElements.length) {
        return null
    }

    const getCurrentBatteryPoints: () => HeaterTypePoints = () => {
        if (
            selectedLine.points[0] !== selectedLine.points[2] &&
            selectedLine.points[0] < selectedLine.points[2]
        ) {
            return [
                [
                    selectedLine.points[0] + leftIndent,
                    selectedLine.points[1] + 20,
                ],
                [
                    selectedLine.points[0] + leftIndent,
                    selectedLine.points[1] + depth,
                ],
                [
                    selectedLine.points[2] - rightIndent,
                    selectedLine.points[3] + depth,
                ],
                [
                    selectedLine.points[2] - rightIndent,
                    selectedLine.points[3] + 20,
                ],
            ]
        } else if (
            selectedLine.points[0] !== selectedLine.points[2] &&
            selectedLine.points[0] > selectedLine.points[2]
        ) {
            return [
                [
                    selectedLine.points[0] - rightIndent,
                    selectedLine.points[1] - 20,
                ],
                [
                    selectedLine.points[0] - rightIndent,
                    selectedLine.points[1] - depth,
                ],
                [
                    selectedLine.points[2] + leftIndent,
                    selectedLine.points[3] - depth,
                ],
                [
                    selectedLine.points[2] + leftIndent,
                    selectedLine.points[3] - 20,
                ],
            ]
        } else if (
            selectedLine.points[0] === selectedLine.points[2] &&
            selectedLine.points[1] < selectedLine.points[3]
        ) {
            return [
                [
                    selectedLine.points[0] - 20,
                    selectedLine.points[1] + leftIndent,
                ],
                [
                    selectedLine.points[0] - depth,
                    selectedLine.points[1] + leftIndent,
                ],
                [
                    selectedLine.points[2] - depth,

                    selectedLine.points[3] - rightIndent,
                ],
                [
                    selectedLine.points[2] - 20,
                    selectedLine.points[3] - rightIndent,
                ],
            ]
        } else {
            return [
                [
                    selectedLine.points[0] + 20,
                    selectedLine.points[1] - rightIndent,
                ],
                [
                    selectedLine.points[0] + depth,
                    selectedLine.points[1] - rightIndent,
                ],
                [
                    selectedLine.points[2] + depth,
                    selectedLine.points[3] + leftIndent,
                ],
                [
                    selectedLine.points[2] + 20,
                    selectedLine.points[3] + leftIndent,
                ],
            ]
        }
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch({
            type: 'addElement',
            element: {
                id: uuid(),
                objectType: 'heater',
                points: getCurrentBatteryPoints(),
            },
        })
        setCurrentTool(tools.move)
        setSelected(tools.move)
    }
    return (
        <>
            {selected && (
                <Layer>
                    <Battery
                        isInProgres
                        element={{
                            points: getCurrentBatteryPoints(),
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
                            <InputWraper>
                                <p>{t('LeftIndent')}</p>

                                <NumberInput
                                    max={
                                        Number(selectedWallLength) - rightIndent
                                    }
                                    value={leftIndent}
                                    onChange={handleLeftIndentChange}
                                />
                            </InputWraper>

                            <InputWraper>
                                <p>{t('RightIndent')}</p>

                                <NumberInput
                                    max={
                                        Number(selectedWallLength) - leftIndent
                                    }
                                    value={rightIndent}
                                    onChange={handleRightIndentChange}
                                />
                            </InputWraper>

                            <InputWraper>
                                <p>{t('Depth')}</p>

                                <NumberInput
                                    value={depth}
                                    onChange={handleDepthChange}
                                />
                            </InputWraper>

                            <InputSubmit
                                theme={accentDark}
                                $size="svgMobile"
                                type="submit"
                            >
                                {t('Add')}

                                <Heater />
                            </InputSubmit>
                        </LineEditorContainer>
                    )}
                </ThemeProvider>
            </Portal>
        </>
    )
}
