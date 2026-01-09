import { CreatePeople } from '../dtos/create-people'
import { OutputPeople } from '../dtos/output-people'
import { PeopleRepository } from '../repositories/people-repository'

type Input = CreatePeople

type Output = { data: OutputPeople }

type Dependences = { repository: PeopleRepository }

export const createPeopleUseCase = ({ repository }: Dependences) => {
  return {
    async execute(input: Input): Promise<Output> {
      const result = await repository.create(input)

      return { data: result }
    },
  }
}
