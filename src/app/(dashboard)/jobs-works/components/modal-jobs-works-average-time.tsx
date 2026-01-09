'use client'

import { saveAverageTimeService } from '@/actions/work-times'
import { ButtonSubmit } from '@/components/common/button-submit'
import { InputLabel } from '@/components/common/input'
import { Button } from '@/components/ui/button'
import * as Dialog from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import { Clinic, clinicSchema } from '@/types/clinics'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ban } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export type ModalJobWorkAverageTimeProps = {
  open: boolean
  input?: Clinic
}

export function ModalJobWorkAverageTime({
  open,
  input,
}: ModalJobWorkAverageTimeProps) {
  const { back } = useRouter()
  const { toast } = useToast()
  const params = useSearchParams()

  const [isPending, startTransition] = useTransition()

  async function onSubmit(form: Clinic) {
    startTransition(async () => {
      try {
        const response = await saveAverageTimeService(form)
        toast({ title: 'Sucesso!', description: response.message })
        back()
      } catch (err) {
        toast({ title: 'Atenção!', description: (err as any)?.message })
      }
    })
  }

  const form = useForm<Clinic>({
    resolver: zodResolver(
      clinicSchema.pick({ id: true, averageService: true }),
    ),
  })

  const { handleSubmit, register, reset } = form

  useEffect(() => {
    if (!input) return

    reset(input)
  }, [input, reset])

  return (
    <Dialog.Dialog open={open} onOpenChange={() => back()} modal={true}>
      <Dialog.DialogContent
        className="max-w-xl !p-0"
        aria-describedby={undefined}
      >
        <ScrollArea className="h-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
            <Dialog.DialogHeader>
              <Dialog.DialogTitle>
                Tempo médio de atendimento
              </Dialog.DialogTitle>
            </Dialog.DialogHeader>
            <input
              type="hidden"
              defaultValue={params.get('clinicId')!}
              {...register('id')}
            />
            <InputLabel
              type="number"
              label="Tempo de Atendimento"
              classHelper="flex-1"
              {...register('averageService')}
            />

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
