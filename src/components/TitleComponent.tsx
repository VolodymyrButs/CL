import styled, { css } from 'styled-components'

import { colors } from 'styles/colors'
import { displayWidth } from 'styles/width'
import { indent } from 'styles/indent'

const TitleGeneralStyle = css`
    font-family: 'Yeseva One', sans-serif;
    font-style: normal;
    font-size: 34px;
    line-height: 39px;
    text-align: center;
    letter-spacing: 1.68px;
    margin: 56px 16px 10px;
    color: ${colors.dark};
    @media (max-width: 355px) {
        font-size: 30px;
        line-height: 35px;
        letter-spacing: 1px;
    }
    @media (min-width: ${displayWidth.tablet}) {
        font-size: 28px;
        line-height: 32px;
        margin: 40px 10px 20px ${indent.heroColumnTablet};
        text-align: left;
    }
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 36px;
        line-height: 42px;
        letter-spacing: 1.77882px;
        margin: 60px auto 50px 48px;
    }
`

export const Title = styled.h2`
    ${TitleGeneralStyle}
`
export const TitleH1 = styled.h1`
    ${TitleGeneralStyle}
`
