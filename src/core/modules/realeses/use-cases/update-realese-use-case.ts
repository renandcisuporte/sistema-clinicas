import { InputRealese } from '~/modules/realeses/dtos/input-realese'
import { OutputRealese } from '~/modules/realeses/dtos/output-realese'
import { RealeseRepository } from '~/modules/realeses/repositories/realese-repository'

type Input = {
  id: string
  input: InputRealese
}

type Output = {
  data: OutputRealese
}

type Dependencies = {
  repository: RealeseRepository
}

export const updateRealeseUseCase = ({ repository }: Dependencies) => {
  return {
    async execute({ id, input }: Input): Promise<Output> {
      const result = await repository.update(id, input)

      return { data: result }
    },
  }
}
