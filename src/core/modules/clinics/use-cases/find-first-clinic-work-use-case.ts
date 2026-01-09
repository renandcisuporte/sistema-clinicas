import { ClinicRepository } from '~/modules/clinics/repositories/clinic-repository'
import { WorkTimeRepository } from '~/modules/work-times/repositories/work-time-repository'
import { daysOfWeekOrder } from '~/shared/constants'

type Dependencies = {
  clinicRepo: ClinicRepository
  workTimeRepo: WorkTimeRepository
}

export const findFirstClinicWorkTimeUseCase = ({
  clinicRepo,
  workTimeRepo,
}: Dependencies) => {
  return {
    async execute(clinicId: string) {
      const [clinic, workTime, workTimeRecommended, workTimeService] =
        await Promise.all([
          clinicRepo.findFirst(clinicId),
          workTimeRepo.averageWorkingTime(clinicId),
          workTimeRepo.recommendedAverageTime(clinicId),
          workTimeRepo.averageServiceTime(clinicId),
        ])

      const workTimes = workTime
        ?.map(({ clinicId, id, times, ...item }) => ({
          ...item,
          times: JSON.parse(`${times}`),
        }))
        .sort((a, b) => {
          return (
            daysOfWeekOrder.indexOf(a.week) - daysOfWeekOrder.indexOf(b.week)
          )
        })

      const workTimesRecommended = workTimeRecommended
        ?.map(({ clinicId, id, times, ...item }) => ({
          ...item,
          times: JSON.parse(`${times}`),
        }))
        .sort((a, b) => {
          return (
            daysOfWeekOrder.indexOf(a.week) - daysOfWeekOrder.indexOf(b.week)
          )
        })

      const workTimesService = workTimeService
        ?.map(({ clinicId, id, times, ...item }) => ({
          ...item,
          times: JSON.parse(`${times}`),
        }))
        .sort((a, b) => {
          return (
            daysOfWeekOrder.indexOf(a.week) - daysOfWeekOrder.indexOf(b.week)
          )
        })

      return {
        data: {
          ...clinic,
          worksTimes: 0,
          worksTimesRecommended: 0,
          worksTimesService: 0,
          workTimes,
          workTimesRecommended,
          workTimesService,
        },
      }
    },
  }
}
