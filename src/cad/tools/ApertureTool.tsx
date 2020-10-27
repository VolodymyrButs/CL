import React, { useState, useEffect } from 'react'
import { Layer } from 'react-konva'
import styled, { ThemeProvider } from 'styled-components'
import { useTranslation } from 'react-i18next'

import { Portal } from 'cad/Portal'
import { useDispatch, useSelector } from 'react-redux'
import { Aperture, Wall } from 'cad/ElementsType'
import { tools } from 'cad/Workplace'
import { v4 as uuid } from 'uuid'

import { light } from 'cad/themes/light'
import { getElements } from 'cad/storage/selectors'
import {
    getSelectedWallLength,
    calculateDefaultIndent,
} from 'cad/reusableFunctions'
import EnterSvg from 'assets/icons/iconsCad/enter.svg'
import { NumberInput } from 'cad/NumberInput'
import { ApertureTypePoints, OptionalString, WallType } from 'cad/types'
import { InputSubmit, Title, Wrapper } from './WallTool'

const ApertureEditorContainer = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border: solid 1px ${light.bgColor};
    padding: 5px;
    & p {
        max-width: 200px;
        margin: 0;
        font-size: 16px;
        align-self: center;
        text-align: center;
        @media (max-width: 819px) {
            font-size: 14px;
            max-width: 90px;
            text-align: center;
        }
    }
    @media (max-width: 767px) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        max-width: 320px;
        align-items: flex-end;
        justify-items: center;
        box-sizing: border-box;
    }
`

const InputWraper = styled.div`
    margin: 0 5px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`

const Line = styled.div`
    height: 120%;
    width: 1px;
    border-left: solid 1px ${light.bgColor};
    @media (max-width: 767px) {
        display: none;
    }
