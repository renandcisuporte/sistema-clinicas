import { PeopleRepository } from '~/modules/peoples/repositories/people-repository'
import {
  PeopleInput,
  PeopleOutput,
} from '~/modules/peoples/repositories/prisma/entity/people'
import { prisma } from '~/shared/prisma'

export const prismaPeopleRepository: PeopleRepository = {
  async delete(id: string): Promise<void> {
    await prisma.people.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() },
    })
  },

  async update(_id: string, input: PeopleInput): Promise<PeopleOutput> {
    const { clinicId, type, ...restInput } = input

    const result = await prisma.people.update({
      where: { id: _id, deletedAt: null },
      data: {
        ...restInput,
      },
    })

    const { deletedAt, ...rest } = result

    return rest
  },

  async create(input: PeopleInput): Promise<PeopleOutput> {
    const { phones, type, ...restInput } = input

    const result = await prisma.people.create({
      data: {
        ...restInput,
        phones: JSON.stringify(phones),
      },
    })

    const { deletedAt, ...rest } = result

    return rest
  },

  async findFirst(id: string): Promise<PeopleOutput | null> {
    const response = await prisma.people.findUnique({
      where: { id, deletedAt: null },
    })

    if (!response) return null

    const { deletedAt, ...rest } = response
    // rest.phones = JSON.parse(`${rest.phones}`)
    return rest
  },

  async activeInative(id: string): Promise<void> {
    const response = await prisma.people.findUnique({
      where: { id, deletedAt: null },
      select: { type: true },
    })

    await prisma.people.update({
      where: { id, deletedAt: null },
      data: { type: response?.type === 'user' ? 'specialist' : 'user' },
    })
  },

  async count(args: Record<string, any>): Promise<number> {
    const { full_name, document, clinicId, type } = args

    const where: Record<string, any> = { deletedAt: null, clinicId }
    if (type) where.type = type

    const conditions: Record<string, any> = []
    if (full_name) conditions.push({ fullName: { contains: full_name } })

    if (document) conditions.push({ document: { contains: document } })

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    return await prisma.people.count({
      where: { ...where },
    })
  },

  async findAll(args: Record<string, any>): Promise<PeopleOutput[]> {
    const { full_name, document, clinicId, type, limit = 15, page = 1 } = args

    const where: Record<string, any> = { deletedAt: null, clinicId, type }
    if (type) where.type = type

    const conditions: Record<string, any> = []
    if (full_name) conditions.push({ fullName: { contains: full_name } })

    if (document) conditions.push({ document: { contains: document } })

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const result = await prisma.people.findMany({
      where: { ...where },
      skip: (+page - 1) * +limit,
      take: +limit,
      orderBy: {
        fullName: 'desc',
      },
    })

    return result.map(({ deletedAt, ...rest }) => {
      // rest.phones = JSON.parse(`${rest.phones}`)
      return rest
    })
  },
}
