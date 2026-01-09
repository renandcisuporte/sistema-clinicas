export type OutputRealese = {
  id: string
  date: Date
  clinicId: string | null
  expenseId: string | null
  price: number
  description: string | undefined
  type: 'fixed' | 'variable'
}
