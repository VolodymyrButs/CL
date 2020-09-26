import React, { useState, useEffect } from 'react'
import { Layer } from 'react-konva'
import styled, { ThemeProvider } from 'styled-components'
import { useTranslation } from 'react-i18next'

import { Portal } from 'cad/Portal'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonGroup } from 'cad/Button'
import { BalconyDoor } from 'cad/ElementsType'
import { tools } from 'cad/Workplace'
import { v4 as uuid } from 'uuid'
import Left from 'assets/icons/iconsCad/arrow-alt-circle-left-solid.svg'
import Right from 'assets/icons/iconsCad/arrow-alt-circle-right-solid.svg'
import LeftBalcony from 'assets/icons/iconsCad/leftBalcony.svg'
import RightBalcony from 'assets/icons/iconsCad/rightBalcony.svg'
import CenterBalcony from 'assets/icons/iconsCad/balcony.svg'
import { accentDark } from 'cad/themes/accentDark'
import { light } from 'cad/themes/light'
import { getElements } from 'cad/storage/selectors'
import {
    getSelectedWallLength,
    calculateDefaultIndent,
} from 'cad/reusableFunctions'
import Door from 'assets/icons/iconsCad/door.svg'
import { NumberInput } from 'cad/NumberInput'
import { ApertureTypePoints, OptionalString, WallType } from 'cad/types'

const ApertureEditorContainer = styled.form`
    display: flex;
    justify-content: space-between;
    max-width: 1000px;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
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
        max-width: 100%;
        align-items: flex-end;
        justify-items: center;
    }
`
const LineEditorContainerAsk = styled.div`
    background-color: ${(props) => props.theme.bgColor};
    padding: 5px;
`
const StartText = styled.span`
    width: 200px;
    margin: 0 5px;
    font-size: 18px;
    text-align: center;
    align-self: center;
`
const InputWraper = styled.div`
    margin: 0 5px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`

