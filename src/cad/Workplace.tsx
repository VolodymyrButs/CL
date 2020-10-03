import React, { useState, useEffect, useCallback } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import { useTranslation } from 'react-i18next'
import { Canvas } from 'cad/Canvas'

import { Button, ButtonGroup } from 'cad/Button'
import { dark } from 'cad/themes/dark'
import { accentDark } from 'cad/themes/accentDark'
import Minus from 'assets/icons/iconsCad/minus-solid.svg'
import WallSvg from 'assets/icons/iconsCad/wall-svgrepo-com.svg'
import ApertureSvg from 'assets/icons/iconsCad/window-svgrepo-com.svg'
import Plus from 'assets/icons/iconsCad/plus-solid.svg'
import Undo from 'assets/icons/iconsCad/undo-solid.svg'
import Redo from 'assets/icons/iconsCad/redo-solid.svg'
import Heater from 'assets/icons/iconsCad/heater.svg'
import Tube from 'assets/icons/iconsCad/tube.svg'
import Vent from 'assets/icons/iconsCad/vent.svg'
import Question from 'assets/icons/iconsCad/question.svg'
import Fit from 'assets/icons/iconsCad/compress-arrows-alt-solid.svg'
import Door from 'assets/icons/iconsCad/door.svg'
import {
    getElements,
    statePastElements,
    stateFutureElements,
} from 'cad/storage/selectors'
import { Instruction } from 'cad/instruction'
import { SaveModal } from 'cad/saveModal'
import { FeedbackModal } from 'cad/feedback/FeedbackModal'
import {
    ApertureDoorType,
    BalconyDoorType,
    MainDoorType,
    OptionalString,
    WallType,
} from './types'

const WorkplaceStyled = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    background-color: ${(props) => props.theme.bgColor};
`
const LeftTopTools = styled.div`
    position: absolute;
    top: 15px;
    left: 15px;
    @media (max-width: 767px) {
        left: 5px;
    }
`
const RightTopTools = styled.div`
    position: absolute;
    top: 15px;
    right: 15px;
`

const RightTopHorizontalTool = styled.div`
    position: absolute;
    top: 15px;
    right: 63px;
`

const ToolEditorContainer = styled.section`
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    bottom: 10px;
`
const StartWindow = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
`
const ClearWindow = styled(StartWindow)`
    z-index: 3;
    box-sizing: border-box;
    padding: 0 20px;
    @media (max-width: 767px) {
        flex-direction: column;
        align-items: center;
    }
`
const OrietationScreen = styled(StartWindow)`
    display: none;
    @media (max-width: 812px) and (orientation: landscape) {
        display: flex;
        z-index: 3;
        color: white;
        font-size: 30px;
    }
`
const Ask = styled.p`
    font-size: 30px;
    padding-right: 30px;
    color: ${(props) => props.theme.color};
    @media (max-width: 767px) {
        text-align: center;
        padding-right: 0;
    }
`
const ButtonAsk = styled(Button)`
    margin-right: 20px;
    @media (max-width: 767px) {
        margin-right: 0;
    }
`
const ButtonWraper = styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    > span {
        margin-left: 5px;
        color: #a1a1a1;
        width: 80px;
        @media (max-width: 767px) {
            margin: 2px 0 0 0;
            font-size: 10px;
            width: 60px;
            text-align: center;
        }
    }
    @media (max-width: 767px) {
        flex-direction: column;
        margin-bottom: 0;
        height: 60px;
    }
    @media (max-width: 330px) {
        width: 55px;
    }
`
const ButtonStyled = styled(Button)`
    position: relative;
`
const Hint = styled.span`
    display: none;
    position: absolute;
    top: -10px;
    left: 40px;
    padding: 3px 5px;
    background-color: black;
    white-space: nowrap;
    opacity: 1;
    color: #fff;
    ${ButtonStyled}:hover:disabled & {
        display: block;
    }
`
const ButtonMobileHidden = styled(Button)`
    @media (max-width: 767px) {
        display: none;
    }
`
const ButtonGroupStyled = styled(ButtonGroup)`
    @media (max-width: 767px) {
        flex-direction: row;
        max-width: 180px;
        flex-wrap: wrap;
    }
