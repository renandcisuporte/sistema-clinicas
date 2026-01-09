import { PeopleRepository } from '../repositories/people-repository'

type Input = { id: string }

type Output = { data: { message: string } }

type Dependences = { repository: PeopleRepository }

export const activeInativePeopleUseCase = ({ repository }: Dependences) => {
  return {
    async execute({ id }: Input): Promise<Output> {
      await repository.activeInative(id)
      return { data: { message: 'Atualizado com sucesso!' } }
    },
  }
}
