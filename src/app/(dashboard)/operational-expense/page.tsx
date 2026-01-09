import { Suspense } from 'react'
import { ChartLoading } from './components/chart/chart-loading'
import { Chart } from './components/chart/chart-server'

export default async function Page() {
  return (
    <div className="flex flex-row flex-wrap items-stretch">
      <div className="mx-auto flex-1 p-4">
        <Suspense fallback={<ChartLoading />}>
          <Chart />
        </Suspense>
      </div>
    </div>
  )
}
