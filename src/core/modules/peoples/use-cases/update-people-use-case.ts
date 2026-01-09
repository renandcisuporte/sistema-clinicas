import { OutputPeople } from '../dtos/output-people'
import { UpdatePeople } from '../dtos/update-people'
import { PeopleRepository } from '../repositories/people-repository'

type Input = UpdatePeople

type Output = { data: OutputPeople }

type Dependences = { repository: PeopleRepository }

export const updatePeopleUseCase = ({ repository }: Dependences) => {
  return {
    async execute(data: Input): Promise<Output> {
      const { id, ...input } = data

      const result = await repository.update(id, input)

      return { data: result }
    },
  }
}
