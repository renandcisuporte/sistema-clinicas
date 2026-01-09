import { z } from 'zod'
import { workTimeSchema } from './work-times'

export const clinicSchema = z.object({
  id: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
  code: z.string().nullable().optional(),
  clinicId: z.string().nullable().optional(),
  title: z.string(),
  fantasy: z.string(),
  cnpj: z.string(),
  ie: z.string(),
  phone: z.string().nullable().optional(),
  mobilePhone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  number: z.string().nullable().optional(),
  neighborhood: z.string().nullable().optional(),
  complement: z.string().nullable().optional(),
  reference: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  zipCode: z.string().nullable().optional(),
  averageService: z.string().nullable().optional(),
  workTimes: z.array(workTimeSchema).optional(),
  workTimesRecommended: z.array(workTimeSchema).optional(),
  workTimesService: z.array(workTimeSchema).optional(),
})

export type Clinic = z.infer<typeof clinicSchema>
