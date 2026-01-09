'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookOpenCheck, Loader } from 'lucide-react'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { Service } from './page'

const reportProcedimentSchema = z.object({
  serviceId: z.string().optional().default(''),
  orderBy: z.enum(['nameAsc', 'nameDesc']),
})

type ReportProcediment = z.infer<typeof reportProcedimentSchema>

export function PageClient({ data }: { data: Service[] }) {
  const [isPeding, startTransition] = useTransition()

  async function onSubmit(form: ReportProcediment) {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const query = new URLSearchParams(form).toString()
      window.open(
        `/api/procediment-pdf?${query}`,
        '_blank',
        'noopener,noreferrer',
      )
      return
    })
  }

  const form = useForm<ReportProcediment>({
    resolver: zodResolver(reportProcedimentSchema),
  })
  const { handleSubmit, control } = form

  return (
    <form
      className="flex flex-col items-center py-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-row items-center space-x-4">
        <Controller
          control={control}
          name="serviceId"
          render={({ field }) => (
            <Select value={field.value ?? ''} onValueChange={field.onChange}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Selecione o procedimento" />
              </SelectTrigger>
              <SelectContent>
                {data.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          control={control}
          name="orderBy"
          defaultValue="nameAsc"
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex items-center space-x-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nameAsc" id="asc" />
                <Label htmlFor="asc">Nome Produto - A-Z</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nameDesc" id="desc" />
                <Label htmlFor="desc">Nome Produto - Z-A</Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>

      <div className="h-4" />

      <Button type="submit" size="sm" disabled={isPeding}>
        {isPeding ? (
          <Loader className="mr-1 w-4 animate-spin" />
        ) : (
          <BookOpenCheck className="mr-1 w-4" />
        )}
        Gerar Relatório
      </Button>
    </form>
  )
}
