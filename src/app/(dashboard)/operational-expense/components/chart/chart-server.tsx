import { getCachedChart } from '../../action'
import { ChartClient } from './chart-client'

export async function Chart() {
  const { fixed, variable } = await getCachedChart()

  return (
    <ChartClient
      title={'Gráfico de Despesas'}
      fantasy={''}
      expenseFixed={fixed}
      expenseVariable={variable}
    />
  )
}
