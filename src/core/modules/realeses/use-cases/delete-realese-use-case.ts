import { RealeseRepository } from '~/modules/realeses/repositories/realese-repository'

type Input = {
  id: string
}

type Dependencies = {
  repository: RealeseRepository
}

export const deleteRealeseUseCase = ({ repository }: Dependencies) => {
  return {
    async execute({ id }: Input): Promise<void> {
      await repository.delete(id)
    },
  }
}
