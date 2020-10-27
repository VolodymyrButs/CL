import React, { useState, useEffect, useCallback } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import { useTranslation } from 'react-i18next'
import { Canvas } from 'cad/Canvas'

import { dark } from 'cad/themes/dark'
import { accentDark } from 'cad/themes/accentDark'
import Minus from 'assets/icons/iconsCad/minus.svg'
import WallSvg from 'assets/icons/iconsCad/wall-svgrepo-com.svg'
import ApertureSvg from 'assets/icons/iconsCad/window-svgrepo-com.svg'
import Plus from 'assets/icons/iconsCad/plus.svg'
import Undo from 'assets/icons/iconsCad/undo.svg'
import Redo from 'assets/icons/iconsCad/redo.svg'
import Heater from 'assets/icons/iconsCad/heater.svg'
import Tube from 'assets/icons/iconsCad/tube.svg'
import Vent from 'assets/icons/iconsCad/vent.svg'
import Question from 'assets/icons/iconsCad/questionIcon.svg'
import Fit from 'assets/icons/iconsCad/fit.svg'
import Door from 'assets/icons/iconsCad/door.svg'
import Union from 'assets/icons/iconsCad/Union.svg'
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
import { light } from './themes/light'
import ISvg from 'assets/icons/iconsCad/i.svg'
import { displayWidth } from 'styles/width'
import { Button } from 'components/Button'

const WorkplaceStyled = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 100vw;
    flex-grow: 1;
    background-color: #f2f2f2;
    overflow: hidden;
`
const LeftTopTools = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`
const RightTopTools = styled.div`
    position: absolute;
    top: 0;
    right: 0;
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
    background-color: #000000ef;
`
const ClearWindow = styled.div`
    z-index: 3;
    box-sizing: border-box;
    padding: 10px;
    background-color: white;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (min-width: ${displayWidth.tablet}) {
        padding: 70px;
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
    font-family: 'Yeseva One';
    max-width: 600px;
    margin: 0 auto 20px;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    letter-spacing: 1.77882px;
    text-align: center;
    padding-right: 0;
`
const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: ${displayWidth.tablet}) {
        flex-direction: row;
    }
`
const ButtonConf = styled(Button)`
    margin: 10px;
`
const ButtonCanc = styled(ButtonConf)`
    color: black;
    background-color: white;
    :hover {
        background-color: lightgray;
    }
`
const Hint = styled.div`
    display: none;
    position: absolute;
    left: 95px;
    top: 25px;
    svg {
        position: absolute;
        left: 0;
        top: -10px;
        width: 255px;
    }
    p {
        position: absolute;
        left: 10px;
        top: 0px;
        z-index: 4;
        color: white;
        width: 250px;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 26px;
        letter-spacing: 0.4px;
    }
`
const ButtonStyled = styled.button<{ active?: boolean; disable?: boolean }>`
    position: relative;
    width: 88px;
    height: 68px;
    padding-top: 2px;
    margin: 1px;
    background-color: ${(props) =>
        props.active ? accentDark.color : light.bgColor};
    border: none;
    background-color: ${(props) => props.disable && ' #a1a1a1ff'};
    :hover {
        background-color: #000000a9;

        ${Hint} {
            display: ${(props) => props.disable && 'block'};
        }
    }

    > svg {
        width: 36px;
        height: 36px;
        fill: white;
    }
    > p {
        font-style: normal;
        font-weight: bold;
        font-size: 10px;
        line-height: 14px;
        text-align: center;
        letter-spacing: 0.685714px;
        text-transform: uppercase;
        color: white;
        margin: 0;
    }
`
const ButtonTools = styled.button`
    width: 88px;
    text-align: center;
    padding: 4px 0;
    height: 34px;
    margin: 1px;
    margin-top: 3px;
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 24px;
    border: 1px solid gray;
    background-color: white;
    text-transform: uppercase;
    border-radius: 0;
    cursor: pointer;
    :hover {
        background-color: gray;
    }
`
const ButtonMobileHidden = styled.span`
    @media (max-width: 767px) {
        display: none;
    }
`
const ButtonGroupStyled = styled.div<{ showTools?: boolean }>`
    display: ${(props) => (props.showTools ? 'none' : 'flex')};
    flex-direction: column;
    @media (min-width: ${displayWidth.tablet}) {
        display: ${(props) => (props.showTools ? 'flex' : 'none')};
    }
`
const MILIMETERS_PER_PIXEL = 0.1
const ZOOM_FACTOR = 1.1
const ZOOM_FACTOR_WHEEL = 1.05
const ButtonS = styled.button`
    cursor: pointer;
    background-color: transparent;
    border: none;
    margin: 1px;
    padding: 0;
    svg {
        width: 34px;
        height: 34px;
        margin: 2px 5px;
        z-index: 2;
    }
    :hover {
        svg {
            fill: #000000a9;
        }
    }
    :disabled {
        svg {
            fill: #00000056;
        }
    }
