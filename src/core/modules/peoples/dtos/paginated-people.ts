import { OutputPeople } from './output-people'

export type PaginatedPeople = {
  data: OutputPeople[]
  page: number
  total: number
}
