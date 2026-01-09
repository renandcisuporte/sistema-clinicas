import { Prisma } from '@prisma/client'
import { OutputRealese } from '~/modules/realeses/dtos/output-realese'
import { RealeseInput } from '~/modules/realeses/repositories/prisma/entity/realese'
import { RealeseRepository } from '~/modules/realeses/repositories/realese-repository'
import { prisma } from '~/shared/prisma'

export const prismaRealeseRepository: RealeseRepository = {
  async delete(id: string): Promise<void> {
    await prisma.realese.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() },
    })
  },

  async update(id: string, input: RealeseInput): Promise<OutputRealese> {
    const result = await prisma.realese.update({
      where: { id, deletedAt: null },
      include: {
        expense: {
          select: {
            description: true,
            type: true,
          },
        },
      },
      data: {
        ...input,
      },
    })

    const { deletedAt, expense, ...rest } = result
    return {
      ...rest,
      price: Number(rest.price),
      description: expense?.description!,
      type: expense?.type!,
    }
  },

  async create(input: RealeseInput): Promise<OutputRealese> {
    const result = await prisma.realese.create({
      data: { ...input },
      include: {
        expense: {
          select: {
            description: true,
            type: true,
          },
        },
      },
    })

    const { deletedAt, expense, ...rest } = result
    return {
      ...rest,
      price: Number(rest.price),
      description: expense?.description!,
      type: expense?.type!,
    }
  },

  async upsave(input: RealeseInput): Promise<void> {
    const { clinicId, expenseId, date } = input

    await prisma.realese.deleteMany({ where: { clinicId, expenseId, date } })

    await prisma.realese.create({
      data: { ...input },
    })
  },

  async first(id: string): Promise<OutputRealese | null> {
    const result = await prisma.realese.findUnique({
      where: { id, deletedAt: null },
      include: {
        expense: {
          select: {
            description: true,
            type: true,
          },
        },
      },
    })

    if (!result) return null

    const { deletedAt, expense, ...rest } = result

    return {
      ...rest,
      price: Number(rest.price),
      description: expense?.description!,
      type: expense?.type!,
    }
  },

  async count(args: Record<string, any>): Promise<number> {
    const { clinicId, expenseId, type, dateStart, dateEnd } = args

    const where: Prisma.RealeseWhereInput = {
      clinicId,
      deletedAt: null,
      ...(type ? { expense: { is: { active: true, type } } } : {}),
      ...(expenseId ? { expenseId } : {}),
      ...(dateStart || dateEnd
        ? {
            date: {
              ...(dateStart && { gte: new Date(`${dateStart}T00:00:00`) }),
              ...(dateEnd && { lte: new Date(`${dateEnd}T23:59:59.999`) }),
            },
          }
        : {}),
    }

    return prisma.realese.count({
      where: {
        ...where,
      },
    })
  },

  async all(args: Record<string, any>): Promise<OutputRealese[]> {
    const { clinicId, expenseId, type, dateStart, dateEnd, orderBy } = args

    const where: Prisma.RealeseWhereInput = {
      deletedAt: null,
      clinicId,
      ...(type ? { expense: { is: { active: true, type } } } : {}),
      ...(expenseId ? { expenseId } : {}),
      ...(dateStart || dateEnd
        ? {
            date: {
              ...(dateStart && { gte: new Date(`${dateStart}T00:00:00`) }),
              ...(dateEnd && { lte: new Date(`${dateEnd}T23:59:59.999`) }),
            },
          }
        : {}),
    }

    const result = await prisma.realese.findMany({
      include: {
        expense: {
          select: {
            description: true,
            type: true,
          },
        },
      },
      orderBy: {
        expense: { description: orderBy === 'nameAsc' ? 'asc' : 'desc' },
      },
      where,
    })

    return result.map(({ deletedAt, expense, ...rest }) => ({
      ...rest,
      description: expense?.description!,
      price: Number(rest.price),
      type: expense?.type!,
    }))
  },
}
