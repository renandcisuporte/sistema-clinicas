import { CreateExpense } from '~/modules/expenses/dtos/create-expense'
import { OutputExpense } from '~/modules/expenses/dtos/output-expense'

export interface ExpenseRepository {
  count(...args: any): Promise<number>
  all(...args: any): Promise<OutputExpense[]>
  first(id: string): Promise<OutputExpense | null>
  create(input: CreateExpense): Promise<OutputExpense>
  update(id: string, input: CreateExpense): Promise<OutputExpense>
  activeInative(id: string): Promise<void>
  activeInativeTypes(id: string): Promise<void>
  delete(id: string): Promise<void>
}
