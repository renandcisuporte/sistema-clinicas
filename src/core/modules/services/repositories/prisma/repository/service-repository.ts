import {
  ServiceInput,
  ServiceOutput,
} from '~/modules/services/repositories/prisma/entity/service'
import { ServicesRepository } from '~/modules/services/repositories/service-repository'
import { prisma } from '~/shared/prisma'

export const prismaServiceRepository: ServicesRepository = {
  async delete(id: string): Promise<void> {
    await prisma.service.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() },
    })
  },

  async update(id: string, input: ServiceInput): Promise<ServiceOutput> {
    const result = await prisma.service.update({
      where: { id, deletedAt: null },
      data: {
        clinicId: input.clinicId,
        name: input.name,
      },
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  },

  async create(input: ServiceInput): Promise<ServiceOutput> {
    const result = await prisma.service.create({
      data: {
        clinicId: input.clinicId,
        name: input.name,
      },
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  },
  async first(id: string): Promise<ServiceOutput | null> {
    const result = await prisma.service.findUnique({
      where: { id, deletedAt: null },
    })

    if (!result) return null

    const { deletedAt, ...rest } = result
    return { ...rest }
  },

  async count(args: Record<string, any>): Promise<number> {
    const { service, active, clinicId } = args

    const where: Record<string, any> = { clinicId, deletedAt: null }
    const conditions: Record<string, any> = []

    if (service) conditions.push({ service: { contains: service } })
    if (active) where.active = Boolean(active === 'true' ? true : false)

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    return prisma.service.count({
      where: { ...where },
    })
  },

  async all(args: Record<string, any>): Promise<ServiceOutput[]> {
    const { name, clinicId, limit = 15, page = 1 } = args

    const where: Record<string, any> = { clinicId, deletedAt: null }
    const conditions: Record<string, any> = []

    if (name) conditions.push({ name: { contains: name } })

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const result = await prisma.service.findMany({
      where: { ...where },
      skip: Number((page - 1) * limit),
      take: Number(limit),
      orderBy: { name: 'asc' },
    })

    return result.map(({ deletedAt, ...rest }) => ({ ...rest }))
  },
}
