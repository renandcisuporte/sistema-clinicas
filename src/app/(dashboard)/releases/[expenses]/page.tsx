import { getUser } from '@/libs/session'
import { unstable_cache } from 'next/cache'
import { prismaExpenseRepository } from '~/modules/expenses/repositories/prisma/repository/prisma-expense-repository'
import { findAllExpenseUseCase } from '~/modules/expenses/use-cases/find-all-expense-use-case'
import { prismaRealeseRepository } from '~/modules/realeses/repositories/prisma/repository/prisma-realese-repository'
import { findAllRealeseUseCase } from '~/modules/realeses/use-cases/find-all-realese-use-case'
import { FormExpenseFixedClient } from '../components/form-expense-fixed-client'
import { FormExpenseVariableClient } from '../components/form-expense-variable-client'

type Props = {
  params: Promise<{ expenses: string }>
}

type CacheProps = {
  type: 'fixed' | 'variable'
  clinicId: string
}

const getData = unstable_cache(
  async ({ type, clinicId }: CacheProps) => {
    const useCaseExpense = findAllExpenseUseCase({
      repository: prismaExpenseRepository,
    })

    const useCaseRealese = findAllRealeseUseCase({
      repository: prismaRealeseRepository,
    })

    const [expense, realese] = await Promise.all([
      useCaseExpense.execute({
        clinicId,
        active: true,
        type,
      }),
      useCaseRealese.execute({
        clinicId,
        type,
      }),
    ])

    return { expense, realese }
  },
  ['expense', 'realese'],
)

export const metadata = {
  title: 'Lançamentos - Fixas/Variadas',
}

export default async function Page({ params }: Props) {
  const session = await getUser()

  if (!session) return <h1>Não autorizado</h1>

  const { expenses } = (await params) as { expenses: 'fixed' | 'variable' }

  const { expense, realese } = await getData({
    type: expenses,
    clinicId: session.clinicId,
  })

  if (expenses === 'fixed') {
    return (
      <FormExpenseFixedClient expenses={expense.data} realeses={realese.data} />
    )
  }

  if (expenses === 'variable') {
    return (
      <FormExpenseVariableClient
        expenses={expense.data}
        realeses={realese.data}
      />
    )
  }

  return <>Selecione os tipo um tipo de lançamento</>
}
