import { User as UserPrisma } from '@prisma/client'

export type UserOutput = Omit<UserPrisma, 'password' | 'deletedAt'>

export type UserInput = Omit<
  UserPrisma,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>
