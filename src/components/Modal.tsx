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
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 30;
`
const ModalWindow = styled.div<{ image: boolean }>`
    position: relative;
    width: 100%;
    max-height: 100%;

    z-index: 40;
    ${({ image }) =>
        image
            ? 'padding: 0;background-color: transparent;border: none'
            : `padding: 15px 32px;background-color: ${colors.white}; border: 1px solid ${colors.dark};`};

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
        ${({ image }) => (image ? `width:100%` : `width:600px`)};
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
    top: 15px;
    right: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 4;
    fill: ${colors.white};
    stroke: ${colors.darkText};
    stroke-width: 1px;
`
interface IModalProps {
    closeHandler?: () => void
    children: React.ReactElement
    isOpen: boolean
    image?: boolean
}

export const Modal: React.FC<IModalProps> = ({
    closeHandler,
    children,
    isOpen = false,
    image = false,
}) => {
    const stopPropagation = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation()
    }
    return (
        <ModalWrapper open={isOpen} onClick={closeHandler}>
            <ModalWindow image={image} onClick={stopPropagation}>
                <CloseIconStyled onClick={closeHandler} />
                {children}
            </ModalWindow>
        </ModalWrapper>
    )
}
