'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { weeks } from '@/contants'
import { ChartsInterface } from '@/types/chart'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useState } from 'react'

type DailyCapacityClientProps = {
  data: ChartsInterface
}

export function DailyCapacityClient({ data }: DailyCapacityClientProps) {
  const date = new Date()
  const [week, setWeek] = useState(date.getDay())

  const handleWeek = useCallback(
    (type: 'prev' | 'next') =>
      setWeek((old) => {
        if (type === 'next' && old < 6) {
          return old + 1
        } else if (type === 'prev' && old > 0) {
          return old - 1
        }
        return old // Retorna o valor atual se estiver fora dos limites
      }),
    [],
  )

  return (
    <Card className="flex h-full flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-md">Capacidade Diária</CardTitle>
        <CardDescription>
          Este gráfico mostra o total que a empresa {data.fantasy} pode
          realiziar de procedimento estéticos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
          <ChevronLeft
            className="h-8 w-8 cursor-pointer rounded-md border p-2"
            onClick={() => handleWeek('prev')}
          />
          <span className="rounded-md border p-2 font-bold">
            {weeks.find((_, index) => index === week)?.week}
          </span>
          <ChevronRight
            className="h-8 w-8 cursor-pointer rounded-md border p-2"
            onClick={() => handleWeek('next')}
          />
        </div>
        <div className="flex flex-row justify-between space-x-4 [&>div>span]:text-6xl [&>div>span]:font-bold [&>div>strong]:text-xs [&>div>strong]:uppercase [&>div]:flex [&>div]:flex-col [&>div]:text-center">
          <div className="text-default">
            <strong>capacidade de procedimento</strong>
            <span>
              {
                data.workHours.find((_, index) => index === week)
                  ?.dailyProcedure
              }
            </span>
          </div>

          <div className="text-danger">
            <strong>espaço total ocioso</strong>
            <span>
              {
                data.workHours.find((_, index) => index === week)
                  ?.dailyIdleProcedure
              }
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
