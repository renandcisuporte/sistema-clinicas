export type OutputExpense = {
  id: string
  description: string | null
  type: 'fixed' | 'variable'
  createdAt: Date
  updatedAt: Date
  clinicId: string | null
  active: boolean
}
