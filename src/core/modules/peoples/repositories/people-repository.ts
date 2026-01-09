import { CreatePeople } from '~/modules/peoples/dtos/create-people'
import { OutputPeople } from '~/modules/peoples/dtos/output-people'

export interface PeopleRepository {
  count(...args: any): Promise<number>
  findAll(...args: any): Promise<OutputPeople[]>
  findFirst(id: string): Promise<OutputPeople | null>
  activeInative(id: string): Promise<void>
  create(input: CreatePeople): Promise<OutputPeople>
  update(id: string, input: CreatePeople): Promise<OutputPeople>
  delete(id: string): Promise<void>
}
