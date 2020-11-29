import React from 'react'
import styled from 'styled-components'

import { colors } from 'styles/colors'
import { Icon } from 'components/Icon'
import { displayWidth } from 'styles/width'

const IconListWrapper = styled.div<{ background: string }>`
    background-color: ${(props) => props.background};
    display: flex;
    flex-wrap: wrap;
    padding: 40px 16px;
    box-sizing: border-box;
    z-index: 1;
    @media (min-width: ${displayWidth.tablet}) {
        padding: 46px 10px 46px 30px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        padding: 56px 48px;
    }
`
const IconItem = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    align-items: center;
    @media (min-width: ${displayWidth.tablet}) {
        width: 50%;
        align-items: flex-start;
    }
    > div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        svg {
            min-width: 75px;
            margin-right: 10px;
        }
    }
`
const Text = styled.div`
    margin-top: 15px;

    text-align: center;

    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: 0.4px;
    @media (min-width: ${displayWidth.tablet}) {
        text-align: left;
    }
`
const Text2 = styled(Text)`
    p {
        font-size: 24px;
    }
`
interface IIconStyledProps {
    fill: string
}
const IconStyled = styled(Icon)<IIconStyledProps>`
    overflow: visible;
    .iconCircle {
        fill: ${(props) => props.fill};
        stroke: #b75034;
        stroke-width: 7px;
    }
`
interface IItem {
    question: string
    answer: string
    svg?: string
}

interface IIconListProps {
    items?: IItem[]
    fill?: string
    background?: string
}

export const IconListWhy: React.FC<IIconListProps> = ({
    items = [],
    fill = colors.dark,
    background = colors.white,
    ...restProps
}) => {
    return (
        <IconListWrapper background={background} {...restProps}>
            {items.map((item: IItem, index: number) => {
                return (
                    <IconItem key={index}>
                        <div>
                            {item.svg && (
                                <IconStyled iconName={item.svg} fill={fill} />
                            )}
                            <Text2
                                dangerouslySetInnerHTML={{
                                    __html: item.question,
                                }}
                            />
                        </div>
                        <Text
                            dangerouslySetInnerHTML={{
                                __html: item.answer,
                            }}
                        />
                    </IconItem>
                )
            })}
        </IconListWrapper>
    )
}
