import { ServiceInProduct as ServiceInProductPrisma } from '@prisma/client'

export type ServiceInProductInput = Pick<
  ServiceInProductPrisma,
  'clinicId' | 'productId' | 'serviceId' | 'rental'
> & { rentalPrice: number }

export type ServiceInProductOutput = Omit<
  ServiceInProductPrisma,
  'deletedAt' | 'rentalPrice'
> & { rentalPrice: number; serviceName: string; productName: string }
