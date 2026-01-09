import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getUser } from '@/libs/session'
import { notFound } from 'next/navigation'
import { prismaRoomRepository } from '~/modules/rooms/repositories/prisma/repository/prisma-room-repository'
import { findAllRoomUseCase } from '~/modules/rooms/use-cases/find-all-room-use-case'

export async function Room() {
  const session = await getUser()
  if (!session) return notFound()

  const useCase = findAllRoomUseCase({ repository: prismaRoomRepository })
  const rooms = await useCase.execute({
    clinicId: session.clinicId,
  })

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-3 py-2.5 sm:py-3">
          <CardTitle className="text-md">Salas</CardTitle>
          <CardDescription>
            <small>Total de salas atualmente</small>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex h-28 justify-between p-0">
        {[
          { active: 'Ativas', bg: '--chart-2' },
          { inative: 'Inativas', bg: '--chart-1' },
        ].map((item) => {
          const key = Object.keys(item)[0]
          const value = Object.values(item)[0]
          return (
            <div
              key={key}
              className="flex w-[50%] flex-col px-3 py-2 text-center even:border-l data-[active=true]:bg-muted/50 sm:px-4 sm:py-3"
            >
              <span className="w-full text-xs text-muted-foreground">
                {value}
              </span>
              <span
                className="w-full text-7xl font-extrabold"
                style={{
                  color: `hsl(var(${item.bg}))`,
                }}
              >
                {rooms[`${key}` as keyof { active: number; inative: number }]}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
