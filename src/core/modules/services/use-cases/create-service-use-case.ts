import { CreateService } from '../dtos/create-service'
import { OutputService } from '../dtos/output-service'
import { ServicesRepository } from '../repositories/service-repository'

type Input = CreateService

type Output = { data: OutputService }

type Dependences = { repository: ServicesRepository }

export const createServiceUseCase = ({ repository }: Dependences) => {
  return {
    async execute(data: Input): Promise<Output> {
      const result = await repository.create(data)

      return { data: result }
    },
  }
}
