'use server'

import { getUser } from '@/libs/session'
import { redirect } from 'next/navigation'
import { prismaRealeseRepository } from '~/modules/realeses/repositories/prisma/repository/prisma-realese-repository'
import { findAllRealeseUseCase } from '~/modules/realeses/use-cases/find-all-realese-use-case'

const now = new Date()
const year = now.getFullYear()

const dateStart = new Date(year, 0, 1, 0, 0, 0) // 01/01 ano atual
const dateEnd = new Date(year, 11, 31, 23, 59, 59) // 31/12 ano atual

export const getCachedChart = async () => {
  const session = await getUser()
  if (!session) return redirect('/login')

  const useCase = findAllRealeseUseCase({
    repository: prismaRealeseRepository,
  })

  const dateFormat = (date: string) => date.split('/').reverse().join('-')

  const [{ data: variable }, { data: fixed }] = await Promise.all([
    useCase.execute({
      dateStart: dateFormat(dateStart.toLocaleDateString()),
      dateEnd: dateFormat(dateEnd.toLocaleDateString()),
      clinicId: session?.clinicId,
      type: 'variable',
    }),
    useCase.execute({
      dateStart: dateFormat(dateStart.toLocaleDateString()),
      dateEnd: dateFormat(dateEnd.toLocaleDateString()),
      clinicId: session?.clinicId,
      type: 'fixed',
    }),
  ])

  return {
    fixed,
    variable,
  }
}
