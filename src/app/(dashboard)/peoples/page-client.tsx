'use client'

import { removePeople, savePeople } from '@/actions/peoples'
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
import { maskDocument, maskPhone, maskZipCode } from '@/libs/mask'
import { dateToInput } from '@/libs/utils'
import { People, peopleSchema } from '@/types/peoples'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleX, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

export type ModalFormProps = {
  open: boolean
  data?: People
}

export function ModalForm({ open, data }: ModalFormProps) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  async function onSubmit(form: People) {
    startTransition(async () => {
      try {
        const response = await savePeople(form)
        toast({
          title: 'Sucesso!',
          description: (response as any)?.message,
        })
        back()
      } catch (error) {
        console.log('[MODALFORMPEOPLE] Error: ', error)
        toast({
          title: 'Erro ao salvar dados!',
          description: (error as any)?.message,
        })
      }
    })
  }

  const form = useForm<People>({
    resolver: zodResolver(peopleSchema),
  })

  const {
    formState: { errors },
    handleSubmit,
    reset,
    register,
    control,
  } = form

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'phones',
  })

  useEffect(() => {
    if (data) {
      reset({ ...data, dateOfBirth: dateToInput(data.dateOfBirth) })
      return
    }
    reset({
      number: null,
      fullName: '',
      document: null,
      type: 'specialist',
      dateOfBirth: null,
      phones: [],
      email: null,
      address: null,
      neighborhood: null,
      complement: null,
      reference: null,
      city: null,
      state: null,
      zipCode: null,
    })
  }, [data, reset])

  return (
    <Dialog open={open} modal={true}>
      <DialogContent
        className="h-full max-h-[96%] !p-0 sm:max-w-[767px] [&>button]:hidden"
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
                Você pode editar ou cadastrar pessoas no formulário abaixo.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col flex-wrap space-y-4 md:flex-row"
            >
              <input type="hidden" {...register('id')} />
              <InputLabel
                label="Nome Completo *"
                type="text"
                message={errors?.fullName?.message}
                {...register('fullName')}
              />

              <InputLabel
                label="E-mail"
                classHelper="md:basis-72"
                message={errors?.email?.message}
                {...register('email')}
              />

              <InputLabel
                label="CPF"
                classHelper="md:basis-48 md:ml-4"
                type="text"
                message={errors?.document?.message}
                {...register('document', {
                  onChange: (e) => {
                    const value = maskDocument(e.target.value)
                    e.target.value = value
                  },
                })}
              />

              <InputLabel
                label="Data Nascimento"
                classHelper="md:basis-40 md:ml-4"
                message={errors?.dateOfBirth?.message}
                type="date"
                {...register('dateOfBirth')}
              />

              <div className="flex w-full flex-col space-y-4">
                <hr className="mt-4 flex-1" />
                <DialogTitle className="flex flex-row items-center">
                  <span>Editar/Telefones</span>
                  <Plus
                    className="ml-2 h-4 w-4 cursor-pointer"
                    onClick={() => append({ phone: '', description: '' })}
                  />
                </DialogTitle>
                {fields.map((phone, index) => (
                  <div key={phone.id} className="flex flex-row flex-wrap">
                    <InputLabel
                      label="Telefone"
                      classHelper="md:basis-56"
                      {...register(`phones.${index}.phone`, {
                        onChange: (e) => {
                          const value = maskPhone(e.target.value)
                          e.target.value = value
                        },
                      })}
                    />
                    <InputLabel
                      label="Descrição"
                      classHelper="md:flex-1 md:ml-4"
                      {...register(`phones.${index}.description`)}
                    />
                    <Trash
                      className="ml-4 mt-8 h-4 w-4 cursor-pointer"
                      onClick={() => remove(index)}
                    />
                  </div>
                ))}
                <hr className="my-4 flex-1" />
              </div>

              <DialogTitle className="flex flex-row items-center md:basis-full">
                <span>Endereço</span>
              </DialogTitle>

              <InputLabel
                label="Endereço"
                classHelper="md:basis-96"
                message={errors?.address?.message}
                {...register('address')}
              />

              <InputLabel
                label="Nr."
                message={errors?.number?.message}
                classHelper="md:basis-20 md:ml-4"
                {...register('number')}
              />

              <InputLabel
                label="Bairro"
                message={errors?.neighborhood?.message}
                classHelper="md:basis-64"
                {...register('neighborhood')}
              />

              <InputLabel
                label="Cidade"
                message={errors?.city?.message}
                classHelper="md:basis-64 md:ml-4"
                {...register('city')}
              />

              <InputLabel
                label="UF"
                message={errors?.state?.message}
                classHelper="md:basis-20 md:ml-4"
                {...register('state')}
              />

              <InputLabel
                label="CEP"
                message={errors?.zipCode?.message}
                classHelper="md:basis-44"
                {...register('zipCode', {
                  onChange: (e) => {
                    const value = maskZipCode(e.target.value)
                    e.target.value = value
                  },
                })}
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

export function ModalDelete({ open, data }: ModalFormProps) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  async function onSubmit(form: { id: string }) {
    startTransition(async () => {
      try {
        const response = await removePeople(form)
        toast({
          title: 'Sucesso!',
          description: (response as any)?.message,
        })
        back()
      } catch (error) {
        console.log('[MODALFORMPEOPLE] Error: ', error)
        toast({
          title: 'Erro ao salvar dados!',
          description: (error as any)?.message,
        })
      }
    })
  }

  const form = useForm<{ id: string }>({
    resolver: zodResolver(peopleSchema.pick({ id: true })),
  })
  const { handleSubmit, reset, register } = form

  useEffect(() => {
    if (data) reset({ id: data?.id! })
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
