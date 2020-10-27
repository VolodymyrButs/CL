import React from 'react'
import { Line, Ellipse, Text, Circle, Rect } from 'react-konva'

import { tools } from 'cad/Workplace'
import { ApertureTypePoints, HeaterTypePoints, OptionalString } from './types'
import { accentDark } from './themes/accentDark'
import { useTranslation } from 'react-i18next'

type WallProps = {
    isInProgres?: boolean
    element: {
        points: number[]
        id?: string
    }
    setCursor?: (arg: {
        element: OptionalString
        style: OptionalString
    }) => void
    selected?: OptionalString
    setSelected?: (arg: OptionalString) => void
    currentTool?: string
    cursorStyle?: string
    cursorElement?: string
    lockedContur?: boolean
}

export const Wall = ({
    element,
    isInProgres = false,
    setCursor = () => {},
    selected,
    setSelected = () => {},
    currentTool,
    cursorStyle,
    lockedContur = false,
    cursorElement,
}: WallProps) => {
    const setOpacity = () => {
        if (cursorStyle === 'pointer' && cursorElement === element.id) {
            return 0.2
        }
        if (cursorStyle !== 'pointer') {
            return 0
        }
        return 0.05
    }
    const currentStroke = () => {
        if (isInProgres && !lockedContur) {
            return `${accentDark.color}`
        }
        if (isInProgres && lockedContur) {
            return 'green'
        }
        if (selected && selected === element.id) {
            return 'blue'
        }

        return '#231F20'
    }
    return (
        <>
            <Line
                onMouseOver={() => {
                    if (
                        currentTool === tools.heater ||
                        currentTool === tools.vent ||
                        currentTool === tools.tube ||
                        currentTool === tools.aperture ||
                        currentTool === tools.apertureDoor ||
                        currentTool === tools.balconyDoor
                    )
                        setCursor({
                            element: element.id,
                            style: 'pointer',
                        })
                }}
                onMouseOut={() =>
                    setCursor({
                        element: undefined,
                        style: 'default',
                    })
                }
                onTouchStart={() => {
                    if (
                        currentTool === tools.heater ||
                        currentTool === tools.vent ||
                        currentTool === tools.tube ||
                        currentTool === tools.aperture ||
                        currentTool === tools.apertureDoor ||
                        currentTool === tools.balconyDoor
                    ) {
                        setSelected(element.id)
                    }
                }}
                onClick={() => {
                    if (
                        currentTool === tools.heater ||
                        currentTool === tools.vent ||
                        currentTool === tools.tube ||
                        currentTool === tools.aperture ||
                        currentTool === tools.apertureDoor ||
                        currentTool === tools.balconyDoor
                    ) {
                        setSelected(element.id)
                    }
                }}
                opacity={setOpacity()}
                x={0}
                y={0}
                points={element.points}
                strokeWidth={250}
                stroke={currentStroke()}
            />

            <Line
                onMouseOver={() => {
                    if (
                        currentTool === tools.heater ||
                        currentTool === tools.vent ||
                        currentTool === tools.tube ||
                        currentTool === tools.aperture ||
                        currentTool === tools.apertureDoor ||
                        currentTool === tools.balconyDoor
                    )
                        setCursor({
                            element: element.id,
                            style: 'pointer',
                        })
                }}
                onMouseOut={() =>
                    setCursor({
                        element: undefined,
                        style: 'default',
                    })
                }
                onTouchStart={() => {
                    if (
                        currentTool === tools.heater ||
                        currentTool === tools.vent ||
                        currentTool === tools.tube ||
                        currentTool === tools.aperture ||
                        currentTool === tools.apertureDoor ||
                        currentTool === tools.balconyDoor
                    ) {
                        setSelected(element.id)
                    }
                }}
                onClick={() => {
                    if (
                        currentTool === tools.heater ||
                        currentTool === tools.vent ||
                        currentTool === tools.tube ||
                        currentTool === tools.aperture ||
                        currentTool === tools.apertureDoor ||
                        currentTool === tools.balconyDoor
                    ) {
                        setSelected(element.id)
                    }
                }}
                x={0}
                y={0}
                points={element.points}
                strokeWidth={20}
                stroke={currentStroke()}
                lineCap={'round'}
                lineJoin={'round'}
            />
        </>
    )
}

