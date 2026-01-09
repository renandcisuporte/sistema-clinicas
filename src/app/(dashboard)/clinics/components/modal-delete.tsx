'use client'

import { removeClinic } from '@/actions/clinics'
import { ButtonSubmit } from '@/components/common/button-submit'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { clinicSchema } from '@/types/clinics'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ban } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export interface ModalFormInterface {
  open: boolean
  clinicId?: string
}

export function ModalDelete({ open, clinicId }: ModalFormInterface) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  const form = useForm<{ id: string }>({
    resolver: zodResolver(clinicSchema.pick({ id: true })),
  })
  const { handleSubmit, register, reset } = form

  async function onSubmit({ id }: { id: string }) {
    startTransition(async () => {
      try {
        const responde = await removeClinic({ id })
        toast({
          title: 'Sucesso!',
          description: (responde as any)?.message,
        })
      } catch (err) {
        toast({
          title: 'Erro ao remover dados!',
          description: (err as any)?.message,
        })
      }
    })
  }

  useEffect(() => {
    if (!clinicId) return

    reset({ id: clinicId! })
  }, [clinicId, reset])

  return (
    <Dialog open={open} onOpenChange={() => back()} modal={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir?
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="float-right flex flex-col flex-wrap justify-end space-y-4 md:flex-row md:space-x-2"
        >
          <input type="hidden" {...register('id')} />
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              <Ban className="mr-1 w-4" />
              Cancelar
            </Button>
          </DialogClose>
          <ButtonSubmit remove submitting={isPending} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
