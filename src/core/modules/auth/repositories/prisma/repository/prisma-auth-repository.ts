import { AuthRepository } from '~/modules/auth/repositories/auth-repository'
import {
  AuthOutput,
  AuthUser,
} from '~/modules/auth/repositories/prisma/entity/auth'
import { prisma } from '~/shared/prisma'

export const prismaAuthRepository: AuthRepository = {
  async findById(userId: string): Promise<AuthUser | null> {
    const result = await prisma.user.findFirst({
      where: { id: userId, deletedAt: null },
    })

    if (!result) return null

    const { password, createdAt, deletedAt, updatedAt, ...rest } = result
    return { ...rest }
  },

  async findByEmail(email: string): Promise<AuthOutput | null> {
    const result = await prisma.user.findFirst({
      where: {
        email: email,
        deletedAt: null,
      },
    })

    if (!result) return null

    const { createdAt, updatedAt, deletedAt, ...rest } = result
    return { ...rest }
  },
}
