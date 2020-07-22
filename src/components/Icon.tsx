import React from 'react'
import { CSSProperties } from 'styled-components'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function require(name: string): any

interface IIconProps {
    iconName: string
    styles?: CSSProperties
}

export const Icon: React.FC<IIconProps> = ({
    iconName,
    styles,
    ...restProps
}) => {
    const IconStyled = require(`assets/icons/${iconName}`)

    return <IconStyled style={styles} {...restProps} />
}
