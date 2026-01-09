import { z } from 'zod'

export const productSchema = z.object({
  id: z.string().optional(),
  serviceId: z.string().optional(),
  name: z.string().min(5, { message: 'Campo nome obrigatório!' }),
  quantity: z.string(),
  price: z.string(),
  retail: z.string().optional(),
})

export type Product = z.infer<typeof productSchema>
