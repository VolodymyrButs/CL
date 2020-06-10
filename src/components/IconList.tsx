import React from 'react'
import styled from 'styled-components'

import { colors } from 'styles/colors'
import { Icon } from 'components/Icon'
import { displayWidth } from 'styles/width'

const IconListWrapper = styled.div<{ background: string }>`
    position: relative;
    background-color: ${props => props.background};
    display: flex;
    flex-wrap: wrap;
    padding: 40px;
    @media (min-width: ${displayWidth.tablet}) {
        outline: 1px solid ${colors.dark};
    }
`
const IconItem = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    align-items: center;
    @media (min-width: ${displayWidth.tablet}) {
        width: 50%;
        align-items: flex-start;
    }
    position: relative;
`
const Text = styled.div`
    p {
        text-align: center;
        @media (min-width: ${displayWidth.tablet}) {
            text-align: left;
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
