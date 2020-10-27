import React, { useState, useEffect } from 'react'
import { Layer } from 'react-konva'
import styled, { ThemeProvider } from 'styled-components'
import { useTranslation } from 'react-i18next'

import { Portal } from 'cad/Portal'
import { useDispatch, useSelector } from 'react-redux'
import { BalconyDoor, Wall } from 'cad/ElementsType'
import { tools } from 'cad/Workplace'
import { v4 as uuid } from 'uuid'
import Left from 'assets/icons/iconsCad/left.svg'
import Right from 'assets/icons/iconsCad/right.svg'
import LeftBalcony from 'assets/icons/iconsCad/leftBalcony.svg'
import RightBalcony from 'assets/icons/iconsCad/rightBalcony.svg'
import CenterBalcony from 'assets/icons/iconsCad/balcony.svg'
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
        box-sizing: border-box;
        align-items: flex-end;
        justify-items: center;
    }
`
const InputWraper = styled.div`
    margin: 0 5px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    div {
        display: flex;
    }
`

const Line = styled.div`
    height: 120%;
    width: 1px;
    border-left: solid 1px ${light.bgColor};
`
const WrapperBlock = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`
const ButtonDirection = styled.div<{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
        width: 34px;
        height: 34px;
        margin: 0 15px;
        z-index: 2;
        color: ${(props) => (props.disabled ? 'white' : '#000000a9')};
        fill: ${(props) => (props.disabled ? '#000000a9' : 'white')};
    }
    :hover {
        svg {
            color: white;
            fill: #000000a9;
        }
    }
