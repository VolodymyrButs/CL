import React, { useState, useRef, useEffect } from 'react'
import { Layer } from 'react-konva'
import styled, { ThemeProvider } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { useTranslation } from 'react-i18next'
import isTouchDevice from 'is-touch-device'
import { tools } from 'cad/Workplace'
import { light } from 'cad/themes/light'
import Right from 'assets/icons/iconsCad/right.svg'
import Down from 'assets/icons/iconsCad/down.svg'
import Left from 'assets/icons/iconsCad/left.svg'
import Up from 'assets/icons/iconsCad/up.svg'
import { Portal } from 'cad/Portal'
import { Wall } from 'cad/ElementsType'
import { getElements } from 'cad/storage/selectors'
import EnterSvg from 'assets/icons/iconsCad/enter.svg'
import { NumberInput } from 'cad/NumberInput'
import { WallType, ElementType, WallPoints } from 'cad/types'
import { displayWidth } from 'styles/width'

const LineEditorContainer = styled.form`
    display: flex;
    align-items: center;
    background-color: white;
    padding: 5px;
    border-radius: 9px;
    border: 1px solid ${light.bgColor};
    box-sizing: border-box;
    @media (max-width: 767px) {
        flex-direction: column;
        max-width: 320px;
        box-sizing: border-box;
    }
`
export const InputSubmit = styled.button`
    cursor: pointer;
    border: none;
    padding: 0;
    margin: 0 8px 0 10px;
    display: flex;
    background-color: white;
    :hover {
        svg {
            fill: #000000a9;
        }
    }
`
export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
`
export const Title = styled.p`
    font-family: Open Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 5px;
