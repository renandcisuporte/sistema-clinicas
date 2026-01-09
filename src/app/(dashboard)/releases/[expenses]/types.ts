import z from 'zod'

export type Expenses = {
  id: string
  description: string | null
}

export type Realeses = Record<
  string,
  Record<string, { price: number; selected?: boolean }>
>

export type FormProps = {
  expenses: Expenses[]
  realeses: Realeses
}

export const realeseSchema = z.object({
  realeses: z.record(
    z.record(
      z.object({
        selected: z.boolean().optional(),
        price: z.coerce
          .string({ invalid_type_error: 'Preço inválido' })
          .min(0, 'Preço não pode ser negativo'),
      }),
    ),
  ),
})

export type RealeseFormData = z.infer<typeof realeseSchema>
