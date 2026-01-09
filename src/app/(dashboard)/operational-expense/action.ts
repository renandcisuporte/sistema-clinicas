'use server'

import { getUser } from '@/libs/session'
import { unstable_cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { prismaRealeseRepository } from '~/modules/realeses/repositories/prisma/repository/prisma-realese-repository'
import { findAllRealeseUseCase } from '~/modules/realeses/use-cases/find-all-realese-use-case'

export const getCachedChart = unstable_cache(async () => {
  const session = await getUser()
  if (!session) return redirect('/login')

  const useCase = findAllRealeseUseCase({
    repository: prismaRealeseRepository,
  })

  const [{ data: variable }, { data: fixed }] = await Promise.all([
    useCase.execute({
      clinicId: session?.clinicId,
      type: 'variable',
    }),
    useCase.execute({
      clinicId: session?.clinicId,
      type: 'fixed',
    }),
  ])

  return {
    fixed,
    variable,
  }
}, ['expenses_realese'])
