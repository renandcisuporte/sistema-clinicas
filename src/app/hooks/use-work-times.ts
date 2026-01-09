'use client'

import { timeToMinutes } from '@/libs/time'
import { useCallback } from 'react'

type Props = Record<string, any>

export const useHandleAdd = (items: Props[], setItems: Function) => {
  const handleAdd = useCallback(
    (args: Props, index: number) => {
      const time: any = []

      const { times, open, week } = args

      const item = [...items]

      time.push({ description: times[0].description, time: times[0].time })

      time.push({ description: times[1].description, time: times[1].time })

      item[index] = { week, open, times: [...times, ...time] }

      setItems(item)
    },
    [items, setItems],
  )

  return handleAdd
}

export const useHandleRemove = (items: Props[], setItems: Function) => {
  const handleRemove = useCallback(
    (index: number) => {
      const item = [...items]

      item[index].times.splice(0, 2)

      setItems(item)
    },
    [items, setItems],
  )
  return handleRemove
}

export const useHandleCalculateTotalHours = () => {
  const calculateTotalHours = useCallback(
    (times: Props[], open: boolean): number => {
      if (open) return 0

      let openMinute = 0
      let closedMinute = 0
      let totalMinutes = 0
      times?.forEach(({ description, time }: any) => {
        if (description === 'Abre à(s)') openMinute = timeToMinutes(time)
        if (description === 'Fecha à(s)') closedMinute = timeToMinutes(time)
        if (openMinute && closedMinute) {
          totalMinutes += closedMinute - openMinute
        }
      })

      // Converte o total de minutos em horas
      return totalMinutes / 60
    },
    [],
  )

  return calculateTotalHours
}

export const useUpdateItems = () => {
  const handleUpdateItems = useCallback(
    (
      weeks: Props[],
      inputs: Props[],
      items: Props[],
      setItems: (items: Props[]) => void,
    ) => {
      if (weeks) setItems(weeks)

      if (inputs?.length < 0) return

      const updatedItems = inputs.reduce(
        (acc: Props[], { open, times, week }) => {
          const key = acc.findIndex((item: Props) => item.week === week)
          // Atualiza o item existente
          if (key !== -1) acc[key] = { ...acc[key], open, times }
          // Adiciona novo item
          else acc.push({ week, open, times })

          return acc
        },
        [...items],
      )
      setItems(updatedItems)
    },
    [],
  )

  return handleUpdateItems
}
