import { prisma } from '~/shared/prisma'
import { ProductsRepository } from '../../product-repository'

export const prismaProductRepository: ProductsRepository = {
  async delete(id): Promise<void> {
    await prisma.product.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() },
    })
  },

  async update(id, input) {
    const result = await prisma.product.update({
      where: { id, deletedAt: null },
      data: {
        clinicId: input.clinicId,
        name: input.name,
        price: input.price,
        quantity: input.quantity,
      },
    })

    const { deletedAt, price, ...rest } = result
    return { ...rest, price: Number(price) }
  },

  async create(input) {
    const result = await prisma.product.create({
      data: {
        clinicId: input.clinicId,
        name: input.name,
        price: input.price,
        quantity: input.quantity,
      },
    })

    const { deletedAt, price, ...rest } = result
    return { ...rest, price: Number(price) }
  },

  async first(id) {
    const result = await prisma.product.findUnique({
      where: { id, deletedAt: null },
    })

    if (!result) return null

    const { deletedAt, price, ...rest } = result
    return { ...rest, price: Number(price) }
  },

  async count(args: Record<string, any>) {
    const { product, active, clinicId } = args

    const where: Record<string, any> = { clinicId, deletedAt: null }
    const conditions: Record<string, any> = []

    if (product) conditions.push({ product: { contains: product } })
    if (active) where.active = Boolean(active === 'true' ? true : false)

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    return prisma.product.count({
      where: { ...where },
    })
  },

  async all(args: Record<string, any>) {
    const {
      name,
      clinicId,
      limit = 15,
      page = 1,
      nameAsc,
      nameDesc,
      priceAsc,
      priceDesc,
    } = args

    const where: Record<string, any> = { clinicId, deletedAt: null }
    const conditions: Record<string, any> = []

    if (name) conditions.push({ name: { contains: name } })
    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const orderBy: Record<string, any> = []
    if (nameAsc) orderBy.push({ name: 'asc' })
    if (nameDesc) orderBy.push({ name: 'desc' })
    if (priceAsc) orderBy.push({ price: 'asc' })
    if (priceDesc) orderBy.push({ price: 'desc' })

    const result = await prisma.product.findMany({
      orderBy,
      where: { ...where },
      skip: Number((page - 1) * limit),
      take: Number(limit),
    })

    return result.map(({ deletedAt, price, ...rest }) => ({
      ...rest,
      price: Number(price),
    }))
  },
}
