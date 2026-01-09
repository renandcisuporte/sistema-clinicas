import { OutputExpense } from '~/modules/expenses/dtos/output-expense'
import { ExpenseRepository } from '~/modules/expenses/repositories/expense-repository'

type Input = {
  id: string
}

type Output = {
  data: OutputExpense | null
}

type Dependencies = {
  repository: ExpenseRepository
}

export const findFirstExpenseUseCase = ({ repository }: Dependencies) => {
  return {
    async execute({ id }: Input): Promise<Output> {
      const result = await repository.first(id)
      return {
        data: result,
      }
    },
  }
}
