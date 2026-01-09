import { RoomOutput } from '../repositories/prisma/entity/room'
import { RoomsRepository } from '../repositories/room-repository'

type Output = {
  data: RoomOutput | null
}

type Dependences = { repository: RoomsRepository }

export const findFirstRoomUseCase = ({ repository }: Dependences) => {
  return {
    async execute(id: string): Promise<Output> {
      const result = await repository.first(id)

      return {
        data: result,
      }
    },
  }
}
