'use client'

import { ButtonSubmit } from '@/components/common/button-submit'
import { InputLabel } from '@/components/common/input'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'
import { maskPrice } from '@/libs/mask'
import { Product } from '@/types/products'
import {
  ServiceInProduct,
  serviceInProductSchema,
  ServiceProduct,
  serviceProductSchema,
} from '@/types/services-in-products'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleX, Edit } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { removeServiceInProduct, saveServiceInProduct } from './action'

export interface ModalFormInterface {
  open: boolean
  data?: ServiceInProduct
}

export function ModalForm({ open, data }: ModalFormInterface) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  async function onSubmit(form: ServiceProduct) {
    startTransition(async () => {
      try {
        const response = await saveServiceInProduct(form)
        toast({
          title: 'Sucesso!',
          description: (response as any)?.message,
        })
        back()
      } catch (err) {
        toast({
          title: 'Erro ao salvar dados!',
          description: (err as any)?.message,
        })
      }
    })
  }

  const form = useForm<ServiceProduct>({
    resolver: zodResolver(serviceProductSchema),
  })

  const { control, register, reset, handleSubmit, setValue, watch } = form

  useFieldArray({ control: control, name: 'services' })

  const resolveSum = useCallback(
    (key: number, price: number | string, quantity: number | string) => {
      const p = Number(price)
      const q = Number(quantity)

      const rental =
        q > 0 && Number.isFinite(p) && Number.isFinite(q) ? p / q : 0

      setValue(`services.${key}.rentalPrice`, maskPrice(rental))
    },
    [setValue],
  )

  useEffect(() => {
    if (data) {
      reset({
        services: [
          {
            id: data.id,
            productId: data.productId,
            serviceId: data.serviceId,
            productName: data.productName,
            productPrice: data.productPrice,
            productQuantity: data.productQuantity,
            rentalPrice: data.rentalPrice,
            rental: data.rental,
            checked: true,
          },
        ],
      })
    }
  }, [data, reset])

  const productPrice = watch('services.0.productPrice')

  return (
    <Dialog open={open} modal={true}>
      <DialogContent
        className="h-auto !p-0 sm:max-w-lg [&>button]:hidden"
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
                Você pode editar ou cadastrar serviço/produtos no formulário
                abaixo.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col flex-wrap space-y-4 md:flex-row"
            >
              <input type="hidden" {...register('services.0.serviceId')} />
              <input type="hidden" {...register('services.0.productId')} />

              <InputLabel
                label="Redimento *"
                type="text"
                classHelper="md:basis-24"
                {...register('services.0.rental', {
                  onChange: (e) =>
                    startTransition(() => {
                      resolveSum(0, String(productPrice), e.currentTarget.value)
                    }),
                })}
              />

              <InputLabel
                readOnly
                label="Vl. Aplicação"
                classHelper="md:basis-32 ml-6"
                type="text"
                defaultValue={'0,00'}
                {...register('services.0.rentalPrice')}
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
        const response = await removeServiceInProduct({ id })
        toast({
          title: 'Sucesso!',
          description: (response as any)?.message,
        })
        back()
      } catch (error) {
        console.log('[MODALFORMSERVICE] Error: ', error)
        toast({
          title: 'Erro ao remover dados!',
          description: (error as any)?.message,
        })
      }
    })
  }
  const form = useForm<{ id: string }>({
    resolver: zodResolver(serviceInProductSchema.pick({ id: true })),
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

export function TableListing({
  products,
}: {
  products: ({ serviceId: string } & Product)[]
}) {
  const { toast } = useToast()

  const [handleInput, setHandleInput] = useState<Record<string, boolean>>({})

  const [_, startTransition] = useTransition()

  async function onSubmit(form: ServiceProduct) {
    startTransition(async () => {
      try {
        const response = await saveServiceInProduct(form)
        toast({
          title: 'Sucesso!',
          description: (response as any)?.message,
        })
      } catch (err) {
        toast({
          title: 'Erro ao salvar dados!',
          description: (err as any)?.message,
        })
      }
    })
  }

  const form = useForm<ServiceProduct>({
    resolver: zodResolver(serviceProductSchema),
  })

  const { control, register, reset, handleSubmit, setValue } = form

  const { fields } = useFieldArray({
    control: control,
    name: 'services',
  })

  const resolveSum = useCallback(
    (key: number, price: number | string, quantity: number | string) => {
      const p = Number(price)
      const q = Number(quantity)

      const rental =
        q > 0 && Number.isFinite(p) && Number.isFinite(q) ? p / q : 0

      setValue(`services.${key}.rentalPrice`, maskPrice(rental))
    },
    [setValue],
  )

  useEffect(() => {
    if (products) {
      reset({
        services: products.map((item) => ({
          id: item.id,
          serviceId: item.serviceId,
          productId: item.id,
          productName: item.name,
          rentalPrice: item.retail,
          productPrice: item.price,
          productQuantity: item.quantity,
          rental: '0',
        })),
      })
    }
  }, [products, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="form-add-product">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2}>
              <span>Produto</span>
              <span className="ml-2 text-xs font-normal">
                Total de cadastros: ({products?.length})
              </span>
            </TableHead>
            <TableHead className="text-center">Vl.Produto</TableHead>
            <TableHead className="text-center">QTDE (ml/unid)</TableHead>
            <TableHead className="text-center">Redimento</TableHead>
            <TableHead className="text-center">Vl.Aplicação</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields?.map((item, key) => {
            const checked = !handleInput[item.id]

            return (
              <TableRow key={item.id}>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  <input
                    type="hidden"
                    value={item.serviceId}
                    {...register(`services.${key}.serviceId`)}
                  />
                  <input
                    type="hidden"
                    value={item.productId}
                    {...register(`services.${key}.productId`)}
                  />
                  <Input
                    type="checkbox"
                    defaultChecked={false}
                    {...register(`services.${key}.checked`, {
                      onChange: (e) => {
                        let checked = e.currentTarget.checked
                        startTransition(() => {
                          setHandleInput((old) => ({
                            ...old,
                            [item.id]: checked,
                          }))
                        })
                      },
                    })}
                  />
                </TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  {maskPrice(item.productPrice)}
                </TableCell>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  {item.productQuantity}
                </TableCell>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  <InputLabel
                    type="text"
                    disabled={checked}
                    {...register(`services.${key}.rental`, {
                      onChange: (e) =>
                        startTransition(() => {
                          resolveSum(
                            key,
                            item.productPrice!,
                            e.currentTarget.value,
                          )
                        }),
                    })}
                  />
                </TableCell>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  <InputLabel
                    readOnly
                    disabled={checked}
                    defaultValue={'0,00'}
                    {...register(`services.${key}.rentalPrice`)}
                  />
                </TableCell>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  <Link
                    href={{
                      pathname: '/products',
                      query: { id: item.id, modal: 'true' },
                    }}
                    className={buttonVariants({
                      variant: 'outline',
                      size: 'sm',
                    })}
                  >
                    <Edit className="mr-1 w-4" />
                    Editar
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </form>
  )
}
