'use server'

import { getUser } from '@/libs/session'
import { Product } from '@/types/products'
import { revalidatePath } from 'next/cache'
import { prismaProductRepository } from '~/modules/products/repositories/prisma/repository/product-repository'
import { createProductUseCase } from '~/modules/products/use-cases/create-product-use-case'
import { findAllProductUseCase } from '~/modules/products/use-cases/find-all-product-use-case'
import { updateProductUseCase } from '~/modules/products/use-cases/update-product-use-case'

export async function saveProduct(form: Product) {
  const session = await getUser()
  if (!session) throw new Error('Não autorizado!')

  const payload = {
    name: form.name,
    price: form.price,
    quantity: form.quantity,
    clinicId: session.clinicId,
  }

  const repository = prismaProductRepository

  if (form.id) {
    const useCase = updateProductUseCase({
      repository,
    })

    await useCase.execute(form.id, payload)

    revalidatePath('/(dashboard)/products')
    return {
      message: 'Dados editado com sucesso!',
    }
  }

  const useCase = createProductUseCase({
    repository,
  })

  await useCase.execute(payload)

  revalidatePath('/(dashboard)/products')
  return {
    message: 'Dados cadastrado com sucesso!',
  }
}

export async function removeProduct(
  _state: any,
  formData: FormData,
): Promise<any> {
  // const session = await getServerSession(authOptions)
  // const form = Object.fromEntries(formData)
  // const { id } = form
  // await apiFecth(`/products/${id}`, {
  //   method: "DELETE",
  //   accessToken: session?.accessToken,
  // })
  // revalidateTag("products")
  // return {
  //   data: null,
  //   errorMessage: "OK",
  // }
}

export async function loadProduct(args: any) {
  const session = await getUser()
  if (!session) throw new Error('Não authorizado')

  const { name = '', limit = 15, page = 1 } = args

  const useCase = findAllProductUseCase({
    repository: prismaProductRepository,
  })

  const result = useCase.execute({
    clinicId: session.clinicId,
    name,
    limit,
    page,
    nameAsc: 'true',
  })

  return result
}
