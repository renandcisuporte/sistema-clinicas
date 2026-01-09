'use server'

import { getUser } from '@/libs/session'
import { ServiceProduct } from '@/types/services-in-products'
import { revalidatePath } from 'next/cache'
import { prismaServiceInProductRepository } from '~/modules/services-in-products/repositories/prisma/repository/service-in-product-repository'
import { createServiceInProductUseCase } from '~/modules/services-in-products/use-cases/create-service-in-product-use-case'
import { deleteServiceInProductUseCase } from '~/modules/services-in-products/use-cases/delete-service-in-product-use-case'

export async function saveServiceInProduct(formData: ServiceProduct) {
  try {
    const session = await getUser()

    if (!session) throw new Error('Não autorizado!')

    const filteredInputs = formData.services
      .filter((item) => item.checked)
      .map((item) => ({
        clinicId: session.clinicId!,
        serviceId: item.serviceId!,
        productId: item.productId!,
        rental: item.rental!,
        rentalPrice: item.rentalPrice!,
      }))

    const useCase = createServiceInProductUseCase({
      repository: prismaServiceInProductRepository,
    })

    await useCase.execute(filteredInputs)

    revalidatePath('/(dashboard)/services', 'page')

    return {
      message: 'Salvo com sucesso!',
    }
  } catch (err) {
    throw err
  }
}

export async function removeServiceInProduct({ id }: { id: string }) {
  try {
    const session = await getUser()

    if (!session) throw new Error('Não autorizado!')

    const useCase = deleteServiceInProductUseCase({
      repository: prismaServiceInProductRepository,
    })

    await useCase.execute({ id })

    revalidatePath('/(dashboard)/services', 'page')

    return {
      message: 'Removido com sucesso!',
    }
  } catch (err) {
    throw err
  }
}
