import { InputRealeseUpSave } from '~/modules/realeses/dtos/input-realese-up-save'
import { RealeseRepository } from '~/modules/realeses/repositories/realese-repository'
import { priceFormatted } from '~/shared/utils'

type Input = InputRealeseUpSave

type Output = {
  data: string
}

type Dependencies = {
  repository: RealeseRepository
}

export const createRealeseUseCase = ({ repository }: Dependencies) => {
  return {
    async execute(input: Input): Promise<Output> {
      const { clinicId, realeses } = input

      for (const expenseId in realeses) {
        for (const date in realeses[expenseId]) {
          const { price } = realeses[expenseId][date]

          const priceFormatter = priceFormatted(price)
          if (priceFormatter <= 0) continue

          await repository.upsave({
            clinicId,
            expenseId,
            date: new Date(date),
            price: priceFormatter,
          })
        }
      }

      return { data: 'ok' }
    },
  }
}
