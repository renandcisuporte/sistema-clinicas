'use client'

import { removeProduct, saveProduct } from '@/actions/products'
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
import { formatPrice, maskPrice } from '@/libs/mask'
import { Product, productSchema } from '@/types/products'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export interface ModalFormInterface {
  open: boolean
  data?: Product
}

export function ModalForm({ open, data }: ModalFormInterface) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
  })

  async function onSubmit(form: Product) {
    startTransition(async () => {
      try {
        const response = await saveProduct(form)
        toast({
          title: 'Sucesso!',
          description: (response as any)?.message,
        })
        back()
      } catch (err) {
        toast({
          title: 'Erro ao remover dados!',
          description: (err as any)?.message,
        })
      }
    })
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form

  useEffect(() => {
    if (data) {
      reset({ ...data, price: maskPrice(`${data?.price}` || '0') })
      return
    }

    reset({})
  }, [data, reset])

  return (
    <Dialog open={open} modal={true}>
      <DialogContent
        className="h-auto sm:max-w-[767px] [&>button]:hidden"
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
                label="Produto *"
                message={errors?.name?.message}
                {...register('name')}
              />

              <InputLabel
                label="Qtde (ml/un)"
                classHelper="md:basis-44 md:mr-4"
                message={errors?.quantity?.message}
                {...register('quantity')}
              />

              <InputLabel
                label="Preço"
                classHelper="md:basis-44 md:mr-4"
                style={{ direction: 'ltr' }}
                message={errors?.price?.message}
                {...register('price', {
                  onChange: (e) => {
                    e.currentTarget.value = formatPrice(
                      String(e.currentTarget.value),
                    )
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

export function ModalDelete({ open, data }: ModalFormInterface) {
  const { back } = useRouter()
  const { toast } = useToast()

  async function onSubmit(form: { id: string }) {
    try {
      const response = await removeProduct(form.id)
      toast({
        title: 'Sucesso!',
        description: (response as any)?.message,
      })
      back()
    } catch (error) {
      console.log('[MODALDELETEPRODUCT] Error: ', error)

      toast({
        title: 'Erro ao remover dados!',
        description: (error as any)?.message,
      })
    }
  }

  const form = useForm<{ id: string }>({
    resolver: zodResolver(productSchema.pick({ id: true })),
  })
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
    register,
  } = form

  useEffect(() => {
    if (data) reset({ id: data?.id })
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
          <ButtonSubmit remove submitting={isSubmitting} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
