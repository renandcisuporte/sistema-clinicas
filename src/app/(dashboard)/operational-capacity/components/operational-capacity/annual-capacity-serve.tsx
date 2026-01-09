import { getCachedChart } from '../../action'
import { AnnualCapacityClient } from './annual-capacity-client'

export async function AnnualCapacityServer() {
  // const session = await getServerSession(authOptions)

  // const { data } = await apiFecth(`/clinics/charts`, {
  //   accessToken: session?.accessToken,
  //   next: { tags: [`clinics_charts`] },
  // })

  const data = await getCachedChart()

  return <AnnualCapacityClient data={data} />
}
