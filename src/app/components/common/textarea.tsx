import { cn } from '@/libs/cn'
import * as React from 'react'

import { Label } from '../ui/label'
import { Textarea, TextareaProps } from '../ui/textarea'

export interface TextLabelProps extends TextareaProps {
  label: string
  message?: string
  classHelper?: string
}

export const TextareaLabel = React.forwardRef<
  HTMLTextAreaElement,
  TextLabelProps
>(function TextareaLabel({ label, message, classHelper, ...rest }, ref) {
  const uId = React.useId()
  const id = rest.id ?? uId
  const restClass = rest.className

  return (
    <div
      className={cn(
        'flex w-full flex-col space-y-1',
        classHelper,
        message && 'text-red-800',
      )}
    >
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        {...rest}
        ref={ref}
        id={id}
        className={cn(
          restClass,
          message && 'border-red-800 outline-none focus-visible:ring-red-400',
        )}
      />
      <small aria-label="police">{message}</small>
    </div>
  )
})
