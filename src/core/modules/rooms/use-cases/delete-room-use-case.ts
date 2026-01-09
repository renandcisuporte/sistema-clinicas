import { RoomsRepository } from '../repositories/room-repository'

type Dependences = { repository: RoomsRepository }

export const deleteRoomUseCase = ({ repository }: Dependences) => {
  return {
    async execute(id: string): Promise<void> {
      await repository.delete(id)
    },
  }
}
