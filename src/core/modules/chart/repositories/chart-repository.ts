import { Chart } from './prisma/entity/chart'

export interface ChartRepository {
  chart(clinicId: string): Promise<Chart>
}
