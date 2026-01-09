import { getCachedChart } from '../../action'
import { DailyCapacityClient } from './daily-capacity-client'

export async function DailyCapacityServer() {
  // const session = await getServerSession(authOptions)

  // const { data } = await apiFecth(`/clinics/charts`, {
  //   accessToken: session?.accessToken,
  //   next: { tags: [`clinics_charts`] },
  // })

  const data = await getCachedChart()

  return <DailyCapacityClient data={data} />
}
