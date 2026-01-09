import { Clinic } from '~/modules/clinics/dtos/clinic'
import { OutputPaginateClinic } from '~/modules/clinics/dtos/output-paginate-clinic'
import { SearchClinic } from '~/modules/clinics/dtos/search-clinic'

export interface ClinicRepository {
  averageService(id: string, time: string): Promise<string>
  findByCode(code: string): Promise<string | null>
  findAll(input: SearchClinic): Promise<OutputPaginateClinic>
  findFirst(id: string): Promise<Clinic | null>
  save(input: Partial<Clinic>): Promise<Clinic>
  delete(id: string): Promise<void>
}
