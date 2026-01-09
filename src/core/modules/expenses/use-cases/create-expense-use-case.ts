import { CreateExpense } from '~/modules/expenses/dtos/create-expense'
import { OutputExpense } from '~/modules/expenses/dtos/output-expense'
import { ExpenseRepository } from '~/modules/expenses/repositories/expense-repository'

type Input = CreateExpense

type Output = {
  data: OutputExpense
}

type Dependencies = {
  repository: ExpenseRepository
}

export const createExpenseUseCase = ({ repository }: Dependencies) => {
  return {
    async execute(input: Input): Promise<Output> {
      const result = await repository.create(input)

      return { data: result }
    },
  }
}
