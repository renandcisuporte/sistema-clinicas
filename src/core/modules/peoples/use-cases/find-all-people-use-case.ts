import { OutputPeople } from '~/modules/peoples/dtos/output-people'
import { PeopleRepository } from '~/modules/peoples/repositories/people-repository'

type Input = Record<string, string | string[] | number | undefined>

type Output = { data: OutputPeople[]; total: number; page: number }

type Dependences = { repository: PeopleRepository }

export const findAllPeopleUseCase = ({ repository }: Dependences) => {
  return {
    async execute(input: Input): Promise<Output> {
      const {
        clinicId,
        full_name = '',
        document = '',
        limit = 15,
        page = 1,
      } = input

      const [total, data] = await Promise.all([
        repository.count({ clinicId, full_name, document }),
        repository.findAll({ clinicId, full_name, document, limit, page }),
      ])

      return {
        page: +page,
        total,
        data,
      }
    },
  }
}
