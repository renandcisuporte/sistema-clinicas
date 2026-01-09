export type Hour = {
  week: string
  workTime: number
  workTimeRecommend: number
  workTimeService: number
  dailyProcedure?: number
  dailyIdleProcedure?: number
}

export type Chart = {
  clinicId: string
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
  workHours: Hour[]
}
