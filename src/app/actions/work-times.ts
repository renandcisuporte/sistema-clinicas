'use server'

import { getUser } from '@/libs/session'
import { Clinic } from '@/types/clinics'
import { FormValues } from '@/types/work-times'
import { revalidatePath } from 'next/cache'
import { prismaClinicRepository } from '~/modules/clinics/repositories/prisma/repository/prisma-clinic-repository'
import { averageServiceClinicUseCase } from '~/modules/clinics/use-cases/average-service-clinic-use-case'
import { prismaWorkTimeRepository } from '~/modules/work-times/repositories/prisma/repository/prisma-work-time-repository'
import { updateWorkTimeRecommendedUseCase } from '~/modules/work-times/use-cases/update-work-time-recommended-use-case'
import { updateWorkTimeUseCase } from '~/modules/work-times/use-cases/update-work-time-use-case'

export async function saveWorkTime(form: FormValues) {
  const session = await getUser()
  if (!session) throw new Error('Não autorizado!')

  const useCase = updateWorkTimeUseCase({
    repository: prismaWorkTimeRepository,
  })

  await useCase.execute({
    clinicId: session.clinicId,
    input: form.worktimes.map((item) => ({
      ...item,
      id: item.id ?? '',
      clinicId: session.clinicId,
      times: JSON.stringify(item.times),
    })),
  })

  revalidatePath('/(dashboard)/jobs-works')

  return {
    message: 'Salvo com sucesso!',
  }
}

export async function saveWorkTimeRecommended(form: FormValues) {
  const session = await getUser()
  if (!session) throw new Error('Não autorizado!')

  const useCase = updateWorkTimeRecommendedUseCase({
    repository: prismaWorkTimeRepository,
  })

  await useCase.execute({
    clinicId: session.clinicId,
    input: form.worktimes.map((item) => ({
      ...item,
      id: item.id ?? '',
      clinicId: session.clinicId,
      times: JSON.stringify(item.times),
    })),
  })

  revalidatePath('/(dashboard)/jobs-works')

  return {
    message: 'Salvo com sucesso!',
  }
}

export async function saveWorkTimeService(
  _: any,
  formData: FormData,
): Promise<any> {
  // const session = {}
  // for (let [key, value] of formData.entries()) {
  //   const keys = key.match(/[^[\]]+/g) as string[]
  //   keys.reduce((acc: Record<string, any>, curr: string, index: number) => {
  //     acc[curr] = acc[curr] || (isMatch(keys[index + 1]) ? {} : [])
  //     let isLast = index === keys.length - 1
  //     if (isLast) acc[curr] = value
  //     return acc[curr]
  //   }, formObject)
  // }
  // const { id, ...restform } = formObject
  // const api = {
  //   accessToken: session?.accessToken,
  //   method: 'PUT',
  //   url: `/clinics/${id}/works-service`,
  //   body: '',
  // }
  // api.body = JSON.stringify(Object.values(restform))
  // const { url, ...restApi } = api
  // const result = {}
  // revalidateTag('clinics-works')
  // console.log(Object.values(restform))
  // return {
  //   ...result,
  //   errorMessage: result.errorMessage ?? 'OK',
  // }
}

export async function saveAverageTimeService({ averageService }: Clinic) {
  const session = await getUser()
  if (!session) throw new Error('Não autorizado!')

  const useCase = averageServiceClinicUseCase({
    repository: prismaClinicRepository,
  })

  await useCase.execute(session.clinicId, averageService!)

  revalidatePath('/(dashboard)/jobs-works')

  return {
    message: 'Salvo com sucesso!',
  }
}
