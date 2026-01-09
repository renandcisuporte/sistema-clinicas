'use client'

import { removeService, saveService } from '@/actions/services'
import { ButtonSubmit } from '@/components/common/button-submit'
import { InputLabel } from '@/components/common/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import { Service, serviceSchema } from '@/types/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export type ModalFormInterface = {
  open: boolean
  data?: Service
}

export function ModalForm({ open, data }: ModalFormInterface) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  async function onSubmit(form: Service) {
    startTransition(async () => {
      try {
        const response = await saveService(form)
        toast({
          title: 'Sucesso!',
          description: (response as any)?.message,
        })
        back()
      } catch (error) {
        console.log('[MODALFORMSERVICE] Error: ', error)
        toast({
          title: 'Erro ao salvar dados!',
          description: (error as any)?.message,
        })
      }
    })
  }
  const form = useForm<Service>({
    resolver: zodResolver(serviceSchema),
  })

  const {
    formState: { errors },
    handleSubmit,
    reset,
    register,
  } = form

  useEffect(() => {
    if (data) {
      reset(data)
      return
    }

    reset({
      id: '',
      name: '',
    })
  }, [data, reset])

  return (
    <Dialog open={open} modal={true}>
      <DialogContent
        className="h-auto !p-0 sm:max-w-sm [&>button]:hidden"
        onEscapeKeyDown={() => back()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogClose asChild>
          <CircleX
            onClick={() => back()}
            className="absolute right-4 top-4 z-10 cursor-pointer"
          />
        </DialogClose>
        <ScrollArea className="h-full">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>Editar/Cadastrar</DialogTitle>
              <DialogDescription>
                Você pode editar ou cadastrar procedimentos no formulário
                abaixo.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col flex-wrap space-y-4 md:flex-row"
            >
              <input type="hidden" {...register('id')} />

              <InputLabel
                label="Procedimento *"
                type="text"
                message={errors?.name?.message}
                {...register('name')}
              />

              <div className="w-full text-center">
                <ButtonSubmit submitting={isPending} />
              </div>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export function ModalDelete({ open, data }: ModalFormInterface) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  async function onSubmit({ id }: { id: string }) {
    startTransition(async () => {
      try {
        const response = await removeService({ id })
        toast({
          title: 'Sucesso!',
          description: (response as any)?.message,
        })
        back()
      } catch (error) {
        console.log('[MODALFORMSERVICE] Error: ', error)
        toast({
          title: 'Erro ao salvar dados!',
          description: (error as any)?.message,
        })
      }
    })
  }
  const form = useForm<{ id: string }>({
    resolver: zodResolver(serviceSchema.pick({ id: true })),
  })

  const { handleSubmit, reset, register } = form

  useEffect(() => {
    if (data) {
      reset(data)
      return
    }
  }, [data, reset])

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
              Cancelar
            </Button>
          </DialogClose>
          <ButtonSubmit remove submitting={isPending} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
