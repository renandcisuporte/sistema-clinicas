'use server'

import { getUser } from '@/libs/session'
import { prismaServiceInProductRepository } from '~/modules/services-in-products/repositories/prisma/repository/service-in-product-repository'
import { findAllServiceInProductUseCase } from '~/modules/services-in-products/use-cases/find-all-service-in-product-use-case'

export async function saveService(_: any, formData: FormData) {
  // const session = await getServerSession(authOptions)
  // const api = {
  //   accessToken: session?.accessToken,
  //   method: 'POST',
  //   url: '/services',
  //   body: '',
  // }
  // const form = dataToJson(formData)
  // const { id, ...restform } = form
  // api.body = JSON.stringify({ ...restform })
  // if (id) {
  //   api.url = `/services/${form?.id}`
  //   api.method = 'PUT'
  // }
  // const { url, ...restApi } = api
  // const result = await apiFecth(url, {
  //   ...restApi,
  // })
  // revalidateTag('services')
  // return {
  //   ...result,
  //   errorMessage: result.errorMessage ?? 'OK',
  // }
}

export async function removeServiceInProduct(
  _state: any,
  formData: FormData,
): Promise<any> {
  // const session = await getServerSession(authOptions)
  // const form = Object.fromEntries(formData)
  // const { id } = form
  // await apiFecth(`/services/${id}`, {
  //   method: 'DELETE',
  //   accessToken: session?.accessToken,
  // })
  // revalidateTag('services')
  // return {
  //   data: null,
  //   errorMessage: 'OK',
  // }
}

export async function loadServicesInProducts(serviceId: string) {
  try {
    const session = await getUser()

    if (!session) throw new Error('Não authorizado')

    const useCase = findAllServiceInProductUseCase({
      repository: prismaServiceInProductRepository,
    })

    const result = useCase.execute({
      clinicId: session.clinicId,
      serviceId,
    })

    return result
  } catch (err) {
    throw err
  }
}
