'use client'

import { ButtonSubmit } from '@/components/common/button-submit'
import { InputLabel } from '@/components/common/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import * as Dialog from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { weeks } from '@/contants'
import { useToast } from '@/hooks/use-toast'
import { calculateToHours } from '@/libs/time'
import { FormValues, formWorkTimesSchema, WorkTime } from '@/types/work-times'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ban, Minus, Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import {
  Control,
  Controller,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form'

type ModalJobWorkProps = {
  title: string
  open: boolean
  input?: WorkTime[]
  action: (form: FormValues) => Promise<{ message: string }>
}

export function ModalJobWork({
  open,
  input,
  title,
  action,
}: ModalJobWorkProps) {
  const { back } = useRouter()
  const { toast } = useToast()

  const params = useSearchParams()

  const [isPending, startTransition] = useTransition()

  async function onSubmit(form: FormValues) {
    startTransition(async () => {
      try {
        const response = await action(form)
        toast({ title: 'Sucesso!', description: response.message })
        back()
      } catch (err) {
        toast({ title: 'Atenção!', description: (err as any)?.message })
      }
    })
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formWorkTimesSchema),
    defaultValues: {
      clinicId: params.get('clinicId')!,
      worktimes: input ?? weeks,
    },
  })

  const { control, handleSubmit } = form

  const { fields } = useFieldArray({
    control,
    name: 'worktimes',
  })

  return (
    <Dialog.Dialog open={open} onOpenChange={() => back()} modal={true}>
      <Dialog.DialogContent
        className="h-full max-h-[96%] max-w-xl !p-0"
        aria-describedby={undefined}
      >
        <ScrollArea className="h-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
            <Dialog.DialogHeader>
              <Dialog.DialogTitle>{title}</Dialog.DialogTitle>
            </Dialog.DialogHeader>

            <input type="hidden" {...form.register('clinicId')} />

            {fields.map((field, i) => (
              <ModalJobWorkItem control={control} key={field.id} index={i} />
            ))}

            <Dialog.DialogClose asChild>
              <Button variant="ghost" type="button">
                <Ban className="mr-1 w-4" />
                Cancelar
              </Button>
            </Dialog.DialogClose>
            <ButtonSubmit submitting={isPending} />
          </form>
        </ScrollArea>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}

type ModalJobWorkItemProps = {
  index: number
  control: Control<FormValues>
}

function ModalJobWorkItem({ control, index }: ModalJobWorkItemProps) {
  const times = useWatch({
    control,
    name: `worktimes.${index}.times`,
  })

  const open = useWatch({
    control,
    name: `worktimes.${index}.open`,
  })

  const week = useWatch({
    control,
    name: `worktimes.${index}.week`,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: `worktimes.${index}.times`,
  })

  return (
    <div>
      <h4 className="flex items-center justify-between space-x-2">
        <span className="flex items-center space-x-2 font-semibold">
          <span>{week}</span>
          <Plus
            className="w-4 cursor-pointer"
            onClick={() => {
              append({ description: 'Abre à(s)', time: '0' })
              append({ description: 'Fecha à(s)', time: '0' })
            }}
          />
        </span>
        <small className="font-bold text-default">
          Total de horas: {calculateToHours(times, !open)}h
        </small>
      </h4>
      <div className="mb-2 flex space-x-2">
        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name={`worktimes.${index}.open`}
            render={({ field }) => (
              <Checkbox
                checked={!field.value}
                onCheckedChange={() => field.onChange(!field.value)}
              />
            )}
          />

          <label
            htmlFor="terms2"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Fechado
          </label>
        </div>
      </div>

      <div className="flex flex-row flex-wrap border-b border-b-neutral-300">
        {fields?.map((__, ii) => {
          // const description = useWatch({
          //   control,
          //   name: `worktimes.${index}.times.${ii}.description`,
          // })

          return (
            <div
              key={ii}
              className="flex w-1/2 flex-row flex-wrap space-x-4 p-2"
            >
              <Controller
                control={control}
                name={`worktimes.${index}.times.${ii}.time`}
                render={({ field }) => (
                  <InputLabel
                    // label={description}
                    classHelper="flex-1"
                    type="time"
                    {...field}
                  />
                )}
              />

              {ii % 2 && ii > 1 ? (
                <Minus
                  className="mt-7 w-4"
                  onClick={() => {
                    remove(index)
                    remove(index + 1)
                  }}
                />
              ) : (
                <span className="w-4" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