const InputSubmit = styled(Button)`
    height: 100%;
    display: flex;
`
const Wrapper = styled.div`
    display: flex;
`
type Props = {
    toolEditorContainerNode: React.ReactNode
    setCurrentTool: (arg: string) => void
    selected: OptionalString
    setSelected: (arg: OptionalString) => void
    setStartPoint?: undefined | ((arg: [number, number]) => void)
    setWallDirection?:
        | undefined
        | ((currentAperturePoints: ApertureTypePoints) => void)
}
export const BalconyDoorTool = ({
    toolEditorContainerNode,
    selected,
    setCurrentTool,
    setSelected,
    setStartPoint = () => {},
    setWallDirection = () => {},
}: Props) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const stateElements = useSelector(getElements)
    const [inputWindowNumber, setInputWindowNumber] = useState(1)
    const [balconyType, setBalconyType] = useState('')

    const selectedLine: WallType = stateElements.find(
        (element: { id: string }) => element.id === selected
    )
    const selectedWallLength = selected
        ? getSelectedWallLength(selectedLine!)
        : 0
    const [leftIndent, setLeftIndent] = useState(0)
    const [rightIndent, setRightIndent] = useState(0)
    const [outsideWidth, setOutsideWidth] = useState(0)

    useEffect(() => {
        const defaultIndent = calculateDefaultIndent(
            selected,
            selectedLine,
            true
        )
        setLeftIndent(defaultIndent)
        setRightIndent(defaultIndent)
    }, [selected, selectedLine, selectedWallLength])
    useEffect(() => {
        setOutsideWidth(selectedWallLength - leftIndent - rightIndent)
    }, [leftIndent, rightIndent, selectedWallLength])

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
    const handleOutsideWidthChange = (event: { target: { value: string } }) => {
        if (
            Number(event.target.value) <=
            selectedWallLength - leftIndent - rightIndent
        )
            setOutsideWidth(Number(event.target.value))
    }
    const [apertureDepth, setApertureDepth] = useState(200)
    const handleApertureDepthChange = (event: {
        target: { value: string }
    }) => {
        setApertureDepth(Number(event.target.value))
    }

    const [doorWidth, setDoorWidth] = useState(600)
    const handleDoorWidthChange = (event: { target: { value: string } }) => {
        if (
            Number(selectedWallLength) - leftIndent - rightIndent >=
            Number(event.target.value)
        )
            setDoorWidth(Number(event.target.value))
    }

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

    const [apertureHeigthBottom, setApertureHeigthBottom] = useState(1000)
    const handleApertureHeigthBottomChange = (event: {
        target: { value: string }
    }) => {
        setApertureHeigthBottom(Number(event.target.value))
    }

    const [doorHeigthBottom, setDoorHeigthBottom] = useState(0)
    const handleDoorHeigthBottomChange = (event: {
        target: { value: string }
    }) => {
        setDoorHeigthBottom(Number(event.target.value))
    }

    const [outsideDepth, setOutsideDepth] = useState(200)
    const handleOutsideDepthChange = (event: { target: { value: string } }) => {
        setOutsideDepth(Number(event.target.value))
    }

    if (!stateElements.length) {
        return null
    }
    const outsideIndent =
        (Number(selectedWallLength) - leftIndent - rightIndent - outsideWidth) /
        2
    const getCurrentBalconyDoorPoints: (
        arg1: WallType,
        arg2: string
    ) => [number, number][] = (line, balconyT) => {
        if (balconyT === 'right') {
            if (
                line.points[0] !== line.points[2] &&
                line.points[0] < line.points[2]
            ) {
                return [
                    [line.points[0] + leftIndent, line.points[1]], // 0
                    [
                        line.points[0] + leftIndent,
                        line.points[1] - apertureDepth,
                    ], // 1
                    [
                        line.points[2] - rightIndent,
                        line.points[3] - apertureDepth,
                    ], // 2
                    [line.points[2] - rightIndent, line.points[3]], // 3
                    [
                        line.points[0] + leftIndent,
                        line.points[1] - apertureNicheDepth,
                    ], // 4
                    [
                        line.points[2] - rightIndent - doorWidth,
                        line.points[3] - apertureNicheDepth,
                    ], // 5
                    [
                        line.points[0] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            350,
                        line.points[1] - apertureDepth - 500,
                    ], // 6
                    [
                        line.points[0] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            160,
                        line.points[1] - apertureDepth - 120,
                    ], // 7
                    [
                        line.points[0] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            290,
                        line.points[1] - apertureDepth - 230,
                    ], // 8
                    [apertureHeigthBottom, apertureHeigthTop], // 9
                    [line.points[2] - rightIndent - doorWidth, line.points[3]], // 10
                    [
                        line.points[2] - rightIndent - doorWidth,
                        line.points[3] - apertureDepth,
                    ], // 11
                    [
                        line.points[0] + leftIndent + outsideIndent,
                        line.points[1] - apertureDepth,
                    ], // 12
                    [
                        line.points[2] - rightIndent - outsideIndent,
                        line.points[3] - apertureDepth,
                    ], // 13
                    [
                        line.points[0] + leftIndent + outsideIndent,
                        line.points[1] - apertureDepth - outsideDepth,
                    ], // 14
                    [
                        line.points[2] - rightIndent - outsideIndent,
                        line.points[3] - apertureDepth - outsideDepth,
                    ], // 15
                    [doorHeigthBottom, 0], // 16
                    [
                        line.points[0] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            260,
                        line.points[1] - apertureDepth - 340,
                    ], // 17
                ]
            }

            if (
                line.points[0] !== line.points[2] &&
                line.points[0] > line.points[2]
            ) {
                return [
                    [line.points[0] - leftIndent, line.points[1]], // 0
                    [
                        line.points[0] - leftIndent,
                        line.points[1] + apertureDepth,
                    ], // 1
                    [
                        line.points[2] + rightIndent,
                        line.points[3] + apertureDepth,
                    ], // 2
                    [line.points[2] + rightIndent, line.points[3]], // 3
                    [
                        line.points[0] - leftIndent,
                        line.points[1] + apertureNicheDepth,
                    ], // 4
                    [
                        line.points[2] + rightIndent + doorWidth,
                        line.points[3] + apertureNicheDepth,
                    ], // 5
                    [
                        line.points[0] -
                            leftIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            350,
                        line.points[1] + apertureDepth + 200,
                    ], // 6
                    [
                        line.points[0] -
                            leftIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            160,
                        line.points[1] + apertureDepth + 560,
                    ], // 7
                    [
                        line.points[0] -
                            leftIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            290,
                        line.points[1] + apertureDepth + 450,
                    ], // 8
                    [apertureHeigthBottom, apertureHeigthTop], // 9
                    [line.points[2] + rightIndent + doorWidth, line.points[3]], // 10
                    [
                        line.points[2] + rightIndent + doorWidth,
                        line.points[3] + apertureDepth,
                    ], // 11
                    [
                        line.points[0] - leftIndent - outsideIndent,
                        line.points[1] + apertureDepth,
                    ], // 12
                    [
                        line.points[2] + rightIndent + outsideIndent,
                        line.points[3] + apertureDepth,
                    ], // 13
                    [
                        line.points[0] - leftIndent - outsideIndent,
                        line.points[1] + apertureDepth + outsideDepth,
                    ], // 14
                    [
                        line.points[2] + rightIndent + outsideIndent,
                        line.points[3] + apertureDepth + outsideDepth,
                    ], // 15
                    [doorHeigthBottom, 0], // 16
                    [
                        line.points[0] -
                            leftIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            260,
                        line.points[1] + apertureDepth + 340,
                    ], // 17
                ]
            }

            if (
                line.points[0] === line.points[2] &&
                line.points[1] < line.points[3]
            ) {
                return [
                    [line.points[0], line.points[1] + leftIndent], // 0
                    [
                        line.points[0] + apertureDepth,
                        line.points[1] + leftIndent,
                    ], // 1
                    [
                        line.points[2] + apertureDepth,
                        line.points[3] - rightIndent,
                    ], // 2
                    [line.points[2], line.points[3] - rightIndent], // 3
                    [
                        line.points[0] + apertureNicheDepth,
                        line.points[1] + leftIndent,
                    ], // 4
                    [
                        line.points[2] + apertureNicheDepth,
                        line.points[3] - rightIndent - doorWidth,
                    ], // 5
                    [
                        line.points[0] + apertureDepth + 200,
                        line.points[1] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2,
                    ], // 6
                    [
                        line.points[0] + apertureDepth + 380,
                        line.points[1] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 +
                            380,
                    ], // 7
                    [
                        line.points[0] + apertureDepth + 250,
                        line.points[1] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 +
                            260,
                    ], // 8
                    [apertureHeigthBottom, apertureHeigthTop], // 9
                    [line.points[2], line.points[3] - rightIndent - doorWidth], // 10
                    [
                        line.points[2] + apertureDepth,
                        line.points[3] - rightIndent - doorWidth,
                    ], // 11
                    [
                        line.points[0] + apertureDepth,
                        line.points[1] + leftIndent + outsideIndent,
                    ], // 12
                    [
                        line.points[2] + apertureDepth,
                        line.points[3] - rightIndent - outsideIndent,
                    ], // 13
                    [
                        line.points[0] + apertureDepth + outsideDepth,
                        line.points[1] + leftIndent + outsideIndent,
                    ], // 14
                    [
                        line.points[2] + apertureDepth + outsideDepth,
                        line.points[3] - rightIndent - outsideIndent,
                    ], // 15
                    [doorHeigthBottom, 0], // 16
                    [
                        line.points[0] + apertureDepth + 270,
                        line.points[1] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 +
                            130,
                    ], // 17
                ]
            }
            return [
                [line.points[0], line.points[1] - leftIndent], // 0
                [line.points[0] - apertureDepth, line.points[1] - leftIndent], // 1
                [line.points[2] - apertureDepth, line.points[3] + rightIndent], // 2
                [line.points[2], line.points[3] + rightIndent], // 3
                [
                    line.points[0] - apertureNicheDepth,
                    line.points[1] - leftIndent,
                ], // 4
                [
                    line.points[2] - apertureNicheDepth,
                    line.points[3] + rightIndent + doorWidth,
                ], // 5
                [
                    line.points[0] - apertureDepth - 800,
                    line.points[1] -
                        leftIndent -
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2,
                ], // 6
                [
                    line.points[0] - apertureDepth - 590,
                    line.points[1] -
                        leftIndent -
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2 +
                        380,
                ], // 7
                [
                    line.points[0] - apertureDepth - 720,
                    line.points[1] -
                        leftIndent -
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2 +
                        260,
                ], // 8
                [apertureHeigthBottom, apertureHeigthTop], // 9
                [line.points[2], line.points[3] + rightIndent + doorWidth], // 10
                [
                    line.points[2] - apertureDepth,
                    line.points[3] + rightIndent + doorWidth,
                ], // 11
                [
                    line.points[0] - apertureDepth,
                    line.points[1] - leftIndent - outsideIndent,
                ], // 12
                [
                    line.points[2] - apertureDepth,
                    line.points[3] + rightIndent + outsideIndent,
                ], // 13
                [
                    line.points[0] - apertureDepth - outsideDepth,
                    line.points[1] - leftIndent - outsideIndent,
                ], // 14
                [
                    line.points[2] - apertureDepth - outsideDepth,
                    line.points[3] + rightIndent + outsideIndent,
                ], // 15
                [doorHeigthBottom, 0], // 16
                [
                    line.points[0] - apertureDepth - 700,
                    line.points[1] -
                        leftIndent -
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2 +
                        130,
                ], // 17
            ]
        }
        if (balconyT === 'left') {
            if (
                line.points[0] !== line.points[2] &&
                line.points[0] < line.points[2]
            ) {
                return [
                    [line.points[0] + leftIndent, line.points[1]], // 0
                    [
                        line.points[0] + leftIndent,
                        line.points[1] - apertureDepth,
                    ], // 1
                    [
                        line.points[2] - rightIndent,
                        line.points[3] - apertureDepth,
                    ], // 2
                    [line.points[2] - rightIndent, line.points[3]], // 3
                    [
                        line.points[2] - rightIndent,
                        line.points[1] - apertureNicheDepth,
                    ], // 4
                    [
                        line.points[0] + leftIndent + doorWidth,
                        line.points[3] - apertureNicheDepth,
                    ], // 5
                    [
                        line.points[0] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            350,
                        line.points[1] - apertureDepth - 500,
                    ], // 6
                    [
                        line.points[0] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            160,
                        line.points[1] - apertureDepth - 120,
                    ], // 7
                    [
                        line.points[0] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            290,
                        line.points[1] - apertureDepth - 230,
                    ], // 8
                    [apertureHeigthBottom, apertureHeigthTop], // 9
                    [line.points[0] + leftIndent + doorWidth, line.points[3]], // 10
                    [
                        line.points[0] + leftIndent + doorWidth,
                        line.points[3] - apertureDepth,
                    ], // 11
                    [
                        line.points[0] + leftIndent + outsideIndent,
                        line.points[1] - apertureDepth,
                    ], // 12
                    [
                        line.points[2] - rightIndent - outsideIndent,
                        line.points[3] - apertureDepth,
                    ], // 13
                    [
                        line.points[0] + leftIndent + outsideIndent,
                        line.points[1] - apertureDepth - outsideDepth,
                    ], // 14
                    [
                        line.points[2] - rightIndent - outsideIndent,
                        line.points[3] - apertureDepth - outsideDepth,
                    ], // 15
                    [doorHeigthBottom, 0], // 16
                    [
                        line.points[0] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            260,
                        line.points[1] - apertureDepth - 340,
                    ], // 17
                ]
            }

            if (
                line.points[0] !== line.points[2] &&
                line.points[0] > line.points[2]
            ) {
                return [
                    [line.points[0] - leftIndent, line.points[1]], // 0
                    [
                        line.points[0] - leftIndent,
                        line.points[1] + apertureDepth,
                    ], // 1
                    [
                        line.points[2] + rightIndent,
                        line.points[3] + apertureDepth,
                    ], // 2
                    [line.points[2] + rightIndent, line.points[3]], // 3
                    [
                        line.points[2] + rightIndent,
                        line.points[1] + apertureNicheDepth,
                    ], // 4
                    [
                        line.points[0] - leftIndent - doorWidth,
                        line.points[3] + apertureNicheDepth,
                    ], // 5
                    [
                        line.points[0] -
                            leftIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            350,
                        line.points[1] + apertureDepth + 190,
                    ], // 6
                    [
                        line.points[0] -
                            leftIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            160,
                        line.points[1] + apertureDepth + 580,
                    ], // 7
                    [
                        line.points[0] -
                            leftIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            290,
                        line.points[1] + apertureDepth + 470,
                    ], // 8
                    [apertureHeigthBottom, apertureHeigthTop], // 9
                    [line.points[0] - leftIndent - doorWidth, line.points[3]], // 10
                    [
                        line.points[0] - leftIndent - doorWidth,
                        line.points[3] + apertureDepth,
                    ], // 11
                    [
                        line.points[0] - leftIndent - outsideIndent,
                        line.points[1] + apertureDepth,
                    ], // 12
                    [
                        line.points[2] + rightIndent + outsideIndent,
                        line.points[3] + apertureDepth,
                    ], // 13
                    [
                        line.points[0] - leftIndent - outsideIndent,
                        line.points[1] + apertureDepth + outsideDepth,
                    ], // 14
                    [
                        line.points[2] + rightIndent + outsideIndent,
                        line.points[3] + apertureDepth + outsideDepth,
                    ], // 15
                    [doorHeigthBottom, 0], // 16
                    [
                        line.points[0] -
                            leftIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            260,
                        line.points[1] + apertureDepth + 370,
                    ], // 17
                ]
            }

            if (
                line.points[0] === line.points[2] &&
                line.points[1] < line.points[3]
            ) {
                return [
                    [line.points[0], line.points[1] + leftIndent], // 0
                    [
                        line.points[0] + apertureDepth,
                        line.points[1] + leftIndent,
                    ], // 1
                    [
                        line.points[2] + apertureDepth,
                        line.points[3] - rightIndent,
                    ], // 2
                    [line.points[2], line.points[3] - rightIndent], // 3
                    [
                        line.points[0] + apertureNicheDepth,
                        line.points[3] - rightIndent,
                    ], // 4
                    [
                        line.points[2] + apertureNicheDepth,
                        line.points[1] + leftIndent + doorWidth,
                    ], // 5
                    [
                        line.points[0] + apertureDepth + 200,
                        line.points[1] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2,
                    ], // 6
                    [
                        line.points[0] + apertureDepth + 380,
                        line.points[1] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 +
                            380,
                    ], // 7
                    [
                        line.points[0] + apertureDepth + 250,
                        line.points[1] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 +
                            260,
                    ], // 8
                    [apertureHeigthBottom, apertureHeigthTop], // 9
                    [line.points[2], line.points[1] + leftIndent + doorWidth], // 10
                    [
                        line.points[2] + apertureDepth,
                        line.points[1] + leftIndent + doorWidth,
                    ], // 11
                    [
                        line.points[0] + apertureDepth,
                        line.points[1] + leftIndent + outsideIndent,
                    ], // 12
                    [
                        line.points[2] + apertureDepth,
                        line.points[3] - rightIndent - outsideIndent,
                    ], // 13
                    [
                        line.points[0] + apertureDepth + outsideDepth,
                        line.points[1] + leftIndent + outsideIndent,
                    ], // 14
                    [
                        line.points[2] + apertureDepth + outsideDepth,
                        line.points[3] - rightIndent - outsideIndent,
                    ], // 15
                    [doorHeigthBottom, 0], // 16
                    [
                        line.points[0] + apertureDepth + 270,
                        line.points[1] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 +
                            130,
                    ], // 17
                ]
            }
            return [
                [line.points[0], line.points[1] - leftIndent], // 0
                [line.points[0] - apertureDepth, line.points[1] - leftIndent], // 1
                [line.points[2] - apertureDepth, line.points[3] + rightIndent], // 2
                [line.points[2], line.points[3] + rightIndent], // 3
                [
                    line.points[0] - apertureNicheDepth,
                    line.points[3] + rightIndent,
                ], // 4
                [
                    line.points[2] - apertureNicheDepth,
                    line.points[1] - leftIndent - doorWidth,
                ], // 5
                [
                    line.points[0] - apertureDepth - 900,
                    line.points[1] -
                        leftIndent -
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2,
                ], // 6
                [
                    line.points[0] - apertureDepth - 720,
                    line.points[1] -
                        leftIndent -
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2 +
                        380,
                ], // 7
                [
                    line.points[0] + apertureDepth - 1250,
                    line.points[1] -
                        leftIndent -
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2 +
                        260,
                ], // 8
                [apertureHeigthBottom, apertureHeigthTop], // 9
                [line.points[2], line.points[1] - leftIndent - doorWidth], // 10
                [
                    line.points[2] - apertureDepth,
                    line.points[1] - leftIndent - doorWidth,
                ], // 11
                [
                    line.points[0] - apertureDepth,
                    line.points[1] - leftIndent - outsideIndent,
                ], // 12
                [
                    line.points[2] - apertureDepth,
                    line.points[3] + rightIndent + outsideIndent,
                ], // 13
                [
                    line.points[0] - apertureDepth - outsideDepth,
                    line.points[1] - leftIndent - outsideIndent,
                ], // 14
                [
                    line.points[2] - apertureDepth - outsideDepth,
                    line.points[3] + rightIndent + outsideIndent,
                ], // 15
                [doorHeigthBottom, 0], // 16
                [
                    line.points[0] - apertureDepth - 820,
                    line.points[1] -
                        leftIndent -
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2 +
                        150,
                ], // 17
            ]
        }
        if (balconyT === 'center') {
            if (
                line.points[0] !== line.points[2] &&
                line.points[0] < line.points[2]
            ) {
                return [
                    [line.points[0] + leftIndent, line.points[1]], // 0
                    [
                        line.points[0] + leftIndent,
                        line.points[1] - apertureDepth,
                    ], // 1
                    [
                        line.points[2] - rightIndent,
                        line.points[3] - apertureDepth,
                    ], // 2
                    [line.points[2] - rightIndent, line.points[3]], // 3
                    [
                        line.points[0] + leftIndent,
                        line.points[3] - apertureNicheDepth,
                    ], // 4
                    [
                        line.points[0] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                        line.points[3] - apertureNicheDepth,
                    ], // 5
                    [
                        line.points[0] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            350,
                        line.points[1] - apertureDepth - 500,
                    ], // 6
                    [
                        line.points[0] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            160,
                        line.points[1] - apertureDepth - 120,
                    ], // 7
                    [
                        line.points[0] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            290,
                        line.points[1] - apertureDepth - 230,
                    ], // 8
                    [apertureHeigthBottom, apertureHeigthTop], // 9
                    [
                        line.points[0] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                        line.points[3],
                    ], // 10
                    [
                        line.points[0] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                        line.points[3] - apertureDepth,
                    ], // 11
                    [
                        line.points[0] + leftIndent + outsideIndent,
                        line.points[1] - apertureDepth,
                    ], // 12
                    [
                        line.points[2] - rightIndent - outsideIndent,
                        line.points[3] - apertureDepth,
                    ], // 13
                    [
                        line.points[0] + leftIndent + outsideIndent,
                        line.points[1] - apertureDepth - outsideDepth,
                    ], // 14
                    [
                        line.points[2] - rightIndent - outsideIndent,
                        line.points[3] - apertureDepth - outsideDepth,
                    ], // 15
                    [doorHeigthBottom, 0], // 16
                    [
                        line.points[0] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            260,
                        line.points[1] - apertureDepth - 340,
                    ], // 17
                    [
                        line.points[2] -
                            rightIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                        line.points[3] - apertureDepth,
                    ], // 18
                    [
                        line.points[2] -
                            rightIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                        line.points[3],
                    ], // 19
                    [
                        line.points[2] - rightIndent,
                        line.points[3] - apertureNicheDepth,
                    ], // 20
                    [
                        line.points[2] -
                            rightIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                        line.points[3] - apertureNicheDepth,
                    ], // 21
                ]
            }

            if (
                line.points[0] !== line.points[2] &&
                line.points[0] > line.points[2]
            ) {
                return [
                    [line.points[0] - leftIndent, line.points[1]], // 0
                    [
                        line.points[0] - leftIndent,
                        line.points[1] + apertureDepth,
                    ], // 1
                    [
                        line.points[2] + rightIndent,
                        line.points[3] + apertureDepth,
                    ], // 2
                    [line.points[2] + rightIndent, line.points[3]], // 3
                    [
                        line.points[0] - leftIndent,
                        line.points[3] + apertureNicheDepth,
                    ], // 4
                    [
                        line.points[0] -
                            leftIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                        line.points[3] + apertureNicheDepth,
                    ], // 5
                    [
                        line.points[0] -
                            leftIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            350,
                        line.points[1] + apertureDepth + 200,
                    ], // 6
                    [
                        line.points[0] -
                            leftIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            160,
                        line.points[1] + apertureDepth + 570,
                    ], // 7
                    [
                        line.points[0] -
                            leftIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            290,
                        line.points[1] + apertureDepth + 460,
                    ], // 8
                    [apertureHeigthBottom, apertureHeigthTop], // 9
                    [
                        line.points[0] -
                            leftIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                        line.points[3],
                    ], // 10
                    [
                        line.points[0] -
                            leftIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                        line.points[3] + apertureDepth,
                    ], // 11
                    [
                        line.points[0] - leftIndent - outsideIndent,
                        line.points[1] + apertureDepth,
                    ], // 12
                    [
                        line.points[2] + rightIndent + outsideIndent,
                        line.points[3] + apertureDepth,
                    ], // 13
                    [
                        line.points[0] - leftIndent - outsideIndent,
                        line.points[1] + apertureDepth + outsideDepth,
                    ], // 14
                    [
                        line.points[2] + rightIndent + outsideIndent,
                        line.points[3] + apertureDepth + outsideDepth,
                    ], // 15
                    [doorHeigthBottom, 0], // 16
                    [
                        line.points[0] -
                            leftIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 -
                            260,
                        line.points[1] + apertureDepth + 340,
                    ], // 17
                    [
                        line.points[2] +
                            rightIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                        line.points[3] + apertureDepth,
                    ], // 18
                    [
                        line.points[2] +
                            rightIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                        line.points[3],
                    ], // 19
                    [
                        line.points[2] + rightIndent,
                        line.points[3] + apertureNicheDepth,
                    ], // 20
                    [
                        line.points[2] +
                            rightIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                        line.points[3] + apertureNicheDepth,
                    ], // 21
                ]
            }

            if (
                line.points[0] === line.points[2] &&
                line.points[1] < line.points[3]
            ) {
                return [
                    [line.points[0], line.points[1] + leftIndent], // 0
                    [
                        line.points[0] + apertureDepth,
                        line.points[1] + leftIndent,
                    ], // 1
                    [
                        line.points[2] + apertureDepth,
                        line.points[3] - rightIndent,
                    ], // 2
                    [line.points[2], line.points[3] - rightIndent], // 3
                    [
                        line.points[0] + apertureNicheDepth,
                        line.points[3] - rightIndent,
                    ], // 4
                    [
                        line.points[0] + apertureNicheDepth,
                        line.points[3] -
                            rightIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                    ], // 5
                    [
                        line.points[0] + apertureDepth + 200,
                        line.points[1] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2,
                    ], // 6
                    [
                        line.points[0] + apertureDepth + 380,
                        line.points[1] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 +
                            380,
                    ], // 7
                    [
                        line.points[0] + apertureDepth + 250,
                        line.points[1] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 +
                            260,
                    ], // 8
                    [apertureHeigthBottom, apertureHeigthTop], // 9
                    [
                        line.points[2],
                        line.points[1] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                    ], // 10
                    [
                        line.points[2] + apertureDepth,
                        line.points[1] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                    ], // 11
                    [
                        line.points[0] + apertureDepth,
                        line.points[1] + leftIndent + outsideIndent,
                    ], // 12
                    [
                        line.points[2] + apertureDepth,
                        line.points[3] - rightIndent - outsideIndent,
                    ], // 13
                    [
                        line.points[0] + apertureDepth + outsideDepth,
                        line.points[1] + leftIndent + outsideIndent,
                    ], // 14
                    [
                        line.points[2] + apertureDepth + outsideDepth,
                        line.points[3] - rightIndent - outsideIndent,
                    ], // 15
                    [doorHeigthBottom, 0], // 16
                    [
                        line.points[0] + apertureDepth + 270,
                        line.points[1] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent) /
                                2 +
                            130,
                    ], // 17
                    [
                        line.points[2] + apertureDepth,
                        line.points[3] -
                            rightIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                    ], // 18
                    [
                        line.points[2],
                        line.points[3] -
                            rightIndent -
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                    ], // 19
                    [
                        line.points[0] + apertureNicheDepth,
                        line.points[1] + leftIndent,
                    ], // 20
                    [
                        line.points[0] + apertureNicheDepth,
                        line.points[1] +
                            leftIndent +
                            (Number(selectedWallLength) -
                                rightIndent -
                                leftIndent -
                                doorWidth) /
                                2,
                    ], // 21
                ]
            }
            return [
                [line.points[0], line.points[1] - leftIndent], // 0
                [line.points[0] - apertureDepth, line.points[1] - leftIndent], // 1
                [line.points[2] - apertureDepth, line.points[3] + rightIndent], // 2
                [line.points[2], line.points[3] + rightIndent], // 3
                [
                    line.points[0] - apertureNicheDepth,
                    line.points[3] + rightIndent,
                ], // 4
                [
                    line.points[0] - apertureNicheDepth,
                    line.points[3] +
                        rightIndent +
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent -
                            doorWidth) /
                            2,
                ], // 5
                [
                    line.points[0] - apertureDepth - 1000,
                    line.points[1] -
                        leftIndent -
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2,
                ], // 6
                [
                    line.points[0] - apertureDepth - 790,
                    line.points[1] -
                        leftIndent -
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2 +
                        370,
                ], // 7
                [
                    line.points[0] - apertureDepth - 925,
                    line.points[1] -
                        leftIndent -
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2 +
                        250,
                ], // 8
                [apertureHeigthBottom, apertureHeigthTop], // 9
                [
                    line.points[2],
                    line.points[1] -
                        leftIndent -
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent -
                            doorWidth) /
                            2,
                ], // 10
                [
                    line.points[2] - apertureDepth,
                    line.points[1] -
                        leftIndent -
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent -
                            doorWidth) /
                            2,
                ], // 11
                [
                    line.points[0] - apertureDepth,
                    line.points[1] - leftIndent - outsideIndent,
                ], // 12
                [
                    line.points[2] - apertureDepth,
                    line.points[3] + rightIndent + outsideIndent,
                ], // 13
                [
                    line.points[0] - apertureDepth - outsideDepth,
                    line.points[1] - leftIndent - outsideIndent,
                ], // 14
                [
                    line.points[2] - apertureDepth - outsideDepth,
                    line.points[3] + rightIndent + outsideIndent,
                ], // 15
                [doorHeigthBottom, 0], // 16
                [
                    line.points[0] - apertureDepth - 900,
                    line.points[1] -
                        leftIndent -
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent) /
                            2 +
                        150,
                ], // 17
                [
                    line.points[2] - apertureDepth,
                    line.points[3] +
                        rightIndent +
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent -
                            doorWidth) /
                            2,
                ], // 18
                [
                    line.points[2],
                    line.points[3] +
                        rightIndent +
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent -
                            doorWidth) /
                            2,
                ], // 19
                [
                    line.points[0] - apertureNicheDepth,
                    line.points[1] - leftIndent,
                ], // 20
                [
                    line.points[0] - apertureNicheDepth,
                    line.points[1] -
                        leftIndent -
                        (Number(selectedWallLength) -
                            rightIndent -
                            leftIndent -
                            doorWidth) /
                            2,
                ], // 21
            ]
        }
        return [[0, 0]]
    }
    const currentBalconyDoorPoints: [
        number,
        number
    ][] = getCurrentBalconyDoorPoints(selectedLine, balconyType)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        {
            balconyType === 'center'
                ? dispatch({
                      type: 'addElements',
                      elements: [
                          {
                              id: uuid(),
                              objectType: 'wall',
                              isApertureWall: true,
                              points: [
                                  currentBalconyDoorPoints[4][0],
                                  currentBalconyDoorPoints[4][1],
                                  currentBalconyDoorPoints[5][0],
                                  currentBalconyDoorPoints[5][1],
                              ],
                          },
                          {
                              id: uuid(),
                              objectType: 'wall',
                              isApertureWall: true,
                              points: [
                                  currentBalconyDoorPoints[20][0],
                                  currentBalconyDoorPoints[20][1],
                                  currentBalconyDoorPoints[21][0],
                                  currentBalconyDoorPoints[21][1],
                              ],
                          },
                          {
                              id: uuid(),
                              objectType: 'balconyDoor',
                              balconyType,
                              points: currentBalconyDoorPoints,
                          },
                      ],
                  })
                : dispatch({
                      type: 'addElements',
                      elements: [
                          {
                              id: uuid(),
                              objectType: 'wall',
                              isApertureWall: true,
                              points: [
                                  currentBalconyDoorPoints[4][0],
                                  currentBalconyDoorPoints[4][1],
                                  currentBalconyDoorPoints[5][0],
                                  currentBalconyDoorPoints[5][1],
                              ],
                          },
                          {
                              id: uuid(),
                              objectType: 'balconyDoor',
                              balconyType,
                              points: currentBalconyDoorPoints,
                          },
                      ],
                  })
        }

        setStartPoint([
            currentBalconyDoorPoints[14][0],
            currentBalconyDoorPoints[14][1],
        ])

        setWallDirection([
            [0, 0],
            [currentBalconyDoorPoints[1][0], currentBalconyDoorPoints[1][1]],
            [currentBalconyDoorPoints[2][0], currentBalconyDoorPoints[2][1]],
        ])
        setCurrentTool(tools.wall)

        setSelected(undefined)
    }
    return (
        <>
            {selected && balconyType !== '' && (
                <Layer>
                    <BalconyDoor
                        isInProgres
                        element={{
                            balconyType,
                            points: currentBalconyDoorPoints,
                        }}
                    />
                </Layer>
            )}

            <Portal node={toolEditorContainerNode}>
                <ThemeProvider theme={light}>
                    {!selected && (
                        <LineEditorContainerAsk>
                            <StartText>{t('SelectWallToContinue')}</StartText>
                        </LineEditorContainerAsk>
                    )}
                    {selected && (
                        <ApertureEditorContainer onSubmit={handleSubmit}>
                            {inputWindowNumber === 1 && (
                                <InputWraper>
                                    <p>{t('SelectBalconyType')}</p>
                                    <ButtonGroup>
                                        <Button
                                            disabled={selected === undefined}
                                            $buttonForm="square"
                                            theme={
                                                balconyType === 'left'
                                                    ? accentDark
                                                    : light
                                            }
                                            $size="big"
                                            onClick={() => {
                                                setBalconyType('left')
                                            }}
                                        >
                                            <LeftBalcony />
                                        </Button>
                                        <Button
                                            disabled={selected === undefined}
                                            style={{
                                                padding: '9px',
                                            }}
                                            theme={
                                                balconyType === 'center'
                                                    ? accentDark
                                                    : light
                                            }
                                            $size="big"
                                            onClick={() => {
                                                setBalconyType('center')
                                            }}
                                        >
                                            <CenterBalcony
                                                style={{
                                                    margin: '0',
                                                    width: '40px',
                                                }}
                                            />
                                        </Button>
                                        <Button
                                            disabled={selected === undefined}
                                            $buttonForm="square"
                                            theme={
                                                balconyType === 'right'
                                                    ? accentDark
                                                    : light
                                            }
                                            $size="big"
                                            onClick={() => {
                                                setBalconyType('right')
                                            }}
                                        >
                                            <RightBalcony />
                                        </Button>
                                    </ButtonGroup>
                                </InputWraper>
                            )}
                            {inputWindowNumber === 1 && <div />}
                            {inputWindowNumber === 2 && (
                                <>
                                    <InputWraper>
                                        <p>{t('RightIndent')}</p>
                                        <NumberInput
                                            max={
                                                Number(selectedWallLength) -
                                                leftIndent
                                            }
                                            value={rightIndent}
                                            onChange={handleRightIndentChange}
                                        />
                                    </InputWraper>
                                    <InputWraper>
                                        <p>{t('DoorWidth')}</p>
                                        <NumberInput
                                            max={
                                                Number(selectedWallLength) -
                                                (leftIndent + rightIndent)
                                            }
                                            value={doorWidth}
                                            onChange={handleDoorWidthChange}
                                        />
                                    </InputWraper>
                                    <InputWraper>
                                        <p>{t('LeftIndent')}</p>
                                        <NumberInput
                                            max={
                                                Number(selectedWallLength) -
                                                rightIndent
                                            }
                                            value={leftIndent}
                                            onChange={handleLeftIndentChange}
                                        />
                                    </InputWraper>
                                    <InputWraper>
                                        <p>{t('NicheDepth')}</p>
                                        <NumberInput
                                            max={apertureDepth}
                                            value={apertureNicheDepth}
                                            onChange={
                                                handleApertureNicheDepthChange
                                            }
                                        />
                                    </InputWraper>
                                    <InputWraper>
                                        <p>{t('Depth')}</p>
                                        <NumberInput
                                            value={apertureDepth}
                                            onChange={handleApertureDepthChange}
                                        />
                                    </InputWraper>
                                </>
                            )}
                            {inputWindowNumber === 3 && (
                                <>
                                    <InputWraper>
                                        <p>{t('HeigthBottomDoor')}</p>
                                        <NumberInput
                                            value={doorHeigthBottom}
                                            onChange={
                                                handleDoorHeigthBottomChange
                                            }
                                        />
                                    </InputWraper>
                                    <InputWraper>
                                        <p>{t('HeigthBottomWindow')}</p>
                                        <NumberInput
                                            value={apertureHeigthBottom}
                                            onChange={
                                                handleApertureHeigthBottomChange
                                            }
                                        />
                                    </InputWraper>
                                    <InputWraper>
                                        <p>{t('HeigthTop')}</p>
                                        <NumberInput
                                            value={apertureHeigthTop}
                                            onChange={
                                                handleApertureHeigthTopChange
                                            }
                                        />
                                    </InputWraper>
                                </>
                            )}
                            {inputWindowNumber === 3 && (
                                <>
                                    <div /> <div />
                                </>
                            )}
                            {inputWindowNumber === 4 && (
                                <>
                                    <InputWraper>
                                        <p>{t('OutsideWidth')}</p>

                                        <NumberInput
                                            value={outsideWidth}
                                            onChange={handleOutsideWidthChange}
                                        />
                                    </InputWraper>
                                    <InputWraper>
                                        <p>{t('OutsideDepth')}</p>

                                        <NumberInput
                                            value={outsideDepth}
                                            onChange={handleOutsideDepthChange}
                                        />
                                    </InputWraper>
                                </>
                            )}
                            <Wrapper>
                                {inputWindowNumber > 1 && (
                                    <Button
                                        $buttonForm="square"
                                        $size="big"
                                        theme={accentDark}
                                        onClick={() => {
                                            setInputWindowNumber(
                                                inputWindowNumber - 1
                                            )
                                        }}
                                    >
                                        <Left />
                                    </Button>
                                )}
                                {inputWindowNumber < 4 && (
                                    <Button
                                        $buttonForm="square"
                                        $size="big"
                                        theme={accentDark}
                                        disabled={balconyType === ''}
                                        onClick={() => {
                                            setInputWindowNumber(
                                                inputWindowNumber + 1
                                            )
                                        }}
                                    >
                                        <Right />
                                    </Button>
                                )}
                                {inputWindowNumber === 4 && (
                                    <InputWraper>
                                        <InputSubmit
                                            theme={accentDark}
                                            $size="svgMobile"
                                            type="submit"
                                        >
                                            {t('Add')}
                                            <Door />
                                        </InputSubmit>
                                    </InputWraper>
                                )}
                            </Wrapper>
                        </ApertureEditorContainer>
                    )}
                </ThemeProvider>
            </Portal>
        </>
    )
}
