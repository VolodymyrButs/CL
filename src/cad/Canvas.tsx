import React, { useRef, useState, useLayoutEffect, useCallback } from 'react'
import { Stage, Layer } from 'react-konva'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import useGestures from 'use-gestures'

import { store } from 'cad/storage/reduser'
import { WallTool } from 'cad/tools/WallTool'
import { MainDoorTool } from 'cad/tools/MainDoorTools'
import { ApertureTool } from 'cad/tools/ApertureTool'
import { BatteryTool } from 'cad/tools/BatteryTool'
import { VentTool } from 'cad/tools/VentTool'
import { TubeTool } from 'cad/tools/TubeTool'
import { BalconyDoorTool } from './tools/BalconyDoorTool'
import { tools } from 'cad/Workplace'
import {
    Wall,
    MainDoor,
    Aperture,
    Battery,
    Vent,
    Tube,
    BalconyDoor,
} from 'cad/ElementsType'
import {
    ApertureTypePoints,
    OptionalString,
    ElementType,
    isWall,
    isMainDoor,
    isAperture,
    isApertureDoor,
    isHeater,
    isVent,
    isTube,
    isBalconyDoor,
} from './types'

const CanvasContainer = styled.div`
    width: 100%;
    height: 100%;
    max-width: 100vw;
    position: absolute;
    touch-action: auto;
`

type Props = {
    centeringState: number[]
    setCenteringState: React.Dispatch<React.SetStateAction<number[]>>
    setCursor: (arg: { element: OptionalString; style: OptionalString }) => void
    cursor: {
        element: OptionalString
        style: OptionalString
    }
    selected: string | undefined
    setSelected: (arg: OptionalString) => void
    scale: number
    stateElements: Array<ElementType>
    toolEditorContainerNode?: React.ReactNode
    currentTool: string
    setCanvasScale: (arg: number) => void
    setCurrentTool: (arg: string) => void
    setStartPoint: (arg: [number, number]) => void
    startPoint: [number, number]
    setDragableState: (arg: { x: number; y: number }) => void
    dragableState: { x: number; y: number }
    setElementDirection: (arg: string) => void
    elementDirection: string
    setWallDirection: (currentAperturePoints: ApertureTypePoints) => null
}

