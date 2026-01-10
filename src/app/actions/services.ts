'use server'

import { getUser } from '@/libs/session'
import { Service } from '@/types/services'
import { revalidatePath } from 'next/cache'
import { prismaServiceInProductRepository } from '~/modules/services-in-products/repositories/prisma/repository/service-in-product-repository'
import { prismaServiceRepository } from '~/modules/services/repositories/prisma/repository/service-repository'
import { createServiceUseCase } from '~/modules/services/use-cases/create-service-use-case'
import { deleteServiceUseCase } from '~/modules/services/use-cases/delete-service-use-case'
import { findAllServiceUseCase } from '~/modules/services/use-cases/find-all-service-use-case'
import { updateServiceUseCase } from '~/modules/services/use-cases/update-service-use-case'

export async function saveService(data: Service) {
  try {
    const session = await getUser()

    if (!session) throw new Error('Não autorizado!')

    if (data.id) {
      const useCase = updateServiceUseCase({
        repository: prismaServiceRepository,
      })

      await useCase.execute({
        ...data,
        id: data?.id!,
        clinicId: session?.clinicId!,
      })

      revalidatePath('/(dashboard)/services')
      return {
        message: 'Dados editado com sucesso!',
      }
    }

    const useCase = createServiceUseCase({
      repository: prismaServiceRepository,
    })

    await useCase.execute({
      ...data,
      clinicId: session?.clinicId!,
    })

    revalidatePath('/(dashboard)/services')
    return {
      message: 'Dados cadastrado com sucesso!',
    }
  } catch (err) {
    throw err
  }
}

export async function removeService({ id }: { id: string }): Promise<any> {
  try {
    const session = await getUser()

    if (!session) throw new Error('Não autorizado!')

    const useCase = deleteServiceUseCase({
      repository: prismaServiceRepository,
    })

    await useCase.execute({ id })

    revalidatePath('/(dashboard)/services')
    return {
      message: 'Dados cadastrado com sucesso!',
    }
  } catch (err) {
    throw err
  }
}

export async function loadServices(args: any) {
  try {
    const session = await getUser()
    if (!session) throw new Error('Não authorizado')

    const { name = '', limit = 15, page = 1 } = args

    const useCase = findAllServiceUseCase({
      repository: prismaServiceRepository,
      serviceInProduct: prismaServiceInProductRepository,
    })

    const result = useCase.execute({
      name,
      limit,
      page,
      clinicId: session.clinicId,
    })

    return result
  } catch (err) {
    throw err
  }
}
