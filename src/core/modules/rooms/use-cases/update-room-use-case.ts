import { RoomInput, RoomOutput } from '../repositories/prisma/entity/room'
import { RoomsRepository } from '../repositories/room-repository'

type Dependences = { repository: RoomsRepository }

export const updateRoomUseCase = ({ repository }: Dependences) => {
  return {
    async execute(id: string, input: RoomInput): Promise<{ data: RoomOutput }> {
      const result = await repository.update(id, input)

      return { data: result }
    },
  }
}
