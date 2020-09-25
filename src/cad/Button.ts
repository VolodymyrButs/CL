import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { light } from 'cad/themes/light'

const height = {
    big: 44,
    regular: 38,
}

const contentHeight = {
    big: 24,
    regular: 18,
}

const buttonFormStyle = {
    normal: css`
        padding: 6px 15px;
        & svg:first-child {
            margin-right: 5px;
        }
        & svg:last-child {
            margin-left: 5px;
        }
    `,
    square: css`
        padding: 9px;
    `,
}

const visibility: {
    true: FlattenSimpleInterpolation
    false: FlattenSimpleInterpolation
} = {
    true: css`
        display: block;
    `,
    false: css`
        display: none;
    `,
}
const size: {
    regular: FlattenSimpleInterpolation
    big: FlattenSimpleInterpolation
    svgMobile: FlattenSimpleInterpolation
} = {
    regular: css`
        height: ${height.regular}px;
        font-size: 16px;
        line-height: ${contentHeight.regular}px;

        & svg {
            height: ${contentHeight.regular}px;
            width: ${contentHeight.regular}px;
        }
    `,
    svgMobile: css`
        height: 44px;
        font-size: 14px;
        line-height: 20px;
        padding: 10px 6px;
        & svg {
            height: ${contentHeight.regular}px;
            width: ${contentHeight.regular}px;
            margin-left: 5px;
        }
        @media (min-width: 400px) {
            font-size: 16px;
        }
    `,
    big: css`
        height: ${height.big}px;
        font-size: 20px;
        line-height: ${contentHeight.big}px;

        & svg {
            height: ${contentHeight.big}px;
            width: ${contentHeight.big}px;
        }
    `,
}
interface ButoonProps {
    $buttonForm?: 'normal' | 'square'
    $visibility?: 'true' | 'false'
    $size?: 'regular' | 'big' | 'svgMobile'
}
export const Button = styled.button<ButoonProps>`
    display: flex;
    box-sizing: border-box;
    border-radius: 5px;
    align-items: center;
    background-clip: padding-box;
    ${(props) => buttonFormStyle[props.$buttonForm || 'normal']};
    ${(props) => visibility[props.$visibility || 'true']};
    color: ${(props) => props.theme.bgColor};
    border: 2px solid transparent;
    background-color: ${(props) => props.theme.color};
    align-items: center;
    ${(props) => size[props.$size || 'regular']};
    font-weight: 500;
    & svg {
        fill: ${(props) => props.theme.bgColor};
    }

    :focus:not(:disabled) {
        outline: none;
        border-color: ${(props) => props.theme.color};
    }

    :hover:not(:disabled) {
        background-color: ${(props) => props.theme.bgColorHover};
    }

    :active:hover:not(:disabled) {
        background-color: ${(props) => props.theme.color};
    }

    :disabled {
        opacity: 0.5;
    }
`
Button.defaultProps = {
    theme: light,
    type: 'button',
}

const direction = {
    row: css`
        display: flex;
        flex-direction: row;

        & button:not(:first-child) {
            margin-left: 4px;
        }

        & button:not(:last-child) {
            margin-right: 4px;
        }
    `,

    column: css`
        display: flex;
        flex-direction: column;
        align-items: center;

        & > button:not(:first-child) {
            margin-top: 4px;
        }

        & > button:not(:last-child) {
            margin-bottom: 4px;
        }
    `,
}

export const ButtonGroup = styled.div<{ $direction?: 'row' | 'column' }>`
    ${(props) => direction[props.$direction || 'row']};
`
