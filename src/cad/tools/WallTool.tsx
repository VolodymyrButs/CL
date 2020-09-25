import React, { useState, useRef, useEffect } from 'react'
import { Layer } from 'react-konva'
import styled, { ThemeProvider } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { useTranslation } from 'react-i18next'
import isTouchDevice from 'is-touch-device'
import { tools } from 'cad/Workplace'
import { accentDark } from 'cad/themes/accentDark'
import { Button } from 'cad/Button'
import { light } from 'cad/themes/light'
import Right from 'assets/icons/iconsCad/arrow-alt-circle-right-solid.svg'
import Down from 'assets/icons/iconsCad/arrow-alt-circle-down-solid.svg'
import Left from 'assets/icons/iconsCad/arrow-alt-circle-left-solid.svg'
import Up from 'assets/icons/iconsCad/arrow-alt-circle-up-solid.svg'
import { Portal } from 'cad/Portal'
import { Wall } from 'cad/ElementsType'
import { getElements } from 'cad/storage/selectors'
import WallSvg from 'assets/icons/iconsCad/wall-svgrepo-com.svg'
import { NumberInput } from 'cad/NumberInput'
import { WallType, ElementType, WallPoints } from 'cad/types'

const LineEditorContainer = styled.form`
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
    padding: 5px;
    & p {
        margin: 0 5px;
        font-size: 18px;
        align-self: center;
    }
    & button {
        align-self: center;
        margin: 0 10px;
    }
    @media (max-width: 767px) {
        flex-direction: column;
    }
`
const InputSubmit = styled(Button)`
    display: flex;
`

const InputWraper = styled.div`
    display: flex;
    align-self: center;
    margin: 0 10px;
`
const direction = {
    right: 'right',
    left: 'left',
    down: 'down',
    up: 'up',
}

