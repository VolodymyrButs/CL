import React from 'react'
import { CSSProperties } from 'styled-components'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function require(name: string): any

interface IIconProps {
    iconName: string
    className?: CSSProperties
}

export const Icon: React.FC<IIconProps> = ({
    iconName,
    className,
    ...restProps
}) => {
    const IconStyled = require(`assets/icons/${iconName}`)

    return <IconStyled className={className} {...restProps} />
}
