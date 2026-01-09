import { ExpenseRepository } from '~/modules/expenses/repositories/expense-repository'

type Input = {
  id: string
}

type Output = {
  data: {
    message: string
  }
}

type Dependencies = {
  repository: ExpenseRepository
}

export const activeInativeExpenseUseCase = ({ repository }: Dependencies) => {
  return {
    async execute({ id }: Input): Promise<Output> {
      await repository.activeInative(id)

      return { data: { message: 'Atualizado com sucesso!' } }
    },
  }
}
