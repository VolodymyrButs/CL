import React from 'react'
import styled, { FlattenSimpleInterpolation } from 'styled-components'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const icon = require(`assets/icons/${iconName}`)

    const IconStyled = styled(icon)`
        ${styles};
    `
    return <IconStyled src={{ icon }} {...restProps} />
}