type MainDoorProps = {
    isInProgres?: boolean
    element: {
        points: number[]
        id?: string
    }
}

export const MainDoor = ({ element, isInProgres = false }: MainDoorProps) => {
    const { t } = useTranslation()
    return (
        <>
            <Line
                x={0}
                y={0}
                points={[
                    element.points[0],
                    element.points[1],
                    element.points[0] + element.points[3],
                    element.points[1],
                ]}
                strokeWidth={50}
                stroke={'orange'}
                lineCap={'round'}
                lineJoin={'round'}
                dash={isInProgres ? [100, 100] : [0, 0]}
            />

            <Wall
                element={{
                    points: [
                        element.points[0],
                        element.points[1],
                        element.points[0],
                        element.points[1] + element.points[2],
                    ],
                }}
            />

            <Wall
                element={{
                    points: [
                        element.points[0] + element.points[3],
                        element.points[1],
                        element.points[0] + element.points[3],
                        element.points[1] + element.points[2],
                    ],
                }}
            />

            {element.points[4] !== 0 && (
                <>
                    <Ellipse
                        x={element.points[0] + element.points[3] / 2}
                        y={element.points[1] + element.points[2] / 2 - 350}
                        radiusX={200}
                        radiusY={100}
                        strokeWidth={4}
                        stroke={'black'}
                    />
                    <Text
                        x={element.points[0] + element.points[3] / 2 - 90}
                        y={element.points[1] + element.points[2] / 2 - 280}
                        scaleY={-1}
                        text={t('Height')}
                        fontSize={60}
                        fill={'green'}
                    />
                    <Text
                        x={element.points[0] + element.points[3] / 2 - 80}
                        y={element.points[1] + element.points[2] / 2 - 350}
                        scaleY={-1}
                        text={`${element.points[4]}`}
                        fontSize={80}
                        fill={'green'}
                    />
                </>
            )}
        </>
    )
}

type ApertureProps = {
    isInProgres?: boolean
    element: {
        points: ApertureTypePoints
        id?: string
    }
    isApertureWindow?: boolean
}

export const Aperture = ({
    element,
    isInProgres = false,
    isApertureWindow = false,
}: ApertureProps) => {
    return (
        <>
            <Wall
                element={{
                    points: [
                        element.points[0][0],
                        element.points[0][1],
                        element.points[1][0],
                        element.points[1][1],
                    ],
                }}
            />

            <Line
                x={0}
                y={0}
                points={[
                    element.points[1][0],
                    element.points[1][1],
                    element.points[2][0],
                    element.points[2][1],
                ]}
                strokeWidth={50}
                stroke={isApertureWindow ? 'blue' : 'green'}
                lineCap={'round'}
                lineJoin={'round'}
                dash={isInProgres ? [50, 50] : [0, 0]}
            />

            <Wall
                element={{
                    points: [
                        element.points[2][0],
                        element.points[2][1],
                        element.points[3][0],
                        element.points[3][1],
                    ],
                }}
            />

            <Ellipse
                x={element.points[6][0]}
                y={element.points[6][1]}
                radiusX={250}
                radiusY={150}
                strokeWidth={4}
                stroke={'#231F20'}
            />

            <Text
                x={element.points[7][0]}
                y={element.points[7][1]}
                text={
                    `${element.points[9][1]}` ? `${element.points[9][1]}` : '0'
                }
                scaleY={-1}
                fontSize={120}
                fill={'green'}
            />

            <Text
                x={element.points[8][0]}
                y={element.points[8][1]}
                text={
                    `${element.points[9][0]}` ? `${element.points[9][0]}` : '0'
                }
                scaleY={-1}
                fontSize={120}
                fill={'green'}
            />
        </>
    )
}

type BatteryProps = {
    isInProgres?: boolean
    element: {
        points: HeaterTypePoints
    }
}

