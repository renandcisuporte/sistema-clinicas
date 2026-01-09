import { getCachedChart } from '../../action'
import { ChartClient } from './chart-client'

export async function Chart() {
  const data = await getCachedChart()

  return (
    <ChartClient
      title={data?.title}
      fantasy={data?.fantasy}
      workHours={data?.workHours}
    />
  )
}
