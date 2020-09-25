import React, { useState } from 'react'
import { Layer, Ellipse, Text, Line } from 'react-konva'
import styled, { ThemeProvider } from 'styled-components'

import { Portal } from 'cad/Portal'
import { useDispatch } from 'react-redux'
import { Button } from 'cad/Button'
import { Wall } from 'cad/ElementsType'
import { tools } from 'cad/Workplace'
import { v4 as uuid } from 'uuid'
import { useTranslation } from 'react-i18next'
import { accentDark } from 'cad/themes/accentDark'
import { light } from 'cad/themes/light'
import Door from 'assets/icons/iconsCad/door.svg'
import { NumberInput } from 'cad/NumberInput'

const MainDoorEditorContainer = styled.form`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
    padding: 5px;
    & p {
        margin: 0 5px;
        font-size: 20px;
        align-self: center;
    }
    & button {
        align-self: center;
        margin: 0 10px;
    }
    @media (max-width: 767px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        max-width: 320px;
        justify-items: center;
        row-gap: 5px;
    }
`
const InputSubmit = styled(Button)`
    display: flex;
`
const MainDoorHeader = styled.h3`
    width: 100%;
    text-align: center;
    margin: 0;
    grid-column-start: 1;
    grid-column-end: 3;
`

type Props = {
    toolEditorContainerNode?: React.ReactNode
    setCurrentTool: (arg: string) => void
    startPoint: [number, number]
}
export const MainDoorTool = ({
    toolEditorContainerNode,
    setCurrentTool,
    startPoint,
}: Props) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [MainDoorWidthInputValue, setMainDoorWidthInputValue] = useState<
        number
    >(900)
    const handleChangeMainDoorWidthInput = (event: {
        target: { value: string }
    }) => {
        if (isNaN(Number(event.target.value))) {
            return
        }
        setMainDoorWidthInputValue(Number(event.target.value))
    }

    const [MainDoorDepthInputValue, setMainDoorDepthInputValue] = useState(400)
    const handleChangeMainDoorDepthInput = (event: {
        target: { value: string }
    }) => {
        if (isNaN(Number(event.target.value))) {
            return
        }
        setMainDoorDepthInputValue(Number(event.target.value))
    }

    const [MainDoorHeigthInputValue, setMainDoorHeigthInputValue] = useState(
        2000
    )
    const handleChangeMainDoorHeigthInput = (event: {
        target: { value: string }
    }) => {
        if (isNaN(Number(event.target.value))) {
            return
        }
        setMainDoorHeigthInputValue(Number(event.target.value))
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch({
            type: 'addElement',
            element: {
                id: uuid(),
                objectType: 'mainDoor',
                points: [
                    startPoint[0],
                    startPoint[1],
                    MainDoorDepthInputValue,
                    MainDoorWidthInputValue,
                    MainDoorHeigthInputValue,
                ],
            },
        })
        setCurrentTool(tools.wall)
    }
    return (
        <>
            <Layer>
                <Line
                    x={0}
                    y={0}
                    points={[
                        startPoint[0],
                        startPoint[1],
                        startPoint[0] + MainDoorWidthInputValue,
                        startPoint[1],
                    ]}
                    strokeWidth={50}
                    stroke={'red'}
                    lineCap={'round'}
                    lineJoin={'round'}
                    dash={[100, 100]}
                />

                <Wall
                    isInProgres
                    element={{
                        points: [
                            startPoint[0],
                            startPoint[1],
                            startPoint[0],
                            startPoint[1] + MainDoorDepthInputValue,
                        ],
                    }}
                />

                <Wall
                    isInProgres
                    element={{
                        points: [
                            startPoint[0] + MainDoorWidthInputValue,
                            startPoint[1],
                            startPoint[0] + MainDoorWidthInputValue,
                            startPoint[1] + MainDoorDepthInputValue,
                        ],
                    }}
                />

                {MainDoorHeigthInputValue !== 0 && (
                    <>
                        <Ellipse
                            x={startPoint[0] + MainDoorWidthInputValue / 2}
                            y={startPoint[1] + MainDoorDepthInputValue / 2}
                            radiusX={200}
                            radiusY={100}
                            strokeWidth={4}
                            stroke={'white'}
                        />

                        <Text
                            x={
                                startPoint[0] +
                                MainDoorWidthInputValue / 2 -
                                140
                            }
                            y={startPoint[1] + MainDoorDepthInputValue / 2 + 50}
                            scaleY={-1}
                            text={String(MainDoorHeigthInputValue)}
                            fontSize={120}
                            fill={'green'}
                        />
                    </>
                )}
            </Layer>

            <Portal node={toolEditorContainerNode}>
                <ThemeProvider theme={light}>
                    <MainDoorEditorContainer onSubmit={handleSubmit}>
                        <MainDoorHeader>{t('MainDoor')}</MainDoorHeader>

                        <p>{t('Width')}</p>

                        <NumberInput
                            value={MainDoorWidthInputValue}
                            onChange={handleChangeMainDoorWidthInput}
                        />

                        <p>{t('Depth')}</p>

                        <NumberInput
                            value={MainDoorDepthInputValue}
                            onChange={handleChangeMainDoorDepthInput}
                        />

                        <p>{t('Height')}</p>

                        <NumberInput
                            value={MainDoorHeigthInputValue}
                            onChange={handleChangeMainDoorHeigthInput}
                        />

                        <p />

                        <InputSubmit
                            theme={accentDark}
                            $size="svgMobile"
                            type="submit"
                        >
                            {t('Draw')}

                            <Door />
                        </InputSubmit>
                    </MainDoorEditorContainer>
                </ThemeProvider>
            </Portal>
        </>
    )
}
