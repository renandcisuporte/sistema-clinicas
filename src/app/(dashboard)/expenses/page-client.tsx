'use client'

import { removeExpense, saveExpense } from '@/actions/expenses'
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
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { ExpenseProps, expenseSchema } from '@/types/expenses'
import { zodResolver } from '@hookform/resolvers/zod'

import { CircleX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

export interface ModalFormInterface {
  open: boolean
  data?: ExpenseProps
}

export function ModalForm({ open, data }: ModalFormInterface) {
  const { back } = useRouter()
  const { toast } = useToast()

  async function onSubmit(form: ExpenseProps) {
    try {
      const response = await saveExpense(form)

      toast({
        title: 'Sucesso!',
        description: (response as any)?.message,
      })
      back()
    } catch (error) {
      console.log('[MODALFORMEXPENSE] Error: ', error)

      toast({
        title: 'Erro ao salvar dados!',
        description: (error as any)?.message,
      })
    }
  }

  const form = useForm<ExpenseProps>({
    resolver: zodResolver(expenseSchema),
  })
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    setValue,
    watch,
    reset,
    register,
  } = form

  const handleClick = useCallback(() => {
    const currentType = watch('type')
    const newValue = currentType === 'fixed' ? 'variable' : 'fixed'
    setValue('type', newValue, { shouldValidate: true, shouldDirty: true })
  }, [watch, setValue])

  useEffect(() => {
    if (data) reset(data)
  }, [data, reset])

  return (
    <Dialog open={open} modal={true}>
      <DialogContent
        className="!p-0 sm:max-w-sm [&>button]:hidden"
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
                Você pode editar ou cadastrar suas despesas no formulário
                abaixo.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col flex-wrap space-y-4 md:flex-row"
            >
              <input type="hidden" {...register('id')} />
              <input
                type="hidden"
                {...register('type')}
                defaultValue={'variable'}
              />

              <InputLabel
                label="Descrição *"
                type="text"
                message={errors?.description?.message}
                classHelper="md:w-full"
                {...register('description')}
              />

              <div className="flex w-full flex-col space-y-2">
                <Label htmlFor="type">Tipo de Gatos (Fixa/Variáveis)</Label>
                <div className="flex flex-row items-center space-x-2">
                  <Switch
                    checked={watch('type') === 'fixed'}
                    onCheckedChange={handleClick}
                  />

                  {watch('type') === 'fixed' ? (
                    <span>Gastos Fixos</span>
                  ) : (
                    <span>Gastos Variaveis</span>
                  )}
                </div>
              </div>

              <div className="w-full text-center">
                <ButtonSubmit submitting={isSubmitting} />
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
      const response = await removeExpense(form)
      toast({
        title: 'Sucesso!',
        description: (response as any)?.message,
      })
      back()
    } catch (error) {
      console.log('[MODALDELETEEXPENSE] Error: ', error)

      toast({
        title: 'Erro ao remover dados!',
        description: (error as any)?.message,
      })
    }
  }

  const form = useForm<{ id: string }>({
    resolver: zodResolver(expenseSchema.pick({ id: true })),
  })
  const {
    formState: { isSubmitting, errors },
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
