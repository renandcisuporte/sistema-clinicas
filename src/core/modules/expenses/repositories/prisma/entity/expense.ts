import { Expense as ExpensePrisma } from '@prisma/client'

export type ExpenseInput = ExpensePrisma

export type ExpenseOutput = Omit<ExpensePrisma, 'deletedAt'>
