import { getCachedChart } from '../../action'
import { ChartClient } from './chart-client'

export async function Chart() {
  // const session = await getServerSession(authOptions)

  // const { data } = await apiFecth(`/clinics/charts`, {
  //   accessToken: session?.accessToken,
  //   next: { tags: [`clinics_charts`] },
  // })

  const data = await getCachedChart()

  return (
    <ChartClient
      title={data?.title}
      fantasy={data?.fantasy}
      workHours={data?.workHours}
    />
  )
}
