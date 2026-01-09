import { CreateWorkTime } from '~/modules/work-times/dtos/create-work-time'
import { WorkTime } from '~/modules/work-times/dtos/work-time'

export interface WorkTimeRepository {
  averageWorkingTime(clinicId: string): Promise<WorkTime[]>
  recommendedAverageTime(clinicId: string): Promise<WorkTime[]>
  averageServiceTime(clinicId: string): Promise<WorkTime[]>
  createWork(input: CreateWorkTime): Promise<WorkTime>
  createRecommended(input: CreateWorkTime): Promise<WorkTime>
  createService(input: CreateWorkTime): Promise<WorkTime>
}
