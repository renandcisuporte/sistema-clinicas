import { cn } from '@/libs/cn'
import * as React from 'react'
import { Input, InputProps } from '../ui/input'
import { Label } from '../ui/label'

export interface InputLabelProps extends InputProps {
  label?: string
  message?: string
  classHelper?: string
}

export const InputLabel = React.forwardRef<HTMLInputElement, InputLabelProps>(
  function InputLabel({ label, message, classHelper, ...rest }, ref) {
    const uId = React.useId()
    const id = rest.id ?? uId
    const restClass = rest.className ?? ''

    return (
      <div
        className={cn(
          'flex w-full flex-col space-y-1',
          classHelper,
          message && 'text-red-800',
        )}
      >
        {label && <Label htmlFor={id}>{label}</Label>}

        <Input
          {...rest}
          ref={ref}
          id={id}
          className={cn(
            restClass,
            message && 'border-red-800 outline-none focus-visible:ring-red-400',
          )}
        />

        {message && <small aria-label="police">{message}</small>}
      </div>
    )
  },
)
