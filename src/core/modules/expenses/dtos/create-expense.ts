export type CreateExpense = {
  description: string | null
  type: 'fixed' | 'variable'
  clinicId: string | null
  active: boolean
}
