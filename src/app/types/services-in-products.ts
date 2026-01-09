import { z } from 'zod'

export const serviceInProductSchema = z.object({
  id: z.string().optional(),
  serviceName: z.string().optional(),
  productName: z.string().optional(),
  productPrice: z.string().optional(),
  productQuantity: z.string().optional(),
  clinicId: z.string().optional(),
  productId: z.string().optional(),
  serviceId: z.string().optional(),
  rentalPrice: z.string().optional(),
  rental: z.string().optional(),
  checked: z.boolean().default(false),
})

export type ServiceInProduct = z.infer<typeof serviceInProductSchema>

export const serviceProductSchema = z.object({
  services: z.array(serviceInProductSchema),
})

export type ServiceProduct = z.infer<typeof serviceProductSchema>
