'use server'

import { getUser } from '@/libs/session'
import { redirect } from 'next/navigation'
import { prismaChartRepository } from '~/modules/chart/repositories/prisma/repository/prisma-chart-repository'
import { findFirstChartUseCase } from '~/modules/chart/use-cases/find-first-chart-use-case'
import { prismaClinicRepository } from '~/modules/clinics/repositories/prisma/repository/prisma-clinic-repository'
import { prismaPeopleRepository } from '~/modules/peoples/repositories/prisma/repository/prisma-people-repository'
import { prismaRoomRepository } from '~/modules/rooms/repositories/prisma/repository/prisma-room-repository'

export const getCachedChart = async () => {
  const session = await getUser()
  if (!session) return redirect('/login')

  const useCase = findFirstChartUseCase({
    repoChart: prismaChartRepository,
    repoPeople: prismaPeopleRepository,
    repoRoom: prismaRoomRepository,
    repoClinic: prismaClinicRepository,
  })

  const { data } = await useCase.execute(session?.clinicId)

  return data
}
