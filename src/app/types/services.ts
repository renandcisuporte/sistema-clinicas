import { z } from 'zod'

export const serviceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: 'Campo nome obrigatório!' }),
  total: z.number().optional(),
})

export type Service = z.infer<typeof serviceSchema>
