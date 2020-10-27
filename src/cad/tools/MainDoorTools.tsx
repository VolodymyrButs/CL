import React, { useState } from 'react'
import { Layer, Ellipse, Text, Line } from 'react-konva'
import styled, { ThemeProvider } from 'styled-components'

import { Portal } from 'cad/Portal'
import { useDispatch } from 'react-redux'
import { Wall } from 'cad/ElementsType'
import { tools } from 'cad/Workplace'
import { v4 as uuid } from 'uuid'
import { useTranslation } from 'react-i18next'
import { light } from 'cad/themes/light'
import EnterSvg from 'assets/icons/iconsCad/enter.svg'
import { NumberInput } from 'cad/NumberInput'
import { Title, Wrapper } from './WallTool'

const MainDoorEditorContainer = styled.form`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: flex-start;
    background-color: white;
    border: solid 1px ${light.bgColor};
    padding: 5px;
    & p {
        margin: 0 5px;
        font-size: 20px;
        align-self: center;
    }
    @media (max-width: 767px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        max-width: 320px;
        box-sizing: border-box;
        justify-items: center;
        row-gap: 5px;
    }
`
const InputSubmit = styled.button`
    cursor: pointer;
    border: none;
    padding: 0;
    margin: 5px 8px 0 10px;
    background-color: white;
`
const LineS = styled.div`
    height: 120%;
    min-height: 50px;
    width: 1px;
    border-left: solid 1px ${light.bgColor};
    transform: translatey(-10%);
    @media (max-width: 767px) {
        display: none;
    }
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
                            y={
                                startPoint[1] +
                                MainDoorDepthInputValue / 2 -
                                350
                            }
                            radiusX={200}
                            radiusY={100}
                            strokeWidth={4}
                            stroke={'black'}
                        />
                        <Text
                            x={startPoint[0] + MainDoorWidthInputValue / 2 - 90}
                            y={
                                startPoint[1] +
                                MainDoorDepthInputValue / 2 -
                                280
                            }
                            scaleY={-1}
                            text={t('Height')}
                            fontSize={60}
                            fill={'green'}
                        />
                        <Text
                            x={startPoint[0] + MainDoorWidthInputValue / 2 - 80}
                            y={
                                startPoint[1] +
                                MainDoorDepthInputValue / 2 -
                                350
                            }
                            scaleY={-1}
                            text={String(MainDoorHeigthInputValue)}
                            fontSize={80}
                            fill={'green'}
                        />
                    </>
                )}
            </Layer>

            <Portal node={toolEditorContainerNode}>
                <ThemeProvider theme={light}>
                    <Wrapper>
                        <Title>{t('MainDoor')}</Title>
                        <MainDoorEditorContainer onSubmit={handleSubmit}>
                            <NumberInput
                                placeholder={t('Width')}
                                setInputValue={setMainDoorWidthInputValue}
                                value={MainDoorWidthInputValue}
                                onChange={handleChangeMainDoorWidthInput}
                            />
                            <NumberInput
                                placeholder={t('Depth')}
                                setInputValue={setMainDoorDepthInputValue}
                                value={MainDoorDepthInputValue}
                                onChange={handleChangeMainDoorDepthInput}
                            />
                            <NumberInput
                                placeholder={t('Height')}
                                setInputValue={setMainDoorHeigthInputValue}
                                value={MainDoorHeigthInputValue}
                                onChange={handleChangeMainDoorHeigthInput}
                            />
                            <LineS />
                            <InputSubmit type="submit">
                                <EnterSvg />
                            </InputSubmit>
                        </MainDoorEditorContainer>
                    </Wrapper>
                </ThemeProvider>
            </Portal>
        </>
    )
}
