import { OutputExpense } from '~/modules/expenses/dtos/output-expense'
import { ExpenseRepository } from '~/modules/expenses/repositories/expense-repository'

type Input = {
  clinicId: string
  description?: string
  active?: boolean
  type?: 'fixed' | 'variable'
  limit?: number
  page?: number
}

type Output = {
  total: number
  active: number
  inative: number
  fixed: number
  variable: number
  data: OutputExpense[]
}

type Dependencies = {
  repository: ExpenseRepository
}

export const findAllExpenseUseCase = ({ repository }: Dependencies) => {
  return {
    async execute(input: Input): Promise<Output> {
      const {
        clinicId,
        description = '',
        active,
        type,
        limit = 2000,
        page = 1,
      } = input

      const [allCount, allData, totalData] = await Promise.all([
        repository.all({ clinicId }),
        repository.all({
          clinicId,
          description,
          active,
          type,
          limit,
          page,
        }),
        repository.count({
          clinicId,
          description,
          active,
          type,
        }),
      ])

      const [fixedData, variableData, activeData, inativeData] =
        allCount.reduce(
          (acc, item) => {
            const { type, active } = item
            if (type === 'fixed' && active) acc[0]++
            if (type === 'variable' && active) acc[1]++
            if (active) acc[2]++
            if (!active) acc[3]++

            return acc
          },
          [0, 0, 0, 0],
        )

      return {
        fixed: fixedData,
        variable: variableData,
        active: activeData,
        inative: inativeData,
        total: totalData,
        data: allData,
      }
    },
  }
}
