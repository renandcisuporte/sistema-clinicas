'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { cn } from '@/libs/cn'
import { maskPrice } from '@/libs/mask'
import { ChartsInterface } from '@/types/chart'
import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

export const description = 'A bar chart with a label'

const arrayMonth = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
]

const chartConfig = {
  expenseFixed: {
    label: 'Fixa',
    color: 'hsl(var(--chart-1))',
  },
  expenseVariable: {
    label: 'Variável',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig

type ExpensesMap = {
  [expenseId: string]: {
    [date: string]: {
      price: number
    }
  }
}

const sumByMonth = (data: ExpensesMap): Record<string, number> => {
  return Object.values(data).reduce<Record<string, number>>(
    (acc, expenseDates) => {
      for (const [date, { price }] of Object.entries(expenseDates)) {
        acc[date] = (acc[date] ?? 0) + price
      }
      return acc
    },
    {},
  )
}

const buildBarChartData = (
  fixed: ExpensesMap = {},
  variable: ExpensesMap = {},
) => {
  const fixedByMonth = sumByMonth(fixed)
  const variableByMonth = sumByMonth(variable)

  const months = new Set([
    ...Object.keys(fixedByMonth),
    ...Object.keys(variableByMonth),
  ])

  return Array.from(months)
    .sort()
    .map((month) => ({
      month: arrayMonth[new Date(month).getUTCMonth()],
      expenseFixed: fixedByMonth[month] ?? 0,
      expenseVariable: variableByMonth[month] ?? 0,
    }))
}

export function ChartClient(props: ChartsInterface) {
  const { fantasy, expenseFixed, expenseVariable } = props

  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>('expenseFixed')

  const chartData = useMemo(
    () => buildBarChartData(expenseFixed ?? {}, expenseVariable ?? {}),
    [expenseFixed, expenseVariable],
  )

  const totals = useMemo(
    () =>
      chartData.reduce(
        (acc, item) => {
          acc.expenseFixed += item.expenseFixed
          acc.expenseVariable += item.expenseVariable
          return acc
        },
        { expenseFixed: 0, expenseVariable: 0 },
      ),
    [chartData],
  )

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-3 py-2.5 sm:py-3">
          <CardTitle className="text-md">{fantasy}</CardTitle>
          <CardDescription>
            <small>Total de Despesas Anual</small>
          </CardDescription>
        </div>
        <div className="flex">
          {['expenseFixed', 'expenseVariable'].map((item) => {
            const key = item as keyof typeof chartConfig

            return (
              <span
                key={key}
                data-active={activeChart === key}
                className="relative z-30 flex min-w-56 flex-1 flex-col justify-center gap-1 border-t px-3 py-2 text-center even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-4 sm:py-3"
                onClick={() => setActiveChart(key)}
              >
                <span className="w-full text-xs text-muted-foreground">
                  {chartConfig[key].label}
                </span>
                <span className="text-md w-full font-bold leading-none sm:text-2xl">
                  <span
                    className={cn(`mr-1 inline-block h-4 w-4`)}
                    style={{
                      backgroundColor: chartConfig[key].color,
                    }}
                  />
                  R$: {maskPrice(totals[key])}
                </span>
              </span>
            )
          })}
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="horizontal"
            margin={{ top: 24 }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <XAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <XAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <Bar
              dataKey="expenseVariable"
              layout="vertical"
              fill="var(--color-expenseVariable)"
              radius={4}
            >
              <LabelList
                dataKey="expenseVariable"
                position="top"
                offset={8}
                className="fill-[--color-expenseVariable]"
                fontSize={10}
                formatter={(str: string) => `R$: ${maskPrice(str)}`}
              />
            </Bar>
            <Bar
              dataKey="expenseFixed"
              fill="var(--color-expenseFixed)"
              radius={4}
            >
              <LabelList
                dataKey="expenseFixed"
                position="top"
                offset={8}
                className="fill-[--color-expenseFixed]"
                fontSize={10}
                formatter={(str: string) => `R$: ${maskPrice(str)}`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          {sumHours === 0 && (
            <>
              Jornada ideal <Check className="h-4 w-4" />
            </>
          )}
          {sumHours <= -1 && (
            <>
              Tempo de trabalho {sumHoursPositive}hs{' '}
              <TrendingDown className="h-4 w-4" />
            </>
          )}
          {sumHours > 0 && (
            <>
              Tempo ocioso {sumHoursPositive}hs{' '}
              <TrendingUp className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          {sumHours == 0 && (
            <>A empresa está trabalhando na capacidade operacional ideal.</>
          )}

          {sumHours <= -1 && (
            <>
              A empresa está trabalhando {Number(sumHours * -1)}hs a mais do que
              a capacidade operacional planejada.
            </>
          )}

          {sumHours > 0 && (
            <>A empresa tem {sumHours}hs disponivéis de trabalho na semana.</>
          )}
        </div> */}
      </CardFooter>
    </Card>
  )
}
