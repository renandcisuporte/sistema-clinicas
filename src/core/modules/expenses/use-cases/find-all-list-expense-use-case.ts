import { OutputExpense } from '~/modules/expenses/dtos/output-expense'
import { ExpenseRepository } from '~/modules/expenses/repositories/expense-repository'

type Input = {
  clinicId: string
  active?: string
  type?: string
}

type Output = {
  data: OutputExpense[]
}

export const findAllListExpenseUseCase = ({
  repository,
}: {
  repository: ExpenseRepository
}) => {
  return {
    async execute(args: Input): Promise<Output> {
      const { clinicId, active, type } = args

      const data = await repository.all({
        clinicId,
        active,
        type,
        limit: 1001,
      })

      return {
        data,
      }
    },
  }
}
