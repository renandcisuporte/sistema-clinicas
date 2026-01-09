import { z } from 'zod'

export const hourSchema = z.object({
  description: z.string(),
  time: z.string(),
})

export type Hours = z.infer<typeof hourSchema>

export const workTimeSchema = z.object({
  id: z.string().nullable().optional(),
  clinicId: z.string().nullable().optional(),
  week: z.string(),
  open: z.boolean(),
  times: z.array(hourSchema),
})

export type WorkTime = z.infer<typeof workTimeSchema>

export const formWorkTimesSchema = z.object({
  clinicId: z.string().uuid('ClinicId inválido'),
  worktimes: z.array(workTimeSchema),
})

export type FormValues = z.infer<typeof formWorkTimesSchema>
