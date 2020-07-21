import React from 'react'
import styled from 'styled-components'

import { colors } from 'styles/colors'
import CloseIcon from 'assets/icons/Exit.svg'
import { displayWidth } from 'styles/width'

const ModalWrapper = styled.div<{ open: boolean }>`
    display: ${props => (props.open ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 5;
`
const ModalWindow = styled.div`
    position: relative;
    width: 100%;
    border: 1px solid ${colors.dark};
    background-color: ${colors.white};
    z-index: 6;
    padding: 15px 32px;
    box-sizing: border-box;
    @media (min-width: ${displayWidth.tablet}) {
        width: 70%;
        overflow-y: auto;
        max-height: 95%;
    }
    @media (orientation: portrait) and (min-width: ${displayWidth.tablet}) {
        width: 80%;
    }
    @media (min-width: ${displayWidth.desktop}) {
        width: 600px;
        height: auto;
        max-width: 70%;
        max-height: 95%;
    }
    @media (orientation: landscape) and (max-height: 700px) {
        padding: 10px;
        overflow-y: auto;
        justify-content: flex-start;
    }
`
const CloseIconStyled = styled(CloseIcon)`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 25px;
    height: 25px;
    cursor: pointer;
`
interface IModalProps {
    closeHandler?: () => void
    children: React.ReactElement
    isOpen: boolean
}

export const Modal: React.FC<IModalProps> = ({
    closeHandler,
    children,
    isOpen = false,
}) => {
    const stopPropagation = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation()
    }
    return (
        <ModalWrapper open={isOpen} onClick={closeHandler}>
            <ModalWindow onClick={stopPropagation}>
                <CloseIconStyled onClick={closeHandler} />
                {children}
            </ModalWindow>
        </ModalWrapper>
    )
}
