import { OutputRealese } from '~/modules/realeses/dtos/output-realese'
import { RealeseRepository } from '~/modules/realeses/repositories/realese-repository'

type Input = {
  id: string
}

type Output = {
  data: OutputRealese | null
}

type Dependencies = {
  repository: RealeseRepository
}

export const findFirstRealeseUseCase = ({ repository }: Dependencies) => {
  return {
    async execute({ id }: Input): Promise<Output> {
      const result = await repository.first(id)
      return {
        data: result,
      }
    },
  }
}
