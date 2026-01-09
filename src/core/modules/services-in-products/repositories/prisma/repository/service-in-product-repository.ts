import { prisma } from '~/shared/prisma'
import { ServiceInProductsRepository } from '../../service-in-product-repository'

export const prismaServiceInProductRepository: ServiceInProductsRepository = {
  async delete(id) {
    await prisma.serviceInProduct.delete({
      where: { id },
    })
  },

  async update(id, input) {
    const result = await prisma.serviceInProduct.update({
      where: { id },
      include: {
        product: { select: { name: true, price: true, quantity: true } },
        service: { select: { name: true } },
      },
      data: {
        clinicId: input.clinicId,
        productId: input.productId,
        serviceId: input.serviceId,
        rental: input.rental,
        rentalPrice: input.rentalPrice,
      },
    })

    const { rentalPrice, product, service, ...rest } = result

    return {
      id: rest.id,
      clinicId: rest.clinicId,
      productId: rest.productId,
      serviceId: rest.serviceId,
      rental: rest.rental,
      productPrice: product?.price.toString()!,
      productQuantity: product?.quantity.toString()!,
      rentalPrice: Number(rentalPrice),
      productName: product?.name!,
      serviceName: service?.name!,
    }
  },

  async upsave(input) {
    const { clinicId, productId, serviceId, rental, rentalPrice } = input

    await prisma.$transaction([
      prisma.serviceInProduct.deleteMany({
        where: { clinicId, productId, serviceId },
      }),
      prisma.serviceInProduct.create({
        data: { clinicId, productId, serviceId, rental, rentalPrice },
      }),
    ])
  },

  async create(input) {
    const result = await prisma.serviceInProduct.create({
      data: {
        clinicId: input.clinicId,
        productId: input.productId,
        serviceId: input.serviceId,
        rental: input.rental,
        rentalPrice: input.rentalPrice,
      },
      include: {
        product: { select: { name: true, price: true, quantity: true } },
        service: { select: { name: true } },
      },
    })

    const { rentalPrice, product, service, ...rest } = result

    return {
      id: rest.id,
      clinicId: rest.clinicId,
      productId: rest.productId,
      serviceId: rest.serviceId,
      rental: rest.rental,
      productPrice: product?.price.toString()!,
      productQuantity: product?.quantity.toString()!,
      rentalPrice: Number(rentalPrice),
      productName: product?.name!,
      serviceName: service?.name!,
    }
  },

  async allService(clinicId: string, serviceId: string) {
    const result = await prisma.serviceInProduct.findMany({
      where: { serviceId, clinicId },
      include: {
        product: {
          select: {
            name: true,
            price: true,
            quantity: true,
          },
        },
        service: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!result) return null

    return result.map(({ product, service, rentalPrice, ...rest }) => ({
      id: rest.id,
      clinicId: rest.clinicId,
      productId: rest.productId,
      serviceId: rest.serviceId,
      rental: rest.rental,
      productPrice: product?.price.toString()!,
      productQuantity: product?.quantity.toString()!,
      rentalPrice: Number(rentalPrice),
      productName: product?.name!,
      serviceName: service?.name!,
    }))
  },

  async first(id: string) {
    const result = await prisma.serviceInProduct.findUnique({
      where: { id },
      include: {
        product: { select: { name: true, price: true, quantity: true } },
        service: { select: { name: true } },
      },
    })

    if (!result) return null

    const { rentalPrice, product, service, ...rest } = result

    return {
      id: rest.id,
      clinicId: rest.clinicId,
      productId: rest.productId,
      serviceId: rest.serviceId,
      rental: rest.rental,
      productPrice: product?.price.toString()!,
      productQuantity: product?.quantity.toString()!,
      rentalPrice: Number(rentalPrice),
      productName: product?.name!,
      serviceName: service?.name!,
    }
  },

  async count(args: Record<string, any>) {
    const { clinicId, serviceId } = args

    const where: Record<string, any> = { clinicId, serviceId }
    const conditions: Record<string, any> = []

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    return prisma.serviceInProduct.count({
      where: { ...where },
    })
  },

  async all(args: Record<string, any>) {
    const { name, clinicId, limit = 15, page = 1 } = args

    const where: Record<string, any> = { clinicId }
    const conditions: Record<string, any> = []

    if (name) conditions.push({ name: { contains: name } })

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const result = await prisma.serviceInProduct.findMany({
      include: {
        product: {
          select: {
            name: true,
            price: true,
            quantity: true,
          },
        },
        service: {
          select: {
            name: true,
          },
        },
      },
      where: { ...where },
      skip: Number((page - 1) * limit),
      take: Number(limit),
    })

    return result.map(({ rentalPrice, product, service, ...rest }) => ({
      id: rest.id,
      clinicId: rest.clinicId,
      productId: rest.productId,
      serviceId: rest.serviceId,
      rental: rest.rental,
      productPrice: product?.price.toString()!,
      productQuantity: product?.quantity.toString()!,
      rentalPrice: Number(rentalPrice),
      productName: product?.name!,
      serviceName: service?.name!,
    }))
  },
}
