import { ClinicRepository } from '../repositories/clinic-repository'

type Output = { data: string }

type Dependencies = {
  repository: ClinicRepository
}

export const averageServiceClinicUseCase = ({ repository }: Dependencies) => {
  return {
    async execute(id: string, time: string): Promise<Output> {
      const result = await repository.averageService(id, time)

      return { data: result }
    },
  }
}
