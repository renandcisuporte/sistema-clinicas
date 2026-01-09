import { RealeseRepository } from '~/modules/realeses/repositories/realese-repository'

type Types = {
  [expenseId: string]: {
    [date: string]: { price: number }
  }
}

type Input = {
  clinicId: string
  type: string
}

type Output = {
  total: number
  data: Types
}

type Dependencies = {
  repository: RealeseRepository
}

export const findAllRealeseUseCase = ({ repository }: Dependencies) => {
  return {
    async execute(args: Input): Promise<Output> {
      const { clinicId, type } = args
      const common = { clinicId, type }

      const [total, data] = await Promise.all([
        repository.count({ clinicId, type }),
        repository.all(common),
      ])

      const result: Types = {}
      for (const key in data) {
        const { date, expenseId, price } = data[key]

        const formattedDate = date.toISOString().split('T')[0]

        if (!result[expenseId!]) result[expenseId!] = {}

        result[expenseId!][formattedDate] = {
          price: Number(price),
        }
      }

      // Ordena as datas para cada expenseId
      for (const expenseId in result) {
        const dates = Object.keys(result[expenseId]).sort((a, b) => {
          return new Date(a).getTime() - new Date(b).getTime()
        })

        // Reorganiza as entradas em ordem de data
        result[expenseId] = dates.reduce((sorted: any, date) => {
          sorted[date] = result[expenseId][date]
          return sorted
        }, {})
      }

      return {
        total,
        data: result,
      }
    },
  }
}
