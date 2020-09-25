import React, { useState } from 'react'
import { Layer } from 'react-konva'
import styled, { ThemeProvider } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { useTranslation } from 'react-i18next'

import { Button } from 'cad/Button'
import { light } from 'cad/themes/light'
import { accentDark } from 'cad/themes/accentDark'
import { Portal } from 'cad/Portal'
import { Tube } from 'cad/ElementsType'
import { tools } from 'cad/Workplace'
import ChangeIcon from 'assets/icons/iconsCad/change.svg'
import { getSelectedWallLength } from 'cad/reusableFunctions'
import { getElements } from 'cad/storage/selectors'
import TubeSvg from 'assets/icons/iconsCad/tube.svg'
import { NumberInput } from 'cad/NumberInput'
import { OptionalString } from 'cad/types'

const LineEditorContainerAsk = styled.div`
    background-color: ${(props) => props.theme.bgColor};
    padding: 5px;
`
const LineEditorContainer = styled.form`
    display: flex;
    justify-content: space-between;
    max-width: 740px;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
    padding: 5px;
    & p {
        box-sizing: border-box;
        margin: 0;
        font-size: 18px;
        align-self: center;
        @media (max-width: 767px) {
            font-size: 14px;
            text-align: center;
            max-width: 110px;
        }
    }
    @media (max-width: 767px) {
        flex-wrap: wrap;
        max-width: 500px;
    }
`
const InputWraperWide = styled.div`
    max-width: 250px;
    margin: 0 10px;
    @media (max-width: 767px) {
        max-width: 190px;
        margin: 0 5px;
    }
`
const InputWraper = styled.div`
    max-width: 22%;
    margin: 0 10px;
    @media (max-width: 767px) {
        max-width: 123px;
        margin: 0;
    }
`
const InputSubmit = styled(Button)`
    height: 54px;
    display: flex;
    align-self: flex-end;
    @media (max-width: 767px) {
        height: 40px;
    }
`
const ChangeButton = styled(Button)`
    height: 54px;
    max-width: 68px;
    align-self: flex-end;
    @media (max-width: 767px) {
        height: 40px;
    }
`
const StartText = styled.span`
    width: 200px;
    margin: 0 5px;
    font-size: 18px;
    text-align: center;
    align-self: center;
`

