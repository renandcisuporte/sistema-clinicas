import { getCachedChart } from '../../action'
import { WeeklyCapacityClient } from './weekly-capacity-client'

export async function WeeklyCapacityServer() {
  // const session = await getServerSession(authOptions)

  // const { data } = await apiFecth(`/clinics/charts`, {
  //   accessToken: session?.accessToken,
  //   next: { tags: [`clinics_charts`] },
  // })

  const data = await getCachedChart()

  return <WeeklyCapacityClient data={data} />
}
