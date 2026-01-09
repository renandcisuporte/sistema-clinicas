'use server'

import { getUser } from '@/libs/session'
import { ExpenseProps } from '@/types/expenses'
import { revalidatePath } from 'next/cache'
import { prismaExpenseRepository } from '~/modules/expenses/repositories/prisma/repository/prisma-expense-repository'
import { activeInativeExpenseUseCase } from '~/modules/expenses/use-cases/active-inative-expense-use-case'
import { createExpenseUseCase } from '~/modules/expenses/use-cases/create-expense-use-case'
import { deleteExpenseUseCase } from '~/modules/expenses/use-cases/delete-expense-use-case'
import { findAllExpenseUseCase } from '~/modules/expenses/use-cases/find-all-expense-use-case'
import { typeExpenseUseCase } from '~/modules/expenses/use-cases/type-expense-use-case'
import { updateExpenseUseCase } from '~/modules/expenses/use-cases/update-expense-use-case'

export async function saveExpense(data: ExpenseProps) {
  const session = await getUser()

  if (!session) throw new Error('Não autorizado!')

  if (data.id) {
    const useCase = updateExpenseUseCase({
      repository: prismaExpenseRepository,
    })
    await useCase.execute({
      ...data,
      id: data.id,
      clinicId: session?.clinicId,
    })
    revalidatePath('/(dashboard)/expenses')
    return {
      message: 'Dados editado com sucesso!',
    }
  }

  const useCase = createExpenseUseCase({
    repository: prismaExpenseRepository,
  })
  await useCase.execute({
    ...data,
    clinicId: session?.clinicId,
  })
  revalidatePath('/(dashboard)/expenses')
  return {
    message: 'Dados salvo com sucesso!',
  }
}

export async function removeExpense({ id }: { id: string }) {
  try {
    const session = await getUser()

    if (!session) throw new Error('Não autorizado!')

    const useCase = deleteExpenseUseCase({
      repository: prismaExpenseRepository,
    })

    await useCase.execute({ id })

    revalidatePath('/(dashboard)/expenses')

    return {
      message: 'Dados removido com sucesso!',
    }
  } catch (err) {
    throw err
  }
}

export async function activeInativeExpense({ id }: { id: string }) {
  try {
    const session = await getUser()

    if (!session) throw new Error('Não autorizado!')

    revalidatePath('/(dashboard)/expenses')

    const useCase = activeInativeExpenseUseCase({
      repository: prismaExpenseRepository,
    })

    await useCase.execute({ id })
  } catch (err) {
    throw err
  }
}

export async function typesExpense(id: string): Promise<void> {
  try {
    const session = await getUser()

    if (!session) throw new Error('Não autorizado!')

    revalidatePath('/(dashboard)/expenses')

    const useCase = typeExpenseUseCase({
      repository: prismaExpenseRepository,
    })

    await useCase.execute({ id })
  } catch (err) {
    throw err
  }
}

export async function loadExpenses(args: any) {
  const session = await getUser()
  if (!session) throw new Error('Não authorizado')

  const { description = '', active, type, limit = 15, page = 1 } = args

  const useCase = findAllExpenseUseCase({
    repository: prismaExpenseRepository,
  })

  const response = useCase.execute({
    clinicId: session?.clinicId!,
    description,
    active,
    type,
    limit,
    page,
  })

  return response
}
