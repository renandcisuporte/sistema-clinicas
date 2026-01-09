import { ChartRepository } from '~/modules/chart/repositories/chart-repository'
import { Chart } from '~/modules/chart/repositories/prisma/entity/chart'
import { daysOfWeekOrder } from '~/shared/constants'
import { prisma } from '~/shared/prisma'
import { calculateTotalHours } from '~/shared/utils'

const mergeResults = (
  arr1: Record<string, any>, // workTimeResponse
  arr2: Record<string, any>, // workTimeRecommendResponse
  arr3: Record<string, any>, // workTimeServiceResponse
): Chart[] => {
  const mergedResult: Chart[] = []

  // Obter todas as chaves de clinics, removendo duplicatas
  const allClinicIds = Array.from(
    new Set([...Object.keys(arr1), ...Object.keys(arr2), ...Object.keys(arr3)]),
  )

  // Iterar sobre todos os clinicIds
  allClinicIds.forEach((clinicId) => {
    const workTime = arr1[clinicId]?.workTime || []
    const workTimeRecommend = arr2[clinicId]?.workTimeRecommend || []
    const workTimeService = arr3[clinicId]?.workTimeService || []

    const combined = [...workTime, ...workTimeRecommend, ...workTimeService]

    // Agrupamento utilizando Map para otimizar buscas
    const groupCombined = combined.reduce((acc: Map<string, any>, curr) => {
      // Se já existe uma entrada para a fantasia, continuamos, caso contrário, criamos uma nova
      if (!acc.has(curr.fantasy)) {
        acc.set(curr.fantasy, {
          clinicId,
          fantasy: curr.fantasy,
          title: curr.title,
          workHours: [],
        })
      }

      const fantasyEntry = acc.get(curr.fantasy)

      // Verificar se já existe uma entrada para a semana dentro da fantasia
      let weekEntry = fantasyEntry.workHours.find(
        (hour: { week: string }) => hour.week === curr.week,
      )

      if (!weekEntry) {
        // Criar uma nova entrada para a semana, se não existir
        weekEntry = {
          week: curr.week,
          workTime: 0,
          workTimeRecommend: 0,
          workTimeService: 0,
        }
        fantasyEntry.workHours.push(weekEntry)
      }

      // Mesclar os dados com base na semana
      weekEntry.workTime = curr.workTime || weekEntry.workTime
      weekEntry.workTimeRecommend =
        curr.workTimeRecommend || weekEntry.workTimeRecommend
      weekEntry.workTimeService =
        curr.workTimeService || weekEntry.workTimeService

      return acc
    }, new Map())

    // Converter Map para array, ordenar as semanas e adicionar ao resultado final
    const groupedArray: Record<string, any>[] = Array.from(
      groupCombined.values(),
    )

    groupedArray.forEach((item) => {
      item.workHours.sort((a: { week: string }, b: { week: string }) => {
        const dayA = daysOfWeekOrder.indexOf(a.week)
        const dayB = daysOfWeekOrder.indexOf(b.week)
        return dayA - dayB
      })
    })

    mergedResult.push(...(groupedArray as Chart[]))
  })

  return mergedResult
}

const fetchChart = async (
  clinicId: string,
  table: 'workTime' | 'workTimeRecommend' | 'workTimeService',
) => {
  try {
    return (
      await (prisma[table] as any).findMany({
        where: { clinic: { id: clinicId } },
        include: { clinic: true },
        orderBy: { createdAt: 'desc' },
      })
    ).reduce(
      (
        acc: Record<string, any>,
        {
          createdAt,
          updatedAt,
          deletedAt,
          clinicId,
          clinic,
          times,
          open,
          id,
          ...rest
        }: any,
      ) => {
        const { fantasy, title } = clinic!
        const sumHours = calculateTotalHours(JSON.parse(times), open)

        if (!acc[clinicId]) acc[clinicId] = { title, fantasy, [table]: [] }

        acc[clinicId][table].push({
          ...rest,
          title,
          fantasy,
          [table]: sumHours,
        })

        return acc
      },
      {},
    )
  } catch (error) {
    throw new Error(String(error))
  }
}

export const prismaChartRepository: ChartRepository = {
  async chart(clinicId: string): Promise<Chart> {
    try {
      const workTimeResult = await fetchChart(clinicId, 'workTime')

      const workTimeRecommendResult = await fetchChart(
        clinicId,
        'workTimeRecommend',
      )

      const workTimeServiceResult = await fetchChart(
        clinicId,
        'workTimeService',
      )

      const mergedData = mergeResults(
        workTimeResult,
        workTimeRecommendResult,
        workTimeServiceResult,
      )

      const result = mergedData.find((item) => item.clinicId === clinicId)
      if (!result) throw Error('Chart not found for the given clinicId')

      return result
    } catch (error) {
      throw new Error(String(error))
    }
  },
}
