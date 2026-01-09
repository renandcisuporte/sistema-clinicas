import { UpdateWorkTime } from '~/modules/work-times/dtos/update-work-time'
import { WorkTimeRepository } from '~/modules/work-times/repositories/work-time-repository'

type Input = {
  clinicId: string
  input: UpdateWorkTime[]
}

type Output = {
  data: {
    message: string
  }
}

type Dependences = { repository: WorkTimeRepository }

export const updateWorkTimeServiceUseCase = ({ repository }: Dependences) => {
  return {
    async execute(data: Input): Promise<Output> {
      const { clinicId, input } = data

      for (const workTime of input) {
        const { week, times, open } = workTime

        if (clinicId !== workTime.clinicId)
          throw new Error('Clinicas não encontradas')

        await repository.createService({
          clinicId,
          week,
          open: open,
          times: JSON.stringify(times),
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
