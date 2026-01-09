import { z } from 'zod'

export const roomSchema = z.object({
  id: z.string().optional(),
  clinicId: z.string().nullable(),
  code: z.string().nullable(),
  room: z.string(),
  description: z.string().nullable(),
  averageService: z.string().nullable(),
  active: z.boolean().default(true),
})

export type Room = z.infer<typeof roomSchema>
