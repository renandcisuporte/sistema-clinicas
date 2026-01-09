import { InputRealese } from '~/modules/realeses/dtos/input-realese'
import { OutputRealese } from '~/modules/realeses/dtos/output-realese'

export interface RealeseRepository {
  count(...args: any): Promise<number>
  all(...args: any): Promise<OutputRealese[]>
  first(id: string): Promise<OutputRealese | null>
  create(input: InputRealese): Promise<OutputRealese>
  update(id: string, input: InputRealese): Promise<OutputRealese>
  delete(id: string): Promise<void>
  upsave(args: InputRealese): Promise<void>
}
