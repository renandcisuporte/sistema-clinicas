import { RoomInput, RoomOutput } from '../repositories/prisma/entity/room'
import { RoomsRepository } from '../repositories/room-repository'

type Dependences = { repository: RoomsRepository }

export const createRoomUseCase = ({ repository }: Dependences) => {
  return {
    async execute(input: RoomInput): Promise<{ data: RoomOutput }> {
      const result = await repository.create(input)

      return { data: result }
    },
  }
}
