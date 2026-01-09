import { ExpenseRepository } from '~/modules/expenses/repositories/expense-repository'

type Input = {
  id: string
}

type Dependencies = {
  repository: ExpenseRepository
}

export const typeExpenseUseCase = ({ repository }: Dependencies) => {
  return {
    async execute({ id }: Input): Promise<unknown> {
      await repository.activeInativeTypes(id)
      return { data: { message: 'Atualizado com sucesso!' } }
    },
  }
}
