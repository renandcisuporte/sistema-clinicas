import { OutputPaginateClinic } from '~/modules/clinics/dtos/output-paginate-clinic'
import { ClinicRepository } from '~/modules/clinics/repositories/clinic-repository'
import { SearchClinic } from '../dtos/search-clinic'

type Input = SearchClinic

type Output = OutputPaginateClinic

type Dependencies = { repository: ClinicRepository }

export const findAllClinicUseCase = ({ repository }: Dependencies) => {
  return {
    async execute({
      page,
      limit,
      clinicId,
      cnpj,
      fantasy,
      title,
    }: Input): Promise<Output> {
      const { total, data } = await repository.findAll({
        page,
        limit,
        clinicId,
        cnpj,
        fantasy,
        title,
      })

      return {
        data,
        total,
      }
    },
  }
}
