import { People } from '@prisma/client'

export type PeopleInput = Omit<People, 'createdAt' | 'updatedAt' | 'id'>

export type PeopleOutput = Omit<People, 'deletedAt'>
