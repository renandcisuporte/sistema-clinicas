'use client'

import { removeRoom, saveRoom } from '@/actions/rooms'
import { ButtonSubmit } from '@/components/common/button-submit'
import { InputLabel } from '@/components/common/input'
import { TextareaLabel } from '@/components/common/textarea'
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
import { Room, roomSchema } from '@/types/rooms'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export interface ModalFormInterface {
  open: boolean
  data?: Room
}

export function ModalForm({ open, data }: ModalFormInterface) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  async function onSubmit(form: Room) {
    startTransition(async () => {
      try {
        const response = await saveRoom(form)
        toast({
          title: 'Sucesso!',
          description: response.message,
        })
        back()
      } catch (err) {
        toast({ title: 'Atenção!', description: (err as any).message })
      }
    })
  }

  const form = useForm<Room>({
    resolver: zodResolver(roomSchema),
  })
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = form

  useEffect(() => {
    if (!data) return

    reset(data)
  }, [data, reset])

  return (
    <Dialog open={open} modal={true}>
      <DialogContent
        className="!p-0 sm:max-w-[767px] [&>button]:hidden"
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
                Você pode editar ou cadastrar uma sala no formulário abaixo.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col flex-wrap space-y-4 md:flex-row"
            >
              <input type="hidden" {...register('id')} />
              <input type="hidden" {...register('clinicId')} />
              <input type="hidden" {...register('averageService')} />

              <InputLabel
                type="text"
                label="Cód *"
                classHelper="md:basis-24"
                message={errors?.code?.message}
                {...register('code')}
              />

              <InputLabel
                label="Sala *"
                message={errors?.room?.message}
                classHelper="md:basis-80 md:ml-4"
                type="text"
                {...register('room')}
              />

              {/* <InputLabel
                label="Tempo de Atendimento"
                className="md:basis-40 md:ml-4"
                message={errors?.averageService}
                input={{
                  type: 'time',
                  name: 'averageService',
                  defaultValue: data?.averageService
                }}
              /> */}

              <TextareaLabel
                label="Descrição"
                message={errors?.description?.message}
                {...register('description')}
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

  async function onSubmit(form: Room) {
    startTransition(async () => {
      try {
        const { id } = form
        const response = await removeRoom(id!)
        toast({
          title: 'Sucesso!',
          description: response.message,
        })
        back()
      } catch (err) {
        toast({ title: 'Atenção!', description: (err as any).message })
      }
    })
  }

  const form = useForm<Room>({
    resolver: zodResolver(roomSchema),
  })
  const { handleSubmit, register, reset } = form

  useEffect(() => {
    if (!data) return

    reset(data)
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
