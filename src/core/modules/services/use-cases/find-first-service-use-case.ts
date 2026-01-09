import { OutputService } from '../dtos/output-service'
import { ServicesRepository } from '../repositories/service-repository'

type Output = {
  data: OutputService | null
}

export class FindFirstServiceUseCase implements FindFirstServiceUseCaseInterface {
  constructor(protected readonly repository: ServicesRepository) {}

  async execute(id: string): Promise<Output> {
    const result = await this.repository.first(id)

    return {
      data: result,
    }
  }
}

export interface FindFirstServiceUseCaseInterface {
  execute(id: string): Promise<Output>
}
