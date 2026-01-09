'use client'

import { activeInativeExpense } from '@/actions/expenses'
import { Switch } from '@/components/ui/switch'
import { startTransition } from 'react'

type Props = {
  id: string
  active: boolean
}

export function SwitchExpense({ id, active }: Props) {
  async function handleClick() {
    startTransition(async () => {
      await activeInativeExpense({ id })
    })
  }

  return <Switch onClick={handleClick} defaultChecked={active} />
}
