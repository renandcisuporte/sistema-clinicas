'use client'

import { DynamicIcon } from 'lucide-react/dynamic'

import { cn } from '@/libs/cn'
import { Button, ButtonProps } from '../ui/button'

export function ButtonSubmit({
  remove,
  submitting,
  ...rest
}: ButtonProps & { remove?: boolean; submitting?: boolean }) {
  // const { pending } = useFormStatus()

  const isSubmitting = submitting

  if (remove)
    return (
      <Button
        {...rest}
        type="submit"
        disabled={isSubmitting}
        variant="destructive"
        className="disabled:cursor-not-allowed"
      >
        <DynamicIcon
          className={cn('mr-1 w-4', isSubmitting ? 'animate-spin' : '')}
          name={isSubmitting ? 'loader' : 'trash'}
        />
        {isSubmitting ? 'Excluindo' : 'Excluir'}
      </Button>
    )

  return (
    <Button
      {...rest}
      type="submit"
      disabled={isSubmitting}
      className="disabled:cursor-not-allowed"
    >
      <DynamicIcon
        className={cn('mr-1 w-4', isSubmitting ? 'animate-spin' : '')}
        name={isSubmitting ? 'loader' : 'save'}
      />

      {isSubmitting ? 'Salvando dados' : 'Salvar'}
    </Button>
  )
}
