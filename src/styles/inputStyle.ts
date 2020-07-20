import { css } from 'styled-components'
import { colors } from 'styles/colors'

export const inputStyle = css`
    font-style: normal;
    width: 100%;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.4px;
    background-color: transparent;
    border: 0px solid;
    border-bottom: 1px solid ${colors.dark};
    margin: 20px 0;
    padding: 5px;
    box-sizing: border-box;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    [type='number'] {
        -moz-appearance: textfield;
    }
`
