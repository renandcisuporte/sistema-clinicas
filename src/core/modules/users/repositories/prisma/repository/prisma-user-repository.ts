import { UserRepository } from '~/modules/users/repositories/user-repository'
import { prisma } from '~/shared/prisma'

export const prismaUserRepository: UserRepository = {
  async findByEmail(email) {
    const result = await prisma.user.findUnique({
      where: { email, deletedAt: null },
    })

    if (!result) return null
    const { deletedAt, password, ...userRest } = result
    return userRest
  },

  async findById(id) {
    const result = await prisma.user.findUnique({
      where: { id, deletedAt: null },
    })
    if (!result) return null
    const { deletedAt, password, ...userRest } = result
    return userRest
  },

  async resetPassword(email, password): Promise<void> {
    await prisma.user.update({
      where: { email },
      data: { password },
    })
  },

  async create(input) {
    const result = await prisma.user.create({
      data: { ...input },
    })

    const { deletedAt, password, ...userRest } = result
    return { ...userRest }
  },

  async update(id, input) {
    const result = await prisma.user.update({
      where: { id, deletedAt: null },
      data: { ...input },
    })

    const { deletedAt, password, ...userRest } = result
    return { ...userRest }
  },

  async delete(id) {
    await prisma.user.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    })
  },
}
