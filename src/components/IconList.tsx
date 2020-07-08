import React from 'react'
import styled from 'styled-components'

import { colors } from 'styles/colors'
import { Icon } from 'components/Icon'
import { displayWidth } from 'styles/width'

const IconListWrapper = styled.div<{ background: string }>`
    background-color: ${props => props.background};
    display: flex;
    flex-wrap: wrap;
    padding: 40px 16px;
    box-sizing: border-box;
    @media (min-width: ${displayWidth.tablet}) {
        outline: 1px solid ${colors.dark};
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
`
const Text = styled.div`
    margin-top: 15px;
    p {
        text-align: center;

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

interface IIconStyledProps {
    fill: string
}
const IconStyled = styled(Icon)<IIconStyledProps>`
    .iconCircle {
        fill: ${props => props.fill};
    }
`
interface IItem {
    content: string
    svg?: string
}

interface IIconListProps {
    items?: IItem[]
    fill?: string
    background?: string
}

export const IconList: React.FC<IIconListProps> = ({
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
                        {item.svg && (
                            <IconStyled iconName={item.svg} fill={fill} />
                        )}
                        <Text
                            dangerouslySetInnerHTML={{
                                __html: item.content,
                            }}
                        />
                    </IconItem>
                )
            })}
        </IconListWrapper>
    )
}
