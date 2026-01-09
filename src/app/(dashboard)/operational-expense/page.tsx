import { Suspense } from 'react'
import { AverageTime } from './components/average-time'
import { ChartLoading } from './components/chart/chart-loading'
import { Chart } from './components/chart/chart-server'
import { AnnualCapacityServer } from './components/operational-capacity/annual-capacity-serve'
import { DailyCapacityServer } from './components/operational-capacity/daily-capacity-serve'
import { MonthlyCapacityServer } from './components/operational-capacity/monthly-capacity-serve'
import { WeeklyCapacityServer } from './components/operational-capacity/weekly-capacity-serve'
import { RoomLoading } from './components/room/room-loading'
import { Room } from './components/room/room-server'
import { Speciality } from './components/speciality/speciality-server'

export default async function Page() {
  return (
    <div className="flex flex-row flex-wrap items-stretch">
      <div className="mx-auto flex-1 p-4">
        <Suspense fallback={<ChartLoading />}>
          <Chart />
        </Suspense>
      </div>
      <div className="flex max-w-lg flex-row flex-wrap">
        <div className="w-full p-4">
          <Suspense fallback={<>Carregando status...</>}>
            <AverageTime />
          </Suspense>
        </div>
        <div className="w-[50%] p-4">
          <Suspense fallback={<RoomLoading />}>
            <Room />
          </Suspense>
        </div>
        <div className="w-[50%] p-4">
          <Suspense fallback={<RoomLoading />}>
            <Speciality />
          </Suspense>
        </div>
      </div>
      <div className="w-[50%] p-4">
        <Suspense fallback={<>Carregando status...</>}>
          <DailyCapacityServer />
        </Suspense>
      </div>
      <div className="w-[50%] p-4">
        <Suspense fallback={<>Carregando status...</>}>
          <WeeklyCapacityServer />
        </Suspense>
      </div>
      <div className="w-[50%] p-4">
        <Suspense fallback={<>Carregando status...</>}>
          <MonthlyCapacityServer />
        </Suspense>
      </div>
      <div className="w-[50%] p-4">
        <Suspense fallback={<>Carregando status...</>}>
          <AnnualCapacityServer />
        </Suspense>
      </div>
    </div>
  )
}
