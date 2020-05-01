import React from 'react'
import styled from 'styled-components'

import { colors } from 'styles/colors'
import { Icon } from 'components/Icon'

const IconListWrapper = styled.div<{ background: string }>`
    background-color: ${props => props.background};
    display: flex;
    flex-wrap: wrap;
    padding: 40px;
    outline: 1px solid ${colors.dark};
`
const IconItem = styled.div`
    width: 50%;
    padding: 10px;
    box-sizing: border-box;
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
}) => {
    return (
        <IconListWrapper background={background}>
            {items.map((item: IItem, index: number) => {
                return (
                    <IconItem key={index}>
                        {item.svg && (
                            <IconStyled iconName={item.svg} fill={fill} />
                        )}
                        <div
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
