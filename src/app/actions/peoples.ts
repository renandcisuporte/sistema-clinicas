'use server'

import { getUser } from '@/libs/session'

import { People } from '@/types/peoples'
import { revalidatePath } from 'next/cache'
import { prismaPeopleRepository } from '~/modules/peoples/repositories/prisma/repository/prisma-people-repository'
import { activeInativePeopleUseCase } from '~/modules/peoples/use-cases/active-inative-people-use-case'
import { createPeopleUseCase } from '~/modules/peoples/use-cases/create-people-use-case'
import { deletePeopleUseCase } from '~/modules/peoples/use-cases/delete-people-use-case'
import { findAllPeopleUseCase } from '~/modules/peoples/use-cases/find-all-people-use-case'
import { updatePeopleUseCase } from '~/modules/peoples/use-cases/update-people-use-case'

export async function savePeople(form: People) {
  try {
    const session = await getUser()

    if (!session) throw new Error('Não autorizado!')

    const { dateOfBirth, phones, ...data } = form

    if (data.id) {
      const useCase = updatePeopleUseCase({
        repository: prismaPeopleRepository,
      })

      await useCase.execute({
        ...data,
        id: data?.id!,
        clinicId: session?.clinicId!,
        phones: JSON.stringify(phones),
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      })

      revalidatePath('/(dashboard)/peoples')
      return {
        message: 'Dados editado com sucesso!',
      }
    }

    const useCase = createPeopleUseCase({
      repository: prismaPeopleRepository,
    })

    await useCase.execute({
      ...data,
      clinicId: session?.clinicId!,
      phones: JSON.stringify(phones),
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
    })

    revalidatePath('/(dashboard)/peoples')
    return {
      message: 'Dados cadastrado com sucesso!',
    }
  } catch (err) {
    throw err
  }
}

export async function removePeople({ id }: { id: string }) {
  try {
    const session = await getUser()

    if (!session) throw new Error('Não autorizado!')

    const useCase = deletePeopleUseCase({
      repository: prismaPeopleRepository,
    })

    await useCase.execute({
      id,
    })

    revalidatePath('/(dashboard)/peoples')
    return {
      message: 'Removido com sucesso!',
    }
  } catch (err) {
    throw err
  }
}

export async function activeInativePeople(id: string) {
  try {
    const session = await getUser()

    if (!session) throw new Error('Não autorizado!')

    const useCase = activeInativePeopleUseCase({
      repository: prismaPeopleRepository,
    })

    await useCase.execute({ id })

    revalidatePath('/(dashboard)/peoples')
    return {
      message: 'Removido com sucesso!',
    }
  } catch (err) {
    throw err
  }
}

export async function loadPeoples(args: any) {
  try {
    const session = await getUser()

    if (!session) throw new Error('Não authorizado')

    const { full_name = '', limit = 15, page = 1 } = args

    const useCase = findAllPeopleUseCase({
      repository: prismaPeopleRepository,
    })

    const result = useCase.execute({ full_name, limit, page })

    return result
  } catch (err) {
    throw err
  }
}
