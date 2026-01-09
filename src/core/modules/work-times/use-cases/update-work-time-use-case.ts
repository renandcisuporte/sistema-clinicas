import { WorkTime } from '~/modules/work-times/dtos/work-time'
import { WorkTimeRepository } from '~/modules/work-times/repositories/work-time-repository'

type Input = {
  clinicId: string
  input: WorkTime[]
}

type Output = {
  data: {
    message: string
  }
}

type Dependencies = {
  repository: WorkTimeRepository
}

export const updateWorkTimeUseCase = ({ repository }: Dependencies) => {
  return {
    async execute(data: Input): Promise<Output> {
      const { clinicId, input } = data

      for (const workTime of input) {
        const { week, times, open } = workTime

        if (clinicId !== workTime.clinicId)
          throw new Error('Clinicas não encontradas')

        await repository.createWork({
          clinicId,
          week,
          open,
          times,
        })
      }

      return {
        data: {
          message: 'Atualizado com sucesso',
        },
      }
    },
  }
}
