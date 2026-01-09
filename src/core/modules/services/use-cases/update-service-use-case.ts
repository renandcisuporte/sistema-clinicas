import { OutputService } from '../dtos/output-service'
import { UpdateService } from '../dtos/update-service'
import { ServicesRepository } from '../repositories/service-repository'

type Input = UpdateService

type Output = { data: OutputService }

type Dependences = { repository: ServicesRepository }

export const updateServiceUseCase = ({ repository }: Dependences) => {
  return {
    async execute({ id, ...input }: Input): Promise<Output> {
      const result = await repository.update(id, input)

      return { data: result }
    },
  }
}
