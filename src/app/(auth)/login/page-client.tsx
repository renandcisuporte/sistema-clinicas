'use client'

import { InputLabel } from '@/components/common/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

import { toast } from '@/hooks/use-toast'
import { cn } from '@/libs/cn'
import { DynamicIcon } from 'lucide-react/dynamic'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { z } from 'zod'
import { authAction } from '../action'

const formLogin = z.object({
  code: z
    .string({ message: 'Campo obrigatório!' })
    .min(7, { message: 'Digite o código da clínica' }),
  email: z
    .string({
      message: 'Campo obrigatório!',
    })
    .email({ message: 'E-mail inválido!' }),
  password: z
    .string({ message: 'Campo obrigatório!' })
    .min(6, { message: 'Requer 6 caracteres' })
    .max(12, { message: 'Requer máximo 12 caracteres' }),
})

type LoginProps = z.infer<typeof formLogin>

export function PageClient() {
  const { push } = useRouter()

  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: zodResolver(formLogin),
  })

  const onSubmit = async (formData: LoginProps) => {
    startTransition(async () => {
      try {
        await authAction(formData)
        push('/dashboard')
      } catch (error) {
        console.log('[AUTH LOGIN] Error: ', error)

        toast({
          title: 'Erro ao fazer login!',
          description: (error as any)?.message,
        })
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-6 rounded-lg bg-white p-6 md:max-w-md"
    >
      <Image
        src="/RUBRICA-SISTEMA.png"
        alt="Logo"
        width={255}
        height={170}
        className="mx-auto"
        quality="100"
      />

      <InputLabel
        {...register('code', {
          onChange: (e) => {
            e.target.value = e.target.value
              .replace(/-/g, '')
              .replace(/(.{3})(?=.)/g, '$1-')
          },
        })}
        type="text"
        maxLength={7}
        label="Código Clínica"
        message={errors?.code?.message}
      />
      <InputLabel
        {...register('email')}
        label="Digite seu E-mail"
        message={errors?.email?.message}
        type="email"
      />
      <InputLabel
        {...register('password')}
        label="Digite sua Senha"
        message={errors?.password?.message}
        type="password"
      />

      <Button size="full" disabled={isPending} type="submit">
        <DynamicIcon
          className={cn('mr-1 w-4', isPending ? 'animate-spin' : '')}
          name={isPending ? 'loader' : 'log-in'}
        />
        {isPending ? 'Fazendo Login' : 'Login'}
      </Button>
    </form>
  )
}
