import { Product as ProductPrisma } from '@prisma/client'

export type ProductInput = Pick<
  ProductPrisma,
  'clinicId' | 'name' | 'quantity'
> & { price: number }

export type ProductOutput = {
  price: string
} & Omit<ProductPrisma, 'deletedAt' | 'price'>
