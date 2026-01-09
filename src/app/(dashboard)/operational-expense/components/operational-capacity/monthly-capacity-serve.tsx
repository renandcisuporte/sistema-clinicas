import { getCachedChart } from '../../action'
import { MonthlyCapacityClient } from './monthly-capacity-client'

export async function MonthlyCapacityServer() {
  // const session = await getServerSession(authOptions)

  // const { data } = await apiFecth(`/clinics/charts`, {
  //   accessToken: session?.accessToken,
  //   next: { tags: [`clinics_charts`] },
  // })

  const data = await getCachedChart()

  return <MonthlyCapacityClient data={data} />
}
