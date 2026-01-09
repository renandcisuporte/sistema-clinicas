import { PeopleRepository } from '../repositories/people-repository'

type Input = { id: string }

type Dependences = { repository: PeopleRepository }

export const deletePeopleUseCase = ({ repository }: Dependences) => {
  return {
    async execute({ id }: Input) {
      await repository.delete(id)
    },
  }
}
