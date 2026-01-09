import { ExpenseRepository } from '~/modules/expenses/repositories/expense-repository'
import {
  ExpenseInput,
  ExpenseOutput,
} from '~/modules/expenses/repositories/prisma/entity/expense'
import { prisma } from '~/shared/prisma'

export const prismaExpenseRepository: ExpenseRepository = {
  async delete(id: string): Promise<void> {
    await prisma.expense.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() },
    })
  },

  async update(id: string, input: ExpenseInput): Promise<ExpenseOutput> {
    const result = await prisma.expense.update({
      where: { id, deletedAt: null },
      data: {
        ...input,
      },
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  },

  async create(input: ExpenseInput): Promise<ExpenseOutput> {
    const result = await prisma.expense.create({
      data: { ...input },
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  },

  async activeInative(id: string): Promise<void> {
    const result = await prisma.expense.findUnique({
      where: { id, deletedAt: null },
      select: { active: true },
    })

    await prisma.expense.update({
      where: { id },
      data: { active: !result?.active },
    })
  },

  async activeInativeTypes(id: string): Promise<void> {
    const result = await prisma.expense.findUnique({
      where: { id, deletedAt: null },
      select: { type: true },
    })

    await prisma.expense.update({
      where: { id },
      data: { type: `${result?.type === 'fixed' ? 'variable' : 'fixed'}` },
    })
  },

  async first(id: string): Promise<ExpenseOutput | null> {
    const result = await prisma.expense.findUnique({
      where: { id, deletedAt: null },
    })

    if (!result) return null

    const { deletedAt, ...rest } = result
    return { ...rest }
  },

  async count(args: Record<string, any>): Promise<number> {
    const { description, active, type, clinicId } = args

    const where: Record<string, any> = { clinicId, deletedAt: null }
    const conditions: Record<string, any> = []

    if (description) conditions.push({ description: { contains: description } })
    if (['true', 'false'].includes(active))
      where.active = active === 'true' ? true : false
    if (['fixed', 'variable'].includes(type)) where.type = type

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    return prisma.expense.count({
      where: { ...where },
    })
  },

  async all(args: Record<string, any>): Promise<ExpenseOutput[]> {
    const { description, active, type, clinicId, limit = 15, page = 1 } = args

    const where: Record<string, any> = { clinicId, deletedAt: null }
    const conditions: Record<string, any> = []

    if (description) conditions.push({ description: { contains: description } })
    if (['true', 'false'].includes(active))
      where.active = active === 'true' ? true : false
    if (['fixed', 'variable'].includes(type)) where.type = type

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const result = await prisma.expense.findMany({
      where: { ...where },
      skip: Number((page - 1) * limit),
      take: Number(limit),
      orderBy: { description: 'asc' },
    })

    return result.map(({ deletedAt, ...rest }) => ({ ...rest }))
  },
}