`
const ButtonStart = styled(Button)``
const MILIMETERS_PER_PIXEL = 0.1
const ZOOM_FACTOR = 1.1
const ZOOM_FACTOR_WHEEL = 1.05

export const tools = {
    default: 'default',
    move: 'move',
    wall: 'wall',
    mainDoor: 'mainDoor',
    aperture: 'aperture',
    apertureDoor: 'apertureDoor',
    heater: 'heater',
    vent: 'vent',
    tube: 'tube',
    balconyDoor: 'balconyDoor',
}

const getFutureTool = (futureObjectType: string) => {
    if (
        futureObjectType === tools.apertureDoor ||
        futureObjectType === tools.mainDoor ||
        futureObjectType === tools.wall ||
        futureObjectType === tools.balconyDoor
    ) {
        return tools.wall
    }
    return tools.move
}

export const direction = {
    right: 'right',
    left: 'left',
    down: 'down',
    up: 'up',
}
const getDirection = (lastElementInState: WallType) => {
    if (
        lastElementInState.objectType === tools.wall &&
        lastElementInState.points[0] !== lastElementInState.points[2] &&
        lastElementInState.points[0] < lastElementInState.points[2]
    ) {
        return direction.right
    }
    if (
        lastElementInState.objectType === tools.wall &&
        lastElementInState.points[0] !== lastElementInState.points[2] &&
        lastElementInState.points[0] > lastElementInState.points[2]
    ) {
        return direction.left
    }
    if (
        lastElementInState.objectType === tools.wall &&
        lastElementInState.points[0] === lastElementInState.points[2] &&
        lastElementInState.points[1] > lastElementInState.points[3]
    ) {
        return direction.down
    }
    if (
        lastElementInState.objectType === tools.wall &&
        lastElementInState.points[0] === lastElementInState.points[2] &&
        lastElementInState.points[1] < lastElementInState.points[3]
    ) {
        return direction.up
    }
    return direction.right
}

type Props = {
    shouldShowAskModal: boolean
    setShouldShowAskModal: (arg: boolean) => void
    shouldShowSaveModal: boolean
    setShouldShowSaveModal: (arg: boolean) => void
    shouldShowFeedbackModal: boolean
    setShouldShowFeedbackModal: (arg: boolean) => void
}

const Workplace = ({
    shouldShowAskModal,
    setShouldShowAskModal,
    shouldShowSaveModal,
    setShouldShowSaveModal,
    shouldShowFeedbackModal,
    setShouldShowFeedbackModal,
}: Props) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const stateElements = useSelector(getElements)
    const stateElementsPast = useSelector(statePastElements)
    const stateElementsFuture = useSelector(stateFutureElements)
    const [showInstruction, setShowInstruction] = useState(false)
    const [centeringState, setCenteringState] = useState([0, 0])
    const [selected, setSelected] = useState<OptionalString>()
    const [startPoint, setStartPoint] = useState<[number, number]>([0, 0])
    const [canvasScale, setCanvasScale] = useState(MILIMETERS_PER_PIXEL)
    const [currentTool, setCurrentTool] = useState(tools.default)
    const [elementDirection, setElementDirection] = useState(
        stateElements.length
            ? getDirection(stateElements[stateElements.length - 1])
            : direction.right
    )
    const [cursor, setCursor] = useState<{
        element: OptionalString
        style: OptionalString
    }>({
        element: undefined,
        style: 'default',
    })
    const [dragableState, setDragableState] = useState({
        x: 0,
        y: 0,
    })
    const [toolEditorContainerNode, setToolEditorContainerNode] = useState()

    // const timeoutRef = useRef(null)

    // useEffect(() => {
    //     timeoutRef.current = setTimeout(() => {
    //         setShouldShowFeedbackModal(true)
    //     }, 240 * 1000)

    //     return () => {
    //         clearTimeout(timeoutRef.current)
    //     }
    // }, [setShouldShowFeedbackModal])

    const toolEditorContainerRef = useCallback((node) => {
        setToolEditorContainerNode(node)
    }, [])
    useEffect(() => {
        stateElements.length === 0 && setCurrentTool('mainDoor')
    }, [stateElements.length])

    const shouldShowContinueModal =
        currentTool === tools.default && stateElements.length !== 0

    const getPointToContinueFrom: () => [number, number] = () => {
        const elementsToDetermineContinuePointFrom = stateElements.filter(
            (
                element:
                    | WallType
                    | MainDoorType
                    | ApertureDoorType
                    | BalconyDoorType
            ) =>
                (element.objectType === 'wall' && !element.isApertureWall) ||
                element.objectType === 'mainDoor' ||
                element.objectType === 'apertureDoor' ||
                element.objectType === 'balconyDoor'
        )
        const elementToContinueFrom =
            elementsToDetermineContinuePointFrom[
                elementsToDetermineContinuePointFrom.length - 1
            ]

        if (elementsToDetermineContinuePointFrom.length === 1) {
            return [
                stateElements[0].points[0] + stateElements[0].points[3],
                stateElements[0].points[1] + stateElements[0].points[2],
            ]
        }
        switch (elementToContinueFrom.objectType) {
            case 'wall': {
                if (isConturLocked) {
                    setCurrentTool(tools.move)
                    return [0, 0]
                }
                return [
                    elementToContinueFrom.points[2],
                    elementToContinueFrom.points[3],
                ]
            }
            case 'balconyDoor': {
                return [
                    elementToContinueFrom.points[14][0],
                    elementToContinueFrom.points[14][1],
                ]
            }
            case 'apertureDoor': {
                return [
                    elementToContinueFrom.points[1][0],
                    elementToContinueFrom.points[1][1],
                ]
            }
            default: {
                return [0, 0]
            }
        }
    }

    const mainDoorElement =
        stateElements.length &&
        stateElements.find(
            (element: MainDoorType) => element.objectType === tools.mainDoor
        )
    const apertureDoorElements =
        stateElements.length &&
        stateElements.filter(
            (element: ApertureDoorType) => element.objectType === 'apertureDoor'
        )
    const lastDoorElement =
        apertureDoorElements &&
        apertureDoorElements[apertureDoorElements.length - 1]
    const balconyDoorElements =
        stateElements.length &&
        stateElements.filter(
            (element: ApertureDoorType) =>
                element.objectType === tools.balconyDoor
        )
    const lastBalconyDoorElement =
        balconyDoorElements &&
        balconyDoorElements[balconyDoorElements.length - 1]

    const lastPoint: number[] = stateElements.length && getPointToContinueFrom()
    const isConturLocked =
        (stateElements.length &&
            stateElements[stateElements.length - 1].objectType !==
                'apertureDoor' &&
            mainDoorElement.points[0] === lastPoint[0] &&
            mainDoorElement.points[1] + mainDoorElement.points[2] ===
                lastPoint[1]) ||
        (lastDoorElement &&
            lastDoorElement.points[2][0] === lastPoint[0] &&
            lastDoorElement.points[2][1] === lastPoint[1]) ||
        (lastBalconyDoorElement &&
            lastBalconyDoorElement.points[15][0] === lastPoint[0] &&
            lastBalconyDoorElement.points[15][1] === lastPoint[1])

    const isDoorAdded = Boolean(stateElements.length)

    const setWallDirection = (currentAperturePoints: [number, number][]) => {
        if (
            currentAperturePoints[1][0] !== currentAperturePoints[2][0] &&
            currentAperturePoints[1][0] > currentAperturePoints[2][0]
        ) {
            setElementDirection(direction.right)
        }
        if (
            currentAperturePoints[1][0] !== currentAperturePoints[2][0] &&
            currentAperturePoints[1][0] < currentAperturePoints[2][0]
        ) {
            setElementDirection(direction.left)
        }
        if (
            currentAperturePoints[1][0] === currentAperturePoints[2][0] &&
            currentAperturePoints[2][1] > currentAperturePoints[1][1]
        ) {
            setElementDirection(direction.down)
        }
        if (
            currentAperturePoints[1][0] === currentAperturePoints[2][0] &&
            currentAperturePoints[2][1] < currentAperturePoints[1][1]
        ) {
            setElementDirection(direction.up)
        }
        return null
    }

    useEffect(() => {
        if (isConturLocked) {
            setCurrentTool(tools.move)
        }
    }, [isConturLocked])

    return (
        <ThemeProvider theme={dark}>
            <WorkplaceStyled
                onWheel={(event) => {
                    if (event.deltaY > 0) {
                        setCanvasScale(canvasScale / ZOOM_FACTOR_WHEEL)
                    } else {
                        setCanvasScale(canvasScale * ZOOM_FACTOR_WHEEL)
                    }
                }}
            >
                <OrietationScreen>{t('Rotate')}</OrietationScreen>

                {shouldShowSaveModal && (
                    <SaveModal
                        setShouldShowSaveModal={setShouldShowSaveModal}
                        isConturLocked={isConturLocked}
                        onClose={() => setShouldShowFeedbackModal(true)}
                    />
                )}

                {shouldShowFeedbackModal && (
                    <FeedbackModal
                        onClose={() => setShouldShowFeedbackModal(false)}
                    />
                )}

                {shouldShowAskModal && (
                    <ClearWindow>
                        <Ask>{t('AskDelete')}</Ask>

                        <ButtonGroup>
                            <ButtonAsk
                                theme={accentDark}
                                onClick={() => {
                                    setCurrentTool(tools.mainDoor)
                                    dispatch({
                                        type: 'deleteState',
                                    })
                                    dispatch(ActionCreators.clearHistory())
                                    setShouldShowAskModal(false)
                                    setStartPoint([0, 0])
                                    setCanvasScale(0.1)
                                    setCenteringState([0, 0])
                                    setDragableState({
                                        x: 0,
                                        y: 0,
                                    })
                                    setElementDirection(direction.right)
                                }}
                            >
                                {t('Confirm')}
                            </ButtonAsk>

                            <ButtonAsk
                                onClick={() => {
                                    setShouldShowAskModal(false)
                                }}
                            >
                                {t('Cancel')}
                            </ButtonAsk>
                        </ButtonGroup>
                    </ClearWindow>
                )}
                {showInstruction && (
                    <Instruction
                        closeFunction={() => setShowInstruction(false)}
                        showExitButton={true}
                    />
                )}
                {shouldShowContinueModal && !isConturLocked && (
                    <StartWindow>
                        <ButtonStart
                            onClick={() => {
                                setCurrentTool(tools.wall)
                                setStartPoint(getPointToContinueFrom())
                            }}
                        >
                            {t('Continue')}
                        </ButtonStart>
                    </StartWindow>
                )}
                {shouldShowContinueModal && isConturLocked && (
                    <StartWindow>
                        <ButtonStart
                            onClick={() => {
                                setCurrentTool(tools.move)
                            }}
                        >
                            {t('Continue')}
                        </ButtonStart>
                    </StartWindow>
                )}

                <Canvas
                    setWallDirection={setWallDirection}
                    centeringState={centeringState}
                    setCenteringState={setCenteringState}
                    cursor={cursor}
                    setCursor={setCursor}
                    setSelected={setSelected}
                    selected={selected}
                    setStartPoint={setStartPoint}
                    startPoint={startPoint}
                    setCurrentTool={setCurrentTool}
                    currentTool={currentTool}
                    scale={canvasScale}
                    setCanvasScale={setCanvasScale}
                    stateElements={stateElements}
                    toolEditorContainerNode={toolEditorContainerNode}
                    setDragableState={setDragableState}
                    dragableState={dragableState}
                    elementDirection={elementDirection}
                    setElementDirection={setElementDirection}
                />

                <LeftTopTools>
                    <ButtonGroupStyled $direction="column">
                        <ButtonWraper>
                            <ButtonStyled
                                disabled={isConturLocked || !isDoorAdded}
                                theme={
                                    currentTool === tools.wall
                                        ? accentDark
                                        : undefined
                                }
                                $buttonForm="square"
                                onClick={() => {
                                    setCurrentTool(tools.wall)
                                    setStartPoint(startPoint)
                                    setSelected(undefined)
                                }}
                            >
                                <WallSvg />

                                <Hint>{t('AddDoor')}</Hint>
                            </ButtonStyled>

                            <span>{t('Wall')}</span>
                        </ButtonWraper>

                        <ButtonWraper>
                            <ButtonStyled
                                disabled={!isConturLocked || !isDoorAdded}
                                theme={
                                    currentTool === tools.aperture
                                        ? accentDark
                                        : undefined
                                }
                                $buttonForm="square"
                                onClick={() => {
                                    setCurrentTool(tools.aperture)
                                    setSelected(undefined)
                                }}
                            >
                                <ApertureSvg />
                                <Hint>{t('CloseContur')}</Hint>
                            </ButtonStyled>

                            <span>{t('Window')}</span>
                        </ButtonWraper>

                        <ButtonWraper>
                            <ButtonStyled
                                disabled={!isConturLocked || !isDoorAdded}
                                theme={
                                    currentTool === tools.heater
                                        ? accentDark
                                        : undefined
                                }
                                $buttonForm="square"
                                onClick={() => {
                                    setCurrentTool(tools.heater)
                                    setSelected(undefined)
                                }}
                            >
                                <Heater />
                                <Hint>{t('CloseContur')}</Hint>
                            </ButtonStyled>

                            <span>{t('Heater')}</span>
                        </ButtonWraper>

                        <ButtonWraper>
                            <ButtonStyled
                                disabled={!isConturLocked || !isDoorAdded}
                                theme={
                                    currentTool === tools.vent
                                        ? accentDark
                                        : undefined
                                }
                                $buttonForm="square"
                                onClick={() => {
                                    setCurrentTool(tools.vent)
                                    setSelected(undefined)
                                }}
                            >
                                <Vent />
                                <Hint>{t('CloseContur')}</Hint>
                            </ButtonStyled>

                            <span>{t('Vent')}</span>
                        </ButtonWraper>

                        <ButtonWraper>
                            <ButtonStyled
                                disabled={!isConturLocked || !isDoorAdded}
                                theme={
                                    currentTool === tools.tube
                                        ? accentDark
                                        : undefined
                                }
                                $buttonForm="square"
                                onClick={() => {
                                    setCurrentTool(tools.tube)
                                    setSelected(undefined)
                                }}
                            >
                                <Tube />
                                <Hint>{t('CloseContur')}</Hint>
                            </ButtonStyled>

                            <span>{t('Tube')}</span>
                        </ButtonWraper>

                        <ButtonWraper>
                            <ButtonStyled
                                disabled={!isConturLocked || !isDoorAdded}
                                theme={
                                    currentTool === tools.apertureDoor
                                        ? accentDark
                                        : undefined
                                }
                                $buttonForm="square"
                                onClick={() => {
                                    setCurrentTool(tools.apertureDoor)
                                    setSelected(undefined)
                                }}
                            >
                                <Door />

                                <Hint>{t('CloseContur')}</Hint>
                            </ButtonStyled>

                            <span>{t('Door')}</span>
                        </ButtonWraper>

                        <ButtonWraper>
                            <ButtonStyled
                                disabled={!isConturLocked || !isDoorAdded}
                                theme={
                                    currentTool === tools.balconyDoor
                                        ? accentDark
                                        : undefined
                                }
                                $buttonForm="square"
                                onClick={() => {
                                    setCurrentTool(tools.balconyDoor)
                                    setSelected(undefined)
                                }}
                            >
                                <Door />
                                <Hint>{t('CloseContur')}</Hint>
                            </ButtonStyled>

                            <span>{t('Balcony')}</span>
                        </ButtonWraper>
                    </ButtonGroupStyled>
                </LeftTopTools>

                <RightTopTools>
                    <ButtonGroup $direction="column">
                        <Button
                            onClick={() => setShowInstruction(true)}
                            $buttonForm="square"
                            title={t('Instruction')}
                        >
                            <Question />
                        </Button>

                        <ButtonMobileHidden
                            onClick={() =>
                                setCanvasScale(canvasScale * ZOOM_FACTOR)
                            }
                            $buttonForm="square"
                            title={t('Plus')}
                        >
                            <Plus />
                        </ButtonMobileHidden>

                        <ButtonMobileHidden
                            onClick={() =>
                                setCanvasScale(canvasScale / ZOOM_FACTOR)
                            }
                            $buttonForm="square"
                            title={t('Minus')}
                        >
                            <Minus />
                        </ButtonMobileHidden>

                        <Button
                            onClick={() => {
                                setCanvasScale(0.1)
                                setCenteringState([
                                    dragableState.x * 10,
                                    -dragableState.y * 10,
                                ])
                            }}
                            $buttonForm="square"
                            title={t('Fit')}
                        >
                            <Fit />
                        </Button>
                    </ButtonGroup>
                </RightTopTools>

                <RightTopHorizontalTool>
                    <ButtonGroup>
                        <Button
                            disabled={stateElementsPast.length === 0}
                            onClick={() => {
                                dispatch(ActionCreators.undo())
                                setCurrentTool(
                                    stateElements[stateElements.length - 1]
                                        .objectType === 'wall'
                                        ? 'wall'
                                        : 'move'
                                )
                                setElementDirection(
                                    getDirection(
                                        stateElements[stateElements.length - 1]
                                    )
                                )
                                setSelected(undefined)
                            }}
                            $buttonForm="square"
                            title={t('Undo')}
                        >
                            <Undo />
                        </Button>

                        <Button
                            disabled={stateElementsFuture.length === 0}
                            onClick={() => {
                                dispatch(ActionCreators.redo())
                                setCurrentTool(
                                    getFutureTool(
                                        stateElementsFuture[0][
                                            stateElementsFuture[0].length - 1
                                        ].objectType
                                    )
                                )
                                setElementDirection(
                                    getDirection(
                                        stateElementsFuture[0][
                                            stateElementsFuture[0].length - 1
                                        ]
                                    )
                                )
                                setSelected(tools.move)
                            }}
                            $buttonForm="square"
                            title={t('Redo')}
                        >
                            <Redo />
                        </Button>
                    </ButtonGroup>
                </RightTopHorizontalTool>

                <ToolEditorContainer ref={toolEditorContainerRef} />
            </WorkplaceStyled>
        </ThemeProvider>
    )
}

export default Workplace
