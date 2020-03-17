import React from 'react'
import styled, { FlattenSimpleInterpolation } from 'styled-components'

declare function require(name: string): any

interface IIconProps {
    iconName: string
    styles?: FlattenSimpleInterpolation
}
export const Icon: React.FC<IIconProps> = ({
    iconName,
    styles,
    ...restProps
}) => {
    const logo = require(`assets/icons/${iconName}`)

    const IconStyled = styled(logo)`
        width: 100px;
        ${styles};
    `
    return <IconStyled src={logo} {...restProps} />
}
