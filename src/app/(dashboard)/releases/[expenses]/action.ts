'use server'

import { getUser } from '@/libs/session'
import { revalidatePath, revalidateTag } from 'next/cache'
import { prismaRealeseRepository } from '~/modules/realeses/repositories/prisma/repository/prisma-realese-repository'
import { createRealeseUseCase } from '~/modules/realeses/use-cases/create-realese-use-case'
import { RealeseFormData } from './types'

export async function actionRelease(formData: RealeseFormData) {
  try {
    const session = await getUser()

    if (!session) throw new Error('Não autorizado')

    const useCaseRealese = createRealeseUseCase({
      repository: prismaRealeseRepository,
    })

    const realeses = { ...formData.realeses }
    await useCaseRealese.execute({
      clinicId: session.clinicId,
      realeses,
    })

    revalidateTag('releases')
    revalidatePath('/(dashboard)/releases/[expenses]', 'page')
  } catch (error) {
    console.log('[AUTH LOGIN] Error: ', error)
    throw error
  }

  return {
    message: 'Dados salvo com sucesso!',
  }
}
