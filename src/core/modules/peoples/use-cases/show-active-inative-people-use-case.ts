import { PeopleRepository } from '../repositories/people-repository'

type Output = { data: { active: number; inative: number } }

type Dependences = { repository: PeopleRepository }

export const showActiveInativePeopleUseCase = ({ repository }: Dependences) => {
  return {
    async execute(clinicId: string): Promise<Output> {
      const [active, inative] = await Promise.all([
        repository.count({ clinicId, type: 'specialist' }),
        repository.count({ clinicId, active: 'user' }),
      ])

      return { data: { active, inative } }
    },
  }
}
