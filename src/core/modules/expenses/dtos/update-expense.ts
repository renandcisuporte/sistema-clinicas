export type UpdateExpense = {
  id: string
  description: string | null
  type: 'fixed' | 'variable'
  clinicId: string | null
  active: boolean
}
