'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChartsInterface } from '@/types/chart'

type AnnualCapacityClientProps = {
  data: ChartsInterface
}

export function AnnualCapacityClient({ data }: AnnualCapacityClientProps) {
  return (
    <Card className="flex h-full flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-md">Capacidade Anual</CardTitle>
        <CardDescription>
          Total de procedimento/ocioso anual que podem ser realizados
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-row items-center justify-between p-6 [&>div>span]:text-6xl [&>div>span]:font-bold [&>div>strong]:text-xs [&>div>strong]:uppercase [&>div]:flex [&>div]:flex-col [&>div]:text-center">
        <div className="text-default">
          <strong>capacidade de procedimento</strong>
          <span>{data.annualCapacity?.procedure}</span>
        </div>

        <div className="text-danger">
          <strong>espaço total ocioso</strong>
          <span>{data.annualCapacity?.idleProcedure}</span>
        </div>
      </CardContent>
    </Card>
  )
}
