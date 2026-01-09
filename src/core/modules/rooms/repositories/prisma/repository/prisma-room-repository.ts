import { prisma } from '~/shared/prisma'
import { RoomsRepository } from '../../room-repository'
import { RoomInput, RoomOutput } from '../entity/room'

export const prismaRoomRepository: RoomsRepository = {
  async delete(id: string): Promise<void> {
    await prisma.room.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() },
    })
  },

  async update(id: string, input: RoomInput): Promise<RoomOutput> {
    const result = await prisma.room.update({
      where: { id, deletedAt: null },
      data: {
        ...input,
      },
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  },

  async create(input: RoomInput): Promise<RoomOutput> {
    const result = await prisma.room.create({
      data: { ...input },
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  },

  async activeInative(id: string): Promise<void> {
    const result = await prisma.room.findUnique({
      where: { id, deletedAt: null },
      select: { active: true },
    })

    await prisma.room.update({
      where: { id },
      data: { active: !result?.active },
    })
  },

  async first(id: string): Promise<RoomOutput | null> {
    const result = await prisma.room.findUnique({
      where: { id, deletedAt: null },
    })

    if (!result) return null

    const { deletedAt, ...rest } = result
    return { ...rest }
  },

  async count(args: Record<string, any>): Promise<number> {
    const { room, active, clinicId } = args

    const where: Record<string, any> = { clinicId, deletedAt: null }
    const conditions: Record<string, any> = []

    if (room) conditions.push({ room: { contains: room } })
    if (active) where.active = Boolean(active === 'true' ? true : false)

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    return prisma.room.count({
      where: { ...where },
    })
  },

  async all(args: Record<string, any>): Promise<RoomOutput[]> {
    const { room, active, clinicId, limit = 15, page = 1 } = args

    const where: Record<string, any> = { clinicId, deletedAt: null }
    const conditions: Record<string, any> = []

    if (room) conditions.push({ room: { contains: room } })
    if (active) where.active = Boolean(active === 'true' ? true : false)

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const result = await prisma.room.findMany({
      where: { ...where },
      skip: Number((page - 1) * limit),
      take: Number(limit),
    })

    return result.map(({ deletedAt, ...rest }) => ({ ...rest }))
  },
}