`

type Props = {
    toolEditorContainerNode: React.ReactNode
    setCurrentTool: (arg: string) => void
    selected: OptionalString
    setSelected: (arg: OptionalString) => void
    isApertureWindow?: boolean
    setStartPoint?: undefined | ((arg: [number, number]) => void)
    setWallDirection?:
        | undefined
        | ((currentAperturePoints: ApertureTypePoints) => void)
}
export const ApertureTool = ({
    toolEditorContainerNode,
    selected,
    setCurrentTool,
    setSelected,
    setStartPoint = () => {},
    setWallDirection = () => {},
    isApertureWindow = false,
}: Props) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const stateElements = useSelector(getElements)

    const selectedLine: WallType = stateElements.find(
        (element: { id: string }) => element.id === selected
    )
    const selectedWallLength = selected
        ? getSelectedWallLength(selectedLine!)
        : 0
    const [leftIndent, setLeftIndent] = useState(0)
    const [rightIndent, setRightIndent] = useState(0)

    useEffect(() => {
        const defaultIndent = calculateDefaultIndent(selected, selectedLine)

        setLeftIndent(defaultIndent)
        setRightIndent(defaultIndent)
    }, [selected, selectedLine])

    const handleLeftIndentChange = (event: { target: { value: string } }) => {
        if (
            Number(selectedWallLength) - rightIndent >=
            Number(event.target.value)
        )
            setLeftIndent(Number(event.target.value))
    }
    const handleRightIndentChange = (event: { target: { value: string } }) => {
        if (
            Number(selectedWallLength) - leftIndent >=
            Number(event.target.value)
        )
            setRightIndent(Number(event.target.value))
    }

    const [apertureDepth, setApertureDepth] = useState(200)
    const handleApertureDepthChange = (event: { target: { value: string } }) =>
        setApertureDepth(Number(event.target.value))

    const [apertureNicheDepth, setApertureNicheDepth] = useState(100)
    const handleApertureNicheDepthChange = (event: {
        target: { value: string }
    }) => setApertureNicheDepth(Number(event.target.value))

    const [apertureHeigthTop, setApertureHeigthTop] = useState(2000)
    const handleApertureHeigthTopChange = (event: {
        target: { value: string }
    }) => {
        setApertureHeigthTop(Number(event.target.value))
    }
    const [apertureHeigthBottom, setApertureHeigthBottom] = useState(
        isApertureWindow ? 1000 : 0
    )
    const handleApertureHeigthBottomChange = (event: {
        target: { value: string }
    }) => {
        setApertureHeigthBottom(Number(event.target.value))
    }

    if (!stateElements.length) {
        return null
    }

    const getCurrentAperturePoints: (arg: WallType) => ApertureTypePoints = (
        line: WallType
    ) => {
        if (
            line.points[0] !== line.points[2] &&
            line.points[0] < line.points[2]
        ) {
            return [
                [line.points[0] + leftIndent, line.points[1]],
                [line.points[0] + leftIndent, line.points[1] - apertureDepth],
                [line.points[2] - rightIndent, line.points[3] - apertureDepth],
                [line.points[2] - rightIndent, line.points[3]],
                [
                    line.points[0] + leftIndent,
                    line.points[1] - apertureNicheDepth,
                ],
                [
                    line.points[2] - rightIndent,
                    line.points[3] - apertureNicheDepth,
                ],
                [
                    line.points[0] +
                        leftIndent +
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2,
                    line.points[1] - apertureDepth - 190,
                ],
                [
                    line.points[0] +
                        leftIndent +
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2 -
                        120,
                    line.points[1] - apertureDepth - 80,
                ],
                [
                    line.points[0] +
                        leftIndent +
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2 -
                        120,
                    line.points[1] - apertureDepth - 200,
                ],
                [apertureHeigthBottom, apertureHeigthTop],
            ]
        }

        if (
            line.points[0] !== line.points[2] &&
            line.points[0] > line.points[2]
        ) {
            return [
                [line.points[0] - rightIndent, line.points[1]],
                [line.points[0] - rightIndent, line.points[1] + apertureDepth],
                [line.points[2] + leftIndent, line.points[3] + apertureDepth],
                [line.points[2] + leftIndent, line.points[3]],
                [
                    line.points[0] - rightIndent,
                    line.points[1] + apertureNicheDepth,
                ],
                [
                    line.points[2] + leftIndent,
                    line.points[3] + apertureNicheDepth,
                ],
                [
                    line.points[2] +
                        leftIndent +
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2,
                    line.points[3] + apertureDepth + 190,
                ],
                [
                    line.points[2] +
                        leftIndent +
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2 -
                        120,
                    line.points[3] + apertureDepth + 180,
                ],
                [
                    line.points[2] +
                        leftIndent +
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2 -
                        120,
                    line.points[3] + apertureDepth + 290,
                ],
                [apertureHeigthTop, apertureHeigthBottom],
            ]
        }

        if (
            line.points[0] === line.points[2] &&
            line.points[1] < line.points[3]
        ) {
            return [
                [line.points[0], line.points[1] + rightIndent],
                [line.points[0] + apertureDepth, line.points[1] + rightIndent],
                [line.points[2] + apertureDepth, line.points[3] - leftIndent],

                [line.points[2], line.points[3] - leftIndent],
                [
                    line.points[0] + apertureNicheDepth,
                    line.points[1] + rightIndent,
                ],
                [
                    line.points[2] + apertureNicheDepth,

                    line.points[3] - leftIndent,
                ],
                [
                    line.points[0] + apertureDepth + 280,
                    line.points[1] +
                        rightIndent +
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2,
                ],
                [
                    line.points[0] + apertureDepth + 150,
                    line.points[1] +
                        rightIndent +
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2 +
                        100,
                ],
                [
                    line.points[0] + apertureDepth + 150,
                    line.points[1] +
                        rightIndent +
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2 -
                        10,
                ],
                [apertureHeigthBottom, apertureHeigthTop],
            ]
        }
        return [
            [line.points[0], line.points[1] - rightIndent],
            [line.points[0] - apertureDepth, line.points[1] - rightIndent],
            [line.points[2] - apertureDepth, line.points[3] + leftIndent],
            [line.points[2], line.points[3] + leftIndent],
            [line.points[0] - apertureNicheDepth, line.points[1] - rightIndent],
            [line.points[2] - apertureNicheDepth, line.points[3] + leftIndent],
            [
                line.points[2] - apertureDepth - 280,
                line.points[3] +
                    leftIndent +
                    (Number(selectedWallLength) - rightIndent - leftIndent) / 2,
            ],
            [
                line.points[2] - apertureDepth - 400,
                line.points[3] +
                    leftIndent +
                    (Number(selectedWallLength) - rightIndent - leftIndent) /
                        2 +
                    100,
            ],
            [
                line.points[2] - apertureDepth - 400,
                line.points[3] +
                    leftIndent +
                    (Number(selectedWallLength) - rightIndent - leftIndent) /
                        2 -
                    10,
            ],
            [apertureHeigthBottom, apertureHeigthTop],
        ]
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        isApertureWindow
            ? dispatch({
                  type: 'addElements',
                  elements: [
                      {
                          id: uuid(),
                          objectType: 'wall',
                          isApertureWall: true,
                          points: [
                              getCurrentAperturePoints(selectedLine)[4][0],
                              getCurrentAperturePoints(selectedLine)[4][1],
                              getCurrentAperturePoints(selectedLine)[5][0],
                              getCurrentAperturePoints(selectedLine)[5][1],
                          ],
                      },
                      {
                          id: uuid(),
                          objectType: 'aperture',
                          points: getCurrentAperturePoints(selectedLine),
                      },
                  ],
              })
            : dispatch({
                  type: 'addElement',
                  element: {
                      id: uuid(),
                      objectType: 'apertureDoor',
                      points: getCurrentAperturePoints(selectedLine),
                  },
              })

        !isApertureWindow &&
            setStartPoint(getCurrentAperturePoints(selectedLine)[1])

        !isApertureWindow &&
            setWallDirection(getCurrentAperturePoints(selectedLine))
        isApertureWindow
            ? setCurrentTool(tools.move)
            : setCurrentTool(tools.wall)

        setSelected(undefined)
    }
    return (
        <>
            {selected && isApertureWindow && (
                <Layer>
                    <Aperture
                        isApertureWindow
                        isInProgres
                        element={{
                            points: getCurrentAperturePoints(selectedLine),
                        }}
                    />

                    <Wall
                        isInProgres
                        element={{
                            points: [
                                getCurrentAperturePoints(selectedLine)[4][0],
                                getCurrentAperturePoints(selectedLine)[4][1],
                                getCurrentAperturePoints(selectedLine)[5][0],
                                getCurrentAperturePoints(selectedLine)[5][1],
                            ],
                        }}
                    />
                </Layer>
            )}
            {selected && !isApertureWindow && (
                <Layer>
                    <Aperture
                        isInProgres
                        element={{
                            points: getCurrentAperturePoints(selectedLine),
                        }}
                    />
                </Layer>
            )}

            <Portal node={toolEditorContainerNode}>
                <ThemeProvider theme={light}>
                    {selected && (
                        <Wrapper>
                            <Title>
                                {isApertureWindow ? t('Window') : t('Door')}
                            </Title>
                            <ApertureEditorContainer onSubmit={handleSubmit}>
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
                                {isApertureWindow && (
                                    <InputWraper>
                                        <NumberInput
                                            placeholder={t('NicheDepth')}
                                            setInputValue={
                                                setApertureNicheDepth
                                            }
                                            max={apertureDepth}
                                            value={apertureNicheDepth}
                                            onChange={
                                                handleApertureNicheDepthChange
                                            }
                                        />
                                    </InputWraper>
                                )}

                                <InputWraper>
                                    <NumberInput
                                        placeholder={t('DepthApertupe')}
                                        setInputValue={setApertureDepth}
                                        value={apertureDepth}
                                        onChange={handleApertureDepthChange}
                                    />
                                </InputWraper>

                                <InputWraper>
                                    <NumberInput
                                        placeholder={t('HeigthBottom')}
                                        setInputValue={setApertureHeigthBottom}
                                        value={apertureHeigthBottom}
                                        onChange={
                                            handleApertureHeigthBottomChange
                                        }
                                    />
                                </InputWraper>

                                <InputWraper>
                                    <NumberInput
                                        placeholder={t('HeigthTop')}
                                        setInputValue={setApertureHeigthTop}
                                        value={apertureHeigthTop}
                                        onChange={handleApertureHeigthTopChange}
                                    />
                                </InputWraper>
                                {isApertureWindow && (
                                    <>
                                        <div />
                                        <div />
                                    </>
                                )}
                                <Line />
                                <InputSubmit type="submit">
                                    <EnterSvg />
                                </InputSubmit>
                            </ApertureEditorContainer>
                        </Wrapper>
                    )}
                </ThemeProvider>
            </Portal>
        </>
    )
}
