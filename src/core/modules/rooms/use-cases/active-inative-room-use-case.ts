import { RoomsRepository } from '../repositories/room-repository'

type Output = { data: { message: string } }

type Dependences = { repository: RoomsRepository }

export const activeInativeRoomUseCase = ({ repository }: Dependences) => {
  return {
    async execute(id: string): Promise<Output> {
      await repository.activeInative(id)

      return { data: { message: 'Atualizado com sucesso!' } }
    },
  }
}