`
const Button = styled.button<{ active: boolean }>`
    cursor: pointer;
    background-color: ${(props) => (props.active ? light.bgColor : '#fff')};
    border: none;
    margin: 3px 10px;
    svg {
        width: 34px;
        height: 34px;
        margin: 5px;
        z-index: 2;
    }
    :hover {
        svg {
            color: white;
            fill: #000000a9;
        }
    }
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
            balconyType === 'center' &&
                dispatch({
                    type: 'addElements',
                    elements: [
                        {
                            id: uuid(),
                            objectType: tools.wall,
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
                            objectType: tools.wall,
                            isApertureWall: true,
                            points: [
                                currentBalconyDoorPoints[21][0],
                                currentBalconyDoorPoints[21][1],
                                currentBalconyDoorPoints[20][0],
                                currentBalconyDoorPoints[20][1],
                            ],
                        },
                        {
                            id: uuid(),
                            objectType: tools.balconyDoor,
                            balconyType,
                            points: currentBalconyDoorPoints,
                        },
                    ],
                })
            balconyType === 'right' &&
                dispatch({
                    type: 'addElements',
                    elements: [
                        {
                            id: uuid(),
                            objectType: tools.wall,
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
                            objectType: tools.balconyDoor,
                            balconyType,
                            points: currentBalconyDoorPoints,
                        },
                    ],
                })
            balconyType === 'left' &&
                dispatch({
                    type: 'addElements',
                    elements: [
                        {
                            id: uuid(),
                            objectType: tools.wall,
                            isApertureWall: true,
                            points: [
                                currentBalconyDoorPoints[5][0],
                                currentBalconyDoorPoints[5][1],
                                currentBalconyDoorPoints[4][0],
                                currentBalconyDoorPoints[4][1],
                            ],
                        },
                        {
                            id: uuid(),
                            objectType: tools.balconyDoor,
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
            {selected && (balconyType === 'left' || balconyType === 'right') && (
                <Layer>
                    <BalconyDoor
                        isInProgres
                        element={{
                            balconyType,
                            points: currentBalconyDoorPoints,
                        }}
                    />

                    <Wall
                        isInProgres
                        element={{
                            points: [
                                currentBalconyDoorPoints[4][0],
                                currentBalconyDoorPoints[4][1],
                                currentBalconyDoorPoints[5][0],
                                currentBalconyDoorPoints[5][1],
                            ],
                        }}
                    />
                </Layer>
            )}
            {selected && balconyType === 'center' && (
                <Layer>
                    <BalconyDoor
                        isInProgres
                        element={{
                            balconyType,
                            points: currentBalconyDoorPoints,
                        }}
                    />

                    <Wall
                        isInProgres
                        element={{
                            points: [
                                currentBalconyDoorPoints[4][0],
                                currentBalconyDoorPoints[4][1],
                                currentBalconyDoorPoints[5][0],
                                currentBalconyDoorPoints[5][1],
                            ],
                        }}
                    />
                    <Wall
                        isInProgres
                        element={{
                            points: [
                                currentBalconyDoorPoints[21][0],
                                currentBalconyDoorPoints[21][1],
                                currentBalconyDoorPoints[20][0],
                                currentBalconyDoorPoints[20][1],
                            ],
                        }}
                    />
                </Layer>
            )}
            <Portal node={toolEditorContainerNode}>
                <ThemeProvider theme={light}>
                    {selected && (
                        <Wrapper>
                            <Title>{t('Balcony')}</Title>
                            <ApertureEditorContainer onSubmit={handleSubmit}>
                                {inputWindowNumber === 1 && (
                                    <InputWraper>
                                        <p>{t('SelectBalconyType')}</p>
                                        <div>
                                            <Button
                                                active={balconyType === 'left'}
                                                type="button"
                                                disabled={
                                                    selected === undefined
                                                }
                                                onClick={() => {
                                                    setBalconyType('left')
                                                }}
                                            >
                                                <LeftBalcony />
                                            </Button>
                                            <Button
                                                type="button"
                                                active={
                                                    balconyType === 'center'
                                                }
                                                disabled={
                                                    selected === undefined
                                                }
                                                onClick={() => {
                                                    setBalconyType('center')
                                                }}
                                            >
                                                <CenterBalcony
                                                    style={{
                                                        margin: '0',
                                                        width: '40px',
                                                        height: '44px',
                                                    }}
                                                />
                                            </Button>
                                            <Button
                                                type="button"
                                                active={balconyType === 'right'}
                                                disabled={
                                                    selected === undefined
                                                }
                                                onClick={() => {
                                                    setBalconyType('right')
                                                }}
                                            >
                                                <RightBalcony />
                                            </Button>
                                        </div>
                                    </InputWraper>
                                )}
                                {inputWindowNumber === 1 && <div />}
                                {inputWindowNumber === 2 && (
                                    <>
                                        <InputWraper>
                                            <NumberInput
                                                placeholder={t('RightIndent')}
                                                setInputValue={setRightIndent}
                                                max={
                                                    Number(selectedWallLength) -
                                                    leftIndent
                                                }
                                                value={rightIndent}
                                                onChange={
                                                    handleRightIndentChange
                                                }
                                            />
                                        </InputWraper>
                                        <InputWraper>
                                            <NumberInput
                                                placeholder={t('DoorWidth')}
                                                setInputValue={setDoorWidth}
                                                max={
                                                    Number(selectedWallLength) -
                                                    (leftIndent + rightIndent)
                                                }
                                                value={doorWidth}
                                                onChange={handleDoorWidthChange}
                                            />
                                        </InputWraper>
                                        <InputWraper>
                                            <NumberInput
                                                placeholder={t('LeftIndent')}
                                                setInputValue={setLeftIndent}
                                                max={
                                                    Number(selectedWallLength) -
                                                    rightIndent
                                                }
                                                value={leftIndent}
                                                onChange={
                                                    handleLeftIndentChange
                                                }
                                            />
                                        </InputWraper>
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
                                        <InputWraper>
                                            <NumberInput
                                                placeholder={t('Depth')}
                                                setInputValue={setApertureDepth}
                                                value={apertureDepth}
                                                onChange={
                                                    handleApertureDepthChange
                                                }
                                            />
                                        </InputWraper>
                                    </>
                                )}
                                {inputWindowNumber === 3 && (
                                    <>
                                        <InputWraper>
                                            <NumberInput
                                                placeholder={t(
                                                    'HeigthBottomDoor'
                                                )}
                                                setInputValue={
                                                    setDoorHeigthBottom
                                                }
                                                value={doorHeigthBottom}
                                                onChange={
                                                    handleDoorHeigthBottomChange
                                                }
                                            />
                                        </InputWraper>
                                        <InputWraper>
                                            <NumberInput
                                                placeholder={t(
                                                    'HeigthBottomWindow'
                                                )}
                                                setInputValue={
                                                    setApertureHeigthBottom
                                                }
                                                value={apertureHeigthBottom}
                                                onChange={
                                                    handleApertureHeigthBottomChange
                                                }
                                            />
                                        </InputWraper>
                                        <InputWraper>
                                            <NumberInput
                                                placeholder={t('HeigthTop')}
                                                setInputValue={
                                                    setApertureHeigthTop
                                                }
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
                                            <NumberInput
                                                placeholder={t('OutsideWidth')}
                                                setInputValue={setOutsideWidth}
                                                value={outsideWidth}
                                                onChange={
                                                    handleOutsideWidthChange
                                                }
                                            />
                                        </InputWraper>
                                        <InputWraper>
                                            <NumberInput
                                                placeholder={t('OutsideDepth')}
                                                setInputValue={setOutsideDepth}
                                                value={outsideDepth}
                                                onChange={
                                                    handleOutsideDepthChange
                                                }
                                            />
                                        </InputWraper>
                                    </>
                                )}
                                <WrapperBlock>
                                    {inputWindowNumber > 1 && (
                                        <ButtonDirection
                                            onClick={() => {
                                                setInputWindowNumber(
                                                    inputWindowNumber - 1
                                                )
                                            }}
                                        >
                                            <Left />
                                        </ButtonDirection>
                                    )}
                                    {inputWindowNumber < 4 && (
                                        <ButtonDirection
                                            disabled={balconyType === ''}
                                            onClick={() => {
                                                balconyType !== '' &&
                                                    setInputWindowNumber(
                                                        inputWindowNumber + 1
                                                    )
                                            }}
                                        >
                                            <Right />
                                        </ButtonDirection>
                                    )}

                                    {inputWindowNumber === 4 && (
                                        <>
                                            <Line />

                                            <InputSubmit type="submit">
                                                <EnterSvg />
                                            </InputSubmit>
                                        </>
                                    )}
                                </WrapperBlock>
                            </ApertureEditorContainer>
                        </Wrapper>
                    )}
                </ThemeProvider>
            </Portal>
        </>
    )
}
