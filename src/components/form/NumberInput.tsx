import React from 'react'

import { Input } from 'components/form/Input'
import { IInputProps } from 'components/form/Types'

export const NumberInput = React.forwardRef<HTMLInputElement, IInputProps>(
    ({ err, placeholder, name, ...props }, ref) => (
        <Input
            type="number"
            name={name}
            ref={ref}
            isValid={err}
            placeholder={placeholder}
            {...props}
        />
    )
)

NumberInput.displayName = 'NumberInput'
