export interface ChartsInterface {
  fantasy: string
  title: string
  weeklyCapacity?: {
    procedure: number
    idleProcedure: number
  }
  monthlyCapacity?: {
    procedure: number
    idleProcedure: number
  }
  annualCapacity?: {
    procedure: number
    idleProcedure: number
  }
  workHours: {
    week: string
    workTime: number
    workTimeRecommend: number
    workTimeService: number
    dailyProcedure?: number
    dailyIdleProcedure?: number
  }[]
}
