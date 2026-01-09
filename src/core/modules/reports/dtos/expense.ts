export type PdfExpenseProps = {
  // expenseId: string
  // type: 'fixed' | 'variable'
  // description: string | null
  // price: number
  // date: string
  id: string
  date: Date
  clinicId: string | null
  expenseId: string | null
  price: number
  description: string | undefined
  type: 'fixed' | 'variable'
}
