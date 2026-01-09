import { CreateWorkTime } from '~/modules/work-times/dtos/create-work-time'
import { WorkTime } from '~/modules/work-times/dtos/work-time'
import { WorkTimeRepository } from '~/modules/work-times/repositories/work-time-repository'
import { prisma } from '~/shared/prisma'

export const prismaWorkTimeRepository: WorkTimeRepository = {
  async createWork(input: CreateWorkTime): Promise<WorkTime> {
    const { clinicId, week, open, times } = input

    await prisma.workTime.deleteMany({ where: { clinicId, week } })

    const result = await prisma.workTime.create({
      data: { clinicId, week, times, open: /^true$/i.test(String(open)) },
    })

    const { deletedAt, ...rest } = result

    return { ...rest }
  },

  async createRecommended(input: CreateWorkTime): Promise<WorkTime> {
    const { clinicId, week, open } = input

    await prisma.workTimeRecommend.deleteMany({ where: { clinicId, week } })

    const result = await prisma.workTimeRecommend.create({
      data: { ...input, open: /^true$/i.test(String(open)) },
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  },

  async createService(input: CreateWorkTime): Promise<WorkTime> {
    const { clinicId, week, open } = input

    await prisma.workTimeService.deleteMany({ where: { clinicId, week } })

    const result = await prisma.workTimeService.create({
      data: { ...input, open: /^true$/i.test(String(open)) },
    })

    const { deletedAt, ...rest } = result

    return { ...rest }
  },

  async averageWorkingTime(clinicId: string): Promise<WorkTime[]> {
    const result = await prisma.workTime.findMany({
      where: { clinicId, deletedAt: null },
    })

    return result.map(({ deletedAt, ...rest }) => ({ ...rest }))
  },

  async recommendedAverageTime(clinicId: string): Promise<WorkTime[]> {
    const result = await prisma.workTimeRecommend.findMany({
      where: { clinicId, deletedAt: null },
    })

    return result.map(({ deletedAt, ...rest }) => ({ ...rest }))
  },

  async averageServiceTime(clinicId: string): Promise<WorkTime[]> {
    const result = await prisma.workTimeService.findMany({
      where: { clinicId, deletedAt: null },
    })

    return result.map(({ deletedAt, ...rest }) => ({ ...rest }))
  },
}
