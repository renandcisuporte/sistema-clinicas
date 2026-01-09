'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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

const reportProductSchema = z.object({
  type: z.enum(['fixed', 'variable', '']).default(''),
  orderBy: z.enum(['nameAsc', 'nameDesc']),
  expenseId: z.string().optional().default(''),
  dateStart: z.string().optional().default(''),
  dateEnd: z.string().optional().default(''),
})

type ReportProduct = z.infer<typeof reportProductSchema>

type Props = {
  data: { id: string; description: string | null }[]
}

export function PageClient({ data }: Props) {
  const [isPeding, startTransition] = useTransition()

  async function onSubmit(form: ReportProduct) {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const query = new URLSearchParams(form).toString()
      window.open(`/api/expense-pdf?${query}`, '_blank', 'noopener,noreferrer')
      return
    })
  }

  const form = useForm<ReportProduct>({
    resolver: zodResolver(reportProductSchema),
  })
  const { handleSubmit, control } = form

  return (
    <form className="flex flex-col py-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="expenseId"
        render={({ field }) => (
          <Select value={field.value ?? ''} onValueChange={field.onChange}>
            <SelectTrigger className="mb-4">
              <SelectValue placeholder="Selecione uma Despesa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {data.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <div className="flex flex-row flex-wrap space-x-4">
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <div className="mb-4 flex-1">
              <Select value={field.value ?? ''} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Despesa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixas</SelectItem>
                  <SelectItem value="variable">Variadas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />

        <Controller
          control={control}
          name="dateStart"
          render={({ field }) => (
            <Input
              placeholder="Data Initial"
              type="date"
              className="flex-1"
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="dateEnd"
          render={({ field }) => (
            <Input
              placeholder="Data Final"
              type="date"
              className="flex-1"
              {...field}
            />
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

      <div className="my-4 h-4 border-b border-neutral-400" />

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
