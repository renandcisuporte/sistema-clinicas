'use server'

import { getUser } from '@/libs/session'
import { endOfYear, format, startOfYear } from 'date-fns'
import { redirect } from 'next/navigation'
import { prismaRealeseRepository } from '~/modules/realeses/repositories/prisma/repository/prisma-realese-repository'
import { findAllRealeseUseCase } from '~/modules/realeses/use-cases/find-all-realese-use-case'

const now = new Date()
const year = now.getFullYear()
const yearReference = new Date(year, 0, 1)

const dateStart = format(startOfYear(yearReference), 'yyyy-MM-dd')
const dateEnd = format(endOfYear(yearReference), 'yyyy-MM-dd')

export const getCachedChart = async () => {
  const session = await getUser()
  if (!session) return redirect('/login')

  const useCase = findAllRealeseUseCase({
    repository: prismaRealeseRepository,
  })

  const [{ data: variable }, { data: fixed }] = await Promise.all([
    useCase.execute({
      dateStart,
      dateEnd,
      clinicId: session?.clinicId,
      type: 'variable',
    }),
    useCase.execute({
      dateStart,
      dateEnd,
      clinicId: session?.clinicId,
      type: 'fixed',
    }),
  ])

  return {
    fixed,
    variable,
  }
}