`
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
const LineEditorContainerAskWrapper = styled.div`
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: center;
`
const LineEditorContainerAsk = styled.div`
    display: flex;
    max-width: 90vw;
    background-color: white;
    border: 1px solid ${light.bgColor};
    color: ${light.bgColor};
    padding: 10px 20px;
    box-sizing: border-box;
    svg {
        height: 20px;
        min-width: 20px;
    }
`
const StartText = styled.span`
    width: 430px;
    max-width: 100%;
    margin: 0 5px;
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    align-self: center;
`
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
    const [showTools, setShowTools] = useState(true)
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
        stateElements.length === 0 && setCurrentTool(tools.mainDoor)
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
                (element.objectType === tools.wall &&
                    !element.isApertureWall) ||
                element.objectType === tools.mainDoor ||
                element.objectType === tools.apertureDoor ||
                element.objectType === tools.balconyDoor
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
            case tools.wall: {
                if (isConturLocked) {
                    setCurrentTool(tools.move)
                    return [0, 0]
                }
                return [
                    elementToContinueFrom.points[2],
                    elementToContinueFrom.points[3],
                ]
            }
            case tools.balconyDoor: {
                return [
                    elementToContinueFrom.points[14][0],
                    elementToContinueFrom.points[14][1],
                ]
            }
            case tools.apertureDoor: {
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
            (element: ApertureDoorType) =>
                element.objectType === tools.apertureDoor
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
                tools.apertureDoor &&
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
    useEffect(() => {
        setSelected(undefined)
    }, [])

    const disable1 = isConturLocked || !isDoorAdded
    const disable2 = !isConturLocked || !isDoorAdded

    const currentToolName = () => {
        switch (currentTool) {
            case tools.wall: {
                return t('Wall')
            }
            case tools.aperture: {
                return t('Window')
            }
            case tools.apertureDoor: {
                return t('Door')
            }
            case tools.heater: {
                return t('Heater')
            }
            case tools.vent: {
                return t('Vent')
            }
            case tools.tube: {
                return t('Tube')
            }
            case tools.balconyDoor: {
                return t('Balcony')
            }
            case tools.mainDoor: {
                return t('MainDoor')
            }
            default:
                return ''
        }
    }

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
                {!selected &&
                    currentTool !== tools.wall &&
                    currentTool !== tools.mainDoor && (
                        <LineEditorContainerAskWrapper>
                            <LineEditorContainerAsk>
                                <ISvg />
                                <StartText>
                                    {t('SelectWallToContinue')}
                                </StartText>
                            </LineEditorContainerAsk>
                        </LineEditorContainerAskWrapper>
                    )}
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
                    <StartWindow>
                        <ClearWindow>
                            <Ask>{t('AskDelete')}</Ask>
                            <ButtonWrapper>
                                <ButtonConf
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
                                </ButtonConf>

                                <ButtonCanc
                                    onClick={() => {
                                        setShouldShowAskModal(false)
                                    }}
                                >
                                    {t('Cancel')}
                                </ButtonCanc>
                            </ButtonWrapper>
                        </ClearWindow>
                    </StartWindow>
                )}
                {showInstruction && (
                    <Instruction
                        closeFunction={() => setShowInstruction(false)}
                    />
                )}
                {shouldShowContinueModal && !isConturLocked && (
                    <StartWindow>
                        <ButtonCanc
                            onClick={() => {
                                setCurrentTool(tools.wall)
                                setStartPoint(getPointToContinueFrom())
                            }}
                        >
                            {t('Continue')}
                        </ButtonCanc>
                    </StartWindow>
                )}
                {shouldShowContinueModal && isConturLocked && (
                    <StartWindow>
                        <ButtonCanc
                            onClick={() => {
                                setCurrentTool(tools.move)
                            }}
                        >
                            {t('Continue')}
                        </ButtonCanc>
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
                    <ButtonTools onClick={() => setShowTools(!showTools)}>
                        {currentTool === tools.move
                            ? t('Tools')
                            : currentToolName()}
                    </ButtonTools>

                    <ButtonGroupStyled showTools={showTools}>
                        <ButtonStyled
                            active={currentTool === tools.wall}
                            disable={disable1}
                            onClick={() => {
                                !disable1 && setCurrentTool(tools.wall)
                                !disable1 && setStartPoint(startPoint)
                                !disable1 && setSelected(undefined)
                                !disable1 &&
                                    setTimeout(
                                        () => setShowTools(!showTools),
                                        2000
                                    )
                            }}
                        >
                            <WallSvg />
                            <p>{t('Wall')}</p>
                            <Hint>
                                <Union />
                                <p>{t('AddDoor')}</p>
                            </Hint>
                        </ButtonStyled>

                        <ButtonStyled
                            active={currentTool === tools.aperture}
                            disable={disable2}
                            onClick={() => {
                                !disable2 && setCurrentTool(tools.aperture)
                                !disable2 && setSelected(undefined)
                                !disable2 &&
                                    setTimeout(
                                        () => setShowTools(!showTools),
                                        2000
                                    )
                            }}
                        >
                            <ApertureSvg />
                            <p>{t('Window')}</p>
                            <Hint>
                                <Union />
                                <p>{t('CloseContur')}</p>
                            </Hint>
                        </ButtonStyled>

                        <ButtonStyled
                            active={currentTool === tools.heater}
                            disable={disable2}
                            onClick={() => {
                                !disable2 && setCurrentTool(tools.heater)
                                !disable2 && setSelected(undefined)
                                !disable2 &&
                                    setTimeout(
                                        () => setShowTools(!showTools),
                                        2000
                                    )
                            }}
                        >
                            <Heater />
                            <p>{t('Heater')}</p>
                            <Hint>
                                <Union />
                                <p>{t('CloseContur')}</p>
                            </Hint>
                        </ButtonStyled>

                        <ButtonStyled
                            active={currentTool === tools.vent}
                            disable={disable2}
                            onClick={() => {
                                !disable2 && setCurrentTool(tools.vent)
                                !disable2 && setSelected(undefined)
                                !disable2 &&
                                    setTimeout(
                                        () => setShowTools(!showTools),
                                        2000
                                    )
                            }}
                        >
                            <Vent />
                            <p>{t('Vent')}</p>
                            <Hint>
                                <Union />
                                <p>{t('CloseContur')}</p>
                            </Hint>
                        </ButtonStyled>

                        <ButtonStyled
                            active={currentTool === tools.tube}
                            disable={disable2}
                            onClick={() => {
                                !disable2 && setCurrentTool(tools.tube)
                                !disable2 && setSelected(undefined)
                                !disable2 &&
                                    setTimeout(
                                        () => setShowTools(!showTools),
                                        2000
                                    )
                            }}
                        >
                            <Tube />
                            <p>{t('Tube')}</p>
                            <Hint>
                                <Union />
                                <p>{t('CloseContur')}</p>
                            </Hint>
                        </ButtonStyled>

                        <ButtonStyled
                            active={currentTool === tools.apertureDoor}
                            disable={disable2}
                            onClick={() => {
                                !disable2 && setCurrentTool(tools.apertureDoor)
                                !disable2 && setSelected(undefined)
                                !disable2 &&
                                    setTimeout(
                                        () => setShowTools(!showTools),
                                        2000
                                    )
                            }}
                        >
                            <Door />
                            <p>{t('Door')}</p>
                            <Hint>
                                <Union />

                                <p>{t('CloseContur')}</p>
                            </Hint>
                        </ButtonStyled>

                        <ButtonStyled
                            active={currentTool === tools.balconyDoor}
                            disable={disable2}
                            onClick={() => {
                                !disable2 && setCurrentTool(tools.balconyDoor)
                                !disable2 && setSelected(undefined)
                                !disable2 &&
                                    setTimeout(
                                        () => setShowTools(!showTools),
                                        2000
                                    )
                            }}
                        >
                            <Door />
                            <p>{t('Balcony')}</p>
                            <Hint>
                                <Union />
                                <p>{t('CloseContur')}</p>
                            </Hint>
                        </ButtonStyled>
                    </ButtonGroupStyled>
                </LeftTopTools>

                <RightTopTools>
                    <ButtonS
                        onClick={() => setShowInstruction(true)}
                        title={t('Instruction')}
                    >
                        <Question />
                    </ButtonS>
                    <ButtonMobileHidden>
                        <ButtonS
                            onClick={() =>
                                setCanvasScale(canvasScale * ZOOM_FACTOR)
                            }
                            title={t('Plus')}
                        >
                            <Plus />
                        </ButtonS>
                    </ButtonMobileHidden>
                    <ButtonMobileHidden>
                        <ButtonS
                            onClick={() =>
                                setCanvasScale(canvasScale / ZOOM_FACTOR)
                            }
                            title={t('Minus')}
                        >
                            <Minus />
                        </ButtonS>
                    </ButtonMobileHidden>

                    <ButtonS
                        onClick={() => {
                            setCanvasScale(0.1)
                            setCenteringState([
                                dragableState.x * 10,
                                -dragableState.y * 10,
                            ])
                        }}
                        title={t('Fit')}
                    >
                        <Fit />
                    </ButtonS>

                    <ButtonS
                        disabled={!stateElementsPast}
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
                        title={t('Undo')}
                    >
                        <Undo />
                    </ButtonS>

                    <ButtonS
                        disabled={!stateElementsFuture}
                        onClick={() => {
                            dispatch(ActionCreators.redo())

                            setCurrentTool(
                                getFutureTool(
                                    stateElementsFuture[
                                        stateElementsFuture.length - 1
                                    ].objectType
                                )
                            )

                            setElementDirection(
                                getDirection(
                                    stateElementsFuture[
                                        stateElementsFuture.length - 1
                                    ]
                                )
                            )
                            setSelected(undefined)
                        }}
                        title={t('Redo')}
                    >
                        <Redo />
                    </ButtonS>
                </RightTopTools>
                <ToolEditorContainer ref={toolEditorContainerRef} />
            </WorkplaceStyled>
        </ThemeProvider>
    )
}

export default Workplace
