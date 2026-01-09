import { z } from 'zod'

export const phoneSchema = z.object({
  phone: z.string().optional(),
  description: z.string().optional(),
})

export const peopleSchema = z.object({
  id: z.string().optional(),
  clinicId: z.string().nullable().default(null),
  fullName: z
    .string({ message: 'Campo obrigatório!' })
    .min(5, { message: 'Campo obrigatório!' }),
  document: z.string({ message: 'Campo obrigatório!' }).nullable(),
  type: z.enum(['specialist', 'user']).default('specialist'),
  dateOfBirth: z.coerce
    .string({ message: 'Campo obrigatório!' })
    .date()
    .nullable(),
  phones: z.array(phoneSchema).nullable(),
  email: z.string({ message: 'Campo obrigatório!' }).nullable(),
  address: z.string().nullable(),
  number: z.string().nullable(),
  neighborhood: z.string().nullable(),
  complement: z.string().nullable().default(''),
  reference: z.string().nullable().default(''),
  city: z.string().nullable(),
  state: z.string().max(2).nullable(),
  zipCode: z.string().nullable(),
})

export type People = z.infer<typeof peopleSchema>

export type Phone = z.infer<typeof phoneSchema>
