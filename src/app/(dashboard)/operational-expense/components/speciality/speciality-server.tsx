import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getUser } from '@/libs/session'
import { notFound } from 'next/navigation'
import { prismaPeopleRepository } from '~/modules/peoples/repositories/prisma/repository/prisma-people-repository'
import { showActiveInativePeopleUseCase } from '~/modules/peoples/use-cases/show-active-inative-people-use-case'

export async function Speciality() {
  const session = await getUser()
  if (!session) notFound()

  const useCase = showActiveInativePeopleUseCase({
    repository: prismaPeopleRepository,
  })

  const people = await useCase.execute(session.clinicId)

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-3 py-2.5 sm:py-3">
          <CardTitle className="text-md">Profissionais</CardTitle>
          <CardDescription>
            <small>Total de profissionais</small>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex h-28 flex-col items-center justify-center p-0">
        <span className="w-full text-center text-7xl font-extrabold">
          {people.data?.active}
        </span>
      </CardContent>
    </Card>
  )
}
