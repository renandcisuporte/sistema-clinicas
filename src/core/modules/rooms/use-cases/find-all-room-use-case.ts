import { RoomOutput } from '../repositories/prisma/entity/room'
import { RoomsRepository } from '../repositories/room-repository'

type Output = {
  total: number
  active: number
  inative: number
  data: RoomOutput[]
}

type Dependences = { repository: RoomsRepository }

export const findAllRoomUseCase = ({ repository }: Dependences) => {
  return {
    async execute(args: any): Promise<Output> {
      const { clinicId, room = '', limit = 15, page = 1 } = args

      const common = {
        clinicId,
        room,
        limit,
        page,
      }

      const [active, inative, total, data] = await Promise.all([
        repository.count({ clinicId, room, active: 'true' }),
        repository.count({ clinicId, room, active: 'false' }),
        repository.count({ clinicId, room }),
        repository.all(common),
      ])

      return {
        active,
        inative,
        total,
        data,
      }
    },
  }
}
