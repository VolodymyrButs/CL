import React from 'react'
import styled from 'styled-components'

import { colors } from 'styles/colors'

import { displayWidth } from 'styles/width'

const IconListWrapper = styled.div<{ background: string }>`
    background-color: ${(props) => props.background};
    display: flex;
    flex-wrap: wrap;
    padding: 0 16px;
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
    /* flex-direction: column; */
    width: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    align-items: center;
    @media (min-width: ${displayWidth.tablet}) {
        width: 50%;
        align-items: flex-start;
    }
    > div {
        display: flex;
    }
`
const Text = styled.span`
    margin-top: 10px;
    p {
        text-align: center;
        width: 100%;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 26px;
        letter-spacing: 0.4px;
        @media (min-width: ${displayWidth.tablet}) {
            text-align: left;
        }
        strong {
            font-weight: 700;
        }
    }
`
const Text2 = styled(Text)`
    position: relative;
    p {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        line-height: 20px;
        padding-left: 30px;
        min-height: 46px;
        text-align: left;
        box-sizing: border-box;
        margin-bottom: 10px;
    }
    ::before {
        position: absolute;
        left: 0px;
        top: 0;
        color: #b75034;
        font-size: 40px;
        content: '?';
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

export const IconListQuestion: React.FC<IIconListProps> = ({
    items = [],
    background = colors.white,
    ...restProps
}) => {
    return (
        <IconListWrapper background={background} {...restProps}>
            {items.map((item: IItem, index: number) => {
                return (
                    <IconItem key={index}>
                        <div>
                            {/* {item.svg && (
                                <IconStyled iconName={item.svg} fill={fill} />
                            )} */}
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
