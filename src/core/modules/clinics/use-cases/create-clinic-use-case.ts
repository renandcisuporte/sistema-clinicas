import { CreateClinic } from '~/modules/clinics/dtos/create-clinic'
import { OutputClinic } from '~/modules/clinics/dtos/output-clinic'
import { ClinicRepository } from '~/modules/clinics/repositories/clinic-repository'
import { codeClinicId } from '~/shared/utils'

type Input = CreateClinic

type Output = OutputClinic

type Dependencies = { repository: ClinicRepository }

export const createClinicUseCase = ({ repository }: Dependencies) => {
  return {
    async execute(input: Input): Promise<Output> {
      const code = codeClinicId()
      const { clinicId, ...rest } = input

      const result = await repository.save({ clinicId: code, ...rest })

      return { data: result }
    },
  }
}
