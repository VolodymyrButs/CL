import React from 'react'
import styled from 'styled-components'

import { colors } from 'styles/colors'
import CloseIcon from 'assets/icons/Exit.svg'
import { displayWidth } from 'styles/width'

const ModalWrapper = styled.div<{ open: boolean }>`
    display: ${(props) => (props.open ? 'flex' : 'none')};
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
    max-width: 90%;
    max-height: 90%;
    z-index: 40;
    ${({ image }) =>
        image
            ? 'padding: 0;background-color: transparent;border: none;width:90%;max-width: 90%;'
            : `padding: 40px ;background-color: ${colors.white}; border: 1px solid ${colors.dark};`};

    box-sizing: border-box;
    @media (min-width: ${displayWidth.tablet}) {
        max-width: 70%;
        ${({ image }) => image && ` max-width: 90%;`};
        overflow-y: auto;
        max-height: 90%;
    }
    @media (orientation: portrait) and (min-width: ${displayWidth.tablet}) {
        width: 80%;
    }
    @media (min-width: ${displayWidth.desktop}) {
        height: auto;

        max-height: 90%;
    }
    @media (orientation: landscape) and (max-height: 700px) {
        padding: 50px 70px;
        overflow-y: auto;
        justify-content: flex-start;
    }
`
const CloseIconStyled = styled(CloseIcon)<{ $image: boolean }>`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 4;
    ${({ $image }) =>
        $image
            ? `fill: ${colors.white};stroke:${colors.dark};`
            : `fill: ${colors.dark};stroke:${colors.white};`};
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
                <CloseIconStyled $image={image} onClick={closeHandler} />
                {children}
            </ModalWindow>
        </ModalWrapper>
    )
}
