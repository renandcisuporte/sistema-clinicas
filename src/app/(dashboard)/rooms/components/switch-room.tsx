'use client'

import { activeInativeRoom } from '@/actions/rooms'
import { Switch } from '@/components/ui/switch'
import { startTransition } from 'react'

type Props = {
  id: string
  active: boolean
}

export function SwitchRoom({ id, active }: Props) {
  async function handleClick() {
    startTransition(async () => {
      await activeInativeRoom(id)
    })
  }

  return <Switch onClick={handleClick} defaultChecked={active} />
}
