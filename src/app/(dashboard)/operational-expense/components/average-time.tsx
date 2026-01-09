import { findClinics } from '@/actions/clinics'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getUser } from '@/libs/session'
import { notFound } from 'next/navigation'

export async function AverageTime() {
  const session = await getUser()
  if (!session) notFound()

  const { data } = await findClinics(`${session?.clinicId}`)

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-3 py-2.5 sm:py-3">
          <CardTitle className="text-md">Média de tempo</CardTitle>
          <CardDescription>
            <small>Média de tempo de procedimento</small>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex justify-between p-0">
        <div className="flex w-full flex-col px-3 py-2 text-center even:border-l data-[active=true]:bg-muted/50 sm:px-4 sm:py-3">
          <span className="w-full text-7xl font-extrabold">
            {data?.averageService} <small>min</small>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