`
const InputWraper = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    align-self: center;
    margin: 5px 0;
    @media (min-width: ${displayWidth.tablet}) {
        margin: 0;
    }
`
const ButtonDirection = styled.div<{ active: boolean }>`
    display: flex;
    align-items: center;
    svg {
        width: 34px;
        height: 34px;
        margin: 0 15px;
        color: ${(props) => (props.active ? 'white' : light.bgColor)};
        fill: ${(props) => (props.active ? light.bgColor : 'white')};
    }
    :hover {
        svg {
            color: white;
            fill: #000000a9;
        }
    }
`
export const Line = styled.div`
    height: 121%;
    min-height: 50px;
    width: 1px;
    border-left: solid 1px ${light.bgColor};

    @media (max-width: 1023px) {
        display: none;
    }
`
const LockButton = styled.div`
    margin-top: 3px;
    height: 44px;
    color: white;
    background-color: ${light.bgColor};
    padding: 14px;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    box-sizing: border-box;
    border-radius: 20px;
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 16px;
    }
`
const direction = {
    right: 'right',
    left: 'left',
    down: 'down',
    up: 'up',
}
const Desktop = styled.div`
    display: none;
    @media (min-width: ${displayWidth.tablet}) {
        display: flex;
        align-items: center;
    }
`
const Mobile = styled.div`
    display: flex;
    align-items: center;
    @media (min-width: ${displayWidth.tablet}) {
        display: none;
    }
`

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
                lastDoorElement.objectType === tools.apertureDoor &&
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
                lastDoorElement.objectType === tools.mainDoor &&
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
                lastDoorElement.objectType === tools.apertureDoor &&
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
                lastDoorElement.objectType === tools.mainDoor &&
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
                lastDoorElement.objectType === tools.balconyDoor &&
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
                lastDoorElement.objectType === tools.balconyDoor &&
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
            (element.objectType === tools.wall && !element.isApertureWall) ||
            element.objectType === tools.mainDoor ||
            element.objectType === tools.apertureDoor ||
            element.objectType === tools.balconyDoor
    )
    const lastElementInState =
        elementsToDetermineContinuePointFrom[
            elementsToDetermineContinuePointFrom.length - 1
        ]
    const getPointsToStartWallFrom = (): [number, number] => {
        if (lastElementInState.objectType === tools.mainDoor) {
            return [
                lastElementInState.points[0] + lastElementInState.points[3],
                lastElementInState.points[1] + lastElementInState.points[2],
            ]
        }

        if (lastElementInState.objectType === tools.wall) {
            return [lastElementInState.points[2], lastElementInState.points[3]]
        }
        if (lastElementInState.objectType === tools.apertureDoor) {
            return startPoint
        }
        if (lastElementInState.objectType === tools.balconyDoor) {
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
                element.objectType === tools.mainDoor ||
                element.objectType === tools.apertureDoor ||
                element.objectType === tools.balconyDoor
        )
    const lastDoorElement = doorElements[doorElements.length - 1]
    const lastWall = renderCurrentDirection()

    const lockedContur =
        (lastDoorElement &&
            lastDoorElement.objectType === tools.apertureDoor &&
            lastWall[0] === lastWall[2] &&
            lastWall[0] === lastDoorElement.points[2][0] &&
            lastWall[2] === lastDoorElement.points[2][0] &&
            lastWall[3] === lastDoorElement.points[2][1]) ||
        (lastDoorElement &&
            lastDoorElement.objectType === tools.apertureDoor &&
            lastWall[1] === lastWall[3] &&
            lastWall[1] === lastDoorElement.points[2][1] &&
            lastWall[3] === lastDoorElement.points[2][1] &&
            lastWall[2] === lastDoorElement.points[2][0]) ||
        (lastDoorElement &&
            lastDoorElement.objectType === tools.balconyDoor &&
            lastWall[0] === lastWall[2] &&
            lastWall[0] === lastDoorElement.points[15][0] &&
            lastWall[2] === lastDoorElement.points[15][0] &&
            lastWall[3] === lastDoorElement.points[15][1]) ||
        (lastDoorElement &&
            lastDoorElement.objectType === tools.balconyDoor &&
            lastWall[1] === lastWall[3] &&
            lastWall[1] === lastDoorElement.points[15][1] &&
            lastWall[3] === lastDoorElement.points[15][1] &&
            lastWall[2] === lastDoorElement.points[15][0]) ||
        (lastDoorElement &&
            lastDoorElement.objectType === tools.mainDoor &&
            lastWall[0] === lastWall[2] &&
            lastWall[0] === lastDoorElement.points[0] &&
            lastWall[2] === lastDoorElement.points[0] &&
            lastWall[3] ===
                lastDoorElement.points[2] + lastDoorElement.points[1]) ||
        (lastDoorElement &&
            lastDoorElement.objectType === tools.mainDoor &&
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
                objectType: tools.wall,
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
                    <Wrapper>
                        <Title>{t('Wall')}</Title>
                        <LineEditorContainer onSubmit={handleSubmit}>
                            <Desktop>
                                <NumberInput
                                    setInputValue={setSizeInputValue}
                                    forwardRef={inputEl}
                                    value={sizeInputValue}
                                    onChange={handleChangeSizeInput}
                                    placeholder={t('Length')}
                                />
                            </Desktop>

                            <InputWraper>
                                <ButtonDirection
                                    active={elementDirection === direction.left}
                                    onClick={() => {
                                        setElementDirection(direction.left)
                                        selectInputText()
                                    }}
                                >
                                    <Left />
                                </ButtonDirection>

                                <ButtonDirection
                                    active={
                                        elementDirection === direction.right
                                    }
                                    onClick={() => {
                                        setElementDirection(direction.right)
                                        selectInputText()
                                    }}
                                >
                                    <Right />
                                </ButtonDirection>

                                <ButtonDirection
                                    active={elementDirection === direction.up}
                                    onClick={() => {
                                        setElementDirection(direction.up)
                                        selectInputText()
                                    }}
                                >
                                    <Up />
                                </ButtonDirection>

                                <ButtonDirection
                                    active={elementDirection === direction.down}
                                    onClick={() => {
                                        setElementDirection(direction.down)
                                        selectInputText()
                                    }}
                                >
                                    <Down />
                                </ButtonDirection>
                            </InputWraper>
                            <InputWraper>
                                <Mobile>
                                    <NumberInput
                                        setInputValue={setSizeInputValue}
                                        forwardRef={inputEl}
                                        value={sizeInputValue}
                                        onChange={handleChangeSizeInput}
                                        placeholder={t('Length')}
                                    />
                                </Mobile>
                                <Line />
                                <InputSubmit type="submit">
                                    {lockedContur ? (
                                        <LockButton>
                                            {t('LockContur')}
                                        </LockButton>
                                    ) : (
                                        <EnterSvg />
                                    )}
                                </InputSubmit>
                            </InputWraper>
                        </LineEditorContainer>
                    </Wrapper>
                </ThemeProvider>
            </Portal>
        </>
    )
}
