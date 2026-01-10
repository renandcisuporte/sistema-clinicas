export type InputDateRange = {
  startDate?: string
  endDate?: string
}

export type OutputDateRange = {
  gte?: Date
  lte?: Date
}

export interface DateRangeFilter {
  execute(input: InputDateRange): OutputDateRange | undefined
}