export const Battery = ({ element, isInProgres = false }: BatteryProps) => {
    return (
        <>
            <Line
                x={0}
                y={0}
                points={[
                    element.points[0][0],
                    element.points[0][1],
                    element.points[1][0],
                    element.points[1][1],
                ]}
                strokeWidth={20}
                stroke={'#811F00'}
                lineCap={'round'}
                lineJoin={'round'}
                dash={isInProgres ? [50, 50] : [0, 0]}
            />

            <Line
                x={0}
                y={0}
                points={[
                    element.points[1][0],
                    element.points[1][1],
                    element.points[2][0],
                    element.points[2][1],
                ]}
                strokeWidth={20}
                stroke={'#811F00'}
                lineCap={'round'}
                lineJoin={'round'}
                dash={isInProgres ? [50, 50] : [0, 0]}
            />

            <Line
                x={0}
                y={0}
                points={[
                    element.points[2][0],
                    element.points[2][1],
                    element.points[3][0],
                    element.points[3][1],
                ]}
                strokeWidth={20}
                stroke={'#811F00'}
                lineCap={'round'}
                lineJoin={'round'}
                dash={isInProgres ? [50, 50] : [0, 0]}
            />

            <Line
                x={0}
                y={0}
                points={[
                    element.points[3][0],
                    element.points[3][1],
                    element.points[0][0],
                    element.points[0][1],
                ]}
                strokeWidth={20}
                stroke={'#811F00'}
                lineCap={'round'}
                lineJoin={'round'}
                dash={isInProgres ? [50, 50] : [0, 0]}
            />
        </>
    )
}

type VentProps = {
    isInProgres?: boolean
    element: {
        points: number[]
    }
}

export const Vent = ({ element, isInProgres = false }: VentProps) => {
    return (
        <>
            <Line
                x={0}
                y={0}
                points={[
                    element.points[0],
                    element.points[1],
                    element.points[0] + 150,
                    element.points[1],
                ]}
                strokeWidth={20}
                stroke={'blue'}
                lineCap={'round'}
                lineJoin={'round'}
                dash={isInProgres ? [20, 20] : [0, 0]}
            />

            <Line
                x={0}
                y={0}
                points={[
                    element.points[0] + 150,
                    element.points[1],
                    element.points[0] + 150,
                    element.points[1] + 150,
                ]}
                strokeWidth={20}
                stroke={'blue'}
                lineCap={'round'}
                lineJoin={'round'}
                dash={isInProgres ? [20, 20] : [0, 0]}
            />

            <Line
                x={0}
                y={0}
                points={[
                    element.points[0] + 150,
                    element.points[1] + 150,
                    element.points[0],
                    element.points[1] + 150,
                ]}
                strokeWidth={20}
                stroke={'blue'}
                lineCap={'round'}
                lineJoin={'round'}
                dash={isInProgres ? [20, 20] : [0, 0]}
            />

            <Line
                x={0}
                y={0}
                points={[
                    element.points[0],
                    element.points[1] + 150,
                    element.points[0],
                    element.points[1],
                ]}
                strokeWidth={20}
                stroke={'blue'}
                lineCap={'round'}
                lineJoin={'round'}
                dash={isInProgres ? [20, 20] : [0, 0]}
            />

            <Text
                x={element.points[2]}
                y={element.points[3]}
                text={`${element.points[4]}` ? `${element.points[4]}` : '0'}
                scaleY={-1}
                fontSize={120}
                fill={'green'}
            />
        </>
    )
}

type TubeProps = {
    isInProgres?: boolean
    element: {
        points: number[]
    }
}

export const Tube = ({ element, isInProgres = false }: TubeProps) => {
    return (
        <Circle
            x={element.points[0]}
            y={element.points[1]}
            radius={element.points[2] / 2}
            stroke={'red'}
            strokeWidth={10}
            dash={isInProgres ? [20, 20] : [0, 0]}
        />
    )
}

type BalconyDoorProps = {
    isInProgres?: boolean
    element: {
        points: [number, number][]
        balconyType?: string
    }
}

