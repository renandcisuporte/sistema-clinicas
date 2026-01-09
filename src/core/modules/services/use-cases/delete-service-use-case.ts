import { ServicesRepository } from '../repositories/service-repository'

type Input = { id: string }

type Dependences = { repository: ServicesRepository }

export const deleteServiceUseCase = ({ repository }: Dependences) => {
  return {
    async execute({ id }: Input): Promise<void> {
      await repository.delete(id)
    },
  }
}
