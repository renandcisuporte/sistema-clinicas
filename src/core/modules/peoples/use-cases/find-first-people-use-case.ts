import { OutputPeople } from '../dtos/output-people'
import { PeopleRepository } from '../repositories/people-repository'

type Input = string

type Output = { data: OutputPeople | null }

type Dependeces = { repository: PeopleRepository }

export const findFirstPeopleUseCase = ({ repository }: Dependeces) => {
  return {
    async execute(id: Input): Promise<Output> {
      const result = await repository.findFirst(id)

      if (!result) return { data: null }

      return {
        data: result,
      }
    },
  }
}