type Props = {
    toolEditorContainerNode?: React.ReactNode
    setElementDirection: (arg: string) => void
    elementDirection: string
    setCenteringState: (arg: number[]) => void
    dragableState: { x: number; y: number; isDragging?: boolean }
    startPoint: [number, number]
    scale: number
    setCurrentTool: (arg: string) => void
}
export const WallTool = ({
    toolEditorContainerNode,
    setElementDirection,
    elementDirection,
    dragableState,
    setCenteringState,
    startPoint,
    scale,
    setCurrentTool,
}: Props) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const inputEl = useRef<HTMLInputElement>(null)
    const [sizeInputValue, setSizeInputValue] = useState(1000)
    useEffect(() => {
        const helpWithWallLength = () => {
            if (
                lastDoorElement &&
                lastDoorElement.objectType === 'apertureDoor' &&
                lastWall[0] === lastWall[2] &&
                lastWall[0] === lastDoorElement.points[2][0] &&
                lastWall[2] === lastDoorElement.points[2][0] &&
                Math.abs(lastWall[3] - lastDoorElement.points[2][1]) -
                    sizeInputValue <
                    20
            ) {
                setSizeInputValue(
                    Math.abs(lastWall[1] - lastDoorElement.points[2][1])
                )
            }
            if (
                lastDoorElement &&
                lastDoorElement.objectType === 'mainDoor' &&
                lastWall[0] === lastWall[2] &&
                lastWall[0] === lastDoorElement.points[0] &&
                lastWall[2] === lastDoorElement.points[0] &&
                Math.abs(
                    lastWall[3] -
                        (lastDoorElement.points[2] + lastDoorElement.points[1])
                ) -
                    sizeInputValue <
                    20
            ) {
                setSizeInputValue(
                    Math.abs(
                        lastWall[1] -
                            (lastDoorElement.points[2] +
                                lastDoorElement.points[1])
                    )
                )
            }
            if (
                lastDoorElement &&
                lastDoorElement.objectType === 'apertureDoor' &&
                lastWall[1] === lastWall[3] &&
                lastWall[1] === lastDoorElement.points[2][1] &&
                lastWall[3] === lastDoorElement.points[2][1] &&
                Math.abs(lastWall[2] - lastDoorElement.points[2][0]) -
                    sizeInputValue <
                    20
            ) {
                setSizeInputValue(
                    Math.abs(lastWall[0] - lastDoorElement.points[2][0])
                )
            }
            if (
                lastDoorElement &&
                lastDoorElement.objectType === 'mainDoor' &&
                lastWall[1] === lastWall[3] &&
                lastWall[1] ===
                    lastDoorElement.points[2] + lastDoorElement.points[1] &&
                lastWall[3] ===
                    lastDoorElement.points[2] + lastDoorElement.points[1] &&
                Math.abs(lastWall[2] - lastDoorElement.points[0]) -
                    sizeInputValue <
                    20
            ) {
                setSizeInputValue(
                    Math.abs(lastWall[0] - lastDoorElement.points[0])
                )
            }
            if (
                lastDoorElement &&
                lastDoorElement.objectType === 'balconyDoor' &&
                lastWall[0] === lastWall[2] &&
                lastWall[0] === lastDoorElement.points[15][0] &&
                lastWall[2] === lastDoorElement.points[15][0] &&
                Math.abs(lastWall[3] - lastDoorElement.points[15][1]) -
                    sizeInputValue <
                    20
            ) {
                setSizeInputValue(
                    Math.abs(lastWall[1] - lastDoorElement.points[15][1])
                )
            }
            if (
                lastDoorElement &&
                lastDoorElement.objectType === 'balconyDoor' &&
                lastWall[1] === lastWall[3] &&
                lastWall[1] === lastDoorElement.points[15][1] &&
                lastWall[3] === lastDoorElement.points[15][1] &&
                Math.abs(lastWall[2] - lastDoorElement.points[15][0]) -
                    sizeInputValue <
                    20
            ) {
                setSizeInputValue(
                    Math.abs(lastWall[0] - lastDoorElement.points[15][0])
                )
            }
        }
        helpWithWallLength()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sizeInputValue])

    const handleChangeSizeInput = (event: { target: { value: string } }) => {
        if (isNaN(Number(event.target.value))) {
            return
        }
        setSizeInputValue(Number(event.target.value))
    }
    const stateElements = useSelector(getElements)

    if (!stateElements.length) {
        return null
    }

    const elementsToDetermineContinuePointFrom = stateElements.filter(
        (element: ElementType) =>
            (element.objectType === 'wall' && !element.isApertureWall) ||
            element.objectType === 'mainDoor' ||
            element.objectType === 'apertureDoor' ||
            element.objectType === 'balconyDoor'
    )
    const lastElementInState =
        elementsToDetermineContinuePointFrom[
            elementsToDetermineContinuePointFrom.length - 1
        ]
    const getPointsToStartWallFrom = (): [number, number] => {
        if (lastElementInState.objectType === 'mainDoor') {
            return [
                lastElementInState.points[0] + lastElementInState.points[3],
                lastElementInState.points[1] + lastElementInState.points[2],
            ]
        }

        if (lastElementInState.objectType === 'wall') {
            return [lastElementInState.points[2], lastElementInState.points[3]]
        }
        if (lastElementInState.objectType === 'apertureDoor') {
            return startPoint
        }
        if (lastElementInState.objectType === 'balconyDoor') {
            return startPoint
        }
        return [0, 0]
    }
    const elementToStartWallFrom: [number, number] = getPointsToStartWallFrom()
    const renderCurrentDirection = (): WallPoints => {
        switch (elementDirection) {
            case direction.right: {
                return [
                    elementToStartWallFrom[0],
                    elementToStartWallFrom[1],
                    elementToStartWallFrom[0] + sizeInputValue,
                    elementToStartWallFrom[1],
                ]
            }
            case direction.left: {
                return [
                    elementToStartWallFrom[0],
                    elementToStartWallFrom[1],
                    elementToStartWallFrom[0] - sizeInputValue,
                    elementToStartWallFrom[1],
                ]
            }
            case direction.down: {
                return [
                    elementToStartWallFrom[0],
                    elementToStartWallFrom[1],
                    elementToStartWallFrom[0],
                    elementToStartWallFrom[1] - sizeInputValue,
                ]
            }
            case direction.up: {
                return [
                    elementToStartWallFrom[0],
                    elementToStartWallFrom[1],
                    elementToStartWallFrom[0],
                    elementToStartWallFrom[1] + sizeInputValue,
                ]
            }

            default: {
                return [
                    elementToStartWallFrom[0],
                    elementToStartWallFrom[1],
                    elementToStartWallFrom[0] + sizeInputValue,
                    elementToStartWallFrom[1],
                ]
            }
        }
    }
    const doorElements =
        stateElements.length &&
        stateElements.filter(
            (element: ElementType) =>
                element.objectType === 'apertureDoor' ||
                element.objectType === 'mainDoor' ||
                element.objectType === 'balconyDoor'
        )
    const lastDoorElement = doorElements[doorElements.length - 1]
    const lastWall = renderCurrentDirection()

    const lockedContur =
        (lastDoorElement &&
            lastDoorElement.objectType === 'apertureDoor' &&
            lastWall[0] === lastWall[2] &&
            lastWall[0] === lastDoorElement.points[2][0] &&
            lastWall[2] === lastDoorElement.points[2][0] &&
            lastWall[3] === lastDoorElement.points[2][1]) ||
        (lastDoorElement &&
            lastDoorElement.objectType === 'apertureDoor' &&
            lastWall[1] === lastWall[3] &&
            lastWall[1] === lastDoorElement.points[2][1] &&
            lastWall[3] === lastDoorElement.points[2][1] &&
            lastWall[2] === lastDoorElement.points[2][0]) ||
        (lastDoorElement &&
            lastDoorElement.objectType === 'balconyDoor' &&
            lastWall[0] === lastWall[2] &&
            lastWall[0] === lastDoorElement.points[15][0] &&
            lastWall[2] === lastDoorElement.points[15][0] &&
            lastWall[3] === lastDoorElement.points[15][1]) ||
        (lastDoorElement &&
            lastDoorElement.objectType === 'balconyDoor' &&
            lastWall[1] === lastWall[3] &&
            lastWall[1] === lastDoorElement.points[15][1] &&
            lastWall[3] === lastDoorElement.points[15][1] &&
            lastWall[2] === lastDoorElement.points[15][0]) ||
        (lastDoorElement &&
            lastDoorElement.objectType === 'mainDoor' &&
            lastWall[0] === lastWall[2] &&
            lastWall[0] === lastDoorElement.points[0] &&
            lastWall[2] === lastDoorElement.points[0] &&
            lastWall[3] ===
                lastDoorElement.points[2] + lastDoorElement.points[1]) ||
        (lastDoorElement &&
            lastDoorElement.objectType === 'mainDoor' &&
            lastWall[1] === lastWall[3] &&
            lastWall[1] ===
                lastDoorElement.points[2] + lastDoorElement.points[1] &&
            lastWall[3] ===
                lastDoorElement.points[2] + lastDoorElement.points[1] &&
            lastWall[2] === lastDoorElement.points[0])
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch({
            type: 'addElement',
            element: {
                id: uuid(),
                objectType: 'wall',
                points: renderCurrentDirection(),
            } as WallType,
        })

        setCenteringState([
            lastWall[2] + dragableState!.x * 10 * (0.1 / scale!),
            lastWall[3] - dragableState!.y * 10 * (0.1 / scale!),
        ])
        {
            lockedContur && setCurrentTool(tools.move)
        }
    }
    const selectInputText = () => {
        if (isTouchDevice()) {
            return
        }
        inputEl.current!.select()
    }
    return (
        <>
            <Layer>
                <Wall
                    isInProgres
                    lockedContur={lockedContur}
                    element={{
                        points: renderCurrentDirection(),
                    }}
                />
            </Layer>

            <Portal node={toolEditorContainerNode}>
                <ThemeProvider theme={light}>
                    <LineEditorContainer onSubmit={handleSubmit}>
                        <InputWraper>
                            <p>{t('Length')}</p>

                            <NumberInput
                                forwardRef={inputEl}
                                value={sizeInputValue}
                                onChange={handleChangeSizeInput}
                            />
                        </InputWraper>

                        <InputWraper>
                            <Button
                                $buttonForm="square"
                                theme={
                                    elementDirection === direction.left
                                        ? accentDark
                                        : undefined
                                }
                                onClick={() => {
                                    setElementDirection(direction.left)
                                    selectInputText()
                                }}
                            >
                                <Left />
                            </Button>

                            <Button
                                $buttonForm="square"
                                theme={
                                    elementDirection === direction.right
                                        ? accentDark
                                        : undefined
                                }
                                onClick={() => {
                                    setElementDirection(direction.right)
                                    selectInputText()
                                }}
                            >
                                <Right />
                            </Button>

                            <Button
                                $buttonForm="square"
                                theme={
                                    elementDirection === direction.up
                                        ? accentDark
                                        : undefined
                                }
                                onClick={() => {
                                    setElementDirection(direction.up)
                                    selectInputText()
                                }}
                            >
                                <Up />
                            </Button>

                            <Button
                                $buttonForm="square"
                                theme={
                                    elementDirection === direction.down
                                        ? accentDark
                                        : undefined
                                }
                                onClick={() => {
                                    setElementDirection(direction.down)
                                    selectInputText()
                                }}
                            >
                                <Down />
                            </Button>
                        </InputWraper>

                        <InputSubmit
                            theme={accentDark}
                            $size="svgMobile"
                            type="submit"
                        >
                            {lockedContur ? t('LockContur') : t('Add')}

                            <WallSvg />
                        </InputSubmit>
                    </LineEditorContainer>
                </ThemeProvider>
            </Portal>
        </>
    )
}
