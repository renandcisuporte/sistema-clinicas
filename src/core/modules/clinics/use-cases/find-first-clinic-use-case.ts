import { OutputClinic } from '~/modules/clinics/dtos/output-clinic'
import { ClinicRepository } from '~/modules/clinics/repositories/clinic-repository'

type Input = string

type Output = OutputClinic

type Dependencies = { repository: ClinicRepository }

export const findFirstClinicUseCase = ({ repository }: Dependencies) => {
  return {
    async execute(id: Input): Promise<Output> {
      const result = await repository.findFirst(id)

      if (!result) return { data: null }

      return { data: result }
    },
  }
}
