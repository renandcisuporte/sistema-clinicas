'use client'

import { logoutAction } from '@/(auth)/action'
import { LogOutIcon } from 'lucide-react'
import { useTransition } from 'react'

export function LogOut() {
  const [isPending, startTransition] = useTransition()

  async function handleLogOut() {
    startTransition(async () => {
      await logoutAction()
    })
  }

  return (
    <span onClick={handleLogOut}>
      <LogOutIcon strokeWidth={2} className="cursor-pointer" />
      <span>Sair</span>
    </span>
  )
}
