import { getCachedChart } from '../../action'
import { ChartClient } from './chart-client'

export async function Chart() {
  const { fixed, variable } = await getCachedChart()

  return (
    <ChartClient
      title={''}
      fantasy={''}
      expenseFixed={fixed}
      expenseVariable={variable}
    />
  )
}
