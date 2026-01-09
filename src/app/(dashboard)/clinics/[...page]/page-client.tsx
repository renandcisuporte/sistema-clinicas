'use client'

import { saveClinic } from '@/actions/clinics'
import { ButtonSubmit } from '@/components/common/button-submit'
import { InputLabel } from '@/components/common/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/libs/cn'
import { maskDocument, maskPhone, maskZipCode } from '@/libs/mask'
import { Clinic, clinicSchema } from '@/types/clinics'
import { zodResolver } from '@hookform/resolvers/zod'
import { Clock, Undo, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export type ParamsProps = {
  input?: Clinic
}

export function PageClient({ input }: ParamsProps) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Clinic>({
    resolver: zodResolver(clinicSchema),
  })

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = form

  async function onSubmit(form: Clinic) {
    startTransition(async () => {
      try {
        const response = await saveClinic(form)
        toast({
          title: 'Sucesso!',
          description: (response as any)?.message,
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
    if (!input) return

    reset(input)
  }, [input, reset])

  const title = watch('title')

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-wrap space-y-4 md:flex-row"
    >
      <div className="mb-4 flex w-full flex-row items-center justify-between border-b border-neutral-300 pb-4">
        <h2 className="text-xl">Clinica - {title}</h2>
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            size="sm"
            className="mr-4"
            onClick={() => back()}
            type="button"
          >
            <Undo className="mr-1 w-4" />
            Voltar
          </Button>

          {false && (
            <>
              <Link
                href={{
                  pathname: `/clinics/${input?.id}/update`,
                  query: {
                    modal: 'work_times',
                  },
                }}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'mr-4',
                )}
                type="button"
              >
                <Clock className="mr-1 w-4" />
                Horário de Funcionamento
              </Link>
              <Link
                href={{
                  pathname: `/clinics/${input?.id}/update`,
                  query: {
                    modal: 'work_times_recommended',
                  },
                }}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'mr-4',
                )}
                type="button"
              >
                <Clock className="mr-1 w-4" />
                Horário Recomendado
              </Link>
            </>
          )}

          <ButtonSubmit size="sm" submitting={isPending} type="submit" />
        </div>
      </div>

      <input type="hidden" {...register('id')} />
      <input type="hidden" {...register('clinicId')} />

      <InputLabel
        type="text"
        label="Titulo Empresarial"
        message={errors?.title?.message}
        {...register('title')}
      />

      <InputLabel
        label="Nome Fantasia"
        message={errors?.fantasy?.message}
        {...register('fantasy')}
      />

      <InputLabel
        type="text"
        label="CNPJ"
        classHelper="md:basis-56"
        message={errors?.cnpj?.message}
        {...register('cnpj', {
          onChange: (e) => {
            const cnpj = e.currentTarget.value
            e.currentTarget.value = maskDocument(cnpj)
          },
        })}
      />

      <InputLabel
        type="text"
        label="Inscrição Estadual"
        message={errors?.ie?.message}
        classHelper="md:basis-56 md:ml-4"
        {...register('ie')}
      />

      <InputLabel
        type="tel"
        label="Telefone"
        classHelper="md:basis-1/4 md:ml-4"
        message={errors?.phone?.message}
        {...register('phone', {
          onChange: (e) => {
            const phone = e.currentTarget.value
            e.currentTarget.value = maskPhone(phone)
          },
        })}
      />

      <InputLabel
        type="tel"
        label="Celular"
        classHelper="md:basis-1/4 md:ml-4"
        message={errors?.mobilePhone?.message}
        {...register('mobilePhone', {
          onChange: (e) => {
            const phone = e.currentTarget.value
            e.currentTarget.value = maskPhone(phone)
          },
        })}
      />

      <InputLabel
        type="text"
        label="Endereço"
        message={errors?.address?.message}
        classHelper="md:basis-2/4 md:mr-4"
        {...register('address')}
      />

      <InputLabel
        type="text"
        label="Numero"
        message={errors?.number?.message}
        classHelper="md:basis-1/5 md:mr-4"
        {...register('number')}
      />

      <InputLabel
        type="text"
        label="Bairro"
        message={errors?.neighborhood?.message}
        classHelper="md:basis-2/3 md:mr-4"
        {...register('neighborhood')}
      />

      <InputLabel
        type="text"
        label="Referência"
        message={errors?.reference?.message}
        classHelper="md:basis-2/3 md:mr-4"
        {...register('reference')}
      />

      <InputLabel
        type="text"
        label="Complemento"
        message={errors?.complement?.message}
        classHelper="md:basis-2/3 md:mr-4"
        {...register('complement')}
      />

      <InputLabel
        type="text"
        label="Cidade"
        message={errors?.city?.message}
        classHelper="md:basis-1/2 md:mr-4"
        {...register('city')}
      />

      <InputLabel
        type="text"
        label="UF"
        message={errors?.state?.message}
        classHelper="md:basis-1/6 md:mr-4"
        {...register('state')}
      />

      <InputLabel
        type="tel"
        label="CEP"
        message={errors?.zipCode?.message}
        classHelper="md:basis-1/6 md:mr-4"
        {...register('zipCode', {
          onChange: (e) => {
            const zipCode = e.currentTarget.value
            e.currentTarget.value = maskZipCode(zipCode)
          },
        })}
      />

      <div className="mb-4 mt-6 flex w-full flex-row items-center justify-between border-b border-neutral-300 pb-4">
        <h2 className="text-xl">Usuários/Clinica - {input?.title}</h2>
        <div className="flex items-center justify-end">
          {input?.id && (
            <>
              <Link
                href={{
                  pathname: `/clinics/${input?.id}/update`,
                  query: {
                    modal: 'clinics_users',
                  },
                }}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'mr-4',
                )}
                type="button"
              >
                <Users className="mr-1 w-4" />
                Cadastrar Usuários/Clinica
              </Link>
            </>
          )}
        </div>
      </div>
    </form>
  )
}
