import React, { useState, useEffect } from 'react'
import { Layer } from 'react-konva'
import styled, { ThemeProvider } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { light } from 'cad/themes/light'
import { useTranslation } from 'react-i18next'
import { Portal } from 'cad/Portal'
import { Battery } from 'cad/ElementsType'
import { tools } from 'cad/Workplace'
import {
    getSelectedWallLength,
    calculateDefaultIndent,
} from 'cad/reusableFunctions'
import { getElements } from 'cad/storage/selectors'
import EnterSvg from 'assets/icons/iconsCad/enter.svg'
import { NumberInput } from 'cad/NumberInput'
import { HeaterTypePoints, OptionalString } from 'cad/types'
import { InputSubmit, Line, Title, Wrapper } from './WallTool'

const LineEditorContainer = styled.form`
    display: flex;
    align-items: center;
    background-color: white;
    border: solid 1px ${light.bgColor};
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
        box-sizing: border-box;
        justify-items: start;
    }
`
const InputWraper = styled.div`
    margin: 0 10px;
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
        setSelected(undefined)
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
                    {selected && (
                        <Wrapper>
                            <Title>{t('Heater')}</Title>
                            <LineEditorContainer onSubmit={handleSubmit}>
                                <InputWraper>
                                    <NumberInput
                                        placeholder={t('LeftIndent')}
                                        setInputValue={setLeftIndent}
                                        max={
                                            Number(selectedWallLength) -
                                            rightIndent
                                        }
                                        value={leftIndent}
                                        onChange={handleLeftIndentChange}
                                    />
                                </InputWraper>

                                <InputWraper>
                                    <NumberInput
                                        placeholder={t('RightIndent')}
                                        setInputValue={setRightIndent}
                                        max={
                                            Number(selectedWallLength) -
                                            leftIndent
                                        }
                                        value={rightIndent}
                                        onChange={handleRightIndentChange}
                                    />
                                </InputWraper>

                                <InputWraper>
                                    <NumberInput
                                        placeholder={t('Depth')}
                                        setInputValue={setDepth}
                                        value={depth}
                                        onChange={handleDepthChange}
                                    />
                                </InputWraper>

                                <Line />
                                <InputSubmit type="submit">
                                    <EnterSvg />
                                </InputSubmit>
                            </LineEditorContainer>
                        </Wrapper>
                    )}
                </ThemeProvider>
            </Portal>
        </>
    )
}
