'use server'

import { getUser } from '@/libs/session'
import { Clinic } from '@/types/clinics'
import { revalidatePath } from 'next/cache'
import { prismaClinicRepository } from '~/modules/clinics/repositories/prisma/repository/prisma-clinic-repository'
import { createClinicUseCase } from '~/modules/clinics/use-cases/create-clinic-use-case'
import { deleteClinicUseCase } from '~/modules/clinics/use-cases/delete-clinic-use-case'
import { findAllClinicUseCase } from '~/modules/clinics/use-cases/find-all-clinic-use-case'
import { findFirstClinicWorkTimeUseCase } from '~/modules/clinics/use-cases/find-first-clinic-work-use-case'
import { updateClinicUseCase } from '~/modules/clinics/use-cases/update-clinic-use-case'
import { prismaWorkTimeRepository } from '~/modules/work-times/repositories/prisma/repository/prisma-work-time-repository'

export async function saveClinic(form: Clinic) {
  const session = await getUser()
  if (!session) throw new Error('Não autorizado')

  const payload = {
    clinicId: form.clinicId ?? null,
    fantasy: form.fantasy,
    title: form.title,
    number: form.number ?? null,
    cnpj: form.cnpj,
    ie: form.ie,
    phone: form.phone ?? null,
    mobilePhone: form.mobilePhone ?? null,
    averageService: form.averageService ?? null,
    address: form.address ?? null,
    neighborhood: form.neighborhood ?? null,
    complement: form.complement ?? null,
    reference: form.reference ?? null,
    city: form.city ?? null,
    state: form.state ?? null,
    zipCode: form.zipCode ?? null,
  }

  const repository = prismaClinicRepository

  if (form.id) {
    const useCase = updateClinicUseCase({ repository })
    await useCase.execute({ ...payload, id: form.id })
    revalidatePath('/(dashboard)/clinics')
    return {
      message: 'Editado com sucesso!',
    }
  }

  const useCase = createClinicUseCase({ repository })
  await useCase.execute(payload)
  revalidatePath('/(dashboard)/clinics')
  return {
    message: 'Cadastrado com sucesso!',
  }
}

export async function removeClinic({ id }: { id: string }): Promise<any> {
  const session = await getUser()
  if (!session) throw new Error('Não autorizado')

  const repository = prismaClinicRepository

  const useCase = deleteClinicUseCase({ repository })
  await useCase.execute(id)
  revalidatePath('/(dashboard)/clinics')
  return {
    message: 'Removido com sucesso!',
  }
}

export async function findClinics(id: string) {
  const session = await getUser()
  if (!session) throw new Error('Não authorizado')

  const useCase = findFirstClinicWorkTimeUseCase({
    clinicRepo: prismaClinicRepository,
    workTimeRepo: prismaWorkTimeRepository,
  })

  const response = useCase.execute(id)

  return response
}

export async function loadClinics(args: any) {
  const session = await getUser()
  if (!session) throw new Error('Não authorizado')

  const { title = '', cnpj = '', limit = 15, page = 1 } = args

  const useCase = findAllClinicUseCase({
    repository: prismaClinicRepository,
  })

  const response = useCase.execute({
    clinicId: session?.clinicId!,
    fantasy: title,
    cnpj,
    limit,
    page,
  })

  return response
}
