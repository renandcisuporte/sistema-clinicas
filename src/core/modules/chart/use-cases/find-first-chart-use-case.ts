import { ChartRepository } from '~/modules/chart/repositories/chart-repository'
import { Chart } from '~/modules/chart/repositories/prisma/entity/chart'
import { ClinicRepository } from '~/modules/clinics/repositories/clinic-repository'
import { PeopleRepository } from '~/modules/peoples/repositories/people-repository'
import { RoomsRepository } from '~/modules/rooms/repositories/room-repository'

type Capacity = {
  procedure: number
  idleProcedure: number
}

type Output = {
  data: Chart & {
    weeklyCapacity: Capacity
    monthlyCapacity: Capacity
    annualCapacity: Capacity
  }
}

type Dependences = {
  repoChart: ChartRepository
  repoPeople: PeopleRepository
  repoRoom: RoomsRepository
  repoClinic: ClinicRepository
}

export const findFirstChartUseCase = ({
  repoChart,
  repoPeople,
  repoRoom,
  repoClinic,
}: Dependences) => {
  return {
    async execute(clinicId: string): Promise<Output> {
      const [workTimesAll, countPeople, countRoom, countRoomOff, clinic] =
        await Promise.all([
          repoChart.chart(clinicId),
          repoPeople.count({ clinicId, type: 'specialist' }),
          repoRoom.count({ clinicId, active: 'true' }),
          repoRoom.count({ clinicId, active: 'false' }),
          repoClinic.findFirst(clinicId),
        ])

      const minutes = Number(clinic?.averageService ?? 0)

      if (minutes <= 0) {
        throw new Error('averageService inválido')
      }

      const baseFactor = 60 / minutes

      const { workHours, ...rest } = workTimesAll as Chart

      let weeklyWorkTimeSum = 0

      const workHoursWithCapacity = workHours.map((item) => {
        weeklyWorkTimeSum += item.workTimeRecommend

        const dailyFactor = item.workTimeRecommend * baseFactor

        return {
          ...item,
          dailyProcedure: countRoom * dailyFactor,
          dailyIdleProcedure: countRoomOff * dailyFactor,
        }
      })

      const weeklyBase = weeklyWorkTimeSum * baseFactor

      const weeklyCapacity: Capacity = {
        procedure: countRoom * weeklyBase,
        idleProcedure: countRoomOff * weeklyBase,
      }

      const monthlyCapacity: Capacity = {
        procedure: weeklyCapacity.procedure * 4,
        idleProcedure: weeklyCapacity.idleProcedure * 4,
      }

      const annualCapacity: Capacity = {
        procedure: monthlyCapacity.procedure * 12,
        idleProcedure: monthlyCapacity.idleProcedure * 12,
      }

      return {
        data: {
          ...rest,
          workHours: workHoursWithCapacity,
          weeklyCapacity,
          monthlyCapacity,
          annualCapacity,
        },
      }
    },
  }
}
