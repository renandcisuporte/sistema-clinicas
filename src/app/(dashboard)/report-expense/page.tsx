import { getUser } from '@/libs/session'
import { notFound } from 'next/navigation'
import { prismaExpenseRepository } from '~/modules/expenses/repositories/prisma/repository/prisma-expense-repository'
import { findAllExpenseUseCase } from '~/modules/expenses/use-cases/find-all-expense-use-case'
import { PageClient } from './page-client'

export default async function Page() {
  const session = await getUser()
  if (!session) notFound()

  const useCase = findAllExpenseUseCase({
    repository: prismaExpenseRepository,
  })

  const result = await useCase.execute({
    clinicId: session.clinicId,
    limit: 4000,
  })

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Relatório de Despesas</h1>
      <PageClient data={result.data} />
    </div>
  )
}
