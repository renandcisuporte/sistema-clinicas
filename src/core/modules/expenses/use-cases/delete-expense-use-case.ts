import { ExpenseRepository } from '~/modules/expenses/repositories/expense-repository'

type Input = {
  id: string
}

type Dependencies = {
  repository: ExpenseRepository
}

export const deleteExpenseUseCase = ({ repository }: Dependencies) => {
  return {
    async execute({ id }: Input): Promise<void> {
      await repository.delete(id)
    },
  }
}
