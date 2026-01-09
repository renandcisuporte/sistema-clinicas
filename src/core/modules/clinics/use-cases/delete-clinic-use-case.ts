import { ClinicRepository } from '~/modules/clinics/repositories/clinic-repository'

type Output = void

type Dependencies = { repository: ClinicRepository }

export const deleteClinicUseCase = ({ repository }: Dependencies) => {
  return {
    async execute(id: string): Promise<Output> {
      await repository.delete(id)
    },
  }
}
