import styled from 'styled-components'

import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'

export const Title = styled.div`
    font-family: 'Yeseva One', cursive;
    font-style: normal;
    font-weight: normal;
    font-size: 34px;
    line-height: 39px;
    text-align: center;
    letter-spacing: 1.68px;
    margin: 56px 36px 10px;
    text-align: center;
    color: ${colors.dark};
    @media (max-width: 355px) {
        font-size: 30px;
        line-height: 35px;
        letter-spacing: 1px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 30px;
        line-height: 35px;
        letter-spacing: 1px;
        margin: 80px 20px 50px;
        text-align: left;
    }
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 36px;
        line-height: 42px;
        letter-spacing: 1.77882px;
        margin: 80px 48px 50px;
    }
`