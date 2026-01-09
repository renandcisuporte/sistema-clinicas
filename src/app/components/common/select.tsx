import { cn } from '@/libs/cn'
import * as React from 'react'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel as SelectLabelOthers,
  SelectProps,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export interface SelectLabelProps extends SelectProps {
  label?: string
  classHelper?: string
  options: { label: string; value: string }[]
  message?: string | undefined
}

export function SelectLabel({
  label,
  message,
  classHelper,
  ...rest
}: SelectLabelProps) {
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
      {label && <Label htmlFor={id}>{label}</Label>}
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione uma opção" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabelOthers></SelectLabelOthers>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <small aria-label="police">{message}</small>
    </div>
  )
}
