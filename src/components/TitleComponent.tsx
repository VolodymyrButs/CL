import styled from 'styled-components'

import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { indent } from 'styles/indent'

export const Title = styled.div`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-size: 34px;
    line-height: 39px;
    text-align: center;
    letter-spacing: 1.68px;
    margin: 56px 32px 10px;
    text-align: center;
    color: ${colors.dark};
    @media (max-width: 355px) {
        font-size: 30px;
        line-height: 35px;
        letter-spacing: 1px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 28px;
        line-height: 32px;
        letter-spacing: 1px;
        margin: 60px 10px 50px ${indent.heroColumnDesktop};
        text-align: left;
    }
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 36px;
        line-height: 42px;
        letter-spacing: 1.77882px;
        margin: 60px 25px 50px 48px;
    }
`
