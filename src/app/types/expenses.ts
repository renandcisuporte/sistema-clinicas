import { z } from 'zod'

export const expenseSchema = z.object({
  id: z.string().optional(),
  clinicId: z.string().optional().nullable(),
  description: z.string().min(1, { message: 'Campo obrigatório!' }).nullable(),
  active: z.boolean().default(true),
  type: z.enum(['fixed', 'variable']).default('fixed'),
})

export type ExpenseProps = z.infer<typeof expenseSchema>
