'use client'

import { activeInativePeople } from '@/actions/peoples'
import { Switch } from '@/components/ui/switch'
import { startTransition } from 'react'

type Props = {
  id: string
  active: 'specialist' | 'user'
}

export function SwitchPeople({ id, active }: Props) {
  async function handleClick() {
    startTransition(async () => {
      await activeInativePeople(id)
    })
  }

  return (
    <Switch onClick={handleClick} defaultChecked={active === 'specialist'} />
  )
}