export const BalconyDoor = ({
    element,
    isInProgres = false,
}: BalconyDoorProps) => {
    return (
        <>
            <Wall
                element={{
                    points: [
                        element.points[0][0],
                        element.points[0][1],
                        element.points[1][0],
                        element.points[1][1],
                    ],
                }}
            />
            {element.balconyType === 'center' ? (
                <>
                    <Line // window
                        x={0}
                        y={0}
                        points={[
                            element.points[18][0],
                            element.points[18][1],
                            element.points[2][0],
                            element.points[2][1],
                        ]}
                        strokeWidth={50}
                        stroke={'blue'}
                        lineCap={'round'}
                        lineJoin={'round'}
                        dash={isInProgres ? [50, 50] : [0, 0]}
                    />
                    <Line // door
                        x={0}
                        y={0}
                        points={[
                            element.points[18][0],
                            element.points[18][1],
                            element.points[11][0],
                            element.points[11][1],
                        ]}
                        strokeWidth={50}
                        stroke={'green'}
                        lineCap={'round'}
                        lineJoin={'round'}
                        dash={isInProgres ? [50, 50] : [0, 0]}
                    />
                    <Line // window
                        x={0}
                        y={0}
                        points={[
                            element.points[1][0],
                            element.points[1][1],
                            element.points[11][0],
                            element.points[11][1],
                        ]}
                        strokeWidth={50}
                        stroke={'blue'}
                        lineCap={'round'}
                        lineJoin={'round'}
                        dash={isInProgres ? [50, 50] : [0, 0]}
                    />
                </>
            ) : (
                <>
                    <Line // door
                        x={0}
                        y={0}
                        points={[
                            element.points[11][0],
                            element.points[11][1],
                            element.points[2][0],
                            element.points[2][1],
                        ]}
                        strokeWidth={50}
                        stroke={
                            element.balconyType === 'left' ? 'blue' : 'green'
                        }
                        lineCap={'round'}
                        lineJoin={'round'}
                        dash={isInProgres ? [50, 50] : [0, 0]}
                    />
                    <Line // window
                        x={0}
                        y={0}
                        points={[
                            element.points[1][0],
                            element.points[1][1],
                            element.points[11][0],
                            element.points[11][1],
                        ]}
                        strokeWidth={50}
                        stroke={
                            element.balconyType === 'left' ? 'green' : 'blue'
                        }
                        lineCap={'round'}
                        lineJoin={'round'}
                        dash={isInProgres ? [50, 50] : [0, 0]}
                    />
                </>
            )}
            <Wall
                element={{
                    points: [
                        element.points[2][0],
                        element.points[2][1],
                        element.points[3][0],
                        element.points[3][1],
                    ],
                }}
            />
            <Rect
                x={element.points[6][0]}
                y={element.points[6][1]}
                width={700}
                height={420}
                strokeWidth={4}
                stroke={'#231F20'}
            />
            <Text
                x={element.points[7][0]}
                y={element.points[7][1]}
                text={
                    `${element.points[9][1]}`
                        ? 'T: ' + `${element.points[9][1]}`
                        : '0'
                }
                scaleY={-1}
                fontSize={120}
                fill={'green'}
            />
            <Text
                x={element.points[8][0]}
                y={element.points[8][1]}
                text={
                    `${element.points[9][0]}`
                        ? 'WB: ' + `${element.points[9][0]}`
                        : '0'
                }
                scaleY={-1}
                fontSize={120}
                fill={'green'}
            />
            <Text
                x={element.points[17][0]}
                y={element.points[17][1]}
                text={
                    `${element.points[16][0]}`
                        ? 'DB: ' + `${element.points[16][0]}`
                        : '0'
                }
                scaleY={-1}
                fontSize={120}
                fill={'green'}
            />
            {element.balconyType === 'center' && (
                <>
                    <Wall
                        element={{
                            points: [
                                element.points[18][0],
                                element.points[18][1],
                                element.points[19][0],
                                element.points[19][1],
                            ],
                        }}
                    />
                </>
            )}
            <Wall
                element={{
                    points: [
                        element.points[10][0],
                        element.points[10][1],
                        element.points[11][0],
                        element.points[11][1],
                    ],
                }}
            />
            <Wall
                element={{
                    points: [
                        element.points[12][0],
                        element.points[12][1],
                        element.points[14][0],
                        element.points[14][1],
                    ],
                }}
            />
            <Wall
                element={{
                    points: [
                        element.points[13][0],
                        element.points[13][1],
                        element.points[15][0],
                        element.points[15][1],
                    ],
                }}
            />
        </>
    )
}
