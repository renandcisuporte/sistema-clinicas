'use server'

import { getUser } from '@/libs/session'
import { Room } from '@/types/rooms'
import { revalidatePath } from 'next/cache'
import { prismaRoomRepository } from '~/modules/rooms/repositories/prisma/repository/prisma-room-repository'
import { activeInativeRoomUseCase } from '~/modules/rooms/use-cases/active-inative-room-use-case'
import { createRoomUseCase } from '~/modules/rooms/use-cases/create-room-use-case'
import { deleteRoomUseCase } from '~/modules/rooms/use-cases/delete-room-use-case'
import { findAllRoomUseCase } from '~/modules/rooms/use-cases/find-all-room-use-case'
import { updateRoomUseCase } from '~/modules/rooms/use-cases/update-room-use-case'

export async function saveRoom(form: Room) {
  const session = await getUser()
  if (!session) throw new Error('Não autorizado!')

  const repository = prismaRoomRepository

  const { id, ...rest } = form

  if (id) {
    const useCase = updateRoomUseCase({ repository })
    await useCase.execute(id, {
      ...rest,
      clinicId: session?.clinicId,
    })

    revalidatePath('/(dashboard)/rooms')

    return {
      message: 'Salvo com sucesso!',
    }
  }

  const useCase = createRoomUseCase({ repository })
  await useCase.execute({
    ...rest,
    clinicId: session?.clinicId,
  })

  revalidatePath('/(dashboard)/rooms')

  return {
    message: 'Salvo com sucesso!',
  }
}

export async function removeRoom(id: string) {
  const session = await getUser()
  if (!session) throw new Error('Não autorizado!')

  const useCase = deleteRoomUseCase({ repository: prismaRoomRepository })
  await useCase.execute(id)

  revalidatePath('/(dashboard)/rooms')

  return {
    message: 'Removido com sucesso!',
  }
}

export async function activeInativeRoom(id: string) {
  const session = await getUser()
  if (!session) throw new Error('Não autorizado!')

  const useCase = activeInativeRoomUseCase({ repository: prismaRoomRepository })
  await useCase.execute(id)

  revalidatePath('/(dashboard)/rooms')

  return {
    message: 'Salvo com sucesso!',
  }
}

export async function loadRooms(args: any) {
  const session = await getUser()
  if (!session) throw new Error('Não autorizado!')

  const { room = '', limit = 15, page = 1 } = args

  const useCase = findAllRoomUseCase({ repository: prismaRoomRepository })
  const response = useCase.execute({ room, limit, page })

  return response
}
