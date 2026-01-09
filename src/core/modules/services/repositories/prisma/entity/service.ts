import { Service as ServicePrisma } from '@prisma/client'

export type ServiceInput = Pick<ServicePrisma, 'clinicId' | 'name'>

export type ServiceOutput = Omit<ServicePrisma, 'deletedAt'>
