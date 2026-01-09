import { OutputExpense } from '~/modules/expenses/dtos/output-expense'
import { UpdateExpense } from '~/modules/expenses/dtos/update-expense'
import { ExpenseRepository } from '~/modules/expenses/repositories/expense-repository'

type Input = UpdateExpense

type Output = {
  data: OutputExpense
}

type Dependencies = {
  repository: ExpenseRepository
}

export const updateExpenseUseCase = ({ repository }: Dependencies) => {
  return {
    async execute(data: Input): Promise<Output> {
      const { id, ...input } = data
      const result = await repository.update(id, input)

      return { data: result }
    },
  }
}
