import { RoomInput, RoomOutput } from './prisma/entity/room'

export interface RoomsRepository {
  count(...args: any): Promise<number>
  all(...args: any): Promise<RoomOutput[]>
  first(id: string): Promise<RoomOutput | null>
  create(input: RoomInput): Promise<RoomOutput>
  update(id: string, input: RoomInput): Promise<RoomOutput>
  activeInative(id: string): Promise<void>
  delete(id: string): Promise<void>
}