type Props = {
    toolEditorContainerNode: React.ReactNode
    selected: OptionalString
    switchDirection: boolean
    setSelected: (arg: OptionalString) => void
    setCurrentTool: (arg: string) => void
    setSwitchDirection: (arg: boolean) => void
}
export const TubeTool = ({
    toolEditorContainerNode,
    selected,
    setCurrentTool,
    setSelected,
    switchDirection,
    setSwitchDirection,
}: Props) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const stateElements = useSelector(getElements)
    const selectedLine = stateElements.find(
        (element: { id: string }) => element.id === selected
    )

    const [indentMine, setIndentMine] = useState(100)
    const [indentSide, setIndentSide] = useState(100)
    const [diameter, setDiameter] = useState(50)

    const handleIndentMineChange = (event: { target: { value: string } }) =>
        setIndentMine(Number(event.target.value))

    const handleIndentSideChange = (event: { target: { value: string } }) => {
        if (Number(selectedWallLength) - diameter >= Number(event.target.value))
            setIndentSide(Number(event.target.value))
    }

    const handleDiameterChange = (event: { target: { value: string } }) => {
        if (
            Number(selectedWallLength) - indentSide >=
            Number(event.target.value)
        )
            setDiameter(Number(event.target.value))
    }

    if (!stateElements.length) {
        return null
    }

    const selectedWallLength = selected && getSelectedWallLength(selectedLine)
    const getCurrentTubePoints = () => {
        if (
            selectedLine.points[0] !== selectedLine.points[2] &&
            selectedLine.points[0] < selectedLine.points[2] &&
            switchDirection === false
        ) {
            return [
                selectedLine.points[0] + indentSide + diameter / 2,
                selectedLine.points[1] + indentMine + diameter / 2,
                diameter,
            ]
        }

        if (
            selectedLine.points[0] !== selectedLine.points[2] &&
            selectedLine.points[0] < selectedLine.points[2] &&
            switchDirection === true
        ) {
            return [
                selectedLine.points[2] - indentSide - diameter / 2,
                selectedLine.points[3] + indentMine + diameter / 2,
                diameter,
            ]
        }

        if (
            selectedLine.points[0] !== selectedLine.points[2] &&
            selectedLine.points[0] > selectedLine.points[2] &&
            switchDirection === false
        ) {
            return [
                selectedLine.points[0] - indentSide - diameter / 2,
                selectedLine.points[1] - indentMine - diameter / 2,
                diameter,
            ]
        }
        if (
            selectedLine.points[0] !== selectedLine.points[2] &&
            selectedLine.points[0] > selectedLine.points[2] &&
            switchDirection === true
        ) {
            return [
                selectedLine.points[2] + indentSide + diameter / 2,
                selectedLine.points[3] - indentMine - diameter / 2,
                diameter,
            ]
        }

        if (
            selectedLine.points[0] === selectedLine.points[2] &&
            selectedLine.points[1] < selectedLine.points[3] &&
            switchDirection === false
        ) {
            return [
                selectedLine.points[0] - indentMine - diameter / 2,
                selectedLine.points[1] + indentSide + diameter / 2,
                diameter,
            ]
        }
        if (
            selectedLine.points[0] === selectedLine.points[2] &&
            selectedLine.points[1] < selectedLine.points[3] &&
            switchDirection === true
        ) {
            return [
                selectedLine.points[2] - indentMine - diameter / 2,
                selectedLine.points[3] - indentSide - diameter / 2,
                diameter,
            ]
        }
        if (
            selectedLine.points[0] === selectedLine.points[2] &&
            selectedLine.points[1] > selectedLine.points[3] &&
            switchDirection === false
        ) {
            return [
                selectedLine.points[0] + indentMine + diameter / 2,
                selectedLine.points[1] - indentSide - diameter / 2,
                diameter,
            ]
        }

        return [
            selectedLine.points[2] + indentMine + diameter / 2,
            selectedLine.points[3] + indentSide + diameter / 2,
            diameter,
        ]
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch({
            type: 'addElement',
            element: {
                id: uuid(),
                objectType: 'tube',
                points: getCurrentTubePoints(),
            },
        })

        setCurrentTool(tools.move)
        setSelected(undefined)
    }

    const handleSwitch = () => setSwitchDirection(!switchDirection)
    return (
        <>
            {selected && (
                <Layer>
                    <Tube
                        isInProgres
                        element={{
                            points: getCurrentTubePoints(),
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
                        <LineEditorContainer onSubmit={handleSubmit}>
                            <InputWraper>
                                <p>{t('IndentToMainWall')}</p>

                                <NumberInput
                                    value={indentMine}
                                    onChange={handleIndentMineChange}
                                />
                            </InputWraper>

                            <InputWraperWide>
                                <p>{t('IndentToSideWall')}</p>

                                <NumberInput
                                    max={Number(selectedWallLength) - diameter}
                                    value={indentSide}
                                    onChange={handleIndentSideChange}
                                />
                            </InputWraperWide>

                            <InputWraper>
                                <p>{t('TubeDiameter')}</p>

                                <NumberInput
                                    min={10}
                                    max={
                                        Number(selectedWallLength) - indentSide
                                    }
                                    value={diameter}
                                    onChange={handleDiameterChange}
                                />
                            </InputWraper>

                            <ChangeButton
                                $buttonForm="normal"
                                onClick={handleSwitch}
                            >
                                <ChangeIcon />
                            </ChangeButton>

                            <InputSubmit
                                theme={accentDark}
                                $size="svgMobile"
                                type="submit"
                            >
                                {t('Add')}

                                <TubeSvg />
                            </InputSubmit>
                        </LineEditorContainer>
                    )}
                </ThemeProvider>
            </Portal>
        </>
    )
}