export const Canvas = ({
    setCanvasScale,
    centeringState,
    setCenteringState,
    setCursor,
    cursor,
    selected,
    setSelected,
    scale,
    stateElements,
    toolEditorContainerNode,
    currentTool,
    setCurrentTool,
    setStartPoint,
    startPoint,
    setDragableState,
    dragableState,
    setElementDirection,
    elementDirection,
    setWallDirection,
}: Props) => {
    const [switchDirection, setSwitchDirection] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [canvasSize, setcanvasSize] = useState({ width: 0, height: 0 })

    const handleResize = useCallback(() => {
        setcanvasSize({
            width: containerRef.current!.clientWidth,
            height: containerRef.current!.clientHeight,
        })
    }, [])
    useLayoutEffect(() => {
        setcanvasSize({
            width: containerRef.current!.clientWidth,
            height: containerRef.current!.clientHeight,
        })
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [handleResize])

    const renderCurrentTool = () => {
        if (currentTool !== tools.mainDoor && !stateElements.length) {
            return null
        }

        switch (currentTool) {
            case tools.wall: {
                return (
                    <WallTool
                        scale={scale}
                        setCenteringState={setCenteringState}
                        elementDirection={elementDirection}
                        setElementDirection={setElementDirection}
                        toolEditorContainerNode={toolEditorContainerNode}
                        dragableState={dragableState}
                        startPoint={startPoint}
                        setCurrentTool={setCurrentTool}
                    />
                )
            }
            case tools.mainDoor: {
                return (
                    <MainDoorTool
                        startPoint={startPoint}
                        setCurrentTool={setCurrentTool}
                        toolEditorContainerNode={toolEditorContainerNode}
                    />
                )
            }
            case tools.aperture: {
                return (
                    <ApertureTool
                        selected={selected}
                        setSelected={setSelected}
                        setCurrentTool={setCurrentTool}
                        toolEditorContainerNode={toolEditorContainerNode}
                        isApertureWindow
                    />
                )
            }
            case tools.apertureDoor: {
                return (
                    <ApertureTool
                        setWallDirection={setWallDirection}
                        selected={selected}
                        setSelected={setSelected}
                        setStartPoint={setStartPoint}
                        setCurrentTool={setCurrentTool}
                        toolEditorContainerNode={toolEditorContainerNode}
                    />
                )
            }
            case tools.heater: {
                return (
                    <BatteryTool
                        selected={selected}
                        setSelected={setSelected}
                        setCurrentTool={setCurrentTool}
                        toolEditorContainerNode={toolEditorContainerNode}
                    />
                )
            }
            case tools.vent: {
                return (
                    <VentTool
                        selected={selected}
                        setSelected={setSelected}
                        setCurrentTool={setCurrentTool}
                        toolEditorContainerNode={toolEditorContainerNode}
                        switchDirection={switchDirection}
                        setSwitchDirection={setSwitchDirection}
                    />
                )
            }
            case tools.tube: {
                return (
                    <TubeTool
                        selected={selected}
                        setSelected={setSelected}
                        setCurrentTool={setCurrentTool}
                        toolEditorContainerNode={toolEditorContainerNode}
                        switchDirection={switchDirection}
                        setSwitchDirection={setSwitchDirection}
                    />
                )
            }
            case tools.balconyDoor: {
                return (
                    <BalconyDoorTool
                        setWallDirection={setWallDirection}
                        selected={selected}
                        setSelected={setSelected}
                        setStartPoint={setStartPoint}
                        setCurrentTool={setCurrentTool}
                        toolEditorContainerNode={toolEditorContainerNode}
                    />
                )
            }
            default: {
                return null
            }
        }
    }
    useGestures(containerRef, {
        onPinchChanged: (event: { scale: number }) => {
            if (event.scale) {
                setTimeout(setCanvasScale(event.scale / 10), 100)
            }
        },
    })
    return (
        <CanvasContainer ref={containerRef}>
            <Stage
                width={canvasSize.width}
                height={canvasSize.height}
                scaleX={scale}
                scaleY={-scale}
                draggable
                offsetX={
                    -canvasSize.width / scale / 2 +
                    centeringState[0] * (0.1 / scale!)
                }
                offsetY={
                    canvasSize.height / scale / 2 +
                    centeringState[1] * (0.1 / scale!)
                }
                style={{
                    cursor: cursor.style,
                }}
                onDragEnd={(event) =>
                    setDragableState({
                        x: event.target.x(),
                        y: event.target.y(),
                    })
                }
            >
                <Provider store={store}>
                    <Layer>
                        {stateElements.map((element: ElementType) => {
                            if (isWall(element)) {
                                return (
                                    <Wall
                                        currentTool={currentTool}
                                        cursorStyle={cursor.style}
                                        cursorElement={cursor.element}
                                        setCursor={setCursor}
                                        selected={selected}
                                        setSelected={setSelected}
                                        key={element.id}
                                        element={element}
                                    />
                                )
                            }
                            if (isMainDoor(element)) {
                                return (
                                    <MainDoor
                                        key={element.id}
                                        element={element}
                                    />
                                )
                            }
                            if (isAperture(element)) {
                                return (
                                    <Aperture
                                        key={element.id}
                                        element={element}
                                        isApertureWindow
                                    />
                                )
                            }
                            if (isApertureDoor(element)) {
                                return (
                                    <Aperture
                                        key={element.id}
                                        element={element}
                                    />
                                )
                            }
                            if (isHeater(element)) {
                                return (
                                    <Battery
                                        key={element.id}
                                        element={element}
                                    />
                                )
                            }
                            if (isVent(element)) {
                                return (
                                    <Vent key={element.id} element={element} />
                                )
                            }
                            if (isTube(element)) {
                                return (
                                    <Tube key={element.id} element={element} />
                                )
                            }
                            if (isBalconyDoor(element!)) {
                                return (
                                    <BalconyDoor
                                        key={element!.id}
                                        element={element}
                                    />
                                )
                            }
                            return ''
                        })}
                    </Layer>
                    {renderCurrentTool()}
                </Provider>
            </Stage>
        </CanvasContainer>
    )
}
