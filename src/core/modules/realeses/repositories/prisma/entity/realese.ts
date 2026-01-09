import { Realese as RealesePrisma } from '@prisma/client'

export type RealeseInput = Omit<
  RealesePrisma,
  'createdAt' | 'updatedAt' | 'deletedAt' | 'id' | 'price'
> & {
  price: number
}

export type RealeseOutput = Omit<
  RealesePrisma,
  'deletedAt' | 'createdAt' | 'updatedAt' | 'id' | 'price'
> & {
  price: number
}

export type RealeseUpSave = {
  [key: string]: {
    [key: string]: {
      price: number
    }
  }
} & {
  clinicId: string
}
