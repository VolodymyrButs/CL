import styled from 'styled-components'
import { colors } from 'styles/colors'

export const CallbackButton = styled.button`
    position: fixed;
    bottom: 24px;
    left: calc((100vw - 1354px) / 2);
    width: 64px;
    height: 64px;
    background-color: ${colors.dark};
    border: 1px solid ${colors.dark};
    border-radius: 50%;
    margin: 10px 5px;
    word-spacing: 100vh;
    color: ${colors.white};
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.6px;
    padding: 1px;
    line-height: 14px;
    text-align: center;
    text-transform: uppercase;
`
