import { Room as RoomPrisma } from '@prisma/client'

export type RoomInput = Pick<
  RoomPrisma,
  'clinicId' | 'room' | 'active' | 'averageService' | 'description'
>

export type RoomOutput = Omit<RoomPrisma, 'deletedAt'>
