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
        padding: 0px 48px 20px;
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
    @media (min-width: ${displayWidth.desktop}) {
        width: 100%;
        align-items: flex-start;
    }
    > div:first-child {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        @media (min-width: ${displayWidth.desktop}) {
            justify-content: start;
        }
        svg {
            margin-right: 10px;
        }
    }
`
const Text = styled.div`
    margin-top: 15px;

    text-align: left;

    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 26px;
    letter-spacing: 0.4px;
    @media (min-width: ${displayWidth.tablet}) {
    }
    @media (min-width: ${displayWidth.desktop}) {
        font-size: 32px;
        margin-top: 0px;
    }
`
const Text2 = styled(Text)`
    font-size: 18px;
    p {
        font-size: 18px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        display: none;
    }
`
const TextD = styled(Text)`
    display: none;
    @media (min-width: ${displayWidth.desktop}) {
        display: block;
        font-size: 24px;
        margin-top: 15px;
        line-height: 35px;
    }
`
interface IIconStyledProps {
    fill: string
}
const IconStyled = styled(Icon)<IIconStyledProps>`
    min-width: 75px;
    overflow: visible;
    .iconCircle {
        fill: #ebebeb;
        stroke: #b75034;
        stroke-width: 1px;
    }
    @media (min-width: ${displayWidth.desktop}) {
        min-width: 120px;
        min-height: 65px;
    }
`
interface IItem {
    question: string
    answer: string
    answerDesctop: string
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
                            <Text
                                dangerouslySetInnerHTML={{
                                    __html: item.question,
                                }}
                            />
                        </div>
                        <Text2
                            dangerouslySetInnerHTML={{
                                __html: item.answer,
                            }}
                        />
                        <TextD> {item.answerDesctop}</TextD>
                    </IconItem>
                )
            })}
        </IconListWrapper>
    )
}
